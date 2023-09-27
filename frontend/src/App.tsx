import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Navbar } from "./components/navbar_and_footer/navbar/Navbar"
import { HomePage } from "./components/pages/home/HomePage"
import { Footer } from "./components/navbar_and_footer/footer/Footer"
import { SearchPage } from "./components/pages/search/SearchPage"
import { ReviewsPage } from "./components/pages/reviews/ReviewsPage"
import { BookPage } from "./components/pages/book/BookPage"
import { ShelfPage } from "./components/pages/shelf/ShelfPage"
import { DiscussionsPage } from "./components/pages/discussions/DiscussionsPage"
import { AdminPage } from "./components/pages/admin/AdminPage"
import { PaymentPage } from "./components/pages/payment/PaymentPage"
import { LoginPage } from "./components/pages/login/LoginPage"
import { RegistrationPage } from "./components/pages/registration/RegistrationPage"

export const App = () => {

    return (

        <main className="relative">

            <BrowserRouter>

                <Navbar />

                <Routes>

                    <Route path='/' element={<Navigate to="/home" />} />

                    <Route path='/home' element={<HomePage />} />

                    <Route path='/search' element={<SearchPage />} />

                    <Route path='/book/:bookId' element={<BookPage />} />

                    <Route path='/reviews/:bookId' element={<ReviewsPage />} />

                    <Route path='/shelf' element={<ShelfPage />} />

                    <Route path='/discussions' element={<DiscussionsPage />} />

                    <Route path='/fees' element={<PaymentPage />} />

                    <Route path='/admin' element={<AdminPage />} />

                    <Route path='/login' element={<LoginPage />} />

                    <Route path='/register' element={<RegistrationPage />} />

                </Routes>

                <Footer />

            </BrowserRouter>

        </main>

    )

}