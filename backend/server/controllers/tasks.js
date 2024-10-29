'use strict'

const db = require('../models/index')
const op = db.Sequelize.Op

const ca_tasks = require('../models/').ca_tasks
const rules = require('../rules/tasks')

async function getTasks(req, res) {
    try {

        let rows = await ca_tasks.findAll({
            
        });

        return res.status(200).json({ rows })

    } catch (error) {
        console.error(error);
        return res.status(500);
    }
}

async function getTaskById(req, res) {
    let json = {}

    try {

        let rule = rules.getTaskById(req)
        if (rule.codigo != 0) {
            json.mensaje = rule.mensaje
            return res.status(400).json(json)
        }

        let row = await ca_tasks.findOne({
            where: {
                id: req.params.id
            }
        })

        if (!row) {
            return res.status(404).json({mensaje: "No fue posbile encontrar la task"})
        }

        return res.status(200).json({ row })

    } catch (error) {
        console.error(error);
        return res.status(500);
    }
}

async function createTask(req, res) {

    let transaction
    let json = {}

    try {

        let rule = rules.createTask(req);
        if (rule.codigo != 0) {
            json.mensaje = rule.mensaje
            return res.status(400).json(json)
        }

        transaction = await db.sequelize.transaction();

        let newTask = await ca_tasks.create({
            title: req.body.title,
            description: req.body.description,
            status: "Pendiente"
        }, { transaction })

        if (!newTask) {
            await transaction.rollback();
            return res.status(400).send({
                mensaje: 'Lo sentimos, no fue posible crear la task.',
            });
        }

        await transaction.commit();

        return res.status(200).json({ mensaje: "Task creada con exito." })

    } catch (error) {
        console.error(error);
        return res.status(500);
    }
}

async function updateTask(req, res) {

    let transaction
    let json = {}

    try {

        let rule = rules.updateTask(req)
        if (rule.codigo != 0) {
            json.mensaje = rule.mensaje
            return res.status(400).json(json)
        }

        transaction = await db.sequelize.transaction();

        let row = await ca_tasks.update(
            {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status
            },
            {
                where: {
                    id: req.params.id
                }
            }
        )

        if (!row || row[0] != 1) {
            await transaction.rollback();
            return res.status(400).send({
                mensaje: 'Lo sentimos, no fue posible actualizar la task.',
            });
        }

        await transaction.commit();

        return res.status(200).json({ mensaje: "Task actualizada con exito." })

    } catch (error) {
        console.error(error);
        return res.status(500);
    }

}

async function deleteTask(req, res) {

    let transaction
    let json = {}

    try {

        let rule = rules.deleteTask(req)
        if (rule.codigo != 0) {
            json.mensaje = rule.mensaje
            return res.status(400).json(json)
        }

        transaction = await db.sequelize.transaction();

        let deleteTask = await ca_tasks.destroy({
            where: {
                id: req.params.id,
            }, transaction
        })

        console.log(deleteTask)

        if (!deleteTask) {
            await transaction.rollback()
            return res.status(400).json({mensaje: "El task no pudo ser eliminado"})
        }

        await transaction.commit();

        return res.status(200).json({ mensaje: "Task eliminada con exito." })

    } catch (error) {
        console.error(error);
        return res.status(500);
    }

}

module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
}