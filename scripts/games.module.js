import { API, headers } from "./main.js";
import UI from "./ui.module.js";
import Details from "./details.module.js";





export default class Games {

    constructor() {
        this.currentCategory = null
        this.ui = new UI()
        this.listGames("mmorpg")
        this.setFilters()
        this.details = new Details()
        this.searchInput = document.querySelector('#searchInput')
        
        
        document.querySelector('.close-btn').addEventListener('click', e => {
            document.querySelector('.games').classList.remove('d-none')
            document.querySelector('.game-details').classList.add('d-none')
        })

        this.results = []
        this.mycategories = ["mmorpg","shooter","sailing","permadeath","superhero","pixel"];

        (
            async () => {
                const res1 = await this.returnData(0)
                const res2 = await this.returnData(1)
                const res3 = await this.returnData(2)
                const res4 = await this.returnData(3)
                const res5 = await this.returnData(4)
                const res6 = await this.returnData(5)
        
        
                this.results = [...res1, ...res2, ...res3, ...res4, ...res5, ...res6]
            }
        )()

    }

    



    async listGames(categroy) {

        if (this.currentCategory !== categroy) {

            this.ui.loader.classList.remove('d-none')

            this.currentCategory = categroy

            const res = await fetch(`${API}/games?category=${categroy}`, {
                headers
            });

            const data = await res.json();

            this.ui.displayGames(data)

            this.addEvents()

            this.ui.loader.classList.add('d-none')
        }

    }
    async searchGames() {
        this.ui.loader.classList.remove('d-none')

        const term = this.searchInput.value

        this.ui.displayGameSearch(this.results, term)

        this.addEvents()

        this.ui.loader.classList.add('d-none')

    }




    async returnData(x) {

        const res = await fetch(`${API}/games?category=${this.mycategories[x]}`, {
            headers
        });

        const data = await res.json();

        console.log(data);

        
        return data
    }
    

    addEvents() {
        const games = document.querySelectorAll('.game')
        games.forEach(game => {
            game.addEventListener('click', () => {
                this.details.getGameDetails(game.dataset.id)
                document.querySelector('.games').classList.add('d-none')
                document.querySelector('.game-details').classList.remove('d-none')
            })
        })
    }
    
    setFilters() {
        let filters = document.querySelectorAll('.nav-link')
        let indicator = document.querySelector('.indicator')

        filters.forEach(filter => {
            filter.addEventListener('click', () => {
                filters.forEach(filter => filter.classList.remove('active'))
                filter.classList.add('active')

                let index = Array.from(filters).indexOf(filter)
                let width = parseInt(getComputedStyle(filter).getPropertyValue('width'))
                let left = parseInt(getComputedStyle(indicator).getPropertyValue('--left'));
                indicator.style.left = `${left + (width > 50 ? 50 : width) * index}px`

                
                if(filter.dataset.category != "search"){
                    let searchBox = document.getElementById('searchBox')
                    searchBox.classList.add('d-none')
                    this.listGames(filter.dataset.category)
                }
                else{
                    let searchBox = document.getElementById('searchBox')
                    searchBox.classList.remove('d-none')
                    this.searchGames()
                }
            })
        })
    }

}