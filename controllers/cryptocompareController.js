const requestHelper = require('../helper/requestHelper');


const cryptocompareController = {
  getSinglePrice: async (req, res) => {
    const cryptocompareParams = global.gConfig.api.cryptocompare;
    if (!req.query.convertTo) {
      return res.status(400).send({message: 'convertTo query param missing example: convertTo=USD,EUR,USD'});
    }
    let options = {
      host: `${cryptocompareParams.host.replace(/https?:\/\//,'')}`,
      path: `/data/price?fsym=${req.params.from.toUpperCase()}&tsyms=${req.query.convertTo.toUpperCase()}`,
      authorization: `Apikey ${cryptocompareParams.apiKey}`
    };
    try {
      let response = await requestHelper.get(options);
      if (!response.data) {
        return res.status(500).send({message: "Response data is empty"})
      }
      if (response.data && response.data.Response === "Error") {
        return res.status(400).send({message: response.data.Message});
      }
      // let data = response.data;
      return res.send(response.data)
    } catch (error) {
      return res.status(500).send(error.message  ? {message: error.message} : error);
    }
  }
};

module.exports = cryptocompareController;
