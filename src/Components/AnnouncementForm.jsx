import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAnnonce } from '@/config/actions';
import Map from './Map';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Header from './Header'; // Import the Header component

export default function AnnouncementForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [availability, setAvailability] = useState('Available');
  const [imgSrc, setImgSrc] = useState('');
  const [location, setLocation] = useState({ lat: 31.7917, lng: -7.0926 });
  const [priceError, setPriceError] = useState('');
  const userEmail = localStorage.getItem('currentUserEmail');

  const switchUser = localStorage.getItem('switchLogin')

  console.log(switchUser)
  if (!switchUser) {
    navigate("/login");
  }

   useEffect(() => {
    if (!switchUser) {
      navigate("/login");
    }
  }, [switchUser]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!price || isNaN(price) || parseFloat(price) <= 0) {
      setPriceError('Please enter a valid positive price.');
      return;
    } else {
      setPriceError('');
    }

    const newAnnonce = {
      id: Date.now(),
      title,
      description,
      price: parseFloat(price),
      availability,
      imgSrc,
      date: new Date().toISOString().split('T')[0],
      lat: location.lat,
      lng: location.lng,
      userEmail: userEmail,
    };

    dispatch(addAnnonce(newAnnonce));

    setTitle('');
    setDescription('');
    setPrice('');
    setAvailability('Available');
    setImgSrc('');
    setLocation({ lat: 31.7917, lng: -7.0926 });

    Swal.fire({
      title: 'Success!',
      text: 'Your announcement has been created.',
      icon: 'success',
      confirmButtonText: 'OK',
    });

    navigate('/dashboard');
  };

  const handleMapClick = (e) => {
    setLocation({ lat: e.lat, lng: e.lng });
  };

  return (
    <>
      <Header /> {/* Add the Header component */}
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Announcement</h2>
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter announcement title"
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter announcement description"
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <Input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {priceError && <span className="text-red-500 text-sm">{priceError}</span>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Availability</label>
            <Select value={availability} onValueChange={setAvailability}>
              <SelectTrigger className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <SelectValue placeholder="Select availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="Unavailable">Unavailable</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Upload Image</label>
            <Input
              type="file"
              onChange={handleImageUpload}
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {imgSrc && (
              <img
                src={imgSrc}
                alt="Preview"
                className="w-32 h-32 object-cover mt-2 rounded-md shadow-sm"
              />
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Select Location</label>
            <div className="h-[50vh] rounded-md overflow-hidden shadow-sm">
              <Map onClick={handleMapClick} />
            </div>
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            Create Announcement
          </Button>
        </form>
      </div>
    </>
  );
}