process.env.NODE_ENV = 'test'

const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const server = require('../index')
describe('routes : index', () => {
  describe('GET /', () => {
    it('should return a 500', (done) => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(500)
          done()
        })
    })
  }),

  describe('POST /', () => {
    it('should return a 500', (done) => {
      chai.request(server)
        .post('/')
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(500)
          done()
        })
    })
  }),

  describe('GET /hc', () => {
    it('should return a 204', (done) => {
      chai.request(server)
        .get('/hc')
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(204)
          done()
        })
    })
  }),

  describe('POST /hc', () => {
    it('should return a 500', (done) => {
      chai.request(server)
        .post('/hc')
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(500)
          done()
        })
    })
  })
})
