import { Endpoint } from '../utils/endpoint';
import users from './users.service';

class UsersController {
    @Endpoint
    test() {
        return users.getNothing();
    }
}

export default UsersController;
