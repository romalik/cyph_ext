let decrypt_btn = document.getElementById("decrypt_btn");
let pass_field = document.getElementById("pass_field");

decrypt_btn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  console.log('Click');
  let pass_value = pass_field.value;

  console.log(`pass: ${pass_value}`);

  chrome.storage.sync.set({ pass_value });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['cyph.js'],

  });
});

