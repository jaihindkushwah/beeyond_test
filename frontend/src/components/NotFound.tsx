import type { FC, ReactElement } from "react";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import { Button } from "./ui/button";

const NotFound: FC = (): ReactElement => {
  const navigate: NavigateFunction = useNavigate();

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="text-6xl font-bold text-red-400 md:text-8xl lg:text-9xl">
        Oops!
      </div>
      <p className="mt-5 text-base font-bold text-red-400 md:text-xl lg:text-2xl">
        Error 404: Page Not Found
      </p>
      <Button
        onClick={() => navigate(-1)}
        disabled={false}
        className="mt-5 rounded  px-6 py-3 text-center text-sm font-bold bg-red-500 hover:bg-red-600 text-white focus:outline-none md:px-4 md:py-2 md:text-base"
        title="Back Home"
      >
        Back Home{" "}
      </Button>
    </div>
  );
};

export default NotFound;
