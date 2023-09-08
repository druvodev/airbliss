import React from 'react';
import useAuth from '../../hooks/useAuth';
import { FaHeart, FaIdCard } from "react-icons/fa";
import { TbGenderBigender } from 'react-icons/tb';
import { MdEmail, MdOutlineDateRange } from 'react-icons/md';
import { HiHome, HiHomeModern } from 'react-icons/hi2';
import { BiWorld } from 'react-icons/bi';
import { IoInformationCircle } from 'react-icons/io5';

const InforMation = ({ currentUser }) => {
    const { user } = useAuth()
    const { name, photo, role, email, about, dateOfBirth, gender, occupation, phone, bio, nickname, live, from, relationship, nation } = currentUser || {};

    return (
        <div>
            <div className="relative w-full h-[400px]">
                <img
                    className="w-full h-[400px] object-cover rounded-t-xl"
                    src="https://scontent.fdac148-1.fna.fbcdn.net/v/t39.30808-6/280657018_1182846172540265_7202198727903171947_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=52f669&_nc_ohc=o9arnEyupasAX8FyjsN&_nc_ht=scontent.fdac148-1.fna&oh=00_AfBeBv24HuYHF8zJfg6_YMHIKpb-u8PMUKGlXGYDkEDMGA&oe=65005ADA"
                    alt=""
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[rgba(255,255,255,0.11)] to-[rgba(34,34,34,0.51)]"></div>
                <div className='flex absolute -bottom-28 gap-5 right-[55%]'>
                    <img
                        src={
                            photo
                                ? photo
                                : "https://i.ibb.co/Ws1r9fp/images.png"
                        }
                        // src='https://i.ibb.co/Ws1r9fp/images.png'
                        alt={user?.displayName}
                        className='w-[200px] h-[200px] rounded-full'
                    />
                    <div className='mt-24'>
                        <h1 className='text-[32px] font-bold text-gray-900 capitalize text-center'>{user?.displayName}</h1>
                        <p>{bio}</p>
                    </div>
                </div>
            </div>
            <div className='max-w-5xl grid gap-5 grid-row-2 mx-auto mt-36 mb-24'>
                <div className='grid gap-4 grid-cols-2'>
                    <div className='grid grid-rows-4 gap-3'>
                        <div className='flex'>
                            <FaIdCard className='text-2xl mr-3 mt-1' />
                            <h1 className='text-xl'><span className='font-bold'>Occupation:</span> {occupation}</h1>
                        </div>
                        <div className='flex'>
                            <TbGenderBigender className='text-2xl mr-3 mt-1' />
                            <h1 className='text-xl'><span className='font-bold'>Gender:</span> {gender}</h1>
                        </div>
                        <div className='flex'>
                            <MdOutlineDateRange className='text-2xl mr-3 mt-1' />
                            <h1 className='text-xl'><span className='font-bold'>Date of Birth:</span> {dateOfBirth}</h1>
                        </div>
                        <div className='flex'>
                            <FaHeart className='text-2xl mr-3 mt-1' />
                            <h1 className='text-xl'><span className='font-bold'>Relationship:</span> {relationship}</h1>
                        </div>
                    </div>
                    <div className='grid grid-rows-4 gap-3'>
                        <div className='flex'>
                            <MdEmail className='text-2xl mr-3 mt-1' />
                            <h1 className='text-xl'><span className='font-bold'>Email:</span> {email}</h1>
                        </div>
                        <div className='flex'>
                            <HiHome className='text-2xl mr-3 mt-1' />
                            <h1 className='text-xl'><span className='font-bold'>From:</span> {from}</h1>
                        </div>
                        <div className='flex'>
                            <HiHomeModern className='text-2xl mr-3 mt-1' />
                            <h1 className='text-xl'><span className='font-bold'>Lives in:</span> {live}</h1>
                        </div>
                        <div className='flex'>
                            <BiWorld className='text-2xl mr-3 mt-1' />
                            <h1 className='text-xl'><span className='font-bold'>Nationality:</span> {nation}</h1>
                        </div>
                    </div>
                </div>
                <div className='flex'>
                    <IoInformationCircle className='text-7xl mr-3 mt-1' />
                    <h1 className='text-xl'><span className='font-bold'>About:</span> {about}</h1>
                </div>
            </div>
        </div>
    );
};

export default InforMation;