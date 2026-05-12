import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar,faStarHalfStroke  } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";



export default function Rating({rating}) {

  
  function getStarIcon(position){
    if(rating >= position){
      return solidStar;
    }
    else if(rating >= position - 0.5){
      return faStarHalfStroke;
    }
    else{
      return regularStar;
    }
  }

  return (
   <>
   <div className='star text-yellow-400'>
    {[1,2,3,4,5].map((position) =>(
      <FontAwesomeIcon key={position} icon={getStarIcon(position)}/>
    ))}
   </div>
   </>
  )
}