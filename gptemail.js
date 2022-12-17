console.log("GPTemail is running in this tab!")
browser.runtime.onMessage.addListener((message) => {
    console.log("got a message")
    if (message.command === "get_selection") {
        let selection = document.getSelection()
        if (selection.toString()) {
            return Promise.resolve({ response: selection });
        } else {
            return Promise.resolve({ response: "" })
        }
    }
  });