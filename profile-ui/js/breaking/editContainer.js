class BreakingEditSection extends HTMLElement {
  static get observedAttributes() {
    return ["breakingData"];
  }

  constructor() {
    super();
    this.breakingData = {};
  }

  connectedCallback() {
    this.addEventListener("breakingDataReceived", (event) => {
      this.breakingData = event.detail;
      this.render();
    });
  }

  render() {
    const baseUrl = "https://api.servehere.com/api/storage/image?path=";
    const newsList = this.breakingData || [];

    // Process newsList items: if the image property already contains the baseUrl,
    // set image to null and keep the full URL in imagePreview.
    const processedNewsList = newsList.map((news) => {
      if (news.image) {
        return {
          ...news,
          image: null,
          imagePreview: "https://api.servehere.com/api/storage/image?path="+news.image, // already full URL
        };
      }
      return news;
    });

    const combinedNewsList =
      processedNewsList.length === 0
        ? [
            {
              title: "",
              description: "",
              imagePreview: "./assets/profile/breakBg.png",
              image: null,
              is_active: 0,
            },
          ]
        : [...processedNewsList];


    this.innerHTML = `
    <article
      class="breakedit-card-container"
      x-data='{
        newsList: ${JSON.stringify(combinedNewsList)},

        addNewsCard() {
          this.newsList.unshift({ title: "", description: "", imagePreview: "./assets/profile/breakBg.png", image: null, is_active: 0 });
        },

        selectImage(event, index) {
          let file = event.target.files[0];
          if (file) {
            this.newsList[index].image = file;
            this.newsList[index].imagePreview = URL.createObjectURL(file);
          }
        },

        discardNews(index) {
          this.newsList[index].title = "";
          this.newsList[index].description = "";
          this.newsList[index].imagePreview = "./assets/profile/breakBg.png";
          this.newsList[index].image = null;
          this.newsList[index].is_active = 0;
        },

        saveNews(index) {
          const newsData = {
            title: this.newsList[index].title,
            description: this.newsList[index].description,
            image: this.newsList[index].image || null,
            is_active: this.newsList[index].is_active ? 1 : 0,
            id: this.newsList[index].id || null,
          };
          newsHandler.handleNews(newsData);
        }
      }'
    >
      <section class="edit-news-container mb-3">
        <h2 class="edit-news-heading">Breaking News</h2>
        <button class="edit-add-button" @click="addNewsCard()">+ Add More</button>
      </section>

      <template x-for="(news, index) in newsList" :key="index">
        <section class="breakedit-card mb-4">
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
                      x-model="news.title"
                      class="breakedit-profile-title form-control"
                      placeholder="Title Here"
                    />
                    <time class="breakedit-profile-timestamp">12 April at 09.28 PM</time>
                  </div>
                </header>
                <textarea
                  x-model="news.description"
                  class="breakedit-description form-control"
                  placeholder="Description Here .."
                  rows="8"
                ></textarea>
              </div>
            </div>
            <div class="breakedit-media-column">
              <div class="breakedit-media-content">
                <figure class="breakedit-media-wrapper">
                  <img
                    :src="(news.imagePreview || './assets/profile/breakBg.png')"
                    alt="Background"
                    class="breakedit-background-image"
                  />
                  <label :for="'fileInput' + index">
                    <img
                      src="./assets/profile/chooseButton.png"
                      alt="Choose button"
                      class="breakedit-play-button"
                    />
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    class="hidden-input"
                    :id="'fileInput' + index"
                    @change="selectImage($event, index)"
                  />
                </figure>
              </div>
            </div>
          </div>
          <div class="locedit-action-buttons">
            <button class="locedit-discard-button" @click="discardNews(index)">Discard</button>
            <button class="locedit-save-button" @click="saveNews(index)">Save</button>
          </div>
        </section>
      </template>
    </article>
  `;
  }
}

customElements.define("breaking-edit", BreakingEditSection);
