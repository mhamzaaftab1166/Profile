class BreakingSection extends HTMLElement {
  static get observedAttributes() {
    return ["breakingData"];
  }

  constructor() {
    super();
    this.breakingData = {};
    // Store the current mode: isEdit and isPrivacy.
    this.currentMode = { isEdit: false, isPrivacy: false };
  }

  connectedCallback() {
    this.addEventListener("breakingDataReceived", (event) => {
      this.breakingData = event.detail;
      this.render();
    });

    window.addEventListener("actionChange", (event) => {
      this.updateSection(event.detail);
    });

    window.addEventListener("profileDataSaved", () => {
      this.render();
    });
  }

  render() {
    const baseUrl = "https://api.servehere.com/api/storage/image?path=";
    const news = this.breakingData || [];
    const transformedNews = news?.breakingNews.map((item) => ({
      ...item,
      image: `${baseUrl}${item.image}`,
    }));
    console.log(transformedNews, "Transformed News");

    const newsJson = JSON.stringify(transformedNews).replace(/"/g, "&quot;");
    this.innerHTML = `
  <article class="breakview-card-container" x-data="{
    cards: ${newsJson}, 
    togglePrivacy(news) {
        const newStatus = news.is_active ? 0 : 1;
        console.log('Toggled:', newStatus);
        newsHandler.changeNewsStatus({
          id: news.id,
          payload: { is_active: newStatus }
        });
    }
  }">
    <section class="edit-news-container mb-3">
      <h2 class="edit-news-heading">Breaking News</h2>
    </section>

    <template x-if="cards.length === 0">
      <p class="no-records-message" style="text-align: center; font-size: 18px; color: gray;">No records found</p>
    </template>

    <template x-for="(card, index) in cards" :key="index">
      <div class="breakview-card" style="display: flex; align-items: center; position: relative;">
        <header class="breakview-card-header">
          <img src="assets/profile/breakprofile.png" alt="Profile" class="breakview-profile-image" />
          <div class="breakview-header-content">
            <h2 class="breakview-location-title" x-text="card.title"></h2>
            <time class="breakview-timestamp" x-text="card.updated_at"></time>
          </div>
        </header>

        <!-- Dot Menu and Toggle Switch -->
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
            :aria-checked="card.is_active.toString()"
            :data-checked="card.is_active ? '1' : '0'"
            @click="togglePrivacy(card)"
            aria-label="Privacy toggle switch"
            style="display: none;"
          >
            <div class="toggle-handle"></div>
          </div>
        </div>

        <section class="breakview-content-section">
          <div class="breakview-content-columns">
            <div class="breakview-text-column">
              <p class="breakview-description-text" x-text="card.description"></p>
            </div>
            <figure class="breakview-image-column">
              <img :src="card.image" alt="News Image" class="breakview-content-image" />
            </figure>
          </div>
        </section>
      </div>
    </template>
  </article>
`;

    // Ensure elements are available before modifying them.
    setTimeout(() => {
      this.toggleSwitches = this.querySelectorAll(".isBreakingPrivacy");
      this.dotIcons = this.querySelectorAll(".dot-icon");

      // Reapply the current mode.
      if (this.currentMode.isEdit) {
        this.dotIcons.forEach((dot) => (dot.style.display = "none"));
        this.toggleSwitches.forEach(
          (toggle) => (toggle.style.display = "none")
        );
        this._toggleNewsEntries(true);
      } else if (this.currentMode.isPrivacy) {
        this.dotIcons.forEach((dot) => (dot.style.display = "none"));
        this.toggleSwitches.forEach(
          (toggle) => (toggle.style.display = "block")
        );
        this._toggleNewsEntries(true);
      } else {
        this.dotIcons.forEach((dot) => (dot.style.display = "block"));
        this.toggleSwitches.forEach(
          (toggle) => (toggle.style.display = "none")
        );
        this._toggleNewsEntries(false);
      }
    }, 0);

    window.addEventListener("actionChange", (event) =>
      this.updateSection(event.detail)
    );
  }

  updateSection({ isEdit, isPrivacy }) {
    // Save the current mode.
    this.currentMode.isEdit = isEdit;
    this.currentMode.isPrivacy = isPrivacy;
    if (isEdit) {
      this.dotIcons.forEach((dot) => (dot.style.display = "none"));
      this.toggleSwitches.forEach((toggle) => (toggle.style.display = "none"));
      this._toggleNewsEntries(true);
    } else if (isPrivacy) {
      this.dotIcons.forEach((dot) => (dot.style.display = "none"));
      this.toggleSwitches.forEach((toggle) => (toggle.style.display = "block"));
      this._toggleNewsEntries(true);
    } else {
      this.dotIcons.forEach((dot) => (dot.style.display = "block"));
      this.toggleSwitches.forEach((toggle) => (toggle.style.display = "none"));
      this._toggleNewsEntries(false);
    }
  }

  _toggleNewsEntries(showAll) {
    // Loop through each breaking news card.
    const cards = this.querySelectorAll(".breakview-card");
    cards.forEach((card) => {
      const toggle = card.querySelector(".toggle-track.isBreakingPrivacy");
      const isActive = toggle ? toggle.getAttribute("data-checked") : "0";
      if (showAll || isActive === "0") {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  }
}

customElements.define("breaking-section", BreakingSection);
