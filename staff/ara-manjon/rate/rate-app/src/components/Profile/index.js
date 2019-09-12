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

    return <main className="profile">
        <ul>
            <li>{user && user.username}</li>
            <li>{averageRate && averageRate}</li>
        </ul>
         
        <ul className= "authors"> {reviewsUserComplete && reviewsUserComplete.map(review => <li className="authorList" key={ review.author }></li>)}</ul>
         

        {/*  <ul><li>{user.surname}</li></ul>  */}
    </main>
})