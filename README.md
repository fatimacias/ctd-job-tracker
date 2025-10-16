<div align="center">
  <img src="public/logo.svg" alt="Job Tracker Logo" width="120" height="120">

# CTD Job Tracker

A modern, responsive web application for tracking job applications throughout the hiring process. Built with React, Vite, and IndexedDB for offline data persistence.

![React](https://img.shields.io/badge/React-19.1.1-61dafb?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646cff?style=flat&logo=vite)
![IndexedDB](https://img.shields.io/badge/IndexedDB-Dexie-orange?style=flat)

</div>

## Features

- 📊 **Dashboard Overview**: Track all your job applications in one place
- 🔍 **Advanced Filtering**: Filter applications by status (Applied, Interview, Offer, Rejected)
- 🔎 **Search Functionality**: Search by company name or position title
- 📝 **Detailed Tracking**: Add notes and status updates for each application
- 💾 **Offline Storage**: Uses IndexedDB for local data persistence
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- ⚡ **Fast Performance**: Built with Vite for optimal development and build performance

## Project Structure

```
src/
├── features/           # Feature-based components
│   ├── applications/   # Job application management
│   └── config/         # Configuration settings
├── pages/             # Route components
│   ├── Dashboard.jsx  # Main application dashboard
│   └── NotFound.jsx   # 404 error page
├── shared/            # Shared utilities and components
├── hooks/             # Custom React hooks
├── reducers/          # State management
├── db/               # IndexedDB client and schema
└── styles/           # CSS stylesheets
```

## Dependencies

### Core Dependencies

- **React** (^19.1.1): UI framework
- **React Router DOM** (^7.9.4): Client-side routing
- **Dexie** (^4.2.1): IndexedDB wrapper for data persistence

### Development Dependencies

- **Vite** (^7.1.7): Build tool and dev server
- **ESLint**: Code linting
- **Prettier**: Code formatting

## Installation and Setup

### Prerequisites

- Node.js (version 16 or higher)
- NPM (comes with Node.js)

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/fatimacias/ctd-job-tracker.git
   cd ctd-job-tracker
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically
- `npm run format` - Format code with Prettier

## Data Storage

This application uses **IndexedDB** for local data persistence.

## Browser Compatibility

This application works in all modern browsers that support:

- ES6+ JavaScript features
- IndexedDB API
- CSS Grid and Flexbox

Tested browsers:

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## External Sources & Inspiration

This project was built with inspiration and guidance from various external resources:

### UI/UX Design Patterns

- **Bootstrap Components**: Design patterns for Toast notifications, Pagination, Modal dialogs, and Card layouts were inspired by [Bootstrap 5](https://getbootstrap.com/) component library
- **Material Design**: Color schemes and spacing principles influenced by [Material Design Guidelines](https://material.io/design)
- **CSS Tricks**: Responsive layout techniques and CSS architecture patterns from [CSS-Tricks](https://css-tricks.com/)

### Component Implementation References

- **Toast Notifications**: Animation patterns and positioning inspired by Bootstrap Toast component
- **Pagination Component**: UI patterns and interaction design based on Bootstrap Pagination
- **Modal Dialogs**: Structure and accessibility patterns referenced from Bootstrap Modal
- **Form Layouts**: Grid-based form design inspired by modern CSS frameworks
- **Card Components**: Visual design and layout patterns from Material Design cards

### Technical Resources

- **IndexedDB Implementation**: [Dexie.js Documentation](https://dexie.org/) for database schema and operations
- **React Patterns**: State management with useReducer pattern from [React Official Docs](https://react.dev/)
- **CSS Modules**: Architecture approach from [CSS Modules GitHub](https://github.com/css-modules/css-modules)
- **Accessibility**: ARIA patterns from [WAI-ARIA Practices](https://www.w3.org/WAI/ARIA/apg/)

### Learning Resources

- **React Router**: Navigation implementation from [React Router Documentation](https://reactrouter.com/)
- **Vite Build Tool**: Configuration and optimization from [Vite Guide](https://vite.dev/)
- **MDN Web Docs**: JavaScript and Web API references

All implementations were adapted and customized to fit the specific needs of this application while maintaining best practices and accessibility standards.

## Acknowledgments

### Special Thanks

This project was developed as part of the **[Code The Dream](https://codethedream.org)** program, and would not have been possible without the invaluable support of:

#### Code The Dream Organization

Thank you for providing this incredible opportunity to learn and grow as a developer. Your commitment to empowering aspiring programmers through education and mentorship is truly transformative and creates real pathways to careers in technology.

#### Our Mentors

A heartfelt thank you to all the mentors who dedicate their time and expertise throughout the course. Your patience, guidance, encouragement, and technical insights have been instrumental in helping us navigate challenges and become better developers.

#### Our Code Reviewers

Special appreciation to all the reviewers who take time from their busy schedules to provide detailed, constructive feedback on our code. Your thorough reviews help us:

- Learn industry best practices and standards
- Identify and fix bugs and potential issues
- Improve code quality and maintainability
- Develop better problem-solving skills
- Grow as professional developers

Every comment, suggestion, and piece of feedback makes us stronger programmers. Thank you for your dedication to our learning journey!

---

**Project Details:**

- **Developer**: Fatima Macias
- **Program**: Code The Dream (CTD)
- **Focus**: Modern React patterns, feature-based architecture, useReducer state management
- **Purpose**: Building a practical tool to help job seekers stay organized throughout their application process
