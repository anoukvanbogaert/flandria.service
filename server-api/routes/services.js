const express = require('express');
const {getCategories} = require('../db/queries/categories');

const router = express.Router();


router.get('/', (req, res) => {
  getServices()
    .then(services => {
      res.json(services);
    });
});

module.exports = router;