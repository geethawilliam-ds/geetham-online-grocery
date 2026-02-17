import '../styles/globals.css'
import { CartProvider } from '../context/CartContext'
import Navbar from '../components/Navbar'

export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <Navbar title="Geetham" />
      <Component {...pageProps} />
    </CartProvider>
  )
}
