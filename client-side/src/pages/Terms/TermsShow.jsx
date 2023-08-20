import React from 'react';

const TermsShow = ({policy}) => {
    const {name, details} = policy; 
    return (
        <div className='py-3'>
            <h3 id={name} className='font-semibold'>{name}</h3>
            <p>{details}</p>
        </div>
    );
};

export default TermsShow;