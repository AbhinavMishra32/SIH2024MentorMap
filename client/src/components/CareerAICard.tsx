'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Sparkles } from 'lucide-react'
import { useChat } from 'ai/react'

export default function CareerAICard() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
  })

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <span className="mr-2">CareerAI Assistant</span>
          <Sparkles className="w-5 h-5 text-yellow-500" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-[200px] overflow-y-auto bg-gray-50 p-4 rounded-lg">
            {messages.map((m, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`mb-2 ${m.role === 'user' ? 'text-right' : 'text-left'}`}
              >
                <span className={`inline-block p-2 rounded-lg ${m.role === 'user' ? 'bg-blue-100' : 'bg-green-100'}`}>
                  {m.content}
                </span>
              </motion.div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask about your career..."
            />
            <Button type="submit">Ask</Button>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}

