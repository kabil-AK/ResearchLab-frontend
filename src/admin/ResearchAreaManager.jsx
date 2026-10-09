import { useEffect, useState } from "react";
import api from "../services/api";

function ResearchAreaManager() {
  const emptyArea = {
    title: "",
    shortDescription: "",
    description: "",
    imageUrl: "",
    displayOrder: 0,
  };

  const [areas, setAreas] = useState([]);
  const [area, setArea] = useState(emptyArea);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAreas();
  }, []);

  const fetchAreas = async () => {
    try {
      const response = await api.get("/admin/research-areas");
      setAreas(response.data);
    } catch (error) {
      console.error(error);
      setError("Unable to load research areas.");
    }
  };

  const handleChange = (e) => {
    setArea({
      ...area,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      if (editingId) {
        await api.put(`/admin/research-areas/${editingId}`, area);
        setMessage("Research area updated successfully.");
      } else {
        await api.post("/admin/research-areas", area);
        setMessage("Research area added successfully.");
      }

      setArea(emptyArea);
      setEditingId(null);
      fetchAreas();
    } catch (error) {
      console.error(error);
      setError("Unable to save research area.");
    }
  };

  const handleEdit = (item) => {
    setArea({
      title: item.title || "",
      shortDescription: item.shortDescription || "",
      description: item.description || "",
      imageUrl: item.imageUrl || "",
      displayOrder: item.displayOrder || 0,
    });

    setEditingId(item.id);
    setMessage("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm("Are you sure you want to delete this research area?")
    ) {
      return;
    }

    try {
      await api.delete(`/admin/research-areas/${id}`);

      setMessage("Research area deleted successfully.");
      fetchAreas();
    } catch (error) {
      console.error(error);
      setError("Unable to delete research area.");
    }
  };

  const handleCancel = () => {
    setArea(emptyArea);
    setEditingId(null);
    setMessage("");
    setError("");
  };

  return (
    <div className="manager-page">
      {/* HEADER */}

      <div className="manager-header">
        <div>
          <span className="manager-eyebrow">CONTENT MANAGEMENT</span>

          <h1>Research Areas</h1>

          <p>
            Manage the scientific research areas displayed on your laboratory
            website.
          </p>
        </div>

        <div className="manager-count">
          <strong>{areas.length}</strong>
          <span>Areas</span>
        </div>
      </div>

      {/* MESSAGES */}

      {message && (
        <div className="manager-message success">
          <span>✓</span>
          {message}
        </div>
      )}

      {error && (
        <div className="manager-message error">
          <span>!</span>
          {error}
        </div>
      )}

      {/* FORM */}

      <section className="manager-form-card">
        <div className="manager-card-header">
          <div>
            <span className="manager-small-label">
              {editingId ? "EDIT RESEARCH AREA" : "NEW RESEARCH AREA"}
            </span>

            <h2>{editingId ? "Edit Research Area" : "Add Research Area"}</h2>
          </div>

          {editingId && (
            <button
              type="button"
              className="manager-cancel-top"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="manager-form-grid">
            {/* TITLE */}

            <div className="manager-field manager-full">
              <label>Research Area Title</label>

              <input
                type="text"
                name="title"
                value={area.title}
                onChange={handleChange}
                placeholder="e.g. Artificial Intelligence"
                required
              />
            </div>

            {/* SHORT DESCRIPTION */}

            <div className="manager-field manager-full">
              <label>Short Description</label>

              <textarea
                name="shortDescription"
                value={area.shortDescription}
                onChange={handleChange}
                rows="3"
                placeholder="Write a short description for cards and previews..."
              />
            </div>

            {/* DESCRIPTION */}

            <div className="manager-field manager-full">
              <label>Full Description</label>

              <textarea
                name="description"
                value={area.description}
                onChange={handleChange}
                rows="6"
                placeholder="Write the complete research area description..."
              />
            </div>

            {/* IMAGE URL */}

            <div className="manager-field">
              <label>Image URL</label>

              <input
                type="text"
                name="imageUrl"
                value={area.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />

              <small>Paste a public image URL.</small>
            </div>

            {/* DISPLAY ORDER */}

            <div className="manager-field">
              <label>Display Order</label>

              <input
                type="number"
                name="displayOrder"
                value={area.displayOrder}
                onChange={handleChange}
                min="0"
              />

              <small>Lower numbers appear first.</small>
            </div>
          </div>

          {/* ACTIONS */}

          <div className="manager-form-actions">
            <button type="submit" className="manager-primary-btn">
              <span>{editingId ? "✓" : "+"}</span>

              {editingId ? "Update Research Area" : "Add Research Area"}
            </button>

            {editingId && (
              <button
                type="button"
                className="manager-secondary-btn"
                onClick={handleCancel}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      {/* EXISTING AREAS */}

      <section className="manager-list-section">
        <div className="manager-list-header">
          <div>
            <span className="manager-small-label">CURRENT DATA</span>

            <h2>Existing Research Areas</h2>
          </div>

          <span className="manager-total">{areas.length} total</span>
        </div>

        {areas.length === 0 ? (
          <div className="manager-empty">
            <div className="empty-icon">◎</div>

            <h3>No research areas yet</h3>

            <p>Add your first research area using the form above.</p>
          </div>
        ) : (
          <div className="research-manager-grid">
            {areas.map((item) => (
              <article className="research-manager-card" key={item.id}>
                {/* IMAGE */}

                <div className="research-manager-image">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.title} />
                  ) : (
                    <div className="research-placeholder">◎</div>
                  )}

                  <span className="research-order">#{item.displayOrder}</span>
                </div>

                {/* CONTENT */}

                <div className="research-manager-content">
                  <h3>{item.title}</h3>

                  {item.shortDescription && (
                    <p className="research-short">{item.shortDescription}</p>
                  )}

                  {item.description && (
                    <p className="research-description">{item.description}</p>
                  )}
                </div>

                {/* ACTIONS */}

                <div className="research-manager-actions">
                  <button
                    type="button"
                    className="edit-btn"
                    onClick={() => handleEdit(item)}
                  >
                    ✎ Edit
                  </button>

                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => handleDelete(item.id)}
                  >
                    × Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default ResearchAreaManager;
