require('dotenv').config()
const { expect } = require('chai')
const retrieveUser = require('.')
const { database, models: { User } } = require('rate-data')


const { env: { DB_URL_TEST }} = process


describe('logic - retrieve user', () => {
    before(() =>  database.connect(DB_URL_TEST))

    let name, surname, username, email, password, id

    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        username = `username-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        await User.deleteMany()
            const user = await User.create({ name, surname, username, email, password })
            id = user.id
    })

    it('should succeed on correct data', async () => {
        const user = await retrieveUser(id)           
        expect(user).to.exist
        expect(user.id).to.equal(id)
        expect(user._id).not.to.exist
        expect(user.name).to.equal(name)
        expect(user.surname).to.equal(surname)
        expect(user.email).to.equal(email)
        expect(user.password).not.to.exist
        expect(user.location).to.exist
        })
        it('should fail on email does not exist', async () => {
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
        })

    after(() => database.disconnect())
})