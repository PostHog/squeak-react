import React from 'react'

export function Approval({ handleConfirm }) {
  return (
    <div className='squeak-post-preview-container'>
      <h3>Approval needed</h3>
      <p>
        Your question needs to be approved before it will appear here. Check
        back soon!
      </p>
      <button onClick={handleConfirm} className='squeak-post-button'>
        Got it
      </button>
    </div>
  )
}
