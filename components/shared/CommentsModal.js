"use client"

import { useState, useRef, useEffect } from "react"
import { Lock, Eye } from "lucide-react"
import { useOnClickOutside } from "../../utils/hooks"

// Modal Component for Session Comments (Restored state and handlers)
const CommentsModal = ({ isOpen, onClose, onSaveComments, initialPrivateComment = "", initialPublicComment = "" }) => {
  const [privateComment, setPrivateComment] = useState(initialPrivateComment)
  const [publicComment, setPublicComment] = useState(initialPublicComment)
  const modalRef = useRef(null)

  useOnClickOutside(modalRef, onClose)

  useEffect(() => {
    if (isOpen) {
      setPrivateComment(initialPrivateComment)
      setPublicComment(initialPublicComment)
    }
  }, [isOpen, initialPrivateComment, initialPublicComment])

  const handleSave = () => {
    onSaveComments(privateComment, publicComment)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div ref={modalRef} className="bg-gray-800 rounded-lg shadow-xl w-full max-w-lg p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">Comentaris de la Sessió</h2>
        <div className="mb-4">
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-1">
            <Lock size={14} className="text-yellow-400" />
            <span>Comentaris Privats (Professors)</span>
          </label>
          <textarea
            value={privateComment}
            onChange={(e) => setPrivateComment(e.target.value)}
            rows="4"
            placeholder="Afegeix notes internes per a altres professors..."
            className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-500"
          ></textarea>
        </div>
        <div className="mb-6">
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-1">
            <Eye size={14} className="text-green-400" />
            <span>Comentaris Públics (Tothom)</span>
          </label>
          <textarea
            value={publicComment}
            onChange={(e) => setPublicComment(e.target.value)}
            rows="4"
            placeholder="Afegeix comentaris visibles per a alumnes i pares..."
            className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-500"
          ></textarea>
        </div>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md text-sm font-medium text-gray-300 bg-gray-600 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500"
          >
            Cancel·lar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
          >
            Desar Comentaris
          </button>
        </div>
      </div>
    </div>
  )
}

export default CommentsModal
