import React from "react";
import styles from "./form.module.css";

const Form = ({setedit,setEditNotice,editNotice,handleEditSubmit}) => {
  return (
    <>
      <div className={styles.editcontainer}>
        <form onSubmit={handleEditSubmit} action="" className={styles.form}>
          <div className={styles.inputcontainer}>
            <div className={styles.uppercontainer}>
            <label htmlFor="" className={styles.label}>Write Notice</label>
            <div onClick={()=>setedit(false)} className={styles.crossbutton}>X</div>
            </div>
            <textarea name="notice" value={editNotice}  onChange={(e)=>setEditNotice(e.target.value)} cols="30" rows="20" className={styles.textarea}></textarea>
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
