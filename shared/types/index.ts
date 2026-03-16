export interface User {
  id: number
  email: string
  full_name?: string
  is_premium: boolean
  created_at: string
}

export interface FaceAttributes {
  age: number
  gender: string
  emotion: string
  emotions: Record<string, number>
  race: string
  races: Record<string, number>
  face_confidence?: number
}

export interface FaceScan {
  scan_id: number
  image_url: string
  attributes: FaceAttributes
  diagnostic: string
}

export interface MatchProfile {
  user_id: number
  full_name: string
  similarity_score: number
}

export interface DiagnosticResult {
  scan_id: number
  diagnostic: string
  attributes: FaceAttributes
  created_at: string
}
