
const ServiceHandler = {

  async handleServices(payload) {
    console.log("Payload received in handleServices:", payload);
    try {
      const url = "https://api.servehere.com/api/services";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: payload,
      });
      document.dispatchEvent(new CustomEvent("profileDataSaved"));
    } catch (error) {
      console.error(error);
    }
  },
};

window.ServiceHandler = ServiceHandler;
