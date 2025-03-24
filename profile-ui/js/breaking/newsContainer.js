class BreakingSection extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <article class="breakview-card-container" x-data="{
        cards: [
          {
            location: 'New Damac Hills',
            timestamp: '12 April at 09.28 PM',
            description: 'YOUR DREAM DUBAI LIFESTYLE IS CALLING\\n\\nAre you ready to live the dream Dubai lifestyle? At DAMAC Properties, we offer luxury villas in lifestyle communities, waterfront apartments in Dubai Marina, and Hollywood-inspired hotel rooms close to the Burj Area. Our exciting investment opportunities guarantee returns of up to 8% on selected projects.',
            profileImage: 'assets/profile/breaking.png',
            contentImage: 'assets/profile/breaking.png'
          },
          {
            location: 'New Damac Hills',
            timestamp: '12 April at 09.28 PM',
            description: 'YOUR DREAM DUBAI LIFESTYLE IS CALLING\\n\\nAre you ready to live the dream Dubai lifestyle? At DAMAC Properties, we offer luxury villas in lifestyle communities, waterfront apartments in Dubai Marina, and Hollywood-inspired hotel rooms close to the Burj Area. Our exciting investment opportunities guarantee returns of up to 8% on selected projects.',
            profileImage: 'assets/profile/breaking.png',
            contentImage: 'assets/profile/breaking.png'
          }
        ],
        checked: false,
        togglePrivacy() {
          console.log('Privacy checked value:', this.checked);
        }
      }">
        <section class="edit-news-container mb-3">
          <h2 class="edit-news-heading">Breaking News</h2>
        </section>
        <template x-for="(card, index) in cards" :key="index">
          <div class="breakview-card" style="display: flex; align-items: center; position: relative;">
            <header class="breakview-card-header">
              <img :src="card.profileImage" alt="Profile" class="breakview-profile-image" />
              <div class="breakview-header-content">
                <h2 class="breakview-location-title" x-text="card.location"></h2>
                <time class="breakview-timestamp" x-text="card.timestamp"></time>
              </div>
            </header>
            <!-- Separate container for dot and toggle -->
            <div class="toggle-container" style="position: absolute; top: 20px; right: 20px;">
              <img
                src="assets/profile/dots.png"
                alt="Menu Dots"
                class="dot-icon"
                style="width: 24px; height: 5px; object-fit: contain; cursor: pointer;"
              />
              <div
                class="toggle-track isBreakingPrivacy"
                role="switch"
                tabindex="0"
                :aria-checked="checked.toString()"
                :data-checked="checked ? '1' : '0'"
                @click="checked = !checked; togglePrivacy()"
                aria-label="Privacy toggle switch"
                style="display: none;"
              >
                <div class="toggle-handle"></div>
              </div>
            </div>
            <section class="breakview-content-section" data-el="div-1">
              <div class="breakview-content-columns">
                <div class="breakview-text-column">
                  <p class="breakview-description-text" x-text="card.description"></p>
                </div>
                <figure class="breakview-image-column">
                  <img :src="card.contentImage" alt="Dubai Lifestyle" class="breakview-content-image" />
                </figure>
              </div>
            </section>
          </div>
        </template>
      </article>
    `;

    // Allow Alpine to render dynamic elements before selecting them.
    setTimeout(() => {
      // Get all toggle switch elements and dot icons
      this.toggleSwitches = this.querySelectorAll(".isBreakingPrivacy");
      this.dotIcons = this.querySelectorAll(".dot-icon");

      // Default display: show dots, hide toggle switches
      this.dotIcons.forEach((dot) => (dot.style.display = "block"));
      this.toggleSwitches.forEach((toggle) => (toggle.style.display = "none"));
    }, 0);

    window.addEventListener("actionChange", (event) =>
      this.updateSection(event.detail)
    );
  }

  updateSection({ isEdit, isPrivacy }) {
    // Update all matching elements based on the state
    if (isEdit) {
      this.dotIcons.forEach((dot) => (dot.style.display = "none"));
      this.toggleSwitches.forEach((toggle) => (toggle.style.display = "none"));
    } else if (isPrivacy) {
      this.dotIcons.forEach((dot) => (dot.style.display = "none"));
      this.toggleSwitches.forEach((toggle) => (toggle.style.display = "block"));
    } else {
      this.dotIcons.forEach((dot) => (dot.style.display = "block"));
      this.toggleSwitches.forEach((toggle) => (toggle.style.display = "none"));
    }
  }
}

customElements.define("breaking-section", BreakingSection);
