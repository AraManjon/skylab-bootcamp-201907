require('dotenv').config()
const { expect } = require('chai')
const searchUser = require('.')
const { database, models: { User, Review } } = require('rate-data')

const { env: { DB_URL_TEST }} = process


describe('logic - search user by params introduced', () => {
    before(() =>  database.connect(DB_URL_TEST))

    let name, surname, username, email, password, image, id, id1, username1, email1, review, longitude, latitude, review1, user, user1
    let rate =[3,2]

    beforeEach(async () => {
        //user
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        username = `user0-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
        image = `image-${Math.random()}`
        longitude= 2.199926
        latitude= 41.398414
        //user1
        username1 = `user1-${Math.random()}`
        email1 = `email-${Math.random()}@domain.com`

        //review 0
        comment=`comment-${Math.random()}`        
        date= new Date().toString()
        //review 1
        comment=`comment-${Math.random()}`
        date= new Date().toString()

        await User.deleteMany()
        const location = {type: 'Point', coordinates: [longitude, latitude]}
            user = await User.create({ name, surname, username, email, password, image, location })
            id = user.id
            user1 = await User.create({ name, surname, username: username1 , email: email1, password, image, location })
            id1 = user1.id

        await Review.deleteMany()        
            review = await Review.create({comment, rate: rate[0], date, author: user1._id.toString(), owner: user.id})
            review.id = review._id.toString()

            review1 = await Review.create({comment, rate: rate[1], date, author: user1._id.toString(), owner: user.id})
            review.id = review._id.toString()            
            user.reviews.push(review.id)
            user.reviews.push(review1.id)
            await user.save()
    })

    it('should succeed on correct data', async () => {
        const response = await searchUser({username})           
        expect(response).to.exist
        //user
        response.forEach(user =>{            
            expect(user.id).to.equal(id)
            expect(user.password).not.to.exist
            expect(user._id).not.to.exist
            expect(user.username).to.equal(username)
            expect(user.image).to.exist
            expect(user.location).to.exist
        })   
})
it('should succeed on correct data', async () => {
    const response = await searchUser({email})           
    expect(response).to.exist
    //user
    response.forEach(user =>{            
        expect(user.id).to.equal(id)
        expect(user.password).not.to.exist
        expect(user._id).not.to.exist
        expect(user.username).to.equal(username)
        expect(user.image).to.exist
        expect(user.location).to.exist
    })
})
it('should succeed on correct data', async () => {
    const response = await searchUser({username})           
    expect(response).to.exist
    expect(response).to.exist
    //user
    response.forEach(user =>{
        expect(user.password).not.to.exist
        expect(user._id).not.to.exist
        expect(user.username).to.equal(username)
        expect(user.image).to.exist
        expect(user.location).to.exist
    })
})
it('should succeed on correct data', async () => {
    const response = await searchUser({email})           
    expect(response).to.exist
    //user
    response.forEach(user =>{            
        expect(user.id).to.equal(id)
        expect(user.password).not.to.exist
        expect(user._id).not.to.exist
        expect(user.username).to.equal(username)
        expect(user.image).to.exist
        expect(user.location).to.exist
    })
})
it('should fail user email is not found', async () => {
    const fakeParam = ''
    try{
        await searchUser({fakeParam})  
    }catch({message}){    
        expect(message).to.equal('user not found')
    }

})

after(() => database.disconnect())

})

