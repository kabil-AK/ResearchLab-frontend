import { useEffect, useState } from "react";
import api from "../services/api";

function TeamManager() {
  const emptyMember = {
    name: "",
    designation: "",
    experience: "",
    description: "",
    imageUrl: "",
    displayOrder: 0,
  };

  const [members, setMembers] = useState([]);
  const [member, setMember] = useState(emptyMember);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await api.get("/admin/team-members");
      setMembers(response.data);
    } catch (error) {
      console.error(error);
      setError("Unable to load team members.");
    }
  };

  const handleChange = (e) => {
    setMember({
      ...member,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      if (editingId) {
        await api.put(`/admin/team-members/${editingId}`, member);
        setMessage("Team member updated successfully.");
      } else {
        await api.post("/admin/team-members", member);
        setMessage("Team member added successfully.");
      }

      setMember(emptyMember);
      setEditingId(null);
      fetchMembers();
    } catch (error) {
      console.error(error);
      setError("Unable to save team member.");
    }
  };

  const handleEdit = (item) => {
    setMember({
      name: item.name || "",
      designation: item.designation || "",
      experience: item.experience || "",
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
    if (!window.confirm("Are you sure you want to delete this team member?")) {
      return;
    }

    try {
      await api.delete(`/admin/team-members/${id}`);

      setMessage("Team member deleted successfully.");
      fetchMembers();
    } catch (error) {
      console.error(error);
      setError("Unable to delete team member.");
    }
  };

  const handleCancel = () => {
    setMember(emptyMember);
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

          <h1>Team Members</h1>

          <p>
            Add, edit and manage the researchers displayed on your public
            website.
          </p>
        </div>

        <div className="manager-count">
          <strong>{members.length}</strong>
          <span>Members</span>
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
              {editingId ? "EDIT MEMBER" : "NEW MEMBER"}
            </span>

            <h2>{editingId ? "Edit Team Member" : "Add Team Member"}</h2>
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
            {/* NAME */}

            <div className="manager-field">
              <label>Name</label>

              <input
                type="text"
                name="name"
                value={member.name}
                onChange={handleChange}
                placeholder="Enter full name"
                required
              />
            </div>

            {/* DESIGNATION */}

            <div className="manager-field">
              <label>Designation</label>

              <input
                type="text"
                name="designation"
                value={member.designation}
                onChange={handleChange}
                placeholder="e.g. Research Assistant Professor"
              />
            </div>

            {/* EXPERIENCE */}

            <div className="manager-field">
              <label>Experience</label>

              <input
                type="text"
                name="experience"
                value={member.experience}
                onChange={handleChange}
                placeholder="e.g. 8 Years"
              />
            </div>

            {/* DISPLAY ORDER */}

            <div className="manager-field">
              <label>Display Order</label>

              <input
                type="number"
                name="displayOrder"
                value={member.displayOrder}
                onChange={handleChange}
                min="0"
              />
            </div>

            {/* IMAGE */}

            <div className="manager-field manager-full">
              <label>Image URL</label>

              <input
                type="text"
                name="imageUrl"
                value={member.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />

              <small>Paste the public image URL for this team member.</small>
            </div>

            {/* DESCRIPTION */}

            <div className="manager-field manager-full">
              <label>Description</label>

              <textarea
                name="description"
                value={member.description}
                onChange={handleChange}
                rows="5"
                placeholder="Write a short professional description..."
              />
            </div>
          </div>

          {/* FORM ACTIONS */}

          <div className="manager-form-actions">
            <button type="submit" className="manager-primary-btn">
              <span>{editingId ? "✓" : "+"}</span>

              {editingId ? "Update Team Member" : "Add Team Member"}
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

      {/* EXISTING MEMBERS */}

      <section className="manager-list-section">
        <div className="manager-list-header">
          <div>
            <span className="manager-small-label">CURRENT DATA</span>

            <h2>Existing Team Members</h2>
          </div>

          <span className="manager-total">{members.length} total</span>
        </div>

        {members.length === 0 ? (
          <div className="manager-empty">
            <div className="empty-icon">♙</div>

            <h3>No team members yet</h3>

            <p>Add your first team member using the form above.</p>
          </div>
        ) : (
          <div className="team-manager-grid">
            {members.map((item) => (
              <article className="team-manager-card" key={item.id}>
                {/* IMAGE */}

                <div className="team-manager-image">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.name} />
                  ) : (
                    <div className="team-placeholder">
                      {item.name ? item.name.charAt(0).toUpperCase() : "?"}
                    </div>
                  )}
                </div>

                {/* DETAILS */}

                <div className="team-manager-details">
                  <div className="team-order">#{item.displayOrder}</div>

                  <h3>{item.name}</h3>

                  <p className="team-designation">
                    {item.designation || "Research Member"}
                  </p>

                  {item.experience && (
                    <span className="team-experience">{item.experience}</span>
                  )}

                  {item.description && (
                    <p className="team-description">{item.description}</p>
                  )}
                </div>

                {/* ACTIONS */}

                <div className="team-manager-actions">
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

export default TeamManager;
