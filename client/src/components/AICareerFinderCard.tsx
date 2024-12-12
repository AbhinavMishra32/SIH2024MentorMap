'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AICareerFinderCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <Card className="h-full card-hover-effect">
        <CardHeader>
          <CardTitle>Discover Your Ideal Career</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Let our AI-powered Career Finder suggest the perfect career path based on your interests and skills.
          </p>
          <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800">
            Start Career Discovery
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

