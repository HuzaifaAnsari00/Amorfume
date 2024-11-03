import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';

interface Product {
    _id: string;
    name: string;
    price: number;
    volume: number;
    description: string;
    image1: string;
    image2: string;
    image3: string;
    category: 'adult' | 'kids' | 'teens';
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const url = import.meta.env.VITE_BACKEND_URL; // Use process.env in CRA


  useEffect(() => {
    fetch(`${url}/view-products`)
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <section className="container mx-auto p-10 md:py-12 px-0 md:p-8 md:px-0">
      <section className="p-5 md:p-0 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 items-start">
        {products.map((product) => (
          <section key={product._id} className="p-5 py-10 bg-purple-50 text-center transform duration-500 hover:-translate-y-2 cursor-pointer">
            <Link to={`/store/productview/${product._id}`}>
              <img src={product.image1} alt={product.name} />
              <h1 className="text-3xl my-5">{product.name}</h1>
              <p className="mb-5">{product.description}</p>
              <h2 className="font-semibold mb-5">${product.price}</h2>
            </Link>
            <button className="p-2 px-6 bg-purple-500 text-white rounded-md hover:bg-purple-600" onClick={() => addToCart(product)}>Add To Cart</button>
          </section>
        ))}
      </section>
    </section>
  );
}

export default Products;