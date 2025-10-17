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
    },
    async DeleteAgent(req, res) {
    const { id } = req.params;

    try {
      console.log('Received delete request for id:', id);
      const agent = await Agentlist.findByPk(id);
      if (!agent) {
        return res.status(404).json({ message: 'Agent not found' });
      }
      await agent.destroy();
      console.log('Agent deleted for id:', id);
      return res.status(200).json({ message: 'Agent deleted successfully' });
    } catch (err) {
      console.error('Error in DeleteAgent:', err);
      return res.status(500).json({ message: 'Error deleting agent', error: err.message });
    }
  },
  async EditAgent(req, res) {
    const { id } = req.params;
    const { agent_name, email, password, dp_phone, target_id, agent_type } = req.body;

    try {
      console.log('Received edit request for id:', id, 'with data:', { agent_name, email, password, dp_phone, target_id, agent_type });
      const agent = await Agentlist.findByPk(id);
      if (!agent) {
        return res.status(404).json({ message: 'Agent not found' });
      }
      await agent.update({ agent_name, email, password, dp_phone, target_id, agent_type });
      console.log('Agent updated for id:', id);
      return res.status(200).json({ message: 'Agent updated successfully', data: agent });
    } catch (err) {
      console.error('Error in EditAgent:', err);
      return res.status(500).json({ message: 'Error updating agent', error: err.message });
    }
  }
    
}
module.exports = AgentController