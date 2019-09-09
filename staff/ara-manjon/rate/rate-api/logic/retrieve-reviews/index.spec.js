require('dotenv').config()
const { expect } = require('chai')
const retrieveReviews = require('.')
const { database, models: { User, Review } } = require('rate-data')

const { env: { DB_URL_TEST }} = process

describe('logic - retrieve review',()=>{
    before(()=>database.connect(DB_URL_TEST))
    let name, surname, username, email, password, id, review
    let name1, surname1, username1,  email1, password1
    let name2, surname2, username2,  email2, password2
    let name3, surname3, username3,  email3, password3
    let user, user1, user2, user3
    
    beforeEach(async () => {
        //user
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        username = `username-${Math.random()}`
        password = `password-${Math.random()}`
        email = `email-${Math.random()}@domain.com`

        //user 1
        name1 = `name-${Math.random()}`
        surname1 = `surname-${Math.random()}`
        username1 = `username-${Math.random()}`
        password1 = `password-${Math.random()}`
        email1 = `email-${Math.random()}@domain.com`
        
        //user 2
        name2 = `name-${Math.random()}`
        surname2 = `surname-${Math.random()}`
        username2 = `username-${Math.random()}`
        password2 = `password-${Math.random()}`
        email2 = `email-${Math.random()}@domain.com`
       
        //user 3
        name3 = `name-${Math.random()}`
        surname3 = `surname-${Math.random()}`
        username3 = `username-${Math.random()}`
        password3 = `password-${Math.random()}`
        email3 = `email-${Math.random()}@domain.com`

        await User.deleteMany()
            user = await User.create({ name, surname, username, email, password })
            id = user.id

            user1 = await User.create({ name: name1, surname: surname1, username: username1,  email: email1, password: password1})
            id1 = user1.id

            user2 = await User.create({ name: name2, surname: surname2, username: username2,  email: email2, password: password2 })
            id2 = user2.id

            user3 = await User.create({ name: name3, surname: surname3, username: username3, email: email3, password: password3 })        
            id3 = user3.id

        
        //review 1
        comment=`comment-${Math.random()}`
        response=`response-${Math.random()}`
        rate=`${Math.random()}`
        date= new Date
        

        await Review.deleteMany()        
            review = await Review.create({comment, rate, date, author: user._id.toString(), owner: user1.id})
            review.id = review._id.toString()
            review2 = await Review.create({comment, rate, date, author: user._id.toString(), owner: user2.id})
            review2.id = review2._id.toString()
            
            user1.reviews.push(review.id)
            user2.reviews.push(review2.id)
            
        })

        it('should succeed on correct retrieve reviews', async()=>{
            let reviews = await Review.find({ author: id },{ __v:0, password:0}).lean()
            reviews.forEach(review=>{
                review.id = review._id.toString()
                delete review._id.toString()
            })
            const results = await retrieveReviews(id)
            expect(results).to.exist
          
            expect(results.reviews.length).to.equal(2)
            expect(results.reviewedUsers.length).to.equal(2)
            results.reviews.forEach((result, index)=>{
                expect(result).to.exist
                expect(result.id).to.equal(reviews[index].id)
                expect(result.author.id).to.equal(id)
                              
            })
            expect(results.reviewedUsers[0].id).to.equal(user1.id)
            expect(results.reviewedUsers[1].id).to.equal(user2.id)
      
            
        })
        it('should fail on empty user id', async ()=>{
            try {
                await retrieveReviews('')
            } catch({message}) {
                expect(message).to.equal('id is empty or blank')
            }
        })

        it('should fail on user id does not exist', async ()=>{
            const fakeid = '5e711645a4734dc78985edb0'
            try {
                await retrieveReviews(fakeid)
            } catch({message}) {
                expect(message).to.equal(`user with id ${fakeid} does not exist`)
            }
        })
        it('should fail on empty user id', async ()=>{
            try {
                await retrieveReviews(user2.id)
            } catch({message}) {
                expect(message).to.equal(`User with id ${user2.id} does not author any review.`)
            }
        })
        it('should fail on undefined user id', async () => {
            userId = undefined
            try {
                await retrieveReviews(user2.id)
            } catch({message}) {
                expect(message).to.equal('user with value undefined is not a string')
            }
        })
        it('should fail on wrong id user data type', async () => {
            userId = 123
            try {
                await retrieveReviews(user2.id)
            } catch({message}) {
                expect(message).to.equal('user with value 123 is not a string')
            }
        })
})