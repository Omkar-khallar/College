"use client"
import React from 'react'
import Button from '@mui/material/Button';

const Buttons = ({text,url}) => {
  return (
    <Button variant="contained"  href={url}>
        {text}
      </Button>
  )
}

export default Buttons;