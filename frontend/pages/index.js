import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Banner from '../components/Banner'
import ProductCard from '../components/ProductCard'
import { useCart } from '../context/CartContext'

export default function Home() {
  const [products, setProducts] = useState([])
  const router = useRouter()
  const { cart, addToCart } = useCart()

  // Fetch aggregated products
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err))
  }, [])

  const totalItems = Object.values(cart).reduce(
    (acc, item) => acc + item.quantity, 0
  )

  // Popular collections
  const collections = [
    { name: 'Vegetables', image: '/images/vegetables.jpg' },
    { name: 'Oil', image: '/images/oil.jpg' },
    { name: 'Ponni Boiled Rice', image: '/images/Ponni Boiled Rice.jpg' },
    { name: 'Atta', image: '/images/Atta.jpg' },
    { name: 'Toor Dal', image: '/images/Toor dal.jpg' },
    { name: 'Moong Dal', image: '/images/Moong dal.jpg' },
    { name: 'Rava', image: '/images/Rava.jpg' },
    { name: 'Ponni Raw Rice', image: '/images/Ponni Raw Rice.jpg' },
    { name: 'Noodles', image: '/images/Noodles.jpg' },
    { name: 'Ghee', image: '/images/Ghee.jpg' },
    { name: 'Whole Spices', image: '/images/Whole Spices.jpg' },
    { name: 'Basmati Rice', image: '/images/Basmati Rice.jpg' },
    { name: 'Tamarind', image: '/images/Tamarind.jpg' },
    { name: 'Idli Rice', image: '/images/idly rice.jpg' },
    { name: 'Spice Powders', image: '/images/Spice powders.jpg' },
    { name: 'Pickles', image: '/images/Pickles.jpg' },
    // add more collections here
  ]

  // Unique categories (for product filtering if needed)
  const categories = ['All', ...new Set(products.map(p => p.category))]

  // Filter products based on category, search (optional)
  const filteredProducts = products.filter(product => {
    const matchesCategory = true // show all products; we are not using old tabs now
    const matchesSearch = true // no search input now
    return matchesCategory && matchesSearch
  })

  return (
    <>
      {/* BANNER */}
      <Banner />
      {/* COLLECTIONS HEADING */}
      <h2 style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>
        Handpicked Indian Essentials
      </h2>
      {/* COLLECTIONS GRID */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '20px',
        padding: '20px',
        backgroundColor: '#F5F5F5'
      }}>
        {collections.map(col => (
          <div 
            key={col.name} 
            style={{ textAlign: 'center', cursor: 'pointer' }}
            onClick={() => router.push(`/category/${col.name.toLowerCase().replace(/\s+/g, '_')}`)}
          >
            <img 
              src={col.image} 
              alt={col.name} 
              style={{
                width: '100%',
                height: '120px',
                objectFit: 'cover',
                borderRadius: '8px'
              }} 
            />
            <h4 style={{ marginTop: '8px' }}>{col.name}</h4>
          </div>
        ))}
      </div>

      {/* PRODUCTS GRID */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px',
        padding: '20px',
        backgroundColor: '#F5F5F5'
      }}>
        {filteredProducts.map(product => (
          <ProductCard
            key={product.name}          
            product={product}           
            onAdd={(variant) => addToCart({
              id: product.name + "_" + variant.brand + "_" + variant.qty, 
              name: product.name,
              brand: variant.brand,
              qty: variant.qty,
              price: variant.price,
              image: product.image,
              quantity: 1
            })}
          />
        ))}
      </div>
    </>
  )
}
