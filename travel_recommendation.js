// Fetching the data from travel_recommendation_api.json
fetch('travel_recommendation_api.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Fetched Travel Data:', data);

        // Display Countries
        console.log('Countries');
        data.countries.forEach(country => {
            console.log(`Country: ${country.name}`);
            country.cities.forEach(city => {
              console.log(`City: ${city.name}`);
              console.log(`Image: ${city.imageUrl}`);
              console.log(`Description: ${city.description}`);
            });
          });

          // Display Temples
          console.log('Temples:');
          data.temples.forEach(temple => {
            console.log(`Temple: ${temple.name}`);
            console.log(`Image: ${temple.imageUrl}`);
            console.log(`Description: ${temple.description}`);
          });

          // Display Beaches
          console.log('Beaches:');
          data.beaches.forEach(beach => {
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
        country: ['temples', 'japan', 'brazil']
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
    resultsContainer.style.background = 'rgba(255,255,255,0.8)';
    resultsContainer.style.margin = '20px auto';
    resultsContainer.style.padding = '20px';
    resultsContainer.style.borderRadius = '10px';
    resultsContainer.style.width = '60%';
    resultsContainer.style.color = '#000';
    document.body.appendChild(resultsContainer);

    