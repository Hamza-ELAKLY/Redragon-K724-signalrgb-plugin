// Redragon K724 Pro (EVision 320F:511B cable, 320F:511C 2.4G dongle) — SignalRGB plugin by Hamza-ELAKLY.
// https://github.com/Hamza-ELAKLY/Redragon-K724-signalrgb-plugin
// Based on SignalRGB's built-in EVision_Keyboard_Controller.js (WhirlwindFx & Nuonuo).
// Same color packet protocol, unchanged; this adds the K724 Pro's LED layout (16 slots per row).
// Same USB IDs as the K708 Pro plugin: don't install both at the same time.
// To revert: delete this file and restart SignalRGB.

export function Name() { return "Redragon K724 Pro"; }
export function VendorId() { return 0x320F; }
export function ProductId() { return [0x511B, 0x511C]; } // USB cable, 2.4G dongle
export function Publisher() { return "Hamza-ELAKLY (based on WhirlwindFx & Nuonuo EVision plugin)"; }
export function Size() { return [15, 6]; }
export function DeviceType() { return "keyboard"; }
export function Validate(endpoint) { return endpoint.interface === 1; }
export function ImageUrl() { return "https://assets.signalrgb.com/devices/brands/redragon/keyboards/k580.png"; }
/* global
shutdownColor:readonly
LightingMode:readonly
forcedColor:readonly
lowFPS:readonly
packetSize:readonly
ledMap:readonly
testMode:readonly
testIndex:readonly
*/
export function ControllableParameters() {
	return [
		{property:"shutdownColor", group:"lighting", label:"Shutdown Color", description: "Applied when the system or SignalRGB shuts down", min:"0", max:"360", type:"color", default:"#000000"},
		{property:"LightingMode", group:"lighting", label:"Lighting Mode", description: "Canvas follows the active effect, Forced uses a single color", type:"combobox", values:["Canvas", "Forced"], default:"Canvas"},
		{property:"forcedColor", group:"lighting", label:"Forced Color", min:"0", max:"360", type:"color", default:"#009bde"},
		{property:"lowFPS", group:"lighting", label:"Low frame-rate mode", description: "Slower updates. Keep on if keys stick or double-press", type:"boolean", default:true},
		{property:"packetSize", group:"lighting", label:"Packet size", description: "Smaller packets go easier on the keyboard's chip. 24 avoids double key presses; larger is smoother", type:"combobox", values:["24", "48", "56"], default:"24"},
		{property:"ledMap", group:"", label:"LED map", description: "Which LED numbering this keyboard uses. Use the row tests to find out", type:"combobox", values:["Rows of 16 (K724)", "Rows of 15 (like K708 Pro)", "Rows of 21 (K724 driver)"], default:"Rows of 16 (K724)"},
		{property:"testMode", group:"", label:"Test mode", description: "Row tests: each row of keys should be one solid color. Single LED: lights one LED slot red", type:"combobox", values:["Off", "Rows test: 16", "Rows test: 15", "Rows test: 21", "Single LED"], default:"Off"},
		{property:"testIndex", group:"", label:"Single LED slot", description: "LED slot lit red in Single LED test mode", step:"1", type:"number", min:"0", max:"125", default:"80"},
	];
}

// Visual layout: 81 keys, 15 columns x 6 rows. The LCD and knob sit right of F12 and have no LEDs.
const vLedNames = [
	"Esc", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12",
	"`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-_", "=+", "Backspace", "Insert",
	"Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\", "Del",
	"CapsLock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "Enter", "PgUp",
	"Left Shift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "Right Shift", "Up Arrow", "PgDn",
	"Left Ctrl", "Left Win", "Left Alt", "Space", "Right Alt", "Fn", "Right Ctrl", "Left Arrow", "Down Arrow", "Right Arrow",
];

