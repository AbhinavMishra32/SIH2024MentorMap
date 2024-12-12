import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CourseModal from './CourseModal'

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

interface CourseRecommendationsProps {
  recommendations: {
    courses: Course[]
    analysis: string
  }
}

export default function CourseRecommendations({ recommendations }: CourseRecommendationsProps) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-xl rounded-lg p-8 mb-8"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Analysis</h2>
        <p className="text-gray-600">{recommendations.analysis}</p>
      </motion.div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Recommended Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recommendations.courses.map((course, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
            onClick={() => setSelectedCourse(course)}
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{course.name}</h3>
              <p className="text-gray-600 mb-4">{course.description.substring(0, 100)}...</p>
              <div className="flex justify-between items-center">
                <span className="text-yellow-500 font-bold">{course.cost}</span>
                <span className="text-gray-500">{course.duration}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {selectedCourse && (
          <CourseModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}

