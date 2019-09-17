import React, { useState, useEffect } from 'react'
import './index.sass'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'
import Review from '../Review'
import User from '../User'
                                  
export default withRouter(function ({ id }) {
    const [user, setUser] = useState() 

    useEffect(() => {
        (async () => {
            const user = await logic.retrieveUserProfile(id)            
            setUser(user)
        })()
    }, [id])

    return <>
        <section className="profile">           
            {/* User Info */}
            <div className= "profile__user">
            {user &&           
            <User value={ user }/> }
            </div>

            {/* User Reviews */}
            <div className= "profile__reviews">
                <ul className= "reviews">
                    {user && !user.reviews.length>0 && <><li className="review">(· -,·)</li>
                    <li className="title__medium">Not reviews yet</li></>} 
                    {user && user.reviews.map(review => <>
                    <li className= "review" key={review.id}><Review onReview={review}/></li>
                    </>)}
                </ul>        
            </div>
        </section>
    </>

})