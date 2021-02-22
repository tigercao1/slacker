import './UserTab.scss';
import { useForm } from "react-hook-form";
import UserController from '../../../controllers/UserController';
import { useState } from 'react';

const UserTab = (props) => {
    const userController = new UserController();

    const { register, handleSubmit } = useForm();
    const handleLogin = (data) => {
         userController.login(data);
    }

    const handleRegister = (data) => {
        userController.register(data);
    }

    const [userRegister, setUserRegister] = useState(false);

    return (
        <>
            {
                !userRegister ?
                <form onSubmit={handleSubmit(handleLogin)}>
                    <input name="username" type="email" placeholder="example@mail.com" ref={register({ required: true })} />
                    <input name="password" type="password" placeholder="Password" ref={register({ required: true })} />
                    <div className="btn-group">
                        <input type="submit" value="Login"/>
                        <div className="link" onClick={() => setUserRegister(true)}>Register</div>
                    </div>
                </form> :
                <form onSubmit={handleSubmit(handleRegister)}>
                    <input name="username" type="email" placeholder="example@mail.com" ref={register({ required: true })} />
                    <input name="password" type="password" placeholder="Password" ref={register({ required: true })} />
                    <div className="btn-group">
                        <input type="submit" value="Register"/>
                        <div className="link" onClick={() => setUserRegister(false)}><span>Already have an account? </span> Login</div>
                    </div>
                </form>
            }
        </>
    )
}
export default UserTab;