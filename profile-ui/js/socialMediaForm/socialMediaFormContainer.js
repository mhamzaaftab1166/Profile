class SocialMediaFormSection extends HTMLElement {
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
    const socialMediaLinks = JSON.parse(
      this.getAttribute("social-data") || "[]"
    );

    this.shadowRoot.innerHTML = `
      <style>
        .form-wrapper {
            width: 300px;
            height: 312px;
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
            border: none;
            font-size: 13.24px;
            line-height: 19.85px;
            font-weight: 400;
            font-family: "Poppins";
            color: #6e55ff;
            text-decoration: underline;
          }
  
          .social-input:focus {
            outline: none;
            box-shadow: none;
          }
  
          .country-code-wrapper {
            position: relative;
            display: flex;
            align-items: center;
          }
  
          .country-select {
            appearance: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            padding-right: 10px;
            background: transparent;
            border: none;
            font-size: 13.24px;
            color: #6e55ff;
            text-decoration: underline;
          }
  
          .dropdown-arrow {
            position: absolute;
            right: 8px;
            pointer-events: none;
            width: 10px;
            height: 5px;
          }
  
          .add-mail-width {
            width: 86%;
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
          width: 55%
          }
      </style>

      <div class="form-wrapper">
        <div class="space-y-3 form-bottom">
          ${socialMediaLinks
            .map(
              (social) => `
            <div class="form-flex-wrapper ${
              social.platform_name === "AddMail" ? "add-mail-width" : ""
            }">
              <div class="fomr-flex width-label">
                <img src="${social.icon}" alt="icon" class="social-icon" />
                <span class="social-form-name">${social.platform_name}</span>
              </div>

              ${
                social.hasPhone
                  ? `
                  <div class="fomr-flex">
                    <div class="country-code-wrapper">
                      <select data-platform="${social.platform_name}" class="social-input country-select">
                        <option value="+971">+971</option>
                        <option value="+1">+1</option>
                        <option value="+44">+44</option>
                        <option value="+91">+91</option>
                      </select>
                    </div>
                    <input type="text" data-platform="${social.platform_name}" class="social-input phone-input" placeholder="050 635 9999" />
                  </div>
                `
                  : social.nonEditAble
                  ? `<p class="addMail-placeholder">${social.linkPlaceholder}</p>`
                  : `
                  <input type="text" data-platform="${social.platform_name}" class="social-input platform-link" placeholder="${social.linkPlaceholder}" />
                `
              }
            </div>
          `
            )
            .join("")}
        </div>
        <action-button isSocialMediaForm="true"></action-button>
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

customElements.define("social-form", SocialMediaFormSection);
