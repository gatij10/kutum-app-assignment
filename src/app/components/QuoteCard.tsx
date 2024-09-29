import Image from 'next/image'

export default function QuoteCard({ quote }) {
  if (!quote) {
    return null
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="relative h-64">
        {quote?.mediaUrl ? (
          <Image
            src={quote?.mediaUrl}
            alt={quote?.text || 'Quote image'}
            layout="fill"
            objectFit="cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No image available</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <p className="text-white text-center">{quote.text || 'No quote text'}</p>
        </div>
      </div>
      <div className="p-4">
        <p className="font-bold">{quote.username || 'Unknown user'}</p>
        <p className="text-sm text-gray-500">
          {quote.createdAt 
            ? new Date(quote.createdAt).toLocaleString()
            : 'Date unknown'}
        </p>
      </div>
    </div>
  )
}