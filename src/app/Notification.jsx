import React from 'react';
import {toast } from 'react-toastify';

const Notification = ({notice,type}) => {
  return (
    <>
    {type === "success" ?
    toast.success({notice}, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    }) 
    :
    toast.error({notice}, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
  }
    </>
  )
}

export default Notification;