import React from "react";
import { PricingTable } from "@clerk/clerk-react";

const Plan = () => {
  return (
<<<<<<< HEAD
    <section className="w-full py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center">
          <h2 className="text-slate-700 text-[42px] font-semibold">
            Choose Your Plan
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto mt-4">
            Start for free and scale up as you grow. Find the perfect plan for
            your content creation needs.
          </p>
        </div>

        <div className="mt-14 w-full overflow-x-auto">
          <PricingTable />
        </div>
      </div>
    </section>
=======
    <div className="max-w-2xl mx-auto z-20 my-30">
      <div className="text-center">
        <h2 className="text-slate-700 text-[42px]">Choose Your Plan</h2>
        <p className="text-gray-500 max-w-lg mx-auto">
          Start for free and scale up as you grow. Find the perfect plan for
          your content creation needs.
        </p>
      </div>

      {/* Pricing Table container with custom width */}
      <div className="mt-14 max-sm:mx-8">
        <PricingTable />
      </div>
    </div>
>>>>>>> 6316eab6093acb8b4ff44c1ebf38d1c0c4f0b1de
  );
};

export default Plan;
