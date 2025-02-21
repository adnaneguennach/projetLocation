import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import Header from "./Header";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function MyRequests() {
  const navigate = useNavigate()
  const annonces = useSelector((state) => state.annonces);
  const reservations = useSelector((state) => state.reservations);
  const currentUserEmail = localStorage.getItem("currentUserEmail");
  const [myRequests, setMyRequests] = useState([]);
  const dispatch = useDispatch()
  const switchUser = localStorage.getItem('switchLogin')

  console.log(switchUser)
  if (!switchUser) {
    navigate("/login");
  }
  useEffect(() => {
    const userReservations = reservations.filter(
      (reservation) => reservation.userEmail === currentUserEmail
    );
    setMyRequests(userReservations);
  }, [reservations, currentUserEmail]);

  const handleCancel = (reservationId) => {
    console.log(reservationId)
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to cancel this reservation request ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: "CANCEL_RESERVATION", payload: {reservationId: reservationId.id, annonceId : reservationId.annonceId} });
        setMyRequests((prevRequests) =>
          prevRequests.filter((request) => request.id !== reservationId)
        );
        Swal.fire({
          title: "Cancelled!",
          text: "Your reservation request has been cancelled.",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    });
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          My Reservation Requests
        </h2>

        <Card className="shadow-lg rounded-xl bg-white dark:bg-black">
          <CardContent className="p-4 overflow-x-auto">
            {myRequests.length === 0 ? (
              <div className="text-center text-gray-500 dark:text-gray-400 py-6">
                No reservation requests found.
              </div>
            ) : (
              <Table className="w-full border-collapse">
                <TableHeader>
                  <TableRow className="bg-gray-100 dark:bg-gray-800">
                    <TableHead className="p-4 text-left text-black dark:text-white">
                      Announcement Title
                    </TableHead>
                    <TableHead className="p-4 text-left text-black dark:text-white">
                      Status
                    </TableHead>
                    <TableHead className="p-4 text-left text-black dark:text-white">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {myRequests.map((request) => {
                    const annonce = annonces.find(
                      (annonce) => annonce.id === request.annonceId
                    );
                    return (
                      <TableRow key={request.id} className="border-b dark:border-gray-700">
                        <TableCell className="p-4 text-gray-900 dark:text-gray-200">
                          {annonce ? annonce.title : "Announcement Not Found"}
                        </TableCell>
                        <TableCell className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              request.status === "Pending"
                                ? "bg-yellow-200 text-yellow-900 dark:bg-yellow-800 dark:text-yellow-200"
                                : request.status === "Approved"
                                ? "bg-green-200 text-green-900 dark:bg-green-800 dark:text-green-200"
                                : "bg-red-200 text-red-900 dark:bg-red-800 dark:text-red-200"
                            }`}
                          >
                            {request.status}
                          </span>
                        </TableCell>
                        <TableCell className="p-4">
                          {request.status === "Pending" && (
                            <Button
                              onClick={() => handleCancel(request)}
                              variant="destructive"
                            >
                              Cancel
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
