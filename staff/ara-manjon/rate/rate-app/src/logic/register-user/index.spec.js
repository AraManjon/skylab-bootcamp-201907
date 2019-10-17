import registerUser from '.'
import {database, models} from 'rate-data'

const { random } = Math
const { User } = models

import bcrypt from 'bcryptjs'

const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST


describe('logic - register user', () => {

    let name, surname, username, email, password
    let _name, _surname, _username, _email, _password
    

    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    beforeEach(async () => {

        //first user
        name = `name-${random()}`
        surname = `surname-${random()}`
        username = `username-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`

        //second user
        _name = `name-${random()}`
        _surname = `surname-${random()}`
        _username = `username-${random()}`
        _email = `email-${random()}@domain.com`
        _password = `password-${random()}`

        //clean users in database
        await User.deleteMany()
    })

    it('should succeed on correct data', async () => {
        
        const response = await registerUser(name, surname, username, email, password)

        expect(response).toBeUndefined()

        const user = await User.findOne({ email })
        
        expect(user).toBeDefined()
        expect(user.name).toBe(name)
        expect(user.surname).toBe(surname)
        expect(user.username).toBe(username)
        expect(user.email).toBe(email)
        expect(user.password).toBeDefined()
        
        const match = await bcrypt.compare(password, user.password)
        expect(match).toBeTruthy()
    }) 
    it('should fail on empty user name', () => 
    expect(() => 
           registerUser('', surname, username, email, password )
    ).toThrow('name is empty or blank')
    ) 

     it('should fail on non string user name', () => 
         expect(() => 
             registerUser(123, surname, username, email, password )
     ).toThrow('name with value 123 is not a string')
     )

    it('should fail on empty user surname', () => 
        expect(() => 
            registerUser(name, '', username, email, password )
    ).toThrow('surname is empty or blank')
    )

    it('should fail on non string user surname', () => 
        expect(() => 
            registerUser(name, 123, username, email, password )
    ).toThrow('surname with value 123 is not a string')
    )

    it('should fail on empty user username', () => 
        expect(() => 
            registerUser(name, surname, '', email, password )
    ).toThrow('username is empty or blank')
    )

    it('should fail on non string user username', () => 
        expect(() => 
            registerUser(name, surname, 123, email, password )
    ).toThrow('username with value 123 is not a string')
    )

    it('should fail on empty user email', () => 
        expect(() => 
            registerUser(name, surname, username, '', password )
    ).toThrow('email is empty or blank')
    )

    it('should fail on non string user email', () => 
        expect(() => 
            registerUser(name, surname, username, 123, password )
    ).toThrow('email with value 123 is not a string')
    )

    it('should fail on non valid user email', () => 
        expect(() => 
            registerUser(name, surname, username, 'a#mail.com', password )
    ).toThrow('email with value a#mail.com is not a valid e-mail')
    )

    it('should fail on empty user password', () => 
        expect(() => 
            registerUser(name, surname, username, email, '' )
    ).toThrow('password is empty or blank')
    )

    it('should fail on non string user password', () => 
        expect(() => 
            registerUser(name, surname, username, email, 123 )
    ).toThrow('password with value 123 is not a string')
    )

    it('should fail on non valid user password', () => 
        expect(() => 
            registerUser(name, surname, username, email, '123' )
    ).toThrow('password is not a valid password. The string must contain at least 1 numeric character, 1 alphabetical character and must be six characters or longer')
    )

    afterAll(() => database.disconnect())
})