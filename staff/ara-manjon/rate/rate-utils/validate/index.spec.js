const { expect } = require('chai')
const validate = require('./index')

const {
    random
} = Math

describe('logic - validate', () => {
    describe('string', () => {
        it('should succeed on correct string', () => {
            const result = validate.string('query', 'string')
            expect(result).not.exist

        })
        it('should fail on non correct string', () => {
            expect(() =>
                validate.string(123, 'string')).to.throw(Error, `string with value 123 is not a string`)

        })
        it('should fail on empty string', () => {
            expect(() =>
                validate.string('', 'string')).to.throw(Error, `string is empty or blank`)

        })

        it('should fail on empty string', () => {
            expect(() =>
                validate.string('', 'string')).to.throw(Error, `string is empty or blank`)

        })

    })
    describe('email', () => {
        it('should succeed on correct email', () => {
            const result = validate.email('John-' + random() + '@gmail.com', 'string')
            expect(result).to.not.exist

        })
        it('should fail on non correct email', () => {
            expect(() =>
                validate.email(123, 'email')).to.throw(Error, `email with value 123 is not a valid e-mail`)

        })

    })

    describe('URL', () => {
            it('should succeed on correct URL', () => {
                const result = validate.url('https://developer.mozilla.org/es/', 'string')
                expect(result).to.not.exist

            })
            it('should fail on non correct URL', () => {
                expect(() =>
                    validate.url(123, 'url')).to.throw(Error, `url with value 123 is not a valid URL`)

            })
        })

    describe('Boolean', () => {
            it('should succeed on correct Boolean', () => {
                const result = validate.boolean(true, 'boolean')
                expect(result).to.not.exist

            })
            it('should fail on non correct Boolean', () => {
                expect(() =>
                    validate.boolean('true', 'boolean')).to.throw(Error, `boolean with value true is not a boolean`)

            })
        })
    describe('Number', () => {
            it('should succeed on correct Number', () => {
                const result = validate.number(123, 'number')
                expect(result).to.not.exist

            })
            it('should fail on non correct Number', () => {
                expect(() =>
                    validate.number('123', 'number')).to.throw(Error, `number with value 123 is not a number`)

            })
        })
     describe('Date', ()=>{
        it('should succeed on correct Date', () => {
            const newDate= new Date()
            const result = validate.date(newDate, 'date')
            expect(result).to.not.exist
        })
        it('should fail on non correct Date', () => {
            const _newDate= 'Thu Sep 05 2019 13:16:53 GMT+0200'
            expect(() =>
                    validate.date(_newDate, 'date')).to.throw(Error, 'date with value Thu Sep 05 2019 13:16:53 GMT+0200 is not a date')
        })

    }) 


})
