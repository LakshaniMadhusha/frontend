
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MediaUpload from "../../utils/mediaUpload";

export default function UpdateProductAdminPage() {
    
    const location = useLocation();
    const [productId, setProductId] = useState(location.state.productId);
    const [productName, setProductName] = useState(location.state.name);
    const [altNames, setAlternativeNames] = useState(location.state.altNames.join(','));
    const [labelledPrice, setLabeledPrice] = useState(location.state.labelledPrice);
    const [price, setPrice] = useState(location.state.price);
    const [images, setImages] = useState([]);
    const [description, setDescription] = useState(location.state.description);
    const [stock, setStock] = useState(location.state.stock);
    const [isAvailable, setIsAvailable] = useState(location.state.isAvailable);
    const [category, setCategory] = useState(location.state.category);
    const navigate = useNavigate(); 
    

    

    async function handleSubmit(){

      const promisesArray = [];

      for (let i = 0; i < images.length; i++) {
        const promise= MediaUpload(images[i]);
        promisesArray[i]=promise;
      }

      const responses = await Promise.all(promisesArray);
      console.log(responses)

      
        const altNamesInArray = altNames.split(',');
        const productData={
            productId:productId,
            name:productName,
            altNames:altNamesInArray,
            labelledPrice:labelledPrice,
            price:price,
            images:responses,
            description:description,
            stock:stock,
            isAvailable:isAvailable,
            category:category
        }

        if(responses.length===0){
            productData.images=location.state.images;
        }

        const token = localStorage.getItem("token");
        if(token==null){
            window.location.href="/login";
            return;
        }
        axios.put(import.meta.env.VITE_BACKEND_URL+"/api/products/"+productId,productData,{
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
              disabled
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
            multiple
              type="file" onChange={(e)=>{
                setImages(e.target.files);
              }}
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
            Update Product
          </button>
        </div>
      </div>
    </div>
  );
}
