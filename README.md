# GPTemail
Large language models aren't perfect, but one thing they're great at is generating coherent fluff—or, in today's parlance, an "e-mail". This browser extension allows you to select one (or multiple) emails with your cursor, and prompts a large language model to generate a reply for you. If you like it, please consider tipping me. The only one making money from this extension right now is OpenAI.  :)

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

## How to Use
GPTemail is designed to be flexible, lightweight, and unobtrusive. Rather than deeply integrating with a particular email client, GPTemail just reads the text you select with your cursor. Here's how to use it:

1. Navigate to your email website, and select the text you want to compose a response to. 
2. Click on the toolbar icon, or press ⌘ + Shift + E to open the GPTemail popup.
3. If this is your first use, you'll have to enter your preferred name to sign your emails with (in the User field), and your OpenAI API key.
4. The text you selected will show up in the "Selected Text" field. GPTemail already understands that it should write a reply (from you) to this selected text. If there's any special instructions ("Decline the request", "Use a professional tone", "Wish them happy holidays"), add those in the optional instructions field.
5. Click "Generate Email", and the reply will appear in the "Results" field, and will also be copied to the clipboard. If you don't like the result, you can always try again (generated emails are non-deterministic), and change your instructions to get a result more in line with what you want.

## Future Updates

* Right now, this extension only activates on Gmail pages (using the URL). However, the text selection mechanism works easily with any webpage,
so it should be trivial to add support for other email clients (do people use other email providers anymore? I don't know).
* I am planning to use the WebAPI Extension polyfills to add support for Chrome/Edge/etc.
* Plan to add support for Cohere models (their "Trial" API keys support enough requests for 1 user, so you could probably use this for free,
instead of pennies per request). This is conditional on Cohere models writing good emails, I haven't tried yet.
* Will make this an actual extension you can install from the Firefox / Chrome marketplaces, so you don't have to add it as a temporary add-on.

## Attributions
