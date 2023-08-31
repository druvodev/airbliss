import React from 'react';
import { MdCancel } from 'react-icons/md';
import { AiFillSetting } from 'react-icons/ai';

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
                    {name}
                </td>
                <td>
                    {email}
                </td>
                <td>
                    {occupation}
                </td>
                <td>
                    {role}
                </td>
                <td>
                    {status}
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