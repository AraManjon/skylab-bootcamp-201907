import React, { useState, useEffect, useContext } from 'react'
import logic from '../../logic'
import './index.sass'
import { withRouter } from 'react-router-dom'
import Context from '../Context'



 function User({ history, value, type }) {
    const { view, setView, profile } = useContext(Context)

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
    }}><img className={ type === 'big' ?"imgRedonda":"imgRedonda--little"} src={value.image}></img></a>
    <div className="rate--little">{value.averageRate}</div>
    <h4 className= "user--little">{value.username}</h4>    
    </>}

{/* Profile User guest*/}
    {logic.getUserId() !== value.id && view === 'profile' &&
    <> <div className="info-photo"></div><a href= "" onClick={event =>{
        event.preventDefault()
        
        
        handleGoToRating(value) 
    }}><img className={ type === 'big' ?"imgRedonda":"imgRedonda--little"} src={value.image}></img></a>
    <div className= "info-user-photo">
    <div className="rate-logged">{value.averageRate}</div>
    <h4 className= { type === 'big' ? "user-log":"info-user-photo"}>{value.username}</h4>
    </div>  
    </>}


{/* User logged in without image*/}    
    { logic.getUserId() === value.id && type === 'big' && !value.image &&
    <> <form className= "charge-photo-form" method='post' onSubmit={handleSubmit} encType="multipart/form-data"> 
            <label className= "charge-photo-lbl">            
                <input className= "charge-photo-inpt" type="file" name="logo" title="Image"></input>
            </label>            
                <button className= "charge-photo-save">> charge file and save</button>      
        </form>
        <div className= "info-user-photo">
        {<div className="rate-logged">{value.averageRate}</div>}
        {<p className="user-log">{value.username}</p>}
        </div>     
    </> }

    { logic.getUserId() === value.id && !value.image && type === 'little' &&
    <> <a href= "" onClick={event =>{
        event.preventDefault()

        handleGoToProfile(value)
    }}><img className={"imgRedonda--little"} src={value.image}></img></a>  








        {/* <a>
            
            <div className= "imgRedonda--little"></div>     
        </a> */}
        <div className= "info-user-photo">
        {<div className="rate-logged">{value.averageRate}</div>}
        {<p className="user-little">{value.username}</p>}
        </div>      
    </> }

{/* User logged in with image*/} 
    {logic.getUserId() === value.id && value.image && 
    
    <> <img src={value.image} className={ type === 'big' ?"imgRedonda":"imgRedonda--little"}></img>
    <div className= "info-user-photo">
    <div className="rate-logged">{value.averageRate}</div>
    <h4 className={ type === 'big' ? "user-log":"info-user-photo"}>{value.username}</h4>
    </div>      
    </>}
    </>
}
export default withRouter(User)


