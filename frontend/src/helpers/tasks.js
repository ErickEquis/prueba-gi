const url = 'http://localhost:8880/api/tasks/';

export const getTasks = async () => {

    const resp = await fetch(url, {
        method: 'GET'
    });
    const { rows } = await resp.json();

    return rows;
}

export const getTaskById = async (id) => {

    const resp = await fetch(`${url}${id}`, {
        method: 'GET'
    });
    const { row } = await resp.json();

    return row;
}

export const createTask = async (payload) => {

    try {
        const resp = await fetch(url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            }
        );

        if (!resp.ok) {
            console.error(resp.statusText)
            return
        }

        const { mensaje } = await resp.json();

        return mensaje;
    } catch (error) {
        console.error('error', error)
        return error
    }
}

export const updateTask = async (id, payload) => {

    try {
        const resp = await fetch(`${url}${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!resp.ok) {
            console.error(resp.statusText)
            return
        }

        const { mensaje } = await resp.json();

        return mensaje;
    } catch (error) {
        console.error('error', error)
        return error
    }
}

export const deleteTask = async (id) => {

    try {
        const resp = await fetch(`${url}${id}`, {
            method: 'DELETE'
        });
        const { mensaje } = await resp.json();

        if (!resp.ok) {
            console.error(resp.statusText)
            return
        }

        return mensaje;
    } catch (error) {
        console.error('error', error)
        return error
    }
}

