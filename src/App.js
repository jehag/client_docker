import { Routes, Route } from "react-router-dom";

import './App.css';
import CaptionPage from "./pages/GenerateCaption/Caption";
import AllImagesPage from "./pages/Images/Images";
import MainPage from './pages/Main/Main';
import SearchPage from "./pages/Search/SearchPage";
import CelebritiesPage from "./pages/Celebrities/Celebrities";
import AddCelebrityPage from "./pages/AddCelebrity/AddCelebrity";
import AddImagePage from "./pages/AddImage/AddImage";
import DocumentationPage from "./pages/Documentation/Documentation";
import AddPage from "./pages/Add/Add";
import AddLogoPage from "./pages/AddLogo/AddLogo";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/images" element={<AllImagesPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/caption" element={<CaptionPage />} />
        <Route path="/celebrities" element={<CelebritiesPage />} />
        <Route path="/add" element={<AddPage />} />
        <Route path="/add-image" element={<AddImagePage />} />
        <Route path="/add-celebrity" element={<AddCelebrityPage />} />
        <Route path="/add-logo" element={<AddLogoPage />} />
        <Route path="/documentation" element={<DocumentationPage />} />
      </Routes>
    </div>
  );
}

export default App;
