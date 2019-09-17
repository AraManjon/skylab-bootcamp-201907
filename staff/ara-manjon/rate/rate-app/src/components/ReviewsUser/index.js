import React, { useState, useEffect } from 'react'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'
import Review from '../Review'
                                  
export default withRouter(function () {
    const [reviewsUser, setReviews] = useState()
     

    useEffect(() => {
        (async () => {
            try {
                const reviewsUser = await logic.retrieveReviews()            
                setReviews(reviewsUser)
            } catch({message}) {
                console.log(message)                  
            }
        })()
    }, [])

    return <>
    {/* reviewsUser &&
            <><section className="reviews">            
            <h3>Reviews</h3>
       </section></> */}

        <section className="reviews"> 
      
            {/* User Info */}
            {/* <div className= "profile__reviews">
            {user &&           
            <User value={ user }/> }
            </div> */}

            {/* User Reviews */}
            <div className= "profile__reviews">
                <ul className= "reviews">
                    {reviewsUser && !reviewsUser.length>0 && <><li className="review">(· -,·)</li>
                    <li className="title__medium">Not reviews yet</li></>}
                    {reviewsUser && reviewsUser.map(review => <>
                    <li className= "review" key={review.id}><Review onReview={review}/></li>
                    </>)}
                </ul>        
            </div>
        </section> 
    </>

})