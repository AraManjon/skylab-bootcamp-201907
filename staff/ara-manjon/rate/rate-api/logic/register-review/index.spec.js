require('dotenv').config()
const { expect } = require('chai')
const registerReview = require('.')
const { database, models: { User, Review } } = require('rate-data')
const { env: { DB_URL }} = process

 
describe.only('logic - register a review', () => {
    before(() =>  database.connect(DB_URL))

    let name, surname, email, username, password, longitude, latitude, id
    let name1, surname1, username1,  email1, password1, longitude1, latitude1, id1
    let name2, surname2, username2,  email2, password2
    let comment1, rate1, date1
    let user, user1, user2

    
    beforeEach(async () => {

        //user skylab
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        username = `username-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
        longitude= 2.199926
        latitude= 41.398414

        //user 1 near skylab
        name1 = `name-${Math.random()}`
        surname1 = `surname-${Math.random()}`
        username1 = `username-${Math.random()}`
        password1 = `password-${Math.random()}`
        email1 = `email-${Math.random()}@domain.com`
        longitude1 = 2.199955
        latitude1 = 41.398425

        //user 2 near skylab
        name2 = `name-${Math.random()}`
        surname2 = `surname-${Math.random()}`
        username2 = `username-${Math.random()}`
        password2 = `password-${Math.random()}`
        email2 = `email-${Math.random()}@domain.com`


        await User.deleteMany()

        //user skylab
        const location = {type: 'Point', coordinates: [longitude, latitude]}
        user = await User.create({ location, name, surname, username, email, password })
        id = user.id

        //user 1 near skylab
        const location1 = {type: 'Point', coordinates: [longitude1, latitude1]}
        user1 = await User.create({ location: location1, name: name1, surname: surname1, username: username1,  email: email1, password: password1})
        id1 = user1.id
        
        //user 2 near skylab
        const location2 = {type: 'Point', coordinates: [longitude1, latitude1]}
        user2 = await User.create({ location: location2, name: name2, surname: surname2, username: username2,  email: email2, password: password2})
        id2 = user2.id

        //review 1
        await Review.deleteMany()

        comment=`comment-${Math.random()}`
        rate= 3
        //review 2 added to user 1
            
        comment1=`comment-${Math.random()}`
        response1=`response-${Math.random()}`
        rate1= 2
        date1= new Date().toString()
        
        review = await Review.create({comment:comment1, rate:rate1, date:date1, author: user2._id.toString(), owner: user1.id})
        user1.reviews.push(review.id)
        await user1.save()
      

    })

    it('should succeed on correct registered review', async () =>{
        const response = await registerReview(id, id1, comment, rate) 
        
            expect(response).not.to.exist
            return ( async () => {
                const user = await User.findOne({_id: id1})

                let reviewsUser = user.reviews.map(review=>review._id.toString())

                let results = await Promise.all(reviewsUser.map( async (reviewUser) =>{
                    return await Review.find({_id: reviewUser}, {__v: 0}).lean()
                }))

                results.forEach((item, index)=>{
                    if(item[index].author[0]._id.toString() === id){
                        expect(item.comment).to.equal(comment)
                        expect(item.rate).to.equal(rate)
                        expect(item.author).to.equal(id._id.toString())
                        expect(item.owner).to.equal(id1.id)
                    }
                }) 
                           
        })
    })
    it('should fail on non can add a comment without rate', async () =>{
        try{
            await registerReview(id, id1, comment, 11)  
        }catch({message}){            
            expect(message).to.equal('rate with value undefined is not a number')            
        }
    })

    after(() => database.disconnect())
}) 