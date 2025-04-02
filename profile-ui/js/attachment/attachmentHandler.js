const attachHandler = {
  async handleAttach(data) {
    console.log(data, "🚀 Handling attach data...");

    try {
      const parsedData = typeof data === "string" ? JSON.parse(data) : data;

      if (!parsedData.name?.trim() || !parsedData.path || !parsedData.type) {
        console.error("❌ Missing required fields: name, path, or type");
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
      } else {
        console.error("❌ Failed to send license data:", response.statusText);
      }
    } catch (error) {
      console.error("🚨 Error in handleLicense:", error);
    }
  },
  async changeAttachmentStatus({ id, payload }) {
    const url = `https://api.servehere.com/api/user-attachments/${id}/activate`;
    console.log("🚀 Changing attachment status with payload:", payload,id);

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
        console.log("✅ Attachment status updated successfully.");
      } else {
        console.error(
          "❌ Failed to update attachment status:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("🚨 Error in changeAttachmentStatus:", error);
    }
  },
};

window.attachHandler = attachHandler;
