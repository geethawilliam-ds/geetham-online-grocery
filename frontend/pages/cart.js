import { useRouter } from 'next/router'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const router = useRouter()
  const { cart, increment, decrement, removeFromCart, clearCart   } = useCart()
  const handleCheckout = async () => {
  const res = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cart)
  })

  const data = await res.json()

  if (data.url) {
    window.location.href = data.url // Redirect to Stripe Checkout
  } else {
    alert('Failed to initiate checkout')
  }
}


  const items = Object.values(cart)

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity, 0
  ).toFixed(2)

  return (
    <div style={{ padding: '20px', backgroundColor: '#F5F5F5', minHeight: '100vh' }}>
      <h2>My Cart</h2>

      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {items.map(item => (
            <div key={item.id} style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '12px',
              background: '#fff',
              padding: '10px',
              borderRadius: '8px'
            }}>
              <img src={item.image} alt={item.name} style={{ width: '80px', marginRight: '12px' }} />
              <div style={{ flex: 1 }}>
                <h4>{item.name}</h4>
                <p>${item.price} × {item.quantity}</p>
              </div>
              <div>
                <button onClick={() => decrement(item.id)} style={{ marginRight: '5px' }}>−</button>
                <button onClick={() => increment(item.id)}>+</button>
                <button onClick={() => removeFromCart(item.id)} style={{
                    marginLeft: '8px',
                    padding: '2px 6px',
                    backgroundColor: '#f44336',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                }}>Remove</button>
              </div>

            </div>
          ))}

          <h3>Total: ${totalPrice}</h3>
          {items.length > 0 && (
  <button onClick={handleCheckout} style={{
    marginTop: '20px',
    padding: '10px 16px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold'
  }}>
    Checkout
  </button>
)}




        </>
      )}

      <button onClick={() => router.push('/')} style={{
        marginTop: '20px',
        padding: '8px 12px',
        backgroundColor: '#4CAF50',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold'
      }}>
        Back to Products
      </button>
    </div>
  )
}
