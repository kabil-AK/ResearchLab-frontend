import { useEffect, useState } from "react";
import api from "../services/api";

function SiteInfoManager() {
  const [siteInfo, setSiteInfo] = useState({
    title: "",
    description: "",
    imageUrl: "",
    email: "",
    phone: "",
    address: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSiteInfo();
  }, []);

  const fetchSiteInfo = async () => {
    try {
      const response = await api.get("/admin/site-info");

      if (response.data) {
        setSiteInfo(response.data);
      }
    } catch (error) {
      console.error(error);
      setError("Unable to load site information.");
    }
  };

  const handleChange = (e) => {
    setSiteInfo({
      ...siteInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      await api.put("/admin/site-info", siteInfo);

      setMessage("Site information updated successfully.");
    } catch (error) {
      console.error(error);
      setError("Unable to update site information.");
    }
  };

  return (
    <div>
      <h1>Site Information</h1>

      {message && <p>{message}</p>}
      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <br />
          <input
            type="text"
            name="title"
            value={siteInfo.title || ""}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Description</label>
          <br />
          <textarea
            name="description"
            value={siteInfo.description || ""}
            onChange={handleChange}
            rows="5"
          />
        </div>

        <br />

        <div>
          <label>Image URL</label>
          <br />
          <input
            type="text"
            name="imageUrl"
            value={siteInfo.imageUrl || ""}
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            name="email"
            value={siteInfo.email || ""}
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <label>Phone</label>
          <br />
          <input
            type="text"
            name="phone"
            value={siteInfo.phone || ""}
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <label>Address</label>
          <br />
          <textarea
            name="address"
            value={siteInfo.address || ""}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <br />

        <button type="submit">Update Site Information</button>
      </form>
    </div>
  );
}

export default SiteInfoManager;
