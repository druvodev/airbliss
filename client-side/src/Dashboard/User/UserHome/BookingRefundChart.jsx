import React from 'react';
import { SlOptionsVertical } from 'react-icons/sl';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Full Amount', value: 400 },
    { name: 'Refunded Amount', value: 100 },
];

const COLORS = ['#37517e' , '#fd7279'];

const BookingRefundChart = () => {
    return (
        <div className='bg-white shadow-md p-6 rounded-lg'>
            <div className='flex justify-between mb-10'>
                <h1 className='lg:text-2xl font-light text-gray-900'>Booking and Refund</h1>
                <button>
                    <SlOptionsVertical className='text-gray-400 text-xl font-bold mt-1' />
                </button>
            </div>
            <ResponsiveContainer width="100%" height={350}>
                <PieChart width={400} height={400}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BookingRefundChart;
