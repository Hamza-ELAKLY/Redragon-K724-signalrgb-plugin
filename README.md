<p align="center">
  <a href="https://signalrgb.com"><img src="https://signalrgb.com/assets/signalrgb-logo-mnml.svg" alt="SignalRGB" height="60"></a>
</p>

<h1 align="center">Redragon K724 Pro for SignalRGB</h1>

<p align="center">
  <a href="https://signalrgb.com">SignalRGB</a> ·
  <a href="https://hamza-elakly.github.io/Redragon-K708-signalrgb-plugin/tools/key-check.html">Key Check</a>
</p>

<p align="center">
  <img src="https://cdn.shopify.com/s/files/1/0012/4957/4961/files/RedragonBEHEMOTHK724PRO81KeysOEMProfileGasketRGBGamingKeyboard_1_edc3b12b-33b3-4ffb-ad92-4cbb6fbbbe0f.png?v=1762466707&crop=region&crop_left=82&crop_top=466&crop_width=1436&crop_height=700&width=1000" alt="Redragon K724 Pro keyboard" width="700">
</p>

SignalRGB doesn't detect the Redragon K724 Pro (Behemoth). It's built on the same platform as the [K708 Pro](https://github.com/Hamza-ELAKLY/Redragon-K708-signalrgb-plugin) and uses the same chip, so this is the K708 plugin adapted for the K724's LED layout.

## Good to know

- Works over the **USB cable** and the **2.4G dongle**. Bluetooth isn't supported.
- The **screen** and **knob** keep working as normal, but SignalRGB doesn't control them.

## How to install

1. Download **[Redragon_K724_Pro.js](https://github.com/Hamza-ELAKLY/Redragon-K724-signalrgb-plugin/releases/latest/download/Redragon_K724_Pro.js)** from the latest release.
2. Put it in this folder:
   ```
   Documents\WhirlwindFX\Plugins
   ```
3. Close Redragon's own keyboard software if it's open.
4. Connect your keyboard with the USB cable or the 2.4G dongle.
5. Fully close SignalRGB (right-click its tray icon → Exit), then open it again.

Your keyboard now shows up in SignalRGB as **Redragon K724 Pro**.

## Help test it

1. Open the keyboard's page in SignalRGB → **Lighting** tab.
2. Set **Test mode** to **Rows test: 16**. Each row of keys should be one solid color: red, orange, yellow, green, cyan, blue from top to bottom.
3. Set **Test mode** back to **Off** and try an effect like **Side to Side**. The line between the colors should run straight down the keyboard.
4. If some keys on the bottom row are off, set **Test mode** to **Single LED** and step **Single LED slot** from 80 to 95. Write down which key lights up for each number.

Then [share your results](https://github.com/Hamza-ELAKLY/Redragon-K724-signalrgb-plugin/issues/new?template=test_results.yml), with a photo if you can.

## Test your keys

Open the **[Key Check page](https://hamza-elakly.github.io/Redragon-K708-signalrgb-plugin/tools/key-check.html)** in your browser. It shows each key as you press it and flags any key that types twice. Try it once with SignalRGB closed and once with it running to compare.

## How to remove

Delete the file from the `Plugins` folder and restart SignalRGB. Nothing on your keyboard is changed.

## Contributing

Found a problem? [Open an issue](https://github.com/Hamza-ELAKLY/Redragon-K724-signalrgb-plugin/issues/new/choose). Pull requests are welcome.

---

<sub>Not affiliated with Redragon or SignalRGB. Built on SignalRGB's EVision plugin by WhirlwindFx & Nuonuo. See [LICENSE](LICENSE).</sub>
