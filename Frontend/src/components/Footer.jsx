import React from 'react'
import { House, User } from 'lucide-react';

const Footer = () => {
  return (
    <div className='absolute bottom-10  rounded-full h-[6vh] w-96 bg-blue-500  flex justify-around gap-5 items-center p-2'>
        <div className=' w-1/2 rounded-full  flex justify-center'><House /></div>
        <div className=' w-1/2 rounded-full  flex justify-center'><User /></div>
    </div>
  )
}

export default Footer