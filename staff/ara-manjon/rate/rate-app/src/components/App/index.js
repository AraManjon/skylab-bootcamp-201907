import React, { useState, useEffect } from 'react'
import { Route, withRouter } from 'react-router-dom'
import logic from '../../logic'

import './index.sass'

import Profile from '../Profile'
import Hello from '../Hello'
import Register from '../Register'
import Login from '../Login'

export default withRouter(function ({ history }) {
  const [view, setView] = useState(logic.isUserLoggedIn() ? 'profile' : undefined)
  const [checked, setChecked] = useState(false)
  


  function handleChange(checked) {
    setChecked( checked )
    checked === true && history.push('/register')
  }
  

  const handleLogin = async (email, password) => {
    try {
      await logic.authenticateUser(email, password)

      setView('profile')
      history.push('/profile')
    } catch ({ message }) {
      console.log('fail login', message)
    }
  }

 const handleGoToLogin = () =>{

    setView('login')
    history.push('/login')
  } 

const handleGoToRegister= ()=> {
    setView('register')
    history.push('/register')
  } 

  const handleRegister = async (name, surname,username, email, password) => {
    try {
      await logic.registerUser(name, surname, username, email, password)

      history.push('/login')
    } catch ({ message }) {
      console.log('fail register', message)
    }
  }
  const handleUserAuthor = ()=>{
    
  }

  const handleGoToUsersNears= ()=> {
    history.push('/users-to-rate')
  } 
  const handleGoToSearch= ()=> {
    history.push('/search')
  } 
  const handleGoToMyRates= ()=> {
    history.push('/my-rates')
  }

  const handleLogout = () => {
    logic.logUserOut()

    setView(undefined)
    history.push('/')
  }
  


  return <div className="App">

    <header>
      {view == "profile" && <nav>        
        <div><a href="" onClick={handleGoToUsersNears}>LOGO</a></div>
        <div>
            <input type="checkbox"/>
                <span></span>
                <span></span>
                <span></span>
                <ul className="menu">
                    <li><a href="" onClick={handleGoToSearch}>Search</a></li>
                    <li><a href="" onClick={handleGoToMyRates} >My rates</a></li>
                    <li><a href="" onClick={handleLogout}>Log Out</a></li>
                </ul>
        </div>
      </nav>}
    </header>


    {/*     <div className="menuToggle">
                        <input type="checkbox" />
                        <span></span>
                        <span></span>
                        <span></span>
                        <ul className="menu">
                            <li><a href="" onClick={handleGoToFavorites}>Favorites</a></li>
                            <li><a href="" onClick={handleGoToMenuCollections} >Collections</a></li>
                            <li><a href="" onClick={handleLogOut}>Log Out</a></li>
                        </ul>
                    </div> */}
    

    {/* <Route path="/" render={()=> <Hello startApp={handleGoToRegister}/>}/> */}

    <Route exact path="/" render={() => <Hello toChange={handleChange} onChecked={checked} />} />
    <Route exact path="/register" render={() => <Register goLogin={handleGoToLogin}  onRegister ={handleRegister} />} />
    <Route exact path="/login" render={() => <Login goRegister={handleGoToRegister}  onLogin ={handleLogin} />} />
    {logic.isUserLoggedIn() && <Route path="/profile" render={() => <Profile goToUserAuthor={handleUserAuthor}/* onLogout={handleLogout} *//>} />}
  </div>
})
