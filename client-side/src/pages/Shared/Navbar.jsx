import { useContext, useEffect, useRef, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { RxCaretDown } from "react-icons/rx";
import { BiMoon, BiScatterChart, BiSun } from "react-icons/bi";
import logoBlack from "../../assets/icon/airblissBlack.png";
import logoWhite from "../../assets/icon/airblissWhite.png";
import LoginSignupModal from "../../LogIn/LoginSignupModal";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import { useDispatch } from "react-redux";
import { setAllUserInfo, setUserInfo } from "../../redux/features/usersSlice";
import { PiPhone } from "react-icons/pi";
import { BsMoonFill } from "react-icons/bs";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMenuOne, setIsMenuOne] = useState(false);
  const [isMenuTwo, setIsMenuTwo] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isLoginSignupModalOpen, setIsLoginSignupModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [axiosSecure] = UseAxiosSecure();
  const location = useLocation();

  // Dark Mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      console.log(isDarkMode);
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // setIsLoading(true);
    axiosSecure
      .get("/users")
      .then((response) => {
        setUsers(response?.data);
        // setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // setIsLoading(false);
      });
  }, [axiosSecure]);

  const currentUser = users.find((userData) => userData?.email === user?.email);

  const isAdmin = currentUser?.role === "admin";

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAllUserInfo(users));
  }, [users]);

  useEffect(() => {
    dispatch(setUserInfo(currentUser));
  }, [currentUser]);

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;

    if (currentScrollPos > prevScrollPos) {
      setIsNavbarVisible(false);
    } else {
      setIsNavbarVisible(true);
      setIsScrolled(currentScrollPos > 0);
    }

    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  // Scrollingto the section
  const scrollToDiscountSection = (section) => {
    const discountSection = document.getElementById(section);
    const recommendedFlights = document.getElementById(section);
    const searchFlights = document.getElementById(section);
    if (discountSection || recommendedFlights || searchFlights) {
      discountSection.scrollIntoView({ behavior: "smooth" });
      recommendedFlights.scrollIntoView({ behavior: "smooth" });
      searchFlights.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navOption = (
    <>
      <ul className="text-gray-600">
        <li onClick={() => setIsMenuOne(!isMenuOne)} className="">
          <p className="font-font-medium ">
            Bookings {isMenuOne ? <FaAngleUp /> : <FaAngleDown />}
          </p>
          {isMenuOne && (
            <ul className="grid gap-1">
              <a
                onClick={() => {
                  scrollToDiscountSection("search-flights");
                }}
                className="cursor-pointer rounded-md p-2 hover:bg-base-200"
              >
                Search Flights
              </a>
              <a
                onClick={() => {
                  scrollToDiscountSection("our-services");
                }}
                className="cursor-pointer rounded-md p-2 hover:bg-base-200"
              >
                Our Services
              </a>
              <a
                onClick={() => {
                  scrollToDiscountSection("discount-section");
                }}
                className="cursor-pointer rounded-md p-2 hover:bg-base-200"
              >
                Exclusive Discounts
              </a>
              <a
                onClick={() => {
                  scrollToDiscountSection("recommended-flights");
                }}
                className="cursor-pointer rounded-md p-2 hover:bg-base-200"
              >
                Recommended Flights
              </a>
              <a
                onClick={() => {
                  scrollToDiscountSection("discount-hotels");
                }}
                className="cursor-pointer rounded-md p-2 hover:bg-base-200"
              >
                Discount On Hotels
              </a>
            </ul>
          )}
        </li>
        <li onClick={() => setIsMenuTwo(!isMenuTwo)} className="">
          <p className="font-font-medium">
            Categories {isMenuTwo ? <FaAngleUp /> : <FaAngleDown />}
          </p>
          {isMenuTwo && (
            <ul className="grid gap-1">
              <Link to="/">Home</Link>
              <Link to="/about">About Us</Link>
              <Link to="/contact">Contact</Link>
            </ul>
          )}
        </li>
      </ul>
    </>
  );

  const navbarClass = isScrolled
    ? "bg-white text-gray-700 shadow fixed z-50"
    : "bg-gradient-to-b from-gray-800 text-white";

  return (
    <div className="flex justify-center">
      {isNavbarVisible && (
        <div className={`fixed w-full z-50  ${navbarClass}`}>
          <div className="navbar text-sm px-5 sm:px-10 justify-between w-screen sm:max-w-7xl mx-auto">
            <div className="navbar-start">
              <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost lg:hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16"
                    />
                  </svg>
                </label>
                <div
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52 z-40"
                >
                  {navOption}
                </div>
              </div>
              <a href="/" className="text-xl font-semibold text-cyan-500">
                <img
                  src={isScrolled ? logoBlack : logoWhite}
                  className="h-9 sm:h-10"
                  alt=""
                />
              </a>
            </div>
            <div className="navbar-end hidden lg:flex">
              <div className="px-1 flex gap-5">
                {location?.pathname != "/" ? (
                  <></>
                ) : (
                  <>
                    <div className="dropdown">
                      <label
                        tabIndex={0}
                        className="m-1 flex items-center font-medium cursor-pointer"
                      >
                        <BiScatterChart className="text-lg mr-1" /> Categories{" "}
                        <RxCaretDown />
                      </label>
                      <ul
                        tabIndex={0}
                        className="dropdown-content text-black z-[1] menu p-3 shadow bg-base-100 rounded-box w-52 space-y-1"
                      >
                        <a
                          onClick={() => {
                            scrollToDiscountSection("search-flights");
                          }}
                          className="cursor-pointer rounded-md p-2 hover:bg-base-200"
                        >
                          Search Flights
                        </a>
                        <a
                          onClick={() => {
                            scrollToDiscountSection("our-services");
                          }}
                          className="cursor-pointer rounded-md p-2 hover:bg-base-200"
                        >
                          Our Services
                        </a>
                        <a
                          onClick={() => {
                            scrollToDiscountSection("discount-section");
                          }}
                          className="cursor-pointer rounded-md p-2 hover:bg-base-200"
                        >
                          Exclusive Discounts
                        </a>
                        <a
                          onClick={() => {
                            scrollToDiscountSection("recommended-flights");
                          }}
                          className="cursor-pointer rounded-md p-2 hover:bg-base-200"
                        >
                          Recommended Flights
                        </a>
                        <a
                          onClick={() => {
                            scrollToDiscountSection("discount-hotels");
                          }}
                          className="cursor-pointer rounded-md p-2 hover:bg-base-200"
                        >
                          Discount On Hotels
                        </a>
                      </ul>
                    </div>
                  </>
                )}
                <div className="dropdown">
                  <label
                    tabIndex={0}
                    className="m-1 flex items-center font-medium cursor-pointer"
                  >
                    <PiPhone className="text-lg mr-1" /> About Airbliss
                    <RxCaretDown />
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content text-black z-[1] menu p-3 shadow bg-base-100 rounded-box w-52 space-y-1"
                  >
                    <Link
                      to="/"
                      className="cursor-pointer rounded-md p-2 hover:bg-base-200"
                    >
                      Home
                    </Link>
                    <Link
                      to="/about"
                      className="cursor-pointer rounded-md p-2 hover:bg-base-200"
                    >
                      About Us
                    </Link>
                    <Link
                      to="/contact"
                      className="cursor-pointer rounded-md p-2 hover:bg-base-200"
                    >
                      Contact
                    </Link>
                  </ul>
                </div>
                {/* {!isDarkMode ? (
                  <button onClick={() => setIsDarkMode(!isDarkMode)}>
                    <BsMoonFill className="text-xl  " />
                  </button>
                ) : (
                  <button onClick={() => setIsDarkMode(!isDarkMode)}>
                    <BiSun className="text-2xl hover:animate-spin" />
                  </button>
                )} */}
              </div>
            </div>
            <div className="navbar-center">
              {!isDarkMode ? (
                <button onClick={() => setIsDarkMode(!isDarkMode)}>
                  <BsMoonFill className="text-xl  " />
                </button>
              ) : (
                <button onClick={() => setIsDarkMode(!isDarkMode)}>
                  <BiSun className="text-2xl hover:animate-spin" />
                </button>
              )}
              {user ? (
                <div className="dropdown dropdown-end ml-5">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img
                        src={
                          user?.photoURL
                            ? user?.photoURL
                            : "https://i.ibb.co/Ws1r9fp/images.png"
                        }
                        alt={user.displayName}
                      />
                    </div>
                  </label>
                  <div
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[1] px-4 py-6 shadow bg-base-100 rounded-box w-[260px] origin-center left-auto"
                  >
                    <div className="flex flex-col justify-center items-center">
                      <label tabIndex={0} className="avatar">
                        <div className="w-16 rounded-full cursor-pointer">
                          <img src={user?.photoURL} />
                        </div>
                      </label>
                      <div className="mt-5 mb-5 flex flex-col justify-center items-center">
                        <h1
                          className="font-medium text-[12px] lg:text-[18px] text-[#37517e]  hover:underline"
                        >
                          {user?.displayName}
                        </h1>
                        <p
                          className="mt-2 text-[10px] lg:text-[12px] font-medium text-[#37517e] hover:underline"
                        >
                          {user?.email}
                        </p>
                      </div>
                    </div>
                    <hr />
                    <ul className="flex flex-col justify-center items-center">
                      <li>
                        {isAdmin ? (
                          <Link to="/dashboard/adminHome" className="text-black">
                            Dashboard
                          </Link>
                        ) : (
                          <Link to="/dashboard/userHome" className="text-black">
                            Dashboard
                          </Link>
                        )}
                      </li>
                      <li>
                        <Link className="text-black" to="/" onClick={logOut}>
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <a
                  href="#"
                  onClick={() => setIsLoginSignupModalOpen(true)} // Open the modal on click
                  className="pl-5 py-1 flex items-center font-medium"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill={isScrolled || "white"}
                  >
                    <path d="M3.535,18.712a.58.58,0,0,1,0-.817,10.38,10.38,0,0,1,14.682,0,.583.583,0,0,1,0,.813,10.383,10.383,0,0,1-14.686,0Zm.939-.409a9.436,9.436,0,0,0,12.8,0,9.432,9.432,0,0,0-12.8,0Zm13.079.255h-.008Zm2.372-2.569a.5.5,0,0,1-.217-.665,9.785,9.785,0,0,0,1.055-4.45,9.887,9.887,0,0,0-19.775,0,9.771,9.771,0,0,0,1.054,4.45.494.494,0,1,1-.882.446A10.765,10.765,0,0,1,0,10.876a10.876,10.876,0,0,1,21.752,0,10.76,10.76,0,0,1-1.162,4.9.493.493,0,0,1-.441.271A.511.511,0,0,1,19.926,15.99Zm-13-6.137a3.955,3.955,0,1,1,3.955,3.954A3.96,3.96,0,0,1,6.921,9.853Zm.989,0a2.966,2.966,0,1,0,2.966-2.967A2.97,2.97,0,0,0,7.91,9.853Z"></path>
                  </svg>
                  <span className="font-medium">Login | Sign up</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Render the modal conditionally */}
      {isLoginSignupModalOpen && (
        <LoginSignupModal
          setIsLoginSignupModalOpen={setIsLoginSignupModalOpen}
          onClose={() => setIsLoginSignupModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Navbar;
