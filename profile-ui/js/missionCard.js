class MissionCard extends HTMLElement {
  static get observedAttributes() {
    return ["missionData"];
  }

  constructor() {
    super();
    this.missionData = {};
  }

  connectedCallback() {
    this.addEventListener("missionDataReceived", (event) => {
      this.missionData = event.detail;
      this.render();
    });
  }

  render() {
    const missionValue = this.missionData.mission || "";
    const visionValue = this.missionData.vision || "";
    const valuesValue = this.missionData.values || "";
    this.innerHTML = `
      <section class="misson-description-card" x-data="{
       mission: '${missionValue}',
        vision: '${visionValue}',
        values: '${valuesValue}',
        id: false,
        checked: false,
         togglePrivacy() {
        console.log('Privacy checked value:', this.checked);
      },
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
          );
        }
      }">

      <div class="d-flex justify-content-between align-items-center gap-2">
            <div class="ms-2 toggle-container isMissionPrivacy">
              <div
                class="toggle-track"
                role="switch"
                tabindex="0"
                :aria-checked="checked.toString()"
                aria-label="Privacy toggle switch"
                :data-checked="checked ? '1' : '0'"
                @click="checked = !checked; togglePrivacy()"
              >
                <div class="toggle-handle"></div>
              </div>
            </div>
        <header class="misson-card-title">Mission & Vision & Values</header>
      </div>
      <div class="misson-separator"></div>
      <div class="misson-card-content">

        <div class="misson-mission-section misson-content-section">
          <div class="d-flex justify-content-start align-items-center gap-2">
            <div class="ms-2 toggle-container isMissionPrivacy">
              <div
                class="toggle-track"
                role="switch"
                tabindex="0"
                :aria-checked="checked.toString()"
                aria-label="Privacy toggle switch"
                :data-checked="checked ? '1' : '0'"
                @click="checked = !checked; togglePrivacy()"
              >
                <div class="toggle-handle"></div>
              </div>
            </div>
            <span class="misson-section-title">Mission</span>
          </div>
          <br />
          <!-- Both the input and span are always in the DOM -->
          <input type="text" x-model="mission" placeholder="Enter Mission" class="misson-section-text isMissionEdit" />
          <span class="misson-section-text-view viewOnly mt-1" x-text="mission"></span>
        </div>

        <div class="misson-vision-section misson-content-section">
          <div class="d-flex justify-content-start align-items-center gap-2">
          <div class="ms-2 toggle-container isMissionPrivacy">
              <div
                class="toggle-track"
                role="switch"
                tabindex="0"
                :aria-checked="checked.toString()"
                aria-label="Privacy toggle switch"
                :data-checked="checked ? '1' : '0'"
                @click="checked = !checked; togglePrivacy()"
              >
                <div class="toggle-handle"></div>
              </div>
            </div>
            <span class="misson-section-title">Vision</span>
          </div>
          <br />
          <input type="text" x-model="vision" placeholder="Enter Vision" class="misson-section-text isMissionEdit" />
          <span class="misson-section-text-view viewOnly mt-1" x-text="vision"></span>
        </div>

        <div class="misson-values-section misson-content-section">
          <div class="d-flex justify-content-start align-items-center gap-2">
           <div class="ms-2 toggle-container isMissionPrivacy">
              <div
                class="toggle-track"
                role="switch"
                tabindex="0"
                :aria-checked="checked.toString()"
                aria-label="Privacy toggle switch"
                :data-checked="checked ? '1' : '0'"
                @click="checked = !checked; togglePrivacy()"
              >
                <div class="toggle-handle"></div>
              </div>
            </div>
            <span class="misson-section-title">Values</span>
          </div>
          <br />
          <input type="text" x-model="values" placeholder="Enter Values" class="misson-section-text isMissionEdit" />
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
