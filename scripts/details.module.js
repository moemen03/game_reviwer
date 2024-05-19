import { API, headers } from "./main.js";
import UI from "./ui.module.js";

export default class Details {
    constructor() {
        this.ui = new UI()
        this.currentGame = null
    }
    async getGameDetails(gameId) {

        this.ui.loader.classList.remove('d-none')

        if (this.currentGame?.id !== gameId) {
            document.querySelector('.game-details__content').innerHTML = ''
            const res = await fetch(`${API}/game?id=${gameId}`, {
                headers
            });

            const data = await res.json();

            this.currentGame = {
                id: gameId,
                title: data.title,
                platform: data.platform,
                genre: data.genre,
                status: data.status,
                description: data.description,
                game_url: data.game_url,
                thumbnail: data.thumbnail
            }
        }

        this.ui.loader.classList.add('d-none')

        this.ui.displayGameDetails(this.currentGame)
    }
}