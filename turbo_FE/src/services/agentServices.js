import api from './baseURL';

const AgentList = () => {
    return api.get('list')
}
const CreateAgent = (data) => {
    return api.post('/create', {
        agent_name: data.agent_name,
        email: data.email,
        password: data.password,
        dp_phone: data.dp_phone,
        target_id:data.target_id,
        agent_type: data.agent_type,
    })
}
const UpdateAgentStatus = (id, status) => {
  return api.put(`/status/${id}`, { status });
};

const AgentServices = {
    AgentList,
    CreateAgent,
    UpdateAgentStatus
}
export default AgentServices;