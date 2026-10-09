import { useEffect, useState } from "react";
import api from "../services/api";

function ResearchAreas() {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAreas();
  }, []);

  const fetchAreas = async () => {
    try {
      const response = await api.get("/public/research-areas");
      setAreas(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <p>Loading research areas...</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Research Areas</h1>

        <p>
          Exploring emerging scientific challenges through innovative research,
          collaboration and technology.
        </p>
      </div>

      {areas.length === 0 ? (
        <p>No research areas available.</p>
      ) : (
        <div className="card-grid">
          {areas.map((item) => (
            <article className="lab-card reveal" key={item.id}>
              {item.imageUrl && (
                <img
                  className="lab-card-image"
                  src={item.imageUrl}
                  alt={item.title}
                />
              )}

              <span className="lab-tag">RESEARCH AREA</span>

              <h2>{item.title}</h2>

              <p>{item.shortDescription}</p>

              {item.description && <p>{item.description}</p>}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default ResearchAreas;
