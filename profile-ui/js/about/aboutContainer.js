class AboutSection extends HTMLElement {
  constructor() {
    super();
    this.aboutProfile = [
      { label: "Email", value: "thariq.salina@gmail.com", type: "email" },
      { label: "Phone Number", value: "+971 556975051", type: "tel" },
      { label: "Website", value: "salina-limited.com", type: "text" },
      {
        label: "Gender",
        value: "Male",
        type: "select",
        option: ["Male", "Female"],
      },
      { label: "Date Of Birth", value: "1990-01-01", type: "date" },
      {
        label: "Nationality",
        value: "India",
        type: "select",
        option: ["India", "Pakistan", "United Arab Emirates"],
      },
      { label: "National ID Number", value: "1234567890", type: "text" },
      { label: "License Number", value: "LIC-987654321", type: "text" },
      { label: "Expiry Date", value: "2030-12-31", type: "date" },
      { label: "Permissions", value: "Full Access", type: "text" },
      { label: "Other", value: "N/A", type: "text" },
      {
        label: "Country",
        value: "United Arab Emirates",
        type: "select",
        option: ["India", "Pakistan", "United Arab Emirates"],
      },
      {
        label: "Province/State",
        value: "Dubai",
        type: "select",
        option: ["Dubai", "Ajman", "Sharjah", "Al Ain"],
      },
      {
        label: "City",
        value: "Dubai",
        type: "select",
        option: ["Dubai", "Ajman", "Sharjah", "Al Ain"],
      },
      { label: "Postal/Zip Code", value: "00000", type: "text" },
      { label: "Address", value: "Downtown, Dubai, UAE", type: "text" },
    ];
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="about-card">
        <header class="about-card-title">About Profile</header>
        <div class="about-separator"></div>
        <div class="isAboutEdit">
          <div class="about-container">
            <textarea class="about-input-description" name="description" placeholder="Enter Your Description" rows="2" cols="3">Karachi Darbar Hotel is a well-known hospitality destination in Pakistan, renowned for its warm hospitality, comfortable accommodations, and authentic Pakistani cuisine.</textarea>
            <div class="separator-full-line"></div>
            <div class="about-form-container">
              ${this.aboutProfile
                .map((detail) => this.renderInputField(detail))
                .join("")}
            </div>
          </div>
          <div class="action-button-wrapper">
            <button class="discard-button">Discard</button>
            <button class="save-button">Save</button>
          </div>
        </div>
        <div class="about-container isAboutView">
        <div class="about-inner-wrapper-privacy">
         <privacy-button class="isAboutPrivacy"></privacy-button>
          <label class="about-label col-5 isAboutPrivacy">About</label>
          </div>
          <p class="about-description">Karachi Darbar Hotel is a well-known hospitality destination in Pakistan, renowned for its warm hospitality, comfortable accommodations, and authentic Pakistani cuisine. Whether you're a traveler looking for a relaxing stay or a foodie eager to indulge in delicious traditional flavors, Karachi Darbar offers an experience that blends comfort!</p>
          <div class="separator-full-line"></div>
          <div class="about-form-container">
            ${this.aboutProfile
              .map(
                (detail) => `
              <div class="${
                this.isPrivacy
                  ? "about-inner-wrapper-privacy"
                  : "about-inner-wrapper"
              }">
                <privacy-button class="isAboutPrivacy"></privacy-button>
                <label class="about-label col-5">${detail.label}</label>
                <p class="about-content col-10">${detail.value}</p>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      </div>
    `;    

    this.aboutView = this.querySelector(".isAboutView");
    this.aboutEdit = this.querySelector(".isAboutEdit");
    this.aboutView.style.display = "block";
    this.aboutEdit.style.display = "none";
    this.isPrivacy = false;

    this.querySelectorAll(".isAboutPrivacy").forEach((element) => {
      element.style.display = "none";
  });

    window.addEventListener("actionChange", (event) =>
      this.updateSection(event.detail)
    );
  }

  renderInputField(detail) {
    switch (detail.type) {
      case "select":
        return `
          <div class="about-inner-wrapper">
            <label class="about-label col-5">${detail.label}</label>
            <div class="about-select-wrapper select-width">
              <select name="${detail.label
                .toLowerCase()
                .replace(
                  /\s+/g,
                  "_"
                )}" class="about-input-content about-select col-12">
                <option value="" disabled ${
                  !detail.value ? "selected" : ""
                }>Select</option>
                ${detail.option
                  ?.map(
                    (option) => `
                  <option value="${option}" ${
                      option === detail.value ? "selected" : ""
                    }>${option}</option>
                `
                  )
                  .join("")}
              </select>
              <img src="assets/icons/arrow-down-blue.png" alt="arrow" class="dropdown-arrow" />
            </div>
          </div>
        `;
      case "date":
        return `
          <div class="about-inner-wrapper">
            <label class="about-label col-5">${detail.label}</label>
            <input name="${detail.label
              .toLowerCase()
              .replace(
                /\s+/g,
                "_"
              )}" class="about-input-content col-4 hide-date-icon" type="date" value="${
          detail.value
        }" />
          </div>
        `;
      default:
        return `
          <div class="about-inner-wrapper">
            <label class="about-label col-5">${detail.label}</label>
            <input name="${detail.label
              .toLowerCase()
              .replace(/\s+/g, "_")}" class="about-input-content col-9" type="${
          detail.type
        }" value="${detail.value}" placeholder="Enter" />
          </div>
        `;
    }
  }

  updateSection({ isEdit, isPrivacy }) {
    this.isPrivacy = isPrivacy;    

    if (isEdit) {
      this.aboutView.style.display = "none";
      this.aboutEdit.style.display = "block";
    } else if (isPrivacy) {

      this.aboutView.style.display = "block";
      this.aboutEdit.style.display = "none";
    } else {
      this.aboutView.style.display = "block";
      this.aboutEdit.style.display = "none";
    }
    this.querySelectorAll(".about-inner-wrapper, .about-inner-wrapper-privacy").forEach((element) => {
      if (isPrivacy) {
        element.classList.remove("about-inner-wrapper");
        element.classList.add("about-inner-wrapper-privacy");
      } else {
        element.classList.remove("about-inner-wrapper-privacy");
        element.classList.add("about-inner-wrapper");
      }
    });
    
    this.querySelectorAll(".isAboutPrivacy").forEach((element) => {
      element.style.display = isPrivacy ? "block" : "none";
    });
  }
}

customElements.define("about-section", AboutSection);
