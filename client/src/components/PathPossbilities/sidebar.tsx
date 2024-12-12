import React from 'react'
import { MindMapNode } from '../types/mindmap'
import { Briefcase, Book, Code, Server, Cloud, Users, School, Building2, LineChart, Stethoscope, Mic, Gavel, Paintbrush, Calculator, Wrench, Camera, GlassWater, DollarSign, Globe, Plane, Package2, Heart } from 'lucide-react'
import { motion } from 'framer-motion'

interface SidebarProps {
  selectedNode: MindMapNode | null
}

const icons = {
  briefcase: Briefcase,
  book: Book,
  code: Code,
  server: Server,
  cloud: Cloud,
  users: Users,
  school: School,
  building: Building2,
  chart: LineChart,
  Briefcase: Briefcase,
  Stethoscope: Stethoscope,
  Code: Code,
  Gavel: Gavel,
  Mic: Mic,
  Paintbrush: Paintbrush,
  Calculator: Calculator,
  Book: Book,
  Tool: Wrench,
  Camera: Camera,
  Cutlery: GlassWater,
  Wrench: Wrench,
  Flask: GlassWater,
  Music: Mic,
  Globe: Globe,
  DollarSign: DollarSign,
  Airplane: Plane,
  Tree: Building2,
  Package: Package2,
  Heart: Heart,
}

const Sidebar: React.FC<SidebarProps> = ({ selectedNode }) => {
  if (!selectedNode) return null
  const IconComponent = selectedNode.data.icon ? icons[selectedNode.data.icon as keyof typeof icons] : Briefcase
  return (
    <motion.div 
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: selectedNode ? 0 : "100%", opacity: selectedNode ? 1 : 0 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.3
      }}
      className="fixed right-0 top-[80px] w-72 h-[70vh] rounded-3xl m-2 bg-gradient-to-t from-white/80 to-yellow-50/80 backdrop-blur-md shadow-xl border-2 border-yellow-400"
    >
      <div className="p-2 m-4 rounded-xl bg-white transition-all duration-200">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-yellow-50 rounded-lg transform transition-all duration-200 hover:scale-105 hover:bg-yellow-100">
              <IconComponent className="w-5 h-5 text-yellow-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">{selectedNode.data.label}</h2>
          </div>
          
          <p className="text-sm text-gray-600 leading-relaxed">
            {selectedNode.data.description}
          </p>

          {selectedNode.data.detailedDescription && (
            <div className="text-sm bg-gray-100 p-3 rounded-lg border border-gray-100">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {selectedNode.data.detailedDescription}
              </p>
            </div>
          )}

          <div className="text-sm bg-slate-50 p-3 rounded-lg border border-slate-100">
            <span className="text-yellow-600 font-medium">Est. Time: </span>
            <span className="text-gray-700">{selectedNode.data.timeEstimate}</span>
          </div>

          {selectedNode.data.nextSteps?.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-700">Next Steps</h3>
              <ul className="space-y-2">
                {selectedNode.data.nextSteps.map((step, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600 hover:text-gray-800 transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mr-2" />
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default Sidebar