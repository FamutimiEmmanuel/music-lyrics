 const form =document.getElementById('form');
 const search =document.getElementById('search');
 const result =document.getElementById('result');
 const more =document.getElementById('more');

 const apiURL = 'http://api.lyrics.ovh';

// search by song or artist
async function searchSongs(term) {
    const res = await fetch(`${apiURL}/suggest/${term}`);
    const data = await res.json();

    showData(data);
}

// show song and artist in DOM
function showData(data) {

    result.innerHTML = `
        <ul class="songs">
        ${data.data.map(song => `
        <li>
           <span><strong>${song.artist.name}</strong>-${song.title}</span>
           <button class="btn" data-artist="${song.artist.name}"
           data-songtitle="${song.title}">Get Lyrics<button> 
        </li>
        `)
        .join('')}

        </ul>

    `;

    if(data.prev || data.next) {
        more.innerHTML = `
        ${data.prev ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>` : ''}
        ${data.next ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>` : ''}

        `;
    } else {
        more.html = '';
    }
}

// get prev and next songs
async function getMoreSongs(url) {
    const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const data = await res.json();

    showData(data);
}


//  event listeners
form.addEventListener('submit', e => {
    e.preventDefault();

    const searchTerm = search.Value.trim();

    if(!searchTerm) {
        alert('please type in a search term')
    } else {
        searchSongs(searchTerm);
    }

    console.log(searchTerm);
});
