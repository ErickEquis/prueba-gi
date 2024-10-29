const tasks = require('../controllers/tasks.js')
const config = require('../config/config')

module.exports = (app) => {
    app.get(`${config.api.base_path}/tasks`, tasks.getTasks);
    app.get(`${config.api.base_path}/tasks/:id`, tasks.getTaskById);
    app.post(`${config.api.base_path}/tasks`, tasks.createTask);
    app.put(`${config.api.base_path}/tasks/:id`, tasks.updateTask);
    app.delete(`${config.api.base_path}/tasks/:id`, tasks.deleteTask);
}