import '@styles/global.css';
import '@styles/utilities.css';
import '@styles/icons.css';
import { Route, Routes } from 'react-router-dom';
import About from './pages/About';
import ApplicationDetail from './pages/ApplicationDetail';
import Companies from './pages/Companies';
import Dashboard from './pages/Dashboard';
import InterviewCalendar from './pages/InterviewCalendar';
import NotFound from './pages/NotFound';
import Positions from './pages/Positions';
import Settings from './pages/Settings';
import Layout from './shared/Layout';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/application/:id" element={<ApplicationDetail />} />
        <Route path="/interviews" element={<InterviewCalendar />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/positions" element={<Positions />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
