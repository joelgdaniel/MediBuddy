import { SignInButton } from '@clerk/nextjs';
import { Button } from "@/components/ui/button";
import { ArrowRight, Scale, Shield, BookOpen, Clock } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <header className="w-full max-w-7xl mx-auto flex justify-between items-center py-6 px-6">
        <h1 className="text-2xl md:text-3xl font-bold text-[#D90013]">LegalAssist AI</h1>
        <div className="flex items-center gap-4">
          <SignInButton>
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              Sign In
            </Button>
          </SignInButton>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Your AI-Powered<br />
              Legal Assistant
            </h2>
            <p className="text-lg text-gray-600 max-w-xl">
              Upload legal documents, get instant analysis, and receive expert guidance. Making legal understanding accessible and efficient.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <SignInButton>
                <Button className="bg-[#D90013] hover:bg-[#B80011] text-white px-8 py-6 rounded-xl flex items-center gap-2">
                  Get Started <ArrowRight className="w-5 h-5" />
                </Button>
              </SignInButton>
              <Button variant="outline" className="px-8 py-6 rounded-xl">
                Learn More
              </Button>
            </div>
          </div>
          <div className="hidden md:block relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#D90013]/10 to-transparent rounded-3xl" />
            <div className="bg-white p-8 rounded-3xl shadow-xl">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">Document Analysis</h3>
                <div className="space-y-4">
                  <div className="h-3 bg-gray-200 rounded-full w-3/4" />
                  <div className="h-3 bg-gray-200 rounded-full w-1/2" />
                  <div className="h-3 bg-gray-200 rounded-full w-5/6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-16">Why Choose LegalAssist AI?</h3>
          <div className="grid md:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Scale className="w-8 h-8 text-[#D90013]" />}
              title="Smart Analysis"
              description="Advanced AI analysis of legal documents with key insights extraction"
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8 text-[#D90013]" />}
              title="Secure & Private"
              description="Your documents are handled with enterprise-grade security"
            />
            <FeatureCard
              icon={<BookOpen className="w-8 h-8 text-[#D90013]" />}
              title="Legal Context"
              description="Access to comprehensive legal knowledge base"
            />
            <FeatureCard
              icon={<Clock className="w-8 h-8 text-[#D90013]" />}
              title="Time Saving"
              description="Get instant analysis and recommendations"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600">&copy; 2024 LegalAssist AI. All rights reserved.</p>
            <div className="flex gap-6 text-gray-600">
              <a href="#" className="hover:text-gray-900">Privacy Policy</a>
              <a href="#" className="hover:text-gray-900">Terms of Service</a>
              <a href="#" className="hover:text-gray-900">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
    <div className="mb-4">{icon}</div>
    <h4 className="text-lg font-semibold mb-2">{title}</h4>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

export default LandingPage;
