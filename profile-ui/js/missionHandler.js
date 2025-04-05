const MissionHandler = {
  async fetchMission(updateState) {
    const { baseUrl, token } = await getApiConfig();

    try {
      const response = await fetch(`${baseUrl}/missions`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Using the manual token
        },
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
    const { baseUrl, token } = await getApiConfig();

    try {
      const url = `${baseUrl}/save-mission`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ mission, vision, values }),
      });
    } catch (error) {
      console.error(error);
    }
  },

  async handleMissionPrivacy(data) {
    const { baseUrl, token } = await getApiConfig();

    try {
      const url = `${baseUrl}/user-field-settings`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });
    } catch (error) {
      console.error(error);
    }
  }
};

window.MissionHandler = MissionHandler;
