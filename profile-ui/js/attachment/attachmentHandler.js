const attachHandler = {
  async handleAttach(data) {
    console.log(data, "🚀 Handling attach data...");
    // showLoader();

    try {
      const parsedData = typeof data === "string" ? JSON.parse(data) : data;

      if (!parsedData.name?.trim() || !parsedData.path || !parsedData.type) {
        console.error("❌ Missing required fields: name, path, or type");
        // showToast("Missing required fields", "danger");
        return;
      }

      const formData = new FormData();
      formData.append("name", parsedData.name);
      formData.append("path", parsedData.path);
      formData.append("type", parsedData.type);
      formData.append("is_active", parsedData.is_active ? 1 : 0);

      const url = `/user-attachments`;

      console.log("🚀 FormData Ready:");
      for (let pair of formData.entries()) {
        console.log(pair[0], ":", pair[1]);
      }

      const response =  await apiFetch(url, {
        method: "POST",
        contentType: "multipart/form-data",
        body: formData,
      });


      if (response.ok) {
        document.dispatchEvent(new CustomEvent("profileDataSaved"));
        console.log("✅ License data sent successfully.");
        // showToast("Attachment saved successfully!", "success");
      } else {
        console.error("❌ Failed to send license data:", response.statusText);
        // showToast("Failed to save attachment.", "danger");
      }
    } catch (error) {
      console.error("🚨 Error in handleLicense:", error);
      // showToast("Something went wrong.", "danger");
    } finally {
      hideLoader();
    }
  },

  async changeAttachmentStatus({ id, payload }) {
    
    const url = `/user-attachments/${id}/activate`;
    console.log("🚀 Changing attachment status with payload:", payload, id);
    // showLoader();

    try {
      const response = await apiFetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
      });


      if (response.ok) {
        document.dispatchEvent(new CustomEvent("profileDataSaved"));
        console.log("✅ Attachment status updated successfully.");
        // showToast("Attachment status updated!", "success");
      } else {
        console.error(
          "❌ Failed to update attachment status:",
          response.statusText
        );
        // showToast("Failed to update attachment status.", "danger");
      }
    } catch (error) {
      console.error("🚨 Error in changeAttachmentStatus:", error);
      // showToast("Something went wrong.", "danger");
    } finally {
      hideLoader();
    }
  },

  async handleAttachementsPrivacy(data) {
    try {
      const url = `/user-field-settings`;
      
      return await apiFetch(url, {
        method: "POST",
        body: data,
      });
    } catch (error) {
      console.error(error);
    }
  },
};

window.attachHandler = attachHandler;
