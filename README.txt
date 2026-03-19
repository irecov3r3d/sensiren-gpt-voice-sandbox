SensirenGPT Bundle (local-first)
===============================

This ZIP contains:
1) sensirenGPT.html  - local-first chat + mode toggle + tone slider + local vault (IndexedDB). Optional: connect to a local model endpoint like Ollama.
2) voice_sandbox.html - training-wheels voice recorder: hold-to-record, saves locally (IndexedDB), playback + download.

How to use
----------
A) On Chromebook:
- Unzip the folder.
- Double-click either HTML file to open in Chrome.

B) On Android (S24):
- Put the HTML file on your phone (Downloads).
- Open it in Chrome. If mic permissions are tricky, use Chrome permission settings:
  Settings -> Site settings -> Microphone -> Allow.

Notes
-----
- Data is stored locally in your browser storage (IndexedDB).
- Export your vault from sensirenGPT often if you want backups.
- voice_sandbox export is metadata index only (audio blobs stay on device).
