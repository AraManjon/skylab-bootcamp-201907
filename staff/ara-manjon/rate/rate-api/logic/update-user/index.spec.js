require('dotenv').config()
const { expect } = require('chai')
const updateUser = require('.')
const { database, models: { User } } = require('rate-data')
const { env: { DB_URL_TEST }} = process
const bcrypt = require('bcryptjs')

describe('logic - update user', () => {
    before(() =>  database.connect(DB_URL_TEST))

    let name, surname, email, username, password, id, body

    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        username = `username-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        body = {
            name: `name-${Math.random()}`,
            surname: `surname-${Math.random()}`,
            username: `username-${Math.random()}`,
            password: `password-${Math.random()}`,
            image: `image-${Math.random()}`

        }
        
        const hash = await bcrypt.hash(password,10)
            
        await User.deleteMany()
            const user = await User.create({ name, surname, username, email, password: hash})
            id = user.id
    })

    it('should succeed on correct data', async () =>{
        const response = await updateUser(id, body)
            expect(response).not.to.exist           
            const user = await User.findById(id)           
                expect(user).to.exist
                expect(user.name).to.equal(body.name)
                expect(user.surname).to.equal(body.surname)
                expect(user.username).to.equal(body.username)
                expect(user.email).to.equal(email)
                expect(user.password).to.exist
                expect(user.longitud).to.equal(body.longitud)
                expect(user.latitude).to.equal(body.latitude)
    })

    it('should fail on non-existing user', async () => {
        const fakeid = '5e711645a4734dc78985edb0'
       try{
        await updateUser(fakeid, body)
       }catch({ message }){
           expect(message).to.equal(`User with id ${fakeid} does not exist.`)
        }
    }) 
    it('should fail on user id is not a string', async () => {
       try{
        await updateUser(123, body)
       }catch({ message }){
           expect(message).to.equal('id with value 123 is not a string')
        }
    }) 
    it('should fail on user id is empty or blank', async () => {
       try{
        await updateUser('', body)
       }catch({ message }){
           expect(message).to.equal('id is empty or blank')
        }
    }) 
    it('should fail on name is not a string', async () => {
       
        try{
        await updateUser(id, {name:123})
       }catch({ message }){
           expect(message).to.equal('name with value 123 is not a string')
        }
    }) 
    it('should fail on surname is not a string', async () => {       
        try{
        await updateUser(id, {surname:123})
       }catch({ message }){
           expect(message).to.equal('surname with value 123 is not a string')
        }
    }) 
    it('should fail on username is not a string', async () => {       
        try{
        await updateUser(id, {username:123})
       }catch({ message }){
           expect(message).to.equal('username with value 123 is not a string')
        }
    }) 
    it('should fail on password is not a string', async () => {       
        try{
        await updateUser(id, {password:123})
       }catch({ message }){
           expect(message).to.equal('password with value 123 is not a string')
        }
    }) 
    it('should fail on password is not a valid password', async () => {       
        try{
        await updateUser(id, {password:'123'})
       }catch({ message }){
           expect(message).to.equal('password is not a valid password. The string must contain at least 1 numeric character, 1 alphabetical character and must be six characters or longer')
        }
    }) 
    it('should fail on email is not modifiable', async () => {       
        try{
        await updateUser(id, {email:'123'})
       }catch({ message }){
           expect(message).to.equal('email non-modifiable')
        }
    })  

    after(() => database.disconnect())
})
