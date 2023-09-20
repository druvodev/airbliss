import { useEffect, useState } from "react";
import SectionTitle from "../../../Components/SectionTitle";
import HotDealCard from "../../../Components/Card/HotDealCard";

const HotDeals = () => {
  const [deals, setDeals] = useState([]);
  useEffect(() => {
    fetch("hotDeals.json")
      .then((res) => res.json())
      .then((data) => {
        setDeals(data);
      });
  }, []);

  return (
    <section id="discount-section">
      <SectionTitle sectionTitle="Unlock Exclusive Discounts"></SectionTitle>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-y-4 sm:gap-x-3 sm:gap-y-6 md:gap-x-6 lg:gap-2 xl:gap-x-6  grid-cols-1 w-full sm:w-8/12 md:w-full mx-auto ">
        {deals.map((deal, index) => (
          <HotDealCard deal={deal} key={index}></HotDealCard>
        ))}
      </div>
    </section>
  );
};

export default HotDeals;
