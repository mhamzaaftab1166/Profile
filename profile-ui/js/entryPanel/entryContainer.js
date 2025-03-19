class EntryPanelSection extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
      <div class="entry-panel-wrapper">
      <div class="entry-panel-inner">
        <img src="assets/icons/addMail.png" alt="Add Mail" />
        <p>OGDA MAC1</p>
      </div>
      <div class="entry-detail-inner">
      <div class="entry-detail-flex divider">
        <p>User Entry :</p>
        <div>
          <p>DE OGDA MAC1 - 6331</p>
          <p>Mohammad Othman</p>
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
  