export const saveUser = user => {
    const currentUser = {
        email: user?.email,
        name: user?.displayName ? user.displayName : user.name,
        photo: user?.photoURL,
    }
    fetch(`https://airbliss/users/${user?.email}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(currentUser),
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
}