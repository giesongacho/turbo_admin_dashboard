const express= require('express');
const router = express.Router();
const agentCOntroller = require('../controller/agentController');

router.post('/create', agentCOntroller.CreateAgent);
router.get('/list', agentCOntroller.ListAgent);
router.put('/status/:id', agentCOntroller.UpdateAgentStatus)

module.exports =router;