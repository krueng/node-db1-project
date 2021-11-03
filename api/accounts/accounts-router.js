const router = require('express').Router()
const Account = require('./accounts-model')
const {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId,
} = require('./accounts-middleware')

router.get('/', async (req, res, next) => {
  try {
    const account = await Account.getAll()
    res.json(account)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', checkAccountId, async (req, res, next) => {
  res.json(req.account)
})

router.post('/',
  checkAccountPayload,
  checkAccountNameUnique,
  async (req, res, next) => {
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
  async (req, res, next) => {
    try {
      res.json('put')

    } catch (error) {
      next(error)
    }
  });

router.delete('/:id', checkAccountId, async (req, res, next) => {
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