browser.runtime.onMessage.addListener((message) => {
    console.log("got a message")
    if (message.command === "get_selection") {
        console.log("asked for selection:")
        let selection = document.getSelection().toString();
        console.log(selection);
        return Promise.resolve({response: selection});
    }
  });