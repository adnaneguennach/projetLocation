import { useState } from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { signUpUser } from "@/config/actions.jsx"; 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.name || !formData.email || !formData.password) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "All fields are required.",
      });
      setLoading(false);
      return;
    }

    dispatch(signUpUser(formData));

    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Your account has been created successfully.",
    }).then(() => {
      setFormData({
        name: "",
        email: "",
        password: "",
      });
      navigate('/login')
    }); 

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <div className="hidden md:flex w-1/2 bg-gray-100 items-center justify-center">
        <img
          src="https://source.unsplash.com/800x600/?startup"
          alt="Sign Up"
          className="object-cover w-full h-full rounded-lg shadow-md"
        />
      </div>

      <div className="flex w-full md:w-1/2 items-center justify-center p-6 bg-white rounded-lg shadow-lg">
        <Card className="w-full max-w-md p-8 shadow-xl rounded-lg">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-semibold text-gray-800">
              Create an Account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-gray-600">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="mt-2 p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-gray-600">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="mt-2 p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-gray-600">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="mt-2 p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button
                type="submit"
                className="w-full p-3 text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                disabled={loading}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
