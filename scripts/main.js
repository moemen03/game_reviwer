import Games from "./games.module.js";
import Details from "./details.module.js";
import UI from "./ui.module.js";

export const API = "https://free-to-play-games-database.p.rapidapi.com/api";
export const headers = {
    "X-RapidAPI-Key": "b7221a796bmshe01f5aaf76f440fp1e3415jsn99f4640ca022",
    "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com"
};

const games = new Games()



// const fn= games.searchGames()
document.querySelector('#searchInput').addEventListener('input', e => {

    const value = e.target.value

    if (value == "") {
        games.listGames("mmorpg")
    } else {
        games.searchGames()
    }
})