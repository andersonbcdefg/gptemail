# GPTemail
Large language models aren't perfect, but one thing they're great at is generating coherent fluff—or, in today's parlance, an "e-mail". This browser extension allows you to select one (or multiple) emails with your cursor, and prompts a large language model to generate a reply for you. If you like it, please consider tipping me. :)

<a href='https://ko-fi.com/E1E31ZYSW' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi3.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>

## Installation
GPTemail currently supports Firefox. It is not yet published to the Add-Ons Marketplace, so you have to install it
manually, following these instructions:

1. Clone this repo.
2. In Firefox, navigate to `about:debugging`, then click "This Firefox" on the left sidebar.
3. Click "Load a temporary add-on", and select a file in the `gptemail` repo (`gptemail.js` will do).
4. The GPTemail icon should appear in your Firefox menu bar! Hooray! 
5. For GPTemail to work, you need to provide it with an OpenAI API key. 
   * Create an OpenAI account [here](https://beta.openai.com/signup/) and generate an API key. 
   * You'll probably want to stash it somewhere safe so that you can paste it in again when you restart the browser.
   * GPTEmail stores your API key in local storage, so it never leaves your computer. It will persist across requests,
   but I assume it might get forgotten when you restart the browser since this is a "temporary" add-on.
   * New OpenAI signups get some free usage, but eventually you'll have to pay (OpenAI, not me!). It comes out to ≤ $0.02 per request, 
   so unless you write   thousands of emails, it should be affordable!

## Future Updates

* Right now, this extension only activates on Gmail pages (using the URL). However, the text selection mechanism works easily with any webpage,
so it should be trivial to add support for other email clients (do people use other email providers anymore? I don't know).
* I am planning to use the WebAPI Extension polyfills to add support for Chrome/Edge/etc.
* Plan to add support for Cohere models (their "Trial" API keys support enough requests for 1 user, so you could probably use this for free,
instead of pennies per request). This is conditional on Cohere models writing good emails, I haven't tried yet.
* Will make this an actual extension you can install from the Firefox / Chrome marketplaces, so you don't have to add it as a temporary add-on.

## Attributions
GPTemail uses an icon from Twitter's emoji set, which is licensed under [Creative Commons (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).
