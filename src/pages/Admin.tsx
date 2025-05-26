
import React, { useState, useEffect } from 'react';
import { AdminPanel } from '@/components/AdminPanel';
import { Question, AppConfig } from '@/types/trivia';
import { getQuestions, setQuestions, getConfig, setConfig } from '@/utils/storage';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Admin = () => {
  const [questions, setQuestionsState] = useState<Question[]>([]);
  const [config, setConfigState] = useState<AppConfig>({ bonusPoints: 25 });
  const { toast } = useToast();

  useEffect(() => {
    setQuestionsState(getQuestions());
    setConfigState(getConfig());
  }, []);

  const handleSaveQuestions = (newQuestions: Question[]) => {
    setQuestions(newQuestions);
    setQuestionsState(newQuestions);
    toast({
      title: "Questions Updated",
      description: "Questions have been saved successfully.",
    });
  };

  const handleSaveConfig = (newConfig: AppConfig) => {
    setConfig(newConfig);
    setConfigState(newConfig);
    toast({
      title: "Configuration Updated", 
      description: "Configuration has been saved successfully.",
    });
  };

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
      
      <AdminPanel
        questions={questions}
        config={config}
        onSaveQuestions={handleSaveQuestions}
        onSaveConfig={handleSaveConfig}
        onBack={() => window.history.back()}
      />
    </div>
  );
};

export default Admin;
