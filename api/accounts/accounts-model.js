const db = require('../../data/db-config.js')

async function getAll() {
  const result = await db('accounts')
  return result
}

async function getById (id) {
  const result = await db('accounts').where('id', id).first()
  // console.log(result)
  return result
}

async function getByName (name) {
  const result = await db('accounts').where('name', name)
  return result
}

async function create (newAccount) {
  const [id] = await db('accounts').insert(newAccount)
  const account = await getById(id)
  return account
  // console.log('create')
}

async function updateById(id, account) {
  // console.log('updateById')
  await db('accounts').update(account).where('id', id)
  return getById(id)
}

const deleteById = id => {
  // console.log('deleteById')
  const result = db('accounts').del().where('id', id)
  return result
}

module.exports = {
  getAll,
  getById,
  getByName,
  create,
  updateById,
  deleteById,
}
