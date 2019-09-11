/* db.users.createIndex({ location: "2dsphere" }) */

require('dotenv').config()
const { expect } = require('chai')
const retrieveAllGeo = require('.')
const { database, models: { User} } = require('rate-data')


const { env: { DB_URL_TEST }} = process


describe('logic - retrieve users by geolocation ', () => {
    before(() =>  database.connect(DB_URL_TEST))

    let name, surname, username, email, password, id, longitude, latitude,
        name1, surname1, username1, email1, password1, id1, longitude1, latitude1, 
        name2, surname2,  username2, email2, password2, id2, longitude2, latitude2,
        name3, surname3,  username3, email3, password3, id3
    const distance= "1200"

    beforeEach(async () => {
        //torre agbar
        name = `torreAgbar-${Math.random()}`
        surname = `surname-${Math.random()}`
        username = `torreAgbar-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
        longitude =  2.1894
        latitude =  41.403 
        //near sagrada familia
        name1 = `name-${Math.random()}`
        surname1 = `surname-${Math.random()}`
        username1 = `SagradaFamilia-${Math.random()}`
        email1 = `email-${Math.random()}@domain.com`
        password1 = `password-${Math.random()}`
        longitude1 =  2.17441
        latitude1 =  41.403479
        //skylab
        name2 = `name-${Math.random()}`
        surname2 = `surname-${Math.random()}`
        email2 = `email-${Math.random()}@domain.com`
        username2 = `skylab-${Math.random()}`
        password2 = `password-${Math.random()}`
        longitude2 =  2.1999337999999997
        latitude2 =  41.398434200000004
        
        //user without geolocation
        name3 = `name-${Math.random()}`
        surname3 = `surname-${Math.random()}`
        email3 = `email-${Math.random()}@domain.com`
        username3 = `usernameWithoutLoc-${Math.random()}`
        password3 = `password-${Math.random()}`


        await User.deleteMany()
            const location= {type: 'Point', coordinates: [longitude, latitude]}
            const user = await User.create({ name, surname, username, email, password, location})
            id = user.id
            const location1= {type: 'Point', coordinates: [longitude1, latitude1]}
            const user1 = await User.create({ name: name1, surname: surname1, username: username1, email: email1, password: password1, location: location1})
            id1 = user1.id

            const location2= {type: 'Point', coordinates: [longitude2, latitude2]}
            const user2 = await User.create({ name: name2, surname: surname2, username: username2, email: email2, password: password2, location: location2})
            id2 = user2.id

            const user3 = await User.create({ name: name3, surname: surname3, username: username3, email: email3, password: password3})
            id3 = user3.id
    })

    it('should succeed on correct data', async () => {
        
        const users = await retrieveAllGeo(id, distance)   
             
        expect(users[0].id).to.equal(id)
        expect(users[1].id).to.equal(id2)
        })
         it('should fail on user id does not have location', async () => {
            
            try{
                await retrieveAllGeo(id3, distance)
            }catch({message}){
    
                expect(message).to.equal(`User location not found`)
            }
        })  
         it('should fail on user id does not exist', async () => {
            const fakeid = '5e711645a4734dc78985edb0'
            try{
                await retrieveAllGeo(fakeid, distance)
            }catch({message}){
    
                expect(message).to.equal(`user with id ${fakeid} does not exist`)
            }
        })  
        it('should fail on id is empty', async () => {
            try{
                await retrieveAllGeo('', distance)
            }catch({message}){
    
                expect(message).to.equal(`id is empty or blank`)
            }
        })
        it('should fail on id is not a string', async () => {
            try{
                await retrieveAllGeo(123, distance)
            }catch({message}){
    
                expect(message).to.equal('id with value 123 is not a string')
            }
        })
        it('should fail on distance is not a number', async () => {
            try{
                await retrieveAllGeo(id, '')
            }catch({message}){
    
                expect(message).to.equal('distance is empty or blank')
            }
        })
        it('should fail on distance is not a number', async () => {
            try{
                await retrieveAllGeo(id, '123')
            }catch({message}){
    
                expect(message).to.equal('distance with value 123 is not a number')
            }
        })

    after(() => database.disconnect())
})