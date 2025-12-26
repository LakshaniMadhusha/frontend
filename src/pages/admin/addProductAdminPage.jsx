// import { Link } from "react-router-dom";

// export default function AddProductAdminPage(){
//     return(
//         <div className="w-full h-full flex items-center justify-center">
//            <div className="w-[600px] h-[600px] border-[3px] rounded-[15px] flex flex-wrap justify-center justify-between p-[50px]">
//             <div className="w-[200px] flex flex-col gap-[5px]">
//                 <label className="text-sm font-semibold">Product ID</label>
//                 <input type="text" className="w-full border-[1px] h-[40px] rounded-md"/>
//             </div>

//             <div className="w-[300px] flex flex-col gap-[5px]">
//                 <label className="text-sm font-semibold">Product Name</label>
//                 <input type="text" className="w-full border-[1px] h-[40px] rounded-md"/>
//             </div>

//             <div className="w-[500px] flex flex-col gap-[5px]">
//                 <label className="text-sm font-semibold">Alternative Names</label>
//                 <input type="text" className="w-full border-[1px] h-[40px] rounded-md"/>
//             </div>
           
//             <div className="w-[200px] flex flex-col gap-[5px]">
//                 <label className="text-sm font-semibold">Labeled Price</label>
//                 <input type="text" className="w-full border-[1px] h-[40px] rounded-md"/>
//             </div>

//             <div className="w-[200px] flex flex-col gap-[5px]">
//                 <label className="text-sm font-semibold">Price</label>
//                 <input type="text" className="w-full border-[1px] h-[40px] rounded-md"/>
//             </div>
            
//             <div className="w-[500px] flex flex-col gap-[5px]">
//                 <label className="text-sm font-semibold">Images</label>
//                 <input type="text" className="w-full border-[1px] h-[40px] rounded-md"/>
//             </div>

//             <div className="w-[500px] flex flex-col gap-[5px]">
//                 <label className="text-sm font-semibold">Description</label>
//                 <textarea type="text" className="w-full border-[1px] h-[40px] rounded-md"/>
//             </div>

//             <div className="w-[200px] flex flex-col gap-[5px]">
//                 <label className="text-sm font-semibold">Stock</label>
//                 <input type="text" className="w-full border-[1px] h-[40px] rounded-md"/>
//             </div>
            
//             <div className="w-[200px] flex flex-col gap-[5px]">
//                 <label className="text-sm font-semibold">is Available</label>
//                 <select>
//                     <option value="{true}">Availale</option>
//                     <option value="{false}">Not Available</option>
//                 </select>
//             </div>

//             <div className="w-[200px] flex flex-col gap-[5px]">
//                 <label className="text-sm font-semibold">Category</label>
//                 <select>
//                     <option value="cream">Cream</option>
//                     <option value="oil">Oil</option>
//                     <option value="serum">Serum</option>
//                     <option value="cleanser">Cleanser</option>
//                     <option value="toner">Toner</option>
//                     <option value="mask">Mask</option>
//                 </select>
//             </div>
            
