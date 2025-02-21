import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { useNavigate } from "react-router-dom";

export default function MyListings() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const annonces = useSelector((state) => state.annonces);
  const reservations = useSelector((state) => state.reservations);
  const currentUserEmail = localStorage.getItem("currentUserEmail");
  const [myReservations, setMyReservations] = useState([]);
  const switchUser = localStorage.getItem('switchLogin')

  console.log(switchUser)
  if (!switchUser) {
    navigate("/login");
  }
  useEffect(() => {
    const userAnnonces = annonces.filter(
      (annonce) => annonce.userEmail === currentUserEmail
    );
    const userReservations = reservations.filter((reservation) =>
      userAnnonces.some((annonce) => annonce.id === reservation.annonceId)
    );
    setMyReservations(userReservations);
  }, [annonces, reservations, currentUserEmail]);

  const handleApprove = (reservationId) => {
    dispatch({ type: "APPROVE_RESERVATION", payload: reservationId });
    Swal.fire({
      title: "Reservation Approved!",
      text: "The reservation has been successfully approved.",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  const handleDeny = (reservationId) => {
    dispatch({ type: "DENY_RESERVATION", payload: reservationId });
    Swal.fire({
      title: "Reservation Denied",
      text: "The reservation has been denied.",
      icon: "error",
      confirmButtonText: "OK",
    });
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          My Listings
        </h2>

        <Card className="shadow-lg rounded-xl bg-white dark:bg-black">
          <CardContent className="p-4 overflow-x-auto">
            {myReservations.length === 0 ? (
              <div className="text-center text-gray-500 dark:text-gray-400 py-6">
                No reservation requests for your listings.
              </div>
            ) : (
              <Table className="w-full border-collapse">
                <TableHeader>
                  <TableRow className="bg-gray-100 dark:bg-gray-800">
                    <TableHead className="p-4 text-left text-black dark:text-white">
                      Announcement Title
                    </TableHead>
                    <TableHead className="p-4 text-left text-black dark:text-white">
                      Reserved By
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
                  {myReservations.map((reservation) => {
                    const annonce = annonces.find(
                      (annonce) => annonce.id === reservation.annonceId
                    );
                    return (
                      <TableRow
                        key={reservation.id}
                        className="border-b dark:border-gray-700"
                      >
                        <TableCell className="p-4 text-gray-900 dark:text-gray-200">
                          {annonce ? annonce.title : "Announcement Not Found"}
                        </TableCell>
                        <TableCell className="p-4 text-gray-900 dark:text-gray-300">
                          {reservation.userEmail}
                        </TableCell>
                        <TableCell className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              reservation.status === "Pending"
                                ? "bg-yellow-200 text-yellow-900 dark:bg-yellow-800 dark:text-yellow-200"
                                : reservation.status === "Approved"
                                ? "bg-green-200 text-green-900 dark:bg-green-800 dark:text-green-200"
                                : "bg-red-200 text-red-900 dark:bg-red-800 dark:text-red-200"
                            }`}
                          >
                            {reservation.status}
                          </span>
                        </TableCell>
                        <TableCell className="p-4">
                          {reservation.status === "Pending" && (
                            <>
                              <Button
                                onClick={() => handleApprove(reservation.id)}
                                className="mr-2 bg-green-500 hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-800"
                              >
                                Approve
                              </Button>
                              <Button
                                onClick={() => handleDeny(reservation.id)}
                                variant="destructive"
                                className="bg-red-500 hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800"
                              >
                                Deny
                              </Button>
                            </>
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
