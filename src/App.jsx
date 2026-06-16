import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import AlternativePage from './pages/AlternativePage';
import ToolDetailPage from './pages/ToolDetailPage';

function App() {
  return (
    <>
      <Header />
      <main style={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/alternative/:name" element={<AlternativePage />} />
          <Route path="/tool/:id" element={<ToolDetailPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
