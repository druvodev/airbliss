import RefundTable from "./RefundTable";

const Refund = () => {

    return (
        <div>
          <div className="bg-[url('https://i.ibb.co/BcD2H2z/adelie-huang-gy-Nts-PO2x1o-unsplash.jpg')] py-48 bg-cover bg-no-repeat bg-center">

          </div>
          <div className="pb-8 md:pb-16 pt-12 px-5 sm:px-10 max-w-7xl mx-auto h-auto overflow-hidden">
          <div className="lg:px-20">
           <h3 className="text-center bg-cyan-300 py-2 text-2xl font-bold text-[#855c5c]">Refund Policy</h3>
           </div>
            <RefundTable></RefundTable>
          </div>

        </div>
    );
};

export default Refund;
