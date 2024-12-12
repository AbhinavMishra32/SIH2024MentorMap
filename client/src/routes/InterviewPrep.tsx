'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import { api } from '@/services/axios';
import { BackgroundAnimation } from '@/components/BackgroundAnimations';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string
if (!GEMINI_API_KEY) {
    throw new Error("Missing GEMINI_API_KEY in environment variables")
}

// Animated background component
const AnimatedBackground = () => (
  <div className="fixed inset-0 z-[-1] overflow-hidden bg-gradient-to-br from-yellow-100 to-white">
    {[...Array(50)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full bg-yellow-300 mix-blend-multiply opacity-30"
        style={{
          width: Math.random() * 100 + 20,
          height: Math.random() * 100 + 20,
        }}
        animate={{
          x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
          y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: Math.random() * 20 + 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    ))}
  </div>
);

// VideoRecorder Component
const VideoRecorder = ({ isRecording, setIsRecording, onVideoReady }) => {
    const toggleRecording = () => {
        setIsRecording(!isRecording);
        // Implement actual video recording logic here
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
        >
            <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(255,204,0,0.5)" }}
                whileTap={{ scale: 0.95 }}
                className={`${
                    isRecording ? 'bg-red-500' : 'bg-yellow-500'
                } text-white font-bold py-3 px-6 rounded-full transition-all duration-300 ease-in-out text-lg`}
                onClick={toggleRecording}
            >
                {isRecording ? 'Stop Recording' : 'Start Recording'}
            </motion.button>
        </motion.div>
    );
};

// AnimatedAnalysis Component
const AnimatedAnalysis = ({ analysis, isAnalyzing, onNextQuestion }) => {
    const TypewriterText = ({ text }) => {
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
    
        return <motion.p className="text-lg leading-relaxed">{displayedText}</motion.p>;
    };

    return (
        <div className="mt-6">
            {analysis && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-lg p-6 shadow-lg"
                >
                    <h3 className="text-2xl font-semibold mb-4 text-yellow-600">Analysis:</h3>
                    <TypewriterText text={analysis} />
                </motion.div>
            )}
            <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(255,204,0,0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 ease-in-out mt-6 text-lg w-full"
                onClick={onNextQuestion}
                animate={{
                    y: [0, -5, 0],
                    transition: { duration: 2, repeat: Infinity, repeatType: 'loop' },
                }}
            >
                Next Question
            </motion.button>
        </div>
    );
};

// FinalAnalysis Component
const FinalAnalysis = ({ analysis }) => {
    return (
        <Card className="bg-white/90 shadow-xl rounded-3xl overflow-hidden backdrop-filter backdrop-blur-lg">
            <CardHeader className="bg-yellow-100 border-b border-yellow-200">
                <CardTitle className="text-3xl font-bold text-yellow-800">Final Analysis</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
                <motion.p 
                    className="text-xl leading-relaxed text-gray-700"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    {analysis}
                </motion.p>
            </CardContent>
        </Card>
    );
};

const InterviewPrep = () => {
    const [questions, setQuestions] = useState<string[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [responses, setResponses] = useState<Record<string, { aiAnalysis: unknown }>>({});
    const [isRecording, setIsRecording] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [finalAnalysis, setFinalAnalysis] = useState(null);
    const [showFinalAnalysis, setShowFinalAnalysis] = useState(false);
    const [isGeneratingQuestion, setIsGeneratingQuestion] = useState(false);
    const [studentInterests, setStudentInterests] = useState<string>('');
    const [showInterestInput, setShowInterestInput] = useState(true);
    const [currentAnalysis, setCurrentAnalysis] = useState<string | null>(null);

    const generateQuestions = async () => {
        setIsGeneratingQuestion(true)
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)

        const schema = {
            type: SchemaType.OBJECT,
            properties: {
                questions: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
            },
            required: ["questions"],
        }

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: schema,
            },
        })

        const prompt = `Generate 3 questions that tests that test student's knowledge about their interests: ${studentInterests}. And it also tests their personality and skills. The AI should provide exact feedback on the student's responses. Dont ask too long question, use easy words. (school students), dont tell feedback`

        try {
            const result = await model.generateContent(prompt)
            const generatedQuestions = JSON.parse(result.response.text())
            setQuestions(generatedQuestions.questions)
            setIsGeneratingQuestion(false)
            setShowInterestInput(false)
        } catch (error) {
            console.error("Error generating questions:", error)
            setIsGeneratingQuestion(false)
        }
    }

    const handleVideoUpload = async (blob: Blob) => {
        setIsAnalyzing(true);
        setCurrentAnalysis(null);
        const formData = new FormData();
        formData.append('video', blob, 'recording.mp4');
        formData.append('question', questions[currentQuestionIndex]);
    
        try {
            const response = await api.post('/api/ai/video', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const aiResponse = response.data.response;
            setResponses(prev => ({
                ...prev,
                [questions[currentQuestionIndex]]: { aiAnalysis: aiResponse }
            }));
            console.log('All responses: ', responses);
            setCurrentAnalysis(aiResponse);
            console.log('Current analysis:', aiResponse);
        } catch (error) {
            console.error('Error uploading video:', error);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setCurrentAnalysis(null);
        } else {
            finishInterview();
        }
    };

    const finishInterview = async () => {
        try {
            const analysisResponse = await api.post('/api/ai/video/finalize', { questionResponses: responses });
            console.log('Final analysis:', analysisResponse.data);
            setFinalAnalysis(analysisResponse.data);
            setShowFinalAnalysis(true);
        } catch (error) {
            console.error('Error getting final analysis:', error);
        }
    };

    return (
        <div className="min-h-screen w-full relative overflow-hidden">
            <AnimatedBackground />
            <BackgroundAnimation/>
            <div className="container mx-auto px-4 py-12 relative z-10">
                <motion.h1 
                    className="text-5xl font-bold mb-12 text-center text-yellow-800"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 100, damping: 10, delay: 0.2 }}
                >
                    AI Personality Developer
                </motion.h1>

                <AnimatePresence mode="wait">
                    {showInterestInput ? (
                        <motion.div
                            key="interest-input"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.5 }}
                            className="max-w-2xl mx-auto"
                        >
                            <Card className="bg-white/90 shadow-xl rounded-3xl overflow-hidden backdrop-filter backdrop-blur-lg">
                                <CardHeader className="bg-yellow-100 border-b border-yellow-200 p-8">
                                    <CardTitle className="text-3xl font-bold text-yellow-800">What are your interests?</CardTitle>
                                </CardHeader>
                                <CardContent className="p-8">
                                    <Input
                                        type="text"
                                        placeholder="E.g., Computer Science, Art, Biology"
                                        value={studentInterests}
                                        onChange={(e) => setStudentInterests(e.target.value)}
                                        className="mb-6 text-lg p-4 rounded-xl"
                                    />
                                    <motion.button
                                        whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(255,204,0,0.5)" }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 ease-in-out text-xl"
                                        onClick={generateQuestions}
                                        disabled={isGeneratingQuestion || !studentInterests}
                                    >
                                        {isGeneratingQuestion ? (
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                                className="inline-block w-8 h-8 border-t-4 border-b-4 border-white rounded-full"
                                            />
                                        ) : (
                                            'Start Interview'
                                        )}
                                    </motion.button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ) : !showFinalAnalysis ? (
                        <motion.div
                            key="interview-questions"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="max-w-3xl mx-auto"
                        >
                            <Card className="bg-white/90 shadow-xl rounded-3xl overflow-hidden backdrop-filter backdrop-blur-lg">
                                <CardHeader className="bg-yellow-100 border-b border-yellow-200 p-8">
                                    <CardTitle className="text-3xl font-bold text-yellow-800">Question {currentQuestionIndex + 1} of {questions.length}</CardTitle>
                                </CardHeader>
                                <CardContent className="p-8">
                                    <AnimatePresence mode="wait">
                                        <motion.p
                                            key={currentQuestionIndex}
                                            className="text-2xl mb-8 font-medium text-gray-700"
                                            initial={{ opacity: 0, y: 20, rotateX: 90 }}
                                            animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                            exit={{ opacity: 0, y: -20, rotateX: -90 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            {questions[currentQuestionIndex]}
                                        </motion.p>
                                    </AnimatePresence>
                                    {!currentAnalysis && (
                                        <VideoRecorder
                                            isRecording={isRecording}
                                            setIsRecording={setIsRecording}
                                            onVideoReady={handleVideoUpload}
                                        />
                                    )}
                                    <AnimatedAnalysis
                                        analysis={currentAnalysis}
                                        isAnalyzing={isAnalyzing}
                                        onNextQuestion={handleNextQuestion}
                                    />
                                </CardContent>
                                <CardFooter className="p-8">
                                    <motion.div
                                        className="w-full h-4 bg-yellow-100 rounded-full overflow-hidden"
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <motion.div
                                            className="h-full bg-yellow-500"
                                            initial={{ width: '0%' }}
                                            animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                                            transition={{ duration: 0.5 }}
                                        />
                                    </motion.div>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="final-analysis"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="max-w-4xl mx-auto"
                        >
                            <FinalAnalysis analysis={finalAnalysis.analysis} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default InterviewPrep;

