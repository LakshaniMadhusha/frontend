import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiEdit, BiPlus, BiTrash } from "react-icons/bi";
import { Link , useNavigate } from "react-router-dom";
import Loader from "../../components/loader";



export default function ProductAdminPage() {

    const [products, setProducts]=useState([]);

      //delete
    const [isLoading,setIsLoading]=useState(true);
   
    // backend data retrieval will be here
    // setProducts()

    useEffect(
        ()=>{
          if(isLoading){
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products")
                .then(
                    (res)=>{
                    setProducts(res.data)
                    setIsLoading(false);
                }
            )
          }
        },
      [isLoading]    //delete
    )

   const navigate=useNavigate();

  return (
    <div className="w-full h-full border-[3px]">
      
      {isLoading ?(
        <Loader />
       ) :
       (

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
                  <td className="p-[10px] flex flex-row justify-center items-center ">
                    <BiTrash className="text-red-600 text-3xl p-[7px] rounded-full cursor-pointer hover:bg-red-300" onClick={
                        ()=>{
                            const token=localStorage.getItem("token");
                            if(token==null){
                                navigate("/login");
                                return;
                            }
                            axios.delete(import.meta.env.VITE_BACKEND_URL + "/api/products/" + product.productId,
                               {
                                 headers:{
                                    Authorization: `Bearer ${token}` ,
                                },
                            }
                        )
                        .then(
                                (res)=>{
                                    console.log("Product deleted Successfully");
                                    console.log(res.data);
                                    toast.success("Product deleted Successfully");

                                   //delete
                                    setIsLoading(!isLoading);
                                    const updatedProducts = products.filter((p) => p.productId !== product.productId);
    setProducts(updatedProducts);

                                    

                                }
                            ).catch(
                                (error)=>{
                                    console.error("Error deleting product:",error);
                                    toast.error("Failed to delete product");
                                }
                            )
                        }
                    }/>
                    <BiEdit onClick={
                      ()=>{
                          navigate("/admin/updateProduct" ,
                            {
                              state: product 
                            }
                          )
                      }
                    } className="text-blue-900 text-3xl p-[7px] rounded-full cursor-pointer hover:bg-blue-300" />

                  </td>
                </tr>
            )
          }
          )
        }
        </tbody>
      </table>
       )}
      <Link
        to={"/admin/newProduct"}
        className="fixed right-[60px] bottom-[60px] p-[20px] text-white bg-black rounded-full shadow-2xl"
      >
        <BiPlus className="text-3xl" />
      </Link>
    </div>
  );
}
