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

async function getSelection(message) {
    let tabs = await browser.tabs.query({active: true, currentWindow: true});
    let response = await browser.tabs.sendMessage(tabs[0].id, message);
    if (!response.response) {
        toast("No text selected; you can paste it in instead.")
        selection.focus();
    } else {
        selection.value = response.response.trim();
        instructions.focus();
    }
}

function createPrompt(formObj) {
    let messages = [];
    messages.push(
        {"role": "system", "content": `Please write a professional email reply on behalf of your user, ${formObj.user}. The user, ${formObj.user} will provide you with a message to reply to, and may provide additional instructions related to tone or specific details to include. You will write a response to the email on behalf the user, ${formObj.user}.`}
    )
    messages.push(
        {"role":"user", "content": "EMAIL CONTENTS: " + formObj.selectedtext}
    )
    if (formObj.instructions) {
        messages.push(
            {"role":"user", "content": "ADDITIONAL INSTRUCTIONS: " + formObj.instructions}
        )
    }
    return messages;
}

async function submitAPIRequest(api_key, messages) {
    let request_url;
    
    const body = {
        "model": "gpt-3.5-turbo", 
        "messages": messages, 
        "temperature": 0.5, 
        "max_tokens": 350
    };

    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + api_key
    };

    request_url = "https://api.openai.com/v1/chat/completions";

    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
    };
    

    let res = await fetch(request_url, requestOptions)
    console.log("Status", res.status);
    if (res.ok) {
        let json = await res.json();
        return json.choices[0].message.content.trim();
        
    } else {
        toast("API request failed. Check your API key and try again.", 2500, true);
        return false;
    }
}

function submitForm() {
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
    browser.storage.local.set({
        "user": formObj.user,
        "apikey": formObj.apikey
    });

    // Create prompt & select model
    let messages = createPrompt(formObj);
    let model = "gpt-3.5-turbo"
    toast("Generating response...", 2500);
    
    // Get response from LLM API
    submitAPIRequest(formObj.apikey, messages).then((response) => {
        if (response) {
            result.value = response.trim();
            navigator.clipboard.writeText(response.trim());
            toast("Copied to clipboard!")
        }
    });
}
document.querySelector("#submit").addEventListener("click", submitForm);
getSelection({command: "get_selection"});
getSavedData();

