require('dotenv').config()
const { expect } = require('chai')
const authenticateUser = require('.')
const { database, models: { User } } = require('rate-data')


const { env: { DB_URL_TEST }} = process

describe('logic - authenticate user', () => {

    before(() =>  database.connect(DB_URL_TEST))
    let name, surname, username, email, password, id

    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        username = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        await User.deleteMany()
        const user= await User.create({ name, surname, username, email, password })
        id = user.id 
    })

    it('should succeed on correct data', async () =>{
        const _id = await authenticateUser(email, password)
        expect(_id).to.exist
        expect(_id).to.be.a('string')
        expect(_id).to.equal(id)
           
        })
     it('should fail on email does not exist', async () => {
        try{
            await authenticateUser('Jhon@email.com', password)
        }catch({message}){

            expect(message).to.equal(`user with e-mail Jhon@email.com does not exist`)
        }
    })
    it('should fail on empty email', async () =>{
        try{
            await authenticateUser('', password)            
        }catch({message}){
        expect(message).to.equal('e-mail is empty or blank')
    }
 })
    it('should fail on wrong credentials', async () => {
        try{
            await authenticateUser(email, 'password-123')
        }catch({message}){

            expect(message).to.equal(`wrong credentials`)
        }
    }) 
   it('should fail on non valid password', async () =>{
        try{
            await authenticateUser(email, 'dajhfkasf')            
        }catch({message}){
        expect(message).to.equal('undefined is not a valid password. The string must contain at least 1 numeric character, 1 alphabetical character and must be six characters or longer')
    }
 })
   it('should fail on empty password', async () =>{
        try{
            await authenticateUser(email, '')            
        }catch({message}){
        expect(message).to.equal('undefined is empty or blank')
    }
 })
    after(() => database.disconnect())
})