import React, { useState } from 'react';

import { IoStarOutline } from "react-icons/io5";

export function StarMarker(){
  const [isStarMarked, setIsStarMarked] = useState(false)

  function handleStarClick () {
    setIsStarMarked(!isStarMarked);
  }

  return(
    <div className="star-marker"
     onClick={handleStarClick}>
      <IoStarOutline className={isStarMarked ? 'star-marked' : ''}/>
      <span className="star-text">{isStarMarked ? 'Starred' : 'Not Starred'}</span>
    </div>
  )

}