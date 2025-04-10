import React from 'react'
import {EllipsisVertical, ChevronLeft  } from 'lucide-react';



const Mobile_nav = () => {
  return (
    <div className='flex justify-between text-white w-full p-5 z-[99]' >
      <div className="Back-icon"
      onClick={() => window.history.back()} 
      style={{backgroundImage:'url()'}}><ChevronLeft  /></div>
      <div className="More "><EllipsisVertical  /></div>
    </div>
  )
}

export default Mobile_nav;