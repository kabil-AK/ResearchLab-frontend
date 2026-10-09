import { useEffect, useState } from "react";
import api from "../services/api";

function Team() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await api.get("/public/team-members");
      setMembers(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <p>Loading our team...</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Our Research Team</h1>

        <p>
          Meet the researchers, scientists and professionals working together to
          create meaningful discoveries.
        </p>
      </div>

      <div className="card-grid">
        {members.map((item) => (
          <div className="lab-card team-card reveal" key={item.id}>
            {item.imageUrl && (
              <img
                className="lab-card-image"
                src={item.imageUrl}
                alt={item.name}
              />
            )}

            <h2>{item.name}</h2>

            <span className="lab-tag">{item.designation}</span>

            <p>{item.experience}</p>

            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Team;