//             <div className="w-full flex justify-center flex-row py-[20px]">
//                 <Link to={"/admin/products"} className="w-[200px] h-[50px] bg-white px-4 py-2 rounded-md flex justify-center items-center">Cancel</Link>
//                 <button className="w-[200px] h-[50px] bg-black text-white border-[2px] rounded-md flex">Add Product</button>
//                 </div>
//             </div> 
//         </div>
//     )
// }

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function AddProductAdminPage() {

    const [productId, setProductId] = useState("");
    const [productName, setProductName] = useState("");
    const [altNames, setAlternativeNames] = useState("");
    const [labelledPrice, setLabeledPrice] = useState("");
    const [price, setPrice] = useState("");
    const [images, setImages] = useState("");
    const [description, setDescription] = useState("");
    const [stock, setStock] = useState("");
    const [isAvailable, setIsAvailable] = useState(true);
    const [category, setCategory] = useState("Cream");
    const navigate = useNavigate(); 

    function handleSubmit(){
        const altNamesInArray = altNames.split(',');;
        const productData={
            productId:productId,
            name:productName,
            altNames:altNamesInArray,
            labelledPrice:labelledPrice,
            price:price,
            images:[],
            description:description,
            stock:stock,
            isAvailable:isAvailable,
            category:category
        }
        const token = localStorage.getItem("token");
        if(token==null){
            window.location.href="/login";
            return;
        }
        axios.post(import.meta.env.VITE_BACKEND_URL+"/api/products",productData,{
            headers:{
                "Authorization":"Bearer "+token
            }
        }).then(
            (res)=>{
                console.log("Product added successfully");
                console.log(res.data);
                toast.success("Product added successfully");
                navigate("/admin/products");
            }
        ).catch(
            (error)=>{
                console.log("Error adding product",error);
                toast.error("Failed to add product");
            }
        )
        console.log(productData)
    }
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-[#C89A78] rounded-2xl shadow-xl p-8">
        
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add New Product
        </h2>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Product ID */}
          <div>
            <label className="text-sm font-semibold text-gray-600">Product ID</label>
            <input
              type="text" value={productId} onChange={(e)=>{setProductId(e.target.value)}}
              placeholder="e.g. CRM-001"
              className="mt-1 w-full h-11 rounded-lg border border-gray-300 px-3 focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>

          {/* Product Name */}
          <div>
            <label className="text-sm font-semibold text-gray-600">Product Name</label>
            <input
              type="text" value={productName} onChange={(e)=>{setProductName(e.target.value)}}
              className="mt-1 w-full h-11 rounded-lg border border-gray-300 px-3 focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>

          {/* Alternative Names */}
          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-gray-600">Alternative Names</label>
            <input value={altNames} onChange={(e)=>{setAlternativeNames(e.target.value)}}
            placeholder="Night Cream, Moisturizer, Skin Repair"
              type="text"
              className="mt-1 w-full h-11 rounded-lg border border-gray-300 px-3 focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>

          {/* Labeled Price */}
          <div>
            <label className="text-sm font-semibold text-gray-600">Labeled Price</label>
            <input
              type="number" value={labelledPrice} onChange={(e)=>{setLabeledPrice(e.target.value)}}
              className="mt-1 w-full h-11 rounded-lg border border-gray-300 px-3 focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>

          {/* Price */}
          <div>
            <label className="text-sm font-semibold text-gray-600">Price</label>
            <input
              type="number" value={price} onChange={(e)=>{setPrice(e.target.value)}}
              className="mt-1 w-full h-11 rounded-lg border border-gray-300 px-3 focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>

          {/* Images */}
          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-gray-600">Images (URL)</label>
            <input
              type="text" value={images} onChange={(e)=>{setImages(e.target.value)}}
              placeholder="https://example.com/image.jpg"
              className="mt-1 w-full h-11 rounded-lg border border-gray-300 px-3 focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-gray-600">Description</label>
            <textarea
              rows="4" value={description} onChange={(e)=>{setDescription(e.target.value)}}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
            ></textarea>
          </div>

          {/* Stock */}
          <div>
            <label className="text-sm font-semibold text-gray-600">Stock</label>
            <input
              type="number" value={stock} onChange={(e)=>{setStock(e.target.value)}}
              className="mt-1 w-full h-11 rounded-lg border border-gray-300 px-3 focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>

          {/* Availability */}
          <div>
            <label className="text-sm font-semibold text-gray-600">Availability</label>
            <select value={isAvailable} onChange={(e)=>{setIsAvailable(e.target.value=="true")}}

              className="mt-1 w-full h-11 rounded-lg border border-gray-300 px-3 focus:ring-2 focus:ring-black focus:outline-none"
            >
              <option value="true">Available</option>
              <option value="false">Not Available</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="text-sm font-semibold text-gray-600">Category</label>
            <select value={category} onChange={(e)=>{setCategory(e.target.value)}}
              className="mt-1 w-full h-11 rounded-lg border border-gray-300 px-3 focus:ring-2 focus:ring-black focus:outline-none"
            >
              <option>Cream</option>
              <option>Oil</option>
              <option>Serum</option>
              <option>Cleanser</option>
              <option>Toner</option>
              <option>Mask</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <Link 
            to="/admin/products"
            className="w-40 h-11 flex items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-100 transition"
          >
            Cancel
          </Link>

          <button onClick={handleSubmit} className="w-40 h-11 bg-black text-white rounded-lg hover:bg-gray-800 transition">
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}
