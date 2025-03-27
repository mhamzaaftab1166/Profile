export function openFilePicker(inputSelector) {
    const fileInput = document.querySelector(inputSelector);
    if (fileInput) {
      fileInput.click();
    } else {
      console.error("File input element not found!");
    }
  }