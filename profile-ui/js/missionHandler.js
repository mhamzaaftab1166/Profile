const MissionHandler = {
  async fetchMission(updateState) {
    try {
      const response = await fetch("http://localhost:3000/missions");
      const data = await response.json();
      if (data.length > 0) {
        updateState(data[0]);
      }
    } catch (error) {
      console.error(error);
    }
  },

  async handleMission(mission, vision, values, id, updateState, myProp) {
    console.log("ID received in handleMission:", myProp);
    try {
      const url = id
        ? `http://localhost:3000/missions/${id}` // Update if ID exists
        : `http://localhost:3000/missions`; // Create if no ID

      const method = id ? "PUT" : "POST"; // Use PUT for update, POST for create

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mission, vision, values }),
      });

      if (response.ok) {
        // Refresh mission data with updated state
        await this.fetchMission(updateState);
      } else {
        console.error(`Failed to ${id ? "update" : "save"} mission data`);
      }
    } catch (error) {
      console.error(error);
    }
  },
};

window.MissionHandler = MissionHandler;
