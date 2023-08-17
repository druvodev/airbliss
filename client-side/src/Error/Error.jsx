import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import Lottie from 'lottie-react'
import errorPage from '../assets/Lotti/animation_llf6ipqk.json'

const Error = () => {
    const { error } = useRouteError()
    return (
        <div className='flex flex-col justify-center items-center h-[calc(100vh-0px)] bg-[#e9fdff]'>
            <div className='flex justify-center items-center w-[400px] lg:w-[700px]'>
                <Lottie animationData={errorPage} loop={true} />
            </div>
            <div className='max-w-md text-center'>
                <p className='text-2xl font-semibold md:text-3xl text-cyan-500 mb-8'>
                    {error?.message}
                </p>
                <Link to='/' className='btn bg-cyan-500 hover:bg-transparent border-2 hover:text-cyan-500 rounded-full px-10 text-white'>
                    Back to homepage
                </Link>
            </div>
        </div>
    );
};

export default Error;