import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import useAdmin from '../../../Hooks/useAdmin';
import useInstructor from '../../../Hooks/useInstructor';
import AOS from 'aos';
import 'aos/dist/aos.css';

const SingleClass = ({ cls }) => {
    const { image, name, availableSeats, instructorName, price, _id } = cls
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor()
    useEffect(() => {
        AOS.init();
    }, []);
    const handleSelect = () => {
        const myCart = { image, name, availableSeats, instructorName, price, email: user?.email, classId: _id }
        if (user) {
            fetch('https://sports-acedemy-server.vercel.app/myClass', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(myCart)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                })
        }
        else{
            navigate('/login')
        }
    }
    return (
        <div data-aos="zoom-in-right">
            <div className={`border-2 p-4 h-[450px] my-8 rounded ${availableSeats == 0 && 'bg-red-600 text-white'}`}>
                <p>{name}</p>
                <img className='w-full h-[250px]' src={image} alt="" />
                <p>Instructor: {instructorName}</p>
                <div>
                    <p>Available Seat: {availableSeats}</p>
                    <p>Price: ${price}</p>
                </div>
                <button disabled={isAdmin || isInstructor || availableSeats == 0} onClick={handleSelect} className='btn btn-primary'>Select</button>
            </div>
        </div>
    );
};

export default SingleClass;