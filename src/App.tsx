import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/Main';
import AboutPage from './pages/About';
import NotFoundPage from './pages/404';
import Header from './components/Header';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
