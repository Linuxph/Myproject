import React, { useState } from 'react'
import {motion} from 'framer-motion';

const AdminPanel = (props) => {

    const [enable, setenable] = useState(false);
    const [color, setcolor] = useState(false);


  return (
    <div>
        <div
          onClick={() => {
            setenable(true);
            setcolor(true);
          }}
          className="w-3/4 bg-green-300 rounded-2xl cursor-pointer p-2 mt-10 mb-10"

        >
          <h1
            className={`cursor-pointer p-1 w-fit ${
              color && "bg-green-500 text-white font-bold"
            } rounded-xl hover:font-bold hover:bg-green-500 hover:text-white`}
          >
            {props.buttonName}
          </h1>
          <motion.div
            className={` ${
              enable ? "block" : "hidden"
            }  bg-black md:w-fit md:p-4 mt-2 rounded-2xl`}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setenable(false);
                setcolor(false);
              }}
              className="md:text-2xl text-lg text-white font-semibold p-2"
            >
              X
            </button>
            <div className="ml-5 md:ml-10 w-[11vw] md:w-fit md:h-fit">
              <form onSubmit={props.buttFunc}>
                {props.array.map(([label, type, placeholder, name], key) => {
                  return (
                    <div className="md:p-2 p-1 md:text-xl  text-md" key={key}>
                      <label className="text-white">{label}:</label>
                      <input
                        className="border-2 border-black "
                        type={type}
                        placeholder={`Enter the ${placeholder} of the movie`}
                        name={name}
                        value={props.data[name]}
                        onChange={props.storeFunc}
                        required
                      />
                    </div>
                  );
                })}
                <button className="hover:bg-green-800 rounded-xl p-1 text-white" type="submit">Proceed</button>
              </form>
            </div>
          </motion.div>
        </div>
    </div>
  )
}

export default AdminPanel