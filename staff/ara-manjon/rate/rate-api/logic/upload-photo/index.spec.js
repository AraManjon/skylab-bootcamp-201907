require('dotenv').config()
const { expect } = require('chai')
const updatePhoto = require('.')
const { database, models: { User } } = require('rate-data')
const fs = require('fs') 

const { env: { DB_URL_TEST } } = process
describe('logic - upload image', () => {
     debugger
    before(() => database.connect(DB_URL_TEST))

    let name, surname, username, email, password, image, id

    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        username = `username-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        await User.deleteMany()
            const user = await User.create({ name, surname, username, email, password})
            id = user.id

            image = fs.createReadStream('test/josetas.jpg')
    })
    it('should succeed on correct image', async () => {
        const result = await updatePhoto(id, image)
        expect(result).not.to.exist
        const user = await User.findById(id)
        debugger
        expect(user).to.exist
        expect(user.image).to.exist
        expect(user.image).to.have.length.above(0)
    }) 
    after(() => database.disconnect())
})