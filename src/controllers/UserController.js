import api from './../utils/api';

class UserController {
    constructor() {
        this.searchByTitle = this.login.bind(this);
    }

    async login(body) {
        let data = await api.post('/', {
            body: body
        });
        return data;
    }

}

export default UserController;