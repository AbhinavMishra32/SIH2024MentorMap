'use client'

import { useState } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import LessonForm from '../../components/LessonCreator/LessonForm'
import QuizForm from '../../components/LessonCreator/QuizForm'
import SuccessModal from '../../components/LessonCreator/SuccessModal'
import ProgressBar from '../../components/LessonCreator/ProgressBar'
import { api } from '@/services/axios'

export default function LessonCreator() {
  const [step, setStep] = useState(1)
  const [lessonData, setLessonData] = useState({})
  const [quizData, setQuizData] = useState({})
  const [showSuccess, setShowSuccess] = useState(false)

  const handleLessonSubmit = (data) => {
    setLessonData(data)
    setStep(2)
  }

  const handleQuizSubmit = async (data) => {
    setQuizData(data)
    const fullData = { ...lessonData, ...data }
    console.log('Submitting lesson:', fullData)
    try {
      await api.post('/api/lesson/create', fullData)
      console.log('Lesson submitted:', fullData)
      setShowSuccess(true)
    } catch (error) {
      console.error('Error submitting lesson:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-2xl p-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Create New Lesson</h1>
          <ProgressBar currentStep={step} totalSteps={2} />
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="lesson-form"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <LessonForm onSubmit={handleLessonSubmit} />
              </motion.div>
            )}
            {step === 2 && (
              <motion.div
                key="quiz-form"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <QuizForm onSubmit={handleQuizSubmit} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      <AnimatePresence>
        {showSuccess && <SuccessModal onClose={() => setShowSuccess(false)} />}
      </AnimatePresence>
    </div>
  )
}

