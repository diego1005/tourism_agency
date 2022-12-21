const { Router } = require('express');
const router = Router();

//controller
const commonController = require('../controllers/commonController.js');

//Middlewares

//payment routes
router.get("/payment/", commonController.getPayments);
router.post("/payment/add", commonController.paymentCreate);
router.put("/payment/edit/:id", commonController.paymentUpgrade);
router.delete("/payment/delete/:id", commonController.paymentDelete);

//student routes
router.get("/student/", commonController.getStudents);

//responsible senior router
router.post("/responsible/add", commonController.responsibleCreate);
router.put("/responsible/edit/:id", commonController.responsibleUpgrade);
router.delete("/responsible/delete/:id", commonController.responsibleDelete);

//travel destination  routes
router.post("/destination/add", commonController.destinationCreate);
router.put("/destination/edit/:id", commonController.destinationUpgrade);
router.delete("/destination/delete/:id", commonController.destinationDelete);


module.exports = router;