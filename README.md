# tomis-customer-website-test

Demo tourism site for loading the production TOMIS demo chat widget without test mode. TOMIS Skydives is fictional. The pages are real paths so announcements can be checked on subpaths.

The install snippet is in the `<head>` of `index.html` only. `404.html` is the same file. GitHub Pages serves that file for every missing path, so `/booking/price/` still runs the homepage head. `site.js` swaps the page content from the address in the browser.

## Pages

- `/`
- `/locations/` and `/locations/byron-bay/`, `/locations/cairns/`, `/locations/noosa/`
- `/what-to-expect/`, `/media-packages/`, `/transfers/`, `/faq/`
- `/deals/`, `/gift-vouchers/`
- `/our-story/`, `/the-crew/`, `/contact/`
- `/booking/` and `/booking/price/`

Any other path still loads the widget. Each page prints its path under the heading. On GitHub Pages the path includes `/tomis-customer-website-test`. Save the announcement against the full address in the browser.

## Run locally

From this directory:

```bash
python3 serve.py
```

Open [http://127.0.0.1:8765/](http://127.0.0.1:8765/). `python3 -m http.server` only serves `/`, because it does not fall back to `index.html`.

`localhost` and `127.0.0.1` are always allowed by the widget domain check. Opening the file directly (`file://`) can fail.

## Widget snippet

The install snippet is in the `<head>` of `index.html`. It loads:

- script: `https://chat.tomis.tech/widget/load.js`
- API namespace: `tomis`
- site id: `demo`

```html
<script>
  (function () {
    var script = document.createElement("script");
    script.src = "https://chat.tomis.tech/widget/load.js";
    script.async = true;
    script.dataset.api = "tomis";
    script.onload = function () {
      window.tomis.chat.load({ id: "demo" });
    };
    document.head.appendChild(script);
  })();
</script>
```

This is a real conversation. Test mode is only on when the URL has `test_mode=true`, or when `load({ test_mode: true })` is called (the admin Test Chatbot page does this).

`https://chat.tomis.tech/?id=demo&floating=true` is the closed launcher. It is also not test mode. `floating=true` shows the button. `fullscreen` only stretches the hosted page.

## Chat Logs vs Inbox

A normal bot message is written to **Chat Logs**. It does not create an **Inbox** row.

Inbox only gets the thread after the visitor requests **live chat** or **SMS handoff**. Being a Tomis admin, chatting from this local page, or using `chat.tomis.tech` does not change that.

### See it in Chat Logs

1. Open the local page in a fresh tab (or restart the widget) so you are not reusing a test `conversation_id` from sessionStorage.
2. Send a message.
3. In Tomis, open Chat Logs. The thread should appear without the test icon.

### See it in Inbox

1. In Tomis, enable **Live Chat** (`handoff_chat_widget_to_live_chat`) for `demo`. Live chat and SMS handoff are exclusive.
2. On this page, ask to talk to a person, or use a welcome/FAQ button that starts live chat.
3. Submit the live chat form.
4. Inbox should show an open `webchat` conversation.

If SMS transition is enabled instead, submit that form. Inbox then gets a phone conversation.

If Chat Logs show an internal live-chat request note and Inbox is still empty, the Firebase handoff write failed (often Celery not running).
