import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AdminPanel = ({ buttonName, array, data, storeFunc, buttFunc, image, imageFunc }) => {
  const [open, setOpen] = useState(false);
  const isDelete = buttonName.toLowerCase().includes("delete");

  const accent = isDelete
    ? { card: "border-red-500/30 hover:border-red-500/60", badge: "bg-red-500/20 text-red-400", btn: "bg-red-600 hover:bg-red-500" }
    : { card: "border-emerald-500/30 hover:border-emerald-500/60", badge: "bg-emerald-500/20 text-emerald-400", btn: "bg-emerald-600 hover:bg-emerald-500" };

  return (
    <div className={`border ${accent.card} bg-gray-900/60 backdrop-blur rounded-2xl transition-all duration-300 mb-4`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-4 sm:px-6 text-left min-h-[56px]"
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <span className={`text-xs font-semibold px-2 py-1 sm:px-3 rounded-full ${accent.badge} whitespace-nowrap`}>
            {isDelete ? "DELETE" : "ADD"}
          </span>
          <span className="text-white font-semibold text-base sm:text-lg">{buttonName}</span>
        </div>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-gray-400 text-xl"
        >
          ▾
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <form onSubmit={buttFunc} className="px-4 pb-5 sm:px-6 sm:pb-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {array.map(([label, type, placeholder, name], key) => (
                <div key={key} className="flex flex-col gap-1">
                  <label className="text-gray-400 text-sm font-medium">{label}</label>
                  <input
                    className="bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 sm:py-2 text-base sm:text-sm focus:outline-none focus:border-emerald-500 transition-colors placeholder-gray-600 w-full"
                    type={type}
                    placeholder={`Enter ${placeholder}`}
                    name={name}
                    value={data[name] ?? data}
                    onChange={storeFunc}
                    required
                  />
                </div>
              ))}
              {image && (
                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label className="text-gray-400 text-sm font-medium">Movie Poster</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={imageFunc}
                    className="text-gray-300 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gray-700 file:text-white hover:file:bg-gray-600 cursor-pointer"
                  />
                </div>
              )}
              <div className="col-span-1 sm:col-span-2 flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="w-full sm:w-auto px-5 py-3 sm:py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`w-full sm:w-auto px-6 py-3 sm:py-2 rounded-lg text-white text-sm font-semibold transition-colors ${accent.btn}`}
                >
                  {isDelete ? "Delete" : "Add"}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPanel;
