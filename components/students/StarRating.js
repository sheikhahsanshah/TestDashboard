"use client"
import { Star } from "lucide-react"

// Component for Star Rating Input (Restored handler)
const StarRating = ({ rating, setRating }) => {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setRating(star)}
          className={`p-1 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-yellow-500 ${
            star <= rating ? "text-yellow-400 hover:text-yellow-300" : "text-gray-600 hover:text-gray-500"
          }`}
        >
          <Star size={24} fill={star <= rating ? "currentColor" : "none"} />
        </button>
      ))}
    </div>
  )
}

export default StarRating
