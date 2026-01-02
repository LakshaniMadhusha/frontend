import { Route, Routes } from "react-router-dom";
import Header from "../../components/header";
import ProductsPage from "./productsPage";
import ProductOverview from "./productOverview";

export default function ClientPage() {
    return(
    <div className="w-full h-screen max-h-screen ">
        <Header />

        <div className="w-full h-[calc(100%-100px)] ">
            <Routes path="/">
                <Route path="/" element={<h1 className="text-3xl text-center">Welcome to the Home Page</h1>} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/reviews" element={<h1 className="text-3xl text-center">Reviews Page</h1>} />
                <Route path="/about-us" element={<h1 className="text-3xl text-center">About Us Page</h1>} />
                <Route path="/contact-us" element={<h1 className="text-3xl text-center">Contact Us Page</h1>} />
                <Route path="/overview/:productId" element={<ProductOverview />} />
                <Route path="/*" element={<h1 className="text-3xl text-center">404 Not Found</h1>}></Route>
            </Routes>
        </div>
    </div>
    )
}