const express = require('express');
const clientRouter = express.Router();
const { getClientRegister, getClientLogin, setClientInformation, getClient, getClientDataUpdated } = require('../Controller/clientController')

clientRouter.route('/user').get(getClient)
clientRouter.route('/login').post(getClientLogin)
clientRouter.route('/register').post(getClientRegister)
clientRouter.route('/update_user').patch(getClientDataUpdated)
clientRouter.route('/personal_information').post(setClientInformation)


module.exports = clientRouter;