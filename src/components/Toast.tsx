"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ToastProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.3 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.5 }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
          duration: 0.3,
        }}
        className="fixed bottom-4 right-4 z-50"
      >
        <div className="bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-xl shadow-lg border border-gray-600">
          <p className="text-2xl font-medium">{message}</p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Toast;
