// import { useState } from "react";



// export default function TestPage(){
//     // let count =0;
//     const [count ,setCount]=useState(0)

//     function increment(){
//         setCount(count +1);
//     }
//     function decrement(){
//         setCount(count -1);
//     }
//     return(
//         <div className="w-full h-screen  bg-amber-300 flex justify-center items-center">
//             <div className="w-[400px] h-[400px] bg-white rounded-lg shadow-lg p-6 flex-col justify-center items-center">
//             <h1 className="text-4xl font-bold text-gray-800">
//           {count}
//         </h1>
//          <div className="w-full justify-center h-[100px]">
//           <button
//             onClick={decrement}
//             className="w-[100px] px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
//           >-</button>
//           <button
//             onClick={increment}
//             className="w-[100px] px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
//           >+</button>
//           </div>
//             </div>
//         </div>
         
       
//     )
// }


// project url
// https://oyhmssmiiddjxwdeeoip.supabase.co

// API key
// sb_publishable_R7KMPMmw9UwItMSzpMS9Gg_9RhUKUqK
import { useState } from "react";
import toast from "react-hot-toast";
import MediaUpload from "../utils/mediaUpload";

export default function TestPage() {
  const [file, setFile] = useState(null);

  async function handleUpload() {
    try {
      const url = await MediaUpload(file);
      console.log("Uploaded file URL:", url);
      toast.success("File uploaded successfully!");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  }
  return(
    <div className="w-full h-screen flex justify-center items-center">
       <input type="file"
        // accept="image/*" 
        onChange={
          (e)=>{
            console.log(e)
            setFile(e.target.files[0])
          }
        }/>
        <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer">Upload</button>
    </div>
  )
}