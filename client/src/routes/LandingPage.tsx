import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useAnimate, stagger } from 'framer-motion'
import { Button } from "@/components/ui/button"
import landingHeroImage from '../assets/landing_hero.png';
// import Image from 'next/image'
import { Link } from 'react-router-dom'
import { BarChart, BookOpen, Check, CircleDot, Video, Map, Search, MessageSquare } from 'lucide-react';

export default function Home() {
  const targetRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  });

  const [scope, animate] = useAnimate()

  useEffect(() => {
    animate([
      [".stagger-fade-in", { opacity: [0, 1], y: [20, 0] }, { duration: 0.5, delay: stagger(0.1) }],
      [".hero-title", { clipPath: ["inset(100% 0 0 0)", "inset(0% 0 0 0)"] }, { duration: 0.5, at: "<" }],
      [".hero-subtitle", { clipPath: ["inset(100% 0 0 0)", "inset(0% 0 0 0)"] }, { duration: 0.5, at: "-0.25" }],
    ])
  }, [animate])

  return (
    <div ref={scope} className="relative">
      <header className={`fixed top-0 left-1/2 transform -translate-x-1/2 z-50 rounded-full transition-all duration-500 ${scrollY > 0 ? 'bg-white/90 mt-6 backdrop-blur-xl w-[90%] md:w-[70%] ring-4 ring-amber-300' : 'bg-transparent mt-3 w-[95%] md:w-[75%]'}`}>
      <nav className="container mx-auto px-4 py-3 md:px-6 md:py-4 flex justify-between items-center">
        <motion.div 
        className="text-xl md:text-2xl font-bold flex items-center gap-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        >
        {/* <Image src="/logo.svg" alt="MentorMap" width={32} height={32} /> */}
        {/* <img src="/logo.svg" alt="MentorMap" width={32} height={32} /> */}
        {/* <img src="https://via.placeholder.com/500" alt="MentorMap" width={32} height={32} /> */}
        MentorMap
        </motion.div>
        <motion.ul 
        className="hidden sm:flex space-x-4 md:space-x-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        >
        <li><Link to="#" className="hover:text-primary transition-colors">About</Link></li>
        <li><Link to="#" className="hover:text-primary transition-colors">Explore</Link></li>
        <li><Link to="#" className="hover:text-primary transition-colors">Find Your Career</Link></li>
        <li><Link to="#" className="hover:text-primary transition-colors">AI Roadmap</Link></li>
        <li><Link to="#" className="hover:text-primary transition-colors">AI Interview Prep</Link></li>
        </motion.ul>
        <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        >
        <Button variant="default" className={`bg-yellow-400 rounded-full text-black hover:bg-yellow-500/90 ${scrollY > 0 ? '' : 'shadow-xl'} transition-all duration-1000`}>Dashboard</Button>
        </motion.div>
      </nav>
      </header>

      <main>
      <section ref={targetRef} className="relative pt-24 bg-gradient-to-t from-[#FFF5E1] from-20% via-[#fbecc7] overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-6">
              <span className="text-sm font-medium bg-black/5 px-4 py-2 rounded-full">
                Career Guidance Platform
              </span>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-black">
                Navigate Your Future with Confidence
              </h1>
              <p className="text-black/60 text-lg max-w-xl">
                Empowering high school students to make informed career decisions through personalized counseling, AI-powered roadmaps, and comprehensive career exploration tools.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to='/signin'>
                <button className="bg-[#FFD84D] text-black px-6 py-3 rounded-full font-medium flex items-center gap-2">
                  Start Your Counseling Journey
                </button>
                </Link>
                <button className="bg-black text-white px-6 py-3 rounded-full font-medium flex items-center gap-2">
                  Create AI Roadmap
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-8">
                <div className="flex items-center gap-3 bg-white/50 p-4 rounded-2xl shadow-lg">
                  <div className="p-2 bg-[#FFD84D] rounded-lg">
                    <BookOpen className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <p className="font-medium">Career Explorer</p>
                    <p className="text-sm text-black/60">Powered by O*NET</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/50 p-4 rounded-2xl shadow-lg">
                  <div className="p-2 bg-[#FFD84D] rounded-lg">
                    <Video className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <p className="font-medium">Interview Analyzer</p>
                    <p className="text-sm text-black/60">AI Performance Insights</p>
                  </div>
                </div>
              </div>

                  <div className="grid md:grid-cols-2 gap-8 pt-8">
                    <div className="space-y-8">
                      <TimelineItem
                        icon={<span className="w-6 h-6 rounded-full bg-[#FFD84D] flex items-center justify-center text-black">1</span>}
                        title="Personal Counseling"
                        description="Connect directly with experienced career counselors for tailored advice."
                      />
                      <TimelineItem
                        icon={<Check className="w-5 h-5 text-black" />}
                        title="AI Roadmaps"
                        description="Generate personalized career paths from your current position to your goals."
                      />
                      <TimelineItem
                        icon={<CircleDot className="w-5 h-5 text-black" />}
                        title="Career Database"
                        description="Explore diverse careers using comprehensive data from O*NET Online."
                      />
                    </div>
                    <div className="space-y-8">
                      <TimelineItem
                        icon={<span className="w-6 h-6 rounded-full bg-[#FFD84D] flex items-center justify-center text-black">f</span>}
                        title="Interview Practice"
                        description="Hone your skills with AI-powered interview simulations and feedback."
                      />
                      <TimelineItem
                        icon={<span className="w-6 h-6 rounded-full border-2 border-black/20 flex items-center justify-center text-black">?</span>}
                        title="Performance Analysis"
                        description="Receive detailed insights on your interview performance through AI analysis."
                      />
                      <TimelineItem
                        icon={<span className="w-6 h-6 rounded-full border-2 border-black/20 flex items-center justify-center text-black">8</span>}
                        title="Resource Library"
                        description="Access a wealth of career resources, guides, and educational materials."
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="relative">
                  <div className="absolute -right-20 -top-36 w-[500px] h-[500px] rounded-full bg-[#FFD84D] shadow-xl" />
                  <img
                  src={landingHeroImage}
                  alt="Student"
                  className="relative z-10 w-full h-auto -top-20 max-w-[500px] mx-auto"
                  />
                  <div className="absolute top-10 right-10 bg-white p-3 rounded-full shadow-lg z-20">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15L8 11H16L12 15Z" fill="currentColor" />
                  </svg>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 w-full">
            <svg viewBox="0 0 1440 200" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <path d="M0 200L1440 200L1440 80C1440 80 1082.5 200 720 200C357.5 200 0 80 0 80L0 200Z" fill="white" />
            </svg>
          </div>
        </section>

        <section className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Empowering Career Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "AI Counselor Chat", 
              description: "Chat directly with our AI-powered counselors for personalized career guidance and support.",
              icon: <MessageSquare className="w-6 h-6 text-yellow-500" />
            },
            { 
              title: "AI Career Roadmaps", 
              description: "Generate personalized career paths from your current position to your desired goals using AI technology.",
              icon: <Map className="w-6 h-6 text-yellow-500" />
            },
            { 
              title: "Career Explorer", 
              description: "Explore various careers through our comprehensive database powered by the O*NET Online dataset.",
              icon: <Search className="w-6 h-6 text-yellow-500" />
            },
            { 
              title: "Interview Analysis", 
              description: "Receive detailed AI-powered analysis and feedback on your interview performance to improve your skills.",
              icon: <Video className="w-6 h-6 text-yellow-500" />
            },
            { 
              title: "Job Market Insights", 
              description: "Stay updated with real-time job market trends and analytics to make informed career decisions.",
              icon: <BarChart className="w-6 h-6 text-yellow-500" />
            },
            { 
              title: "Skill Development", 
              description: "Access curated resources and materials to enhance your skills and knowledge in your chosen career path.",
              icon: <BookOpen className="w-6 h-6 text-yellow-500" />
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="stagger-fade-in bg-gray-50 p-8 rounded-3xl"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-12 h-12 bg-[#FFD84D] rounded-full mb-4 flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-8">Our dales tryring</h2>
                <div className="grid grid-cols-2 gap-6">
                  <ul className="space-y-4">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-black rounded-full" />
                      New Dopiter
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-black rounded-full" />
                      Themstican Leonhing
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-black rounded-full" />
                      Eeltsere Steries
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-black rounded-full" />
                      Fterng yreswst
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-black rounded-full" />
                      Isustry ot forclestisry
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-black rounded-full" />
                      Owostrt Stetislogs
                    </li>
                  </ul>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-black rounded-full" />
                      Cost Ozsse
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-black rounded-full" />
                      Keerv fo heotlotis
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-black rounded-full" />
                      Mtregstrolod Fosrtes
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-black rounded-full" />
                      Fewgh nwectd pelsng
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-black rounded-full" />
                      Heel Leny figwees
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-black rounded-full" />
                      Heently Lostletents
                    </li>
                  </ul>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                {/* <Image
                  src="/placeholder.svg"
                  alt="Interface illustration"
                  width={600}
                  height={400}
                  className="object-contain"
                /> */}
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

function TimelineItem({ icon, title, description }: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="relative pl-8 before:absolute before:left-[11px] before:top-8 before:h-full before:w-[2px] before:bg-[#C4A052]/30 last:before:hidden">
      <div className="absolute left-0 top-1">
        {icon}
      </div>
      <div className="space-y-1">
        <h3 className="font-semibold text-black/80">{title}</h3>
        <p className="text-black/50">{description}</p>
      </div>
    </div>
  )
}
