import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Sparkles, RefreshCw, X } from 'lucide-react'
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai'

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string
if (!GEMINI_API_KEY) {
  throw new Error("Missing GEMINI_API_KEY in environment variables")
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)

const schema = {
  type: SchemaType.OBJECT,
  properties: {
    careers: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          name: { type: SchemaType.STRING },
          description: { type: SchemaType.STRING },
          salary: { type: SchemaType.STRING },
          education: { type: SchemaType.STRING },
          experience: { type: SchemaType.STRING },
          skills: {
            type: SchemaType.ARRAY,
            items: { type: SchemaType.STRING }
          }
        },
        required: ["name", "description", "salary", "education", "experience", "skills"]
      }
    },
    overallAnalysis: { type: SchemaType.STRING }
  },
  required: ["careers", "overallAnalysis"]
}

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: schema,
  },
})

interface CareerItem {
  name: string
  description: string
  salary: string
  education: string
  experience: string
  skills: string[]
}

interface CareerData {
  careers: CareerItem[]
  overallAnalysis: string
}

export default function AICareerSuggestions() {
  const [careerData, setCareerData] = useState<CareerData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const generateSuggestions = async () => {
    setIsLoading(true)
    try {
      const result = await model.generateContent(`
        Generate 3 career suggestions based on current job market trends.
        For each career, provide:
        - Name
        - Brief description
        - Typical salary range
        - Required education
        - Required experience
        - 3-5 key skills
        
        Also provide a brief overall analysis of these career options.
      `)
      const aiResponse = JSON.parse(result.response.text()) as CareerData
      setCareerData(aiResponse)
      setShowModal(true)
    } catch (error) {
      console.error("Error generating career information:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Card className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-yellow-400 to-yellow-200 p-6">
          <CardTitle className="flex items-center text-3xl font-bold text-white">
            <Sparkles className="w-8 h-8 mr-3" />
            AI Career Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <AnimatePresence mode="wait">
            {careerData ? (
              <motion.div
                key="career-data"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
              </motion.div>
            ) : (
              <motion.p
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-gray-500 text-center py-8"
              >
                Click the button below to get AI-powered career suggestions.
              </motion.p>
            )}
          </AnimatePresence>
          {!careerData && (
            <Button
              onClick={generateSuggestions}
              disabled={isLoading}
              className="w-full mt-6 bg-yellow-500 hover:bg-yellow-600 text-white"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate Suggestions
                </>
              )}
            </Button>
          )}
        </CardContent>
      </Card>

      <AnimatePresence>
        {showModal && careerData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              transition={{ type: "spring", damping: 15 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-yellow-500 p-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Your Career Suggestions</h2>
                <Button
                  onClick={() => {
                    setShowModal(false)
                    setCareerData(null)
                  }}
                  variant="ghost"
                  className="text-white hover:bg-yellow-600"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-64px)]">
                {careerData.careers.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-yellow-50 p-4 rounded-lg shadow"
                 >
                    <h3 className="text-xl font-semibold text-yellow-700 mb-2">{item.name}</h3>
                    <p className="text-gray-600 mb-2">{item.description}</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="font-medium text-yellow-600">Salary:</span> {item.salary}
                      </div>
                      <div>
                        <span className="font-medium text-yellow-600">Education:</span> {item.education}
                      </div>
                      <div>
                        <span className="font-medium text-yellow-600">Experience:</span> {item.experience}
                      </div>
                      <div>
                        <span className="font-medium text-yellow-600">Skills:</span> {item.skills.join(", ")}
                      </div>
                    </div>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="mt-6 p-4 bg-yellow-100 rounded-lg"
                >
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">Overall Analysis</h3>
                  <p className="text-gray-700">{careerData.overallAnalysis}</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
