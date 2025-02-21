import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "./Header";
import Map from "./Map";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Swal from "sweetalert2";
import { reserveAnnonce } from "@/config/actions";

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const annonces = useSelector((state) => state.annonces);
  const currentUserEmail = localStorage.getItem("currentUserEmail");

  const [searchText, setSearchText] = useState("");
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showMyAnnonces, setShowMyAnnonces] = useState(false);
  const announcementsPerPage = 8;
  const switchUser = localStorage.getItem('switchLogin')

  console.log(switchUser)
  if (!switchUser) {
    navigate("/login");
  };

  // if (!switchLogin) {
  //   return <div>Loading...</div>; 
  // }

  useEffect(() => {
    let filteredData = annonces.filter((announcement) =>
      showMyAnnonces
        ? announcement.userEmail === currentUserEmail
        : announcement.userEmail !== currentUserEmail
    );

    if (searchText) {
      filteredData = filteredData.filter(
        (announcement) =>
          (announcement.price <= parseInt(searchText) &&
            !isNaN(parseInt(searchText))) ||
          announcement.date.includes(searchText)
      );
    }

    setFilteredAnnouncements(filteredData);
  }, [annonces, currentUserEmail, showMyAnnonces, searchText]);

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const indexOfLastAnnouncement = currentPage * announcementsPerPage;
  const indexOfFirstAnnouncement = indexOfLastAnnouncement - announcementsPerPage;
  const currentAnnouncements = filteredAnnouncements.slice(indexOfFirstAnnouncement, indexOfLastAnnouncement);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleReserve = (announcement) => {
    if (!currentUserEmail) {
      console.error("User email not found");
      return;
    }

    if (announcement.userEmail === currentUserEmail) {
      Swal.fire({
        title: "Error",
        text: "You cannot reserve your own listing.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    dispatch(reserveAnnonce(announcement.id,announcement.price, currentUserEmail));

    Swal.fire({
      title: "Reservation Request Sent!",
      text: "The owner will review your request.",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  return (
    <>
      <Header />
      <div className="relative">
        <div className="h-[50vh]">
          <Map announcements={filteredAnnouncements} />
        </div>

        <div className="p-4 bg-white mx-auto max-w-4xl flex flex-col md:flex-row items-center gap-4 md:gap-2">
  <Input
    type="text"
    value={searchText}
    onChange={(e) => setSearchText(e.target.value)}
    placeholder="Search by date or price"
    className="w-full md:w-[50%] p-2 border rounded-md"
  />
  <Button className="w-full md:w-auto" onClick={handleSearch}>Search</Button>

  <div className="flex items-center gap-2 w-full md:w-auto">
    <Label htmlFor="toggle" className="whitespace-nowrap">
      {showMyAnnonces ? "My Announcements" : "Others' Announcements"}
    </Label>
    <Switch
      id="toggle"
      checked={showMyAnnonces}
      onCheckedChange={setShowMyAnnonces}
    />
  </div>
</div>

      </div>

      <div className="p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mx-auto max-w-6xl justify-items-center">
        {currentAnnouncements.length > 0 ? (
          currentAnnouncements.map((announcement) => (
            <div
            key={announcement.id}
            className="relative flex flex-col bg-white shadow-md rounded-lg overflow-hidden w-[250px]"
          >
            <Badge
              className={`absolute top-2 right-2 px-2 py-1 text-white rounded-full ${
                announcement.availability === "Available"
                  ? "bg-green-500"
                  : announcement.availability === "Pending"
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
            >
              {announcement.availability}
            </Badge>
            <img 
              src={announcement.imgSrc}
              alt="Announcement"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">
                {announcement.title}
              </h3>
              <h4 className="text-xl">
                {announcement.price} DH
              </h4>
              <Button
                className={`mt-4 ${
                  announcement.availability === "Pending" ||
                  announcement.availability === "Reserved" ||
                  announcement.userEmail === currentUserEmail
                    ? "bg-gray-500 cursor-not-allowed"
                    : ""
                }`}
                onClick={() => handleReserve(announcement)}
                disabled={
                  announcement.availability === "Pending" ||
                  announcement.availability === "Reserved" ||
                  announcement.userEmail === currentUserEmail
                }
              >
                {announcement.availability === "Pending"
                  ? "Pending"
                  : announcement.availability === "Reserved"
                  ? "Reserved"
                  : "Reserve"}
              </Button>
            </div>
          </div>
          
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 text-lg">
            No announcements found.
          </div>
        )}
      </div>

      <div className="flex justify-center mt-4 mb-4">
        <Button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="mx-1"
        >
          &lt;
        </Button>
        {Array.from(
          {
            length: Math.ceil(
              filteredAnnouncements.length / announcementsPerPage
            ),
          },
          (_, index) => (
            <Button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className="mx-1"
            >
              {index + 1}
            </Button>
          )
        )}
        <Button
          onClick={() => paginate(currentPage + 1)}
          disabled={
            currentPage ===
            Math.ceil(filteredAnnouncements.length / announcementsPerPage)
          }
          className="mx-1"
        >
          &gt;
        </Button>
      </div>
    </>
  );
}
