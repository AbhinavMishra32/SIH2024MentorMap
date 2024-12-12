'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bookmark } from 'lucide-react'

const savedCareers = [
  { id: 1, name: "AI Specialist", category: "Technology" },
  { id: 2, name: "Cybersecurity Analyst", category: "Technology" },
  { id: 3, name: "Renewable Energy Engineer", category: "Engineering" },
  { id: 4, name: "Biotechnology Researcher", category: "Science" },
  { id: 5, name: "UX Designer", category: "Design" },
]

export default function SavedCareersCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="h-full card-hover-effect">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bookmark className="w-5 h-5 mr-2" />
            Saved Careers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {savedCareers.map((career, index) => (
              <motion.li
                key={career.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center justify-between"
              >
                <span className="text-sm font-medium">{career.name}</span>
                <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                  {career.category}
                </Badge>
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  )
}

