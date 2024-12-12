'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from 'lucide-react'

const trendingJobs = [
  { title: "AI Engineer", growth: "+25%", salary: "$120,000" },
  { title: "Data Scientist", growth: "+20%", salary: "$115,000" },
  { title: "Cybersecurity Specialist", growth: "+18%", salary: "$105,000" },
  { title: "UX/UI Designer", growth: "+15%", salary: "$95,000" },
]

export default function CareerInsightsCard() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" />
          Trending Jobs
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trendingJobs.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-gray-50 p-4 rounded-lg"
            >
              <h3 className="font-medium text-lg mb-2">{job.title}</h3>
              <p className="text-sm text-gray-600">Growth: <span className="text-green-600">{job.growth}</span></p>
              <p className="text-sm text-gray-600">Avg. Salary: {job.salary}</p>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

