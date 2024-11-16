browser.runtime.onMessage.addListener((message) => {
    if (message.command === "get_selection") {
        let selection = document.getSelection()
        if (selection.toString()) {
            return Promise.resolve({ response: selection.toString() });
        } else {
            return Promise.resolve({ response: "" })
        }
    }
  });