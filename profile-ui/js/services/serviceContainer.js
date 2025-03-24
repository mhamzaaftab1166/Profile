class ServiceSection extends HTMLElement {
  constructor() {
    super();
    this.serviceFormLength = 4;
    this.serviceForm = Array.from({ length: this.serviceFormLength }, () => ({
      id: null,
      service_image: "",
      service_name: "",
      service_description: "",
      is_active: 0,
    }));
    this.services = [
      {
        image: "assets/profile/service1.png",
        title: "Land Acquisition",
        description:
          "Developers identify and acquire suitable land for development projects. This involves conducting feasibility studies, assessing zoning regulations, and negotiating with property owners.",
      },
      {
        image: "assets/profile/service2.png",
        title: "Market Research",
        description:
          "Developers conduct market research to analyze the demand for specific types of properties in a given area. This helps in making informed decisions about the type of development that would be viable and successful.",
      },
      {
        image: "assets/profile/service3.png",
        title: "Feasibility Studies",
        description:
          "Before initiating a project, developers perform feasibility studies to assess the financial viability and potential risks. This includes analyzing construction costs, market conditions, and projected returns on investment.",
      },
      {
        image: "assets/profile/service4.png",
        title: "Design and Planning",
        description:
          "Real estate developers collaborate with architects, urban planners, and other professionals to design the project. This involves creating site plans, obtaining necessary approvals, and ensuring that the design aligns with market demand.",
      },
    ];
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="position-relative service-card">
       <div class="d-flex justify-content-between align-items-center">
        <div class="ms-2 mt-2 toggle-container isServicePrivacy">
          <privacy-button></privacy-button>
        </div>
        <header class="service-head-title">Services</header>
        </div>
        <div class="service-separator"></div>

        <!-- View Mode -->
        <div class="services-wrapper isServiceView">
          <div class="services-grid">
            ${this.services
              .map(
                (service, index) => `
                  <div class="${
                    this.isPrivacy
                      ? "service-card-privacy-wrapper"
                      : "service-card-wrapper"
                  }" key=${index}>
                    <div class="service-inner-card">
                      <img class="service-card-img" src="${
                        service.image
                      }" alt="${service.title}" />
                      <div>
                        <h5 class="service-card-title">${service.title}</h5>
                        <div class="service-separator-line"></div>
                        <p class="service-card-description">${
                          service.description
                        }</p>
                      </div>
                    </div>
                     <div class="service-privacy-button isServicePrivacy">
                      <privacy-button></privacy-button>
                    </div>
                  </div>
                `
              )
              .join("")}
          </div>
        </div>

        <!-- Edit Mode (Initially Hidden) -->
        <div class="services-wrapper isServiceEdit" style="display: none;">
          <div class="services-grid">
            ${this.serviceForm
              .map(
                (form, index) => `
                  <div class="service-card-wrapper" key="${index}" >
                    <div class="service-inner-card">
                      <div class="position-relative">
                        <img class="service-card-img" src="${
                          form.service_image || "assets/profile/coverImage.png"
                        }" alt="services one" />
                        <div class="uploadButton">
                          <button class="add-button">Add Profile Picture</button>
                          <input type="file" accept="image/*" style="display: none" />
                          <p class="file-upload">Choose file</p>
                        </div>
                      </div>
                      <div>
                        <input class="service-card-input-title" placeholder="Service Name Here" name="service_name" value="${
                          form.service_name
                        }" />
                        <div class="service-separator-line"></div>
                        <textarea class="service-card-input-description" name="service_description" placeholder="Type Service Description .." rows="4" cols="3">${
                          form.service_description
                        }</textarea>
                      </div>
                    </div>
                  </div>
                `
              )
              .join("")}
          </div>
          <button class="service-add-button isServiceEdit" type="button" style="display: none;">+ Add More</button>
          <div class="action-button-wrapper">
            <button class="discard-button">Discard</button>
            <button class="save-button">Save</button>
          </div>
        </div>

        <button class="service-browse-button browseButton">
          <span class="service-browse-text">Load More</span>
          <span class="separator-line"></span>
          <img src="assets/profile/rightArrow.png" class="service-browse-icon" alt="Arrow" />
        </button>
      </div>
    `;

    // Get references to view and edit sections
    this.serviceView = this.querySelector(".isServiceView");
    this.serviceEdit = this.querySelector(".isServiceEdit");
    this.servicePrivacy = this.querySelector(".isServicePrivacy");
    this.addMoreButton = this.querySelector(".service-add-button");
    this.browseButton = this.querySelector(".service-browse-button");
    this.isPrivacy = false;

    // Set initial visibility
    this.serviceView.style.display = "block";
    this.serviceEdit.style.display = "none";
    this.servicePrivacy.style.display = "none";
    this.addMoreButton.style.display = "none";
    this.browseButton.style.display = "flex";

    this.querySelectorAll(".isServicePrivacy").forEach((element) => {
      element.style.display = "none";
    });

    // Listen for action changes
    window.addEventListener("actionChange", (event) =>
      this.updateSection(event.detail)
    );
  }

  updateSection({ isEdit, isPrivacy }) {
    this.isPrivacy = isPrivacy;

    if (isEdit) {
      this.serviceView.style.display = "none";
      this.serviceEdit.style.display = "block";
      this.addMoreButton.style.display = "block";
      this.browseButton.style.display = "none";
    } else if (isPrivacy) {
      this.serviceView.style.display = "block";
      this.serviceEdit.style.display = "none";
      this.addMoreButton.style.display = "none";
      this.browseButton.style.display = "flex";
    } else {
      this.serviceView.style.display = "block";
      this.serviceEdit.style.display = "none";
      this.addMoreButton.style.display = "none";
      this.browseButton.style.display = "flex";
    }

    this.querySelectorAll(
      ".service-card-wrapper, .service-card-privacy-wrapper"
    ).forEach((element) => {
      if (isPrivacy) {
        element.classList.remove("service-card-wrapper");
        element.classList.add("service-card-privacy-wrapper");
      } else {
        element.classList.remove("service-card-privacy-wrapper");
        element.classList.add("service-card-wrapper");
      }
    });

    this.querySelectorAll(".isServicePrivacy").forEach((element) => {
      element.style.display = isPrivacy ? "block" : "none";
    });
  }
}

customElements.define("service-section", ServiceSection);
