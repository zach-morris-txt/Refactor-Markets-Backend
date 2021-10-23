//Imports
const router = require('express').Router()
const Item = require('./items-model'); //Object W/ Methods
const md = require('../middleware/middleware')
const restrict = require('../middleware/restrict')


//Endpoints
//GetAll, GetById, GetByLocation(filter), Get/ownerID/all, POST, PUT, DELETE
//[GET] All Items
router.get('/', 
  restrict,
  (req, res, next) => {
    Item.getItems()
      .then(resource => {

        res.status(200).json(resource);
      })
      .catch(next);
});

//[GET] Item By ItemId
router.get("/:itemId",
  restrict,
  (req, res, next) => {
    const { itemId } = req.params;

    if (itemId) {
      Item.getItemById(itemId)
        .then(specificItem => {
          res.status(200).json(specificItem);
        })
        .catch(next)
    } else {
      res.status(406).json({ message: "Item Id Required" });
    }
});

//[GET] Item By Location
router.get("/:location",
  restrict,
  (req, res, next) => {
    const { location } = req.params;

    if (location) {
      Item.findItemBy(location)
        .then((specificItem) => {
          res.status(200).json(specificItem[0]);
        })
        .catch(next)
    } else {
      res.status(406).json({ message: "Item Location Required" });
    }
});

//[PUT] Item By ItemId
router.put("/:itemId",
  // restrict,
  // md.only,
  (req, res, next) => {
    const updatedItem = req.body;
    const { itemId } = req.params;

    if (updatedItem.item_name) {
      Item.updateItemById(itemId,updatedItem)
        .then((update) => {
          res.status(200).json(update[0]);
        })
        .catch(next)
    } else {
      res.status(406).json({ message: "ItemId And Name Are Required" });
    }
});

//[POST]
router.post('/', 
  restrict,
  // md.only, 
  (req, res, next) => {
    Item.createItem(req.body)
      .then(resource => {
        res.status(201).json(resource);
      })
      .catch(next);
});

//[DELETE] Plant By itemId
router.delete("/:itemId", 
  restrict,
  // md.only,
  (req, res, next) => {
    const { itemId } = req.params;

    Item.deleteItem(itemId)
      .then((resolution) => {
        res.status(200).json(resolution);
      })
      .catch(next)
});


//Exports; Exposing
module.exports = router;