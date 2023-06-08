import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';
import { AuthContext } from '../Provider/AuthProvider';
import { useForm } from 'react-hook-form';
const Login = () => {
    const { signIn } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state?.from?.pathname || '/'

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {

        console.log(data.email, data.password)
        signIn(data.email, data.password)
            .then(result => {
                console.log(result.user);
                navigate(from, { replace: true })
            })
            .catch(err => console.log(err))

    };

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col md:flex-row-reverse">
                    <div className="text-center md:w-1/2 lg:text-left">

                    </div>
                    <div className="card shadow-2xl bg-base-100 p-4">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input {...register("email", { required: true })} type="email" name="email" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input {...register("password", { required: true })} type="password" name="password" placeholder="password" className="input input-bordered" />
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Login" />
                            </div>
                        </form>
                        <SocialLogin></SocialLogin>
                        <p className='mt-4'><small>New Here? <Link to="/registration">Create an account</Link> </small></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;