const vLedPositions = [
	[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0], [11, 0], [12, 0],
	[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1], [8, 1], [9, 1], [10, 1], [11, 1], [12, 1], [13, 1], [14, 1],
	[0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [11, 2], [12, 2], [13, 2], [14, 2],
	[0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3], [7, 3], [8, 3], [9, 3], [10, 3], [11, 3],          [13, 3], [14, 3],
	[0, 4],         [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4], [11, 4], [12, 4], [13, 4], [14, 4],
	[0, 5], [1, 5], [2, 5],                         [6, 5],                 [9, 5], [10, 5], [11, 5], [12, 5], [13, 5], [14, 5],
];

// LED index per key. The K724 uses 16 slots per row; the bottom row is still being confirmed.
// The K708 Pro map (15 slots) and the K724 driver's numbering (21 slots) are kept for comparison.
const ledMaps = {
	"Rows of 16 (K724)": [
		0,   1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12,
		16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
		32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46,
		48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,     61, 62,
		64,     66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78,
		80, 81, 82,             86,         89, 90, 91, 92, 93, 94,
	],
	"Rows of 15 (like K708 Pro)": [
		0,   1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12,
		15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
		30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44,
		45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56,     58, 59,
		60,     62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74,
		75, 76, 77,             81,         84, 85, 86, 87, 88, 89,
	],
	"Rows of 21 (K724 driver)": [
		0,   1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12,
		21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
		42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56,
		63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74,     75, 37,
		84,     85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 58,
		105, 106, 107,          108,        109, 110, 112, 113, 114, 115,
	],
};

const TEST_SLOTS = 126; // covers the highest index any map uses
const rowColors = [[255, 0, 0], [255, 128, 0], [255, 255, 0], [0, 255, 0], [0, 255, 255], [0, 0, 255], [160, 0, 255], [255, 255, 255], [255, 0, 160]];

export function Initialize() {
	device.setName(Name());
	device.set_endpoint(1, 0x0092, 0xFF1C, 0x0004);
	device.setSize(Size());
	device.setControllableLeds(vLedNames, vLedPositions);
	device.log(`Connected: ${device.getDeviceInfo().product}`);
}

export function Render() {
	if (testMode && testMode !== "Off") {
		sendTestPattern();
	} else {
		sendColors();
	}
}

export function Shutdown(SystemSuspending) {
	sendColors(SystemSuspending ? "#000000" : shutdownColor);
}

function sendColors(overrideColor) {
	const vLeds = ledMaps[ledMap] ?? ledMaps["Rows of 16 (K724)"];
	const RGBData = new Array((Math.max(...vLeds) + 1) * 3).fill(0);

	for (let iIdx = 0; iIdx < vLeds.length; iIdx++) {
		let color;

		if (overrideColor) {
			color = hexToRgb(overrideColor);
		} else if (LightingMode === "Forced") {
			color = hexToRgb(forcedColor);
		} else {
			color = device.color(vLedPositions[iIdx][0], vLedPositions[iIdx][1]);
		}

		RGBData[vLeds[iIdx] * 3]     = color[0];
		RGBData[vLeds[iIdx] * 3 + 1] = color[1];
		RGBData[vLeds[iIdx] * 3 + 2] = color[2];
	}

	writeRGBPackage(RGBData);
}

// Row tests: every LED slot in the same row gets the same color. With the right numbering,
// each row of keys shows one solid color. Single LED: only the chosen slot lights up red.
function sendTestPattern() {
	const stride = { "Rows test: 16": 16, "Rows test: 15": 15, "Rows test: 21": 21 }[testMode];
	const RGBData = new Array(TEST_SLOTS * 3).fill(0);

	for (let iIdx = 0; iIdx < TEST_SLOTS; iIdx++) {
		const color = stride
			? rowColors[Math.floor(iIdx / stride) % rowColors.length]
			: (iIdx === Number(testIndex) ? [255, 0, 0] : [0, 0, 24]);

		RGBData[iIdx * 3]     = color[0];
		RGBData[iIdx * 3 + 1] = color[1];
		RGBData[iIdx * 3 + 2] = color[2];
	}

	writeRGBPackage(RGBData);
}

// Unchanged from the built-in EVision plugin, except the packet size is selectable.
function writeRGBPackage(RGBData) {
	const bytesToSend = Number(packetSize) || 24;
	const pauseDuration = lowFPS ? 3 : 1;
	const TotalPackets = RGBData.length / bytesToSend;

	for (let index = 0; index < TotalPackets; index++) {
		const data = RGBData.splice(0, bytesToSend);
		const bytesSent = getHighLow(index * bytesToSend);
		const checksum = calculateChecksum(data, index, bytesToSend);
		const header = [0x04, checksum.low, checksum.high, 0x12, bytesToSend, bytesSent.low, bytesSent.high, 0x00];

		device.write(header.concat(data), 64);
		device.pause(pauseDuration);
	}
}

function calculateChecksum(packet, index, bytesToSend) {
	const packetSum = packet.reduce((sum, num) => sum + num, 0);

	if (index >= 5) {
		return getHighLow(packetSum + ((index - 5) * bytesToSend) + 99);
	}

	return getHighLow(packetSum + (index * bytesToSend) + 74);
}

function getHighLow(value) {
	return { high: (value >>> 8) & 0xFF, low: value & 0xFF };
}

function hexToRgb(hex) {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

	return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
}
