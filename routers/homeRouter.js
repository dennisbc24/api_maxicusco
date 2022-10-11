const express = require('express');

const router = express.Router();

const path = require('path');

const publicPath = __dirname.replace('routers', 'dennis');
router.get('/', (req, res) => {
  //res.send('hola mundo')

  res.render('index');
})

module.exports = router;
