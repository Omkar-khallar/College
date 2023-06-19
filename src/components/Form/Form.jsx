import React from "react";
import styles from "./form.module.css";
import Buttons from "../Button/Buttons";

const Form = ({setedit}) => {
  return (
    <>
      <div className={styles.editcontainer}>
        <form action="" className={styles.form}>
          <div className={styles.inputcontainer}>
            <div className={styles.uppercontainer}>

            <label htmlFor="" className={styles.label}>Write Notice</label>
            <div onClick={()=>setedit(false)} className={styles.crossbutton}>X</div>
            </div>
            <textarea name="notice"  cols="30" rows="20" className={styles.textarea}></textarea>
            <div className={styles.buttoncontainer}>
                <input className={styles.button} type="submit" value="SEND" />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
