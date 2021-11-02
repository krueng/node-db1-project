const yup = require('yup');
const Accounts = require('./accounts-model')

const accountSchema = yup.object().shape({
  // name: yup.string("name and budget are required").required(),
  name: yup
    .string('must be a string')
    .typeError('must be a string')
    .trim()
    .strict(true)
    .min(3, 'name has to be between 3 and 100')
    .max(100, 'name has to be between 3 and 100')
    .required('name and budget are required'),

  budget: yup
    .number("must be a number")
    .strict(true)
    .typeError('must be a number')
    .min(0, 'too large or too small')
    .max(1000000, 'too large or too small')
    .required('name and budget are required'),
})

exports.checkAccountPayload = (req, res, next) => {
  accountSchema.validate(req.body)
    .then(() => {
      req.body.name = req.body.name.trim();

      return Accounts.getByName(req.body.name);
    })
    .then(result => {
      if (result.length > 0) {
        res.status(400).json({
          message: 'name is taken',
        })
      } else {
        next();
      }
    })
    .catch(err => {
      res.status(400).json({
        message: err.errors[0]
      })
    })
}

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const account = await Accounts.getByName(req.params.name)
    if (account) {
      res.status(404).json({
        message: 'name is taken'
      })
    } else {
      req.account = account
      next()
    }
  } catch (err) {
    res.status(500).json({
      message: 'Error checking account'
    })
  }
}

exports.checkAccountId = async (req, res, next) => {
  try {
    const account = await Accounts.getById(req.params.id)
    if (!account) {
      res.status(404).json({
        message: 'account not found'
      })
    } else {
      req.account = account
      next()
    }
  } catch (err) {
    res.status(500).json({
      message: 'Error getting account'
    })
  }

}
