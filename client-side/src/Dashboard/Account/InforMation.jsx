import React, { useEffect, useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { FaHeart, FaIdCard } from "react-icons/fa";
import { TbGenderBigender } from "react-icons/tb";
import { MdEmail, MdOutlineDateRange } from "react-icons/md";
import { HiHome, HiHomeModern } from "react-icons/hi2";
import { BiWorld } from "react-icons/bi";
import { IoInformationCircle } from "react-icons/io5";
import toast from "react-hot-toast";

const InforMation = ({ currentUser }) => {
  const { user } = useAuth();
  const {
    name,
    _id,
    photo,
    role,
    backgroundImg,
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const image = event.target.image.files[0];

    const formData = new FormData();
    formData.append("image", image);

    const url = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMGBB_KEY
    }`;

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        const imageUrl = imageData.data.display_url;
        console.log(imageUrl);

        const usersData = {
          backgroundImg: imageUrl,
        };

        fetch(`http://localhost:5000/users/${currentUser._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ usersData }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.acknowledged === true) {
              toast.success("User Data submitted successfully");
            } else {
              toast.error("Failed to update user data");
            }

            // location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err.message);
        toast.error(err.message);
      });
    return;
  };

  return (
    <div className="pb-1 rounded-lg bg-white shadow">
      <div className="relative w-full h-[190px] lg:h-[400px]">
        <img
          className="w-full h-fit lg:h-[400px] object-cover rounded-t-xl"
          src={
            backgroundImg
              ? backgroundImg
              : "https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png"
          }
          alt="backgroundImg"
        />
        <div className="absolute top-0 lg:top-0 left-0 w-full h-full bg-gradient-to-b from-[rgba(255,255,255,0.11)] to-[rgba(34,34,34,0.51)]">
          <form
            onSubmit={handleSubmit}
            className="absolute border lg:right-10 right-2 flex gap-3 p-2 rounded-lg bg-[rgba(255,255,255,0.31)] bottom-5"
          >
            <input
              required
              type="file"
              id="image"
              name="image"
              accept="image/*"
              className="file-input file-input-bordered file-input-xs w-[100px] max-w-xs"
            />
            <input
              type="submit"
              value="upload"
              className="btn bg-cyan-400 border-none btn-xs"
            />
          </form>
        </div>
        <div className="flex absolute left-0 lg:left-12 ml-2 lg:-bottom-28 -bottom-20 gap-5 right-[40%]">
          <img
            src={photo ? photo : "https://i.ibb.co/Ws1r9fp/images.png"}
            alt={user?.displayName}
            className=" w-[100px] h-[100px]   lg:w-[200px] lg:h-[200px] rounded-full"
          />
          <div className="lg:mt-24 mt-12 -ml-2">
            <div className="flex lg:justify-start lg:items-center flex-col lg:flex-row font-bold capitalize lg:mt-3 text-xl lg:text-[32px] ">
              <h1 className="whitespace-nowrap ">{user?.displayName}</h1>
              <p className="lg:ml-2 lowercase font-light text-sm lg:text-[32px] whitespace-nowrap">
                {nickname ? `(${nickname})` : <div className="w-10 "></div>}
              </p>
            </div>

            <div className=" mt-3 text-sm">
              <p className="hidden lg:block">{bio}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-5xl grid gap-5 grid-row-2 mx-auto mt-36 mb-24">
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 pl-4 xl:pl-0">
          <div className="grid grid-rows-4 gap-3">
            <div className="flex">
              <FaIdCard className="text-2xl mr-3 mt-1" />
              <h1 className="text-sm md:text-xl">
                <span className="font-bold">Occupation:</span> {occupation}
              </h1>
            </div>
            <div className="flex">
              <TbGenderBigender className="text-2xl mr-3 mt-1" />
              <h1 className="text-sm md:text-xl">
                <span className="font-bold">Gender:</span> {gender}
              </h1>
            </div>
            <div className="flex">
              <MdOutlineDateRange className="text-2xl mr-3 mt-1" />
              <h1 className="text-sm md:text-xl">
                <span className="font-bold">Date of Birth:</span> {dateOfBirth}
              </h1>
            </div>
            <div className="flex">
              <FaHeart className="text-2xl mr-3 mt-1" />
              <h1 className="text-sm md:text-xl">
                <span className="font-bold">Relationship:</span> {relationship}
              </h1>
            </div>
          </div>
          <div className="grid grid-rows-4 gap-3">
            <div className="flex">
              <MdEmail className="text-2xl mr-3 mt-1" />
              <h1 className="text-sm md:text-xl">
                <span className="font-bold">Email:</span> {email}
              </h1>
            </div>
            <div className="flex">
              <HiHome className="text-2xl mr-3 mt-1" />
              <h1 className="text-sm md:text-xl">
                <span className="font-bold">From:</span> {from}
              </h1>
            </div>
            <div className="flex">
              <HiHomeModern className="text-2xl mr-3 mt-1" />
              <h1 className="text-sm md:text-xl">
                <span className="font-bold">Lives in:</span> {live}
              </h1>
            </div>
            <div className="flex">
              <BiWorld className="text-2xl mr-3 mt-1" />
              <h1 className="text-sm md:text-xl">
                <span className="font-bold">Nationality:</span> {nation}
              </h1>
            </div>
          </div>
        </div>
        <div className="flex items-center ml-4 xl:ml-0">
          <IoInformationCircle className="text-2xl mr-3 mt-1" />
          <h1 className="text-sm md:text-xl">
            <span className="font-bold">About:</span> {about}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default InforMation;
