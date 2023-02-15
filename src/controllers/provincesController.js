const { Province } = require('../database/models');

module.exports = {
  get: async (req, res) => {
    try {
      const provinces = await Province.findAll();
      res.status(200).json({
        status: 'success',
        count: provinces.length,
        data: provinces
      });
    } catch (error) {
      //TODO: Create a helper endpoint error respons
      res.status(409).json({
        msg: 'An error has ocurred trying to bring the provinces',
        error,
        status: 'error'
      });
    }
  }
};
