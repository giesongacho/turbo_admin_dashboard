const express= require('express');
const router = express.Router();
const agentCOntroller = require('../controller/agentController');

router.post('/create', agentCOntroller.CreateAgent);
router.get('/list', agentCOntroller.ListAgent);
router.put('/status/:id', agentCOntroller.UpdateAgentStatus)
router.delete('/delete/:id', agentCOntroller.DeleteAgent);
router.put('/edit/:id', agentCOntroller.EditAgent);
module.exports =router;