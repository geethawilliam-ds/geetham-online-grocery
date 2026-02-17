import { useEffect } from 'react'
import { useCart } from '../context/CartContext'

export default function Success() {
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart() // clear cart when this page loads
  }, [clearCart])

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>Payment Successful! 🎉</h1>
      <p>Thank you for your order. Your groceries will be delivered soon.</p>
      <button
        onClick={() => window.location.href = '/'}
        style={{
          marginTop: '20px',
          padding: '10px 16px',
          backgroundColor: '#4CAF50',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Back to Products
      </button>
    </div>
  )
}
