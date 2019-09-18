
const REACT_APP_API_URL = process.env.REACT_APP_API_URL

export default function (name, surname, username, email, password) {
    // validate fields

    return (async () => {
        const response = await fetch(`${REACT_APP_API_URL}/users`, {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ name, surname, username, email, password })
        })
        if (response.status !== 201) {
            const { error } = await response.json()

            throw Error(error)
        }
    })()
}