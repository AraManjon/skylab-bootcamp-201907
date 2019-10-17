import React, { useState, useEffect, useContext } from 'react'
import logic from '../../logic'
import './index.sass'
import { withRouter } from 'react-router-dom'
import Context from '../Context'
import Feedback from '../Feedback'

export default withRouter(function ({ history, id }) {
    const {setView, raters} = useContext(Context)    
    const [printForm, setPrintForm] = useState(undefined)
    const [user, setUser] = useState(undefined) 
    const [feedback, setFeedback] = useState(undefined) 
    
    useEffect(() => {
        (async() => {
            if(raters){
                const userToRate = raters.filter(rater => rater.id === id)
                setUser(userToRate)
            }
            if (raters.find(rater => rater.id === id)) {
                try {
                    await logic.accessToReview(id)
                    
                    setPrintForm(true)
                } catch({message}) {
                    setFeedback(true)                  
                }
            }else{
                setView('profile')
                history.push(`/profile/${id}`)
            }            
        })()
    }, [])

    
    const handleToRegisterReview = async (id, comment, rate) => {
        try {
            rate = Number(rate)
            await logic.registerReview(id, comment, rate)
            
            setView('profile')
            history.push(`/profile/${id}`)
            
        } catch({message}) {
            console.log(message)
        }
    }
    
    const goBack = () => {
        
        setView('profile')
        history.push(`/profile/${id}`)
    }
    
    return <> {printForm && user && !feedback &&
        <><section>
         <h3>{user.username}</h3>
    </section>
    <form class="rate-form" method="post" onSubmit={event => {
        event.preventDefault()
        const {target:{ comment: { value: comment }, rate: { value: rate } } } = event
        handleToRegisterReview(id, comment, rate)
    }}>
        <div class="rate-big">
            <input type="radio" id="star5" name="rate" value="5" />
            <label for="star5" title="text">5 stars</label>
            <input type="radio" id="star4" name="rate" value="4" />
            <label for="star4" title="text">4 stars</label>
            <input type="radio" id="star3" name="rate" value="3" />
            <label for="star3" title="text">3 stars</label>
            <input type="radio" id="star2" name="rate" value="2" />
            <label for="star2" title="text">2 stars</label>
            <input type="radio" id="star1" name="rate" value="1" />
            <label for="star1" title="text">1 star</label>
        </div>
         <button className="send">Rate</button>
        <div>
            <textarea class="comment" name="comment"></textarea>
        </div>
    <a class="close-rate" href="#" onClick={event => {
            event.preventDefault()

            goBack()
        }}>Close</a>
    </form>

</>}
        {feedback && <Feedback raterId={ id }/>}
    </>
}) 

