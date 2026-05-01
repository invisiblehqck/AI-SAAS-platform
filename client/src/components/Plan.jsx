import React from "react";
import { PricingTable } from "@clerk/clerk-react";

const Plan = () => {
  return (
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
  );
};

export default Plan;
