import logic from '..'
import { database, models } from 'rate-data'


const { random } = Math
const { User, Review } = models

import jwt from 'jsonwebtoken'

const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST

describe('logic - retrieve user profile', () => {
    
    let name, surname, username, email, password, image, id, id1, _name, _surname, _username, _email, _password, review, longitude, latitude, review1, user1, comment, date, user
    let rate = [3, 2]
    
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))
    
    beforeEach(async () => {
    
        //first user
        name = `name-${random()}`
        surname = `surname-${random()}`
        username = `user-$.random()}`
        email = `email-${random()}@domain.com`
        password = `password-${random()}`
        image = `image-${random()}`
        longitude = 2.199926
        latitude = 41.398414

        //second user
        _name = `name-${random()}`
        _surname = `surname-${random()}`
        _username = `user-${random()}`
        _email = `email-${random()}@domain.com`
        _password = `password-${random()}`

        //review 1
        comment = `comment-${random()}`
        date = new Date().toString()

        //review 2
        comment = `comment-${random()}`
        date = new Date().toString()

        //clean users in database
        await User.deleteMany()
        const location = { type: 'Point', coordinates: [longitude, latitude] }
        
        //create first user
        //const hash = await bcrypt.hash(password, 10)
        user = await User.create({ name, surname, username, email, password, image, location })
        //keep user id created
        id = user.id

        //create second user
        //const _hash = await bcrypt.hash(_password, 10)
        user1 = await User.create({ name: _name, surname: _surname, username: _username, email: _email, password: _password, image, location })
        //keep user id created
        id1 = user1.id

        const token = jwt.sign({ sub: id }, REACT_APP_JWT_SECRET_TEST)

        logic.__token__ = token

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
        const user = await logic.retrieveUserProfile(id)
        expect(user).toBeDefined()
        expect(user).toBeInstanceOf(Object)

        //user
        expect(user.id).toEqual(id)
        expect(typeof user.id).toBe('string')

        expect(user.password).toBeUndefined()
        expect(user._id).toBeUndefined()

        expect(user.name).toEqual(name)
        expect(typeof user.name).toBe('string')

        expect(user.surname).toEqual(surname)
        expect(typeof user.surname).toBe('string')

        expect(user.username).toEqual(username)
        expect(typeof user.username).toBe('string')

        expect(user.email).toEqual(email)
        expect(typeof user.email).toBe('string')

        expect(user.image).toBeDefined()

        expect(user.location).toBeDefined()
        expect(user.location).toBeInstanceOf(Object)

        expect(user.reviews).toBeDefined()
        expect(user.reviews).toHaveLength(2)

        //user reviews
        user.reviews.forEach(review => {
            expect(review.rate).toBeDefined()
            expect(typeof review.rate).toBe('number')

            expect(review.author.id).toEqual(user1.id)
            expect(typeof review.author.id).toBe('string')


            expect(review.owner).toBeDefined()
            expect(review.date).toBeDefined()
        })

        //user rate 
        expect(user.averageRate).toBeDefined()
        expect(typeof user.averageRate).toBe('string')

        //user authorComplete
        user.reviews.forEach(review => {
            expect(review.author.id).toEqual(id1)
            expect(typeof review.author.id).toBe('string')
            expect(review.author._id).toBeUndefined()

            expect(review.author.password).toBeUndefined()

            expect(review.author.username).toEqual(_username)
            expect(typeof review.author.username).toBe('string')

            expect(review.author.email).toEqual(_email)
            expect(typeof review.author.email).toBe('string')
            expect(review.author.image).toBeDefined()

            expect(review.author.location).toBeDefined()
            expect(user.location).toBeInstanceOf(Object)
        })
    })

     it('should succeed on correct data without reviews', async () => {
        const user = await logic.retrieveUserProfile(id1)

        expect(user).toBeDefined()
        expect(user).toBeInstanceOf(Object)

        //user
        expect(user.id).toEqual(id1)
        expect(typeof user.id).toBe('string')

        expect(user.password).toBeUndefined()
        expect(user._id).toBeUndefined()

        expect(user.name).toEqual(_name)
        expect(typeof user.name).toBe('string')

        expect(user.surname).toEqual(_surname)
        expect(typeof user.surname).toBe('string')

        expect(user.username).toEqual(_username)
        expect(typeof user.username).toBe('string')

        expect(user.email).toEqual(_email)
        expect(typeof user.email).toBe('string')

        expect(user.image).toBeDefined()

        expect(user.location).toBeDefined()
        expect(user.location).toBeInstanceOf(Object)

        //user reviews
        expect(user.reviews).toBeDefined()
        expect(user.reviews).toEqual(expect.anything())

        //user rate 
        expect(user.averageRate).toEqual('0.0')
        expect(typeof user.averageRate).toBe('string')
        
    })

    it('should fail on user id not exist', async () => {
        const fakeid = '5e711645a4734dc78985edb0'
        try {
            await logic.retrieveUserProfile(fakeid)
        } catch (error) {
            expect(error).toBeDefined()
        } 
    })

    it('should fail on id is empty', async () => {
        expect(()=> 
            logic.retrieveUserProfile('')
        ).toThrow(Error, 'id is empty or blank')
    }) 

    it('should fail on id is not a string', async () => {    
        expect(()=> 
            logic.retrieveUserProfile(123)
        ).toThrow(Error, 'id with value 123 is not a string')
    })

    afterAll(() => database.disconnect())
})