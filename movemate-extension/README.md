# MoveMate Chrome Extension MVP

This is a simple Manifest V3 Chrome extension prototype. It stores move profile data locally in `chrome.storage.local` and fills common address fields on the active page.

## Load in Chrome

1. Open Chrome and go to `chrome://extensions`.
2. Turn on **Developer mode**.
3. Click **Load unpacked**.
4. Select the `movemate-extension` folder.
5. Pin the MoveMate extension if you want quick access.

## Use

1. Open the extension popup.
2. Enter your move details.
3. Visit a webpage with address/contact form fields.
4. Click **Fill Current Page**.

The extension only stores data locally for this MVP. It does not send data to a backend and does not connect to the existing React app.
