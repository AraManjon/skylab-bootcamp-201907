import React, { useContext } from 'react'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'
import Context from '../Context'

function Feedback({history, raterId}) {
    const {setView} = useContext(Context)
    
    const goBack = id => {        
        setView('profile')
        history.push(`/profile/${raterId}`)
    }
     return <>        
        <h3 className = "comment">You have already made a rate</h3>
        <a href="#" onClick={event => {
            event.preventDefault()

            goBack()
        }}>Close</a>
    </> 
}
export default withRouter(Feedback)