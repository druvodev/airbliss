
import { useState } from "react";
import { VscKebabVertical } from "react-icons/vsc"
import { Link } from "react-router-dom";
const FlightStatusCard = ({ flight, index }) => {
    const [edit, setEdit] = useState(false)
    


    return (
        <div className="grid grid-cols-6 justify-between py-2 px-3 items-center border-b border-gray-300 ">
            
            <div className="flex items-center gap-x-1">
                <img src="https://4.bp.blogspot.com/-GQ_AFkfZNDM/Tg379bG4OvI/AAAAAAAAZyw/t8MBnw5ZdWs/s1600/air_india_logo_history.png" alt="" className="w-10 h-10" />
                <div>
                <h2>#721395</h2>
                <h3>Air India</h3>
                </div>
            </div>
            <div>
                <h4>New Delhi</h4>
                <h5>05:10pm</h5>
            </div>
            <div>
                <h4>New Delhi</h4>
                <h5>05:10pm</h5>
            </div>
            <div>
                <h3>Non-Stop</h3>
                <h3>2.30 hrs </h3>
            </div>
            <div>
                <p>68.00</p>
            </div>
            <div className="flex gap-x-3 items-center">

                <div>
                    <p>Confirmed(38)</p>
                    <p>Refund(00)</p>
                    <p>Available(08)</p>
                </div>
                <div className="cursor-pointer" >
                    <VscKebabVertical onClick={() => setEdit(!edit)} ></VscKebabVertical>
                </div>
                    <div className={` border border-gray-300 p-2 ${edit ? "block" : "hidden"}`}>
                        <Link className="block border-b border-gray-300 pb-1">Edit</Link>
                        <Link className="pt-1">Delete</Link>
                    </div>


            </div>
        </div>
    );
};

export default FlightStatusCard;