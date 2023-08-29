import React, { useEffect, useState } from 'react';
import UseAxiosSecure from '../../../hooks/UseAxiosSecure';
import { MdCancel } from 'react-icons/md';
import { AiFillSetting } from 'react-icons/ai';

const ManageUsers = () => {
    const [users, setUsers] = useState([])
    const [axiosSecure] = UseAxiosSecure()

    useEffect(() => {
        axiosSecure.get('/users')
            .then(response => {
                setUsers(response?.data)
                // console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [axiosSecure]);

    return (
        <div>
            <div className="overflow-x-auto mx-7 mt-[50px] px-10 py-5 rounded-xl bg-white">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Occupation</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr
                                key={user._id}
                            >
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle rounded-full w-12 h-12">
                                                <img src={user?.photo} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {user?.name}
                                </td>
                                <td>
                                    {user?.email}
                                </td>
                                <td>
                                    {user?.occupation}
                                </td>
                                <td>
                                    {user?.role}
                                </td>
                                <td className='flex gap-2 mt-2'>
                                    <button
                                        className={`w-8 h-8 rounded-full text-white flex justify-center items-center ${user.role === 'student' ? 'bg-gray-500' : 'bg-cyan-500'}`}
                                    >
                                        <AiFillSetting />
                                    </button>
                                    <button
                                        className={`w-8 h-8 rounded-full text-white flex justify-center items-center ${user.role === 'student' ? 'bg-gray-500' : 'bg-red-500'}`}
                                    >
                                        <MdCancel />
                                    </button>
                                </td>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;