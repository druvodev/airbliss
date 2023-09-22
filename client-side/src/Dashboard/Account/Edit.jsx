import React from "react";

const Edit = ({ handleSubmit, currentUser }) => {
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
    bio,
    nickname,
    live,
    from,
    relationship,
    nation,
  } = currentUser || {};

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8 ">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 font-semibold text-[#222] text-[18px] dark:text-gray-300 "
            >
              Full Name:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter Your Name Here"
              className="w-full px-[24px] py-[16px] border rounded-md border-gray-300 focus:outline-cyan-500 bg-white text-gray-900"
              defaultValue={name}
            />
          </div>
          <div>
            <label
              htmlFor="occupation"
              className="block mb-2 font-semibold text-[#222] dark:text-gray-300 text-[18px]"
            >
              Occupation:
            </label>
            <input
              type="text"
              name="occupation"
              id="occupation"
              placeholder="Enter Your Occupation Here"
              className="w-full px-[24px] py-[16px]  border rounded-md border-gray-300 focus:outline-cyan-500 bg-white text-gray-900"
              defaultValue={occupation}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div>
            <label
              htmlFor="DateOfBirth"
              className="block mb-2 dark:text-gray-300 font-semibold text-[#222] text-[18px]"
            >
              Date Of Birth:
            </label>
            <input
              type="date"
              name="dateOfBirth"
              id="dateOfBirth"
              placeholder="Enter Your Name Here"
              className="w-full px-[24px] py-[16px] border rounded-md border-gray-300 focus:outline-cyan-500 bg-white text-gray-900"
              defaultValue={dateOfBirth}
            />
          </div>
          <div>
            <label
              htmlFor="gender"
              className="block mb-2 font-semibold dark:text-gray-300 text-[#222] text-[18px]"
            >
              Gender:
            </label>
            <select
              name="gender"
              id="gender"
              className="w-full px-[24px] py-[16px] border rounded-md border-gray-300 focus:outline-cyan-500 bg-white text-gray-900"
              defaultValue={gender}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div>
            <label
              htmlFor="DateOfBirth"
              className="block mb-2 font-semibold dark:text-gray-300 text-[#222] text-[18px]"
            >
              Nationality:
            </label>
            <input
              type="text"
              name="nation"
              id="nation"
              placeholder="Enter Your Nationality Here"
              className="w-full px-[24px] py-[16px] border rounded-md border-gray-300 focus:outline-cyan-500 bg-white text-gray-900"
              defaultValue={nation}
            />
          </div>
          <div>
            <label
              htmlFor="gender"
              className="block mb-2 font-semibold text-[#222] dark:text-gray-300 text-[18px]"
            >
              Relationship:
            </label>
            <select
              name="relationship"
              id="relationship"
              className="w-full px-[24px] py-[16px] border rounded-md border-gray-300 focus:outline-cyan-500 bg-white text-gray-900"
              defaultValue={relationship}
            >
              <option value="">Select Relationship</option>
              <option value="single">Single</option>
              <option value="marry">Marry</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div>
            <label
              htmlFor="DateOfBirth"
              className="block mb-2 font-semibold text-[#222] text-[18px] dark:text-gray-300"
            >
              From:
            </label>
            <input
              type="text"
              name="from"
              id="from"
              placeholder="Enter Your From address Here"
              className="w-full px-[24px] py-[16px] border rounded-md border-gray-300 focus:outline-cyan-500 bg-white text-gray-900"
              defaultValue={from}
            />
          </div>
          <div>
            <label
              htmlFor="DateOfBirth"
              className="block mb-2 font-semibold text-[#222] dark:text-gray-300 text-[18px]"
            >
              Lives in:
            </label>
            <input
              type="text"
              name="live"
              id="live"
              placeholder="Enter Your live address Here"
              className="w-full px-[24px] py-[16px] border rounded-md border-gray-300 focus:outline-cyan-500 bg-white text-gray-900"
              defaultValue={live}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div>
            <label
              htmlFor="DateOfBirth"
              className="block mb-2 font-semibold text-[#222] dark:text-gray-300 text-[18px]"
            >
              Nickname:
            </label>
            <input
              type="text"
              name="nickname"
              id="nickname"
              placeholder="Enter Your From Nickname Here"
              className="w-full px-[24px] py-[16px] border rounded-md border-gray-300 focus:outline-cyan-500 bg-white text-gray-900"
              defaultValue={nickname}
            />
          </div>
          <div>
            <label
              htmlFor="DateOfBirth"
              className="block mb-2 font-semibold text-[#222] dark:text-gray-300 text-[18px]"
            >
              Bio:
            </label>
            <input
              type="text"
              name="bio"
              id="bio"
              placeholder="Enter Your live Bio Here"
              className="w-full px-[24px] py-[16px] border rounded-md border-gray-300 focus:outline-cyan-500 bg-white text-gray-900"
              defaultValue={bio}
            />
          </div>
        </div>
        <div className="mt-8">
          <div>
            <label
              htmlFor="EmailAddress"
              className="block mb-2 font-semibold text-[#222] dark:text-gray-300 text-[18px]"
            >
              Email Address:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Your Email Here"
              className="w-full px-[24px] py-[16px] border rounded-md border-gray-300 focus:outline-cyan-500 bg-white text-gray-900"
              data-temp-mail-org="0"
              defaultValue={email}
            />
          </div>
          <div className="mt-8">
            <label
              htmlFor="PhoneNumber"
              className="block mb-2 font-semibold text-[#222] dark:text-gray-300 text-[18px]"
            >
              Phone Number:
            </label>
            <input
              type="number"
              name="phone"
              id="phone"
              placeholder="Enter Your Phone Here"
              className="w-full px-[24px] py-[16px] border rounded-md border-gray-300 focus:outline-cyan-500 bg-white text-gray-900"
              defaultValue={phone}
            />
          </div>
          <div className="mt-8">
            <label
              htmlFor="CoverLetter"
              className="block mb-2 font-semibold text-[#222] dark:text-gray-300 text-[18px]"
            >
              Cover Letter:
            </label>
            <textarea
              name="about"
              id="about"
              placeholder="Enter Your Cover Letter Here"
              className="w-full px-[24px] py-[16px] border rounded-md border-gray-300 focus:outline-cyan-500 bg-white text-gray-900"
              cols="30"
              rows="5"
              defaultValue={about}
            ></textarea>
          </div>
        </div>
        <input
          className="btn bg-cyan-500 px-8 py-4 text-white rounded-md mt-5 border-2 hover:border-cyan-500 border-cyan-500 hover:bg-transparent hover:text-cyan-500"
          type="submit"
          value="Update"
        />
      </form>
    </>
  );
};

export default Edit;
