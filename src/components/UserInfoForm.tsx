
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserInfo } from '@/types/trivia';
import { ArrowLeft, User, Building, Mail } from 'lucide-react';

interface UserInfoFormProps {
  onSubmit: (userInfo: UserInfo) => void;
  onBack: () => void;
}

export const UserInfoForm: React.FC<UserInfoFormProps> = ({ onSubmit, onBack }) => {
  const [formData, setFormData] = useState<UserInfo>({
    firstName: '',
    companyName: '',
    email: ''
  });

  const [errors, setErrors] = useState<Partial<UserInfo>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Partial<UserInfo> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: keyof UserInfo, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-proax-bg to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8 md:p-12 shadow-2xl animate-fade-in">
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-6 text-proax-primary hover:text-proax-blue"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-proax-navy mb-4">
            Welcome to the Challenge!
          </h1>
          <p className="text-lg text-gray-600">
            Please provide your information to get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-lg font-medium flex items-center">
              <User className="mr-2 h-5 w-5 text-proax-primary" />
              First Name *
            </Label>
            <Input
              id="firstName"
              type="text"
              value={formData.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              className={`h-14 text-lg ${errors.firstName ? 'border-red-500' : ''}`}
              placeholder="Enter your first name"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyName" className="text-lg font-medium flex items-center">
              <Building className="mr-2 h-5 w-5 text-proax-primary" />
              Company Name *
            </Label>
            <Input
              id="companyName"
              type="text"
              value={formData.companyName}
              onChange={(e) => handleChange('companyName', e.target.value)}
              className={`h-14 text-lg ${errors.companyName ? 'border-red-500' : ''}`}
              placeholder="Enter your company name"
            />
            {errors.companyName && (
              <p className="text-red-500 text-sm">{errors.companyName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-lg font-medium flex items-center">
              <Mail className="mr-2 h-5 w-5 text-proax-primary" />
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={`h-14 text-lg ${errors.email ? 'border-red-500' : ''}`}
              placeholder="Enter your email address"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full h-16 text-xl font-semibold bg-gradient-to-r from-proax-primary to-proax-blue hover:from-proax-blue hover:to-proax-primary transition-all duration-300"
          >
            Continue to Trivia
          </Button>
        </form>
      </Card>
    </div>
  );
};
