import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="admin-layout">

      {/* =========================
          SIDEBAR
      ========================= */}

      <aside className="admin-sidebar">

        <Link to="/" className="admin-brand">
          <span className="admin-brand-icon">✦</span>

          <span className="admin-brand-text">
            Research<span>Lab</span>
          </span>
        </Link>

        <div className="admin-sidebar-line"></div>

        <nav className="admin-menu">

          <p className="admin-menu-title">
            MAIN MENU
          </p>

          <Link
            to="/admin/dashboard"
            className="admin-menu-link active"
          >
            <span className="menu-icon">▦</span>
            <span>Dashboard</span>
          </Link>

          <p className="admin-menu-title content-title">
            CONTENT
          </p>

          <Link
            to="/admin/site-info"
            className="admin-menu-link"
          >
            <span className="menu-icon">◈</span>
            <span>Site Information</span>
          </Link>

          <Link
            to="/admin/team"
            className="admin-menu-link"
          >
            <span className="menu-icon">♙</span>
            <span>Team</span>
          </Link>

          <Link
            to="/admin/research-areas"
            className="admin-menu-link"
          >
            <span className="menu-icon">◎</span>
            <span>Research Areas</span>
          </Link>

          <Link
            to="/admin/publications"
            className="admin-menu-link"
          >
            <span className="menu-icon">▤</span>
            <span>Publications</span>
          </Link>

          <Link
            to="/admin/projects"
            className="admin-menu-link"
          >
            <span className="menu-icon">◆</span>
            <span>Projects</span>
          </Link>

        </nav>

        <div className="admin-sidebar-bottom">

          <Link
            to="/"
            className="admin-menu-link website-menu"
          >
            <span className="menu-icon">↗</span>
            <span>View Website</span>
          </Link>

          <div className="admin-sidebar-footer">
            <span className="footer-pulse"></span>
            CMS Online
          </div>

        </div>

      </aside>

      {/* =========================
          MAIN CONTENT
      ========================= */}

      <main className="admin-main">

        {/* HEADER */}

        <header className="admin-header">

          <div className="admin-header-content">

            <span className="admin-eyebrow">
              RESEARCH LAB CMS
            </span>

            <h1>
              Welcome to your
              <span> Dashboard.</span>
            </h1>

            <p>
              Manage your research laboratory website,
              publications, projects and team from one place.
            </p>

          </div>

          <div className="admin-status">
            <span className="status-dot"></span>

            <span>System Online</span>
          </div>

        </header>

        {/* DECORATIVE LINE */}

        <div className="dashboard-line">
          <span></span>
        </div>

        {/* =========================
            STATISTICS
        ========================= */}

        <section className="admin-stats">

          <div className="admin-stat-card">

            <div className="stat-icon">
              ♙
            </div>

            <div className="stat-content">
              <span>Team Members</span>
              <strong>15+</strong>
            </div>

            <div className="stat-number">
              01
            </div>

          </div>

          <div className="admin-stat-card">

            <div className="stat-icon">
              ◎
            </div>

            <div className="stat-content">
              <span>Research Areas</span>
              <strong>06</strong>
            </div>

            <div className="stat-number">
              02
            </div>

          </div>

          <div className="admin-stat-card">

            <div className="stat-icon">
              ▤
            </div>

            <div className="stat-content">
              <span>Publications</span>
              <strong>25+</strong>
            </div>

            <div className="stat-number">
              03
            </div>

          </div>

          <div className="admin-stat-card">

            <div className="stat-icon">
              ◆
            </div>

            <div className="stat-content">
              <span>Projects</span>
              <strong>10+</strong>
            </div>

            <div className="stat-number">
              04
            </div>

          </div>

        </section>

        {/* =========================
            QUICK ACTIONS
        ========================= */}

        <section className="admin-section">

          <div className="admin-section-heading">

            <div>
              <span className="admin-eyebrow">
                MANAGEMENT
              </span>

              <h2>
                Quick Actions
              </h2>
            </div>

            <span className="section-description">
              Manage your research platform
            </span>

          </div>

          <div className="admin-action-grid">

            <Link
              to="/admin/site-info"
              className="admin-action-card"
            >
              <div className="action-top">
                <span className="action-icon">
                  ◈
                </span>

                <span className="action-number">
                  01
                </span>
              </div>

              <h3>
                Site Information
              </h3>

              <p>
                Update laboratory name, description
                and website information.
              </p>

              <span className="action-arrow">
                →
              </span>
            </Link>

            <Link
              to="/admin/team"
              className="admin-action-card"
            >
              <div className="action-top">
                <span className="action-icon">
                  ♙
                </span>

                <span className="action-number">
                  02
                </span>
              </div>

              <h3>
                Manage Team
              </h3>

              <p>
                Add, edit and manage research
                team members.
              </p>

              <span className="action-arrow">
                →
              </span>
            </Link>

            <Link
              to="/admin/research-areas"
              className="admin-action-card"
            >
              <div className="action-top">
                <span className="action-icon">
                  ◎
                </span>

                <span className="action-number">
                  03
                </span>
              </div>

              <h3>
                Research Areas
              </h3>

              <p>
                Manage the scientific research
                areas of your laboratory.
              </p>

              <span className="action-arrow">
                →
              </span>
            </Link>

            <Link
              to="/admin/publications"
              className="admin-action-card"
            >
              <div className="action-top">
                <span className="action-icon">
                  ▤
                </span>

                <span className="action-number">
                  04
                </span>
              </div>

              <h3>
                Publications
              </h3>

              <p>
                Manage academic papers and
                research publications.
              </p>

              <span className="action-arrow">
                →
              </span>
            </Link>

            <Link
              to="/admin/projects"
              className="admin-action-card"
            >
              <div className="action-top">
                <span className="action-icon">
                  ◆
                </span>

                <span className="action-number">
                  05
                </span>
              </div>

              <h3>
                Projects
              </h3>

              <p>
                Manage ongoing and completed
                research projects.
              </p>

              <span className="action-arrow">
                →
              </span>
            </Link>

            <Link
              to="/"
              className="admin-action-card website-card"
            >
              <div className="action-top">
                <span className="action-icon">
                  ↗
                </span>

                <span className="action-number">
                  06
                </span>
              </div>

              <h3>
                View Website
              </h3>

              <p>
                Open the public research laboratory
                website.
              </p>

              <span className="action-arrow">
                →
              </span>
            </Link>

          </div>

        </section>

        {/* =========================
            SYSTEM PANEL
        ========================= */}

        <section className="admin-info-panel">

          <div className="info-grid"></div>

          <div className="info-glow"></div>

          <div className="info-content">

            <span className="admin-eyebrow">
              SYSTEM STATUS
            </span>

            <h2>
              Your research platform
              <span> is ready.</span>
            </h2>

            <p>
              Manage your laboratory's content,
              publications, projects and research
              team through this centralized
              administration panel.
            </p>

          </div>

          <div className="info-status">

            <span className="info-status-dot"></span>

            <div>
              <strong>All systems operational</strong>
              <small>ResearchLab CMS</small>
            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default AdminDashboard;

