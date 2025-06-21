import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
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
import AdminLoginPage from "./pages/admin/adminLoginPage/AdminLoginPage";
import AdminMainPage from "./pages/admin/adminMainPage/AdminMainPage";
import AdminRoute from "./components/AdminRoute"; // Убедитесь, что путь правильный

// Основной макет для публичных страниц
const PublicLayout = () => {
    return (
        <>
            <Header />
            <div className="_container flex">
                <div className="main-content">
                    <Outlet /> {/* Здесь рендерятся публичные страницы */}
                </div>
                <div>
                    <SideBar />
                </div>
            </div>
            <Footer />
        </>
    );
};

// Макет для админских страниц
const AdminLayout = () => {
    return (
        <div className="admin-layout">
            <Outlet /> {/* Здесь рендерятся админские страницы */}
        </div>
    );
};

// Компонент для обертки роутов
const AppRoutes = () => {
    return (
        <Routes>
            {/* Публичные страницы */}
            <Route element={<PublicLayout />}>
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
            </Route>

            {/* Админские страницы */}
            <Route element={<AdminLayout />}>
                <Route path="/admin/login" element={<AdminLoginPage />} />

                <Route path="/admin" element={<AdminRoute />}>
                    <Route index element={<AdminMainPage />} />
                    <Route path="main" element={<AdminMainPage />} />
                    {/* Добавьте другие защищенные админские роуты здесь */}
                </Route>
            </Route>

            {/* Страница 404 */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </div>
    );
}

export default App;