import React from "react";
import styles from "./Contact.module.css";

const Contact = () => {
  return (
    <div className={styles.outer}>
      <h3 className={styles.heading}>Contact Us</h3>
      <div className={`${styles.inner} grid grid-two`}>
          <div className={styles.info}>
            <h4 className={styles.infoHeading}>Get in Touch</h4>
            <p className={styles.email}>Email: omkar@gmail.com</p>
            <p className={styles.email}>Phone no: 9909909909</p>
            <p className={styles.email}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. At cupiditate quod repellendus odio facilis, sint reiciendis dolor vel veritatis natus.</p>
        </div>
        <div className={styles.contact}>
          <form action="" className={styles.form}>
            <div className={styles.contactInfo}>
              <input className={styles.input} type="text" placeholder="Name*" name="" id="" />
              <input className={styles.input} type="text" placeholder="Email*" name="" id="" />
            </div>
            <textarea
              name=""
              id=""
              className={styles.textarea}
              placeholder="Message*"
              cols="30"
              rows="10"
            ></textarea>
            <div className={styles.buttonContainer}>
              <input className="button" type="submit" value="Send" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
