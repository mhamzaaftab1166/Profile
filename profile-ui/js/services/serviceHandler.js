
const ServiceHandler = {

  async handleServices(payload) {
    const { baseUrl, token } = await getApiConfig();

    console.log("Payload received in handleServices:", payload);
    try {
      const url = `${baseUrl}/services`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: payload,
      });
    } catch (error) {
      console.error(error);
    }
  },

  async handleServicePrivacy(data) {
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
  },

  async changeServiceStatus({ id, payload }) {
    const { baseUrl, token } = await getApiConfig();

    try {
      const url = `${baseUrl}/services/${id}/activate`;

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
