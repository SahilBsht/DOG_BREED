document.addEventListener('DOMContentLoaded', function() {
    const breedListElement = document.getElementById('breedList');
    const dogImageElement = document.getElementById('dogImage');
    const loaderElement = document.getElementById('loader');
    const searchInputElement = document.getElementById('searchInput');
    const addBreedButton = document.getElementById('addBreedButton');

    // Fetch dog breeds
    fetch('https://dog.ceo/api/breeds/list/all')
      .then(response => response.json())
      .then(data => {
        const breeds = Object.keys(data.message);

        // Populate breed list
        breeds.forEach((breed, index) => {
          const listItem = document.createElement('li');
          listItem.textContent = breed;
          listItem.addEventListener('click', () => {
            loaderElement.style.display = 'block';
            dogImageElement.classList.add('loading');
            fetchDogImage(breed);
            window.location.href = '#'; // Redirect to the top of the page
          });
          breedListElement.appendChild(listItem);
        });
      })
      .catch(error => console.error('Error fetching dog breeds:', error));

    // Function to fetch and display a random dog image for a given breed
    function fetchDogImage(breed) {
      fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
        .then(response => response.json())
        .then(data => {
          const imageUrl = data.message;
          dogImageElement.src = imageUrl;
        })
        .catch(error => {
          console.error(`Error fetching image for ${breed}:`, error);
          // Set a new default image if there's an error
          dogImageElement.src = 'https://images.unsplash.com/photo-1560807707-8cc77767d783';
        })
        .finally(() => {
          loaderElement.style.display = 'none';
          dogImageElement.classList.remove('loading');
        });
    }

    // Function to filter breeds based on search input
    window.searchDogBreeds = function() {
      const searchQuery = searchInputElement.value.toLowerCase();
      const breedItems = breedListElement.getElementsByTagName('li');

      for (let i = 0; i < breedItems.length; i++) {
        const breedName = breedItems[i].textContent.toLowerCase();
        if (breedName.includes(searchQuery)) {
          breedItems[i].style.display = 'block';
        } else {
          breedItems[i].style.display = 'none';
        }
      }
    };

    // Function to add a new breed
    window.addNewBreed = function() {
      const newBreed = prompt('Enter the new breed:');
      if (newBreed) {
        const listItem = document.createElement('li');
        listItem.textContent = newBreed;
        listItem.addEventListener('click', () => {
          loaderElement.style.display = 'block';
          dogImageElement.classList.add('loading');
          fetchDogImage(newBreed);
          window.location.href = '#'; // Redirect to the top of the page
        });
        breedListElement.insertBefore(listItem, breedListElement.firstChild);
      }
    };

    // Open the image in a new tab when clicked
    dogImageElement.addEventListener('click', function() {
      window.open(dogImageElement.src, '_blank');
    });
  });
  