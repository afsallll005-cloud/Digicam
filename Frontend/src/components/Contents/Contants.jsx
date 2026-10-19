import React from 'react'
import './Contents.css'

function Contents({ title, description }) {
  return (
    <div id='ContantsContainer'>
      <div className="contentArea">
        <h2>{title}</h2>
        <h4>{description}</h4>
      </div>
    </div>
  )
}

export default Contents;
