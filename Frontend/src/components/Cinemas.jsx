import React from "react";
import { motion } from "framer-motion";

const Latest = () => {
  return (
    <motion.div
      className=" h-screen"
      initial={{
        opacity: 0,
        filter: "blur(5px)",
        transition: { ease: "easeIn", duration: 0.8 },
      }}
      animate={{
        opacity: 1,
        filter: "blur(0px)",
        transition: { ease: "easeIn", duration: 1 },
      }}
      // exit={{
      //   opacity: 0,
      //   filter: "blur(5px)",
      //   transition: { ease: "easeIn", duration: 0.8 },
      // }}
    >
      <div className="h-screen w-full flex justify-center p-5 ">
        <div className=" h-[100%] w-[100%] bg-[#36C2CE] p-5 flex flex-wrap justify-center gap-5 xl:justify-normal">
          <div className="bg-[#088395] h-[30vh] md:h-[28vh] xl:h-[25vh] xl:w-[12vw] md:w-[25vw] w-[35vw] rounded-3xl"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default Latest;
