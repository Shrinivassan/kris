import registerController from '../controller/auth.controller.js'
import express from 'express';
import verifyToken from '../middleware/verifyToken.middleware.js';
const authroute = express.Router();
authroute.post('/register', registerController.registerController);
authroute.post('/login', registerController.login);
authroute.get('/role', verifyToken, registerController.getrole);
export default authroute;