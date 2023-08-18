

const ContactForm = () => {
    return (
        <div className="">
            <form className="space-y-5">
                <input type="text" placeholder="Name" name="name"
                    className="outline-none w-full  border-b border-cyan-600 pb-[2px] block"
                />
                <input type="email" placeholder="Email" name="email"
                    className="outline-none w-full border-cyan-600  border-b pb-[2px] block"
                />
                <textarea name="message" id="message" cols="30" rows="4" placeholder="Message" className="outline-none   border-b pb-[2px] w-full block border-cyan-600"></textarea>
                <button className=" p-1 rounded-[10px] bg-gradient-to-r to-cyan-500 via-cyan-600 from-cyan-700 hover:bg-gradient-to-r hover:to-cyan-700 hover:via-cyan-700 hover:from-cyan-700 duration-500">
                    <span className="block px-6 py-2 text-white font-semibold rounded-[10px] ">Submit</span>
                </button>

            </form>
        </div>
    );
};

export default ContactForm;