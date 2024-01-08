import { Route, Routes, useLocation } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SearchResult from './pages/SearchResult';
import CompareResult from './pages/CompareResult';
import DocumentationPage from './components/DocumentationPage';

function App() {
  const location = useLocation();

  return (
    <HelmetProvider>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/searchresult" element={<SearchResult />} />
        <Route path="/compareresult" element={<CompareResult />} />
        <Route path="/documentation" element={<DocumentationPage />} />
      </Routes>
      <Helmet>
        <title>{getTitle(location.pathname)}</title>
      </Helmet>
    </HelmetProvider>
  );
}

// Define a function to get the appropriate title based on the path
function getTitle(pathname) {
  switch (pathname) {
    case '/':
      return 'Home Page';
    case '/searchresult':
      return 'Search Results';
    case '/compareresult':
      return 'Compare Results';
    case '/documentation':
      return 'Documentation';
    default:
      return 'Your Default Title';
  }
}

export default App;
