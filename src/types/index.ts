// ─── Core Data Types ──────────────────────────────────────────────────────────

export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  tech: string[]
  imageUrl?: string
  liveUrl?: string
  githubUrl?: string
  featured: boolean
  year: number
  category: 'web' | 'mobile' | 'tool' | 'experiment'
}

export interface Experience {
  id: string
  company: string
  role: string
  period: string
  startDate: string
  endDate?: string           // omit = current
  description: string
  achievements: string[]
  tech: string[]
  location: string
  companyUrl?: string
}

export interface Skill {
  id: string
  name: string
  category: 'frontend' | 'animation' | 'backend' | 'tools' | 'language'
  proficiency: number        // 0–100
  connections: string[]      // ids of related skills
}

export interface SiteConfig {
  name: string
  firstName: string
  title: string
  tagline: string
  bio: string
  bioExtended: string
  location: string
  email: string
  github: string
  linkedin: string
  twitter?: string
  availableForWork: boolean
  yearsExperience: number
}

// ─── Component Prop Types ─────────────────────────────────────────────────────

export interface CardProps {
  children: React.ReactNode
  className?: string
  hoverable?: boolean
  noPadding?: boolean
}

export interface SectionTitleProps {
  eyebrow: string
  title: string
  subtitle?: string
  centered?: boolean
  className?: string
}

export interface ButtonProps {
  children: React.ReactNode
  variant?: 'solid' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  onClick?: () => void
  className?: string
  icon?: React.ReactNode
  external?: boolean
  disabled?: boolean
}

// ─── Hook Return Types ────────────────────────────────────────────────────────

export interface PortfolioData {
  config: SiteConfig | null
  projects: Project[]
  experience: Experience[]
  skills: Skill[]
  loading: boolean
  error: string | null
}

export interface ScrollProgress {
  scrollY: number
  scrollProgress: number   // 0–1
  direction: 'up' | 'down'
  isAtTop: boolean
  isAtBottom: boolean
}
