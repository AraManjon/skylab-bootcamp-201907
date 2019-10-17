import logic from '..'
import { database, models } from 'rate-data'

const { random } = Math
const { User, Review } = models

import jwt from 'jsonwebtoken'

const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST


describe('logic - retrieve review',() => {
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    let name, surname, username, email, password, id, review
    let name1, surname1, username1,  email1, password1
    let name2, surname2, username2,  email2, password2
    let name3, surname3, username3,  email3, password3
    let user, user1, user2, user3
    let id1, id2, id3
    let comment, response, rate, date, review2
    
    beforeEach(async () => {
        //user
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        username = `username-${Math.random()}`
        password = `password-${Math.random()}`
        email = `email-${Math.random()}@domain.com`

        //user1
        name1 = `name-${Math.random()}`
        surname1 = `surname-${Math.random()}`
        username1 = `username-${Math.random()}`
        password1 = `password-${Math.random()}`
        email1 = `email-${Math.random()}@domain.com`
        
        //user2
        name2 = `name-${Math.random()}`
        surname2 = `surname-${Math.random()}`
        username2 = `username-${Math.random()}`
        password2 = `password-${Math.random()}`
        email2 = `email-${Math.random()}@domain.com`
       
        //user3
        name3 = `name-${Math.random()}`
        surname3 = `surname-${Math.random()}`
        username3 = `username-${Math.random()}`
        password3 = `password-${Math.random()}`
        email3 = `email-${Math.random()}@domain.com`

        //clean users in database
        await User.deleteMany()

        //create users
        user = await User.create({ name, surname, username, email, password })
        id = user.id

        user1 = await User.create({ name: name1, surname: surname1, username: username1,  email: email1, password: password1})
        id1 = user1.id

        user2 = await User.create({ name: name2, surname: surname2, username: username2,  email: email2, password: password2 })
        id2 = user2.id

        user3 = await User.create({ name: name3, surname: surname3, username: username3, email: email3, password: password3 })        
        id3 = user3.id

        const token = jwt.sign({ sub: id }, REACT_APP_JWT_SECRET_TEST)

        logic.__token__ = token

        
        //info review
        comment=`comment-${random()}`
        response=`response-${random()}`
        rate= 2
        date= new Date
        
        //clean reviews in database
        await Review.deleteMany()

        //create first review to user1       
        review = await Review.create({comment, rate, date, author: user._id.toString(), owner: user1.id})
        review.id = review._id.toString()
        user1.reviews.push(review.id)
        
        //create second review to user2
        review2 = await Review.create({comment, rate, date, author: user._id.toString(), owner: user2.id})
        review2.id = review2._id.toString()
        user2.reviews.push(review2.id)
            
    })

    it('should succeed on correct retrieve reviews', async() => {

        const results = await logic.retrieveReviews()
        expect(results).toBeDefined()         
        expect(results.length).toEqual(2)

        results.forEach((result, index)=>{
            expect(result).toBeDefined()
            expect(result.rate).toBeDefined()
            expect(result.rate).toEqual(rate)
            expect(result.comment).toBeDefined()
            expect(result.comment).toEqual(comment)
            expect(result.date).toBeDefined()

            expect(result.author).toBeDefined()
                          
        })
        expect(results[0].owner.id).toEqual(user1.id)
        expect(results[1].owner.id).toEqual(user2.id)            
    })
        afterAll(() => database.disconnect())
})