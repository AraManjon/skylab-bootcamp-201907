import React, { useContext } from 'react'
import './index.sass'
import Rate from '../Rate'
import User from '../User'
import Context from '../Context'
import './index.sass'


export default function ({ onReview }) {
    const {view} = useContext(Context)
    const user = view !== 'profile' ? onReview.owner: onReview.author               
     return <>
        {/* User Author Info */} 
        {view !== 'profile' ? <User value = {onReview.owner} type={'little'}/> : <User value = {onReview.author} /* type={'little'} *//>}                
        {/* Review Info */}
        {/* <img src={user.image} className="imgRedonda--little"></img>
        <div className= "info-user-photo">
            <h4 className="user-log">{user.username}</h4>
        </div> */}      
        <div className= "info">  
        <div className = "rate-star"><Rate value={onReview.rate} /></div>
        <time dateTime={onReview.date} className = "date">{onReview.date}</time>
        <p className= "comment">{onReview.comment}</p>
        </div>      
    </> 
}