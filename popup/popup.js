let result = document.querySelector("#result");
let message = document.querySelector("#message");
let selection = document.querySelector("#selectedtext");
let apikeyfield = document.querySelector("#apikey");
let userfield = document.querySelector("#user");

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
            selection.value = response.response.trim();
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
        message.textContent = "OpenAI request failed. Check your API key and try again";
        message.classList.add("error");
        setTimeout(() => {
            message.classList.remove("error");
        }, 4000);
        return false;
    }
}

function submitRequest() {
    // Get data from the form
    let formData = new FormData(document.querySelector("form"));
    formObj = Object.fromEntries(formData);

    // Validate form
    if (!formObj.apikey || !formObj.user) {
        message.textContent = "Please fill in the API key and user fields.";
        message.classList.add("error");
        setTimeout(() => {
            message.classList.remove("error");
        }, 4000);
        return false;
    }
    if (!formObj.selectedtext) {
        message.textContent = "Please select some text in the email you want to reply to.";
        message.classList.add("error");
        setTimeout(() => {
            message.classList.remove("error");
        }, 4000);
        return false;
    }

    // Cache user and API key
    browser.storage.local.set({apikey: formObj.apikey, user: formObj.user});

    // Create prompt
    let prompt = createPrompt(formObj);
    message.textContent = "Waiting for response...";
    message.classList.add("show");
    setTimeout(() => {
        message.classList.remove("show");
    }, 4000);
    
    // Get response from OpenAI
    submitOpenAIRequest(formObj.apikey, "text-davinci-003", prompt).then((response) => {
        if (response) {
            result.value = response.trim();
            navigator.clipboard.writeText(response.trim());
            message.textContent = "Response copied to clipboard!";
            message.classList.add("show");
            setTimeout(() => {
                message.classList.remove("show");
            }, 4000);
        }
    });
}
document.querySelector("#submit").addEventListener("click", submitRequest);
getSelection({command: "get_selection"});
getSavedData();


