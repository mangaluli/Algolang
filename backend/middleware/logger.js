module.exports = (req, res, next) => {
  console.log(`${req.method}: ${req.url}`);
  console.log(req.body);
  next();
}