import React, { useContext } from 'react'
import './index.sass'
import Rate from '../Rate'
import User from '../User'
import Context from '../Context'
import './index.sass'


export default function ({ onReview }) {
    const {view} = useContext(Context)
     return <>
        {/* User Author Info */} 
        {view !== 'profile' ? <User value = {onReview.owner}/> : <User value = {onReview.author}/>}                
        {/* Review Info */}
        <div className= "info">  
        <div className = "rate-star"><Rate value={onReview.rate} /></div>
        <time dateTime={onReview.date} className = "date">{onReview.date}</time>
        <p className= "comment">{onReview.comment}</p>
        </div>      
    </> 
}