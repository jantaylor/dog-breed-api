process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../src/server/index');
const knex = require('../src/server/db/connection');

describe('routes : breeds', () => {

  beforeEach(() => {
    return knex.migrate.rollback()
    .then(() => { return knex.migrate.latest(); })
    .then(() => { return knex.seed.run(); });
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

describe('GET /api/v1/breeds', () => {
  it('should return all breeds', (done) => {
    chai.request(server)
    .get('/api/v1/breeds')
    .end((err, res) => {
      // there should be no errors
      should.not.exist(err);
      // there should be a 200 status code
      res.status.should.equal(200);
      // the response should be JSON
      res.type.should.equal('application/json');
      // the JSON response body should have a
      // key-value pair of {"status": "success"}
      res.body.status.should.eql('success');
      // the JSON response body should have a
      // key-value pair of {"data": [3 breed objects]}
      res.body.data.length.should.eql(3);
      // the first object in the data array should
      // have the right keys
      res.body.data[0].should.include.keys(
        'id', 'name', 'nicknames', 'description', 'origin', 'life_span', 'temperament', 'colors', 'height', 'weight', 'coat', 'akc', 'image', 'created_at', 'updated_at'
      );
      done();
    });
  });
});

describe('GET /api/v1/breeds/:id', () => {
  it('should respond with a single breed', (done) => {
    chai.request(server)
    .get('/api/v1/breeds/1')
    .end((err, res) => {
      // there should be no errors
      should.not.exist(err);
      // there should be a 200 status code
      res.status.should.equal(200);
      // the response should be JSON
      res.type.should.equal('application/json');
      // the JSON response body should have a
      // key-value pair of {"status": "success"}
      res.body.status.should.eql('success');
      // the JSON response body should have a
      // key-value pair of {"data": 1 breed object}
      res.body.data[0].should.include.keys(
        'id', 'name', 'nicknames', 'description', 'origin', 'life_span', 'temperament', 'colors', 'height', 'weight', 'coat', 'akc', 'image', 'created_at', 'updated_at'
      );
      done();
    });
  });
  it('should throw an error if the breed does not exist', (done) => {
  chai.request(server)
  .get('/api/v1/breeds/9999999')
  .end((err, res) => {
    // there should an error
    should.exist(err);
    // there should be a 404 status code
    res.status.should.equal(404);
    // the response should be JSON
    res.type.should.equal('application/json');
    // the JSON response body should have a
    // key-value pair of {"status": "error"}
    res.body.status.should.eql('error');
    // the JSON response body should have a
    // key-value pair of {"message": "That breed does not exist."}
    res.body.message.should.eql('That breed does not exist.');
    done();
  });
});
});

describe('POST /api/v1/breeds', () => {
  it('should return the breed that was added', (done) => {
    chai.request(server)
    .post('/api/v1/breeds')
    .send({
      name: 'Frankfurter',
      nicknames: 'Hot Dog',
      description: 'Test breed, not for consumption',
      origin: 'Food',
      life_span: '1 - 30 days',
      temperament: 'N/A',
      colors: 'Hopefully just Brown',
      height: ({male: (1, 2), female: (1,2)}),
      weight: ({male: (2, 4), female: (1,3)}),
      coat: 'Plastic',
      akc: 'N/A',
      image: 'https://i.warosu.org/data/ck/img/0064/41/1429779578961.png'
    })
    .end((err, res) => {
      // there should be no errors
      should.not.exist(err);
      // there should be a 201 status code
      // (indicating that something was "created")
      res.status.should.equal(201);
      // the response should be JSON
      res.type.should.equal('application/json');
      // the JSON response body should have a
      // key-value pair of {"status": "success"}
      res.body.status.should.eql('success');
      // the JSON response body should have a
      // key-value pair of {"data": 1 breed object}
      res.body.data[0].should.include.keys(
        'id', 'name', 'nicknames', 'description', 'origin', 'life_span', 'temperament', 'colors', 'height', 'weight', 'coat', 'akc', 'image', 'created_at', 'updated_at'
      );
      done();
    });
  });
  it('should throw an error if the payload is malformed', (done) => {
  chai.request(server)
  .post('/api/v1/breeds')
  .send({
    description: 'The fun fact for the day'
  })
  .end((err, res) => {
    // there should an error
    should.exist(err);
    // there should be a 400 status code
    res.status.should.equal(400);
    // the response should be JSON
    res.type.should.equal('application/json');
    // the JSON response body should have a
    // key-value pair of {"status": "error"}
    res.body.status.should.eql('error');
    // the JSON response body should have a message key
    should.exist(res.body.message);
    done();
  });
});
});

describe('PUT /api/v1/breeds', () => {
  it('should return the breed that was updated', (done) => {
    knex('breeds')
    .select('*')
    .then((breed) => {
      const breedObject = breed[0];
      chai.request(server)
      .put(`/api/v1/breeds/${breedObject.id}`)
      .send({
        coat: 'Filmy'
      })
      .end((err, res) => {
        // there should be no errors
        should.not.exist(err);
        // there should be a 200 status code
        res.status.should.equal(200);
        // the response should be JSON
        res.type.should.equal('application/json');
        // the JSON response body should have a
        // key-value pair of {"status": "success"}
        res.body.status.should.eql('success');
        // the JSON response body should have a
        // key-value pair of {"data": 1 breed object}
        res.body.data[0].should.include.keys(
          'id', 'name', 'nicknames', 'description', 'origin', 'life_span', 'temperament', 'colors', 'height', 'weight', 'coat', 'akc', 'image', 'created_at', 'updated_at'
        );
        // ensure the breed was in fact updated
        const newBreedObject = res.body.data[0];
        newBreedObject.coat.should.not.eql(breedObject.coat);
        done();
      });
    });
  });
  it('should throw an error if the breed does not exist', (done) => {
  chai.request(server)
  .put('/api/v1/breeds/9999999')
  .send({
    coat: 'Filmy'
  })
  .end((err, res) => {
    // there should an error
    should.exist(err);
    // there should be a 404 status code
    res.status.should.equal(404);
    // the response should be JSON
    res.type.should.equal('application/json');
    // the JSON response body should have a
    // key-value pair of {"status": "error"}
    res.body.status.should.eql('error');
    // the JSON response body should have a
    // key-value pair of {"message": "That breed does not exist."}
    res.body.message.should.eql('That breed does not exist.');
    done();
   });
  });
});

describe('DELETE /api/v1/breeds/:id', () => {
  it('should return the breed that was deleted', (done) => {
    knex('breeds')
    .select('*')
    .then((breeds) => {
      const breedObject = breeds[0];
      const lengthBeforeDelete = breeds.length;
      chai.request(server)
      .delete(`/api/v1/breeds/${breedObject.id}`)
      .end((err, res) => {
        // there should be no errors
        should.not.exist(err);
        // there should be a 200 status code
        res.status.should.equal(200);
        // the response should be JSON
        res.type.should.equal('application/json');
        // the JSON response body should have a
        // key-value pair of {"status": "success"}
        res.body.status.should.eql('success');
        // the JSON response body should have a
        // key-value pair of {"data": 1 breed object}
        res.body.data[0].should.include.keys(
          'id', 'name', 'nicknames', 'description', 'origin', 'life_span', 'temperament', 'colors', 'height', 'weight', 'coat', 'akc', 'image', 'created_at', 'updated_at'
        );
        // ensure the breed was in fact deleted
        knex('breeds').select('*')
        .then((updatedBreeds) => {
          updatedBreeds.length.should.eql(lengthBeforeDelete - 1);
          done();
        });
      });
    });
  });
  it('should throw an error if the breed does not exist', (done) => {
    chai.request(server)
    .delete('/api/v1/breeds/9999999')
    .end((err, res) => {
      // there should an error
      should.exist(err);
      // there should be a 404 status code
      res.status.should.equal(404);
      // the response should be JSON
      res.type.should.equal('application/json');
      // the JSON response body should have a
      // key-value pair of {"status": "error"}
      res.body.status.should.eql('error');
      // the JSON response body should have a
      // key-value pair of {"message": "That breed does not exist."}
      res.body.message.should.eql('That breed does not exist.');
      done();
    });
  });
});

});