import React from "react";

const View = ({ currentUser }) => {
  const {
    name,
    photo,
    role,
    email,
    about,
    dateOfBirth,
    gender,
    occupation,
    phone,
  } = currentUser || {};

  return (
    <>
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div>
            <label className="block mb-2 font-semibold text-[#222] dark:text-gray-300 text-[18px]">
              Full Name:
            </label>
            <p>{name}</p>
          </div>
          <div>
            <label className="block mb-2 font-semibold text-[#222] dark:text-gray-300 text-[18px]">
              Occupation:
            </label>
            <p>{occupation}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div>
            <label className="block mb-2 font-semibold text-[#222] dark:text-gray-300 text-[18px]">
              Date Of Birth:
            </label>
            <p>{dateOfBirth}</p>
          </div>
          <div>
            <label className="block mb-2 font-semibold text-[#222] dark:text-gray-300 text-[18px]">
              Gender:
            </label>
            <p>{gender}</p>
          </div>
        </div>
        <div className="mt-8">
          <div>
            <label className="block mb-2 font-semibold text-[#222] dark:text-gray-300 text-[18px]">
              Email Address:
            </label>
            <p>{email}</p>
          </div>
          <div className="mt-8">
            <label className="block mb-2 font-semibold text-[#222] dark:text-gray-300 text-[18px]">
              Phone Number:
            </label>
            <p>{phone}</p>
          </div>
          <div className="mt-8">
            <label className="block mb-2 font-semibold text-[#222] dark:text-gray-300 text-[18px]">
              Cover Letter:
            </label>
            <p>{about}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default View;
