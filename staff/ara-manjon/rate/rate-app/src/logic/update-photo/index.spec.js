import logic from '..'
import { database, models } from 'rate-data'


const { random } = Math
const { User } = models

import jwt from 'jsonwebtoken'
import fs from 'fs'

const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST


describe('logic - upload image', () => {
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    let name, surname, username, email, password, image, id

    beforeEach(async () => {

        name = `name-${random()}`
        surname = `surname-${random()}`
        username = `username-${random()}`
        email = `email-${random()}@domain.com`
        password = `password-${random()}`

        await User.deleteMany()

        const user = await User.create({ name, surname, username, email, password})
        id = user.id

        const token = jwt.sign({ sub: id }, REACT_APP_JWT_SECRET_TEST)

        logic.__token__ = token

        image = fs.createReadStream('test/image.jpg')
    })

    it('should succeed on correct image', async () => {
        const result = await logic.updatePhoto(image)
        expect(result).toBeUndefined()
        const user = await User.findById(id)
        
        expect(user).toBeDefined()
        expect(user.image).toBeDefined()
    }) 
    afterAll(() => database.disconnect())
})