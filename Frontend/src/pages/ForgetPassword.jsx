import React from 'react'
import OTP from '../components/OTP'

const ForgetPassword = () => {
  return (
    <div className='flex justify-center items-center h-screen md:p-0 p-2'>
        <div className='text-white '>
            <p>Please check your mail for the password reset OTP sent on your registered mail.</p>
            <OTP />
        </div>
    </div>
  )
}

export default ForgetPassword