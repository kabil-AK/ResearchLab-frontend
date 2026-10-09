import { useEffect, useState } from "react";
import api from "../services/api";
function ProjectManager() {
  const emptyProject = {
    title: "",
    description: "",
    status: "",
    startYear: "",
    endYear: "",
    fundingAgency: "",
    imageUrl: "",
    projectUrl: "",
    displayOrder: 0,
  };
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState(emptyProject);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    fetchProjects();
  }, []);
  const fetchProjects = async () => {
    try {
      const response = await api.get("/admin/projects");
      setProjects(response.data);
    } catch (error) {
      console.error(error);
      setError("Unable to load projects.");
    }
  };
  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      if (editingId) {
        await api.put(`/admin/projects/${editingId}`, project);
        setMessage("Project updated successfully.");
      } else {
        await api.post("/admin/projects", project);
        setMessage("Project added successfully.");
      }
      setProject(emptyProject);
      setEditingId(null);
      fetchProjects();
    } catch (error) {
      console.error(error);
      setError("Unable to save project.");
    }
  };
  const handleEdit = (item) => {
    setProject({
      title: item.title || "",
      description: item.description || "",
      status: item.status || "",
      startYear: item.startYear || "",
      endYear: item.endYear || "",
      fundingAgency: item.fundingAgency || "",
      imageUrl: item.imageUrl || "",
      projectUrl: item.projectUrl || "",
      displayOrder: item.displayOrder || 0,
    });
    setEditingId(item.id);
    setMessage("");
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }
    try {
      await api.delete(`/admin/projects/${id}`);
      setMessage("Project deleted successfully.");
      fetchProjects();
    } catch (error) {
      console.error(error);
      setError("Unable to delete project.");
    }
  };
  const handleCancel = () => {
    setProject(emptyProject);
    setEditingId(null);
    setMessage("");
    setError("");
  };
  return (
    <div className="manager-page">
      {" "}
      {/* PAGE HEADER */}{" "}
      <div className="manager-header">
        {" "}
        <div>
          {" "}
          <span className="manager-eyebrow"> RESEARCH PORTFOLIO </span>{" "}
          <h1>Projects</h1>{" "}
          <p>
            {" "}
            Manage research projects, funding information, project timelines and
            external links.{" "}
          </p>{" "}
        </div>{" "}
        <div className="manager-count">
          {" "}
          <strong>{projects.length}</strong> <span>Projects</span>{" "}
        </div>{" "}
      </div>{" "}
      {/* MESSAGES */}{" "}
      {message && (
        <div className="manager-message success">
          {" "}
          <span>✓</span> {message}{" "}
        </div>
      )}{" "}
      {error && (
        <div className="manager-message error">
          {" "}
          <span>!</span> {error}{" "}
        </div>
      )}{" "}
      {/* PROJECT FORM */}{" "}
      <section className="manager-form-card">
        {" "}
        <div className="manager-card-header">
          {" "}
          <div>
            {" "}
            <span className="manager-small-label">
              {" "}
              {editingId ? "EDIT PROJECT" : "NEW RESEARCH PROJECT"}{" "}
            </span>{" "}
            <h2> {editingId ? "Edit Project" : "Add Project"} </h2>{" "}
          </div>{" "}
          {editingId && (
            <button
              type="button"
              className="manager-cancel-top"
              onClick={handleCancel}
            >
              {" "}
              Cancel{" "}
            </button>
          )}{" "}
        </div>{" "}
        <form onSubmit={handleSubmit}>
          {" "}
          <div className="manager-form-grid">
            {" "}
            {/* TITLE */}{" "}
            <div className="manager-field manager-full">
              {" "}
              <label>Project Title</label>{" "}
              <input
                type="text"
                name="title"
                value={project.title}
                onChange={handleChange}
                placeholder="Enter research project title"
                required
              />{" "}
            </div>{" "}
            {/* DESCRIPTION */}{" "}
            <div className="manager-field manager-full">
              {" "}
              <label>Project Description</label>{" "}
              <textarea
                name="description"
                value={project.description}
                onChange={handleChange}
                rows="6"
                placeholder="Describe the research project, objectives and outcomes..."
              />{" "}
            </div>{" "}
            {/* STATUS */}{" "}
            <div className="manager-field">
              {" "}
              <label>Status</label>{" "}
              <input
                type="text"
                name="status"
                value={project.status}
                onChange={handleChange}
                placeholder="Ongoing / Completed"
              />{" "}
              <small> Example: Ongoing, Completed, Upcoming </small>{" "}
            </div>{" "}
            {/* FUNDING */}{" "}
            <div className="manager-field">
              {" "}
              <label>Funding Agency</label>{" "}
              <input
                type="text"
                name="fundingAgency"
                value={project.fundingAgency}
                onChange={handleChange}
                placeholder="e.g. DST, DBT, Government"
              />{" "}
            </div>{" "}
            {/* START YEAR */}{" "}
            <div className="manager-field">
              {" "}
              <label>Start Year</label>{" "}
              <input
                type="number"
                name="startYear"
                value={project.startYear}
                onChange={handleChange}
                placeholder="2024"
              />{" "}
            </div>{" "}
            {/* END YEAR */}{" "}
            <div className="manager-field">
              {" "}
              <label>End Year</label>{" "}
              <input
                type="number"
                name="endYear"
                value={project.endYear}
                onChange={handleChange}
                placeholder="2027"
              />{" "}
            </div>{" "}
            {/* IMAGE URL */}{" "}
            <div className="manager-field">
              {" "}
              <label>Image URL</label>{" "}
              <input
                type="text"
                name="imageUrl"
                value={project.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/project.jpg"
              />{" "}
              <small> Paste a public image URL. </small>{" "}
            </div>{" "}
            {/* PROJECT URL */}{" "}
            <div className="manager-field">
              {" "}
              <label>Project URL</label>{" "}
              <input
                type="text"
                name="projectUrl"
                value={project.projectUrl}
                onChange={handleChange}
                placeholder="https://example.com/project"
              />{" "}
              <small> External project or documentation link. </small>{" "}
            </div>{" "}
            {/* DISPLAY ORDER */}{" "}
            <div className="manager-field">
              {" "}
              <label>Display Order</label>{" "}
              <input
                type="number"
                name="displayOrder"
                value={project.displayOrder}
                onChange={handleChange}
                min="0"
              />{" "}
              <small> Lower numbers appear first. </small>{" "}
            </div>{" "}
          </div>{" "}
          {/* FORM ACTIONS */}{" "}
          <div className="manager-form-actions">
            {" "}
            <button type="submit" className="manager-primary-btn">
              {" "}
              <span>{editingId ? "✓" : "+"}</span>{" "}
              {editingId ? "Update Project" : "Add Project"}{" "}
            </button>{" "}
            {editingId && (
              <button
                type="button"
                className="manager-secondary-btn"
                onClick={handleCancel}
              >
                {" "}
                Cancel{" "}
              </button>
            )}{" "}
          </div>{" "}
        </form>{" "}
      </section>{" "}
      {/* EXISTING PROJECTS */}{" "}
      <section className="manager-list-section">
        {" "}
        <div className="manager-list-header">
          {" "}
          <div>
            {" "}
            <span className="manager-small-label">
              {" "}
              RESEARCH PORTFOLIO{" "}
            </span>{" "}
            <h2>Existing Projects</h2>{" "}
          </div>{" "}
          <span className="manager-total"> {projects.length} total </span>{" "}
        </div>{" "}
        {projects.length === 0 ? (
          <div className="manager-empty">
            {" "}
            <div className="empty-icon"> ◇ </div> <h3>No projects yet</h3>{" "}
            <p> Add your first research project using the form above. </p>{" "}
          </div>
        ) : (
          <div className="project-manager-grid">
            {" "}
            {projects.map((item) => (
              <article className="project-manager-card" key={item.id}>
                {" "}
                {/* PROJECT IMAGE */}{" "}
                <div className="project-manager-image">
                  {" "}
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.title} />
                  ) : (
                    <div className="project-placeholder">
                      {" "}
                      <span>◇</span> <small>RESEARCH</small>{" "}
                    </div>
                  )}{" "}
                  {item.status && (
                    <span
                      className={`project-status ${item.status.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {" "}
                      {item.status}{" "}
                    </span>
                  )}{" "}
                  <span className="project-order">
                    {" "}
                    #{item.displayOrder}{" "}
                  </span>{" "}
                </div>{" "}
                {/* PROJECT CONTENT */}{" "}
                <div className="project-manager-content">
                  {" "}
                  <span className="project-label"> RESEARCH PROJECT </span>{" "}
                  <h3>{item.title}</h3>{" "}
                  {item.description && (
                    <p className="project-description"> {item.description} </p>
                  )}{" "}
                  <div className="project-meta">
                    {" "}
                    {(item.startYear || item.endYear) && (
                      <div className="project-meta-item">
                        {" "}
                        <span className="meta-icon"> ◷ </span>{" "}
                        <div>
                          {" "}
                          <small>Duration</small>{" "}
                          <strong>
                            {" "}
                            {item.startYear || "—"} {" — "}{" "}
                            {item.endYear || "Present"}{" "}
                          </strong>{" "}
                        </div>{" "}
                      </div>
                    )}{" "}
                    {item.fundingAgency && (
                      <div className="project-meta-item">
                        {" "}
                        <span className="meta-icon"> ◈ </span>{" "}
                        <div>
                          {" "}
                          <small>Funding</small>{" "}
                          <strong> {item.fundingAgency} </strong>{" "}
                        </div>{" "}
                      </div>
                    )}{" "}
                  </div>{" "}
                  {/* PROJECT LINK */}{" "}
                  <div className="project-links">
                    {" "}
                    {item.projectUrl ? (
                      <a
                        href={item.projectUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="project-view-btn"
                      >
                        {" "}
                        View Project ↗{" "}
                      </a>
                    ) : (
                      <span className="project-no-link"> No project link </span>
                    )}{" "}
                  </div>{" "}
                </div>{" "}
                {/* ACTIONS */}{" "}
                <div className="project-manager-actions">
                  {" "}
                  <button
                    type="button"
                    className="edit-btn"
                    onClick={() => handleEdit(item)}
                  >
                    {" "}
                    ✎ Edit{" "}
                  </button>{" "}
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => handleDelete(item.id)}
                  >
                    {" "}
                    × Delete{" "}
                  </button>{" "}
                </div>{" "}
              </article>
            ))}{" "}
          </div>
        )}{" "}
      </section>{" "}
    </div>
  );
}

export default ProjectManager;