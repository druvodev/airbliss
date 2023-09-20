import React, { useEffect, useState } from 'react';
import TermsShow from './TermsShow';

const Terms = () => {
    const [policies, setPolicies] = useState([]);
    useEffect(() =>{
        fetch("terms.json")
        .then(res => res.json())
        .then(data => setPolicies(data))
    },[])
    return (
        <div>
            <div className="bg-[url('https://i.ibb.co/GssKHPL/sonia-nadales-i-TYVXGu-Ar-M-unsplash.jpg')] py-48 bg-cover bg-no-repeat bg-center">

            </div>
          
            <div className='pb-8 md:pb-16 pt-12 px-5 sm:px-10 max-w-7xl mx-auto h-auto overflow-hidden'>
            <div className='flex flex-row  overflow-x-auto justify-between gap-x-3 px-3'>
                {
                    policies.map((policy, index) => <div key={index} className="flex cursor-pointer flex-col  text-cyan-700 hover:text-cyan-800 justify-center border-b-2 border-transparent hover:border-cyan-300 items-center gap-2 transition duration-500 whitespace-nowrap">
                    <a href={`#${policy?.name}`} className='text-[12px] lg:text-sm capitalize pb-2'>{policy?.name}</a>
                    </div>
                    )
                }
            </div>
            <div className='px-3 pb-10'>
           <h3 className='text-lg sm:text-xl lg:text-3xl font-bold md:pb-4'>Terms and Conditions</h3>
            <p>Welcome to AirBliss Ltd. ("AirBliss Ltd.”AirBliss", "we", "our", "us") website (collectively, the "Site"). This Site is provided by us solely to assist customers in gathering travel information, determining the availability of travel-related goods and services, making legitimate reservations or otherwise transacting business with travel suppliers, and for no other purposes. Use of the Site is governed by the following Terms & Conditions. By using the Site, whether to review information or to book travel reservations (through this Site or telephone or email with our call center), or for any other purpose, you agree to these Terms & Conditions and agree they control any travel reservations made with us. If you do not agree with any part of these Terms & Conditions, you must not use the Site or book travel reservations with us. We reserve the right to amend these Terms & Conditions at any time without prior notice. All amended terms automatically take effect when these Terms & Conditions are updated. Your continued use of the Site following the posting of changes to the Terms & Conditions will mean you accept those changes. Please return to this page periodically to review any changes. AirBliss Ltd. operates with its own brand name “AirBliss” having its motto “all about your journey”.</p>
           </div>
            <div className='px-3'>
                {
                    policies.map((policy, index) => <TermsShow key={index} policy={policy}></TermsShow>)
                }
            </div>
            </div>
        </div>
    );
};

export default Terms;