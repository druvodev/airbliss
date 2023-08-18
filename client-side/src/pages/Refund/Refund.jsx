import RefundTable from "./RefundTable";

const Refund = () => {

    return (
        <div className="py-24">
           <div className="lg:px-20">
           <h3 className="text-center bg-cyan-300 py-2 text-2xl font-bold text-[#855c5c]">Refund Policy</h3>
           </div>
            <RefundTable></RefundTable>
        </div>
    );
};

export default Refund;
