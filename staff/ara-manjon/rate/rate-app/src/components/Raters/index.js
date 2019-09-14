/* import React, { useState, useEffect } from 'react'
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
    }, [])

    return <>

    <section className="profile">

        <div className="profile__userInfo">
        
        <User user ={user} />
              
        </div>
        <div className= "profile__reviews">
            <ul className= "reviews"> {user && user.reviews.map(review => <>
                <li key={review.id}><Review review={review} /></li>
                </>)}
            </ul>        
        </div>
    </section>
    </>
}) */