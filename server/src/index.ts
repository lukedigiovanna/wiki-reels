import { App } from "./app"
import { RatingsRouter } from "./ratings/ratings.router"

const app = new App([
    new RatingsRouter()
])

app.listen();