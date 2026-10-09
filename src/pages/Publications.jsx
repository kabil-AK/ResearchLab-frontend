import { useEffect, useState } from "react";
import api from "../services/api";

function Publications() {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPublications();
  }, []);

  const fetchPublications = async () => {
    try {
      const response = await api.get("/public/publications");
      setPublications(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <p>Loading publications...</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Research Publications</h1>

        <p>
          Explore our research contributions, academic publications and
          scientific discoveries.
        </p>
      </div>

      {publications.length === 0 ? (
        <p>No publications available.</p>
      ) : (
        <div className="card-grid">
          {publications.map((item) => (
            <article className="lab-card publication-card reveal" key={item.id}>
              {item.imageUrl && (
                <img
                  className="lab-card-image"
                  src={item.imageUrl}
                  alt={item.title}
                />
              )}

              <span className="lab-tag">PUBLICATION</span>

              <h2>{item.title}</h2>

              <div className="publication-meta">
                {item.year && <span>{item.year}</span>}

                {item.journal && <span>{item.journal}</span>}
              </div>

              {item.authors && (
                <p>
                  <strong>Authors:</strong> {item.authors}
                </p>
              )}

              {item.description && <p>{item.description}</p>}

              {item.doiUrl && (
                <a
                  className="lab-button"
                  href={item.doiUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Publication →
                </a>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default Publications;
