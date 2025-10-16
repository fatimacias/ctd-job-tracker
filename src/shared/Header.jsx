import styles from '@styles/shared/Header.module.css';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
          <NavLink to="/" onClick={closeMenu}>
            <Logo size={36} variant="compact" />
          </NavLink>
        </div>

        <button
          className={`${styles.menuButton} ${isMenuOpen ? styles.menuOpen : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {isMenuOpen && <div className={styles.overlay} onClick={closeMenu}></div>}

        <nav
          id="main-navigation"
          className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}
          aria-label="Main navigation"
        >
          <ul>
            <li>
              <NavLink to="/" onClick={closeMenu}>
                <span className="icon icon-dashboard"></span>
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/interviews" onClick={closeMenu}>
                <span className="icon icon-interviews"></span>
                <span>Interviews</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/companies" onClick={closeMenu}>
                <span className="icon icon-companies"></span>
                <span>Companies</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/positions" onClick={closeMenu}>
                <span className="icon icon-positions"></span>
                <span>Positions</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/settings" onClick={closeMenu}>
                <span className="icon icon-settings"></span>
                <span>Settings</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" onClick={closeMenu}>
                <span className="icon icon-about"></span>
                <span>About</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
