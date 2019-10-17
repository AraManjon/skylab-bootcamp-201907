require('dotenv').config()
const { expect } = require('chai')
const authenticateUser = require('.')
const { database, models: { User } } = require('rate-data')
const bcrypt = require('bcryptjs')


const { env: { DB_URL_TEST }} = process

describe('logic - authenticate user', () => {

    before(() =>  database.connect(DB_URL_TEST))
    let name, surname, username, email, password, id

    beforeEach(async () => {
        //first user
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        username = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        //clean users in database
        await User.deleteMany()

        //create user
        const user= await User.create({ name, surname, username, email, password: await bcrypt.hash(password, 10) })
        
        //keep user id created
        id = user.id 
    })

    it('should succeed on correct data', async () => {

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

    it('should fail on email is not a string', async () =>{
        try{
            await authenticateUser(123, password)            
        }catch({message}){
        expect(message).to.equal('e-mail with value 123 is not a string')
        }
    })

    it('should fail on email is not a valid email', async () =>{
        try{
            await authenticateUser('a#mail.com', password)            
        }catch({message}){
        expect(message).to.equal('e-mail with value a#mail.com is not a valid e-mail')
        }
    })

    it('should fail on wrong credentials', async () => {
        try{
            await authenticateUser(email, 'password-123')
        }catch({message}){
            expect(message).to.equal('wrong credentials')
        }
    }) 
   it('should fail on empty password', async () =>{
        try{
            await authenticateUser(email, '')            
        }catch({message}){
        expect(message).to.equal('undefined is empty or blank')
        }
    })
   it('should fail on password is not a string', async () =>{
        try{
            await authenticateUser(email, 111)            
        }catch({message}){
        expect(message).to.equal('undefined with value 111 is not a string')
        }
    })
    after(() => database.disconnect())
})