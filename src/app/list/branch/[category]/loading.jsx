import { CircularProgress } from '@/app/loadingCircle';
import React from 'react'

const loading = () => {
  return (
    <div className="center">
        <CircularProgress/>
    </div>
  )
}

export default loading