const managementHandler = {
  async handleManagement(data) {
    console.log(data, "🚀 Handling management data...");

    try {
      const parsedData = typeof data === "string" ? JSON.parse(data) : data;

      if (!Array.isArray(parsedData)) {
        console.error("❌ Data must be an array of manager objects.");
        return;
      }

      // Filter out invalid objects (remove objects with missing required fields)
      const validData = parsedData.filter(
        (manager) =>
          manager.name?.trim() &&
          manager.role_name?.trim() &&
          manager.phone_number?.trim() &&
          manager.profile_image
      );

      // If no valid data remains, log an error and return
      if (validData.length === 0) {
        console.error("❌ No valid manager data to save.");
        return;
      }

      const formData = new FormData();
      validData.forEach((manager, index) => {
        if (manager.id) {
          formData.append(`managers[${index}][id]`, manager.id);
        }
        formData.append(`managers[${index}][name]`, manager.name);
        formData.append(`managers[${index}][role_name]`, manager.role_name);
        formData.append(
          `managers[${index}][phone_number]`,
          manager.phone_number
        );
        formData.append(
          `managers[${index}][is_active]`,
          manager.is_active ? 1 : 0
        );

        // Append profile image separately
        if (manager.profile_image instanceof File) {
          formData.append(
            `managers[${index}][profile_image]`,
            manager.profile_image
          );
        }
      });

      const url = "https://api.servehere.com/api/managments";

      console.log("🚀 Sending FormData:");
      for (let pair of formData.entries()) {
        console.log(pair[0], ":", pair[1]);
      }

      // Send the request
      const response = await fetch(url, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) {
        console.error("❌ Failed to send manager data:", response.statusText);
      } else {
        console.log("✅ Manager data sent successfully.");
      }

      document.dispatchEvent(new CustomEvent("profileDataSaved"));
    } catch (error) {
      console.error("🚨 Error in handleManagement:", error);
    }
  },
  async changemanagementStatus({ id, payload }) {
    const url = `https://api.servehere.com/api/managments/${id}/activate`;
    console.log("🚀 Changing management status with payload:", payload, id);

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
        document.dispatchEvent(new CustomEvent("profileDataSaved"));
        console.log("✅ management status updated successfully.");
      } else {
        console.error(
          "❌ Failed to update management status:",
          response.statusText
        );
      }
    } catch (error) {
      console.error(error);
    }
  },
};

window.managementHandler = managementHandler;
