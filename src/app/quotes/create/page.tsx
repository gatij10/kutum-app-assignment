'use client'

import ImageUpload from "../../components/ImageUpload"
import { useCreateQuote } from "../../hooks/useCreateQuote"


export default function CreateQuotePage() {
  const { text, setText, mediaUrl, setMediaUrl, error, handleSubmit } = useCreateQuote()

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Quote</h1>
      {error && <p className="text-red-500 mb-4" aria-live="polite">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="text" className="block mb-1">Quote Text</label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-2 border rounded text-black"
            required
          />
        </div>
        <ImageUpload onUpload={setMediaUrl} />
        {mediaUrl && (
          <div className="mt-2">
            <img src={mediaUrl} alt="Uploaded" className="max-w-full h-auto" />
          </div>
        )}
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Create Quote
        </button>
      </form>
    </div>
  )
}