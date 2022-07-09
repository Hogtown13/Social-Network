const router = require('express').Router();
const apiRoutes = require('./api');


router.use('/api', apiRoutes);


router.use((req, res) => {
  res.status(404).send('<h1>Something went wrong!</h1>');
});

module.exports = router;