import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BoxingHome from './pages/BoxingHome';
import FAQ from './pages/FAQ';
import TOS from './pages/TOS';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/boxing" replace />} />
        <Route path="/boxing" element={<BoxingHome />} />
        <Route path="/boxing/faq" element={<FAQ />} />
        <Route path="/boxing/tos" element={<TOS />} />
        <Route path="/boxing/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
