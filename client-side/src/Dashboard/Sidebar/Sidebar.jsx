import { Link, NavLink, useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import logo from "../../assets/icon/airblissWhite.png";
import useAuth from "../../hooks/useAuth";
import DashboardNav from "../DashboardNav/DashboardNav";
import { FaHome } from "react-icons/fa";

const Sidebar = ({ isActive, setActive, isDarkMode }) => {
  console.log(isDarkMode);
  const navigate = useNavigate();
  // const [toggle, setToggle] = useState(false)
  const { user, logOut } = useAuth();

  const closeSidebar = (value) => {
    console.log("closeSidebar called", value);
    setActive(value);
  };

  const handleLogOut = () => {
    logOut();
    navigate("/");
  };

  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gray-100 text-gray-800 justify-between hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <img
              className="hidden md:block"
              width="100"
              height="100"
              src={logo}
              alt=""
            />
          </div>
        </div>
      </div>
      {/* Sidebar */}
      <div
        className={`z-10 px-[25px] bg-[#37517e] md:fixed flex flex-col justify-between overflow-x-hidden w-64 space-y-6 py-4 absolute inset-y-0 left-0 transform  ${
          isDarkMode
            ? "bg-slate-800"
            : "bg-gradient-to-b from-[#70cfc9] to-[#5daad6]"
        }
        ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
        // style={{
        //   backgroundImage: "linear-gradient(to bottom, #70cfc9 , #5daad6 )",
        // }}
      >
        <div>
          {/* Branding & Profile Info */}
          <div>
            <div className="w-full md:flex py-2 justify-center items-center rounded-lg  mx-auto">
              <Link to="/">
                <img
                  className=" mx-auto md:block w-[150px] h-[60px]"
                  src={logo}
                  alt=""
                />
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav>
              <>
                <DashboardNav closeSidebar={closeSidebar} />
              </>
            </nav>
          </div>
        </div>

        <div>
          <hr />
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center shadow-lg rounded-full px-4 py-2 mt-5 transition-colors duration-300 transform hover:bg-white hover:text-cyan-500 ${
                isActive
                  ? "bg-white text-cyan-500 active:border rounded-full"
                  : "text-white"
              }`
            }
          >
            <FaHome className="w-5 h-5" />

            <span className="mx-4 font-medium">Home</span>
          </NavLink>
          <button
            onClick={handleLogOut}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-50 hover:bg-gray-50 rounded-full shadow-lg  hover:text-cyan-500 transition-colors duration-300 transform"
          >
            <CiLogout className="w-5 h-5 hover:text-cyan-500" />

            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
