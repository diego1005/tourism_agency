const { Router } = require('express');
const router = Router();

//routes files
const userRoutes = require('./user.routes');
const authRoutes = require('./auth.routes');
const roleRoutes = require('./role.routes');
const provinceRoutes = require('./provinces.routes');

const paymentRoutes = require('./payment.routes');
const cityRoutes = require('./city.routes');
const destinationRoutes = require('./destination.routes');
const contractRoutes = require('./provinces.routes');
const responsibleRoutes = require('./responsible.routes');
const studentsRoutes = require('./student.routes');

//routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/roles', roleRoutes);
router.use('/provinces', provinceRoutes);

// URGENTE!!!
// NECESITO LOS MODELOS Y LAS RELACIONES FUNCIONANDO.
// CREAR EL MODELO CITY (PARA USARSE EN DISTINATION, STUDENT, RESPONSILBE, ETC.)
// TENER EN CUENTA QUE ESTÁ CREADO EL MODELO "PROVINCE" (PARA USAR EN LOS DESTINOS POR EJEMPLO...)
// LOS "RESPONSIBLE" YA NO SERÁ "USERS", TIENE QUE SER OTRO MODELO APARTE CON: firstname, lastname, document, birthdate(de tipo fecha), city, address, phone, postalcode, info(de tipo text)
// LOS "STUDENTES" YA NO SERÁ "USERS", TIENE QUE SER OTRO MODELO APARTE CON: firstname, lastname, document, birthdate(de tipo fecha), city, address, postalcode, info(de tipo text)
// CREAR LAS MIGRACIONES Y LOS SEEDES CON AL MENOS DOS DATOS EN CASO DE QUE NO EXISTAN

// ********** ESTAS TIENE QUE SER LAS RUTAS, LOS ACHIVOS DE RUTAS ESTÁN CREADOS. LOS CONTROLADORES ESTÁN CREADOS PERO VACÍOS.
router.use('/payment', paymentRoutes);
router.use('/cities', cityRoutes);
router.use('/destination', destinationRoutes);
router.use('/contracts', contractRoutes);
router.use('/responsible', responsibleRoutes);
router.use('/students', studentsRoutes);

module.exports = router;
