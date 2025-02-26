// // Complete Project Details at: https://RandomNerdTutorials.com/

// Database Paths
const userId = 'hCNUKL5tIG0XtPHY7eSCABPja832'; 
const dataPath = `UsersData/${userId}/readings`;

// Get a database reference 
const databaseRef = firebase.database().ref(dataPath);
databaseRef.on('value', (snapshot) => {
  const readings = snapshot.val();
  const tbody = document.getElementById("tbody");
  tbody.innerHTML = ""; // Effacer les anciennes données

  if (readings) {
    Object.keys(readings).forEach((timestamp) => {
      const reading = readings[timestamp];
      const row = `<tr>
        <td>${new Date(parseInt(timestamp) * 1000).toLocaleString()}</td>
        <td>${reading.temperature}</td>
        <td>${reading.humidity}</td>
        <td>${reading.pressure}</td>
      </tr>`;
      tbody.insertAdjacentHTML('beforeend', row);
    });
  } else {
    console.log("Aucune donnée trouvée.");
  }
}, (errorObject) => {
  console.log('The read failed: ' + errorObject.name);
});