import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
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
import ComparisonsPage from './pages/ComparisonsPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main style={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/alternative/:name" element={<AlternativePage />} />
          <Route path="/tool/:id" element={<ToolDetailPage />} />
          <Route path="/submit" element={<SubmitPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/comparisons" element={<ComparisonsPage />} />
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
