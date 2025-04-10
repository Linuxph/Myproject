import React, { useRef, useState } from 'react';

const OTP = () => {
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(new Array(4).fill(''));

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d$/.test(value)) {  // only 1 digit
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to next input
      if (index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    } else if (value === "") {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '') {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  return (
    <div className="flex gap-2 ">
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          className="outline-none border-2 border-black w-[50px] h-[50px] rounded-2xl text-black text-center text-2xl"
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => (inputRefs.current[index] = el)}
        />
      ))}
      <input type="submit" value="Submit" className='border-2 font-semidbold text-xl rounded-2xl p-1 hover:bg-blue-500 hover:text-black'/>
    </div>
  );
};

export default OTP;
