import { replace } from './ui.js';
import renderHomeShows from './shows.js';
import storage from './storage.js';

const {setItem, getItem} = storage('lStorage');

const navbar = document.querySelector('#navbar');
const searchForm = document.querySelector('#search-form');
const logoClick = document.querySelector('#banner');
const form = document.querySelector('#search-form');
const inputSearch = document.querySelector('#input-search');
export const checkBox = document.querySelector('.date-enabled');
export const dateS = document.querySelector('#date-search');
export const limite = document.querySelector('.limit');



const handleNavbar = replace(navbar);
const handleNavbar2 = replace(searchForm);

const hoy = new Date();
const año = hoy.getFullYear();

logoClick.addEventListener('click', evt =>{
    handleNavbar('navbar', 'navbar-click');
    handleNavbar2('input-off', 'input-on');
    document.getElementById('input-search').focus();
});

checkBox.addEventListener('onchange', evt => {
    if(checkBox.checked) {
        document.getElementById("date-search").removeAttribute("disabled");
        document.getElementById("date-search").setAttribute("value",año);
        document.getElementById("date-search").setAttribute("max",año);
        // Checkbox is checked..
    } else {
        document.getElementById("date-search").setAttribute("disabled","true");
        document.getElementById("date-search").removeAttribute("value","");
        document.getElementById("date-search").removeAttribute("max");
        // Checkbox isn't checked..
    };
});

    inputSearch.value = getItem('inputStorage');
//  dateS.value = getItem('dateStorage'); // Funcional desactivado

form.addEventListener('submit', evt => {
    evt.preventDefault();
    if (inputSearch.validity.valid) {
        renderHomeShows(inputSearch.value);

        setItem('inputStorage',inputSearch.value );
    //  setItem('dateStorage', dateS.value ); //Funciona desactivado
    };
    
});











