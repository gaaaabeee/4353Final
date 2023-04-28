const express = require('express');
const fuelRouter = express.Router();
const { fuelRateCalculator, viewPurchaseHistory, placeOrder } = require('../Controller/fuelController')

fuelRouter.route('/rate').post(fuelRateCalculator)
fuelRouter.route('/place_order').post(placeOrder)
fuelRouter.route('/history').get(viewPurchaseHistory)

module.exports = fuelRouter;