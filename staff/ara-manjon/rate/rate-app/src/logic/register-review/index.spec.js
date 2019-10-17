import logic from '..'
import { database, models } from 'rate-data'

const { random } = Math
const { User, Review } = models

import jwt from 'jsonwebtoken'

const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST


 describe('logic - register a review', () => {
    beforeAll(() =>  database.connect(REACT_APP_DB_URL_TEST))

    let name, surname, email, username, password, longitude, latitude, id
    let name1, surname1, username1, email1, password1, longitude1, latitude1, id1
    let name2, surname2, username2, email2, password2, id2
    let comment, rate, review, comment1, rate1, date1, response1
    let user, user1, user2

    
    beforeEach(async () => {

        //user skylab
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
        
        //user2 near skylab
        const location2 = {type: 'Point', coordinates: [longitude1, latitude1]}
        user2 = await User.create({ location: location2, name: name2, surname: surname2, username: username2,  email: email2, password: password2})
        id2 = user2.id

        const token = jwt.sign({ sub: id }, REACT_APP_JWT_SECRET_TEST)

        logic.__token__ = token

        //delete reviews data base
        await Review.deleteMany()

        //review to add to user1
        comment=`comment-${random()}`
        rate= 3

        //review added to user1            
        comment1=`comment-${random()}`
        response1=`response-${random()}`
        rate1= 2
        date1= new Date().toString()
        
        //create review to user1
        review = await Review.create({comment: comment1, rate: rate1, date: date1, author: user2._id.toString(), owner: user1.id})
        user1.reviews.push(review.id)
        await user1.save()
    })

    it('should succeed on correct registered review', async () =>{
        
        const response = await logic.registerReview(id1, comment, rate) 
        expect(response).toBeUndefined()

        return ( async () => {

            const user = await User.findOne({_id: id1}, { password: 0, __v: 0 }).populate('reviews').lean()
            
            //user
            expect(user).toBeDefined()
            expect(user).toBeInstanceOf(Object) 
            expect(user._id.toString()).toEqual(id1)

            //user review
            user.reviews.forEach( item => {
                if(item.author._id.toString() === id){
                    expect(item.comment).toEqual(comment)
                    expect(typeof item.comment).toBe('string')

                    expect(item.rate).toEqual(rate)
                    expect(typeof review.rate).toBe('number')

                    expect(item.author._id.toString()).toEqual(id)                    
                    expect(typeof item.author._id.toString()).toBe('string')   

                    expect(item.owner._id.toString()).toEqual(id1)
                    expect(typeof item.owner._id.toString()).toBe('string')
                }
            })                            
        })()

    })

    it('should fail on rate is not a number', async () =>{
        try{
            await logic.registerReview(id1, comment, 's')  
        }catch({message}){            
            expect(message).toEqual('rate with value s is not a number')            
        }
    })

    it('should fail on non can add a comment if not rate', async () =>{
        try{
            await logic.registerReview(id1, comment, undefined)  
        }catch({message}){            
            expect(message).toEqual('you should to rate to add a comment')            
        }
    })

    it('should fail on rate should add a number', async () =>{
        try{
            await logic.registerReview(id1, comment, '')  
        }catch({message}){
                        
            expect(message).toEqual('you should to add a correct number')            
        }
    })

    it('should fail on rate is not a correct number', async () =>{
        try{
            await logic.registerReview(id1, comment, 7)  
        }catch({message}){            
            expect(message).toEqual('you should to add a correct number')            
        }
    })
    it('should fail on rate is not a correct number', async () =>{
        try{
            await logic.registerReview(id1, comment, -1)  
        }catch({message}){            
            expect(message).toEqual('you should to add a correct number')            
        }
    })

    it('should fail on user id is not a string', async () =>{
        expect(()=> 
            logic.registerReview(123, comment, rate)
        ).toThrow(Error, 'id with value 123 is not a string')

    }) 

    it('should fail on user id not exist', async () =>{
        const fakeid = '5e711645a4734dc78985edb0'
        try{
            await logic.registerReview(fakeid, undefined, rate) 
        }catch({message}){
            expect(message).toEqual(`user with id ${fakeid} does not exist`)            
        }
    })



    it('should fail on user id is empty or blank', async () =>{
        expect(()=> 
            logic.registerReview('', comment, rate)
        ).toThrow(Error, 'id is empty or blank')
    })

    afterAll(() => database.disconnect())
}) 