import api from './../utils/api';

class UserController {
    constructor() {
        this.register = this.register.bind(this);
    }

    async register(body) {
        let data = await api.post('/users/signup', {
            body: body
        });
        return data;
    }
}

export default UserController;