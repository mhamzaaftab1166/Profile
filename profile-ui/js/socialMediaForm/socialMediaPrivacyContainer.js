class SocialMediaPrivacySection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ["social-data", "privacy-settings"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "social-data" && oldValue !== newValue) {
      this.render();
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "privacy-settings" && oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    const socialMediaLinks = JSON.parse(
      this.getAttribute("social-data") || "[]"
    );
    const socialMediaPrivacy = JSON.parse(
      this.getAttribute("privacy-settings") || "[]"
    );
    console.log(socialMediaPrivacy, "socialMediaPrivacy");
    console.log(socialMediaLinks, "socialMediaLinks");

    this.shadowRoot.innerHTML = `
      <style>
        .form-wrapper {
          width: 300px;
          height: 262px;
          border: 1px solid #6e55ff;
          border-radius: 10px;
          margin-top: 16.01px;
          padding: 10.45px 15px;
          overflow: hidden;
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
          margin: 0 4.33px;
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

        .width-placeholder {
          width: 50%;
        }

        .toggle-track {
          width: 36px;
          height: 16px;
          border-radius: 20px;
          background-color: rgba(255, 255, 255, 1);
          border: 2px solid #c0c0c0;
          position: relative;
          transition: background-color 0.3s ease;
          cursor: pointer;
        }

        .toggle-track[data-checked="1"] {
          background-color: #6e55ff;
        }

        .toggle-track[data-checked="1"] .toggle-handle {
          transform: translate(18px, -50%) !important;
          background-color: #FFFFE4 !important;
        }

        .toggle-handle {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background-color: #6e55ff;
          position: absolute;
          top: 50%;
          left: 2px;
          transform: translateY(-50%);
          transition: transform 0.3s ease, background-color 0.3s ease;
        }
      </style>

      <section>
        <div class="form-wrapper">
          <div class="space-y-3 form-bottom">
            ${socialMediaLinks
              .map((social) => {
                const isEnabled =
                  social.platform_name === "AddMail" ?
                  !!socialMediaPrivacy.add_mail 
                  :
                  social.privacyName === "x"
                    ? !!socialMediaPrivacy.twitter
                    : !!socialMediaPrivacy[social.privacyName];
                return `
                  <div class="form-flex-wrapper">
                    <div class="fomr-flex ${
                      social.platform_name === "AddMail"
                        ? "add-mail-width"
                        : "width-label"
                    }">
                      <div class="ms-2 toggle-wrapper toggle-container">
                        <div
                          class="toggle-track"
                          role="switch"
                          tabindex="0"
                          aria-checked="${isEnabled}"
                          data-checked="${isEnabled ? "1" : "0"}"
                          data-privacy-name="${
                            social.platform_name === "AddMail"
                              ? "add_mail"
                              : social.privacyName === "x"
                              ? "twitter"
                              : social.privacyName
                          }"
                        >
                          <div class="toggle-handle"></div>
                        </div>
                      </div>
                      <img src="${
                        social.icon
                      }" alt="icon" class="social-icon" />
                      <span class="social-form-name">${
                        social.platform_name
                      }</span>
                    </div>
                    <p class="addMail-placeholder p-0 width-placeholder" title=${
                      social.platform_link
                    }>
                      ${
                        social.nonEditAble
                          ? social.linkPlaceholder
                          : social.hasPhone
                          ? social.country_code + social.phone_number
                          : social.platform_link
                      }
                    </p>
                  </div>
                `;
              })
              .join("")}
          </div>
        </div>
      </section>
    `;

    this.addEventListeners();
  }

  addEventListeners() {
    // Input listeners (if any editable fields exist)
    this.shadowRoot.querySelectorAll(".social-input").forEach((input) => {
      input.addEventListener("input", (event) => {
        const platform = event.target.dataset.platform;
        console.log(`Updated ${platform}:`, event.target.value);
      });
    });

    // Toggle switch listeners
    this.shadowRoot.querySelectorAll(".toggle-track").forEach((toggle) => {
      toggle.addEventListener("click", () => {
        const isChecked = toggle.getAttribute("data-checked") === "1";
        const newState = !isChecked;
        toggle.setAttribute("data-checked", newState ? "1" : "0");
        toggle.setAttribute("aria-checked", newState.toString());
        console.log("Toggle state changed:", newState);

        // Retrieve the privacy name from the data attribute
        const privacyKey = toggle.getAttribute("data-privacy-name");
        // Call the API passing an object with the privacy key and its new state
        SocialMediaHandler.handleSocialMediaPrivacy(
          JSON.stringify({ [privacyKey]: newState })
        );
      });
    });
  }
}

customElements.define("social-privacy", SocialMediaPrivacySection);
