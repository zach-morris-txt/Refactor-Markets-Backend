const Items = require('./items-model')

const checkId = (req, res, next) => {
    const id = req.params.item_id
    Items.findById(id)
    .then(item => {
        if(!item) {
            res.status(404).json({
                message: `Item doesn't exist`
            })
        } else {
            next()
        }
    })
    .catch(err => {
        res.status(500).json({
            message: err.message
        })
    })
}

const confirmItem = (req, res, next) => {
    const {item_name, item_description, item_location} = req.body
    if (
        !item_name || item_name.trim() === null
        || !item_description || item_description.trim() === null
        || !item_location
    ) {
        res.status(400).json({
            message: `All items must have a name, description, and location.`
        })
    } else {
        next()
    }
}

module.exports = {
    checkId,
    confirmItem
}