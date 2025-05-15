import { useNavigate } from "react-router";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-3 items-center justify-center">
      <h1 className="text-4xl font-semibold">PageNotFound</h1>
      <button
        onClick={() => navigate("/")}
        className=" w-60 cursor-pointer bg-black text-white transition-all duration-300  font-medium px-3 py-3 rounded"
      >
        &larr; Go Back
      </button>
    </div>
  );
};

export default PageNotFound;
