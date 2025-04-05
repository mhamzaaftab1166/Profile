const licenseHandler = {
  async handleLicense(data) {
    console.log(data, "🚀 Handling license data...");
    showLoader();

    try {
      const parsedData = typeof data === "string" ? JSON.parse(data) : data;

      if (!parsedData.name?.trim() || !parsedData.path || !parsedData.type) {
        console.error("❌ Missing required fields: name, path, or type");
        showToast("Missing required fields", "danger");
        return;
      }

      const formData = new FormData();
      formData.append("name", parsedData.name);
      formData.append("path", parsedData.path);
      formData.append("type", parsedData.type);
      formData.append("is_active", parsedData.is_active ? 1 : 0);

      const url = "https://api.servehere.com/api/user-attachments";

      console.log("🚀 FormData Ready:");
      for (let pair of formData.entries()) {
        console.log(pair[0], ":", pair[1]);
      }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        document.dispatchEvent(new CustomEvent("profileDataSaved"));
        console.log("✅ License data sent successfully.");
        showToast("License saved successfully!", "success");
      } else {
        console.error("❌ Failed to send license data:", response.statusText);
        showToast("Failed to save license.", "danger");
      }
    } catch (error) {
      console.error("🚨 Error in handleLicense:", error);
      showToast("Something went wrong while saving license.", "danger");
    } finally {
      hideLoader();
    }
  },

  async deleteLicense(id) {
    console.log("🚀 Deleting license with id:", id);
    showLoader();

    try {
      if (!id) {
        console.error("❌ License id is required for deletion.");
        showToast("License ID is missing", "danger");
        return;
      }

      const url = `https://api.servehere.com/api/user-attachments/${id}`;

      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        document.dispatchEvent(new CustomEvent("profileDataSaved"));
        console.log("✅ License deleted successfully.");
        showToast("License deleted!", "success");
      } else {
        console.error("❌ Failed to delete license:", response.statusText);
        showToast("Failed to delete license.", "danger");
      }
    } catch (error) {
      console.error("🚨 Error in deleteLicense:", error);
      showToast("Something went wrong while deleting license.", "danger");
    } finally {
      hideLoader();
    }
  },
};

window.licenseHandler = licenseHandler;
