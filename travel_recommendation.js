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
    })