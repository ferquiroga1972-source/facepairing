import client from './client'

export interface ScanResult {
  scan_id: number
  image_url: string
  attributes: Record<string, unknown>
  diagnostic: string
}

export const uploadFace = (file: File) => {
  const form = new FormData()
  form.append('file', file)
  return client.post<ScanResult>('/face/scan', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export const getMatches = () =>
  client.get<{ matches: Array<{ user_id: number; full_name: string; similarity_score: number }> }>('/matching/find')
