import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Shield, Globe } from 'lucide-react';
import coFunder from "@/assets/about/ceo.jpg"
import sto from "@/assets/about/cto.jpg"
import manager from "@/assets/about/projectManager.jpg"
const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero */}
      <section className="bg-indigo-600 text-white py-20 px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About WalletX</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          WalletX is your secure and fast digital wallet solution. We help you manage your money effortlessly with the highest standards of security.
        </p>
      </section>

      {/* Features */}
      <section className="py-20 px-8 md:px-20">
        <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Users className="w-10 h-10 text-indigo-600" />, 
              title: 'User Friendly',
              desc: 'Designed for simplicity, anyone can use WalletX easily.'
            },
            {
              icon: <Shield className="w-10 h-10 text-indigo-600" />, 
              title: 'Secure',
              desc: 'Your money and data are protected with top-level encryption.'
            },
            {
              icon: <Globe className="w-10 h-10 text-indigo-600" />, 
              title: 'Global Access',
              desc: 'Access your wallet anytime, anywhere in the world.'
            }
          ].map((item, idx) => (
            <Card key={idx} className="shadow-lg rounded-2xl border-0">
              <CardContent className="flex flex-col items-center text-center space-y-4 p-6">
                {item.icon}
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-8 md:px-20 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-12">Meet the Team</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="space-y-4">
            <img src={coFunder} alt="Team Member" className="w-32 h-32 mx-auto rounded-full" />
            <h3 className="text-xl font-semibold">Alice Johnson</h3>
            <p className="text-gray-600">CEO & Founder</p>
          </div>
          <div className="space-y-4">
            <img src={sto} alt="Team Member" className="w-32 h-32 mx-auto rounded-full" />
            <h3 className="text-xl font-semibold">Bob Smith</h3>
            <p className="text-gray-600">CTO</p>
          </div>
          <div className="space-y-4">
            <img src={manager} alt="Team Member" className="w-32 h-32 mx-auto rounded-full" />
            <h3 className="text-xl font-semibold">Carol White</h3>
            <p className="text-gray-600">Product Manager</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;