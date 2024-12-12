import { Link } from "react-router-dom"
import { useState } from "react"
import limg from "../assets/landing_image.png"
import logo from "../assets/logo_mm.jpg"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowRight, Upload, Menu , X } from 'lucide-react'
import { BookOpen, Briefcase, GraduationCap, TrendingUp } from 'lucide-react'
import { DollarSign, ChevronRight } from 'lucide-react'


interface Feature {
  title: string
  description: string
  ctaText: string
  image: string
  imageAlt: string
  linkto: string
}

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export default function OldLandingPage() {

  const features: Feature[] = [
    {
      title: "Find Your Career",
      description: "Disxcover career options via a quiz tailored to your interests.",
      image: "https://placeholder.com/600x400",
      imageAlt: "alternate image",
      ctaText: "Find Now",
      linkto: "/careerquiz",
    },
    {
      title: "Get Your Personalized Lessons",
      description: "Get lessons and resources based on your personal experience.",
      image: "https://placeholder.com/600x400",
      imageAlt: "alternate image",
      ctaText: "Start Learning",
      linkto: "/learn",
    },
    {
      title: "Career Counsellor",
      description: "Find out through the numbers of the counsellors and get your one.",
      image: "https://placeholder.com/600x400",
      imageAlt: "alternate image",
      ctaText: "Connect Now",
      linkto: "/counselling",
    },
    {
      title: "Don't Know About The Profession",
      description: "Visualize the works and get  the idea of that professions.",
      image: "https://placeholder.com/600x400",
      imageAlt: "alternate image",
      ctaText: "Visualize",
      linkto: "/careerai",
    }
  ]
  const tools = [
    {
      title: "Skill Development",
      description: "Enhance your abilities with personalized learning paths",
      icon: TrendingUp,
    },
    {
      title: "College Planning",
      description: "Navigate your educational journey with expert guidance",
      icon: GraduationCap,
    },
    {
      title: "Career Exploration",
      description: "Discover exciting career opportunities tailored to your interests",
      icon: Briefcase,
    },
    {
      title: "Learning Resources",
      description: "Access a wealth of educational materials to support your growth",
      icon: BookOpen,
    },
  ]

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  const careerFeatures = [
    { icon: DollarSign, text: "Pay scale" },
    { icon: TrendingUp, text: "Demand status" },
    { icon: Briefcase, text: "Key skills required" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  const textVariants = {
    hover: {
      y: -5,
      transition: {
        duration: 0.2
      }
    }
  }
  const [isOpen, setIsOpen] = useState(false)


  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-xl w-16 h-16 font-bold">
          <Link to ="/">
            <img src={logo} alt="Logo" width={64} height={64} />
          </Link>
        </div>
        <nav className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to ={item.href}
              className="text-yellow-900 hover:text-yellow-400 transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          className="md:hidden text-yellow-900 hover:text-yellow-700 transition-colors duration-200"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navItems.map((item) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    to={item.href}
                    className="block text-yellow-900 hover:text-yellow-400 transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
      {/* Header closes here */}


      {/* Hero Section */}
      <section className="container mx-auto px-4 py-4 grid md:grid-cols-2 gap-12 md:gap-32 items-center">

        <div className="space-y-6">
          <h1 className="text-xl md:text-3xl font-bold leading-tight">
            EMPOWERING THE FUTURE WITH THE CAREER COUNSELLING
          </h1>
          <p className="text-gray-500 text-sm">
            EXPLORE YOUR PASSINGS CONNECT WITH THE EXPERTS AND FIND THE CORRECT CAREER PATH
          </p>
          <Link to='/signin'>
            <Button className="bg-[#FFD700] mt-4 text-gray-900 hover:bg-[#FFE44D]">
              GET STARTED
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="relative ">
          <img className="rounded-3xl md:w-[400px] md:h-[400px]" src={limg} alt="" />
        </div>
      </section>
      {/* Hero Section closes here */}


      {/* Features Section */}
      <section className="py-12 md:py-24 lg:py-32 bg-yellow-50">
        <div className="container px-4 md:px-6 mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="mb-20 last:mb-0"
            >
              <div className="flex flex-col gap-8 md:flex-row md:items-center">
                {/* Image Section - Always first on mobile */}
                <ImageSection feature={feature} index={index} />

                {/* Content Section */}
                <motion.div
                  className={`flex-1 space-y-4 flex flex-col ml-10 justify-center ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'
                    }`}
                  variants={itemVariants}
                >
                  <motion.h2
                    className="text-xl font-bold tracking-tighter sm:text-4xl md:text-3xl text-yellow-800"
                    variants={textVariants}
                    whileHover="hover"
                  >
                    {feature.title}
                  </motion.h2>
                  <motion.p
                    className="max-w-[700px] text-yellow-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                    variants={textVariants}
                    whileHover="hover"
                  >
                    {feature.description}
                  </motion.p>
                  <Link to = {feature.linkto}>
                    <motion.button
                      className="inline-flex h-10 items-center justify-center rounded-md bg-yellow-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-yellow-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 self-start"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {feature.ctaText}
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      {/* feature section closes here */}


      {/* AI Training Section */}
      <section className="bg-gradient-to-br from-[#FFF8E1] to-[#FFE082] py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-center text-3xl font-bold mb-12 text-yellow-900"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            AI Powered Career Training
          </motion.h2>
          <div className="flex flex-col md:flex-row  gap-8 items-center">
            <motion.div
              className="w-full md:w-[70%]"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <motion.div
                className="aspect-video bg-black/50 rounded-lg border border-yellow-600 p-8 shadow-lg overflow-hidden"
                whileHover={{ boxShadow: "0 0 15px rgba(255, 215, 0, 0.5)" }}
              >
                <motion.div
                  className="h-full flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <Upload className="h-16 w-16 text-yellow-500" />
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.div
              className="w-full md:w-[30%] space-y-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.h3
                className="text-xl font-bold text-yellow-900"
                whileHover={{ scale: 1.05, originX: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                Upload your video for AI analysis
              </motion.h3>
              <motion.p
                className="text-yellow-800"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                Upload your raw video for AI analysis. Our system will review your presentation skills and provide an overall rating of your performance.
              </motion.p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-[#FFD700] text-yellow-900 hover:bg-[#FFE44D] transition-colors duration-300">
                  Get review of your video
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* AI Training Section closes here */}

      {/* Tools Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <motion.h2
          className="text-3xl font-bold mb-8 text-yellow-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Explore Our Career Development Tools
        </motion.h2>
        <motion.p
          className="text-yellow-800 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Discover a wide range of tools designed to support your personal and professional growth,
          including skill development, college planning, career exploration, and many more.
        </motion.p>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {tools.map((tool, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-yellow-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <tool.icon className="w-6 h-6 text-yellow-700" />
                  </div>
                  <CardTitle className="text-yellow-900">{tool.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-yellow-700">{tool.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>
      {/* Tools Section closes here */}


      {/* Career Explorer */}
      <section className="container mx-auto w-[100%] bg-gradient-to-br from-yellow-50 to-yellow-100">
        <motion.h2
          className="text-center text-3xl font-bold mb-12 text-yellow-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Explore Different Careers
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8 p-4 w-full items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Card className="bg-white border-yellow-200 hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl text-yellow-800">Explore Various Career Options</CardTitle>
                <CardDescription className="text-yellow-700">
                  <motion.ul className="space-y-4 mt-4" variants={containerVariants}>
                    {careerFeatures.map((feature, index) => (
                      <motion.li key={index} className="flex items-center space-x-2" variants={itemVariants}>
                        <feature.icon className="w-6 h-6 text-yellow-600" />
                        <span>{feature.text}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to='/explore'>
                    <Button
                      variant="outline"
                      className="bg-[#FFD700] text-yellow-900 hover:bg-[#FFE44D] mt-4 group flex items-center"
                    >
                      Explore
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            className="aspect-square bg-yellow-800 rounded-lg p-10 border border-yellow-600 overflow-hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div
              className="w-full h-full bg-[url('/placeholder.svg?height=400&width=400')] bg-cover bg-center"
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
            />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">About Us</h3>
              <ul className="space-y-2 text-gray-500">
                <li><Link to="#">Our Story</Link></li>
                <li><Link to="#">Team</Link></li>
                <li><Link to="#">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-500">
                <li><Link to="#">Career Counseling</Link></li>
                <li><Link to="#">Skill Assessment</Link></li>
                <li><Link to="#">Training</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-500">
                <li><Link to="#">Blog</Link></li>
                <li><Link to="#">Guides</Link></li>
                <li><Link to="#">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-500">
                <li><Link to="#">Support</Link></li>
                <li><Link to="#">Sales</Link></li>
                <li><Link to="#">Partners</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      {/* Footer closes here */}
    </div>
  )
}

import { useRef } from "react"
import { useInView } from "react-intersection-observer"

function ImageSection({ feature, index }: { feature: Feature; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div
      ref={ref}
      className={`flex-1 flex items-center justify-center ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}
    >
      <motion.img
        src={feature.image}
        alt={feature.imageAlt}
        className="rounded-lg object-cover w-full max-w-[300px] h-auto shadow-lg border-4 border-yellow-200"
        width={300}
        height={200}
        variants={imageVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      />
    </div>
  )
}