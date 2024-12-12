import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useState, useEffect } from 'react';

const TypewriterText = ({ text }) => {
  const controls = useAnimation();
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return <motion.p>{displayedText}</motion.p>;
};

const MyComponent = ({ analysis, onNextQuestion }) => {
  return (
    <div>
      {analysis && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold mb-2">Analysis:</h3>
          <TypewriterText text={analysis} />
        </motion.div>
      )}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded-lg transition-all duration-300 ease-in-out mt-4"
        onClick={onNextQuestion}
        animate={{
          y: [0, -10, 0],
          transition: { duration: 1, repeat: Infinity, repeatType: 'loop' },
        }}
      >
        Next Question
      </motion.button>
    </div>
  );
};

export default MyComponent;

