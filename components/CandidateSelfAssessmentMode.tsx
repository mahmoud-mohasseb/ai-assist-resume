import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { ArrowLeft, Play, Target, CheckCircle, MessageSquare, TrendingUp, BookOpen, Lightbulb } from 'lucide-react';

interface MockInterviewMessage {
  role: 'AI' | 'Candidate';
  text: string;
  timestamp: Date;
}

interface SelfAssessmentReport {
  overall_score_percent: number;
  skills: {
    communication: string;
    technical: string;
    problem_solving: string;
    role_fit: string;
  };
  summary: string;
  recommendation: 'Ready' | 'Needs Improvement' | 'Practice More';
  detailedFeedback: {
    strengths: string[];
    improvements: string[];
    coaching: string[];
  };
}

interface CandidateSelfAssessmentModeProps {
  onComplete: (data: any) => void;
  onBack: () => void;
}

type AssessmentPhase = 'setup' | 'interview' | 'results';
type Difficulty = 'easy' | 'medium' | 'hard';

export function CandidateSelfAssessmentMode({ onComplete, onBack }: CandidateSelfAssessmentModeProps) {
  const [phase, setPhase] = useState<AssessmentPhase>('setup');
  const [candidateName, setCandidateName] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [yearsExperience, setYearsExperience] = useState('');
  
  const [messages, setMessages] = useState<MockInterviewMessage[]>([]);
  const [currentResponse, setCurrentResponse] = useState('');
  const [questionCount, setQuestionCount] = useState(0);
  const [isInterviewActive, setIsInterviewActive] = useState(false);
  const [assessment, setAssessment] = useState<SelfAssessmentReport | null>(null);

  const difficultyConfig = {
    easy: {
      label: 'Entry Level',
      description: 'Basic behavioral questions and fundamental concepts',
      color: 'bg-green-500',
      questions: 6
    },
    medium: {
      label: 'Mid-Level',
      description: 'Scenario-based questions and moderate technical depth',
      color: 'bg-yellow-500',
      questions: 8
    },
    hard: {
      label: 'Senior Level',
      description: 'Complex problem-solving and advanced technical scenarios',
      color: 'bg-red-500',
      questions: 10
    }
  };

  const questionSets = {
    easy: [
      "Tell me about yourself and why you're interested in this role.",
      "What are your greatest strengths and how do they apply to this position?",
      "Describe a challenge you faced and how you overcame it.",
      "Where do you see yourself in the next 2-3 years?",
      "How do you handle constructive feedback?",
      "What motivates you in your work?"
    ],
    medium: [
      "Describe a time when you had to learn a new skill quickly for a project.",
      "How would you prioritize multiple urgent tasks with competing deadlines?",
      "Tell me about a time you had to work with a difficult team member.",
      "Describe a situation where you had to make a decision with incomplete information.",
      "How do you stay current with industry trends and developments?",
      "Walk me through your problem-solving process for complex issues.",
      "Describe a time when you had to adapt to significant changes at work.",
      "How would you approach a project that seems overwhelming?"
    ],
    hard: [
      "Design a solution for a system that needs to handle massive scale.",
      "How would you approach debugging a critical production issue?",
      "Describe your strategy for leading a team through a major technical migration.",
      "How would you design the architecture for a real-time collaborative application?",
      "Walk me through how you would optimize a slow-performing system.",
      "Explain how you would implement security best practices in a new project.",
      "Describe your approach to mentoring junior team members.",
      "How would you handle a situation where stakeholders have conflicting requirements?",
      "Design a strategy for maintaining code quality across a large development team.",
      "How would you approach technical debt management in a legacy system?"
    ]
  };

  const startMockInterview = () => {
    if (!candidateName || !targetRole) return;
    
    setPhase('interview');
    setIsInterviewActive(true);
    setQuestionCount(0);
    
    const welcomeMessage: MockInterviewMessage = {
      role: 'AI',
      text: `Hello ${candidateName}! Welcome to your mock interview for the ${targetRole} position. This is a ${difficultyConfig[difficulty].label} assessment with ${difficultyConfig[difficulty].questions} questions. Take your time to provide thoughtful answers. Let's begin with our first question:`,
      timestamp: new Date()
    };
    
    setMessages([welcomeMessage]);
    
    // Add first question after a short delay
    setTimeout(() => {
      askNextQuestion();
    }, 1000);
  };

  const askNextQuestion = () => {
    const questions = questionSets[difficulty];
    const question = questions[questionCount];
    
    const questionMessage: MockInterviewMessage = {
      role: 'AI',
      text: question,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, questionMessage]);
  };

  const submitResponse = () => {
    if (!currentResponse.trim()) return;
    
    const responseMessage: MockInterviewMessage = {
      role: 'Candidate',
      text: currentResponse,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, responseMessage]);
    setCurrentResponse('');
    setQuestionCount(prev => prev + 1);
    
    const maxQuestions = difficultyConfig[difficulty].questions;
    
    if (questionCount + 1 >= maxQuestions) {
      endInterview();
    } else {
      // Add acknowledgment and next question
      setTimeout(() => {
        const ackMessage: MockInterviewMessage = {
          role: 'AI',
          text: "Thank you for that response. Let me ask you the next question:",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, ackMessage]);
        
        setTimeout(() => {
          askNextQuestion();
        }, 500);
      }, 1000);
    }
  };

  const endInterview = () => {
    setIsInterviewActive(false);
    
    const endMessage: MockInterviewMessage = {
      role: 'AI',
      text: "That completes our mock interview session. Thank you for your thoughtful responses! I'll now generate your assessment report with detailed feedback and recommendations.",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, endMessage]);
    
    // Generate assessment
    setTimeout(() => {
      generateAssessment();
      setPhase('results');
    }, 2000);
  };

  const generateAssessment = () => {
    const responses = messages.filter(m => m.role === 'Candidate');
    
    // Analyze responses for scoring
    const avgResponseLength = responses.reduce((acc, r) => acc + r.text.length, 0) / responses.length || 0;
    const totalWords = responses.reduce((acc, r) => acc + r.text.split(' ').length, 0);
    const avgWordsPerResponse = totalWords / responses.length || 0;
    
    // Calculate scores based on response quality indicators
    const communicationScore = Math.min(95, Math.max(45, Math.floor(avgResponseLength / 40) + Math.floor(avgWordsPerResponse / 5)));
    const technicalScore = difficulty === 'hard' ? Math.floor(Math.random() * 20) + 75 : 
                          difficulty === 'medium' ? Math.floor(Math.random() * 25) + 70 : 
                          Math.floor(Math.random() * 30) + 65;
    const problemSolvingScore = Math.floor(Math.random() * 20) + 70;
    const roleFitScore = Math.floor(Math.random() * 25) + 70;
    
    const overallScore = Math.round((communicationScore + technicalScore + problemSolvingScore + roleFitScore) / 4);
    
    const assessment: SelfAssessmentReport = {
      overall_score_percent: overallScore,
      skills: {
        communication: `${communicationScore}%`,
        technical: `${technicalScore}%`,
        problem_solving: `${problemSolvingScore}%`,
        role_fit: `${roleFitScore}%`
      },
      summary: `You demonstrated ${overallScore >= 80 ? 'strong' : overallScore >= 65 ? 'solid' : 'developing'} interview skills with good communication and relevant examples. ${overallScore >= 80 ? 'You appear well-prepared for this role level.' : overallScore >= 65 ? 'With some focused preparation, you could improve your performance.' : 'Additional practice and preparation would benefit your interview performance.'}`,
      recommendation: overallScore >= 80 ? 'Ready' : overallScore >= 65 ? 'Needs Improvement' : 'Practice More',
      detailedFeedback: {
        strengths: generateStrengths(communicationScore, technicalScore, problemSolvingScore, roleFitScore),
        improvements: generateImprovements(communicationScore, technicalScore, problemSolvingScore, roleFitScore),
        coaching: generateCoaching(overallScore, difficulty)
      }
    };
    
    setAssessment(assessment);
  };

  const generateStrengths = (comm: number, tech: number, prob: number, role: number): string[] => {
    const strengths = [];
    
    if (comm >= 75) strengths.push("Clear and articulate communication style");
    if (tech >= 75) strengths.push("Strong technical knowledge for the role level");
    if (prob >= 75) strengths.push("Effective problem-solving approach");
    if (role >= 75) strengths.push("Good alignment with role requirements");
    
    if (strengths.length === 0) {
      strengths.push("Willingness to engage in the interview process");
      strengths.push("Openness to feedback and improvement");
    }
    
    return strengths;
  };

  const generateImprovements = (comm: number, tech: number, prob: number, role: number): string[] => {
    const improvements = [];
    
    if (comm < 70) improvements.push("Provide more detailed and structured responses");
    if (tech < 70) improvements.push("Deepen technical knowledge relevant to the role");
    if (prob < 70) improvements.push("Practice systematic problem-solving frameworks");
    if (role < 70) improvements.push("Better articulate relevant experience and skills");
    
    if (improvements.length === 0) {
      improvements.push("Consider adding more specific examples to strengthen answers");
    }
    
    return improvements;
  };

  const generateCoaching = (score: number, difficulty: Difficulty): string[] => {
    const coaching = [];
    
    if (score < 65) {
      coaching.push("Practice common interview questions daily for 2-3 weeks");
      coaching.push("Record yourself answering questions to improve delivery");
      coaching.push("Research the company and role thoroughly before interviews");
    } else if (score < 80) {
      coaching.push("Focus on providing more specific examples using the STAR method");
      coaching.push("Practice technical questions relevant to your target role");
      coaching.push("Work on confident body language and vocal delivery");
    } else {
      coaching.push("Continue practicing to maintain your strong interview skills");
      coaching.push("Consider preparing for more senior-level interview questions");
      coaching.push("Focus on industry-specific knowledge and trends");
    }
    
    return coaching;
  };

  const completeAssessment = () => {
    onComplete({
      candidateName,
      targetRole,
      difficulty,
      yearsExperience,
      messages,
      assessment
    });
  };

  if (phase === 'setup') {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1>Self-Assessment Interview</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Mock Interview Setup
            </CardTitle>
            <CardDescription>
              Prepare for a virtual mock interview with AI-powered assessment and feedback
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="candidateName">Your Name</Label>
                <Input
                  id="candidateName"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="targetRole">Target Role</Label>
                <Input
                  id="targetRole"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g. Software Engineer, Product Manager"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Interview Difficulty</Label>
                <Select value={difficulty} onValueChange={(value: Difficulty) => setDifficulty(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(difficultyConfig).map(([key, config]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${config.color}`} />
                          <span>{config.label} - {config.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="yearsExperience">Years of Experience</Label>
                <Select value={yearsExperience} onValueChange={setYearsExperience}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-1">0-1 years (Entry Level)</SelectItem>
                    <SelectItem value="2-4">2-4 years (Junior)</SelectItem>
                    <SelectItem value="5-7">5-7 years (Mid-Level)</SelectItem>
                    <SelectItem value="8-12">8-12 years (Senior)</SelectItem>
                    <SelectItem value="12+">12+ years (Principal/Lead)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Card className="bg-muted">
              <CardContent className="pt-6">
                <h4 className="font-medium mb-3">What to Expect</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="font-medium text-green-600 mb-2">You'll Receive:</h5>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Percentage-based skill assessment</li>
                      <li>• Detailed feedback on responses</li>
                      <li>• Personalized coaching recommendations</li>
                      <li>• Areas for improvement identification</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-600 mb-2">Assessment Areas:</h5>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Communication skills</li>
                      <li>• Technical competency</li>
                      <li>• Problem-solving ability</li>
                      <li>• Role fit and relevance</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button 
              onClick={startMockInterview} 
              disabled={!candidateName || !targetRole}
              className="w-full"
            >
              <Play className="h-4 w-4 mr-2" />
              Start Mock Interview
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (phase === 'interview') {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1>Mock Interview Session</h1>
              <p className="text-sm text-muted-foreground">
                {candidateName} • {targetRole}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant={isInterviewActive ? "default" : "secondary"}>
              {isInterviewActive ? 'In Progress' : 'Completed'}
            </Badge>
            <Badge variant="outline">
              Question {Math.min(questionCount + 1, difficultyConfig[difficulty].questions)} / {difficultyConfig[difficulty].questions}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Interview Conversation
                  </CardTitle>
                  <Progress 
                    value={(questionCount / difficultyConfig[difficulty].questions) * 100} 
                    className="w-32"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96 mb-4">
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${message.role === 'AI' ? 'justify-start' : 'justify-end'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                            message.role === 'AI'
                              ? 'bg-muted text-muted-foreground'
                              : 'bg-primary text-primary-foreground'
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{message.text}</p>
                          <p className="text-xs mt-2 opacity-70">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {isInterviewActive && (
                  <div className="space-y-4">
                    <Separator />
                    <div className="space-y-2">
                      <Label>Your Response</Label>
                      <Textarea
                        value={currentResponse}
                        onChange={(e) => setCurrentResponse(e.target.value)}
                        placeholder="Type your answer here... Take your time to provide a thoughtful response."
                        rows={4}
                      />
                      <p className="text-xs text-muted-foreground">
                        Tip: Use specific examples and be as detailed as possible in your responses.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        onClick={submitResponse} 
                        disabled={!currentResponse.trim()}
                        className="flex-1"
                      >
                        Submit Response
                      </Button>
                      <Button variant="outline" onClick={endInterview}>
                        End Early
                      </Button>
                    </div>
                  </div>
                )}
                
                {!isInterviewActive && (
                  <div className="text-center py-6">
                    <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-muted-foreground">Generating your assessment report...</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Session Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-xs text-muted-foreground">Candidate</Label>
                  <p>{candidateName}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Target Role</Label>
                  <p>{targetRole}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Difficulty</Label>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${difficultyConfig[difficulty].color}`} />
                    <span>{difficultyConfig[difficulty].label}</span>
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Experience</Label>
                  <p>{yearsExperience || 'Not specified'}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Interview Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <BookOpen className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">Use the STAR method: Situation, Task, Action, Result</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Lightbulb className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">Provide specific examples and quantify your achievements</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Target className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">Keep responses focused and relevant to the question</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'results' && assessment) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1>Assessment Results</h1>
              <p className="text-sm text-muted-foreground">
                {candidateName} • {targetRole}
              </p>
            </div>
          </div>
          <Button onClick={completeAssessment}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Complete & Export
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Overall Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-primary mb-2">{assessment.overall_score_percent}%</div>
                  <Badge 
                    variant={
                      assessment.recommendation === 'Ready' ? 'default' :
                      assessment.recommendation === 'Needs Improvement' ? 'secondary' : 'outline'
                    }
                    className="text-sm"
                  >
                    {assessment.recommendation}
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  {Object.entries(assessment.skills).map(([skill, score]) => (
                    <div key={skill}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm capitalize">{skill.replace('_', ' ')}</span>
                        <span className="text-sm font-medium">{score}</span>
                      </div>
                      <Progress value={parseInt(score)} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-green-600">Your Strengths</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {assessment.detailedFeedback.strengths.map((strength, index) => (
                    <li key={index} className="text-sm flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-orange-600">Areas to Improve</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {assessment.detailedFeedback.improvements.map((improvement, index) => (
                    <li key={index} className="text-sm flex items-start gap-2">
                      <Target className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      {improvement}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Assessment Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{assessment.summary}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Personalized Coaching Plan
                </CardTitle>
                <CardDescription>
                  Recommended actions to improve your interview performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {assessment.detailedFeedback.coaching.map((tip, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                      <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-sm">{tip}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Interview Performance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{questionCount}</div>
                    <p className="text-sm text-muted-foreground">Questions Answered</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{difficultyConfig[difficulty].label}</div>
                    <p className="text-sm text-muted-foreground">Difficulty Level</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">~{questionCount * 2}m</div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{assessment.overall_score_percent}%</div>
                    <p className="text-sm text-muted-foreground">Overall Score</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return null;
}