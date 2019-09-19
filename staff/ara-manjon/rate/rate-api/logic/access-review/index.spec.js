require('dotenv').config()
const { expect } = require('chai')
const accessReview = require('.')
const { database, models: { User, Review } } = require('rate-data')
const { env: { DB_URL_TEST }} = process


describe('logic - access a review', () => {
    before(() =>  database.connect(DB_URL_TEST))

    let name, surname, email, username, password, longitude, latitude, id
    let name1, surname1, username1,  email1, password1, longitude1, latitude1, id1
    let name2, surname2, username2,  email2, password2, id2
    let comment1, rate1, date1
    let user, user1, user2

    
    beforeEach(async () => {

        //user skylab
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        username = `username-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
        longitude= 2.199926
        latitude= 41.398414

        //user 1 near skylab
        name1 = `name-${Math.random()}`
        surname1 = `surname-${Math.random()}`
        username1 = `username-${Math.random()}`
        password1 = `password-${Math.random()}`
        email1 = `email-${Math.random()}@domain.com`
        longitude1 = 2.199955
        latitude1 = 41.398425

        //user 2 near skylab
        name2 = `name-${Math.random()}`
        surname2 = `surname-${Math.random()}`
        username2 = `username-${Math.random()}`
        password2 = `password-${Math.random()}`
        email2 = `email-${Math.random()}@domain.com`


        await User.deleteMany()

        //user skylab
        const location = {type: 'Point', coordinates: [longitude, latitude]}
        user = await User.create({ location, name, surname, username, email, password })
        id = user.id

        //user 1 near skylab
        const location1 = {type: 'Point', coordinates: [longitude1, latitude1]}
        user1 = await User.create({ location: location1, name: name1, surname: surname1, username: username1,  email: email1, password: password1})
        id1 = user1.id
        
        //user 2 near skylab
        const location2 = {type: 'Point', coordinates: [longitude1, latitude1]}
        user2 = await User.create({ location: location2, name: name2, surname: surname2, username: username2,  email: email2, password: password2})
        id2 = user2.id

        //review  added to user 1
            
        comment1=`comment-${Math.random()}`
        response1=`response-${Math.random()}`
        rate1= 2
        date1= new Date().toString()
        review = await Review.create({comment:comment1, rate:rate1, date:date1, author: user2._id.toString(), owner: user1.id})
        user1.reviews.push(review.id)

        await user1.save() 
    })

    it('should succeed on correct access a review', async () =>{

        const response = await accessReview(id, id1)
        
        expect(response).not.to.exist
    })

    it('should fail on non correct access a review', async () =>{
        try{
            await accessReview(id2, id1) 
        }catch({message}){

            expect(message).to.equal('you have already rate')            
        }
    }) 
    it('should fail on user id is not a string', async () =>{
        try{
            await accessReview(123, id1) 
        }catch({message}){

            expect(message).to.equal('id with value 123 is not a string')            
        }
    }) 
    it('should fail on non correct user id', async () =>{
        const fakeid = '5e711645a4734dc78985edb0'
        try{
            await accessReview(fakeid, id1) 
        }catch({message}){

            expect(message).to.equal(`user with id ${fakeid} does not exist`)            
        }
    }) 
    it('should fail on user id is not a string', async () =>{
        try{
            await accessReview(id, 123) 
        }catch({message}){

            expect(message).to.equal('id with value 123 is not a string')            
        }
    }) 
    it('should fail on non correct user id', async () =>{
        const fakeid = '5e711645a4734dc78985edb0'
        try{
            await accessReview(id, fakeid) 
        }catch({message}){

            expect(message).to.equal(`user with id ${fakeid} does not exist`)            
        }
    })
    it('should fail on user id is empty or blank', async () =>{
        try{
            await accessReview(id, '') 
        }catch({message}){

            expect(message).to.equal('id is empty or blank')            
        }
    })
    it('should fail on user id is empty or blank', async () =>{
        try{
            await accessReview('', id1) 
        }catch({message}){

            expect(message).to.equal('id is empty or blank')            
        }
    })     

    after(() => database.disconnect())
})