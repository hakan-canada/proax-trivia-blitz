
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Admin = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-proax-bg to-white">
      <div className="p-4">
        <Button asChild variant="ghost" className="mb-4">
          <Link to="/" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
      
      <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
        <Card className="w-full max-w-2xl p-8 text-center shadow-2xl">
          <h1 className="text-3xl font-bold text-proax-navy mb-4">
            Admin Panel Removed
          </h1>
          <p className="text-lg text-gray-600">
            The admin panel has been removed since questions are now hardcoded.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
