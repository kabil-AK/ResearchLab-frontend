import { useEffect, useState } from "react";
import api from "../services/api";

function About() {
  const [siteInfo, setSiteInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSiteInfo();
  }, []);

  const fetchSiteInfo = async () => {
    try {
      const response = await api.get("/public/site-info");
      setSiteInfo(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="about-page">
      {/* HERO */}

      <section className="about-hero">
        <div className="about-hero-content">
          <span className="about-label">ABOUT OUR LAB</span>

          <h1>
            Research that
            <span> shapes tomorrow.</span>
          </h1>

          <p>
            We combine scientific research, technology and collaboration to
            solve meaningful real-world challenges.
          </p>
        </div>

        <div className="about-orbit">
          <div className="orbit-ring ring-one"></div>
          <div className="orbit-ring ring-two"></div>
          <div className="orbit-ring ring-three"></div>

          <div className="orbit-core">✦</div>
        </div>
      </section>

      {/* INTRODUCTION */}

      <section className="about-introduction">
        <div>
          <span className="section-label">WHO WE ARE</span>

          <h2>Building knowledge through curiosity and innovation.</h2>
        </div>

        <div>
          <p>
            {siteInfo?.description ||
              "Our research laboratory is dedicated to scientific discovery, innovation and creating solutions that make a meaningful impact."}
          </p>

          <p>
            Our interdisciplinary approach brings together researchers, students
            and collaborators to explore challenging problems and develop new
            ideas.
          </p>
        </div>
      </section>

      {/* MISSION / VISION */}

      <section className="mission-section">
        <div className="about-card reveal">
          <div className="about-card-icon">◈</div>

          <h2>Our Mission</h2>

          <p>
            To advance knowledge through rigorous research, innovation and
            collaboration while developing solutions for real-world challenges.
          </p>
        </div>

        <div className="about-card reveal">
          <div className="about-card-icon">◎</div>

          <h2>Our Vision</h2>

          <p>
            To become a leading research environment where ideas, technology and
            scientific excellence come together to shape a better future.
          </p>
        </div>
      </section>

      {/* STATS */}

      <section className="stats-section">
        <div className="section-heading-center">
          <span className="section-label">OUR IMPACT</span>

          <h2>Research in numbers</h2>
        </div>

        <div className="stats-grid">
          <div className="stat-card reveal">
            <strong>10+</strong>
            <span>Research Projects</span>
          </div>

          <div className="stat-card reveal">
            <strong>25+</strong>
            <span>Publications</span>
          </div>

          <div className="stat-card reveal">
            <strong>15+</strong>
            <span>Researchers</span>
          </div>

          <div className="stat-card reveal">
            <strong>8+</strong>
            <span>Years of Research</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
