import React from 'react'

export default function({value}) {

    
    return <>
        {(() => {
            const stars = []

            for(let i = 0; i < value; i++)
                stars.push(<span className= "stars">⭐️</span>)

            return stars
        })()}

    </>
}