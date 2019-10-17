import registerUser from './register-user'
import authenticateUser from './authenticate-user'
import isUserLoggedIn from './is-user-logged-in'
import logUserOut from './log-user-out'
import retrieveUserProfile from './retrieve-user-profile'
import getUserId from './get-user-id'
import retrieveUsersGeo from './retrieve-users-geo'
import updatePhoto from './update-photo'
import updateGeo from './update-geo'
import registerReview from './register-review'
import accessToReview from './access-to-review'
import retrieveReviews from './retrieve-reviews'

export default {
     set __token__(token) {
        sessionStorage.token = token
    },

    get __token__() {
        return sessionStorage.token
    }, 

    registerUser,
    authenticateUser,
    isUserLoggedIn,
    logUserOut,
    retrieveUserProfile,
    getUserId,
    retrieveUsersGeo,
    updatePhoto,
    updateGeo,
    registerReview,
    accessToReview,
    retrieveReviews

}