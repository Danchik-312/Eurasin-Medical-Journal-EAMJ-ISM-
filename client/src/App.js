import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import MainPage from "./pages/mainPage/MainPage";
import AnnouncementsPage from "./pages/announcementsPage/AnnouncementsPage";
import ArchivesPage from "./pages/archivesPage/ArchivesPage";
import ContactPage from "./pages/contactPage/ContactPage";
import CurrentPage from "./pages/currentPage/CurrentPage";
import EditorialPage from "./pages/editorialPage/EditorialPage";
import HomePage from "./pages/homePage/HomePage";
import IndexingPage from "./pages/indexingPage/IndexingPage";
import PublicationPage from "./pages/publicationPage/PublicationPage";
import SubmissionsPage from "./pages/submissionsPage/SubmissionsPage";
import NotFoundPage from "./pages/notFoundPage/NotFoundPage";
import SideBar from "./components/sideBar/SideBar";
import ReadersPage from "./pages/readersPage/ReadersPage";
import AuthorsPage from "./pages/authorsPage/AuthorsPage";
import LibrarianPage from "./pages/librarianPage/LibrarianPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Header />
          <div  className="_container flex">
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/announcements" element={<AnnouncementsPage />} />
                <Route path="/archives" element={<ArchivesPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/current" element={<CurrentPage />} />
                <Route path="/editorial" element={<EditorialPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/indexing" element={<IndexingPage />} />
                <Route path="/publication" element={<PublicationPage />} />
                <Route path="/submissions" element={<SubmissionsPage />} />
                <Route path="/readers" element={<ReadersPage />} />
                <Route path="/authors" element={<AuthorsPage />} />
                <Route path="/librarian" element={<LibrarianPage />} />
                <Route path='*' element={<NotFoundPage/>} />
            </Routes>
          <div>
               <SideBar />
          </div>
          </div>
          <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
