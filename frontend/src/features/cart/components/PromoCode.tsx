import { Button } from "@/components/ui/button";

const PromoCode = () => {
  return (
    <div className="mt-6 bg-white rounded-lg shadow-sm px-4 py-6 sm:px-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Promo Code</h3>
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Enter promo code"
          value={"ABC20"}
          readOnly
          className="flex-1 border border-gray-300 text-black rounded-md px-3 py-2 text-sm"
        />
        <Button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm font-medium">
          Applied
        </Button>
      </div>
    </div>
  );
};

export default PromoCode;
