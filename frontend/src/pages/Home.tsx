import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, DollarSign, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="mx-auto ">
      <h1 className="text-3xl font-medium text-left">Event Categories</h1>
      <div className="grid grid-cols-2 rounded-lg my-10 ">
        <div className="group rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col  border  m-2">
          <div className="relative h-52 overflow-hidden">
            <img
              src="/pic1.jpg"
              alt="Category 1"
              className=" mb-4 w-full h-full transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          {/* <Separator /> */}
          <div className="p-3">
            <h2 className=" text-xl font-medium text-left mb-1 p-2">
              Tech Conference 2025
            </h2>
            <div className="flex flex-col gap-2 p-2 ">
              <div className="flex items-center gap-20">
                <p className="text-gray-600 flex items-center gap-2 text-sm">
                  <CalendarDays className="h-4 w-4  text-purple-600" />
                  2025-06-15
                </p>
                <div className="text-white bg-purple-700 flex items-center gap-2 rounded-full px-6 py-1 text-sm">
                  Sports
                </div>
              </div>
              <p className="text-gray-600 flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4  text-purple-600" />
                Tech Hub Innovation
              </p>
              <p className="text-gray-600 flex items-center gap-2 text-sm">
                <DollarSign className="h-4 w-4  text-purple-600" />
                <span className="font-medium text-black">$299.99</span>
              </p>
            </div>
            <div className="flex items-center justify-between w-full p-4">
              <Link className="text-base text-purple-600 hover:text-purple-800">
                View Details
              </Link>
              <Button className="px-5">Book now</Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center p-4 border rounded-lg shadow-md m-2">
          <h2 className="text-xl font-semibold">Category 2</h2>
          <p className="text-gray-600">Description of Category 2</p>
        </div>
        {/* Add more categories as needed */}
      </div>
    </div>
  );
};

export default Home;
