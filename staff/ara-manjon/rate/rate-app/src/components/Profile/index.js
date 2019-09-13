import React, { useState, useEffect } from 'react'
import './index.sass'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'

export default withRouter(function ({ history}) {
    const [user, setUser] = useState()
    const [averageRate, setAverageRate] = useState()
    const [authorComplete, setAuthorComplete] = useState()
    const [reviewsUserComplete, setReviewsUserComplete] = useState()

    useEffect(() => {
        (async () => {
            const {user, averageRate, authorComplete, reviewsUserComplete } = await logic.retrieveUserProfile()

            setUser(user)
            setAverageRate(averageRate)
            setAuthorComplete(authorComplete)
            setReviewsUserComplete(reviewsUserComplete)
            debugger
        })()
    }, [])
    debugger
    return <main className="profile">
        <ul className="profile__user--big">
            <li className="username">{user && user.username}</li>
            <li className="rate">{averageRate && averageRate}</li>
        </ul>         
        {/* <ul className= "authors"> {authorComplete && authorComplete.map(author => <li className="authorList" key='0'>{author.username}</li>)}</ul> */}
        <section className= "profile__reviews">
            <ul className= "reviews"> {authorComplete && reviewsUserComplete && authorComplete.map(author => 
                <li className="reviews__username" key='0'>{author.username}</li>
                <li className="reviews__rate" key='1'>{author.rate}</li>)}
            </ul>        
        </section>
        <ul className= "reviews"> {reviewsUserComplete && reviewsUserComplete.map(review => <li className="authorList" key='40'>{review.author}</li>)}</ul>
         


        {/*  <ul><li>{user.surname}</li></ul>  */}
    </main>
})