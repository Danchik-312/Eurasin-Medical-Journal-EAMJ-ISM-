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
import AdminMainPage from "./pages/adminMainPage/AdminMainPage";
import AdminLoginPage from "./pages/adminLoginPage/AdminLoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

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
                {/* Публичные маршруты с layout */}
                <Route
                    path="/"
                    element={
                        <PublicLayout>
                            <MainPage />
                        </PublicLayout>
                    }
                />
                <Route
                    path="/announcements"
                    element={
                        <PublicLayout>
                            <AnnouncementsPage />
                        </PublicLayout>
                    }
                />
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute>
                            <AdminMainPage />
                        </ProtectedRoute>
                    }
                />
                {/* 404 */}
                <Route path="*" element={<PublicLayout><NotFoundPage /></PublicLayout>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
