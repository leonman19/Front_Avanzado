import { dateS } from './navbar.js';
import { limite } from './navbar.js';
import { checkBox } from './navbar.js';

export const API_KEY = '188CXPQ-QHG46ND-JRAYK89-GA90SV0';

const api = () => {
    return {
        getShows: async text => {
            try {
                const limit = parseInt(limite.value);
                const URL = `https://beerflix-api.herokuapp.com/api/v1/beers?search=${text}&limit=${limit}`;
                const response = await fetch(URL
                    ,{
                    method: 'GET',
                    headers: {
                        'X-API-KEY': API_KEY,
                    },
                    },
                );
                if (!response.ok){
                    throw new Error('Error retrieving shows');
                }
                const data = await response.json();

                if (checkBox.checked) {
                    const date = parseInt(dateS.value);
                    
                    const dataMap = data.beers.map(result => { 
                    return result;
                    });                

                    const shows = dataMap.filter(item => item.firstBrewed.includes(date));
                    if (shows.length === 0) {
                        window.alert(`                                No se encontraron coincidencias,

                        ¡¡¡Intentelo de nuevo con otra seleccion!!!`);
                    };
                    return shows;
                }
                const shows = data.beers.map(result => { 
                return result;
                });
                
                return shows
            } catch (err) {
                console.error(err.message);
            throw err;
            }
        },
    };
};

export default api;