import styles from '@styles/pages/About.module.css';

export default function About() {
  return (
    <div className="container">
      <div className={styles.aboutHeader}>
        <div className={styles.logoContainer}>
          <img src="/logo.svg" alt="Job Tracker Logo" width="100" height="100" />
        </div>
        <h1>Job Tracker</h1>
        <p className={styles.subtitle}>Your Personal Job Application Management System</p>
      </div>

      <div className={styles.aboutContent}>
        <section className={styles.introSection}>
          <p className={styles.intro}>
            A modern web application to streamline your job search. Track applications, schedule
            interviews, manage companies and positions - all stored locally and privately in your
            browser.
          </p>
        </section>

        <section className={styles.featuresSection}>
          <h2>
            <span className="icon icon-sparkles"></span> Features
          </h2>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <span className={`icon icon-note ${styles.featureIcon}`}></span>
              <span>Track applications with status, salary, and timeline</span>
            </div>
            <div className={styles.featureCard}>
              <span className={`icon icon-calendar ${styles.featureIcon}`}></span>
              <span>Schedule interviews with time, duration & location</span>
            </div>
            <div className={styles.featureCard}>
              <span className={`icon icon-company ${styles.featureIcon}`}></span>
              <span>Manage company & position catalogs</span>
            </div>
            <div className={styles.featureCard}>
              <span className={`icon icon-search ${styles.featureIcon}`}></span>
              <span>Filter by status and search by keywords</span>
            </div>
            <div className={styles.featureCard}>
              <span className={`icon icon-database ${styles.featureIcon}`}></span>
              <span>100% local storage - your data stays private</span>
            </div>
            <div className={styles.featureCard}>
              <span className={`icon icon-mobile ${styles.featureIcon}`}></span>
              <span>Fully responsive mobile design</span>
            </div>
          </div>
        </section>

        <section className={styles.techSection}>
          <h2>
            <span className="icon icon-gear"></span> Tech Stack
          </h2>
          <div className={styles.techList}>
            <span className={styles.techBadge}>
              <span className="icon icon-react"></span> React 19
            </span>
            <span className={styles.techBadge}>
              <img src="/vite.svg" alt="Vite" width="20" height="20" /> Vite
            </span>
            <span className={styles.techBadge}>
              <span className="icon icon-router"></span> React Router
            </span>
            <span className={styles.techBadge}>
              <span className="icon icon-database"></span> IndexedDB
            </span>
            <span className={styles.techBadge}>
              <span className="icon icon-palette"></span> CSS Modules
            </span>
            <span className={styles.techBadge}>
              <span className="icon icon-code"></span> ES6+
            </span>
          </div>
        </section>

        <section className={styles.aboutProject}>
          <h2>
            <span className="icon icon-person"></span> About
          </h2>
          <p>
            Developed by <strong>Fatima Macias</strong> as part of the{' '}
            <a href="https://codethedream.org" target="_blank" rel="noopener noreferrer">
              Code The Dream
            </a>{' '}
            program. Built with modern React patterns including feature-based architecture,
            useReducer state management, and normalized database design.
          </p>
        </section>

        <section className={styles.acknowledgmentSection}>
          <h2>
            <span className="icon icon-thanks"></span> Special Thanks
          </h2>
          <div className={styles.acknowledgmentContent}>
            <p className={styles.acknowledgmentIntro}>
              This project would not have been possible without the incredible support and guidance
              from the{' '}
              <a href="https://codethedream.org" target="_blank" rel="noopener noreferrer">
                Code The Dream
              </a>{' '}
              community.
            </p>

            <div className={styles.thanksCard}>
              <h3>
                <span className="icon icon-heart"></span> To Code The Dream
              </h3>
              <p>
                Thank you for providing this amazing opportunity to learn, grow, and build
                real-world applications. Your commitment to empowering aspiring developers through
                education and mentorship is truly transformative.
              </p>
            </div>

            <div className={styles.thanksCard}>
              <h3>
                <span className="icon icon-person"></span> To Our Mentors
              </h3>
              <p>
                A heartfelt thank you to all the mentors who dedicate their time and expertise to
                guide us through this learning journey. Your patience, encouragement, and technical
                insights have been invaluable in helping us become better developers.
              </p>
            </div>

            <div className={styles.thanksCard}>
              <h3>
                <span className="icon icon-pencil"></span> To Our Reviewers
              </h3>
              <p>
                Special appreciation to all the code reviewers who take time from their schedules to
                provide detailed, constructive feedback on our work. Your reviews help us learn best
                practices, catch mistakes, and continuously improve our coding skills. Every comment
                and suggestion makes us better programmers.
              </p>
            </div>

            <p className={styles.acknowledgmentClosing}>
              The support, feedback, and encouragement from the entire CTD team throughout this
              course has been instrumental in bringing this project to life. Thank you for believing
              in us and helping us achieve our goals!
            </p>
          </div>
        </section>

        <section className={styles.inspirationSection}>
          <h2>
            <span className="icon icon-lightbulb"></span> Design Inspiration & Resources
          </h2>
          <p className={styles.inspirationText}>
            This application was built using modern web development best practices and design
            patterns inspired by industry-leading frameworks and resources:
          </p>
          <div className={styles.resourcesList}>
            <div className={styles.resourceItem}>
              <strong>UI Components:</strong> Toast notifications, Pagination, Modal dialogs, and
              Card layouts inspired by{' '}
              <a href="https://getbootstrap.com/" target="_blank" rel="noopener noreferrer">
                Bootstrap 5
              </a>{' '}
              component library
            </div>
            <div className={styles.resourceItem}>
              <strong>Color & Spacing:</strong> Design principles influenced by{' '}
              <a href="https://material.io/design" target="_blank" rel="noopener noreferrer">
                Material Design Guidelines
              </a>
            </div>
            <div className={styles.resourceItem}>
              <strong>Technical Implementation:</strong> Database management with{' '}
              <a href="https://dexie.org/" target="_blank" rel="noopener noreferrer">
                Dexie.js
              </a>
              , state patterns from{' '}
              <a href="https://react.dev/" target="_blank" rel="noopener noreferrer">
                React Documentation
              </a>
              , and CSS architecture using CSS Modules
            </div>
            <div className={styles.resourceItem}>
              <strong>Accessibility:</strong> ARIA patterns following{' '}
              <a href="https://www.w3.org/WAI/ARIA/apg/" target="_blank" rel="noopener noreferrer">
                WAI-ARIA Authoring Practices
              </a>
            </div>
          </div>
          <p className={styles.inspirationNote}>
            All implementations have been customized and adapted to meet the specific requirements
            of this job tracking application while maintaining accessibility and performance
            standards.
          </p>
        </section>
      </div>
    </div>
  );
}
