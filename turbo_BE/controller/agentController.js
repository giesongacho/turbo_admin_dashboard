const {Agentlist} = require('../models');

const AgentController = {
    async CreateAgent (req,res) {
        const {agent_name,email,password,dp_phone,target_id,agent_type} = req.body;

        if(agent_name && email && password && dp_phone && target_id && agent_type){
            const inserAgent = await Agentlist.create({agent_name,email,password,dp_phone,target_id,agent_type})
            return res.status(200).json({message: "Successfully Created"})
        }else{
            return res.status(401).json({message:'Please fill out the form'})
        }
    },
    async ListAgent (req,res) { 
        try{
            const data = await Agentlist.findAll()
            return res.status(200).json({data})
        }catch(err){
            return res.status(401).json(err)
        }
    },
    async UpdateAgentStatus(req, res) {
        const { id } = req.params;
        const { status } = req.body;

        try {
            const agent = await Agentlist.findByPk(id);
            if (!agent) {
                return res.status(404).json({ message: 'Agent not found' });
            }
            await agent.update({ status });
            return res.status(200).json({ message: 'Status updated successfully', status });
        } catch (err) {
            return res.status(500).json({ message: 'Error updating status', error: err });
        }
    }
    
}
module.exports = AgentController