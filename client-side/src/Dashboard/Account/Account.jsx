import React from 'react';
import useAuth from '../../hooks/useAuth';

const Account = () => {
    const { user } = useAuth()
    return (
        <div>
            <div className='bg-white p-5 rounded-xl'>
                <h1 className='text-[22px] font-semibold text-gray-900 capitalize'><span className='text-[24px] font-bold'>{user?.displayName}</span>'s AirBliss Account</h1>
            </div>
            <div className='grid grid-cols-3 gap-8 mt-8'>
                <div className='bg-white col-span-1 py-[50px] px-[30px] h-fit rounded-xl'>
                    <div>
                        <img
                            src={
                                user?.photoURL
                                    ? user?.photoURL
                                    : "https://i.ibb.co/Ws1r9fp/images.png"
                            }
                            alt={user?.displayName}
                            className='w-[200px] h-[200px] rounded-full mx-auto'
                        />
                        <h1 className='text-[32px] font-semibold text-gray-900 capitalize mt-9 text-center'>{user?.displayName}</h1>
                    </div>
                    <div className='mt-12 px-[20px]'>
                        <h1 className='text-2xl font-medium text-[#333]'>About</h1>
                        <p className='text-[#999] mt-2'>Hello I am Dr. Johirul Islam Nishat a Teacher in Job Task E-learning Platform. I love to study with all my Team and professors.</p>
                    </div>
                    <div className='grid grid-cols-2 px-[20px] mt-12'>
                        <div>
                            <h1 className='text-2xl font-medium text-[#333]'>Age</h1>
                            <p className='text-[#999] mt-2'>17</p>
                        </div>
                        <div>
                            <h1 className='text-2xl font-medium text-[#333]'>Gender</h1>
                            <p className='text-[#999] mt-2'>Male</p>
                        </div>
                    </div>
                    <div className='mt-12 px-[20px]'>
                        <h1 className='text-2xl font-medium text-[#333]'>Date Of Birth</h1>
                        <p className='text-[#999] mt-2'>02/05/2006</p>
                    </div>
                </div>
                <div className='bg-white col-span-2 py-[30px] px-[50px] rounded-xl'>
                    <h1 className='text-[36px] mb-7 font-semibold text-gray-900 capitalize'>Personal Information</h1>
                    <form>
                        <div className='grid grid-cols-2 gap-8 mt-8'>
                            <div>
                                <label htmlFor="name" className="block mb-2 font-semibold text-[#222] text-[18px]">
                                    Full Name:
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Enter Your Name Here"
                                    className="w-full px-[24px] py-[16px] border rounded-md border-gray-300 focus:outline-cyan-500 bg-white text-gray-900"
                                />
                            </div>
                            <div>
                                <label htmlFor="occupation" className="block mb-2 font-semibold text-[#222] text-[18px]">
                                    Occupation:
                                </label>
                                <input
                                    type="text"
                                    name="occupation"
                                    id="occupation"
                                    placeholder="Enter Your Occupation Here"
                                    className="w-full px-[24px] py-[16px] border rounded-md border-gray-300 focus:outline-cyan-500 bg-white text-gray-900"
                                />
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-8 mt-8'>
                            <div>
                                <label htmlFor="DateOfBirth" className="block mb-2 font-semibold text-[#222] text-[18px]">
                                    Date Of Birth:
                                </label>
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    id="dateOfBirth"
                                    placeholder="Enter Your Name Here"
                                    className="w-full px-[24px] py-[16px] border rounded-md border-gray-300 focus:outline-cyan-500 bg-white text-gray-900"
                                />
                            </div>
                            <div>
                                <label htmlFor="Gender" className="block mb-2 font-semibold text-[#222] text-[18px]">
                                    Gender:
                                </label>
                                <input
                                    type="text"
                                    name="gender"
                                    id="gender"
                                    placeholder="Enter Your Name Here"
                                    className="w-full px-[24px] py-[16px] border rounded-md border-gray-300 focus:outline-cyan-500 bg-white text-gray-900"
                                />
                            </div>
                        </div>
                        <div className='mt-8'>
                            <div>
                                <label htmlFor="EmailAddress" className="block mb-2 font-semibold text-[#222] text-[18px]">
                                    Email Address:
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Enter Your Email Here"
                                    className="w-full px-[24px] py-[16px] border rounded-md border-gray-300 focus:outline-cyan-500 bg-white text-gray-900"
                                    data-temp-mail-org="0"
                                />
                            </div>
                            <div className='mt-8'>
                                <label htmlFor="PhoneNumber" className="block mb-2 font-semibold text-[#222] text-[18px]">
                                    Phone Number:
                                </label>
                                <input
                                    type="number"
                                    name="phone"
                                    id="phone"
                                    placeholder="Enter Your Phone Here"
                                    className="w-full px-[24px] py-[16px] border rounded-md border-gray-300 focus:outline-cyan-500 bg-white text-gray-900"
                                />
                            </div>
                            <div className='mt-8'>
                                <label htmlFor="CoverLetter" className="block mb-2 font-semibold text-[#222] text-[18px]">
                                    Cover Letter:
                                </label>
                                <textarea
                                    name="about"
                                    id="about"
                                    placeholder="Enter Your Cover Letter Here"
                                    className="w-full px-[24px] py-[16px] border rounded-md border-gray-300 focus:outline-cyan-500 bg-white text-gray-900"
                                    cols="30"
                                    rows="5"
                                ></textarea>
                            </div>
                        </div>
                        <input
                            className='btn bg-cyan-500 px-8 py-4 text-white rounded-md mt-5 border-2 hover:border-cyan-500 border-cyan-500 hover:bg-transparent hover:text-cyan-500'
                            type="submit"
                            value="Update"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Account;