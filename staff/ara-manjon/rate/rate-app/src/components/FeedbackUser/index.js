import React from 'react'
function FeedbackUser({ message }){
    return  <div className="feedback__container"> 
                <p className ={`feedback__text feedback__text--${message ? 'active' : 'inactive'}`}>{message}</p>
            </div>
}
export default FeedbackUser