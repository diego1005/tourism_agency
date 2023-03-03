const { Cuota, Movimiento, ContratoIndividual } = require('../database/models');

module.exports = {
  getById: (req, res) => {
    res.status(200).json({
      status: 'success',
      msg: 'Institución encontrada',
      data: req.institution
    });
  },
  createPay: async (req, res) => {
    const { id, cuota, movimiento, contratoIndividual } = req.body;

    const { descuento, recargo, diferencia_descripcion, ...rest } = movimiento;
    // Revisar

    await Cuota.update({ estado: cuota.estado }, { where: { id: cuota.id } });

    await Movimiento.create(rest);

    if (Number(descuento) > 0) {
      await Movimiento.create({ importe: Number(descuento) * -1, tipo: 'egreso', forma_pago: 'egreso', info: diferencia_descripcion });
    }

    if (Number(recargo) > 0) {
      await Movimiento.create({ importe: Number(recargo), tipo: 'ingreso', forma_pago: rest.forma_pago, info: diferencia_descripcion });
    }

    const individualContract = await ContratoIndividual.findByPk(id);
    const pagos = Number(individualContract.pagos);
    const recargosPagos = Number(individualContract.recargos_pagos_segundo_vencimiento);

    if (Number(contratoIndividual.recargo) > 0) {
      await ContratoIndividual.update(
        {
          pagos: pagos + Number(contratoIndividual.pago),
          recargos_pagos_segundo_vencimiento: contratoIndividual.recargo
        },
        { where: { id } }
      );
    } else {
      await ContratoIndividual.update(
        {
          pagos: pagos + Number(contratoIndividual.pago),
          recargos_pagos_segundo_vencimiento: recargosPagos + Number(contratoIndividual.recargo)
        },
        { where: { id } }
      );
    }

    const resultado = await ContratoIndividual.findByPk(id);
    const valor_contrato = resultado.valor_contrato;
    const pagosHechos = resultado.pagos;

    if (valor_contrato === pagosHechos) {
      await ContratoIndividual.update({ estado: 'pagado' }, { where: { id } });
    }

    res.status(200).json({
      status: 'success',
      msg: 'Pago creado con éxito. Redireccionando al contrato individual'
    });
  }
};
