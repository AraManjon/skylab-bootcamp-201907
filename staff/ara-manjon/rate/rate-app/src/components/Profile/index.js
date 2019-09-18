import React, { useState, useEffect, useContext } from 'react'
import './index.sass'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'
import Review from '../Review'
import User from '../User'
import Context from '../Context'
                                  
export default withRouter(function ({ id }) {
    const [user, setUser, view] = useState() 
    const { setProfile } = useContext(Context)

    useEffect(() => {
        (async () => {
            const user = await logic.retrieveUserProfile(id)            
            setUser(user)
            if(user.id === logic.getUserId()){
                setProfile(user)
            }
        })()
    }, [id])

    return <>
        <section className="profile">           
            {/* User Info */}
            <div className= "profile-user">
            {user &&           
            <User value={ user }/> }
            </div>

            {/* User Reviews */}
            <div className= "profile__reviews">
                <ul className= "reviews-list">
                    {user && !user.reviews.length>0 &&  <><li className="not-review">(· -,·)</li>
                    <li className="not-review__title">Not reviews yet</li></>} 
                    {user && user.reviews.map(review => <>
                    <li className= "review" key={review.id}><Review onReview={review}/></li>
                    </>)}
                </ul>        
            </div>
        </section>
    </>

})