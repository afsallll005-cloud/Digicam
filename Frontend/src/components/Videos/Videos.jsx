// import React from 'react'

// function Videos() {
//   return (
//     <div>
//       <video src="../public/videos/gopro.mp4"></video>
//     </div>
//   )
// }

// export default Videos


// import React from 'react';
// import './Videos.css'

// function Videos() {
//   return (
//     <div>
//       <video  controls>
//         <source src="/videos/gopro.mp4" type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>
//     </div>
//   );
// }

// export default Videos;




import React from "react";
import "./Videos.css";

function Videos() {
  return (
    <div className="hero">
      <video className="heroVideo" autoPlay controls>
        <source src="/videos/gopro.mp4" type="video/mp4" />
      </video>

      <div className="heroContent">
        <h1>THE ORIGINAL ACTION CAMERA</h1>
        <p>
          With 20+ years of innovation and stoke, GoPro has changed how we
          capture the world.
        </p>

        <div className="buttons">
          <button className="btnPrimary">SEE THE LINEUP</button>
          <button className="btnSecondary">WATCH VIDEO</button>
        </div>
      </div>
    </div>
  );
}

export default Videos;