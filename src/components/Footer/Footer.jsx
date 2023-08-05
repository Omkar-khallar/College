
// import React from 'react'
import styles from "./Footer.module.css"
import Link from 'next/link'
import linkedin from "../../../public/images/linkedin.png"
import instagram from "../../../public/images/instagram.png"
import facebook from "../../../public/images/facebook.png"
import Image from 'next/image'


const Footer = () => {
  return (
    <footer className={styles.outer}>
        <div className={`${styles.footer} grid grid-three`}>
            <div className={styles.left}>
                <p className={styles.copyright}>Copyright © 2023 - All rights reserved.</p>
            </div>
            <div className={styles.mid}>
                <p className={styles.credit}> Made By <Link href="https://www.linkedin.com/in/omkar-khallar-a400aa215/?originalSubdomain=in" className={styles.name}>Omkar</Link></p>
            </div>
            <div className={styles.right}>
                <Link href="" className={styles.link}><Image className={styles.Logo} src={linkedin} alt="LinkedIn"/></Link>
                <Link href="" className={styles.link}><Image className={styles.Logo} src={instagram} alt="Instagram"/></Link>
                <Link href="" className={styles.link}><Image className={styles.Logo} src={facebook} alt="Facebook"/></Link>
            </div>
        </div>
    </footer>
  )
}

export default Footer