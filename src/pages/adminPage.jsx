import { Link, Route, Routes } from "react-router-dom";
import { FaBoxArchive } from "react-icons/fa6";
import { MdShoppingBag } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import ProductAdminPage from "./admin/productAdminPage";
import AddProductAdminPage from "./admin/addProductAdminPage";
import UpdateProductAdminPage from "./admin/updateProduct";

export default function AdminPage(){
    return(
        <div className="w-full  h-screen flex">
            <div className="w-[300px] h-full flex flex-col items-center">
                <span className="text-3xl font-bold my-5">Admin Panel</span>
                {/* <a href="/admin/products">products</a> */}
                <Link className="flex flex-row h-[30px] w-full  p-[25px] items-center text-2xl gap-[25px] text-blue-800" to="/admin/products"><FaBoxArchive />Products</Link>
                <Link className="flex flex-row h-[30px] w-full  p-[25px] items-center text-2xl gap-[25px] text-blue-800" to="/admin/orders"><MdShoppingBag />Orders</Link>
                <Link className="flex flex-row h-[30px] w-full  p-[25px] items-center text-2xl gap-[25px] text-blue-800" to="/admin/users"><FaUsers />Users</Link>
                <Link className="flex flex-row h-[30px] w-full  p-[25px] items-center text-2xl gap-[25px] text-blue-800" to="/admin/settings"><IoSettingsSharp />Settings</Link>
            </div>
             <div className="w-[calc(100%-300px)]  h-full">
                <Routes path="/*" >
                       <Route path="/" element={<h1>Dashboard</h1>}/>
                       <Route path="/products" element={<ProductAdminPage />}/>
                        <Route path="/newProduct" element={<AddProductAdminPage />}/>
                        <Route path="/updateProduct" element={<UpdateProductAdminPage />}/>
                       <Route path="/orders" element={<h1>Orders</h1>}/>
                </Routes>
             </div>
        </div>
       
    )
}