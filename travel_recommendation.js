// Fetching the data from travel_recommendation_api.json
fetch('travel_recommendation_api.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        travelData = data;
        console.log('Fetched Travel Data:', data);

        // Display Countries
        console.log('Countries');
        travelData.countries.forEach(country => {
            console.log(`Country: ${country.name}`);
            country.cities.forEach(city => {
              console.log(`City: ${city.name}`);
              console.log(`Image: ${city.imageUrl}`);
              console.log(`Description: ${city.description}`);
            });
          });

          // Display Temples
          console.log('Temples:');
          travelData.temples.forEach(temple => {
            console.log(`Temple: ${temple.name}`);
            console.log(`Image: ${temple.imageUrl}`);
            console.log(`Description: ${temple.description}`);
          });

          // Display Beaches
          console.log('Beaches:');
          travelData.beaches.forEach(beach => {
            console.log(`Beach: ${beach.name}`);
            console.log(`Image: ${beach.imageUrl}`);
            console.log(`Description: ${beach.description}`);
          });
    })
    .catch(error => {
        console.error('Error fetching travel data:', error);
    });
    
    // Keywords for matching
    const keywordGroups = {
        beach: ['beach', 'beaches'],
        temple: ['temple', 'temples'],
        country: ['australia', 'japan', 'brazil']
    };

    // Function to check if the keyword matches any group
    function getCategoryFromKeyword(keyword) {
        const lowerKeyword = keyword.toLowerCase();
        for (let category in keywordGroups) {
            if (keywordGroups[category].includes(lowerKeyword)) {
                return category;
            }
        }
        return null;
    }

    // Result display section
    const resultsContainer = document.createElement('div');
    resultsContainer.id = 'searchResults';
    resultsContainer.style.position = 'fixed';
    resultsContainer.style.top = '100px'; // Adjust as needed
    resultsContainer.style.right = '30px'; // Distance from right edge
    resultsContainer.style.width = '50%';
    resultsContainer.style.maxWidth = '600px';
    resultsContainer.style.maxHeight = '80vh';
    resultsContainer.style.overflowY = 'auto';
    resultsContainer.style.background = 'rgba(255,255,255, 0.9)';
    resultsContainer.style.padding = '20px';
    resultsContainer.style.borderRadius = '10px';
    resultsContainer.style.color = '#000';
    resultsContainer.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
    document.body.appendChild(resultsContainer);

    // Search button event listener
    document.getElementById('btnSearch').addEventListener('click', () => {
        const input = document.getElementById('searchInput').value.trim().toLowerCase();
        resultsContainer.innerHTML = ''; // Clear previous results

        if (!input || !travelData) return;

        const category = getCategoryFromKeyword(input);

        if (category === 'beach') {
            travelData.beaches.forEach(beach => {
                displayResult(beach.name, beach.imageUrl, beach.description);
            });
        } else if (category === 'temple') {
            travelData.temples.forEach(temple => {
                displayResult(temple.name, temple.imageUrl, temple.description);
            });
        } else if (category === 'country') {
            travelData.countries.forEach(country => {
                if (input.includes(country.name.toLowerCase())) {
                    country.cities.forEach(city => {
                        displayResult(city.name, city.imageUrl, city.description);
                    });
                }
            });
        } else {
            resultsContainer.innerHTML = `<p>No results found. Try "beach", "temple", or a country name.</p>`;
        }
    });
    
    // Clear button event listener
    document.getElementById('btnClear').addEventListener('click', () => {
        document.getElementById('searchInput').value = '';
        resultsContainer.innerHTML = '';
    });

    // Helper to display result
    function displayResult(title, img, description) {
        const item = document.createElement('div');
        item.style.marginBottom = '20px';
        item.innerHTML = `
            <h3>${title}</h3>
            <img src="${img}" alt="${title}" style="width:100%; max-width:400px; border-radius:10px;"/>
            <p>${description}</p>
            `;
            resultsContainer.appendChild(item);
    }
