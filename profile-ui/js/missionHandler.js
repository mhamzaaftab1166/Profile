const MissionHandler = {
  async fetchMission(updateState) {

    try {
      const endpoint = `/missions`;
        const response =  await apiFetch(endpoint, {
          method: "GET",
        });

      const data = await response.json();
      if (data.length > 0) {
        updateState(data[0]);
      }
    } catch (error) {
      console.error(error);
    }
  },

  async handleMission(mission, vision, values,  updateState, myProp) {
    console.log("ID received in handleMission:", myProp);

    try {
      const endpoint = `/save-mission`;
      return await apiFetch(endpoint, {
        method: "POST",
        body: JSON.stringify({ mission, vision, values }),
      });
    } catch (error) {
      console.error(error);
    }
  },

  async handleMissionPrivacy(data) {

    try {
      const endpoint = `/user-field-settings`;
      return await apiFetch(endpoint, {
        method: "POST",
        body: data,
      });

    } catch (error) {
      console.error(error);
    }
  }
};

window.MissionHandler = MissionHandler;
