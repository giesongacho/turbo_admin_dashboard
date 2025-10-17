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
const DeleteAgent = (id) => {
  console.log('API call to delete agent:', id);
  return api.delete(`/delete/${id}`);
};

const EditAgent = (id, data) => {
  console.log('API call to edit agent:', id, data);
  return api.put(`/edit/${id}`, data);
};
const AgentServices = {
    AgentList,
    CreateAgent,
    UpdateAgentStatus,
    DeleteAgent,
    EditAgent
}
export default AgentServices;