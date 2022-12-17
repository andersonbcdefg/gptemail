let result = document.querySelector("#result");
let message = document.querySelector("#message");
let selection = document.querySelector("#selectedtext");
let instructions = document.querySelector("#instructions");
let apikeyfield = document.querySelector("#apikey");
let userfield = document.querySelector("#user");

function toast(message, duration=2500, error=false) {
    let toast = document.querySelector("#message");
    toast.textContent = message;
    if (error) {
        toast.classList.remove("show");
        toast.classList.add("error");
    } else {
        toast.classList.remove("error");
        toast.classList.add("show");
    }
    setTimeout(() => {
        toast.classList.remove("show");
        toast.classList.remove("error");
    }, duration);
}

function getSavedData() {
    browser.storage.local.get(["user", "apikey"]).then(({user, apikey}) => {
        if (user) {
            userfield.value = user;
        }
        if (apikey) {
            apikeyfield.value = apikey;
        }
    });
}

function getSelection(message) {
    browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
        browser.tabs.sendMessage(tabs[0].id, message, function(response) {
            if (!response.response) {
                toast("No text selected; you can paste it in instead.")
                selection.focus();
            } else {
                selection.value = response.response.trim();
                instructions.focus();
            }
        });
    });
}

function createPrompt(formObj) {
    let prompt = `INSTRUCTIONS: Write an email reply (from ${formObj.user}) to the message below.`
    if (formObj.instructions) {
        prompt += ` ${formObj.instructions}`
    }
    prompt += `\n\nMESSAGE: ${formObj.selectedtext}`
    prompt += `\n\nRESPONSE:`
    return prompt;
}

async function submitOpenAIRequest(api_key, model, prompt) {
    const body = {
        "model": model, 
        "prompt": prompt, 
        "temperature": 0.7, 
        "max_tokens": 225
    };

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + api_key
        },
        body: JSON.stringify(body)
    };

    let res = await fetch('https://api.openai.com/v1/completions', requestOptions)
    if (res.ok) {
        let json = await res.json();
        return json.choices[0].text;
    } else {
        toast("OpenAI request failed. Check your API key and try again", 2500, true);
        return false;
    }
}

function submitRequest() {
    // Get data from the form
    let formData = new FormData(document.querySelector("form"));
    formObj = Object.fromEntries(formData);

    // Validate form
    if (!formObj.apikey || !formObj.user) {
        toast("Please fill in the API key and user fields.", 2500, true);
        return false;
    }
    if (!formObj.selectedtext) {
        toast("Please select some text in the email you want to reply to, or copy it to the clipboard.", 2500, true);
        return false;
    }

    // Cache user and API key
    browser.storage.local.set({apikey: formObj.apikey, user: formObj.user});

    // Create prompt
    let prompt = createPrompt(formObj);
    toast("Generating response...", 2500);
    
    // Get response from OpenAI
    submitOpenAIRequest(formObj.apikey, "text-davinci-003", prompt).then((response) => {
        if (response) {
            result.value = response.trim();
            navigator.clipboard.writeText(response.trim());
            toast("Copied to clipboard!")
        }
    });
}
document.querySelector("#submit").addEventListener("click", submitRequest);
getSelection({command: "get_selection"});
getSavedData();
instructions.focus()

