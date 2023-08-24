import { useEffect, useState } from "react";
import {FaArrowLeft} from "react-icons/fa"
import {FaArrowRight} from "react-icons/fa"
import FlightStatusCard from "./FlightStatusCard";

const FlightStatus = () => {
    const [flights, setFlights] = useState([]);
    const [page, setPage] = useState(1);


    useEffect(() => {
        fetch("http://localhost:5000/flights")
            .then(res => res.json())
            .then(data => setFlights(data))
    }, []);

    const selectedPageHandler =(selectedPage) =>{
        if(selectedPage > 0 && selectedPage <= flights.length / 7 && selectedPage !== page ){

            setPage(selectedPage);
        }
    }

    console.log(flights)


    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-lg">Flight From Delhi to Dhaka</h1>
                <select className="p-1">
                    <option value="All FLights">All FLights</option>
                    <option value="Running">Running</option>
                    <option value="Arrival">Arrival</option>
                </select>
            </div>
            <div className="mt-7">
                
                <div className="grid grid-cols-6 justify-between py-3 bg-gray-300  lg:px-3 font-bold text-[12px] lg:text-lg">
                    <p>Airline Company</p>
                    <p>Departure </p>
                    <p>Arrival</p>
                    <p>Duration</p>
                    <p>Price ($)</p>
                    <p>Total Bookings</p>
                    

                </div>
                <div className="" >
                  {
                   flights.length > 0 && flights.slice(page * 7 - 7, page * 7).map((flight, index) => <FlightStatusCard flight={flight} key={flight._id} index={index} >
                   
                   </FlightStatusCard>)
                  }

                </div>
                    <div className="mt-4 pr-10">
                    {
                        flights.length > 0 && <div className="flex items-center justify-end h-10 cursor-pointer"> 

                            <span className=" border border-gray-300 text-xl p-3" onClick={()=> selectedPageHandler(page - 1)}><FaArrowLeft></FaArrowLeft></span>
                            {
                                [...Array(flights.length / 7)].map((_,index) => {
                                    return <span key={index} className="text-xl font-semibold border border-gray-300 p-2" onClick={()=> selectedPageHandler(index + 1)} >{index + 1}</span>
                                })
                            }
                            <span className="border border-gray-300 text-xl p-3" onClick={()=> selectedPageHandler(page + 1)}><FaArrowRight></FaArrowRight></span>

                        </div>
                    }
                    </div>
            </div>
           

        </div>
    );
};

export default FlightStatus;
