import { useRouter } from 'next/router'
import { useCart } from '../context/CartContext'
import Image from 'next/image'
import styles from './Navbar.module.css'

export default function Navbar() {
  const router = useRouter()
  const { cart } = useCart()

  const totalItems = Object.values(cart).reduce(
    (acc, item) => acc + item.quantity,
    0
  )

  return (
    <>
      {/* TOP NAVBAR */}
      <div className={styles.topNavbar}>
        {/* LOGO */}
        <div
          className={styles.logo}
          onClick={() => router.push('/')}
        >
          <Image
            src="/final logo.png"
            alt="Brand Logo"
            width={100}
            height={100}
            priority
          />
        </div>

        {/* SEARCH BAR */}
        <div className={styles.searchBox}>
          <select>
            <option>All Categories</option>
            <option>Rice</option>
            <option>Spices</option>
          </select>

          <input placeholder="Search for products..." />
          <button>Search</button>
        </div>

        {/* RIGHT ICONS */}
        <div className={styles.icons}>
          <span>Login</span>
          <span>❤️</span>

          <div
            className={styles.cart}
            onClick={() => router.push('/cart')}
          >
            🛒
            {totalItems > 0 && (
              <span className={styles.badge}>
                {totalItems}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* CATEGORY BAR */}
      <div className={styles.categoryBar}>
        ☰ Browse All Categories
        <span>Home</span>
        <span>Best Sellers</span>
        <span>New Arrival</span>
      </div>
    </>
  )
}
