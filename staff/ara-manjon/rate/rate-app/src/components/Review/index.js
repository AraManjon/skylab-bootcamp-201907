import React, { useState, useEffect } from 'react'
import logic from '../../logic'
import { withRouter } from 'react-router-dom'
import Rate from '../Rate'

export default function ({ onReview }) {
     return <>
        {/* User Author Info */}
        {/* <a href="#" onClick={event =>{
                event.preventDefault()

                history.push(`/profile/${onReview.author.id}`)
        }}><img src={}>{onReview.author.image}</img></a>
        <div className="rate">{ onReview.author.averageRate}</div>
        <p className="username">{onReview.author.username}</p> */}
        {/* Review Info */}
        <p>{onReview.comment}</p>
        <time dateTime={onReview.date}>{onReview.date}</time>
        <Rate value={onReview.rate} />
    </> 
}