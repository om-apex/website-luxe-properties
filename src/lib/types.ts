// Database types for Om Apex Holdings

export type TaskCategory = 'Technical' | 'Marketing' | 'Legal' | 'Operations' | 'Administrative' | 'Content'
export type TaskPriority = 'High' | 'Medium' | 'Low'
export type TaskStatus = 'pending' | 'in_progress' | 'completed'
export type Company = 'Om Apex Holdings' | 'Om Luxe Properties' | 'Om AI Solutions' | 'Om Supply Chain'
export type Confidence = 'High' | 'Medium' | 'Low'

export interface Task {
  id: string
  description: string
  category: TaskCategory
  company: Company
  priority: TaskPriority
  status: TaskStatus
  owner: string | null
  notes: string | null
  created_at: string
  updated_at: string
  completed_at: string | null
}

export interface Decision {
  id: string
  area: string
  decision: string
  rationale: string
  company: Company
  confidence: Confidence
  alternatives_considered: string | null
  date_decided: string
  created_at: string
}

export interface DailyProgress {
  id: string
  date: string
  person: 'Nishad' | 'Sumedha'
  interface: 'code' | 'code-app' | 'cowork' | 'chat' | 'web'
  title: string
  completed: string[]
  decisions_recorded: string[]
  tasks_completed: string[]
  tasks_created: string[]
  files_modified: string[]
  notes: string[]
  created_at: string
}

export interface CompanyConfig {
  id: string
  name: string
  config: {
    brand: {
      primary_color: string
      secondary_color: string
      tagline: string
    }
    contact: {
      email: string
      phone: string
      address: string
    }
    legal: {
      ein: string
      formation_date: string
      state: string
      control_number: string
    }
  }
  updated_at: string
}

// Form types
export interface ContactFormData {
  firstname: string
  lastname: string
  email: string
  company: string
  phone: string
  message: string
}
