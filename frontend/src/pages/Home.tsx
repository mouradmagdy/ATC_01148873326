import HomeSkeleton from "@/components/HomeSkeleton";
import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/AuthContext";
import { useCreateBooking } from "@/hooks/bookings/useCreateBooking";
import { useGetUserBookings } from "@/hooks/bookings/useGetUserBookings";
import { useGetAllEvents } from "@/hooks/events/useGetAllEvents";
import { CalendarDays, DollarSign, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async"; // Install: npm install react-helmet-async
interface Event {
  name: string;
  date: string;
  venue: string;
  price: number;
  category: string;
  _id: string;
  updatedAt: string;
  createdAt: string;
  createdBy: string;
  image: string;
}

const Home = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isPending } = useGetAllEvents(pageNumber, pageSize);
  // const { isPending, data } = useGetAllEvents();
  const { authUser } = useAuthContext();
  const { isPending: loadingBooking, mutate: createBooking } =
    useCreateBooking();
  const navigate = useNavigate();
  const { isPending: loadingUserBookings, data: userBookings } =
    useGetUserBookings(authUser?._id ?? "");

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = "https://res.cloudinary.com";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  if (isPending) {
    return <HomeSkeleton />;
  }

  const totalPages = data?.totalEvents;
  const totalPagesCount = Math.ceil(totalPages / pageSize);

  const handleNextPage = () => {
    if (pageNumber < (totalPagesCount || 1)) {
      setPageNumber((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber((prev) => prev - 1);
    }
  };

  const resetPageNumber = () => {
    setPageNumber(1);
  };

  const handleBooking = async (eventId: string) => {
    if (!authUser) {
      toast("Please login to book an event");
      navigate("/login");
      return;
    }

    const bookingData = {
      eventId: eventId,
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
  const isEventBooked = (eventId: string) => {
    if (!userBookings || !userBookings.bookings) {
      return false;
    }

    return userBookings.bookings.some(
      (booking) => booking.event?._id === eventId
    );
  };
  const isEventPast = (eventDate: string) => {
    const currentDate = new Date();
    const eventDateObj = new Date(eventDate);
    return eventDateObj < currentDate;
  };

  // for each event, count the number of bookings of user to display it next to the button in the card event
  const eventBookingsCount = (eventId: string) => {
    if (!userBookings || !userBookings.bookings) {
      return 0;
    }
    // console.log("userBookings", userBookings.bookings[0]?.event._id);
    return userBookings.bookings.filter(
      (booking) => booking?.event?._id === eventId
    ).length;
  };

  return (
    <div className="mx-auto ">
      <h1 className="text-3xl font-medium text-left">Events</h1>

      <div className="grid grid-cols-2 rounded-lg my-10 ">
        {data.events.map((event: Event, index: number) => (
          <div
            key={index}
            className={`group rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col  border  m-2 ${
              isEventPast(event.date) && "opacity-50"
            }`}
          >
            <div className="relative h-52 overflow-hidden">
              <img
                src={event.image}
                alt="Category 1"
                className=" mb-4 w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
            <div className="p-3">
              <h2 className=" text-xl font-medium text-left mb-1 p-2">
                {event.name}
              </h2>
              <div className="flex flex-col gap-2 p-2 ">
                <div className="flex items-center justify-between">
                  <p className="text-gray-600 flex items-center gap-2 text-sm">
                    <CalendarDays className="h-4 w-4  text-purple-600" />
                    Date:{" "}
                    {new Date(event.date).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                  <div className="text-white bg-purple-700 mr-2 flex items-center  rounded-full px-6 py-1 text-sm">
                    {event.category}{" "}
                  </div>
                </div>
                <p className="text-gray-600 flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4  text-purple-600" />
                  {event.venue}
                </p>
                <p className="text-gray-600 flex items-center gap-2 text-sm">
                  <DollarSign className="h-4 w-4 text-purple-600" />
                  <span className="font-medium">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(event.price)}
                  </span>
                </p>
              </div>
              <div className="flex items-center justify-between w-full p-4">
                <Link
                  to={`/events/${event._id}`}
                  className="text-base text-purple-600 hover:text-purple-800"
                >
                  View Details
                </Link>
                <div className="text-gray-600 text-sm">
                  {isEventBooked(event._id) && (
                    <span className="text-gray-500">
                      x{eventBookingsCount(event._id)} Bookings
                    </span>
                  )}
                </div>
                <Button
                  onClick={() => handleBooking(event._id)}
                  className="px-5"
                  disabled={loadingBooking || isEventPast(event.date)}
                >
                  {loadingBooking && (
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  )}

                  {isEventPast(event.date)
                    ? "Event has passed"
                    : isEventBooked(event._id)
                    ? "Booked"
                    : "Book Now"}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* {pagination && ( */}
      <Pagination
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
        totalPages={totalPagesCount}
        currentPage={pageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
        resetPageNumber={resetPageNumber}
      />
    </div>
  );
};

export default Home;
