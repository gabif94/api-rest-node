module.exports = (err, req, res, next) => {
  console.error(err)
  console.log(err.name)

  if (err.name === 'CastError') {
    res.status(400).end()
  } else {
    res.status(500).end()
  }
}
