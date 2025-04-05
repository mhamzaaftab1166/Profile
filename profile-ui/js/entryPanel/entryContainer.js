class EntryPanelSection extends HTMLElement {
  static get observedAttributes() {
    return ["entryData"];
  }

  constructor() {
    super();
    this.entryData = {};
  }

    connectedCallback() {
      this.addEventListener("entryDataReceived", (event) => {
        this.entryData = event.detail;   
        console.log(this.entryData, 'userDataentryyyyyyyy');
           
        this.render();
      });
    }
    render() {
      this.innerHTML = `
      <div class="entry-panel-wrapper">
      <div class="entry-panel-inner">
        <img src="assets/icons/addMail.png" alt="Add Mail" />
        <p>${this.entryData.business.code}</p>
      </div>
      <div class="entry-detail-inner">
      <div class="entry-detail-flex divider">
        <p>User Entry :</p>
        <div>
          <p>${this.entryData.business.code} - ${this.entryData.business.permissions}</p>
          <p>${this.entryData.name}</p>
        </div>
      </div>
      <div class="entry-detail-flex divider pad-left">
        <p>Created Date :</p>
        <div>
          <p>31/01/2024</p>
          <p>10:11AM</p>
        </div>
      </div>
      <div class="entry-detail-flex pad-left">
        <p>Modify Date :</p>
        <div>
          <p>31/01/2024</p>
          <p>11:11AM</p>
        </div>
      </div>
    </div>
  </div>
      `;
    }
  }
  
  customElements.define("entry-section", EntryPanelSection);
  