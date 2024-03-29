const { Movimiento, Usuario } = require('../database/models');
const { Op } = require('sequelize');
const { SUPER } = require('../constants/roles');

module.exports = {
  get: async (req, res) => {
    const { from, to, info } = req.query;

    const start = from.concat(' 00:00:00');
    const end = to.concat(' 23:59:59');

    let where = {
      id_usuario: req.user.id,
      created_at: {
        [Op.and]: {
          [Op.gte]: start,
          [Op.lte]: end
        }
      },
      info: {
        [Op.like]: `%${info}%`
      }
    };

    if (req.user.rol.name === SUPER) {
      where = {
        created_at: {
          [Op.and]: {
            [Op.gte]: start,
            [Op.lte]: end
          }
        },
        info: {
          [Op.like]: `%${info}%`
        }
      };
    }

    const movements = await Movimiento.findAll({
      where,
      include: {
        model: Usuario,
        as: 'usuario'
      },
      order: [['id', 'DESC']]
    });

    const incomes = movements.filter((el) => el.tipo === 'ingreso');
    const totalIncomes = incomes.reduce((acc, el) => acc + Number(el.importe), 0);
    const cash = incomes.filter((el) => el.forma_pago === 'efectivo').reduce((acc, el) => acc + Number(el.importe), 0);
    const debit = incomes.filter((el) => el.forma_pago === 'debito').reduce((acc, el) => acc + Number(el.importe), 0);
    const credit = incomes.filter((el) => el.forma_pago === 'credito').reduce((acc, el) => acc + Number(el.importe), 0);
    const transference = incomes.filter((el) => el.forma_pago === 'transferencia').reduce((acc, el) => acc + Number(el.importe), 0);
    const mercadopago = incomes.filter((el) => el.forma_pago === 'mercadopago').reduce((acc, el) => acc + Number(el.importe), 0);

    const outcomes = movements.filter((el) => el.tipo === 'egreso');
    const totalOutcomes = outcomes.reduce((acc, el) => acc + Number(el.importe), 0);

    res.status(200).json({
      status: 'success',
      msg: 'Balance generado',
      data: {
        movements,
        movementsCount: movements.length,
        incomes,
        incomesCount: incomes.length,
        totalIncomes,
        cash,
        debit,
        credit,
        transference,
        mercadopago,
        outcomes,
        outcomesCount: outcomes.length,
        totalOutcomes,
        date: new Date()
      }
    });
  },
  create: async (req, res) => {
    await Movimiento.create({ ...req.body, id_usuario: req.user.id });
    res.status(200).json({
      status: 'success',
      msg: 'Movimiento cargado'
    });
  }
};
