import React from "react"

interface LoadingStateProps {
  message?: string
}

export function LoadingState({ message = "Loading users..." }: LoadingStateProps) {
  return (
    <div className="flex items-center justify-center h-screen text-lg font-semibold">
      {message}
    </div>
  )
}

interface ErrorStateProps {
  message?: string
}

export function ErrorState({ message = "Error loading users. Please try again." }: ErrorStateProps) {
  return (
    <div className="flex items-center justify-center h-screen text-red-500 font-semibold">
      {message}
    </div>
  )
}