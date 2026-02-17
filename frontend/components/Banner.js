import Image from 'next/image'
import styles from './Banner.module.css'

export default function Banner() {
  return (
    <div className={styles.banner}>
      <Image
        src="/geetham banner new.png"
        alt="Promotional Banner"
        fill
        priority
        className={styles.bannerImg}
      />
    </div>
  )
}
