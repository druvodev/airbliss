import React from 'react';

const RefundTable = () => {
    return (
        <div className='lg:px-20'>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className='bg-cyan-700 text-lg text-white'>
                        <tr>
                            <th>Applies to</th>
                            <th>For</th>
                            <th>Amount Per Ticket</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        <tr className="bg-base-200">

                            <td>Agent Assisted Cancellation</td>
                            <td>Cancellation requested within 24 hours of booking (USA Web-sites Only) </td>
                            <td>Per-passenger, per-ticket fees: <br />
                                Domestic $50 <br />
                                International: $75 <br />
                                Business and First Class: $75</td>
                        </tr>
                        {/* row 2 Cancellation & Refunds (beyond 24 hrs)*/}
                        <tr className='bg-cyan-300 py-2 '>
                            <td></td>
                            <td className=' lg:text-xl text-center font-bold'>Cancellation & Refunds (beyond 24 hrs)</td>
                            <td></td>
                        </tr>
                        <tr className=''>
                            <td className='text-center p-0'>
                                <p className='bg-cyan-700 py-[26px] text-xl text-white '></p>
                                <tr className='flex '>
                                    <td className='text-center border bg-gray-100 w-full py-[18px]'></td>

                                </tr>
                            </td>
                            <td className='text-center p-0'>
                                <p className='bg-cyan-700 py-3 text-xl text-white'>Air- Economy</p>
                                <tr className='flex '>
                                    <td className='text-center border bg-gray-100 w-full py-2'>Domestic</td>
                                    <td className='text-center border bg-gray-100 w-full py-2'>International</td>
                                </tr>
                            </td>
                            <td className='text-center p-0'>
                                <p className='bg-cyan-700 py-3 text-xl text-white'>Air- Business/First</p>
                                <tr className='flex '>
                                    <td className='text-center border bg-gray-100 w-full py-2'>Domestic</td>
                                    <td className='text-center border bg-gray-100 w-full py-2'>International</td>
                                </tr>
                            </td>

                        </tr>
                        {/* row 3 */}
                        <tr className='bg-gray-100 p-0'>

                            <td className='p-0 pl-1'>Agent Assisted Cancellation1 w/Future Credit</td>

                            <td className='p-0'>
                                <tr className='flex justify-center'>
                                    <td className='border w-full text-center'>$50</td>
                                    <td className='border w-full text-center'>$50</td>
                                </tr>
                            </td>
                            <td className='p-0'>
                                <tr className='flex justify-center'>
                                    <td className='border w-full text-center'>$100</td>
                                    <td className='border w-full text-center'>$100</td>
                                </tr>
                            </td>
                        </tr>
                        {/* row 4 */}
                        <tr className='bg-gray-100 p-0'>

                            <td className='p-0 pl-1'>Agent Assisted Cancellation2 w/Refund</td>

                            <td className='p-0'>
                                <tr className='flex justify-center'>
                                    <td className='border w-full text-center'>$100</td>
                                    <td className='border w-full text-center'>$100</td>
                                </tr>
                            </td>
                            <td className='p-0'>
                                <tr className='flex justify-center'>
                                    <td className='border w-full text-center'>$250</td>
                                    <td className='border w-full text-center'>$250</td>
                                </tr>
                            </td>
                        </tr>


                        {/* row 2 CChanges to Existing Tickets (exchange)*/}
                        <tr className='bg-cyan-300 py-2 '>
                            <td></td>
                            <td className=' md:text-xl text-center font-bold'>Changes to Existing Tickets (exchange)</td>
                            <td></td>
                        </tr>

                        {/* row 3 */}
                        <tr className='bg-gray-100 p-0'>

                            <td className='p-0 pl-1'>Within 10 days of new travel date</td>

                            <td className='p-0'>
                                <tr className='flex justify-center'>
                                    <td className='border w-full text-center'>$150</td>
                                    <td className='border w-full text-center'>$250</td>
                                </tr>
                            </td>
                            <td className='p-0'>
                                <tr className='flex justify-center'>
                                    <td className='border w-full text-center'>$250</td>
                                    <td className='border w-full text-center'>$250</td>
                                </tr>
                            </td>
                        </tr>
                        {/* row 4 */}
                        <tr className='bg-gray-100 p-0'>

                            <td className='p-0 pl-1'>Beyond 10 days of new travel date</td>

                            <td className='p-0'>
                                <tr className='flex justify-center'>
                                    <td className='border w-full text-center'>$100</td>
                                    <td className='border w-full text-center'>$200</td>
                                </tr>
                            </td>
                            <td className='p-0'>
                                <tr className='flex justify-center'>
                                    <td className='border w-full text-center'>$200</td>
                                    <td className='border w-full text-center'>$250</td>
                                </tr>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RefundTable;