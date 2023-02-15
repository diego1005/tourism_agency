const { TravelDestination } = require('../database/models');

module.exports = {
  getDestinations: async (req, res) => {
    try {
      const destinationList = await TravelDestination.findAll();
      res.status(200).json({
        data: destinationList,
        status: 'success'
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        msg: 'An error has ocurred when trying to bring the travel destinations',
        status: 'denied'
      });
    }
  },
  destinationCreate: async (req, res) => {
    try {
      await TravelDestination.create(req.body);
      res.status(200).json({
        msg: 'destination created successfully',
        status: 'success'
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        msg: 'An error has ocurred when trying to create the travel destination',
        error,
        returnData: req.body,
        status: 'bad request'
      });
    }
  },
  destinationUpgrade: (req, res) => {},
  destinationDelete: (req, res) => {}
};
