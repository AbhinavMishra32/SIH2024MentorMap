import { motion } from 'framer-motion';

function MyComponent({ isRecording, toggleRecording }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`${
          isRecording ? 'bg-red-500' : 'bg-yellow-500'
        } text-white font-bold py-2 px-4 rounded-full transition-all duration-300 ease-in-out`}
        onClick={toggleRecording}
      >
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </motion.button>
    </motion.div>
  );
}

export default MyComponent;

