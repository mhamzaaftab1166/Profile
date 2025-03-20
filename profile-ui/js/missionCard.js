class MissionCard extends HTMLElement {
  static get observedAttributes() {
    return ["my-prop"];
  }

  constructor() {
    super();
  }

  // attributeChangedCallback(name, oldValue, newValue) {
  //   console.log(`Attribute '${name}' changed from ${oldValue} to ${newValue}`);
  // }

  connectedCallback() {
    const myProp = this.getAttribute("my-prop");
    console.log("Connected - myProp:", myProp);
    this.innerHTML = `
      <section class="misson-description-card" x-data="{
        mission: '',
        vision: '',
        values: '',
        id: false,
        myProp: '${myProp}',
        updateMissionData(data) {
          console.log('Mission received:', data);
          // Update reactive properties
          this.mission = data.mission;
          this.vision = data.vision;
          this.values = data.values;
          this.id = data.id || false;
        },
        saveMission() {
          // Use current reactive state values
          MissionHandler.handleMission(
            this.mission,
            this.vision,
            this.values,
            this.id,
            this.updateMissionData.bind(this),
            this.myProp
          );
        }
      }" x-init="MissionHandler.fetchMission(updateMissionData.bind($data))">
      
      <div class="d-flex justify-content-between align-items-center gap-2">
        <privacy-button class="isMissionPrivacy"></privacy-button>
        <header class="misson-card-title">Mission & Vision & Values</header>
      </div>
      <div class="misson-separator"></div>
      <div class="misson-card-content">
      
        <div class="misson-mission-section misson-content-section">
          <div class="d-flex justify-content-start align-items-center gap-2">
            <privacy-button class="isMissionPrivacy"></privacy-button>
            <span class="misson-section-title">Mission</span>
          </div>
          <br />
          <!-- Both the input and span are always in the DOM -->
          <input type="text" x-model="mission" class="misson-section-text isMissionEdit" />
          <span class="misson-section-text-view viewOnly mt-1" x-text="mission"></span>
        </div>
        
        <div class="misson-vision-section misson-content-section">
          <div class="d-flex justify-content-start align-items-center gap-2">
            <privacy-button class="isMissionPrivacy"></privacy-button>
            <span class="misson-section-title">Vision</span>
          </div>
          <br />
          <input type="text" x-model="vision" class="misson-section-text isMissionEdit" />
          <span class="misson-section-text-view viewOnly mt-1" x-text="vision"></span>
        </div>
        
        <div class="misson-values-section misson-content-section">
          <div class="d-flex justify-content-start align-items-center gap-2">
            <privacy-button class="isMissionPrivacy"></privacy-button>
            <span class="misson-section-title">Values</span>
          </div>
          <br />
          <input type="text" x-model="values" class="misson-section-text isMissionEdit" />
          <span class="misson-section-text-view viewOnly mt-1" x-text="values"></span>
        </div>
        
        <div class="misson-button-group isMissionEdit">
          <button class="misson-discard-button" @click="mission=''; vision=''; values=''">
            Discard
          </button>
          <button class="misson-save-button" @click="saveMission()">
            Save
          </button>
        </div>
      </div>
      </section>
    `;

    // Select the elements that will be toggled by external events.
    this.missionEdits = this.querySelectorAll(".isMissionEdit");
    this.missionPrivacies = this.querySelectorAll(".isMissionPrivacy");
    this.viewOnlyTexts = this.querySelectorAll(".viewOnly");

    // Initial state: show viewOnly texts, hide inputs.
    this.missionEdits.forEach((el) => (el.style.display = "none"));
    this.viewOnlyTexts.forEach((el) => (el.style.display = "block"));
    this.missionPrivacies.forEach((el) => (el.style.display = "none"));

    window.addEventListener("actionChange", (event) =>
      this.updateSection(event.detail)
    );
  }

  updateSection({ isEdit, isPrivacy }) {
    if (isEdit) {
      this.missionEdits.forEach((el) => (el.style.display = "block"));
      this.viewOnlyTexts.forEach((el) => (el.style.display = "none"));
      this.missionPrivacies.forEach((el) => (el.style.display = "none"));
    } else if (isPrivacy) {
      this.missionEdits.forEach((el) => (el.style.display = "none"));
      this.viewOnlyTexts.forEach((el) => (el.style.display = "block"));
      this.missionPrivacies.forEach((el) => (el.style.display = "block"));
    } else {
      this.missionEdits.forEach((el) => (el.style.display = "none"));
      this.viewOnlyTexts.forEach((el) => (el.style.display = "block"));
      this.missionPrivacies.forEach((el) => (el.style.display = "none"));
    }
  }
}

customElements.define("mission-card", MissionCard);
