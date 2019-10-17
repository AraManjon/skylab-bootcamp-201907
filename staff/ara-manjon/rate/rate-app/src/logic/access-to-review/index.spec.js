import logic from '..'
import { database, models } from 'rate-data'

const { random } = Math
const { User, Review } = models

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST


describe('logic - access a review', () => {

    beforeAll(() =>  database.connect(REACT_APP_DB_URL_TEST))

    let name, surname, email, username, password, longitude, latitude, id
    let name1, surname1, username1,  email1, password1, longitude1, latitude1, id1
    let name2, surname2, username2,  email2, password2, id2
    let comment, rate, date, response, review
    let user, user1, user2
    
    beforeEach(async () => {

        //user in skylab
        name = `name-${random()}`
        surname = `surname-${random()}`
        username = `username-${random()}`
        email = `email-${random()}@domain.com`
        password = `password-${random()}`
        longitude= 2.199926
        latitude= 41.398414

        //user1 near skylab
        name1 = `name-${random()}`
        surname1 = `surname-${random()}`
        username1 = `username-${random()}`
        password1 = `password-${random()}`
        email1 = `email-${random()}@domain.com`
        longitude1 = 2.199955
        latitude1 = 41.398425

        //user2 near skylab
        name2 = `name-${random()}`
        surname2 = `surname-${random()}`
        username2 = `username-${random()}`
        password2 = `password-${random()}`
        email2 = `email-${random()}@domain.com`

        //delete user database
        await User.deleteMany()

        //user skylab
        const location = {type: 'Point', coordinates: [longitude, latitude]}
        user = await User.create({ location, name, surname, username, email, password })
        id = user.id

        //user1 near skylab
        const location1 = {type: 'Point', coordinates: [longitude1, latitude1]}
        user1 = await User.create({ location: location1, name: name1, surname: surname1, username: username1,  email: email1, password: password1})
        id1 = user1.id

        const token = jwt.sign({ sub: id }, REACT_APP_JWT_SECRET_TEST)

        logic.__token__ = token
        
        //user2 near skylab
        const location2 = {type: 'Point', coordinates: [longitude1, latitude1]}
        user2 = await User.create({ location: location2, name: name2, surname: surname2, username: username2,  email: email2, password: password2})
        id2 = user2.id

        //delete reviews data base
        await Review.deleteMany()

        //review added to user1            
        comment=`comment-${random()}`
        response=`response-${random()}`        
        rate= 2
        date= new Date().toString()
        review = await Review.create({comment, rate, date, author: user2._id.toString(), owner: user1.id})
        user1.reviews.push(review.id)
        await user1.save() 
    })

    it('should succeed on correct access a review', async () =>{

        const response = await logic.accessToReview(id1)        
        expect(response).toBeUndefined()
    })

    it('should fail on non correct access a review', async () =>{
        try{
            await logic.accessToReview(id2) 
        }catch({message}){
            expect(message).toEqual('you have already rate')            
        }
    })

    it('should fail on user id is not a string', async () =>{

        expect(()=> 
            logic.accessToReview(123)
        ).toThrow(Error, 'id with value 123 is not a string')

    })

    it('should fail on non correct user id', async () =>{
        const fakeid = '5e711645a4734dc78985edb0'
        
        try{
            await logic.retrieveUserProfile(fakeid) 
        }catch({message}){
            expect(message).toBeDefined()            
        }
    })


    it('should fail on user id is empty or blank', async () =>{
        expect(()=> 
            logic.accessToReview('')
        ).toThrow(Error, 'id is empty or blank')
        
    })    

    afterAll(() => database.disconnect())
})