import "./config/firebase";
import { App } from "./app"
import { RatingsRouter } from "./ratings/ratings.router"
import { UsersRouter } from "./users/users.router";
import { ArticlesRouter } from "./articles/articles.router";

const app = new App([
    new RatingsRouter(),
    new UsersRouter(),
    new ArticlesRouter()
]);

app.listen();