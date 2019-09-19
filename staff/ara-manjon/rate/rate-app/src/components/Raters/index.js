import React, { useContext } from 'react'
import { withRouter } from 'react-router-dom'
import User from '../User'
import Context from '../Context'

export default withRouter(function () {
    const {raters} = useContext(Context)
    return <>
    {raters &&
     (<section className="profile">
        <div className= "profile__raters">
            <ul className= "raters"> {raters.map(item => <>
                <li key={item.id}><User value={item} type={'little'}/></li></>)}
            </ul>        
        </div>
    </section>)}
    </>
}) 
