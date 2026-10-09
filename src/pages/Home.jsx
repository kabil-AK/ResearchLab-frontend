import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Home() {
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
      <div className="home-loading">
        <div className="loading-orbit">
          <span></span>
        </div>
        <p>Initializing Research Lab...</p>
      </div>
    );
  }

  return (
    <main className="home-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="home-hero">

        <div className="hero-background-grid"></div>

        <div className="hero-orb hero-orb-one"></div>
        <div className="hero-orb hero-orb-two"></div>

        <div className="home-hero-container">

          <div className="home-hero-content">

            <div className="hero-eyebrow">
              <span className="hero-live-dot"></span>
              RESEARCH • INNOVATION • DISCOVERY
            </div>

            <h1>
              {siteInfo?.title || "Research Lab"}
            </h1>

            <p>
              {siteInfo?.description ||
                "Research, innovation and sustainable solutions."}
            </p>

            <div className="hero-actions">

              <Link
                to="/research-areas"
                className="hero-primary-btn"
              >
                Explore Research
                <span>↗</span>
              </Link>

              <Link
                to="/projects"
                className="hero-secondary-btn"
              >
                View Projects
                <span>→</span>
              </Link>

            </div>

            <div className="home-hero-meta">

              <div>
                <strong>01</strong>
                <span>Scientific Research</span>
              </div>

              <div>
                <strong>02</strong>
                <span>Innovation</span>
              </div>

              <div>
                <strong>03</strong>
                <span>Collaboration</span>
              </div>

            </div>

          </div>


          {/* HERO VISUAL */}

          <div className="home-hero-visual">

            <div className="hero-image-frame">

              <div className="hero-image-glow"></div>

              {siteInfo?.imageUrl ? (
                <img
                  src={siteInfo.imageUrl}
                  alt={siteInfo.title || "Research Laboratory"}
                />
              ) : (
                <div className="hero-placeholder">
                  <span>✦</span>
                  <p>Research & Innovation</p>
                </div>
              )}

              <div className="hero-floating-card hero-card-top">
                <span className="floating-icon">✦</span>
                <div>
                  <strong>Research</strong>
                  <small>Driven by curiosity</small>
                </div>
              </div>

              <div className="hero-floating-card hero-card-bottom">
                <span className="floating-status"></span>
                <div>
                  <strong>Lab Status</strong>
                  <small>Active & Discovering</small>
                </div>
              </div>

            </div>

          </div>

        </div>


        <div className="hero-scroll-indicator">
          <span></span>
          SCROLL TO DISCOVER
        </div>

      </section>


      {/* =====================================================
          RESEARCH & INNOVATION
      ===================================================== */}

      <section className="home-intro">

        <div className="home-section-container">

          <div className="section-heading-block">

            <span className="section-label">
              OUR APPROACH
            </span>

            <h2>
              Research that turns
              <span> questions into discoveries.</span>
            </h2>

          </div>

          <div className="intro-content">

            <p>
              Our research focuses on developing innovative solutions through
              science, technology and interdisciplinary collaboration.
            </p>

            <div className="intro-line"></div>

            <span className="intro-note">
              Science • Technology • Collaboration
            </span>

          </div>

        </div>

      </section>


      {/* =====================================================
          DISCOVER OUR WORK
      ===================================================== */}

      <section className="home-discover">

        <div className="home-section-container">

          <div className="discover-heading">

            <div>
              <span className="section-label">
                EXPLORE THE LAB
              </span>

              <h2>
                Discover our work.
              </h2>
            </div>

            <p>
              Explore the people, research and projects shaping our
              laboratory.
            </p>

          </div>


          <div className="discover-grid">

            <Link
              to="/team"
              className="discover-card"
            >
              <span className="discover-number">01</span>

              <div className="discover-icon">
                ♙
              </div>

              <div className="discover-card-content">
                <h3>Our Team</h3>

                <p>
                  Meet our researchers and academic team.
                </p>
              </div>

              <span className="discover-arrow">
                ↗
              </span>

            </Link>


            <Link
              to="/publications"
              className="discover-card"
            >
              <span className="discover-number">02</span>

              <div className="discover-icon">
                ▤
              </div>

              <div className="discover-card-content">
                <h3>Publications</h3>

                <p>
                  Explore our latest research publications.
                </p>
              </div>

              <span className="discover-arrow">
                ↗
              </span>

            </Link>


            <Link
              to="/projects"
              className="discover-card"
            >
              <span className="discover-number">03</span>

              <div className="discover-icon">
                ◆
              </div>

              <div className="discover-card-content">
                <h3>Projects</h3>

                <p>
                  Discover our ongoing and completed projects.
                </p>
              </div>

              <span className="discover-arrow">
                ↗
              </span>

            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="home-final-cta">

        <div className="cta-glow"></div>

        <div className="home-section-container">

          <span className="section-label">
            RESEARCH WITHOUT LIMITS
          </span>

          <h2>
            Building knowledge.
            <br />
            Creating the future.
          </h2>

          <p>
            Discover how our research is contributing to meaningful
            scientific and technological progress.
          </p>

          <Link
            to="/research-areas"
            className="cta-button"
          >
            Explore Our Research
            <span>↗</span>
          </Link>

        </div>

      </section>

    </main>
  );
}

export default Home;

