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
      history.push(`/profile/${logic.getUserId()}`)
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


  const handleGoToUsersToRate= async () => {
    try {
      await logic.updateLocation()
    } catch ({ message }) {
      console.log('fail update users location', message)
    }
  }
/*   const callback = dogs => {
    setDogs(dogs)
    history.push('/searchResults')
  }

  async function handleSearch(distance, breed, gender, size, age, neutered, withDogs, withCats, withChildren) {
    try {
      await logic.search(distance, breed, gender, size, age, neutered, withDogs, withCats, withChildren, callback)
    } catch ({ message }) {
      console.log('something went wrong with search', message)
    }
  } */


/*    const handleUsersToRate = async () => {
    try {
      await logic.retrieveUsersToRate(resultsGeolocation)

      history.push(`/raters`)
    } catch ({ message }) {
      console.log('fail retrieved users geolocation', message)
    }
  } */

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
        <div><a href="" onClick={handleGoToUsersToRate}>LOGO</a></div>
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

    <main>
    <Route exact path="/" render={() => <Hello toChange={handleChange} onChecked={checked} />} />
    <Route exact path="/register" render={() => <Register goLogin={handleGoToLogin}  onRegister ={handleRegister} />} />
    <Route exact path="/login" render={() => <Login goRegister={handleGoToRegister}  onLogin ={handleLogin} />} />
    <Route path="/profile/:id" render={props => logic.isUserLoggedIn() &&  <Profile id={props.match.params.id} /* onUserAuthor={handleUserAuthor} */ /* goUserAuthor={handleToUserAuthor} author={authorId} *//>} />
    {/* <Route path="/raters" render={() => logic.isUserLoggedIn() &&  <Raters onUsersToRate={handleUsersToRate}  />} /> */}
    </main>

    <footer>

    </footer>
    </div>
})
