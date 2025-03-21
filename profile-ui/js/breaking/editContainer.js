class BreakingEditSection extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
  <article class="breakedit-card-container">
      <section
        class="breakedit-card"
        x-data="{
          title: '',
          description: '',
          imagePreview: './assets/profile/breakBg.png',
          selectedFile: null,

          selectImage(event) {
            let file = event.target.files[0];
            if (file) {
              this.selectedFile = file;
              this.imagePreview = URL.createObjectURL(file);
            }
          },

          saveData() {
            console.log('Title:', this.title);
            console.log('Description:', this.description);
            console.log('Selected Image:', this.selectedFile ? this.selectedFile : 'No image selected');
          }
        }"
      >
        <div class="breakedit-card-content">
          <div class="breakedit-info-column">
            <div class="breakedit-info-content">
              <header class="breakedit-profile-section">
                <img
                  src="./assets/profile/breakprofile.png"
                  alt="Profile"
                  class="breakedit-profile-image"
                />
                <div class="breakedit-profile-details">
                  <input
                    type="text"
                    x-model="title"
                    class="breakedit-profile-title form-control"
                    placeholder="Title Here"
                  />
                  <time class="breakedit-profile-timestamp">12 April at 09.28 PM</time>
                </div>
              </header>
              <textarea
                x-model="description"
                class="breakedit-description form-control"
                placeholder="Description Here .."
                rows="8"
              ></textarea>
            </div>
          </div>
          <div class="breakedit-media-column">
            <div class="breakedit-media-content">
              <figure class="breakedit-media-wrapper">
                <!-- Display Selected Image -->
                <img
                  :src="imagePreview"
                  alt="Background"
                  class="breakedit-background-image"
                />
                
                <!-- Play Button (Always Visible) -->
                <img
                  src="./assets/profile/chooseButton.png"
                  alt="Play button"
                  class="breakedit-play-button"
                  @click="$refs.fileInput.click()"
                />

                <!-- Hidden File Input -->
                <input
                  type="file"
                  accept="image/*"
                  class="hidden-input"
                  x-ref="fileInput"
                  @change="selectImage"
                />
              </figure>
              <div class="breakedit-controls-section"></div>
            </div>
          </div>
        </div>
        <div class="locedit-action-buttons">
          <button class="locedit-discard-button" @click="title=''; description=''; imagePreview='./assets/profile/breakBg.png'; selectedFile=null;">
            Discard
          </button>
          <button class="locedit-save-button" @click="saveData()">
            Save
          </button>
        </div>
      </section>
    </article>
    `;
  }
}

customElements.define("breaking-edit", BreakingEditSection);
