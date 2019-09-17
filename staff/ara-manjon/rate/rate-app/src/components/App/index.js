import React, { useState, useEffect } from 'react'
import { Route, withRouter } from 'react-router-dom'
import logic from '../../logic'
import Context from '../Context'

import './index.sass'

import Profile from '../Profile'
import Hello from '../Hello'
import Register from '../Register'
import Login from '../Login'
import Raters from '../Raters'
import Search from '../Search'
import Bye from '../Bye'
import RateUser from '../RateUser'
import ReviewsUser from '../ReviewsUser'

export default withRouter(function ({ history }) {
  const [view, setView] = useState(logic.isUserLoggedIn() ? 'profile' || 'raters' || 'search' : undefined) 
  const [raters, setRaters] = useState()
  

/* LOGIN - AUTHENTICATE - REGISTER */

  const handleLogin = async (email, password) => {
    try {
      await logic.authenticateUser(email, password)
      setView('profile')
      history.push(`/profile/${logic.getUserId()}`)    
    } catch ({ message }) {
      console.log('fail login', message)
    }
  }

 const handleGoToLogin = () =>{

    setView('login')
    history.push('/login')
  } 

const handleGoToRegister = ()=> {
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

/* GO TO RATERS */
const callback = users => {
  setRaters(users)
}

const handleGoToUsersToRate= event => {  
  event.preventDefault()
  asyncRetrieveUsersGeo()
  setView('rating')
  history.push('/raters')
}

/* REFRESH GEOLOCATION USER */

useEffect(() => {
  if (logic.isUserLoggedIn()) {
      async function asyncUpdateGeo() {
          try {
            await logic.updateGeo()
            asyncRetrieveUsersGeo()

          } catch (error) {
              console.log(error.message)
          }
      }

      const interval = setInterval(function () { 
        asyncUpdateGeo() 
      }, 5000)
     
      return () => clearInterval(interval)
  }
}, [logic.isUserLoggedIn()])

//RETRIEVE USER GEO
 async function asyncRetrieveUsersGeo(){
    try {
        await logic.retrieveUsersGeo(callback)
    } catch (error) {
        console.log(error.message)
    }
} 


/* NAVIGATION */  
  const handleGoToSearch= event => {
    event.preventDefault()
    setView('search')
    history.push('/search')
  }

  const handleGoToMyRates= event => {
    event.preventDefault()
    setView('reviews')
    history.push('/reviews')
  }

  const handleGoToProfile= event => {
    event.preventDefault()
    setView('profile')
    history.push(`/profile/${logic.getUserId()}`) 
  }

  const handleLogout = event => { 
    event.preventDefault()
    history.push('/bye')          
    setView(undefined)
    logic.logUserOut()
  }
  

  return <div className="App">

    <header className="header-container">
      {logic.isUserLoggedIn() && /* view == "profile"  */ /* || view !== "search"  &&*/ <nav className="container-nav">        
        
        <div className="container-profile"><a href="" className="container-profile__link" onClick={handleGoToProfile}>PROFILE</a></div>
        
        <div className="container-menu">
            <input className="container-menu__input" type="checkbox"/>
                <span></span>
                <span></span>
                <span></span>
                <ul className="container-menu__hamburguer">
                    <li><a className="container-menu__a" href="" onClick={handleGoToSearch}>Search</a></li>
                    <li><a className="container-menu__a" href="" onClick={handleGoToMyRates} >My rates</a></li>
                    <li><a className="container-menu__a" href="" onClick={handleLogout}>Log Out</a></li>
                </ul>
        </div>

        <div className="container-logo">
          <a href="" className="container-logo__link"onClick={handleGoToUsersToRate}>RATE</a>
        </div>

      </nav>}
    </header>

    <main className="main-container">
    {!logic.isUserLoggedIn() &&
    <>
    <Route exact path="/" render={() => <Hello goRegister={handleGoToRegister} />} />
    <Route exact path="/register" render={() => <Register goLogin={handleGoToLogin}  onRegister ={handleRegister} />} />
    <Route exact path="/login" render={() => <Login goRegister={handleGoToRegister}  onLogin ={handleLogin} />} />
    <Route exact path="/bye" render={() => <Bye />} /></>}

    {logic.isUserLoggedIn() &&
    <> 
    <Context.Provider value = {{raters, setRaters, view, setView}}>  
    <Route exact path="/profile/:id" render={props => <Profile id={props.match.params.id}/>} />
    <Route exact path="/raters" render={() => <Raters />} />
    <Route exact path="/search" render={() => <Search />} />
    <Route exact path="/reviews" render={() => <ReviewsUser />} />
    <Route exact path="/rate/:id" render={props => <RateUser id={props.match.params.id}/>} />
    </Context.Provider> 
    </>}
    
    </main>

    <footer>

    </footer>
    </div>
})
