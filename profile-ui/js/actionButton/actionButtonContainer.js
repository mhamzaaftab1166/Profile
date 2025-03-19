class ActionButtonSection extends HTMLElement {
    connectedCallback() {
      // Get the boolean value of the isSocialMediaForm attribute
      const isSocialMediaForm = this.getAttribute("isSocialMediaForm") === "true";
  
      this.innerHTML = `
        <style>
        .action-button-wrapper {
          display: flex;
          align-items: center;
          justify-content: end;
          gap: 8px;
        }
        .discard-sm-button {
          border: 1px solid #8c8c8c;
          border-radius: 5.13px;
          text-align: center;
          padding: 3px 18px;
          font-size: 9.11px;
          font-family: "Poppins";
          font-weight: 600;
          line-height: 13.66px;
          color: #000000;
          cursor: pointer;
          background-color: #ffffff;
        }
        .discard-button {
          border: 1px solid #8c8c8c;
          border-radius: 7.51px;
          text-align: center;
          padding: 3px 26px;
          font-size: 13.34px;
          font-family: "Poppins";
          font-weight: 600;
          line-height: 20.01px;
          color: #000000;
          cursor: pointer;
          background-color: #ffffff;
        }
        .save-sm-button {
          border: 1px solid #6e55ff;
          border-radius: 5.13px;
          text-align: center;
          padding: 3px 30px;
          font-size: 9.11px;
          font-family: "Poppins";
          font-weight: 600;
          line-height: 13.66px;
          color: #ffffff;
          cursor: pointer;
          background-color: #6e55ff;
        }
        .save-button {
          border: 1px solid #6e55ff;
          border-radius: 7.51px;
          text-align: center;
          padding: 3px 39px;
          font-size: 13.34px;
          font-family: "Poppins";
          font-weight: 600;
          line-height: 20.01px;
          color: #ffffff;
          cursor: pointer;
          background-color: #6e55ff;
        }          
        </style>
  
        <div class="action-button-wrapper">
          <button class="${isSocialMediaForm ? 'discard-sm-button' : 'discard-button'}">
            Discard
          </button>
          <button class="${isSocialMediaForm ? 'save-sm-button' : 'save-button'}">
            Save
          </button>
        </div>
      `;
    }
  }
  
  customElements.define("action-button", ActionButtonSection);
  