import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ArrowLeft, 
  FileText, 
  Sparkles, 
  Brain, 
  Copy, 
  Download, 
  RefreshCw,
  Lightbulb,
  Target,
  Star,
  Eye,
  CheckCircle,
  Wand2,
  Zap,
  MessageSquare
} from 'lucide-react';

interface CoverLetterGeneratorProps {
  onBack: () => void;
}

interface JobDetails {
  company: string;
  position: string;
  description: string;
  requirements: string;
  tone: 'professional' | 'casual' | 'enthusiastic' | 'formal';
  length: 'short' | 'medium' | 'long';
}

export function CoverLetterGenerator({ onBack }: CoverLetterGeneratorProps) {
  const [activeTab, setActiveTab] = useState('input');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [jobDetails, setJobDetails] = useState<JobDetails>({
    company: '',
    position: '',
    description: '',
    requirements: '',
    tone: 'professional',
    length: 'medium'
  });
  
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const generateCoverLetter = async () => {
    setIsGenerating(true);
    setGenerationProgress(0);
    setActiveTab('generation');
    
    // Simulate AI generation process
    const steps = [
      { progress: 20, text: 'Analyzing job requirements...' },
      { progress: 40, text: 'Matching your skills to requirements...' },
      { progress: 60, text: 'Crafting personalized content...' },
      { progress: 80, text: 'Optimizing tone and style...' },
      { progress: 100, text: 'Finalizing your cover letter...' }
    ];
    
    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setGenerationProgress(step.progress);
    }
    
    // Mock generated cover letter
    const mockCoverLetter = `Dear Hiring Manager,

I am writing to express my strong interest in the ${jobDetails.position} position at ${jobDetails.company}. With my background in software development and passion for innovative technology solutions, I am excited about the opportunity to contribute to your team's success.

In my previous roles, I have developed expertise in full-stack development, working with modern frameworks and technologies that directly align with your requirements. My experience includes:

• Building scalable web applications using React, Node.js, and cloud technologies
• Collaborating with cross-functional teams to deliver high-quality software solutions
• Implementing best practices for code quality, testing, and deployment

What particularly excites me about ${jobDetails.company} is your commitment to innovation and the opportunity to work on cutting-edge projects that make a real impact. I am eager to bring my technical skills and collaborative mindset to help drive your team's objectives forward.

I would welcome the opportunity to discuss how my experience and enthusiasm can contribute to ${jobDetails.company}'s continued success. Thank you for considering my application.

Best regards,
[Your Name]`;

    setGeneratedCoverLetter(mockCoverLetter);
    
    // Mock AI suggestions
    setSuggestions([
      'Consider adding specific metrics from your previous achievements',
      'Mention a recent company achievement or news to show research',
      'Include keywords from the job posting for better ATS optimization',
      'Add a brief personal connection to the company mission'
    ]);
    
    setIsGenerating(false);
    setActiveTab('result');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCoverLetter);
  };

  const downloadCoverLetter = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedCoverLetter], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `cover-letter-${jobDetails.company}-${jobDetails.position}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const regenerateCoverLetter = () => {
    generateCoverLetter();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
      {/* Header */}
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-2">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">AI Cover Letter Generator</h1>
              <p className="text-sm text-muted-foreground">Create compelling cover letters tailored to each job</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="input" disabled={isGenerating}>
              <Target className="h-4 w-4 mr-2" />
              Job Details
            </TabsTrigger>
            <TabsTrigger value="generation" disabled={!isGenerating && generationProgress === 0}>
              <Sparkles className="h-4 w-4 mr-2" />
              AI Generation
            </TabsTrigger>
            <TabsTrigger value="result" disabled={!generatedCoverLetter}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Your Cover Letter
            </TabsTrigger>
          </TabsList>

          <TabsContent value="input" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-blue-600" />
                  Job Information
                </CardTitle>
                <CardDescription>
                  Provide details about the job you're applying for. Our AI will use this information to create a personalized cover letter.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input
                      id="company"
                      value={jobDetails.company}
                      onChange={(e) => setJobDetails(prev => ({ ...prev, company: e.target.value }))}
                      placeholder="Enter company name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Position Title</Label>
                    <Input
                      id="position"
                      value={jobDetails.position}
                      onChange={(e) => setJobDetails(prev => ({ ...prev, position: e.target.value }))}
                      placeholder="Enter position title"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Job Description</Label>
                  <Textarea
                    id="description"
                    value={jobDetails.description}
                    onChange={(e) => setJobDetails(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Paste the job description here..."
                    rows={6}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements">Key Requirements</Label>
                  <Textarea
                    id="requirements"
                    value={jobDetails.requirements}
                    onChange={(e) => setJobDetails(prev => ({ ...prev, requirements: e.target.value }))}
                    placeholder="List the key requirements and qualifications..."
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Writing Tone</Label>
                    <Select 
                      value={jobDetails.tone} 
                      onValueChange={(value: any) => setJobDetails(prev => ({ ...prev, tone: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                        <SelectItem value="formal">Formal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Letter Length</Label>
                    <Select 
                      value={jobDetails.length} 
                      onValueChange={(value: any) => setJobDetails(prev => ({ ...prev, length: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="short">Short (2-3 paragraphs)</SelectItem>
                        <SelectItem value="medium">Medium (3-4 paragraphs)</SelectItem>
                        <SelectItem value="long">Long (4-5 paragraphs)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button 
                  onClick={generateCoverLetter}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  disabled={!jobDetails.company || !jobDetails.position || !jobDetails.description}
                >
                  <Wand2 className="h-4 w-4 mr-2" />
                  Generate AI Cover Letter
                </Button>
              </CardContent>
            </Card>

            {/* AI Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-600" />
                  Pro Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-2">
                      <Target className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Be Specific</h4>
                      <p className="text-sm text-muted-foreground">Include specific requirements and keywords from the job posting</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-2">
                      <Zap className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Company Research</h4>
                      <p className="text-sm text-muted-foreground">Mention company values or recent achievements</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="generation" className="space-y-6">
            <Card>
              <CardContent className="p-8">
                <div className="text-center space-y-6">
                  <div className="flex justify-center">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-4">
                      <Brain className="h-12 w-12 text-white animate-pulse" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">AI is crafting your cover letter</h3>
                    <p className="text-muted-foreground">
                      Our advanced AI is analyzing the job requirements and creating a personalized cover letter for you.
                    </p>
                  </div>
                  <div className="max-w-md mx-auto">
                    <Progress value={generationProgress} className="h-3" />
                    <p className="text-sm text-muted-foreground mt-2">{generationProgress}% complete</p>
                  </div>
                  {generationProgress > 0 && (
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Sparkles className="h-4 w-4" />
                      {generationProgress <= 20 && 'Analyzing job requirements...'}
                      {generationProgress > 20 && generationProgress <= 40 && 'Matching your skills to requirements...'}
                      {generationProgress > 40 && generationProgress <= 60 && 'Crafting personalized content...'}
                      {generationProgress > 60 && generationProgress <= 80 && 'Optimizing tone and style...'}
                      {generationProgress > 80 && 'Finalizing your cover letter...'}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="result" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-yellow-600" />
                        Your AI-Generated Cover Letter
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={copyToClipboard}>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy
                        </Button>
                        <Button variant="outline" size="sm" onClick={downloadCoverLetter}>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm" onClick={regenerateCoverLetter}>
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Regenerate
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/50 rounded-lg p-6">
                      <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                        {generatedCoverLetter}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                {/* AI Suggestions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-blue-600" />
                      AI Suggestions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {suggestions.map((suggestion, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-1">
                            <Lightbulb className="h-3 w-3 text-blue-600" />
                          </div>
                          <p className="text-sm">{suggestion}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Cover Letter Analysis */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5 text-green-600" />
                      Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">ATS Compatibility</span>
                        <Badge variant="default" className="bg-green-600">Excellent</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Keyword Match</span>
                        <Badge variant="default" className="bg-blue-600">95%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Readability</span>
                        <Badge variant="default" className="bg-purple-600">High</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Professional Tone</span>
                        <Badge variant="default" className="bg-orange-600">Strong</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}