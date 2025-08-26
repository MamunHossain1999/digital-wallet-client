import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Wallet, CreditCard, Lock, Smartphone } from "lucide-react";
import moneyTransfer from "@/assets/moneyTransfer.png";
import bannerIng from "@/assets/bannerImg.jpg";
import security from "@/assets/security.png";

const HomePage: React.FC = () => {
  return (
    <div className="w-full mx-auto min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 text-gray-900">
      <div>
        <section className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white overflow-hidden">
          <div className="container mx-auto px-6 py-24 flex flex-col md:flex-row items-center gap-10">
            {/* Left Content */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex-1 text-center md:text-left"
            >
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
                Manage Your Wallet <br /> Smarter & Faster
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-8">
                Securely store, send, and receive your digital money with ease.
                Your all-in-one wallet solution.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
                <Button className="bg-white text-indigo-600 font-semibold rounded-2xl px-6 py-3 shadow-lg hover:bg-gray-100 transition">
                  Get Started
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white rounded-2xl px-6 py-3 hover:bg-white hover:text-indigo-600 transition"
                >
                  Learn More
                </Button>
              </div>
            </motion.div>

            {/* Right Content (Image/Illustration) */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex-1 flex justify-center md:justify-end"
            >
              <img
                src={bannerIng}
                alt="Wallet Illustration"
                className="w-80 md:w-[400px] drop-shadow-2xl"
              />
            </motion.div>
          </div>
        </section>
      </div>
      {/* Hero Section */}
      <div className="container mx-auto">
        <section className="grid md:grid-cols-2 items-center px-4 lg:px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
              The Future of{" "}
              <span className="text-indigo-600">Digital Wallet</span>
            </h2>
            <p className="text-lg text-gray-600">
              Manage your money effortlessly with WalletX. Secure, fast, and
              built for modern life.
            </p>
            <div className="flex gap-4">
              <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-full px-6 py-2">
                Download App
              </Button>
              <Button variant="outline" className="rounded-full px-6 py-2">
                Learn More
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="flex justify-center md:justify-end mt-10 md:mt-0"
          >
            <img
              src={moneyTransfer}
              alt="Wallet Illustration"
              className="w-[300px] md:w-[400px]"
            />
          </motion.div>
        </section>
      </div>

      {/* Features */}
      <div className="container mx-auto">
        <section id="features" className="px-8 lg:px-6 py-20 bg-gray-50">
          <h3 className="text-3xl font-bold text-center mb-12">
            Why Choose WalletX?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Wallet className="w-10 h-10 text-indigo-600" />,
                title: "Easy to Use",
                desc: "Simple interface designed for everyone.",
              },
              {
                icon: <CreditCard className="w-10 h-10 text-indigo-600" />,
                title: "Multiple Payment Options",
                desc: "Pay with cards, bank, or crypto seamlessly.",
              },
              {
                icon: <Lock className="w-10 h-10 text-indigo-600" />,
                title: "Bank-Level Security",
                desc: "Your transactions are safe and encrypted.",
              },
            ].map((item, idx) => (
              <Card key={idx} className="shadow-lg rounded-2xl border-0">
                <CardContent className="flex flex-col items-center text-center space-y-4 p-6">
                  {item.icon}
                  <h4 className="text-xl font-semibold">{item.title}</h4>
                  <p className="text-gray-600">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>

      {/* Security Section */}
      <section id="security" className="px-8 md:px-20 py-20">
        <div className="grid md:grid-cols-2 items-center gap-12">
          <img
            src={security}
            alt="Security"
            className="w-[300px] md:w-[400px] mx-auto"
          />
          <div className="space-y-6">
            <h3 className="text-3xl font-bold">Top-notch Security</h3>
            <p className="text-gray-600">
              We use advanced encryption and authentication methods to ensure
              your money and data are always safe.
            </p>
            <ul className="space-y-3 text-gray-700">
              <li>✔️ Biometric Authentication</li>
              <li>✔️ Real-time Fraud Detection</li>
              <li>✔️ 24/7 Monitoring</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        id="download"
        className="px-8 md:px-20 py-20 bg-indigo-600 text-white text-center"
      >
        <h3 className="text-3xl font-bold mb-6">
          Get Started with WalletX Today
        </h3>
        <p className="mb-8">
          Download now and experience the easiest way to manage your money.
        </p>
        <div className="flex gap-4 justify-center">
          <Button className="bg-white text-indigo-600 rounded-full px-6 py-2 hover:bg-gray-100">
            <Smartphone className="w-5 h-5 mr-2 inline" /> iOS
          </Button>
          <Button className="bg-white text-indigo-600 rounded-full px-6 py-2 hover:bg-gray-100">
            <Smartphone className="w-5 h-5 mr-2 inline" /> Android
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
