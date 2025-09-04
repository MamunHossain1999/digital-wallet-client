/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";
import { toast } from "react-toastify";

// Fix default marker icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast("Thank you! We received your message.");
    setFormData({ name: "", email: "", message: "" });
  };

  const position: [number, number] = [23.8103, 90.4125]; // Dhaka

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="bg-indigo-600 text-white py-20 px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          We'd love to hear from you. Reach out with any questions or feedback!
        </p>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 px-8 md:px-4 container mx-auto grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white p-8 shadow-lg rounded-xl">
          <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600 resize-none"
              rows={5}
              required
            />
            <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-full px-6 py-2">
              Send Message
            </Button>
          </form>
        </div>

        {/* Contact Info & Map */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <MapPin className="w-6 h-6 text-indigo-600" />
            <p>123 WalletX Street, Dhaka, Bangladesh</p>
          </div>
          <div className="flex items-center gap-4">
            <Phone className="w-6 h-6 text-indigo-600" />
            <p>+88 01795920956</p>
          </div>
          <div className="flex items-center gap-4">
            <Mail className="w-6 h-6 text-indigo-600" />
            <p>developermamun1999@gmail.com</p>
          </div>

          {/* Map */}
          <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={false}
            className="w-full h-74 rounded-lg shadow-md"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            <Marker position={position}>
              <Popup>WalletX Headquarters</Popup>
            </Marker>
          </MapContainer>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
