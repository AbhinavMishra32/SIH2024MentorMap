export interface CareerInfo {
  name: string
  description: string
}

export interface QuestionOption {
  text: string
  correct: boolean
  imagePrompt: string
}

export interface QuestionData {
  question: string
  options: QuestionOption[]
}

export interface MindMapNode {
  id: string
  type: string
  data: {
    label: string
    icon?: string
    description: string
    detailedDescription: string
    timeEstimate: string
    nextSteps?: string[]
  }
}

export interface MindMapEdge {
  id: string
  source: string
  target: string
  type: 'smoothstep'
  animated?: boolean
  style?: {
    stroke?: string
  }
}

