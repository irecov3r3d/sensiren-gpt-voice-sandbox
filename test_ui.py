import pytest
from playwright.sync_api import sync_playwright

def test_sensirengpt_loads():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("file:///app/sensirenGPT.html")
        assert page.title() == "SensirenGPT (B-GPT) • Local Companion"
        assert page.locator("h1").inner_text() == "SensirenGPT (B-GPT) • Local-first Companion"
        browser.close()

def test_voicesandbox_loads():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("file:///app/voice_sandbox.html")
        assert page.title() == "Voice Sandbox • SensirenGPT"
        assert page.locator("h1").inner_text() == "Voice Sandbox 🎙️"
        browser.close()
