
import './App.css'
import ProductCard from './components/productCard'

function App() {
  

  return (
    <>
      

    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <ProductCard
          name="Apple Laptop"
          image="https://picsum.photos/id/237/300/300"
          price="550"
        />

        <ProductCard
          name="Apple"
          image="https://picsum.photos/id/238/300/300"
          price="550"
        />

      </div>
    </div>



        
    </>
  )
}

export default App
