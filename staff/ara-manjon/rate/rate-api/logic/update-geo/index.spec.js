require('dotenv').config()
const { expect } = require('chai')
const updateGeo = require('.')
const { database, models: { User } } = require('rate-data')
const { env: { DB_URL_TEST }} = process

describe('logic - update geolocation', () => {
    before(() =>  database.connect(DB_URL_TEST))

    let name, surname, email, username, password, longitude, latitude, id

    beforeEach(async () => {

        //first user
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        username = `username-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
        longitude= Math.random()
        latitude= Math.random()

        //clean users in database 
        await User.deleteMany()

        //create first user
        const user = await User.create({ name, surname, username, email, password})
        
        //create first user
        id = user.id
    })

    it('should succeed on correct data', async () =>{
        const response = await updateGeo(id, longitude, latitude)        
        
        expect(response).not.to.exist

        const user = await User.findById(id)

        expect(user).to.exist
        expect(user).to.be.an('object')


        expect(user.name).to.equal(name)
        expect(user.name).to.be.a('string')

        expect(user.surname).to.equal(surname)
        expect(user.surname).to.be.a('string')

        expect(user.username).to.equal(username)
        expect(user.username).to.be.a('string')

        expect(user.email).to.equal(email)
        expect(user.email).to.be.a('string')

        expect(user.location).to.exist
        expect(user.location).to.be.an('object')

        expect(user.location.coordinates[0]).to.equal(longitude)
        expect(user.location.coordinates[0]).to.be.a('number')

        expect(user.location.coordinates[1]).to.equal(latitude)
        expect(user.location.coordinates[1]).to.be.a('number')        
    })

    it('should fail on non-existing user', async () => {
        const fakeid = '5e711645a4734dc78985edb0'
       try{
           await updateGeo(fakeid,longitude,latitude)
       }catch({ message }){
           expect(message).to.equal(`user with id ${fakeid} does not exist`)
        }
    })

    it('should fail on user id is empty or blank', async () => {
       try{
        await updateGeo('',longitude,latitude)
       }catch({ message }){
           expect(message).to.equal('id is empty or blank')
        }
    })

    it('should fail on user id is not a string', async () => {
       try{
        await updateGeo(123,longitude,latitude)
       }catch({ message }){
           expect(message).to.equal('id with value 123 is not a string')
        }
    })

    it('should fail on longitude is not a number', async () => {
       try{
        await updateGeo(id,'123',latitude)
       }catch({ message }){
           expect(message).to.equal('longitude with value 123 is not a number')
        }
    })

    it('should fail on latitude is not a number', async () => {
       try{
        await updateGeo(id,longitude,'123')
       }catch({ message }){
           expect(message).to.equal('latitude with value 123 is not a number')
        }
    })


    after(() => database.disconnect())
})