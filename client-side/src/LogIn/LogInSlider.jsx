import React from 'react';

const LogInSlider = () => {
    return (
        <>
            <div className="carousel w-full">
                <div id="slide1" className="carousel-item relative w-full">
                    {/* <div className='relative'>
                        <img src="https://www.adivaha.com/themeforest-travon/assets/img/normal/travel_1_1.png" alt="" />
                        <div className="overlay absolute inset-0 bg-cyan-200 bg-opacity-40"></div>
                    </div> */}
                    <div className="card w-full rounded-none relative">
                        <figure style={{ clipPath: 'polygon(50% 0%, 100% 0, 100% 35%, 100% 91%, 77% 98%, 51% 91%, 21% 96%, 0 91%, 0% 35%, 0 0)' }}>
                            <img src="https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" alt="Shoes" />
                        </figure>
                        <div className="card-body p-0 text-center">
                            <h2 className="text-xl font-semibold">Unrivaled Comfort</h2>
                            <p className='text-[11px] px-12'>Step into a world of ultimate comfort when you book with us. Our carefully curated airline partners ensure plush seating, ample legroom, and state-of-the-art amenities to make your journey relaxing and enjoyable.</p>
                        </div>
                    </div>
                    {/* <div className='absolute bottom-0 left-[43%]'>
                        <h1 className='text-3xl'>Flight</h1>
                    </div> */}
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-2 right-2 top-[90%]">
                        <a href="#slide4" className="btn bg-cyan-300 btn-sm btn-circle">❮</a>
                        <a href="#slide2" className="btn bg-cyan-300 btn-sm btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide2" className="carousel-item relative w-full">
                <div className="card w-full rounded-none relative">
                        <figure style={{ clipPath: 'polygon(50% 0%, 100% 0, 100% 35%, 100% 91%, 77% 98%, 51% 91%, 21% 96%, 0 91%, 0% 35%, 0 0)' }}>
                            <img src="https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" alt="Shoes" />
                        </figure>
                        <div className="card-body p-0 text-center">
                            <h2 className="text-xl font-semibold">Unrivaled Comfort</h2>
                            <p className='text-[11px] px-12'>Step into a world of ultimate comfort when you book with us. Our carefully curated airline partners ensure plush seating, ample legroom, and state-of-the-art amenities to make your journey relaxing and enjoyable.</p>
                        </div>
                    </div>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-[90%]">
                        <a href="#slide1" className="btn bg-cyan-300 btn-sm btn-circle">❮</a>
                        <a href="#slide3" className="btn bg-cyan-300 btn-sm btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide3" className="carousel-item relative w-full">
                <div className="card w-full rounded-none relative">
                        <figure style={{ clipPath: 'polygon(50% 0%, 100% 0, 100% 35%, 100% 91%, 77% 98%, 51% 91%, 21% 96%, 0 91%, 0% 35%, 0 0)' }}>
                            <img src="https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" alt="Shoes" />
                        </figure>
                        <div className="card-body p-0 text-center">
                            <h2 className="text-xl font-semibold">Unrivaled Comfort</h2>
                            <p className='text-[11px] px-12'>Step into a world of ultimate comfort when you book with us. Our carefully curated airline partners ensure plush seating, ample legroom, and state-of-the-art amenities to make your journey relaxing and enjoyable.</p>
                        </div>
                    </div>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-[90%]">
                        <a href="#slide2" className="btn bg-cyan-300 btn-sm btn-circle">❮</a>
                        <a href="#slide4" className="btn bg-cyan-300 btn-sm btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide4" className="carousel-item relative w-full">
                <div className="card w-full rounded-none relative">
                        <figure style={{ clipPath: 'polygon(50% 0%, 100% 0, 100% 35%, 100% 91%, 77% 98%, 51% 91%, 21% 96%, 0 91%, 0% 35%, 0 0)' }}>
                            <img src="https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" alt="Shoes" />
                        </figure>
                        <div className="card-body p-0 text-center">
                            <h2 className="text-xl font-semibold">Unrivaled Comfort</h2>
                            <p className='text-[11px] px-12'>Step into a world of ultimate comfort when you book with us. Our carefully curated airline partners ensure plush seating, ample legroom, and state-of-the-art amenities to make your journey relaxing and enjoyable.</p>
                        </div>
                    </div>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-[90%]">
                        <a href="#slide3" className="btn bg-cyan-300 btn-sm btn-circle">❮</a>
                        <a href="#slide1" className="btn bg-cyan-300 btn-sm btn-circle">❯</a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LogInSlider;