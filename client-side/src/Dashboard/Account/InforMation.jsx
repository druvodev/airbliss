import React, { useEffect, useRef, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { FaHeart, FaIdCard } from "react-icons/fa";
import { TbGenderBigender } from 'react-icons/tb';
import { MdEmail, MdOutlineDateRange } from 'react-icons/md';
import { HiHome, HiHomeModern } from 'react-icons/hi2';
import { BiWorld } from 'react-icons/bi';
import { IoInformationCircle } from 'react-icons/io5';

const InforMation = ({ currentUser }) => {
    const { user } = useAuth()
    const { name, _id, photo, role, backgroundImg, email, about, dateOfBirth, gender, occupation, phone, bio, nickname, live, from, relationship, nation } = currentUser || {};

    // State to store the selected image file
    const [selectedImage, setSelectedImage] = useState(null);
    const formRef = useRef();

    // Function to handle image selection
    const handleImageChange = (event) => {
        const selectedFile = event.target.files[0];
        setSelectedImage(selectedFile);
    };

    useEffect(() => {
        if (selectedImage) {
            // Trigger form submission
            formRef.current.submit();
        }
    }, [selectedImage]);


    // Function to handle form submission (including image upload to ImgBB)
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedImage) {
            // Handle case where no image is selected
            return;
        }

        try {
            // Upload the selected image to ImgBB
            const formData = new FormData();
            formData.append('image', selectedImage);
            const imgbbResponse = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`, {
                method: 'POST',
                body: formData,
            });
            const imgbbData = await imgbbResponse.json();

            if (imgbbData.data) {
                // Use imgbbData.data.display_url as the image URL
                const imageUrl = imgbbData.data.display_url;

                fetch(`http://localhost:5000/users/${_id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ imageUrl }),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.acknowledged === true) {
                            toast.success("User Data submitted successfully");
                        } else {
                            toast.error("Failed to update user data");
                        }
                        console.log(data);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                // Proceed with your user creation and profile update logic

                // Print the image URL (for testing)
                console.log('Image URL:', imageUrl);
            } else {
                // Handle ImgBB API error
                console.error('ImgBB API error:', imgbbData);
            }
        } catch (error) {
            // Handle other errors (e.g., network error)
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <div className="relative w-full h-[400px]">
                <img
                    className="w-full h-[400px] object-cover rounded-t-xl"
                    src={
                        backgroundImg
                            ? backgroundImg
                            : "https://i.ibb.co/Y2QBhjS/programming-background-collage-1.jpg"
                    }
                    alt="backgroundImg"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[rgba(255,255,255,0.11)] to-[rgba(34,34,34,0.51)]">
                    <form
                        ref={formRef}
                        onSubmit={handleSubmit}
                    >
                        <input
                            type="file"
                            accept="image/*"
                            className="absolute right-0 bottom-5 bg-transparent"
                            onChange={handleImageChange}
                        />
                    </form>
                </div>
                <div className='flex absolute -bottom-28 gap-5 right-[40%]'>
                    <img
                        src={
                            photo
                                ? photo
                                : "https://i.ibb.co/Ws1r9fp/images.png"
                        }
                        // src='https://i.ibb.co/Ws1r9fp/images.png'
                        alt={user?.displayName}
                        className='w-[200px] h-[200px] rounded-full'
                    />
                    <div className='mt-24'>
                        <h1 className='text-[32px] font-bold text-gray-900 capitalize text-center'>
                            {user?.displayName} <span className='lowercase font-light'>{nickname ? `(${nickname})` : ''}</span>
                        </h1>
                        <p>{bio}</p>
                    </div>
                </div>
            </div>
            <div className='max-w-5xl grid gap-5 grid-row-2 mx-auto mt-36 mb-24'>
                <div className='grid gap-4 grid-cols-2'>
                    <div className='grid grid-rows-4 gap-3'>
                        <div className='flex'>
                            <FaIdCard className='text-2xl mr-3 mt-1' />
                            <h1 className='text-xl'><span className='font-bold'>Occupation:</span> {occupation}</h1>
                        </div>
                        <div className='flex'>
                            <TbGenderBigender className='text-2xl mr-3 mt-1' />
                            <h1 className='text-xl'><span className='font-bold'>Gender:</span> {gender}</h1>
                        </div>
                        <div className='flex'>
                            <MdOutlineDateRange className='text-2xl mr-3 mt-1' />
                            <h1 className='text-xl'><span className='font-bold'>Date of Birth:</span> {dateOfBirth}</h1>
                        </div>
                        <div className='flex'>
                            <FaHeart className='text-2xl mr-3 mt-1' />
                            <h1 className='text-xl'><span className='font-bold'>Relationship:</span> {relationship}</h1>
                        </div>
                    </div>
                    <div className='grid grid-rows-4 gap-3'>
                        <div className='flex'>
                            <MdEmail className='text-2xl mr-3 mt-1' />
                            <h1 className='text-xl'><span className='font-bold'>Email:</span> {email}</h1>
                        </div>
                        <div className='flex'>
                            <HiHome className='text-2xl mr-3 mt-1' />
                            <h1 className='text-xl'><span className='font-bold'>From:</span> {from}</h1>
                        </div>
                        <div className='flex'>
                            <HiHomeModern className='text-2xl mr-3 mt-1' />
                            <h1 className='text-xl'><span className='font-bold'>Lives in:</span> {live}</h1>
                        </div>
                        <div className='flex'>
                            <BiWorld className='text-2xl mr-3 mt-1' />
                            <h1 className='text-xl'><span className='font-bold'>Nationality:</span> {nation}</h1>
                        </div>
                    </div>
                </div>
                <div className='flex'>
                    <IoInformationCircle className='text-2xl mr-3 mt-1' />
                    <h1 className='text-xl'><span className='font-bold'>About:</span> {about}</h1>
                </div>
            </div>
        </div>
    );
};

export default InforMation;