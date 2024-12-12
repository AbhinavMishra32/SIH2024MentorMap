import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Course {
  name: string
  description: string
  eligibility: string
  cost: string
  duration: string
  provider: string
  careerOutcome: string
  alternatives: { name: string; provider: string; cost: string }[]
}

interface CourseModalProps {
  course: Course
  onClose: () => void
}

export default function CourseModal({ course, onClose }: CourseModalProps) {
  const [showAlternatives, setShowAlternatives] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-2xl font-bold mb-4">{course.name}</h2>
        <p className="text-gray-600 mb-4">{course.description}</p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <h3 className="font-semibold">Provider</h3>
            <p>{course.provider}</p>
          </div>
          <div>
            <h3 className="font-semibold">Duration</h3>
            <p>{course.duration}</p>
          </div>
          <div>
            <h3 className="font-semibold">Cost</h3>
            <p className="text-yellow-500 font-bold">{course.cost}</p>
          </div>
          <div>
            <h3 className="font-semibold">Eligibility</h3>
            <p>{course.eligibility}</p>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold">Career Outcome</h3>
          <p>{course.careerOutcome}</p>
        </div>
        <div className="flex justify-between">
          <button
            onClick={() => setShowAlternatives(!showAlternatives)}
            className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            {showAlternatives ? 'Hide Alternatives' : 'Show Alternatives'}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded transition-colors"
          >
            Close
          </button>
        </div>
        <AnimatePresence>
          {showAlternatives && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4"
            >
              <h3 className="font-semibold mb-2">Alternative Courses</h3>
              {course.alternatives.map((alt, index) => (
                <div key={index} className="bg-gray-100 p-3 rounded mb-2">
                  <p className="font-semibold">{alt.name}</p>
                  <p>Provider: {alt.provider}</p>
                  <p>Cost: {alt.cost}</p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

