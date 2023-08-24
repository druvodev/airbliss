import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';
import InforMation from './InforMation';
import Edit from './Edit';
import View from './View';

const Account = () => {
    const { user } = useAuth()
    const [isEdit, setIsEdit] = useState(false);
    const [users, setUsers] = useState([])
    const [axiosSecure] = UseAxiosSecure()

    const switchToEditOrUpdate = () => {
        setIsEdit((prevMode) => !prevMode);
    };

    useEffect(() => {
        axiosSecure.get('/users')
            .then(response => {
                setUsers(response.data)
                // console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [axiosSecure]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        // This is where you can update the user's information
    };

    return (
        <div>
            <div className='bg-white p-5 rounded-xl'>
                <h1 className='text-[22px] font-semibold text-gray-900 capitalize'><span className='text-[24px] font-bold'>{user?.displayName}</span>'s AirBliss Account</h1>
            </div>
            <div className='grid grid-cols-3 gap-8 mt-8'>
                <div className='bg-white col-span-1 py-[50px] px-[30px] h-fit rounded-xl'>
                    <InforMation />
                </div>
                <div className='bg-white col-span-2 py-[30px] px-[50px] rounded-xl'>
                    <div className='flex justify-between '>
                        <h1 className='text-[36px] mb-7 font-semibold text-gray-900 capitalize'>Personal Information</h1>
                        <button className='btn btn-sm' onClick={switchToEditOrUpdate}>
                            {isEdit ? 'View' : 'Edit'}
                        </button>
                    </div>
                    <>
                        {isEdit ?
                            <Edit
                                handleSubmit={handleSubmit}
                            />
                            :
                            <View />
                        }
                    </>
                </div>
            </div>
        </div>
    );
};

export default Account;