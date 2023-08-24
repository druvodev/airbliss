import React from 'react';

const View = () => {
    return (
        <>
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
                        <label htmlFor="gender" className="block mb-2 font-semibold text-[#222] text-[18px]">
                            Gender:
                        </label>
                        <select
                            name="gender"
                            id="gender"
                            className="w-full px-[24px] py-[16px] border rounded-md border-gray-300 focus:outline-cyan-500 bg-white text-gray-900"
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
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
            </form>
        </>
    );
};

export default View;