import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState({})

  // Load cart from localStorage (browser only)
  useEffect(() => {
    const stored = localStorage.getItem('cart')
    if (stored) setCart(JSON.parse(stored))
  }, [])

  // Save cart whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev[product.id] || { ...product, quantity: 0 }
      return {
        ...prev,
        [product.id]: { ...existing, quantity: existing.quantity + 1 }
      }
    })
  }
  const clearCart = () => {
  setCart({})
}


  const removeFromCart = (id) => {
  setCart(prev => {
    const updated = { ...prev }
    delete updated[id]
    return updated
  })
}


  const increment = (id) => {
    setCart(prev => ({
      ...prev,
      [id]: { ...prev[id], quantity: prev[id].quantity + 1 }
    }))
  }

  const decrement = (id) => {
  setCart(prev => ({
    ...prev,
    [id]: {
      ...prev[id],
      quantity: Math.max(1, prev[id].quantity - 1)
    }
  }))
}


  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      increment,
      decrement,
      removeFromCart,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
