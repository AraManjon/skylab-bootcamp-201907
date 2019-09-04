require('dotenv').config()
const { expect } = require('chai')
const updateUser = require('.')
const { database, models: { User } } = require('rate-data')
const { env: { DB_URL_TEST }} = process

describe('logic - update user', () => {
    before(() =>  database.connect(DB_URL_TEST))

    let name, surname, email, username, password, id, body

    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        username = `username-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        data = {
            name: `name-${Math.random()}`,
            surname: `surname-${Math.random()}`,
            username: `username-${Math.random()}`,
            email: `email-${Math.random()}@domain.com`,
            password: `password-${Math.random()}`,
            image: `image-${Math.random()}`
        }

        await User.deleteMany()
            const user = await User.create({ name, surname, username, email, password })
            id = user.id
    })

    it('should succeed on correct data', async () =>{
        const response = await updateUser(id, body)
            expect(response).not.to.exist
            return ( async () => {
            
            const user = await User.findById(id)
           
                expect(user).to.exist
                expect(user.name).to.equal(body.name)
                expect(user.surname).to.equal(body.surname)
                expect(user.username).to.equal(body.username)
                expect(user.email).to.equal(body.email)
                expect(user.password).to.equal(body.password)
                expect(user.extra).to.equal(body.extra)
        })
    })

    it('should fail on non-existing user', async () => {
       try{
        await updateUser('5d5d5530531d455f75da9fF9', body)
       }catch({ message }){
           
           expect(message).to.equal('wrong credentials')
     }
    })

    after(() => database.disconnect())
})
