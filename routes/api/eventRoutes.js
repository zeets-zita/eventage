const express = require('express')
const router = express.Router();
// events model

const Event = require('../../models/Event');
const requireLogin = require('../../middlewares/requireLogin');

// @route GET api/events
//@desc Get all events
//@acess Public

router.get('/', (req, res) => {
    Event.find()
      .sort({ date: 1 })
      .then(events => res.json(events));
});


// @route   GET api/events/:id
// @desc    Get Post by id
// @access  Public route
router.get('/:id', (req, res) => {
    Event.findById(req.params.id)
      .then(event => res.json(event))
      .catch(err => res.status(404).json({ msg: 'No event found with that ID' }))
    })


// @route Post api/events
//@desc Post create event
//@acess Private

router.post('/', requireLogin, (req, res) => {
    const newEvent = new Event({
        name: req.body.name,
        description: req.body.description,
        venue: req.body.venue,
        day: req.body.day,
        time: req.body.time,
        date: req.body.date
    });
    newEvent.save()
    .then(event => res.json(event));
});

// @route Delete api/events/:id
//@desc Delete event
//@acess Private

router.delete('/:id', requireLogin, (req, res) => {
    Event.findById(req.params.id)
    .then(event => event.remove()
    .then(() => res.json({msg: 'Event deleted!'}))
    )
    .catch(err => res.status(404).json({msg: 'Event not deleted!'}));
});



// @route PUT api/events/:id
// @desc Update an event
// @access Private
router.put('/:id', requireLogin, async (req, res) => {
  const { name, description, venue, day, time, date } = req.body;
  const event = await Event.findByIdAndUpdate(req.params.id, {
    $set: {
        name, 
        description,
        venue,
        day,
        time,
        date
      }
      })
    res.send({ msg: 'Event updated!', event});
})

module.exports = router;