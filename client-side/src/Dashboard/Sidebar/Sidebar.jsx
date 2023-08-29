import { useNavigate } from 'react-router-dom'
import { CiLogout } from 'react-icons/ci'
import logo from '../../assets/icon/airblissBlack.png'
import useAuth from '../../hooks/useAuth'
import DashboardNav from '../DashboardNav/DashboardNav'

const Sidebar = ({ isActive }) => {
  const navigate = useNavigate()
  // const [toggle, setToggle] = useState(false)
  const { user, logOut } = useAuth()


  const handleLogOut = () => {
    logOut()
    navigate('/')
  }
  return (
    <>
      {/* Small Screen Navbar */}
      <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
        <div>
          <div className='block cursor-pointer p-4 font-bold'>
            <img
              className='hidden md:block'
              width='100'
              height='100'
              src="https://i.ibb.co/FbFzwxM/4425949-2411-removebg-preview.png"
              alt=""
            />
          </div>
        </div>
      </div>
      {/* Sidebar */}
      <div
        className={`z-10 px-[25px] md:fixed flex flex-col justify-between overflow-x-hidden bg-cyan-50 w-64 space-y-6 py-4 absolute inset-y-0 left-0 transform ${isActive && '-translate-x-full'
          }  md:translate-x-0  transition duration-200 ease-in-out`}

        style={{
          backgroundImage: 'linear-gradient(to bottom, #70cfc9 , #5daad6 )',
        }}
      >
        <div>
          {/* Branding & Profile Info */}
          <div>
            <div className='w-full hidden md:flex py-2 justify-center items-center rounded-md mx-auto'>
              <img
                className='hidden md:block'
                width='100'
                height='100'
                src={logo}
                alt=""
              />
            </div>
          </div>

          {/* Nav Items */}
          <div className='flex flex-col justify-between flex-1 mt-6'>
            <nav>
              <>
                <DashboardNav />
              </>
            </nav>
          </div>
        </div>

        <div>
          <hr />
          <button
            onClick={handleLogOut}
            className='flex w-full items-center px-4 py-2 mt-5 text-gray-50 hover:bg-gray-50 rounded-full shadow-lg  hover:text-gray-700 transition-colors duration-300 transform'
          >
            <CiLogout className='w-5 h-5 text-white' />

            <span className='mx-4 font-medium'>Logout</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default Sidebar