const { Router } = require('express');
const router = Router();

//routes files
const authRoutes = require('./auth.routes');
const roleRoutes = require('./role.routes');
const userRoutes = require('./user.routes');

const contractRoutes = require('./contract.routes');
const responsibleRoutes = require('./responsible.routes');
const passengerRoutes = require('./passenger.routes');

//ESTO ESTÁ FUNCIONANDO (necesita refactorización, pero no es urgente)
router.use('/auth', authRoutes);
router.use('/roles', roleRoutes);
router.use('/users', userRoutes);

//ESTO ESTÁ FUNCIONANDO, pero no tiene armados los CRUDs (urgencia media)
router.use('/responsible', responsibleRoutes);
router.use('/passenger', passengerRoutes);

// URGENTE!!!
// NECESITO LOS MODELOS Y LAS RELACIONES FUNCIONANDO.
// TENER EN CUENTA QUE ESTÁ CREADO EL MODELO "PROVINCE" (PARA USAR EN LOS DESTINOS POR EJEMPLO...)
// CREAR LAS MIGRACIONES Y LOS SEEDES CON AL MENOS DOS DATOS EN CASO DE QUE NO EXISTAN
// ********** ESTAS TIENE QUE SER LAS RUTAS, LOS ACHIVOS DE RUTAS ESTÁN CREADOS. LOS CONTROLADORES ESTÁN CREADOS PERO VACÍOS.
router.use('/contracts', contractRoutes); // no tengo ni idea qué es esto
// Y TODO LO DEM'AS QUE FALTA QUE FALTA

module.exports = router;
