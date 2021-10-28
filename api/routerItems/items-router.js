//Imports
const router = require('express').Router();
const Items = require('./items-model'); 
const {
      checkId, 
      confirmItem
} = require('./middleware')


//Endpoints
router.get('/', (req, res, next) => {
  Items.findAll()
  .then(items => {
      res.json(items)
  })
  .catch(next)
})

router.get('/:item_id', checkId, (req, res, next) => {
  const {item_id} = req.params
  Items.findById(item_id)
  .then(item => {
      res.json(item)
  })
  .catch(next)
})

router.post('/user/:user_id', confirmItem, (req, res, next) => {
  Items.addItem(req.body, req.params)
  .then(plant => {
      res.status(201).json(plant)
  })
  .catch(next)
})

router.put('/:item_id', checkId,  confirmItem, (req, res, next) => {
  const {item_name, item_description, item_location, item_price} = req.body
  
  Items.update(req.params.item_id, {item_name, item_description, item_location, item_price})
  .then(() => {
      res.status(200).json(req.body)
  })
  .catch(next)
})

router.delete('/:user_id/:item_id', checkId, (req, res, next) => {
  Items.remove(req.params.item_id)
  .then(() => {
      res.status(200).json({
          message: `Did your item die? That's okay. I'm only judging you the slightest bit.`
      })
  })
  .catch(next)
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
  })
})


//Exports; Exposing
module.exports = router;