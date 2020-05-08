const { getSingleCurrency } = require('../servises/cryptocompareAPI');

const getSinglePrice = async (req, res, next) => {
  try {
    const { from, convertTo } = req.query;
    const response = await getSingleCurrency(from, convertTo);
    return res.send(response.data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSinglePrice,
};
