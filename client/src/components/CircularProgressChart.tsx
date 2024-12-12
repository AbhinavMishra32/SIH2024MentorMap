'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Label } from "recharts"

interface Progress {
  completed: number;
  total: number;
}

export default function CircularProgressChart({ progress }: { progress: Progress }) {
  const data = [
    { name: 'Completed Lessons', value: progress.completed, color: '#FBBF24' },
    { name: 'Remaining Lessons', value: progress.total, color: '#E5E7EB' },
  ]
  const completedLessons = data[0].value;
  const totalLessons = data[1].value;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="h-full card-hover-effect">
        <CardHeader>
          <CardTitle>Lesson Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                  <Label
                  value={`${completedLessons}/${totalLessons}`}
                  position="center"
                  fill="#374151"
                  style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                  }} 
                  />
                </Pie>
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center mt-4 text-sm text-gray-600">
            You've completed {completedLessons} out of {totalLessons} lessons. Keep it up!
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

