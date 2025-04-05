
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

  async handleServicePrivacy(data) {
    try {
      const url = `https://api.servehere.com/api/user-field-settings`;

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
    }finally{
      document.dispatchEvent(new CustomEvent("profileDataSaved"));
    }
  },

  async changeServiceStatus({ id, payload }) {
    try {
      const url = `https://api.servehere.com/api/services/${id}/activate`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error(error);
    }
  },
};

window.ServiceHandler = ServiceHandler;
