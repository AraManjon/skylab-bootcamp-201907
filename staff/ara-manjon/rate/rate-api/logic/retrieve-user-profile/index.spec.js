require('dotenv').config()
const {
    expect
} = require('chai')
const retrieveUserProfile = require('.')
const {
    database,
    models: {
        User,
        Review
    }
} = require('rate-data')

const {
    env: {
        DB_URL_TEST
    }
} = process


describe.only('logic - retrieve user profile', () => {
    before(() => database.connect(DB_URL_TEST))

    let name, surname, username, email, password, image, id, id1, username1, email1, review, longitude, latitude, review1, author, user1
    let rate = [3, 2]

    beforeEach(async () => {
        //user
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        username = `user0-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
        image = `image-${Math.random()}`
        longitude = 2.199926
        latitude = 41.398414
        //user1
        username1 = `user1-${Math.random()}`
        email1 = `email-${Math.random()}@domain.com`

        //review 0
        comment = `comment-${Math.random()}`
        date = new Date().toString()
        //review 1
        comment = `comment-${Math.random()}`
        date = new Date().toString()


        await User.deleteMany()
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        }
        user = await User.create({
            name,
            surname,
            username,
            email,
            password,
            image,
            location
        })
        id = user.id
        user1 = await User.create({
            name,
            surname,
            username: username1,
            email: email1,
            password,
            image,
            location
        })
        id1 = user1.id

        await Review.deleteMany()
        review = await Review.create({
            comment,
            rate: rate[0],
            date,
            author: user1._id.toString(),
            owner: user.id
        })
        review.id = review._id.toString()

        review1 = await Review.create({
            comment,
            rate: rate[1],
            date,
            author: user1._id.toString(),
            owner: user.id
        })
        review.id = review._id.toString()
        user.reviews.push(review.id)
        user.reviews.push(review1.id)
        await user.save()
    })

    it('should succeed on correct data', async () => {
        const user = await retrieveUserProfile(id)
        expect(user).to.exist
        //user
        expect(user.id).to.equal(id)
        expect(user.password).not.to.exist
        expect(user._id).not.to.exist
        expect(user.username).to.equal(username)
        expect(user.image).to.exist
        expect(user.location).to.exist
        expect(user.reviews).to.exist
        //user reviews
        user.reviews.forEach(review => {
            expect(review.rate).to.exist
            expect(review.author.id).to.equal(user1.id)
            expect(review.owner._id.toString()).to.equal(user.id)
            expect(review.date).to.exist
        })
        //user rate 
        expect(user.averageRate).to.exist
        //user authorComplete
        user.reviews.forEach(review => {

            expect(review.author.id).to.equal(id1)
            expect(review.author.password).not.to.exist
            expect(review.author._id).not.to.exist
            expect(review.author.username).to.equal(username1)
            expect(review.author.image).to.exist
            expect(review.author.location).to.exist
        })
    })
    //no reviews
    it('should succeed on correct data without reviews', async () => {
        const user = await retrieveUserProfile(id1)
        expect(user).to.exist
        //user
        expect(user.id).to.equal(id1)
        expect(user.password).not.to.exist
        expect(user._id).not.to.exist
        expect(user.username).to.equal(username1)
        expect(user.image).to.exist
        expect(user.location).to.exist
        //user reviews
        expect(user.reviews).to.exist
        //user rate 
        expect(user.averageRate).to.equal(0)
        //user authorComplete
    })
    it('should fail on user id not exist', async () => {
        const fakeid = '5e711645a4734dc78985edb0'
        try {
            await retrieveUserProfile(fakeid)
        } catch ({
            message
        }) {
            expect(message).to.equal(`user with id ${fakeid} does not exist`)
        }
    })
    it('should fail on user id is empty or blank', async () => {
        const fakeid = ''
        try {
            await retrieveUserProfile(fakeid)
        } catch ({
            message
        }) {
            expect(message).to.equal('id is empty or blank')
        }
    })

    it('should fail on user id is not a string', async () => {
        const fakeid = 123
        try {
            await retrieveUserProfile(fakeid)
        } catch ({
            message
        }) {
            expect(message).to.equal('id with value 123 is not a string')
        }
    })

    it('should fail on id is empty', async () => {
        try {
            await retrieveUserProfile('')
        } catch ({
            message
        }) {

            expect(message).to.equal(`id is empty or blank`)
        }
    })
    it('should fail on id is not a string', async () => {
        try {
            await retrieveUserProfile(123)
        } catch ({
            message
        }) {

            expect(message).to.equal(`id with value 123 is not a string`)
        }
    })

    after(() => database.disconnect())
})