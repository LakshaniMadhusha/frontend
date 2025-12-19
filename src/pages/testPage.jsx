import { useState } from "react";

export default function TestPage(){
    // let count =0;
    const [count ,setCount]=useState(0)

    function increment(){
        setCount(count +1);
    }
    function decrement(){
        setCount(count -1);
    }
    return(
        <div className="w-full h-screen  bg-amber-300 flex justify-center items-center">
            <div className="w-[400px] h-[400px] bg-white rounded-lg shadow-lg p-6 flex-col justify-center items-center">
            <h1 className="text-4xl font-bold text-gray-800">
          {count}
        </h1>
         <div className="w-full justify-center h-[100px]">
          <button
            onClick={decrement}
            className="w-[100px] px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >-</button>
          <button
            onClick={increment}
            className="w-[100px] px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >+</button>
          </div>
            </div>
        </div>
         
       
    )
}