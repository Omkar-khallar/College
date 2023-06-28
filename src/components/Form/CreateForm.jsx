import React from "react";
import styles from "./form.module.css";
import Buttons from "../Button/Buttons";

const Form = ({handleSubmit,setcreate,setnotice,notice}) => {
  return (
    <>
      <div className={styles.editcontainer}>
        <form onSubmit={handleSubmit} action="" className={styles.form}>
          <div className={styles.inputcontainer}>
            <div className={styles.uppercontainer}>
            <label htmlFor="" className={styles.label}>Write Notice</label>
            <div onClick={()=>setcreate(false)} className={styles.crossbutton}>X</div>
            </div>
            <textarea name="notice" value={notice} onChange={(e)=>setnotice(e.target.value)}  cols="30" rows="20" className={styles.textarea}></textarea>
            <div className={styles.buttoncontainer}>
                <input className={styles.button} type="submit" value="UPLOAD" />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
