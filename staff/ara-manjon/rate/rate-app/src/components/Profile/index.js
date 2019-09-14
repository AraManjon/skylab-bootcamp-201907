import React, { useState, useEffect } from 'react'
import './index.sass'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'
import Review from '../Review'
import User from '../User'

export default withRouter(function ({history, id, goToFile}) {
    const [user, setUser] = useState()

    useEffect(() => {
        (async () => {
            const user = await logic.retrieveUserProfile(id)
            setUser(user)
        })()
    }, [history.location])
debugger
    return <>

        <section>
            {/* User Info */}
            <div className= "profile__userInfo">
            <a href="#" onClick={event =>{
                event.preventDefault()
                goToFile()
            }}><img src=""/>Imagen User</a>
            {<div className="rate">{user && user.averageRate}</div>}
            {<p className="username">{user && user.username}</p>}
            </div>
            {/* <div className= "profile__userInfo"><User onUserInfo={user && user}/></div> */}
            {/* User Reviews */}
            <div className= "profile__reviews">
                <ul className= "reviews"> {user && user.reviews.map(review => <>
                    <li className= "review" key={review.id}><Review onReview={review}/></li>
                    </>)}
                </ul>        
            </div>
        </section>
    </>

})