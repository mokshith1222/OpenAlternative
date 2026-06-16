import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import AlternativePage from './pages/AlternativePage';
import ToolDetailPage from './pages/ToolDetailPage';
import SubmitPage from './pages/SubmitPage';
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import CategoriesPage from './pages/CategoriesPage';

function App() {
  return (
    <>
      <Header />
      <main style={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/alternative/:name" element={<AlternativePage />} />
          <Route path="/tool/:id" element={<ToolDetailPage />} />
          <Route path="/submit" element={<SubmitPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
