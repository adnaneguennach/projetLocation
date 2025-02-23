import { useState } from "react";
import Swal from "sweetalert2"; 
import { useDispatch, useSelector } from "react-redux"; 
import { signUpUser } from "@/config/actions"; 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import imglog from '../assets/login.jpg'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const switchLogin = useSelector((state) => state.switchLogin);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.email || !formData.password) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Both fields are required.",
      });
      setLoading(false);
      return;
    }

    const user = users.find(
      (user) => user.email === formData.email && user.password === formData.password
    );

    if (user) {
      localStorage.setItem('currentUserEmail', user.email);
      localStorage.setItem('switchLogin', true)
      dispatch({ type: 'switchLogin', payload: true });
      Swal.fire({
        icon: "success",
        title: "Welcome Back!",
        text: "Logged in successfully",
      }).then(() => {
        navigate('/dashboard');
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid email or password. Please try again.",
      });
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <div className="hidden md:flex w-1/2 bg-gray-100 items-center justify-center">
        <img
          src={imglog}
          alt="Login"
          className="object-cover w-full h-full rounded-lg shadow-md"
        />
      </div>

      <div className="flex w-full md:w-1/2 items-center justify-center p-6 bg-white rounded-lg shadow-lg">
        <Card className="w-full max-w-md p-8 shadow-xl rounded-lg">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-semibold text-gray-800">
              Welcome !
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
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
                {loading ? "Logging In..." : "Sign In"}
              </Button>
              <Button
                type="button"
                onClick={() => navigate('/signup')}
                className="w-full p-3 text-blue-600 bg-transparent border-2 border-blue-600 rounded-md shadow-md mt-4 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Sign Up
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
