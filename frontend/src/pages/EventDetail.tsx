import EventDetailSkeleton from "@/components/EventDetailSkeleton";
import { Separator } from "@/components/ui/separator";
import { useAuthContext } from "@/context/AuthContext";
import { useCreateBooking } from "@/hooks/bookings/useCreateBooking";
import { useGetEvent } from "@/hooks/events/useGetEvent";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const EventDetail = () => {
  const { id } = useParams();
  const { isPending, data } = useGetEvent(id as string);
  const { authUser } = useAuthContext();
  const navigate = useNavigate();
  const { isPending: loadingBooking, mutate: createBooking } =
    useCreateBooking();
  if (isPending) {
    return <EventDetailSkeleton />;
  }

  console.log(data);
  const { name, date, venue, price, category, description } = data;

  const handleBooking = () => {
    if (!authUser) {
      toast("Please login to book an event");
      navigate("/login");
      return;
    }

    const bookingData = {
      eventId: id,
      userId: authUser._id,
    };
    const bookingToast = toast.loading("Processing your booking...");
    createBooking(bookingData, {
      onSuccess: () => {
        toast.success("Booking successful!", {
          id: bookingToast,
        });
        navigate("/Congratulations");
      },
      onError: (error) => {
        toast.error("Booking failed. Please try again.", {
          id: bookingToast,
        });
      },
    });
  };
  return (
    <div className="">
      <div>
        <img className="w-full h-72 object-fill rounded" src="/pic1.jpg" />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <h1 className="text-xl font-normal text-left">{name}</h1>
        <p className=" flex items-center gap-2 text-sm ">
          Venue:
          <span className="font-medium">{venue}</span>
        </p>
        <p className=" flex items-center gap-2 text-sm">
          Price:
          <span className="font-medium ">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(price)}
          </span>{" "}
        </p>
        <p className=" flex items-center gap-2 text-sm">
          Category:
          <span className="font-medium">{category}</span>
        </p>
        <p className=" flex items-center gap-2 font-medium text-sm">
          {new Date(date).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
      </div>
      <Separator className="my-4" />
      <div className="pb-6 text-left text-sm text-gray-500">{description}</div>
      <div className="flex justify-center">
        <button
          onClick={handleBooking}
          className="bg-purple-600 flex items-center gap-1 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300"
          disabled={loadingBooking}
        >
          {loadingBooking && (
            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
          Book Now
        </button>
      </div>
    </div>
  );
};

export default EventDetail;
