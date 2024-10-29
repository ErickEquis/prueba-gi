import { useContext, useState } from "react"
import { FetchContext } from "../context/FetchContext"

export const AddTask = () => {

    const [inputTitulo, setInputTitulo] = useState('')
    const [inputDescripcion, setInputDescripcion] = useState('')
    const { create, setIsUpdated } = useContext(FetchContext);

    const onInputTitulo = ({ target }) => {
        setInputTitulo(target.value)
    }

    const onInputDescripcion = ({ target }) => {
        setInputDescripcion(target.value)
    }

    const onSubmint = (event) => {
        event.preventDefault();
        if (inputTitulo.trim().length < 1) return;
        const payload = {
            title: inputTitulo,
            description: inputDescripcion
        }
        create(payload);
        setInputTitulo('');
        setInputDescripcion('');
        setIsUpdated(true);
    }

    return (
        <form onSubmit={onSubmint}>
            <div className="mb-1">
                <label className="form-label">Titulo</label>
                <input
                    type="text"
                    className="form-control"
                    value={inputTitulo}
                    onChange={onInputTitulo}
                />
            </div>
            <div className="mb-1">
                <label className="form-label">Descripcion</label>
                <input
                    type="text"
                    className="form-control"
                    value={inputDescripcion}
                    onChange={onInputDescripcion}
                />
            </div>
            <button type="submit" className="btn btn-primary">Crear</button>
        </form>
    )
}
