import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import SideBar from "./components/sideBar/SideBar";

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
import ReadersPage from "./pages/readersPage/ReadersPage";
import AuthorsPage from "./pages/authorsPage/AuthorsPage";
import LibrarianPage from "./pages/librarianPage/LibrarianPage";

import AdminMainPage from "./pages/admin/adminMainPage/AdminMainPage";
import AdminLoginPage from "./pages/admin/adminLoginPage/AdminLoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Articles from "./pages/admin/adminMainPage/AdminArticlesTable";
import Journals from "./pages/admin/adminMainPage/AdminJournalsTable";
import SubmittedArticles from "./pages/admin/adminMainPage/SubmittedArticles";
import AdminLayout from "./pages/admin/adminLayout/AdminLayout";
import AddJournal from "./pages/admin/addJournal/AddJournal";
import AddArticle from "./pages/admin/addArticles/AddArticles";


// Публичный layout
function PublicLayout({ children }) {
    return (
        <>
            <Header />
            <div className="_container flex">
                {children}
                <SideBar />
            </div>
            <Footer />
        </>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Публичные страницы */}
                <Route path="/" element={<PublicLayout><MainPage /></PublicLayout>} />
                <Route path="/announcements" element={<PublicLayout><AnnouncementsPage /></PublicLayout>} />
                <Route path="/archives" element={<PublicLayout><ArchivesPage /></PublicLayout>} />
                <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />
                <Route path="/current" element={<PublicLayout><CurrentPage /></PublicLayout>} />
                <Route path="/editorial" element={<PublicLayout><EditorialPage /></PublicLayout>} />
                <Route path="/home" element={<PublicLayout><HomePage /></PublicLayout>} />
                <Route path="/indexing" element={<PublicLayout><IndexingPage /></PublicLayout>} />
                <Route path="/publication" element={<PublicLayout><PublicationPage /></PublicLayout>} />
                <Route path="/submissions" element={<PublicLayout><SubmissionsPage /></PublicLayout>} />
                <Route path="/readers" element={<PublicLayout><ReadersPage /></PublicLayout>} />
                <Route path="/authors" element={<PublicLayout><AuthorsPage /></PublicLayout>} />
                <Route path="/librarian" element={<PublicLayout><LibrarianPage /></PublicLayout>} />
                <Route path="*" element={<PublicLayout><NotFoundPage /></PublicLayout>} />

                {/* Админ логин — без лейаута */}
                <Route path="/admin/login" element={<AdminLoginPage />} />

                {/* Админ панель — отдельный layout */}
                <Route
                    path="/admin"
                    element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}
                >
                    <Route index element={<AdminMainPage />} />
                    <Route path="submitted" element={<SubmittedArticles />} />
                    <Route path="journals" element={<Journals />} />
                    <Route path="articles" element={<Articles />} />
                    <Route path="journals/add" element={<AddJournal />} />
                    <Route path="articles/add" element={<AddArticle />} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default App;
