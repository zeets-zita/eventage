process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Event = require('../models/Event');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);

describe('Events', () => {
    beforeEach((done) => {
        Event.remove({}, (err) => { 
           done();           
        });        
    });
  describe('/GET events', () => {
      it('it should GET all the events', (done) => {
        chai.request(server)
            .get('/api/events')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
              done();
            });
      });
  });
  /*
  * Test the /POST route
  */
  describe('/POST event', () => {
      it('it should POST a event ', (done) => {
          let event = {
              name: "Meeting",
              description: "sssssssssssssssssssss",
              venue: '2nd Floor, Room F',
              day: '2019-08-12',
              time: '12:00'
          }
        chai.request(server)
            .post('/api/events')
            .send(event)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('msg').eql('Event added!');
                  res.body.event.should.have.property('name');
                  res.body.event.should.have.property('description');
                  res.body.event.should.have.property('venue');
                  res.body.event.should.have.property('day');
                  res.body.event.should.have.property('time');
              done();
            });
      });
  });

  /*
  * Test the /GET/:id route
  */
  describe('/GET/:id event', () => {
      it('it should GET a event by the given id', (done) => {
          let event = new Event({
            name: "Meeting",
            description: "sssssssssssssssssssss",
            venue: '2nd Floor, Room F',
            day: '2019-08-12',
            time: '12:00' });
          event.save((err, event) => {
              chai.request(server)
            .get('/api/events/' + event.id)
            .send(event)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('name');
                  res.body.should.have.property('description');
                  res.body.should.have.property('venue');
                  res.body.should.have.property('day');
                  res.body.should.have.property('time');
                  res.body.should.have.property('_id').eql(event.id);
              done();
            });
          });

      });
  });
 /*
  * Test the /PUT/:id route
  */
 describe('/PUT/:id event', () => {
    it('it should UPDATE a event given the id', (done) => {
        let event = new Event({
            name: "Team Building",
            description: "yyyyyyyyyyyyyyyyyyyyyyyyyyy",
            venue: '1st Floor, Room C',
            day: '2019-08-24',
            time: '13:00' });
        event.save((err, event) => {
              chai.request(server)
              .put('/api/events/' + event.id)
              .send({name: "Team Building", description: "yyyyyyyyyyyyyyyyyyyyyyyyyyy", venue: '1st Floor, Room C', day: '2019-08-24', time: '13:30'})
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('msg').eql('Event updated!');
                    res.body.event.should.have.property('time').eql('13:30');
                done();
              });
        });
    });
});
 /*
  * Test the /DELETE/:id route
  */
 describe('/DELETE/:id event', () => {
    it('it should DELETE a event given the id', (done) => {
        let event = new Event({
            name: "Team Building",
            description: "yyyyyyyyyyyyyyyyyyyyyyyyyyy",
            venue: '1st Floor, Room C',
            day: '2019-08-24',
            time: '13:00' });
        event.save((err, event) => {
              chai.request(server)
              .delete('/api/events/' + event.id)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('msg').eql('Event deleted!');
                    res.body.result.should.have.property('ok').eql(1);
                    res.body.result.should.have.property('n').eql(1);
                done();
              });
        });
    });
});
});
