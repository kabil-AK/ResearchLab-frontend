import { useEffect, useState } from "react";
import api from "../services/api";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get("/public/projects");
      setProjects(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <p>Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Research Projects</h1>

        <p>
          Discover our ongoing and completed projects transforming ideas into
          real-world impact.
        </p>
      </div>

      {projects.length === 0 ? (
        <p>No projects available.</p>
      ) : (
        <div className="card-grid">
          {projects.map((item) => (
            <article className="lab-card project-card reveal" key={item.id}>
              {item.imageUrl && (
                <img
                  className="lab-card-image"
                  src={item.imageUrl}
                  alt={item.title}
                />
              )}

              {item.status && (
                <span className="project-status">{item.status}</span>
              )}

              <h2>{item.title}</h2>

              {item.description && <p>{item.description}</p>}

              {(item.startYear || item.endYear) && (
                <p>
                  <strong>Duration:</strong> {item.startYear || "—"}
                  {" - "}
                  {item.endYear || "Present"}
                </p>
              )}

              {item.fundingAgency && (
                <p>
                  <strong>Funding:</strong> {item.fundingAgency}
                </p>
              )}

              {item.projectUrl && (
                <a
                  className="lab-button"
                  href={item.projectUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Project →
                </a>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default Projects;
