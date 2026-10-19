import React from 'react'
import './BottomSignup.css'

function BottomSignup() {
  return (
    <div className="signupContainer">
      
      <div className="signupLeft">
        <h2>Get exclusive offers and updates</h2>
        <p>
          By signing up, you agree to our{" "}
          <span>Privacy Policy</span> and <span>Terms of Use</span>.
        </p>
      </div>

      <div className="signupCenter">
        <input
          type="email"
          placeholder="Enter your email address"
        />
        <button>SIGN UP</button>
      </div>

    </div>
  )
}

export default BottomSignup
