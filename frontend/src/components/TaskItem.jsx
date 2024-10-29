import { useContext, useEffect, useState } from "react";
import { FetchContext } from "../context/FetchContext";

export const TaskItem = ({ task }) => {

    const [inputTitulo, setInputTitulo] = useState(task.title)
    const [inputDescripcion, setInputDescripcion] = useState(task.description)
    const { deleteT, update, setIsUpdated } = useContext(FetchContext)

    useEffect(() => {
        setInputTitulo(task.title);
        setInputDescripcion(task.description);
    }, [task.title, task.description]);

    const onDelete = (id) => {
        deleteT(id);
        setIsUpdated(true)
    }

    const onChangeSelect = ({ target }, id) => {
        update(id, { status: target.value });
    }

    const onChangetitle = (id) => {
        console.log(id)
    }

    const onInputTitulo = ({ target }) => {
        setInputTitulo(target.value);
    }

    const onInputDescripcion = ({ target }) => {
        setInputDescripcion(target.value);
    }

    const onSubmint = (event) => {
        event.preventDefault();
        const payload = {
            title: inputTitulo,
            description: inputDescripcion
        };
        update(task.id, payload);
        const modalElement = document.getElementById(`editModal${task.id}`);
        const modal = window.bootstrap.Modal.getInstance(modalElement);
        modal.hide();
        setIsUpdated(true);
    }

    const status = ['Pendiente', 'En progreso', 'Completada'];

    return (
        <>
            <div className="card mt-2 p-0">
                <div className="d-flex justify-content-between w-100 bg-dark-subtle">
                    <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#editModal${task.id}`}>Editar</button>
                    <h5 className="card-header d-flex justify-content-end">Estatus:
                        <select onChange={(event) => onChangeSelect(event, task.id)}>
                            {
                                status.map(s => (
                                    (s === task.status)
                                        ? <option selected key={s} value={s}>{s}</option>
                                        : <option key={s} value={s}>{s}</option>
                                ))
                            }
                        </select>
                    </h5>
                </div>
                <div className="card-body">
                    <h5 className="card-title" onDoubleClick={() => onChangetitle(task.id)}>{task.title}</h5>
                    <p className="card-text">{task.description}</p>
                    <a className="btn btn-primary" onClick={() => onDelete(task.id)}>Eliminar</a>
                </div>
            </div>

            <div className="modal fade" id={`editModal${task.id}`} tabIndex="-1" aria-hidden="true" data-bs-backdrop="static">
                <form onSubmit={onSubmint}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <label className="form-label">Titulo</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={inputTitulo}
                                    onChange={onInputTitulo}
                                />
                                <label className="form-label">Descripcion</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={inputDescripcion}
                                    onChange={onInputDescripcion}
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                <button type="submint" className="btn btn-primary">Editar</button>
                            </div>
                        </div>
                    </div>
                </form >
            </div>
        </>
    )
}
