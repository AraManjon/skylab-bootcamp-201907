require('dotenv').config()
const { expect } = require('chai')
const registerUser = require('.')
const { database, models: { User } } = require('rate-data')


const { env: { DB_URL_TEST }} = process


describe('logic - register user', () => {
    before(() =>  database.connect(DB_URL_TEST))
        
    let name, surname, username,email, password
    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        username = `username-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
        await User.deleteMany()
    })
    it('should succeed on correct data', async () => {
        const result = await registerUser(name, surname, username, email, password)
            
        expect(result).not.to.exist
        const user = await User.findOne({ email })
    
        expect(user).to.exist
        expect(user.name).to.equal(name)
        expect(user.surname).to.equal(surname)
        expect(user.username).to.equal(username)
        expect(user.email).to.equal(email)
        expect(user.password).to.eq(password)
    })
    it('should fail if the user already exists', async () =>{
        try{
            await User.create({ name, surname, username, email, password })
            await registerUser(name, surname, username, email, password)
       }catch(error){
           expect(error).to.exist
           expect(error.message).to.equal('User already exists.')
       }
    })

    it('should fail on empty user name', () => 
        expect(() => 
               registerUser('', surname, username, email, password )
    ).to.throw('name is empty or blank')
    )
    it('should fail on non string user name', () => 
        expect(() => 
               registerUser(123, surname, username, email, password )
    ).to.throw('name with value 123 is not a string')
    )
    it('should fail on empty user surname', () => 
        expect(() => 
               registerUser(name, '', username, email, password )
    ).to.throw('surname is empty or blank')
    )
    it('should fail on non string user surname', () => 
        expect(() => 
               registerUser(name, 123, username, email, password )
    ).to.throw('surname with value 123 is not a string')
    )
    it('should fail on empty user username', () => 
        expect(() => 
               registerUser(name, surname, '', email, password )
    ).to.throw('username is empty or blank')
    )
    it('should fail on non string user username', () => 
        expect(() => 
               registerUser(name, surname, 123, email, password )
    ).to.throw('username with value 123 is not a string')
    )
    it('should fail on empty user email', () => 
        expect(() => 
               registerUser(name, surname, username, '', password )
    ).to.throw('email is empty or blank')
    )
    it('should fail on non string user email', () => 
        expect(() => 
               registerUser(name, surname, username, 123, password )
    ).to.throw('email with value 123 is not a string')
    )
    it('should fail on non valid user email', () => 
        expect(() => 
               registerUser(name, surname, username, 'a#mail.com', password )
    ).to.throw('email with value a#mail.com is not a valid e-mail')
    )
    it('should fail on empty user password', () => 
        expect(() => 
               registerUser(name, surname, username, email, '' )
    ).to.throw('password is empty or blank')
    )
    it('should fail on non string user password', () => 
        expect(() => 
               registerUser(name, surname, username, email, 123 )
    ).to.throw('password with value 123 is not a string')
    )
    it('should fail on non valid user password', () => 
        expect(() => 
               registerUser(name, surname, username, email, '123' )
    ).to.throw('password is not a valid password. The string must contain at least 1 numeric character, 1 alphabetical character and must be six characters or longer')
    )
    after(() => database.disconnect())
}) 
