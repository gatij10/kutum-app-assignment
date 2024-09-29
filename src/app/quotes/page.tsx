'use client'

import Link from 'next/link'
import { useQuotes } from '../hooks/useQuotes'
import QuoteCard from '../components/QuoteCard'

export default function QuotesPage() {
  const { quotes, hasMore, isLoading, error, fetchQuotes } = useQuotes()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Quotes</h1>
      {error && <p className="text-red-500 mb-4">Error: {error}</p>}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {quotes.map((quote,idx) => (
          <QuoteCard key={`${quote.id}-${idx}`} quote={quote} />
        ))}
      </div>
      {isLoading && <p className="mt-4">Loading...</p>}
      {hasMore && !isLoading && (
        <button 
          onClick={fetchQuotes} 
          className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Load More
        </button>
      )}
      <Link 
        href="/quotes/create" 
        className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        aria-label="Create new quote"
      >
        +
      </Link>
    </div>
  )
}