"use client";
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import styles from "./MenuIcon.module.css";

const ButtonIcon = () => {
  return (
    <IconButton>
      <MenuRoundedIcon className={styles.icon} />
    </IconButton>
  );
};

export default ButtonIcon;
