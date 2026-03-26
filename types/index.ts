export interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  category: string
  date: string
  author: string
}

export interface Project {
  id: number
  title: string
  slug: string
  description: string
  fullDescription: string
  image: string
  category: string
  year: string
  icon: string
}
