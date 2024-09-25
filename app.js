// Your Unsplash API Access Key
const accessKey = 'heYbZWd5cvnq5Of2aaDypYhFgKnvxqTmmYLSzRKfCA4';  // Replace with your Unsplash API Key


const imageContainer = document.getElementById('imageContainer');
const searchTermInput = document.getElementById('searchTerm');
const searchImagesBtn = document.getElementById('searchImagesBtn');
const imageCountInput = document.getElementById('imageCount');

function fetchSearchImages() {
    const count = imageCountInput.value || 3;  // Default to 3 images if none is provided
    const query = searchTermInput.value || 'random';  // Default to 'random' if no search term is provided
    fetch(`https://api.unsplash.com/search/photos?client_id=${accessKey}&query=${query}&per_page=${count}`)
        .then(response => response.json())
        .then(data => {
            // Clear the previous images
            imageContainer.innerHTML = '';
            
            // Loop through each image and create elements to display metadata
            data.results.forEach(photo => {
                const imageWrapper = document.createElement('div');
                imageWrapper.style.marginBottom = '20px';

                // Create img element
                const img = document.createElement('img');
                img.src = photo.urls.regular;
                img.alt = photo.alt_description;
                img.classList.add('image-item');
                imageWrapper.appendChild(img);

                // Create metadata elements
                const metaDiv = document.createElement('div');

                // Original URL
                const originalLink = document.createElement('a');
                originalLink.href = photo.links.download;
                originalLink.textContent = 'Download Original';
                originalLink.target = '_blank';
                metaDiv.appendChild(originalLink);

                // Description
                const description = document.createElement('p');
                description.textContent = `Description: ${photo.description || 'No description available'}`;
                metaDiv.appendChild(description);

                // Alt description
                const altDescription = document.createElement('p');
                altDescription.textContent = `Alt Description: ${photo.alt_description}`;
                metaDiv.appendChild(altDescription);

                // Photographer
                const photographer = document.createElement('p');
                photographer.innerHTML = `Photo by: <a href="${photo.user.portfolio_url}" target="_blank">${photo.user.name}</a>`;
                metaDiv.appendChild(photographer);

                // Tags (if available)
                if (photo.tags && photo.tags.length > 0) {
                    const tags = document.createElement('p');
                    tags.textContent = 'Tags: ' + photo.tags.map(tag => tag.title).join(', ');
                    metaDiv.appendChild(tags);
                }

                imageWrapper.appendChild(metaDiv);
                imageContainer.appendChild(imageWrapper);
            });
        })
        .catch(error => {
            console.error('Error fetching images:', error);
        });
}

// Fetch new images when the search button is clicked
searchImagesBtn.addEventListener('click', fetchSearchImages);

// Load the first image when the page loads
// fetchRandomImage();
