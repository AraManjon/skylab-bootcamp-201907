import React, { useState, useEffect } from 'react'
import './index.sass'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'
import Review from '../Review'

export default withRouter(function ({ history}) {
    const [user, setUser] = useState()


    useEffect(() => {
        (async () => {
            const {user} = await logic.retrieveUserProfile()
            debugger
            setUser(user) 
    
        })()
    }, [])
    debugger
    return <main className="profile">
        <ul className="profile__user--big">
            <li className="username">{user && user.username}</li>
            {<li className="rate">{user && user.averageRate }</li>}
        </ul>         
        <section className= "profile__reviews">
            <ul className= "reviews"> {user && user.reviews.map(review => <>
                {/* <li className="reviews__username" key='0'>{author.username}</li>
                <li className="reviews__rate" key='1'>{author.rate}</li> */}
                <li><Review author={review} /></li>
                </>)}
            </ul>        
        </section>
    </main>
})