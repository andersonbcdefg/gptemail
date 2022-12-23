<img src="output_512.png" alt="GPTemail Icon" width="200" height="200"/>

# GPTemail
Large language models aren't perfect, but one thing they're great at is generating coherent fluff—or, in today's parlance, an "e-mail". This browser extension allows you to select one (or multiple) e-mails with your cursor, and prompts a large language model to generate a reply for you. If you like it, please consider tipping me. The only one making money from this extension right now is OpenAI.  :)

<br/>

<a href='https://ko-fi.com/E1E31ZYSW' target='_blank'><img height='36' style='border:0px;height:36px;' src='https://storage.ko-fi.com/cdn/kofi3.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>

## Updates
* **2022-12-22**: Added support for Google Chrome. Not in the Chrome store yet, so you have to install it manually. Instructions below—it's not that hard, I promise! With this update, it should also be compatible with other browsers (Edge, Brave, etc.) that support WebExtensions, but I haven't tested them, so your mileage may vary! Also added support for e-mail clients other than Gmail. And added a cute little icon. :)
* **2022-12-19**: Added support for Cohere, using the `command-xlarge-11082022` model. As with OpenAI, you have to make an account and create an API key. Unlike OpenAI, Cohere is free to use (with a limit of 100 API calls per minute). Cohere is also noticeably slower, and I find that the generations are of slightly lower quality (it might respond to one part of the email, but ignore something else important). However, Cohere states that its "command" models are rapidly improving, so I'm excited to see if it gets better.

## Installation: Firefox

1. Clone this repo.
2. In Firefox, navigate to `about:debugging`, then click "This Firefox" on the left sidebar.
3. Click "Load a temporary add-on", and select a file in the `gptemail` repo (`gptemail.js` will do).
4. The GPTemail icon should appear in your Firefox menu bar! Hooray! 

## Installation: Chrome

1. Clone this repo.
2. In Chrome, navigate to `chrome://extensions`. Make sure "Developer mode" is enabled (top right).
3. Click "Load unpacked", and select the `gptemail` repo that you just downloaded.
4. The GPTemail extension is now loaded! If you want it to be visible in the toolbar, you can pin it. The first time you want to use it, you may have to give it permissions to read the webpage you're on.

## Using GPTemail
GPTemail is designed to be flexible, lightweight, and unobtrusive. Rather than deeply integrating with a particular email client, GPTemail just reads the text you select with your cursor, or the text you paste into the popup window. Here's how to use it:

1. First, you need an API key so that GPTemail can talk to the language model. You can get one for free from OpenAI or Cohere. 
   * Create an OpenAI account [here](https://beta.openai.com/signup/), or a Cohere account [here](https://dashboard.cohere.ai/welcome/register) and generate an API key. 
   * You'll probably want to stash it somewhere safe so that you can paste it in again when you restart the browser. Cohere will show you your API key again if you forget it, but OpenAI will only show you once, and require you to generate a new one if you forget it.
   * GPTEmail stores your API key in local storage, so it never leaves your computer. It will persist across requests, but it might get forgotten when you restart the browser and reload the extension.
   * New OpenAI signups get some free usage, but eventually you'll have to pay (OpenAI, not me!). It comes out to ≤ $0.02 per request, so unless you write thousands of emails, it should be affordable! Cohere is totally free to use at the "Trial" level (which has a limit of 100 requests per minute—I hope you don't write that many emails!).
2. After creating the API key, navigate to your email website, and select the text you want to compose a response to. Click on the toolbar icon, or press ⌘ + Shift + E to open the GPTemail popup.
3. If this is your first use, you'll have to enter your preferred name to sign your emails with (in the User field), and your OpenAI or Cohere API key, and select your preferred model (OpenAI or Cohere).
4. The text you selected will show up in the "Selected Text" field. (If it doesn't, this means your email client is an evil nightmare website with `iframe`s and/or Shadow DOMs, and you should write them an angry letter! In this case, you can just paste in the text yourself.)
5. GPTemail already understands that it should write a reply (from you) to this selected text. If there's any special instructions ("Decline the request", "Use a professional tone", "Wish them happy holidays"), add those in the optional instructions field.
6. Click "Generate Email", and the reply will appear in the "Results" field, and will also be copied to the clipboard. If you don't like the result, you can always try again (generated emails are non-deterministic), and change your instructions to get a result more in line with what you want.

## Future Updates
* Will make this an actual extension you can install from the Firefox / Chrome marketplaces, so you don't have to add it in developer mode.
* Currently supports reading highlighted text on Gmail, Outlook, and Yahoo mail. With Hey, the extension will work, but you have to paste the text in yourself. Please let me know if there's another e-mail client you'd like to see supported!

