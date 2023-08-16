import React from 'react';
import logo from '../assets/icon/airblissWhite.png'

const LogInSlider = () => {
    return (
        <>
            <div className="carousel w-full">
                <div id="slide1" className="carousel-item grid grid-row-2 relative w-full">
                    <div className="card w-full rounded-none relative">
                        <figure>
                            <img className='w-full object-cover relative' src="https://c.fareportal.com/vd/coa/travel/cm/signin-bg-1-1.png" alt="Shoes" />
                        </figure>
                        <div className="card-body p-0 text-center">
                            <h2 className="text-xl font-semibold">Earn</h2>
                            <p className='text-sm px-12'>Earn points on your bookings across our travel brands</p>
                        </div>
                    </div>
                    <div className='absolute top-[15%] flex flex-col justify-center items-center left-[50%] translate-x-[-50%]'>
                        <img className='w-36' src={logo} alt="" />
                        <h1 className='text-white font-semibold text-2xl'>We Provide World Class Service</h1>
                    </div>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-2 right-2 top-[80%]">
                        <a href="#slide4" className="btn border-cyan-500 bg-transparent text-cyan-500 btn-sm btn-circle">❮</a>
                        <a href="#slide2" className="btn border-cyan-500 bg-transparent text-cyan-500 btn-sm btn-circle">❯</a>
                    </div>
                    <div className="flex mt-10 justify-center w-full py-2 gap-2">
                        <a href="#slide1" className="btn btn-xs rounded-full btn-active text-white bg-cyan-500">1</a>
                        <a href="#slide2" className="btn btn-xs rounded-full">2</a>
                        <a href="#slide3" className="btn btn-xs rounded-full">3</a>
                        <a href="#slide4" className="btn btn-xs rounded-full">4</a>
                    </div>
                </div>
                <div id="slide2" className="carousel-item grid grid-row-2 relative w-full">
                    <div className="card w-full rounded-none relative">
                        <figure>
                            <img 
                            className='w-full object-cover relative' src="https://c.fareportal.com/vd/coa/travel/cm/signin-bg-2-1.png" alt="Shoes" />
                        </figure>
                        <div className="card-body p-0 text-center">
                            <h2 className="text-xl font-semibold">Redeem</h2>
                            <p className='text-sm px-12'>Redeem your earned points instantly on your bookings while you’re signed in
                            </p>
                        </div>
                    </div>
                    <div className='absolute top-[15%] flex flex-col justify-center items-center left-[50%] translate-x-[-50%]'>
                        <img className='w-36' src={logo} alt="" />
                        <h1 className='text-white font-semibold text-2xl'>We Provide World Class Service</h1>
                    </div>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-[80%]">
                        <a href="#slide1" className="btn border-cyan-500 bg-transparent text-cyan-500 btn-sm btn-circle">❮</a>
                        <a href="#slide3" className="btn border-cyan-500 bg-transparent text-cyan-500 btn-sm btn-circle">❯</a>
                    </div>
                    <div className="flex mt-10 justify-center w-full py-2 gap-2">
                        <a href="#slide1" className="btn btn-xs rounded-full">1</a>
                        <a href="#slide2" className="btn btn-xs rounded-full btn-active text-white bg-cyan-500">2</a>
                        <a href="#slide3" className="btn btn-xs rounded-full">3</a>
                        <a href="#slide4" className="btn btn-xs rounded-full">4</a>
                    </div>
                </div>
                <div id="slide3" className="carousel-item grid grid-row-2 relative w-full">
                    <div className="card w-full rounded-none relative">
                        <figure>
                            <img className='w-full object-cover relative' src="https://c.fareportal.com/vd/coa/travel/cm/signin-bg-3-1.png" alt="Shoes" />
                        </figure>
                        <div className="card-body p-0 text-center">
                            <h2 className="text-xl font-semibold">Repeat</h2>
                            <p className='text-sm px-12'>Get closer to a higher ClubMiles tier with each completed trip and unlock more benefits
                            </p>
                        </div>
                    </div>
                    <div className='absolute top-[15%] flex flex-col justify-center items-center left-[50%] translate-x-[-50%]'>
                        <img className='w-36' src={logo} alt="" />
                        <h1 className='text-white font-semibold text-2xl'>We Provide World Class Service</h1>
                    </div>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-[80%]">
                        <a href="#slide2" className="btn border-cyan-500 bg-transparent text-cyan-500 btn-sm btn-circle">❮</a>
                        <a href="#slide4" className="btn border-cyan-500 bg-transparent text-cyan-500 btn-sm btn-circle">❯</a>
                    </div>
                    <div className="flex justify-center mt-10 w-full py-2 gap-2">
                        <a href="#slide1" className="btn btn-xs rounded-full">1</a>
                        <a href="#slide2" className="btn btn-xs rounded-full">2</a>
                        <a href="#slide3" className="btn btn-xs rounded-full btn-active text-white bg-cyan-500">3</a>
                        <a href="#slide4" className="btn btn-xs rounded-full">4</a>
                    </div>
                </div>
                <div id="slide4" className="carousel-item grid grid-row-2 relative w-full">
                    <div className="card w-full rounded-none relative">
                        <figure>
                            <img className='w-full object-cover relative' src="https://c.fareportal.com/vd/coa/travel/cm/signin-bg-4-coa.png" alt="Shoes" />
                        </figure>
                        <div className="card-body p-0 text-center">
                            <h2 className="text-xl font-semibold">Download the app</h2>
                            <p className='text-sm px-12'>Earn 2x the points on every flight, hotel, and car booking</p>
                        </div>
                    </div>
                    <div className='absolute top-[15%] flex flex-col justify-center items-center left-[50%] translate-x-[-50%]'>
                        <img className='w-36' src={logo} alt="" />
                        <h1 className='text-white font-semibold text-2xl'>We Provide World Class Service</h1>
                    </div>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-[80%]">
                        <a href="#slide3" className="btn border-cyan-500 bg-transparent text-cyan-500 btn-sm btn-circle">❮</a>
                        <a href="#slide1" className="btn border-cyan-500 bg-transparent text-cyan-500 btn-sm btn-circle">❯</a>
                    </div>
                    <div className="flex justify-center mt-10 w-full py-2 gap-2">
                        <a href="#slide1" className="btn btn-xs rounded-full">1</a>
                        <a href="#slide2" className="btn btn-xs rounded-full">2</a>
                        <a href="#slide3" className="btn btn-xs rounded-full">3</a>
                        <a href="#slide4" className="btn btn-xs rounded-full btn-active text-white bg-cyan-500">4</a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LogInSlider;