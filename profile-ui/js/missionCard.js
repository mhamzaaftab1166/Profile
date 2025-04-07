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
      this.settings = event.detail.settings
      this.render();
    });
  }

  render() {
    console.log(this.missionData,"jjjjjjjjjjjjjjjjjj");
    
    const missionValue = this.missionData?.missionData.mission || "";
    const visionValue = this.missionData?.missionData.vision || "";
    const valuesValue = this.missionData?.missionData.values || "";
    const privacySettings =  this.settings;
    
    this.innerHTML = `
      <section class="misson-description-card" x-data="{
       mission: '${missionValue}',
        vision: '${visionValue}',
        values: '${valuesValue}',
        id: false,
        missionSectionChecked: ${privacySettings?.mission_vision_values},
        toggleMissionSectionPrivacy() {
         const payload = { mission_vision_values: this.missionSectionChecked };
         MissionHandler.handleMissionPrivacy(JSON.stringify(payload));
        console.log('Privacy checked value:', this.missionSectionChecked);
      },
        missionChecked: ${privacySettings?.mission},
        toggleMissionPrivacy() {
         const payload = { mission: this.missionChecked };
         MissionHandler.handleMissionPrivacy(JSON.stringify(payload));
        console.log('Privacy checked value:', this.missionChecked);
      },

       valueChecked: ${privacySettings?.value},
        toggleValuePrivacy() {
         const payload = { value: this.valueChecked };
         MissionHandler.handleMissionPrivacy(JSON.stringify(payload));
        console.log('Privacy checked value:', this.valueChecked);
      },

       visionChecked: ${privacySettings?.vision},
        toggleVisionPrivacy() {
         const payload = { vision: this.visionChecked };
         MissionHandler.handleMissionPrivacy(JSON.stringify(payload));
        console.log('Privacy checked value:', this.visionChecked);
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
                :aria-checked="missionSectionChecked?.toString()"
                aria-label="Privacy toggle switch"
                :data-checked="missionSectionChecked ? '1' : '0'"
                @click="missionSectionChecked = !missionSectionChecked; toggleMissionSectionPrivacy()"
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
                :aria-checked="missionChecked?.toString()"
                aria-label="Privacy toggle switch"
                :data-checked="missionChecked ? '1' : '0'"
                @click="missionChecked = !missionChecked; toggleMissionPrivacy()"
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
                :aria-checked="visionChecked?.toString()"
                aria-label="Privacy toggle switch"
                :data-checked="visionChecked ? '1' : '0'"
                @click="visionChecked = !visionChecked; toggleVisionPrivacy()"
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
                :aria-checked="valueChecked?.toString()"
                aria-label="Privacy toggle switch"
                :data-checked="valueChecked ? '1' : '0'"
                @click="valueChecked = !valueChecked; toggleValuePrivacy()"
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
