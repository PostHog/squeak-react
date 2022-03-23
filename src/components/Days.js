import React from 'react'
export default function Days({ created }) {
  const today = new Date()
  const posted = new Date(created)
  const diff = today.getTime() - posted.getTime()
  const days = Math.round(diff / (1000 * 3600 * 24))
  return (
    <span>
      {days <= 0 ? 'Today' : `${days} day${days === 1 ? '' : 's'} ago`}
    </span>
  )
}
