const managementHandler = {
  async handleManagement(data) {
    console.log(data, "🚀 Handling management data...");
    showLoader();

    try {
      const parsedData = typeof data === "string" ? JSON.parse(data) : data;

      if (!Array.isArray(parsedData)) {
        console.error("❌ Data must be an array of manager objects.");
        showToast("Invalid data format.", "danger");
        return;
      }

      const validData = parsedData.filter(
        (manager) =>
          manager.name?.trim() &&
          manager.role_name?.trim() &&
          manager.phone_number?.trim() &&
          manager.profile_image
      );

      if (validData.length === 0) {
        showToast("No valid manager data to save.", "danger");
        return;
      }

      const formData = new FormData();
      validData.forEach((manager, index) => {
        if (manager.id) {
          formData.append(`managers[${index}][id]`, manager.id);
        }
        formData.append(`managers[${index}][name]`, manager.name);
        formData.append(`managers[${index}][role_name]`, manager.role_name);
        formData.append(`managers[${index}][phone_number]`, manager.phone_number);
        formData.append(`managers[${index}][is_active]`, manager.is_active ? 1 : 0);

        if (manager.profile_image instanceof File) {
          formData.append(`managers[${index}][profile_image]`, manager.profile_image);
        }
      });

      const { baseUrl, token } = await getApiConfig();

      const url = `${baseUrl}/managments`;

      const response = await fetch(url, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) {
        console.error("❌ Failed to send manager data:", response.statusText);
        showToast("Failed to update managers.", "danger");
      } else {
        showToast("Manager data saved successfully!", "success");
        console.log("✅ Manager data sent successfully.");
        document.dispatchEvent(new CustomEvent("profileDataSaved"));
      }
    } catch (error) {
      console.error("🚨 Error in handleManagement:", error);
      showToast("Something went wrong.", "danger");
    } finally {
      hideLoader();
    }
  },

  async changemanagementStatus({ id, payload }) {
    const { baseUrl, token } = await getApiConfig();

    const url = `${baseUrl}/managments/${id}/activate`;
    showLoader();

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        showToast("Management status updated!", "success");
        document.dispatchEvent(new CustomEvent("profileDataSaved"));
      } else {
        showToast("Failed to update status.", "danger");
        console.error("❌ Status update failed:", response.statusText);
      }
    } catch (error) {
      console.error(error);
      showToast("Something went wrong.", "danger");
    } finally {
      hideLoader();
    }
  },

  async handleManagementPrivacy(data) {
    showLoader();
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

      showToast("Privacy setting updated.", "success");
    } catch (error) {
      console.error(error);
      showToast("Failed to update privacy setting.", "danger");
    } finally {
      hideLoader();
      document.dispatchEvent(new CustomEvent("profileDataSaved"));
    }
  },
};

window.managementHandler = managementHandler;
