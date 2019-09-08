require('dotenv').config()
const { expect } = require('chai')
const retrieveUser = require('.')
const { database, models: { User, Review } } = require('rate-data')

const { env: { DB_URL_TEST }} = process


describe.only('logic - retrieve user profile', () => {
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
        const response = await retrieveUser(id)           
        expect(response).to.exist
        //user
        expect(response.user.id).to.equal(id)
        expect(response.user.password).not.to.exist
        expect(response.user._id).not.to.exist
        expect(response.user.username).to.equal(username)
        expect(response.user.image).to.exist
        expect(response.user.location).to.exist
        //user reviews
        response.reviewsUserComplete.forEach(review=>{            
            expect(review[0].rate).to.exist
            expect(review[0].author.id).to.equal(user1._id.toString())

            
        })

        })
        /* it('should fail on email does not exist', async () => {
            try{
                await retrieveUser('5d6f91ac50701384cf6a5d04')
            }catch({message}){
    
                expect(message).to.equal(`user with id 5d6f91ac50701384cf6a5d04 not found`)
            }
        })
        it('should fail on id is empty', async () => {
            try{
                await retrieveUser('')
            }catch({message}){
    
                expect(message).to.equal(`id is empty or blank`)
            }
        })
        it('should fail on id is not a string', async () => {
            try{
                await retrieveUser(123)
            }catch({message}){
    
                expect(message).to.equal(`id with value 123 is not a string`)
            }
        }) */

    after(() => database.disconnect())
})