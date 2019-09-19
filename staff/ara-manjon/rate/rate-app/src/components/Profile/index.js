import React, { useState, useEffect, useContext } from 'react'
import './index.sass'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'
import Review from '../Review'
import User from '../User'
import Context from '../Context'
                                  
export default withRouter(function ({ history, id }) {
    const [user, setUser] = useState() 
    const { setProfile , view, setView} = useContext(Context)

    useEffect(() => {
        (async () => {
            const user = await logic.retrieveUserProfile(id)            
            setUser(user)
            if(user.id === logic.getUserId()){
                setProfile(user)
            }
        })()
    }, [id])

    const handleGoToRating = async ( value ) => {
        setView('rate')
        history.push(`/rate/${value.id}`)        
    }

    return <>
        <section className="profile">           
            {/* User Info */}
            {user &&           
            <User  value={ user } type={'big'}/>}
            {/*user && <div className= "profile-user">
            <a href= "#" onClick={event =>{
                 event.preventDefault()
        
        
                handleGoToRating(user) 
            }}>
                <img className={"imgRedonda"} src={user.image}></img>
            </a>
                <div className= "info-user-photo">
                    <div className="rate-logged">{user.averageRate}</div>
                        <h4 className="user-log">{user.username}</h4>
                </div> 
        </div>*/}

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