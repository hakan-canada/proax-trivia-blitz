
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Question, AppConfig } from '@/types/trivia';
import { ArrowLeft, Plus, Trash2, Save, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AdminPanelProps {
  questions: Question[];
  config: AppConfig;
  onSaveQuestions: (questions: Question[]) => void;
  onSaveConfig: (config: AppConfig) => void;
  onBack: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  questions,
  config,
  onSaveQuestions,
  onSaveConfig,
  onBack
}) => {
  const [editingQuestions, setEditingQuestions] = useState<Question[]>(questions);
  const [editingConfig, setEditingConfig] = useState<AppConfig>(config);
  const { toast } = useToast();

  const handleSave = () => {
    onSaveQuestions(editingQuestions);
    onSaveConfig(editingConfig);
    toast({
      title: "Settings saved",
      description: "All changes have been saved successfully.",
    });
  };

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      questionText: '',
      questionType: 'multiple',
      options: ['', '', '', ''],
      correctAnswer: '',
      points: 10,
      imageSlideBefore: ''
    };
    setEditingQuestions([...editingQuestions, newQuestion]);
  };

  const updateQuestion = (index: number, updates: Partial<Question>) => {
    const updated = [...editingQuestions];
    updated[index] = { ...updated[index], ...updates };
    setEditingQuestions(updated);
  };

  const deleteQuestion = (index: number) => {
    setEditingQuestions(editingQuestions.filter((_, i) => i !== index));
  };

  const updateOption = (questionIndex: number, optionIndex: number, value: string) => {
    const updated = [...editingQuestions];
    if (updated[questionIndex].options) {
      updated[questionIndex].options![optionIndex] = value;
      setEditingQuestions(updated);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-proax-bg to-white p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={onBack}
            variant="ghost"
            className="text-proax-primary hover:text-proax-blue"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
          >
            <Save className="mr-2 h-4 w-4" />
            Save All Changes
          </Button>
        </div>

        <Card className="p-6 md:p-8 shadow-2xl mb-6">
          <div className="flex items-center mb-6">
            <Settings className="mr-3 h-6 w-6 text-proax-primary" />
            <h1 className="text-3xl font-bold text-proax-navy">Admin Panel</h1>
          </div>

          {/* App Configuration */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-proax-navy mb-4">App Configuration</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bonusPoints">Proax.ca Account Bonus Points</Label>
                <Input
                  id="bonusPoints"
                  type="number"
                  value={editingConfig.bonusPoints}
                  onChange={(e) => setEditingConfig({ ...editingConfig, bonusPoints: parseInt(e.target.value) || 0 })}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Questions Management */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-proax-navy">Questions</h2>
              <Button onClick={addQuestion} size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Question
              </Button>
            </div>

            <div className="space-y-6">
              {editingQuestions.map((question, index) => (
                <Card key={question.id} className="p-4 border-l-4 border-proax-primary">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Question {index + 1}</h3>
                    <Button
                      onClick={() => deleteQuestion(index)}
                      variant="destructive"
                      size="sm"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label>Question Text</Label>
                      <Textarea
                        value={question.questionText}
                        onChange={(e) => updateQuestion(index, { questionText: e.target.value })}
                        className="mt-1"
                        rows={2}
                      />
                    </div>

                    <div>
                      <Label>Question Type</Label>
                      <Select
                        value={question.questionType}
                        onValueChange={(value: 'yesno' | 'multiple') => 
                          updateQuestion(index, { 
                            questionType: value,
                            options: value === 'yesno' ? undefined : ['', '', '', '']
                          })
                        }
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yesno">Yes/No</SelectItem>
                          <SelectItem value="multiple">Multiple Choice</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Points</Label>
                      <Input
                        type="number"
                        value={question.points}
                        onChange={(e) => updateQuestion(index, { points: parseInt(e.target.value) || 0 })}
                        className="mt-1"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label>Educational Slide Image URL (optional)</Label>
                      <Input
                        value={question.imageSlideBefore || ''}
                        onChange={(e) => updateQuestion(index, { imageSlideBefore: e.target.value })}
                        className="mt-1"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>

                    {question.questionType === 'multiple' && (
                      <div className="md:col-span-2">
                        <Label>Answer Options</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
                          {question.options?.map((option, optionIndex) => (
                            <Input
                              key={optionIndex}
                              value={option}
                              onChange={(e) => updateOption(index, optionIndex, e.target.value)}
                              placeholder={`Option ${optionIndex + 1}`}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="md:col-span-2">
                      <Label>Correct Answer</Label>
                      {question.questionType === 'yesno' ? (
                        <Select
                          value={question.correctAnswer}
                          onValueChange={(value) => updateQuestion(index, { correctAnswer: value })}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Yes">Yes</SelectItem>
                            <SelectItem value="No">No</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <Select
                          value={question.correctAnswer}
                          onValueChange={(value) => updateQuestion(index, { correctAnswer: value })}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select correct answer" />
                          </SelectTrigger>
                          <SelectContent>
                            {question.options?.map((option, optionIndex) => (
                              option && (
                                <SelectItem key={optionIndex} value={option}>
                                  {option}
                                </SelectItem>
                              )
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
