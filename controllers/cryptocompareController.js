const requestHelper = require('../helper/requestHelper')
const { getSingleCurrency } = require('../servises/cryptocompareAPI')
const getSinglePrice = async (req, res, next) => {
  try {
    const { from, convertTo } = req.query;
    let response = await getSingleCurrency(from, convertTo);
    return res.send(response.data)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getSinglePrice
}
