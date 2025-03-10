import { DollarSign } from "lucide-react";

export const DashboardCard = () => {
  return (
    <div className=" border-gray-50/40 border-[1px] min-w-64 w-full rounded-md px-6 py-5 flex flex-col gap-3 ">
      <div className="flex  justify-between items-center">
        <p>Total Revenue</p>
        <DollarSign className="h-4 w-4" />
      </div>
      <div>
        <h2 className="flex justify-start items-center text-3xl font-semibold">
          <DollarSign />
          45,231.89
        </h2>
        <p className="text-sm text-gray-100/40">+20.1% from last month</p>
      </div>
    </div>
  );
};
