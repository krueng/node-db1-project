const router = require('express').Router()

router.get('/', (req, res, next) => {
  try {
res.json('get all')
  } catch (error) {
    next(error)
  }
})

router.get('/:id', (req, res, next) => {
  try {
    res.json('get by id')
  } catch (error) {
    next(error)
  }
})

router.post('/', (req, res, next) => {
  try {
    res.json('post')
  } catch (error) {
    next(error)
  }
})

router.put('/:id', (req, res, next) => {
  try {
    res.json('put')

  } catch (error) {
    next(error)
  }
});

router.delete('/:id', (req, res, next) => {
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