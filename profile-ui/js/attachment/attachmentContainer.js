class AttachmentSection extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="license-permissions-container" x-data="{ uploads: [{ title: '', file: null }], checked: false, togglePrivacy() {
        console.log('Privacy checked value:', this.checked);
      }}">
        <article class="license-permissions-card">
          <div class="d-flex justify-content-between align-items-center">
            <div class="ms-2 toggle-container isAttachmentPrivacy">
              <div
                class="toggle-track"
                role="switch"
                tabindex="0"
                :aria-checked="checked.toString()"
                aria-label="Privacy toggle switch"
                :data-checked="checked ? '1' : '0'"
                @click="checked = !checked; togglePrivacy()"
              >
                <div class="toggle-handle"></div>
              </div>
            </div>
            <h2 class="license-permissions-title mb-0">Attachments</h2>
            <button class="ms-3 license-btn license-btn-download license-btn-secondary isAttachmentEdit" style="width: 120px;" @click="uploads.push({ title: '', file: null })">+ Add More</button>
          </div>
          <hr class="license-separator-line" />

          <div class="license-license-entry">
            <div class="license-license-info">
              <h3 class="license-license-name">Simon Junior License</h3>
              <time class="license-license-date">12 April at 09.28 PM</time>
            </div>
            <div class="license-action-buttons">
              <div class="toggle-container isAttachmentPrivacy">
                <div
                  class="toggle-track"
                  role="switch"
                  tabindex="0"
                  :aria-checked="checked.toString()"
                  aria-label="Privacy toggle switch"
                  :data-checked="checked ? '1' : '0'"
                  @click="checked = !checked; togglePrivacy()"
                >
                  <div class="toggle-handle"></div>
                </div>
              </div>
              <button class="isAttachmentEdit license-btn">Delete</button>
              <button class="license-btn license-btn-secondary">View</button>
              <button class="license-btn license-btn-download license-btn-secondary">Download</button>
            </div>
          </div>
          <hr class="license-divider" />
          <template x-for="(upload, index) in uploads" :key="index">
            <div class="license-upload-section mb-3 isAttachmentEdit">
              <input 
                type="text" 
                class="license-file-name-input" 
                x-model="upload.title" 
                placeholder="Type File Name Here" 
              />
              <input 
                type="file" 
                x-ref="fileInput" 
                class="d-none" 
                @change="upload.file = $event.target.files[0]" 
              />

              <div class="license-action-buttons">
                <button 
                  class="license-btn license-btn-secondary" 
                  @click="$refs.fileInput.click()">Choose File</button>
                <button 
                  class="license-btn license-btn-secondary" 
                  @click="console.log({ title: upload.title, file: upload.file })">
                  Upload
                </button>
              </div>
            </div>
          </template>
          <button class="browse-button">
            <span class="browse-text">Browse All</span>
            <span class="separator-line"></span>
            <img
                src="assets/profile/rightArrow.png"
                class="arrow-icon"
                alt="Arrow"
            />
          </button>
        </article>
      </section>
    `;
    this.attachmentEdits = this.querySelectorAll(".isAttachmentEdit");
    this.attachmentPrivacies = this.querySelectorAll(".isAttachmentPrivacy");

    this.attachmentEdits.forEach((button) => (button.style.display = "none"));
    this.attachmentPrivacies.forEach(
      (button) => (button.style.display = "none")
    );

    window.addEventListener("actionChange", (event) =>
      this.updateSection(event.detail)
    );
  }

  updateSection({ isEdit, isPrivacy }) {
    if (isEdit) {
      this.attachmentEdits.forEach(
        (button) => (button.style.display = "block")
      );
      this.attachmentPrivacies.forEach(
        (button) => (button.style.display = "none")
      );
    } else if (isPrivacy) {
      this.attachmentEdits.forEach((button) => (button.style.display = "none"));
      this.attachmentPrivacies.forEach(
        (button) => (button.style.display = "block")
      );
    } else {
      this.attachmentEdits.forEach((button) => (button.style.display = "none"));
      this.attachmentPrivacies.forEach(
        (button) => (button.style.display = "none")
      );
    }
  }
}

customElements.define("attachment-section", AttachmentSection);
