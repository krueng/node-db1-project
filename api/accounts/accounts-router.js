const router = require('express').Router()
const {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId,
 } = require('./accounts-middleware')

router.get('/', (req, res, next) => {
  try {
res.json('get all')
  } catch (error) {
    next(error)
  }
})

router.get('/:id', checkAccountId, (req, res, next) => {
  try {
    res.json('get by id')
  } catch (error) {
    next(error)
  }
})

router.post('/',
  checkAccountPayload,
  checkAccountNameUnique,
  (req, res, next) => {
  try {
    res.json('post')
  } catch (error) {
    next(error)
  }
})

router.put('/:id',
  checkAccountId,
  checkAccountPayload,
  checkAccountNameUnique,
  (req, res, next) => {
  try {
    res.json('put')

  } catch (error) {
    next(error)
  }
});

router.delete('/:id',checkAccountId, (req, res, next) => {
  try {
    res.json('delete')
  } catch (error) {
    next(error)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
  })
})

module.exports = router;