import { FaLocationDot } from "react-icons/fa6";
import { FaPhone, FaEnvelope } from "react-icons/fa";

import ContactForm from "../../Components/Form/ContactForm";


const Contact = () => {
  const subTitle = <>
    <p>If you have any specific comments on us, we'd encourage you to leave a
      comment in the comment section below each of our projects so we can
      get better work in-front of you.</p>
  </>
  return (
    <div >
      <div className="bg-[url('https://i.ibb.co/YQgZg8R/contact.jpg')] py-48 bg-cover bg-no-repeat bg-center ">

      </div>
      <div className="pb-8 md:pb-16 px-5 sm:px-10 max-w-7xl mx-auto h-auto overflow-hidden">
        <div className=" py-10 ">
          <h3 className="text-3xl  font-bold text-center">
            Contact Us
          </h3>
          <p className=" lg:text-lg mt-3 w-11/12 md:w-5/6 lg:w-2/3 mx-auto text-center hidden sm:block">
            {subTitle}
          </p>

          <div className="grid sm:grid-cols-2 gap-y-10 mt-10 items-center px-6 ">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <FaLocationDot className="text-xl"></FaLocationDot>
                <div>
                  <h6 className="text-cyan-600  ">Address</h6>
                  <p className=" w-8/12 text-sm">
                    Road:27, House:119, Dhanmondi-27, Dhaka, Bangladesh
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <FaPhone className="text-xl"></FaPhone>
                <div>
                  <h6 className="text-cyan-600  ">Phone</h6>
                  <p className=" w-/12 text-sm">+88017325856</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <FaEnvelope className="text-xl"></FaEnvelope>
                <div>
                  <h6 className="text-cyan-600 ">Email</h6>
                  <p className=" w-8/12 text-sm">
                    webgeniussquad@gmail.com
                  </p>
                </div>
              </div>
            </div>
            <div>
              <ContactForm></ContactForm>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Contact;
