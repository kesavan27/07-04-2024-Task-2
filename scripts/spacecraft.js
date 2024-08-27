document.addEventListener("DOMContentLoaded", () => {
    // API URLs
    const spacecraftsAPI = "https://isro.vercel.app/api/spacecrafts";
    const launchersAPI = "https://isro.vercel.app/api/launchers";
    const satellitesAPI = "https://isro.vercel.app/api/customer_satellites";
    const centresAPI = "https://isro.vercel.app/api/centres";
  
    // Elements
    const spacecraftsSection = document.getElementById('spacecraftsSection');
    const launchersSection = document.getElementById('launchersSection');
    const satellitesSection = document.getElementById('satellitesSection');
    const centresSection = document.getElementById('centresSection');
    const errorMessage = document.getElementById('errorMessage');
  
    // Navbar click event listeners
    document.getElementById('showSpacecrafts').addEventListener('click', () => {
      fetchAndDisplayData(spacecraftsAPI, displaySpacecrafts, spacecraftsSection);
    });
    document.getElementById('showLaunchers').addEventListener('click', () => {
      fetchAndDisplayData(launchersAPI, displayLaunchers, launchersSection);
    });
    document.getElementById('showSatellites').addEventListener('click', () => {
      fetchAndDisplayData(satellitesAPI, displaySatellites, satellitesSection);
    });
    document.getElementById('showCentres').addEventListener('click', () => {
      fetchAndDisplayData(centresAPI, displayCentres, centresSection);
    });
  
    // Fetch data from API and display
    function fetchAndDisplayData(apiUrl, displayFunction, section) {
      resetSections();
      section.style.display = 'block'; // Show the current section
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayFunction(data))
        .catch(() => handleError("Failed to load data from API."));
    }
  
    // Display spacecrafts data
    function displaySpacecrafts(data) {
      const container = document.getElementById('spacecraftsContainer');
      container.innerHTML = ''; // Clear previous content
      data.spacecrafts.forEach(spacecraft => {
        container.appendChild(createCard(spacecraft.name));
      });
    }
  
    // Display launchers data
    function displayLaunchers(data) {
      const container = document.getElementById('launchersContainer');
      container.innerHTML = ''; // Clear previous content
      data.launchers.forEach(launcher => {
        container.appendChild(createCard(launcher.id));
      });
    }
  
    // Display customer satellites data
    function displaySatellites(data) {
      const container = document.getElementById('satellitesContainer');
      container.innerHTML = ''; // Clear previous content
      data.customer_satellites.forEach(satellite => {
        container.appendChild(createCard(satellite.name + " - " + satellite.country));
      });
    }
  
    // Display centres data
    function displayCentres(data) {
      const container = document.getElementById('centresContainer');
      container.innerHTML = ''; // Clear previous content
      data.centres.forEach(centre => {
        container.appendChild(createCard(centre.name + " - " + centre.place));
      });
    }
  
    // Create a card element for displaying data
    function createCard(content) {
      const card = document.createElement('div');
      card.classList.add('col-md-4', 'card'); // Bootstrap columns and card class
      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');
      cardBody.textContent = content;
      card.appendChild(cardBody);
      return card;
    }
  
    // Reset all sections visibility
    function resetSections() {
      spacecraftsSection.style.display = 'none';
      launchersSection.style.display = 'none';
      satellitesSection.style.display = 'none';
      centresSection.style.display = 'none';
    }
  
    // Error handling
    function handleError(message) {
      errorMessage.style.display = 'block';
      errorMessage.textContent = message;
    }
  });
  