const express = require('express');
const {getOverview} = require('../db/queries/overview');

const router = express.Router();


router.get('/', (req, res) => {
  getOverview()
    .then(services => {
      res.json(services);
    });
});

module.exports = router;