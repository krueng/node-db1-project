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
      const newAccount = await Account.create({
        name: req.body.name.trim(),
        budget: req.body.budget,
      })
      res.status(201).json(newAccount)
    } catch (error) {
      next(error)
    }
  })

router.put('/:id',
  checkAccountId,
  checkAccountPayload,
  async (req, res, next) => {
    try {
      const updated = await Account.updateById(req.params.id, req.body)
      res.json(updated)
    } catch (error) {
      next(error)
    }
  });

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try {
    await Account.deleteById(req.params.id)
    res.json(req.account)
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
