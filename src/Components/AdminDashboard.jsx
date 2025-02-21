import { useSelector, useDispatch } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUserEmail = localStorage.getItem("currentUserEmail");
  const users = useSelector((state) => state.users);
  const annonces = useSelector((state) => state.annonces);
  const res = useSelector((state) => state.reservations);

  const currentUser = users.find((user) => user.email === currentUserEmail);

  if (!currentUser || currentUser.type !== "root") {
    Swal.fire({
      icon: "error",
      title: "Access Denied",
      text: "You do not have permission to access this page.",
    }).then(() => navigate("/"));
    return null;
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: "DELETE_ANNONCE", payload: id });
        Swal.fire("Deleted!", "The annonce has been removed.", "success");
      }
    });
  };

  const totalMoney = res.filter(annonce => annonce.status === "Approved")
  .reduce((sum, annonce) => sum + annonce.price, 0);

  return (<>
      <Header />
    <div className="min-h-screen  bg-gray-50 p-6">
      <div className="max-w-4xl  mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-3 shadow-md rounded-lg text-center">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">Total Annonces</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-blue-600">{annonces.length}</p>
            </CardContent>
          </Card>

          <Card className="p-3 shadow-md rounded-lg text-center">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600">{users.length}</p>
            </CardContent>
          </Card>

          <Card className="p-3 shadow-md rounded-lg text-center">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-red-600">${totalMoney}</p>
            </CardContent>
          </Card>
        </div>

        <Card className="p-6 shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-800 text-center">
              Admin Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {annonces.length > 0 ? (
                annonces.map((annonce) => (
                  <Card key={annonce.id} className="p-4 flex items-center justify-between shadow-md">
                    <div>
                      <h3 className="text-lg font-semibold">{annonce.title}</h3>
                      <p className="text-gray-600">{annonce.description}</p>
                      <p className="text-gray-500">Price: ${annonce.price}</p>
                    </div>
                    <Button
                      onClick={() => handleDelete(annonce.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-700"
                    >
                      Delete
                    </Button>
                  </Card>
                ))
              ) : (
                <p className="text-gray-600 text-center">No annonces available.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div></>
  );
}
