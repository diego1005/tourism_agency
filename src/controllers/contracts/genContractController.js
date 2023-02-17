const { ContratoGeneral } = require('../../database/models');

module.exports = {
  get: async (req, res) => {
    try {
      const generalContractList = await ContratoGeneral.findAll();
      if (generalContractList) {
        res.status(200).json({
          count: generalContractList.length,
          data: generalContractList,
          status: 'success'
        });
      } else {
        res.status(404).json({
          msg: 'Aun no hay contratos cargados',
          status: 'not found'
        });
      }
    } catch (error) {
      res.status(400).json({
        msg: 'Ha ocurrido un error al intentar traer los contratos generales',
        status: 'denied'
      });
    }
  },
  getById: (req, res) => {},
  create: (req, res) => {},
  edit: (req, res) => {},
  delete: (req, res) => {}
};
