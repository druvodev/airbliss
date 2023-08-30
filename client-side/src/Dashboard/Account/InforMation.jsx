import React from 'react';
import useAuth from '../../hooks/useAuth';

const InforMation = ({ currentUser }) => {
    const { user } = useAuth()
    const {name, photo, role, email, about, dateOfBirth, gender, occupation, phone} = currentUser || {};

    return (
        <>
            <div>
                <img
                    src={
                        photo
                            ? photo
                            : "https://i.ibb.co/Ws1r9fp/images.png"
                    }
                    alt={user?.displayName}
                    className='w-[200px] h-[200px] rounded-full mx-auto'
                />
                <h1 className='text-[32px] font-semibold text-gray-900 capitalize mt-9 text-center'>{user?.displayName}</h1>
            </div>
            <div className='mt-12 px-[20px]'>
                <h1 className='lg:text-2xl font-medium text-[#333]'>About</h1>
                <p className='text-[#999] mt-2'>{about}</p>
            </div>
            <div className='grid grid-cols-2 gap-2 px-[20px] mt-12'>
                <div>
                    <h1 className='lg:text-2xl font-medium text-[#333]'>Occupation</h1>
                    <p className='text-[#999] mt-2'>{occupation}</p>
                </div>
                <div>
                    <h1 className='lg:text-2xl font-medium text-[#333]'>Gender</h1>
                    <p className='text-[#999] mt-2'>{gender}</p>
                </div>
            </div>
            <div className='mt-12 px-[20px]'>
                <h1 className='lg:text-2xl font-medium text-[#333]'>Date Of Birth</h1>
                <p className='text-[#999] mt-2'>{dateOfBirth}</p>
            </div>
        </>
    );
};

export default InforMation;