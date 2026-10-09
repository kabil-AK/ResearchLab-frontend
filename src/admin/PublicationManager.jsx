import { useEffect, useState } from "react";
import api from "../services/api";

function PublicationManager() {
  const emptyPublication = {
    title: "",
    authors: "",
    journal: "",
    year: "",
    description: "",
    doiUrl: "",
    imageUrl: "",
    displayOrder: 0,
  };

  const [publications, setPublications] = useState([]);
  const [publication, setPublication] = useState(emptyPublication);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPublications();
  }, []);

  const fetchPublications = async () => {
    try {
      const response = await api.get("/admin/publications");
      setPublications(response.data);
    } catch (error) {
      console.error(error);
      setError("Unable to load publications.");
    }
  };

  const handleChange = (e) => {
    setPublication({
      ...publication,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      if (editingId) {
        await api.put(`/admin/publications/${editingId}`, publication);
        setMessage("Publication updated successfully.");
      } else {
        await api.post("/admin/publications", publication);
        setMessage("Publication added successfully.");
      }

      setPublication(emptyPublication);
      setEditingId(null);
      fetchPublications();
    } catch (error) {
      console.error(error);
      setError("Unable to save publication.");
    }
  };

  const handleEdit = (item) => {
    setPublication({
      title: item.title || "",
      authors: item.authors || "",
      journal: item.journal || "",
      year: item.year || "",
      description: item.description || "",
      doiUrl: item.doiUrl || "",
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
      !window.confirm(
        "Are you sure you want to delete this publication?"
      )
    ) {
      return;
    }

    try {
      await api.delete(`/admin/publications/${id}`);

      setMessage("Publication deleted successfully.");
      fetchPublications();
    } catch (error) {
      console.error(error);
      setError("Unable to delete publication.");
    }
  };

  const handleCancel = () => {
    setPublication(emptyPublication);
    setEditingId(null);
    setMessage("");
    setError("");
  };

  return (
    <div className="manager-page">

      {/* HEADER */}

      <div className="manager-header">

        <div>
          <span className="manager-eyebrow">
            ACADEMIC CONTENT
          </span>

          <h1>Publications</h1>

          <p>
            Manage research papers, journals and
            academic publications displayed on the website.
          </p>
        </div>

        <div className="manager-count">
          <strong>{publications.length}</strong>
          <span>Publications</span>
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
              {editingId
                ? "EDIT PUBLICATION"
                : "NEW PUBLICATION"}
            </span>

            <h2>
              {editingId
                ? "Edit Publication"
                : "Add Publication"}
            </h2>
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
              <label>Publication Title</label>

              <input
                type="text"
                name="title"
                value={publication.title}
                onChange={handleChange}
                placeholder="Enter research paper title"
                required
              />
            </div>

            {/* AUTHORS */}

            <div className="manager-field">
              <label>Authors</label>

              <input
                type="text"
                name="authors"
                value={publication.authors}
                onChange={handleChange}
                placeholder="e.g. Dr. Arun Kumar, Dr. Priya"
              />
            </div>

            {/* JOURNAL */}

            <div className="manager-field">
              <label>Journal</label>

              <input
                type="text"
                name="journal"
                value={publication.journal}
                onChange={handleChange}
                placeholder="Enter journal name"
              />
            </div>

            {/* YEAR */}

            <div className="manager-field">
              <label>Publication Year</label>

              <input
                type="number"
                name="year"
                value={publication.year}
                onChange={handleChange}
                placeholder="2026"
              />
            </div>

            {/* DISPLAY ORDER */}

            <div className="manager-field">
              <label>Display Order</label>

              <input
                type="number"
                name="displayOrder"
                value={publication.displayOrder}
                onChange={handleChange}
                min="0"
              />

              <small>
                Lower numbers appear first.
              </small>
            </div>

            {/* DESCRIPTION */}

            <div className="manager-field manager-full">
              <label>Description</label>

              <textarea
                name="description"
                value={publication.description}
                onChange={handleChange}
                rows="5"
                placeholder="Write a short summary of the publication..."
              />
            </div>

            {/* DOI */}

            <div className="manager-field">
              <label>DOI URL</label>

              <input
                type="text"
                name="doiUrl"
                value={publication.doiUrl}
                onChange={handleChange}
                placeholder="https://doi.org/..."
              />

              <small>
                Link to the official publication.
              </small>
            </div>

            {/* IMAGE */}

            <div className="manager-field">
              <label>Image URL</label>

              <input
                type="text"
                name="imageUrl"
                value={publication.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>

          </div>

          {/* ACTIONS */}

          <div className="manager-form-actions">

            <button
              type="submit"
              className="manager-primary-btn"
            >
              <span>{editingId ? "✓" : "+"}</span>

              {editingId
                ? "Update Publication"
                : "Add Publication"}
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

      {/* EXISTING PUBLICATIONS */}

      <section className="manager-list-section">

        <div className="manager-list-header">

          <div>
            <span className="manager-small-label">
              PUBLICATION LIBRARY
            </span>

            <h2>Existing Publications</h2>
          </div>

          <span className="manager-total">
            {publications.length} total
          </span>

        </div>

        {publications.length === 0 ? (
          <div className="manager-empty">

            <div className="empty-icon">
              ◈
            </div>

            <h3>No publications yet</h3>

            <p>
              Add your first research publication
              using the form above.
            </p>

          </div>
        ) : (
          <div className="publication-manager-list">

            {publications.map((item) => (

              <article
                className="publication-manager-card"
                key={item.id}
              >

                {/* PUBLICATION ICON / IMAGE */}

                <div className="publication-cover">

                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                    />
                  ) : (
                    <div className="publication-placeholder">
                      <span>◈</span>
                      <small>PAPER</small>
                    </div>
                  )}

                  <span className="publication-year">
                    {item.year || "—"}
                  </span>

                </div>

                {/* CONTENT */}

                <div className="publication-manager-content">

                  <span className="publication-label">
                    RESEARCH PUBLICATION
                  </span>

                  <h3>{item.title}</h3>

                  {item.authors && (
                    <p className="publication-authors">
                      <strong>Authors</strong>
                      {item.authors}
                    </p>
                  )}

                  {item.journal && (
                    <p className="publication-journal">
                      <span>◉</span>
                      {item.journal}
                    </p>
                  )}

                  {item.description && (
                    <p className="publication-description">
                      {item.description}
                    </p>
                  )}

                  <div className="publication-links">

                    {item.doiUrl ? (
                      <a
                        href={item.doiUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="doi-btn"
                      >
                        View DOI ↗
                      </a>
                    ) : (
                      <span className="no-doi">
                        No DOI link
                      </span>
                    )}

                    <span className="publication-order">
                      Order #{item.displayOrder}
                    </span>

                  </div>

                </div>

                {/* ACTIONS */}

                <div className="publication-manager-actions">

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
                    onClick={() =>
                      handleDelete(item.id)
                    }
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

export default PublicationManager;
