const { SUPER } = require('../../constants/roles');
const { ContratoIndividual, ContratoGeneral, Institucion, Pasajero, Parametro, Cuota } = require('../../database/models');
const { validationResult } = require('express-validator');

module.exports = {
  get: async (req, res) => {
    try {
      let individualContracts = await ContratoIndividual.findAll({
        include: [
          {
            model: ContratoGeneral,
            as: 'contrato_general',
            include: {
              model: Institucion,
              as: 'institucion'
            }
          },
          {
            model: Pasajero,
            as: 'pasajero'
          }
        ],
        order: [['id', 'DESC']]
      });
      if (req.user.rol.name !== SUPER) {
        const mapped = individualContracts?.map((result) => result.dataValues);
        individualContracts = mapped?.filter((el) => el.estado === 'vigente');
      }
      res.status(200).json({
        status: 'success',
        count: individualContracts?.length,
        data: individualContracts || []
      });
    } catch (error) {
      res.status(409).json({
        msg: 'Ha ocurrido un error al intentar recuperar los contratos individuales',
        error,
        status: 'error'
      });
    }
  },
  getByQuery: async (req, res) => {
    try {
      const { code } = req.query;
      let individualContracts;
      if (code) {
        individualContracts = await ContratoIndividual.findAll({
          where: { cod_contrato: code },
          include: [
            {
              model: ContratoGeneral,
              as: 'contrato_general'
            },
            {
              model: Pasajero,
              as: 'pasajero'
            }
          ],
          order: [['id', 'DESC']]
        });
      }
      if (req.user.rol.name !== SUPER) {
        const mapped = individualContracts?.map((result) => result.dataValues);
        individualContracts = mapped?.filter((el) => el.estado === 'vigente');
      }
      return res.status(200).json({
        status: 'success',
        msg: 'Contratos recuperados',
        count: individualContracts?.length,
        data: individualContracts || []
      });
    } catch (error) {
      res.status(409).json({
        msg: 'Ha ocurrido un error al intentar recuperar los contratos',
        error,
        status: 'error'
      });
    }
  },
  recalculate: async (req, res) => {
    try {
      const { id } = req.params;
      let { nuevo_valor } = req.body;
      nuevo_valor = Number(nuevo_valor);

      const contratoIndividual = await ContratoIndividual.findByPk(id);
      const { valor_contrato } = contratoIndividual;
      const diferencia_precio = Number(nuevo_valor) - Number(valor_contrato);

      const seniaYCuotas = await Cuota.findAll({
        where: {
          id_contrato_individual: id
        },
        attributes: ['valor_primer_vencimiento', 'valor_segundo_vencimiento', 'estado', 'numero']
      });

      const parametros = await Parametro.findOne({
        where: {
          id: 1
        },
        attributes: ['porcentaje_recargo_segundo_vencimiento']
      });

      const porcentajeRecargo = parametros.porcentaje_recargo_segundo_vencimiento;

      const senia = seniaYCuotas.find((el) => el.numero === 0);
      const totalSenia = Number(senia.valor_primer_vencimiento);

      const cuotasPagadas = seniaYCuotas.filter((el) => el.numero !== 0 && el.estado === 'pagada');
      const cantidadCuotasPagadas = cuotasPagadas.length;
      const cuotasPendientes = seniaYCuotas.filter((el) => el.numero !== 0 && el.estado !== 'pagada');
      const cantidadCuotasPendientes = cuotasPendientes.length;

      const totalCuotasPagadas = cuotasPagadas[0].valor_primer_vencimiento * cantidadCuotasPagadas;
      const totalCuotasPendientes = cuotasPendientes[0].valor_primer_vencimiento * cantidadCuotasPendientes;

      const cuotasRecalculadas = cuotasPendientes
        .map((el) => el.dataValues)
        .map((cuota) => {
          const primerVencimiento = Number(cuota.valor_primer_vencimiento) + Number(diferencia_precio) / Number(cantidadCuotasPendientes);
          return {
            ...cuota,
            valor_primer_vencimiento: primerVencimiento,
            valor_segundo_vencimiento: primerVencimiento + (primerVencimiento * porcentajeRecargo) / 100
          };
        });

      res.status(200).json({
        a: id,
        status: 'success',
        msg: 'Cuotas recalculadas',
        diferencia_precio,
        totalSenia,
        totalCuotasPagadas,
        totalCuotasPagadas,
        totalCuotasPendientes,
        cantidadCuotasPendientes,
        cuotasRecalculadas,
        cuotasPagadas,
        senia,
        data: {
          cuotasPendientes,
          diferencia_precio,
          contratoIndividual
        }
      });
    } catch (error) {
      res.status(409).json({
        status: 'error',
        msg: 'Ha ocurrido un error al intentar recalcular las cuotas de un contrato individual',
        error
      });
    }
  },
  getById: (req, res) => {
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    res.status(200).json({
      status: 'success',
      msg: 'Contrato individual encontrado',
      data: req.individualContract
    });
  },
  installments: async (req, res) => {
    const { id } = req.params;
    const seniaYCuotas = await Cuota.findAll({
      where: {
        id_contrato_individual: id
      }
    });
    res.status(200).json({
      status: 'success',
      msg: 'Listado de cuotas',
      data: seniaYCuotas
    });
  },
  create: async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      try {
        const { id_contrato_general, id_pasajero, valor, cuotas, codigo_contrato_individual } = req.body;

        const individualContract = await ContratoIndividual.create({
          id_contrato_general: id_contrato_general,
          id_pasajero: id_pasajero,
          cod_contrato: codigo_contrato_individual,
          valor_contrato: valor,
          pagos: 0,
          recargos_pagos_segundo_vencimiento: 0,
          estado: 'vigente'
        });

        const cuotasConId = cuotas.map((el) => ({ ...el, id_contrato_individual: individualContract.id }));

        await Promise.all(cuotasConId.map(async (share) => Cuota.create({ ...share })));

        const generalContract = await ContratoGeneral.findByPk(id_contrato_general);
        const occupiedSeats = generalContract.asientos_ocupados + 1;
        await ContratoGeneral.update({ asientos_ocupados: occupiedSeats }, { where: { id: id_contrato_general } });

        res.status(200).json({
          status: 'success',
          msg: 'Contrato individual creado con éxito',
          data: {
            codigo: individualContract.cod_contrato
          }
        });
      } catch (error) {
        res.status(409).json({
          status: 'error',
          msg: 'Ha ocurrido un error al intentar crear el contrato individual',
          error
        });
      }
    } else {
      res.status(400).json({
        status: 'bad request',
        msg: 'El formulario tiene errores en los campos',
        error: errors,
        returnData: req.body
      });
    }
  },
  edit: async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      try {
        const { estado } = req.body;
        const { id } = req.params;
        await ContratoIndividual.update({ estado }, { where: { id } });
        res.status(200).json({
          status: 'success',
          msg: 'Contrato individual editado con éxito'
        });
      } catch (error) {
        res.status(409).json({
          status: 'error',
          msg: 'Ha ocurrido un error al intentar editar el contrato individual',
          error
        });
      }
    } else {
      res.status(400).json({
        status: 'bad request',
        msg: 'El formulario tiene errores en los campos',
        error: errors,
        returnData: req.body
      });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await ContratoIndividual.destroy({ where: { id } });
      res.status(200).json({
        status: 'success',
        msg: 'Contrato general borrado con éxito'
      });
    } catch (error) {
      res.status(409).json({
        msg: 'Ha ocurrido un error al intentar borrar el contrato general',
        error,
        status: 'error'
      });
    }
  }
};
