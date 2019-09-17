import React, { useState, useEffect, useContext } from 'react'
import logic from '../../logic'
import './index.sass'
import { withRouter } from 'react-router-dom'
import Context from '../Context'



 function User({ history, value }) {
    const { view, setView } = useContext(Context)

    const handleSubmit = event => {
        event.preventDefault()
        const { target: { logo: { files: [logo] } } } = event
        handleUploadPhoto(logo)
    }
    
    const handleUploadPhoto = async ( logo ) => {
        try{
            await logic.updatePhoto(logo)
            history.push(`/profile/${logic.getUserId()}`)
        } catch ({ message }) {
            console.error(message)
        }        
    }

    const handleGoToRating = async ( value ) => {
        setView('rate')
        history.push(`/rate/${value.id}`)        
    }

    const handleGoToProfile = value  => {
        setView('profile')        
        history.push(`/profile/${value.id}`)
    }
        
    
/*     useEffect(() => {
        (async () => {
            history.push(`/profile/${logic.getUserId()}`)
        })()
    }, [user && user.image])  */
    

    return <>    

{/* Not profile User guest */}
    {logic.getUserId() !== value.id && view !== 'profile' &&
    <> <a href= "" onClick={event =>{
        event.preventDefault()

        handleGoToProfile(value)
    }}><img className="imgRedonda--little" src={value.image}></img></a>
    <div className="rate--little">{value.averageRate}</div>
    <h4 className= "username--little">{value.username}</h4>    
    </>}

{/* Profile User guest*/}
    {logic.getUserId() !== value.id && view === 'profile' &&
    <> <a href= "" onClick={event =>{
        event.preventDefault()
        
        //onUserToRate = ()
        handleGoToRating(value) 
    }}><img className="imgRedonda" src={value.image}></img></a>
    <div className="rate">{value.averageRate}</div>
    <h4 className= "username">{value.username}</h4>    
    </>}


{/* User logged in without image*/}    
    { logic.getUserId() === value.id && !value.image &&
    <> <form method='post' onSubmit={handleSubmit} encType="multipart/form-data"> 
            <label>            
                <input type="file" name="logo" /* onChange={handleSubmit} */></input>
            </label>            
                <button>> save</button>      
        </form>

        {<div className="rate">{value.averageRate}</div>}
        {<p className="username">{value.username}</p>}     
    </> }

{/* User logged in with image*/} 
    {logic.getUserId() === value.id && value.image &&
    <> <img className="image" src={value.image} className="imgRedonda"></img>
    <div className="rate">{value.averageRate}</div>
    <h4 className= "username">{value.username}</h4>    
    </>}
    </>
}
export default withRouter(User)


