import { App } from "./app"
import { RatingsRouter } from "./ratings/ratings.router"
import { UsersRouter } from "./users/users.router";

const app = new App([
    new RatingsRouter(),
    new UsersRouter()
])

app.listen();