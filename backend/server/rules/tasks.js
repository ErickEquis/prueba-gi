let status = ['Pendiente', 'En progreso', 'Completada']

function getTaskById(req) {
    let json = {
        codigo: 0,
        mensaje: "Éxito"
    }
    if (!req.params.id) {
        json.codigo = 1
        json.mensaje = "Lo sentimos es necesario el id de la task"
        return json
    }

    return json
}

function createTask(req) {
    let json = {
        codigo: 0,
        mensaje: "Éxito"
    }
    if (!req.body.title || req.body.title.length == 0 || typeof (req.body.title) != 'string') {
        json.codigo = 1
        json.mensaje = "Lo sentimos es necesario el titulo de la task"
        return json
    }
    if (req.body.description) {
        if (!req.body.description || typeof (req.body.description) != 'string') {
            json.codigo = 1
            json.mensaje = "Lo sentimos descripcion no valida"
            return json
        }
    }

    return json
}

function updateTask(req) {
    let json = {
        codigo: 0,
        mensaje: "Éxito"
    }
    if (req.body.title) {
        if (req.body.title.length == 0 || typeof (req.body.title) != 'string') {
            json.codigo = 1
            json.mensaje = "Lo sentimos es necesario el titulo de la task"
            return json
        }
    }
    if (req.body.description) {
        if (!req.body.description || typeof (req.body.description) != 'string') {
            json.codigo = 1
            json.mensaje = "Lo sentimos descripcion no valida"
            return json
        }
    }
    if (req.body.status) {
        if (!status.includes(req.body.status)) {
            json.codigo = 1
            json.mensaje = "Lo sentimos estatus no valido"
            return json
        }
    }

    return json
}

function deleteTask(req) {
    let json = {
        codigo: 0,
        mensaje: "Éxito"
    }
    if (!req.params.id) {
        json.codigo = 1
        json.mensaje = "Lo sentimos es necesario el id de la task"
        return json
    }

    return json
}

module.exports = {
    getTaskById,
    createTask,
    updateTask,
    deleteTask
}