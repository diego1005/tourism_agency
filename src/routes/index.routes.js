const { Router } = require('express');
const router = Router();

//routes files
const authRoutes = require('./auth.routes');
const roleRoutes = require('./role.routes');
const userRoutes = require('./user.routes');
const provinceRoutes = require('./provinces.routes');

const cityRoutes = require('./city.routes');
const paymentRoutes = require('./payment.routes');
const tourPackages = require('./tourPackages.routes');
const contractRoutes = require('./provinces.routes');
const responsibleRoutes = require('./responsible.routes');
const studentsRoutes = require('./student.routes');

//ESTO ESTÁ FUNCIONANDO (necesita refactorización, pero no es urgente)
router.use('/auth', authRoutes);
router.use('/roles', roleRoutes);
router.use('/users', userRoutes);
router.use('/provinces', provinceRoutes); // NO SÉ SI SERÁ NECESARIO

//ESTO ESTÁ FUNCIONANDO, pero no tiene armados los CRUDs (urgencia media)
router.use('/cities', cityRoutes); // NO SÉ SI SERÁ NECESARIO
router.use('/responsible', responsibleRoutes);
router.use('/students', studentsRoutes);

// URGENTE!!!
// NECESITO LOS MODELOS Y LAS RELACIONES FUNCIONANDO.
// TENER EN CUENTA QUE ESTÁ CREADO EL MODELO "PROVINCE" (PARA USAR EN LOS DESTINOS POR EJEMPLO...)
// CREAR LAS MIGRACIONES Y LOS SEEDES CON AL MENOS DOS DATOS EN CASO DE QUE NO EXISTAN
// ********** ESTAS TIENE QUE SER LAS RUTAS, LOS ACHIVOS DE RUTAS ESTÁN CREADOS. LOS CONTROLADORES ESTÁN CREADOS PERO VACÍOS.
router.use('/payment', paymentRoutes); // medios de pago (solo agrergar 2)
router.use('/tour-packages', tourPackages); //paquetes de viaje (ej: "Cataratas 5 días" ó "Cataratas 10 días")
router.use('/contracts', contractRoutes); // no tengo ni idea qué es esto
// Y TODO LO DEM'AS QUE FALTA QUE FALTA

module.exports = router;
