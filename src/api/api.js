import axios from 'axios';
const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    
});
export const createIssue = (data) => api.post('/posts', data);
export const createTask = (data) => api.post('/todos', data);
export const getIssues = () => api.get('/posts', { params: { _limit: 5 } });
export const getTasks = () => api.get('/todos', { params: { _limit: 5 } });
export const getFilteredIssues = async () => {
    const response = await api.get('/posts');
    const filteredIssues = response.data.filter(issue => issue.userId === 1); 
    return filteredIssues;
};
export const getFilteredTasks = async () => {
    const response = await api.get('/todos');
    const filteredTasks = response.data.filter(task => task.completed); 
    return filteredTasks;
};
export const getIssueById = (id) => api.get(`/posts/${id}`);
export const getTaskById = (id) => api.get(`/todos/${id}`);
export const updateIssue = (id, data) => api.put(`/posts/${id}`, data);
export const updateTask = (id, data) => api.put(`/todos/${id}`, data);
export const deleteIssue = (id) => api.delete(`/posts/${id}`);
export const deleteTask = (id) => api.delete(`/todos/${id}`);

export default api;
