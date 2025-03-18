class MissionCard extends HTMLElement {
  static get observedAttributes() {
    return ["my-prop"];
  }

  constructor() {
    super();
  }

//   attributeChangedCallback(name, oldValue, newValue) {
//     console.log(`Attribute '${name}' changed from ${oldValue} to ${newValue}`);
//   }
  
  connectedCallback() {
    const myProp = this.getAttribute("my-prop");
    console.log("Connected - myProp:", myProp);
    this.innerHTML = `
      <section class="misson-description-card" x-data="{
        isEdit: 1,
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
        <header class="misson-card-title">Mission & Vision & Values</header>
        <div class="misson-separator"></div>
        <div class="misson-card-content">
          <div class="misson-mission-section misson-content-section">
            <span class="misson-section-title">Mission</span>
            <br />
            <template x-if="isEdit">
              <input type="text" x-model="mission" class="misson-section-text" />
            </template>
            <template x-if="!isEdit">
              <span class="misson-section-text" x-text="mission"></span>
            </template>
          </div>
          <div class="misson-vision-section misson-content-section">
            <span class="misson-section-title">Vision</span>
            <br />
            <template x-if="isEdit">
              <input type="text" x-model="vision" class="misson-section-text" />
            </template>
            <template x-if="!isEdit">
              <span class="misson-section-text" x-text="vision"></span>
            </template>
          </div>
          <div class="misson-values-section misson-content-section">
            <span class="misson-section-title">Values</span>
            <br />
            <template x-if="isEdit">
              <input type="text" x-model="values" class="misson-section-text" />
            </template>
            <template x-if="!isEdit">
              <span class="misson-section-text" x-text="values"></span>
            </template>
          </div>
          <div class="misson-button-group">
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
  }
}

customElements.define("mission-card", MissionCard);
