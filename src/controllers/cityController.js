const { City, Province } = require('../database/models');

module.exports = {
  getCity: async (req, res) => {
    try {
      const cities = await City.findAll({
        include: [
          {
            model: Province,
            as: 'province'
          }
        ]
      });
      res.status(200).json({
        status: 'success',
        count: cities.length,
        data: cities
      });
    } catch (error) {
      //TODO: Create a helper endpoint error respons
      res.status(409).json({
        msg: 'An error has ocurred trying to bring the users',
        error,
        status: 'error'
      });
    }
  },
  cityCreate: (req, res) => {},
  cityUpgrade: (req, res) => {},
  cityDelete: (req, res) => {}
};
