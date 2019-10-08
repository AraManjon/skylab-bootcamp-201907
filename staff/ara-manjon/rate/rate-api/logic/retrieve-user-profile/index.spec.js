require('dotenv').config()
const { expect } = require('chai')
const retrieveUserProfile = require('.')
const { database, models: { User, Review } } = require('rate-data')

const { env: { DB_URL_TEST } } = process

describe('logic - retrieve user profile', () => {
    before(() => database.connect(DB_URL_TEST))

    let name, surname, username, email, password, image, id, id1, _name, _surname, _username, _email, review, longitude, latitude, review1, user1
    let rate = [3, 2]

    beforeEach(async () => {
        //first user
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        username = `user-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
        image = `image-${Math.random()}`
        longitude = 2.199926
        latitude = 41.398414

        //second user
        _name = `name-${Math.random()}`
        _surname = `surname-${Math.random()}`
        _username = `user-${Math.random()}`
        _email = `email-${Math.random()}@domain.com`
        _password = `password-${Math.random()}`

        //review 1
        comment = `comment-${Math.random()}`
        date = new Date().toString()

        //review 2
        comment = `comment-${Math.random()}`
        date = new Date().toString()

        //clean users in database
        await User.deleteMany()
        const location = { type: 'Point', coordinates: [longitude, latitude] }
        
        //create first user
        user = await User.create({ name, surname, username, email, password, image, location })
        //keep user id created
        id = user.id

        //create second user
        user1 = await User.create({ name: _name, surname: _surname, username: _username, email: _email, password: _password, image, location })
        //keep user id created
        id1 = user1.id

        //clean reviews in database
        await Review.deleteMany()

        //create first review
        review = await Review.create({ comment, rate: rate[0], date, author: user1._id.toString(), owner: user.id })
        //clean review id created
        review.id = review._id.toString()
        review.owner.id = review.owner._id.toString()

        review1 = await Review.create({ comment, rate: rate[1], date, author: user1._id.toString(), owner: user.id })
        //clean review id created
        review1.id = review1._id.toString()
        review1.owner.id = review1.owner._id.toString()

        user.reviews.push(review.id)
        user.reviews.push(review1.id)

        await user.save()
    })

    it('should succeed on correct data', async () => {
        const user = await retrieveUserProfile(id)
        expect(user).to.exist
        expect(user).to.be.an('object')

        //user
        expect(user.id).to.equal(id)
        expect(user.id).to.be.a('string')

        expect(user.password).not.to.exist
        expect(user._id).not.to.exist

        expect(user.name).to.equal(name)
        expect(user.name).to.be.a('string')

        expect(user.surname).to.equal(surname)
        expect(user.surname).to.be.a('string')

        expect(user.username).to.equal(username)
        expect(user.username).to.be.a('string')

        expect(user.email).to.equal(email)
        expect(user.email).to.be.a('string')

        expect(user.image).to.exist

        expect(user.location).to.exist
        expect(user.location).to.be.a('object')

        expect(user.reviews).to.exist
        expect(user.reviews).to.have.lengthOf(2)

        //user reviews
        user.reviews.forEach(review => {
            expect(review.rate).to.exist
            expect(review.rate).to.be.a('number')

            expect(review.author.id).to.equal(user1.id)
            expect(review.author.id).to.be.a('string')

            expect(review.owner.id).to.equal(user.id)
            expect(review.owner.id).to.be.a('string')
            expect(review.date).to.exist
        })

        //user rate 
        expect(user.averageRate).to.exist
        expect(user.averageRate).to.be.a('string')

        //user authorComplete
        user.reviews.forEach(review => {
            expect(review.author.id).to.equal(id1)
            expect(review.author.id).to.be.a('string')
            expect(review.author._id).to.not.exist

            expect(review.author.password).not.to.exist

            expect(review.author.username).to.equal(_username)
            expect(review.author.username).to.be.a('string')

            expect(review.author.email).to.equal(_email)
            expect(review.author.email).to.be.a('string')

            expect(review.author.image).to.exist

            expect(review.author.location).to.exist
            expect(user.location).to.be.a('object')
        })
    })

    it('should succeed on correct data without reviews', async () => {
        const user = await retrieveUserProfile(id1)

        expect(user).to.exist
        expect(user).to.be.an('object')

        //user
        expect(user.id).to.equal(id1)
        expect(user.id).to.be.a('string')

        expect(user.password).not.to.exist
        expect(user._id).not.to.exist

        expect(user.name).to.equal(_name)
        expect(user.name).to.be.a('string')

        expect(user.surname).to.equal(_surname)
        expect(user.surname).to.be.a('string')

        expect(user.username).to.equal(_username)
        expect(user.username).to.be.a('string')

        expect(user.email).to.equal(_email)
        expect(user.email).to.be.a('string')

        expect(user.image).to.exist

        expect(user.location).to.exist
        expect(user.location).to.be.a('object')

        //user reviews
        expect(user.reviews).to.exist
        expect(user.reviews).to.be.empty
        expect(user.reviews).to.be.an('array').that.is.empty

        //user rate 
        expect(user.averageRate).to.equal('0.0')
        expect(user.averageRate).to.be.a('string')
        
    })

    it('should fail on user id not exist', async () => {
        const fakeid = '5e711645a4734dc78985edb0'
        try {
            await retrieveUserProfile(fakeid)
        } catch ({ message }) {
            expect(message).to.equal(`user with id ${fakeid} does not exist`)
        }
    })
    it('should fail on user id is empty or blank', async () => {
        const fakeid = ''
        try {
            await retrieveUserProfile(fakeid)
        } catch ({ message }) {
            expect(message).to.equal('id is empty or blank')
        }
    })

    it('should fail on user id is not a string', async () => {
        const fakeid = 123
        try {
            await retrieveUserProfile(fakeid)
        } catch ({ message }) {
            expect(message).to.equal('id with value 123 is not a string')
        }
    })

    it('should fail on id is empty', async () => {
        try {
            await retrieveUserProfile('')
        } catch ({ message }) {
            expect(message).to.equal(`id is empty or blank`)
        }
    })

    it('should fail on id is not a string', async () => {
        try {
            await retrieveUserProfile(123)
        } catch ({ message }) {
            expect(message).to.equal(`id with value 123 is not a string`)
        }
    })

    after(() => database.disconnect())
})