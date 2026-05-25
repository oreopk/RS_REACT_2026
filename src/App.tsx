import { Routes, Route, useParams } from 'react-router-dom';
import MainPage from './pages/Main';
import AboutPage from './pages/About';
import NotFoundPage from './pages/404';
import Header from './components/Header';
import BookDetail from './components/BookDetail';
import Flyout from './components/Flyout';

function BookWrapper() {
  const { id } = useParams();
  return <BookDetail key={id} />;
}

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route path="books/:id" element={<BookWrapper />} />
        </Route>
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Flyout />
    </>
  );
}

export default App;
