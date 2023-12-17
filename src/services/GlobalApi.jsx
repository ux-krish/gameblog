import axios from "axios";

const key = "30d37caadbfe41fcb23e8477d7b12636";
const axiosCreate = axios.create({
    baseURL:'https://api.rawg.io/api'
})

const getGenreList = axiosCreate.get('/genres?key='+key);
const getAllGames = axiosCreate.get('/games?key='+key);
const getGameListByGenreId = (id) => axiosCreate.get('/games?key='+key+'&genres='+id);
const getGameListByName = (genreName) => axiosCreate.get('/games?key='+key+'&search='+genreName);



export default {
    getGenreList,
    getAllGames,
    getGameListByGenreId,
    getGameListByName
}