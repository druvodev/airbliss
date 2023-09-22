import React, { useState } from 'react';
import { MdDone, MdOutlineAdminPanelSettings } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import { AiFillSetting, AiOutlineUser } from 'react-icons/ai';

const AllUsers = ({ user, index, handleModalOpen }) => {
    const { role, occupation, email, name, _id, status } = user || {};

    return (
        <>
            <tr>
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
                    <h1 className='font-semibold'>{name}</h1>
                </td>
                <td>
                    {email}
                </td>
                <td>
                    {occupation}
                </td>
                <td>
                    {role === 'admin' ? (
                        <button
                            className={`w-8 h-8 rounded-full text-white flex justify-center items-center bg-yellow-400`}
                        >
                            <MdOutlineAdminPanelSettings className='text-xl' />
                        </button>
                    ) : (
                        <button
                            className={`w-8 h-8 rounded-full text-white flex justify-center items-center bg-blue-400`}
                        >
                            <AiOutlineUser className='text-xl' />
                        </button>
                    )}
                </td>
                <td>
                    {status === 'normal' ? (
                        <button
                            className={`w-8 h-8 rounded-full text-white flex justify-center items-center bg-green-400`}
                        >
                            <MdDone className='text-xl' />
                        </button>
                    ) : (
                        <button
                            className={`w-8 h-8 rounded-full text-white flex justify-center items-center bg-red-400`}
                        >
                            <RxCross2 className='text-xl' />
                        </button>
                    )}
                </td>
                <td>
                    <button
                        onClick={() => handleModalOpen(_id, role, status)}
                        className={`w-8 h-8 rounded-full text-white flex justify-center items-center bg-cyan-500`}
                    >
                        <AiFillSetting />
                    </button>
                </td>
            </tr>
        </>
    );
};

export default AllUsers;