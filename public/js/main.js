document.getElementById('getScores').addEventListener('click', async function () {
    const usernameInput = document.getElementById('usernameInput').value.trim();

    if (!usernameInput) {
        alert('Por favor ingresa un nombre de usuario.');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/get/${usernameInput}`);
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

        const data = await response.json();

        const list = document.getElementById('scoresResults');
        list.innerHTML = '';

        if (data.length === 0) {
            list.innerHTML = '<li>No hay registros para este usuario</li>';
            return;
        }

        data.forEach(entry => {
            const li = document.createElement('li');
            li.textContent = `ID: ${entry.id} | Puntaje: ${entry.score} | Usuario: ${entry.username}`;
            list.appendChild(li);
        });

    } catch (error) {
        console.error('Error obteniendo datos:', error);
        document.getElementById('scoresResults').innerHTML = '<li>Error obteniendo información.</li>';
    }
});
