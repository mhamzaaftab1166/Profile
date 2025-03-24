class SocialMediaPrivacySection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ["social-data"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "social-data" && oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    const socialMediaLinks = JSON.parse(this.getAttribute("social-data") || "[]");

    this.shadowRoot.innerHTML = `
      <style>
        .form-wrapper {
          width: 300px;
          height: 262px;
          border: 1px solid #6e55ff;
          border-radius: 10px;
          margin-top: 16.01px;
          padding: 10.45px 15px;
        }

        .form-bottom {
          margin-bottom: 19px;
        }

        .form-flex-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 13px;
        }

        .fomr-flex {
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .social-icon {
          width: 18.44px;
          height: 18.44px;
          object-fit: contain;
          margin-right: 4.33px;
        }

        .social-form-name {
          font-size: 13.24px;
          line-height: 19.85px;
          font-weight: 600;
          font-family: "Poppins";
        }

        .social-input {
          border: none;
          font-size: 13.24px;
          line-height: 19.85px;
          font-weight: 400;
          font-family: "Poppins";
          color: #6e55ff;
          text-decoration: underline;
        }

        .social-input::placeholder {
          color: #6e55ff;
          text-decoration: underline;
        }

        .social-input:focus {
          outline: none;
          box-shadow: none;
        }

        .add-mail-width {
          width: 37%;
        }

        .addMail-placeholder {
          margin: 0;
          font-size: 12.24px;
          line-height: 19.85px;
          font-weight: 400;
          font-family: "Poppins";
        }

        .action-buttons {
          margin-right: 40px;
        }

        .width-label {
          width: 45%;
        }
        
        .width-placeholder {
          width: 55%;
        }
      </style>

      <div class="form-wrapper">
        <div class="space-y-3 form-bottom">
          ${socialMediaLinks
            .map(
              (social) => `
                <div class="form-flex-wrapper">
                  <div class="fomr-flex ${social.platform_name === "AddMail" ? "add-mail-width" : "width-label"}">
                    <privacy-button></privacy-button>
                    <img src="${social.icon}" alt="icon" class="social-icon" />
                    <span class="social-form-name">${social.platform_name}</span>
                  </div>
                  <p class="addMail-placeholder p-0 width-placeholder">
                    ${social.linkPlaceholder}
                  </p>
                </div>
              `
            )
            .join("")}
        </div>
      </div>
    `;

    this.addEventListeners();
  }

  addEventListeners() {
    this.shadowRoot.querySelectorAll(".social-input").forEach((input) => {
      input.addEventListener("input", (event) => {
        const platform = event.target.dataset.platform;
        console.log(`Updated ${platform}:`, event.target.value);
      });
    });
  }
}

customElements.define("social-privacy", SocialMediaPrivacySection);
