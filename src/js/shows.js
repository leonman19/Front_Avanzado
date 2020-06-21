import api from './api.js';
import { API_KEY } from './api.js';

const { getShows } = api();

const templateShow = show => {
    return `
    <div class="cards">
    <div class="card1">
        <div class="principal-card">
        <header class="card-header">
        <a href="/detail/${show.beerId}" id="c" class="card-title" title="More Info">
                <h2>${show.name}</h2>
            </a>
                <div class="like-container">
                    <button class="up" value="${show.beerId}">
                        <i id='like' class="far fa-thumbs-up fa-2x"></i>
                    </button>
                    <div class="score">
                        <p class="like">${show.likes}</p>
                    </div>
                </div>
            </header>
            <div class="card-content">
                <div class="card-image">
                    <img src=${show.image ? show.image : './img/default.jpg'}>
                </div>
                <div id="a" class="card-content-text">
                    <p>${show.description}</p>
                    <div id="b" class="more-info-off">
                    <p>    ----- MORE INFO ----    </p>
                    <p>BREWER´S TIPS: ${show.brewersTips}</p>
                    <p>CONTRIBUTED BY: ${show.contributedBy}</p>
                    <p>RELEASE YEAR: ${show.firstBrewed}</p>
                    <p>PRICE: ${show.price} €</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    `;
    
};

export const renderShows = (element, items) => {
    const mapTemplate = items.map(function (show) {
        return templateShow(show);
    }).join('')
    element.innerHTML = mapTemplate;
    const card = document.querySelectorAll('.principal-card');
    const apiURL = 'https://beerflix-api.herokuapp.com/api/v1';
    card.forEach(item => {
        const title = function (evt) {
            evt.preventDefault();
            const moreInfo = this.querySelector('.more-info-off') || this.querySelector('.more-info-on');
            const moreInfoOn = Object.values(moreInfo.classList).includes('more-info-on');
            moreInfo.classList[moreInfoOn ? 'remove' : 'add']('more-info-on');
            moreInfo.classList[!moreInfoOn ? 'remove' : 'add']('more-info-off');
        };
        item.querySelector('.card-title').addEventListener('click', title.bind(item));

        item.querySelector('.up').addEventListener('click', async _ => {
            const like = item.querySelector('.up').value;
            try {     
                const response = await fetch(`${apiURL}/beers/${like}/like`,
                {
                    method: 'POST',
                    headers: {
                        'X-API-KEY': API_KEY,
                    },
                },
                );
                if (response.ok){
                item.querySelector('.like').innerHTML = parseInt(item.querySelector('.like').innerHTML)+1;}
        } catch(err) {
            console.error(err.message);
        }
        });        
    });
};

const renderHomeShows = async text => {
    try {
        const shows = await getShows(text);
        const showCardsContainer = document.querySelector('main .cards-container');
        renderShows(showCardsContainer, shows)
    } catch (err) {
        console.log(err);
    }
};


export default renderHomeShows;