# tomis-customer-website-test

Minimal customer site for loading the production Yonder chat widget without test mode.

`index.html` embeds the same install snippet an activity provider would put on their website. It does not pass `test_mode`, so conversations created here are production chats.

## Run locally

From this directory:

```bash
python3 -m http.server 8765
```

Open [http://127.0.0.1:8765/](http://127.0.0.1:8765/).

`localhost` and `127.0.0.1` are always allowed by the widget domain check. Opening the file directly (`file://`) can fail.

## Widget snippet

The page loads:

- script: `https://chat.tomis.tech/widget/load.js`
- API namespace: `yonder`
- site id: `yonder-prod-testing`

```html
<script>
  (function () {
    var script = document.createElement("script");
    script.src = "https://chat.tomis.tech/widget/load.js";
    script.async = true;
    script.dataset.api = "yonder";
    script.onload = function () {
      window.yonder.chat.load({ id: "yonder-prod-testing" });
    };
    document.head.appendChild(script);
  })();
</script>
```

This is a real conversation. Test mode is only on when the URL has `test_mode=true`, or when `load({ test_mode: true })` is called (the admin Test Chatbot page does this).

`https://chat.tomis.tech/?id=yonder-prod-testing&fullscreen=true` is also not test mode. `fullscreen` is layout only.

## Chat Logs vs Inbox

A normal bot message is written to **Chat Logs**. It does not create an **Inbox** row.

Inbox only gets the thread after the visitor requests **live chat** or **SMS handoff**. Being a Tomis admin, chatting from this local page, or using `chat.tomis.tech` does not change that.

### See it in Chat Logs

1. Open the local page in a fresh tab (or restart the widget) so you are not reusing a test `conversation_id` from sessionStorage.
2. Send a message.
3. In Tomis, open Chat Logs. The thread should appear without the test icon.

### See it in Inbox

1. In Tomis, enable **Live Chat** (`handoff_chat_widget_to_live_chat`) for `yonder-prod-testing`. Live chat and SMS handoff are exclusive.
2. On this page, ask to talk to a person, or use a welcome/FAQ button that starts live chat.
3. Submit the live chat form.
4. Inbox should show an open `webchat` conversation.

If SMS transition is enabled instead, submit that form. Inbox then gets a phone conversation.

If Chat Logs show an internal live-chat request note and Inbox is still empty, the Firebase handoff write failed (often Celery not running).
