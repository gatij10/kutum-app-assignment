import { useState } from 'react'

export default function ImageUpload({ onUpload }: { onUpload: (url: string) => void }) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError(null)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('https://crafto.app/crafto/v1.0/media/assignment/upload', {
        method: 'POST',
        body: formData,
      })
      if (!response.ok) {
        throw new Error('Upload failed')
      }
      const data = await response.json()
      onUpload(data.mediaUrl)
    } catch (error) {
      console.error('Upload failed:', error)
      setError('Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <label htmlFor="image" className="block mb-1">Upload Image</label>
      <input
        type="file"
        id="image"
        accept="image/*"
        onChange={handleUpload}
        disabled={uploading}
        className="w-full p-2 border rounded"
        aria-describedby="upload-status"
      />
      {uploading && <p id="upload-status" aria-live="polite">Uploading...</p>}
      {error && <p id="upload-status" className="text-red-500" aria-live="polite">{error}</p>}
    </div>
  )
}