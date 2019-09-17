import React, { useContext } from 'react'
import Rate from '../Rate'
import User from '../User'
import Context from '../Context'


export default function ({ onReview }) {
    const {view} = useContext(Context)
     return <>
        {/* User Author Info */} 
        {view !== 'profile' ? <User value = {onReview.owner}/> : <User value = {onReview.author}/>}                
        {/* Review Info */}        
        <p className = "comment">{onReview.comment}</p>
        <time dateTime={onReview.date} className = "date">{onReview.date}</time>
        <Rate value={onReview.rate} />
    </> 
}