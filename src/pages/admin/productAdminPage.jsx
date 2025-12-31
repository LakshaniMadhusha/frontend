import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiPlus, BiTrash } from "react-icons/bi";
import { Link , useNavigate } from "react-router-dom";

const sampleProducts=[
    {
    productId: "COS001",
    name: "Rose Glow Face Cream",
    altNames: ["Rose Cream", "Glow Moisturizer"],
    labelledPrice: 3500,
    price: 2990,
    images: [
      "/images/rose-glow-cream-1.jpg",
      "/images/rose-glow-cream-2.jpg"
    ],
    description: "A lightweight rose-infused face cream that hydrates and enhances natural glow.",
    stock: 120,
    isAvailable: true,
    category: "cosmetics"
  },
  {
    productId: "COS002",
    name: "Vitamin C Brightening Serum",
    altNames: ["Vit C Serum", "Bright Serum"],
    labelledPrice: 4200,
    price: 3790,
    images: [
      "/images/vitamin-c-serum-1.jpg"
    ],
    description: "Powerful vitamin C serum that reduces dark spots and brightens skin tone.",
    stock: 85,
    isAvailable: true,
    category: "cosmetics"
  },
  {
    productId: "COS003",
    name: "Matte Finish Lipstick - Nude Pink",
    altNames: ["Nude Pink Lipstick"],
    labelledPrice: 1800,
    price: 1490,
    images: [
      "/images/nude-pink-lipstick.jpg"
    ],
    description: "Long-lasting matte lipstick with a smooth, non-drying formula.",
    stock: 200,
    isAvailable: true,
    category: "cosmetics"
  },
  {
    productId: "COS004",
    name: "Aloe Vera Facial Cleanser",
    altNames: ["Aloe Cleanser", "Face Wash Aloe"],
    labelledPrice: 2500,
    price: 2190,
    images: [
      "/images/aloe-cleanser.jpg"
    ],
    description: "Gentle facial cleanser enriched with aloe vera for soothing and hydration.",
    stock: 150,
    isAvailable: true,
    category: "cosmetics"
  },
  {
    productId: "COS005",
    name: "Waterproof Mascara",
    altNames: ["Long Lash Mascara"],
    labelledPrice: 2200,
    price: 1890,
    images: [
      "/images/waterproof-mascara.jpg"
    ],
    description: "Smudge-proof and waterproof mascara for longer, fuller lashes.",
    stock: 95,
    isAvailable: true,
    category: "cosmetics"
  },
  {
    productId: "COS006",
    name: "Herbal Face Mask - Turmeric & Honey",
    altNames: ["Turmeric Mask", "Herbal Mask"],
    labelledPrice: 3000,
    price: 2590,
    images: [
      "/images/turmeric-honey-mask.jpg"
    ],
    description: "Natural herbal face mask that nourishes skin and restores brightness.",
    stock: 70,
    isAvailable: true,
    category: "cosmetics"
  }
]

export default function ProductAdminPage() {

    const [products, setProducts]=useState(sampleProducts);

    // const [a,setA]=useState(0);
    
    // backend data retrieval will be here
    // setProducts()

    useEffect(
        ()=>{
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products")
                .then(
                    (res)=>{
                    setProducts(res.data)
                }
            )
        },
        [a]
    )

   const navigate=useNavigate();

  return (
    <div className="w-full h-full border-[3px]">
      <table>
        <thead>
          <tr>
            <td className="p-[10px]">Image</td>
            <td className="p-[10px]">Product ID</td>
            <td className="p-[10px]">Name</td>
            <td className="p-[10px]">Price</td>
            <td className="p-[10px]">labelled Price</td>
            <td className="p-[10px]">Category</td>
            <td className="p-[10px]">Stock</td>
            <td className="p-[10px]">Action</td>
          </tr>
        </thead>

        <tbody>
          {
          products.map((product,index) =>{
            return(
                <tr key={index} >
                  <td>
                    <img src={product.images[0]} alt={product.name} className="w-[50px] h-[50px] " />
                    </td>
                  <td className="p-[10px]">{product.productId}</td>
                  <td className="p-[10px]">{product.name}</td>
                  <td className="p-[10px]">{product.price}</td>
                  <td className="p-[10px]">{product.labelledPrice}</td>
                  <td className="p-[10px]">{product.category}</td>
                  <td className="p-[10px]">{product.stock}</td>
                  <td className="p-[10px]">
                    <BiTrash className="text-red-600 text-3xl p-[7px] rounded-full cursor-pointer hover:bg-red-300" onClick={
                        ()=>{
                            const token=localStorage.getItem("token");
                            if(token==null){
                                navigate("/login");
                                return;
                            }
                            axios.delete(import.meta.env.VITE_BACKEND_URL+"/api/products/"+product._id,
                               {
                                 headers:{
                                    Authorization: `Bearer ${token}`
                                }
                            }
                        ).then(
                                (res)=>{
                                    console.log("Product deleted Successfully");
                                    console.log(res.data);
                                    toast.success("Product deleted Successfully");

                                    // setA(a+1);

                                    setProducts((prev) =>
                                    prev.filter((p) => p._id !== product._id)
                                    );

                                }
                            ).catch(
                                (error)=>{
                                    console.log("Error deleting product:",error);
                                    toast.error("Failed to delete product");
                                }
                            )
                        }
                    }/>

                  </td>
                </tr>
            )
          }
          )
        }
        </tbody>
      </table>

      <Link
        to={"/admin/newProduct"}
        className="fixed right-[60px] bottom-[60px] p-[20px] text-white bg-black rounded-full shadow-2xl"
      >
        <BiPlus className="text-3xl" />
      </Link>
    </div>
  );
}
