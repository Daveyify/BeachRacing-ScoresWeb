document.getElementById('getScores').addEventListener('click', async function () {
    const usernameInput = document.getElementById('usernameInput').value.trim();

    if (!usernameInput) {
        alert('Please enter a username.');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/get/${usernameInput}`);
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

        const data = await response.json();

        const tableBody = document.getElementById('scoresResults');
        tableBody.innerHTML = '';

        if (data.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="4">There are no scores for this user</td></tr>';
            return;
        }

        data.forEach(entry => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${entry.username}</td>
                <td>${entry.time}</td>
                <td>${entry.balls}</td>
                <td>${entry.carName}</td>
            `;
            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error('Error getting the scores:', error);
        document.getElementById('scoresResults').innerHTML = `
            <tr><td colspan="4">Error getting the scores.</td></tr>
        `;
    }
});
