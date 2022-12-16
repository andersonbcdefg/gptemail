# GPTEmail

## Installation
GPTemail currently supports Firefox. It is not yet published to the Add-Ons Marketplace, so you have to install it
manually, following these instructions:

1. Clone this repo.
2. In Firefox, navigate to `about:debugging`, then click "This Firefox" on the left sidebar.
3. Click "Load a temporary add-on", and select a file in the `gptemail` repo (`gptemail.js` will do).
4. The GPTemail icon should appear in your Firefox menu bar! Hooray! 
5. For GPTemail to work, you need to provide it with an OpenAI API key. Create an OpenAI account [here](https://beta.openai.com/signup/) and
generate an API key. GPTEmail stores your API key in local storage, so it never leaves your computer. New OpenAI signups get some free usage, but 
eventually you'll have to pay (OpenAI, not me!). It comes out to <= $0.02 per request, so unless you write tons of emails, it should be affordable!

## Future Updates

* I am planning to use the WebAPI Extension polyfills to add support for Chrome/Edge/etc.
* Plan to add support for Cohere models (their "Trial" API keys support enough requests for 1 user, so you could probably use this for free).
