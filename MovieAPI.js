
const apiKey = '891622030616852a31e36d3ec83acb52';
const apiBaseUrl = 'https://api.themoviedb.org/3';


document.getElementById('search').addEventListener('click', () => {
    const query = document.getElementById('input').value;
    if (query) {
        searchMovies(query);
    }
});

document.getElementById('Pop_Movie').addEventListener('click', () => {
    PopMovies();
});

document.getElementById('Pop_TV').addEventListener('click', () => {
    PopTv();
});

async function searchMovies(query) {
    try {
        const response = await fetch(`${apiBaseUrl}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`);
        const data = await response.json();
        display(data.results);
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

async function PopMovies() {
    try {
        const response = await fetch(`${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`);
        const data = await response.json();
        display(data.results);
    } catch (error) {
        console.error('Error fetching top movies:', error);
    }
}

async function PopTv() {
    try {
        const response = await fetch(`${apiBaseUrl}/tv/top_rated?api_key=${apiKey}`);
        const data = await response.json();
        display(data.results);
    } catch (error) {
        console.error('Error fetching top TV shows:', error);
    }
}
function display(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = results.map(item => `
        <div class="item" onclick="showDetails(${item.id}, '${item.media_type || 'movie'}')">
            <h3>${item.title || item.name}</h3>
            <p>Release Date: ${item.release_date || item.first_air_date || 'N/A'}</p>
        </div>
    `).join('');
}
async function show(id, type) {
    try {
        const response = await fetch(`${apiBaseUrl}/${type}/${id}?api_key=${apiKey}&append_to_response=credits,reviews`);
        const data = await response.json();
        Details(data);
    } catch (error) {
        console.error('Error fetching details:', error);
    }
}
function Details(data) {
    const detailsContainer = document.getElementById('details');
    const castList = data.credits.cast.map(cast => cast.name).join(', ');
    detailsContainer.innerHTML = `
        <h2>${data.title || data.name}</h2>
        <p><strong>Overview:</strong> ${data.overview}</p>
        <p><strong>Cast:</strong> ${castList}</p>
    `;
}