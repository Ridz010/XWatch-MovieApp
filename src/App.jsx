import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import DetailMovie from './pages/DetailMovie';
import Sidebar from './components/Sidebar';
import Favourites from './pages/Favourites';
import TrendingPage from './pages/TrendingPage';
import ComingSoonPage from './pages/ComingSoonPage';
import { FavoritesProvider } from './components/FavoritesContext';

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <Main />
      </Router>
    </FavoritesProvider>
  );
}

function Main() {
  const location = useLocation();
  const isDetailPage = location.pathname.includes('/detail-movie');

  return (
    <div className="flex flex-col md:flex-row">
      {!isDetailPage && <Sidebar />}
      <div className={`flex-1 ${!isDetailPage ? 'md:ml-[250px] lg:ml-[350px]' : 'ml-0'} p-4 md:p-8`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail-movie/:id" element={<DetailMovie />} />
          <Route path='/favourites' element={<Favourites />} />
          <Route path='/trending' element={<TrendingPage />} />
          <Route path='/coming-soon' element={<ComingSoonPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;