
const ServiceHandler = {

  async handleServices(payload) {
    try {
      const endpoint = "/services";
      return await apiFetch(endpoint, {
        method: "POST",
        contentType: "multipart/form-data",
        body: payload,
      });
    } catch (error) {
      console.error(error);
    }
  },

  async handleServicePrivacy(data) {    
    try {
      const endpoint = "/user-field-settings";
      return await apiFetch(endpoint, {
        method: "POST",
        body: data,
      });
    } catch (error) {
      console.error(error);
    }
  },

  async changeServiceStatus({ id, payload }) {
    try {
      const endpoint = `/services/${id}/activate`;
      return await apiFetch(endpoint, {
        method: "POST",
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error(error);
    }
  },
};

window.ServiceHandler = ServiceHandler;
