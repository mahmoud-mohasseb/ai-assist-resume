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
import { ArrowLeft, Play, Pause, RotateCcw, CheckCircle, MessageSquare, FileText, BarChart3 } from 'lucide-react';

interface InterviewMessage {
  role: 'AI' | 'Candidate';
  text: string;
  timestamp: Date;
}

interface RecruiterEvaluation {
  summary: string;
  skills: {
    communication: number;
    technical: number;
    problem_solving: number;
    leadership: number;
    role_fit: number;
    culture_fit: number;
  };
  strengths: string[];
  weaknesses: string[];
  recommendation: 'Hire' | 'Next Round' | 'Reject';
  score_percent: number;
  notable_quotes: string[];
  red_flags: string[];
  growth_potential: string;
  overall_confidence: 'Low' | 'Medium' | 'High';
}

interface RecruiterInterviewModeProps {
  onComplete: (data: any) => void;
  onBack: () => void;
}

type InterviewPhase = 'setup' | 'conducting' | 'evaluation' | 'complete';
type Difficulty = 'easy' | 'medium' | 'hard';

export function RecruiterInterviewMode({ onComplete, onBack }: RecruiterInterviewModeProps) {
  const [phase, setPhase] = useState<InterviewPhase>('setup');
  const [candidateName, setCandidateName] = useState('');
  const [position, setPosition] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [jobDescription, setJobDescription] = useState('');
  const [candidateResume, setCandidateResume] = useState('');
  const [recruiterNotes, setRecruiterNotes] = useState('');
  
  const [messages, setMessages] = useState<InterviewMessage[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [candidateResponse, setCandidateResponse] = useState('');
  const [questionCount, setQuestionCount] = useState(0);
  const [isInterviewActive, setIsInterviewActive] = useState(false);
  
  const [evaluation, setEvaluation] = useState<RecruiterEvaluation | null>(null);

  const difficultyConfig = {
    easy: {
      label: 'Easy',
      description: 'General behavioral + light technical questions',
      color: 'bg-green-500',
      questionCount: 6
    },
    medium: {
      label: 'Medium',
      description: 'Problem-solving scenarios, deeper role context',
      color: 'bg-yellow-500',
      questionCount: 8
    },
    hard: {
      label: 'Hard',
      description: 'Rigorous technical, coding/system design, complex scenarios',
      color: 'bg-red-500',
      questionCount: 10
    }
  };

  const startInterview = () => {
    if (!candidateName || !position) return;
    
    setPhase('conducting');
    setIsInterviewActive(true);
    setQuestionCount(0);
    
    const introMessage: InterviewMessage = {
      role: 'AI',
      text: `Hello ${candidateName}, welcome to the interview for the ${position} position. I'm your AI interviewer today. Let's start with a brief introduction - could you tell me about yourself and what interests you about this role?`,
      timestamp: new Date()
    };
    
    setMessages([introMessage]);
    setCurrentQuestion(introMessage.text);
  };

  const generateNextQuestion = () => {
    const questions = {
      easy: [
        "What motivates you in your work?",
        "Describe a challenging project you've worked on.",
        "How do you handle feedback and criticism?",
        "Where do you see yourself in 5 years?",
        "What are your greatest strengths?",
        "Why are you interested in this position?"
      ],
      medium: [
        "Describe a time when you had to solve a complex problem with limited resources.",
        "How would you approach learning a new technology required for this role?",
        "Tell me about a time you had to work with a difficult team member.",
        "How do you prioritize tasks when everything seems urgent?",
        "Describe a situation where you had to make a decision without complete information.",
        "How would you handle a situation where you disagree with your manager?",
        "What would you do if you discovered a major flaw in a project close to deadline?",
        "How do you stay updated with industry trends and best practices?"
      ],
      hard: [
        "Design a system that can handle 1 million concurrent users.",
        "How would you optimize a slow-performing database query?",
        "Explain how you would implement a real-time chat system.",
        "Describe your approach to debugging a production issue affecting customers.",
        "How would you design a microservices architecture for an e-commerce platform?",
        "Walk me through your process for code review and quality assurance.",
        "How would you handle a security breach in a system you're responsible for?",
        "Explain the trade-offs between different caching strategies.",
        "Design an algorithm to detect fraud in financial transactions.",
        "How would you lead a team through a major system migration?"
      ]
    };

    const questionPool = questions[difficulty];
    const nextQuestion = questionPool[questionCount % questionPool.length];
    
    const aiMessage: InterviewMessage = {
      role: 'AI',
      text: nextQuestion,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, aiMessage]);
    setCurrentQuestion(nextQuestion);
  };

  const submitResponse = () => {
    if (!candidateResponse.trim()) return;
    
    const candidateMessage: InterviewMessage = {
      role: 'Candidate',
      text: candidateResponse,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, candidateMessage]);
    setCandidateResponse('');
    setQuestionCount(prev => prev + 1);
    
    const maxQuestions = difficultyConfig[difficulty].questionCount;
    
    if (questionCount + 1 >= maxQuestions) {
      endInterview();
    } else {
      setTimeout(generateNextQuestion, 1000);
    }
  };

  const endInterview = () => {
    setIsInterviewActive(false);
    const endMessage: InterviewMessage = {
      role: 'AI',
      text: "Thank you for your time today. The interview is now complete. The recruiter will evaluate your responses and provide feedback.",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, endMessage]);
    
    // Generate evaluation
    generateEvaluation();
    setPhase('evaluation');
  };

  const generateEvaluation = () => {
    // Simulate AI evaluation based on responses
    const responses = messages.filter(m => m.role === 'Candidate');
    const avgResponseLength = responses.reduce((acc, r) => acc + r.text.length, 0) / responses.length || 0;
    
    // Basic scoring algorithm (in real app, this would be more sophisticated)
    const communicationScore = Math.min(10, Math.max(3, Math.floor(avgResponseLength / 50)));
    const technicalScore = difficulty === 'hard' ? 8 : difficulty === 'medium' ? 7 : 6;
    const problemSolvingScore = Math.floor(Math.random() * 3) + 7;
    const leadershipScore = Math.floor(Math.random() * 3) + 6;
    const roleFitScore = Math.floor(Math.random() * 3) + 7;
    const cultureFitScore = Math.floor(Math.random() * 3) + 8;
    
    const overallScore = Math.round(
      (communicationScore + technicalScore + problemSolvingScore + leadershipScore + roleFitScore + cultureFitScore) / 6 * 10
    );
    
    const evaluation: RecruiterEvaluation = {
      summary: `${candidateName} demonstrated ${overallScore >= 80 ? 'strong' : overallScore >= 60 ? 'adequate' : 'developing'} capabilities during the ${difficulty} level interview. The candidate showed particular strength in ${overallScore >= 80 ? 'technical problem-solving and communication' : 'foundational knowledge'}.`,
      skills: {
        communication: communicationScore,
        technical: technicalScore,
        problem_solving: problemSolvingScore,
        leadership: leadershipScore,
        role_fit: roleFitScore,
        culture_fit: cultureFitScore
      },
      strengths: [
        "Clear communication style",
        "Relevant experience",
        "Problem-solving approach"
      ],
      weaknesses: [
        "Could provide more specific examples",
        "Technical depth could be enhanced"
      ],
      recommendation: overallScore >= 80 ? 'Hire' : overallScore >= 65 ? 'Next Round' : 'Reject',
      score_percent: overallScore,
      notable_quotes: responses.slice(0, 2).map(r => r.text.substring(0, 100) + '...'),
      red_flags: overallScore < 60 ? ["Limited technical depth", "Unclear responses"] : [],
      growth_potential: overallScore >= 70 ? "High potential for growth with proper mentoring" : "Moderate growth potential",
      overall_confidence: overallScore >= 80 ? 'High' : overallScore >= 60 ? 'Medium' : 'Low'
    };
    
    setEvaluation(evaluation);
  };

  const completeProcess = () => {
    onComplete({
      candidateName,
      position,
      difficulty,
      messages,
      evaluation,
      recruiterNotes
    });
  };

  if (phase === 'setup') {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1>Recruiter Interview Setup</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Interview Configuration</CardTitle>
            <CardDescription>
              Set up the interview parameters and candidate information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="candidateName">Candidate Name</Label>
                <Input
                  id="candidateName"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  placeholder="Enter candidate's full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  placeholder="e.g. Senior Software Engineer"
                />
              </div>
            </div>

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
              <Label htmlFor="jobDescription">Job Description</Label>
              <Textarea
                id="jobDescription"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="candidateResume">Candidate Resume/CV</Label>
              <Textarea
                id="candidateResume"
                value={candidateResume}
                onChange={(e) => setCandidateResume(e.target.value)}
                placeholder="Paste the candidate's resume text here..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="recruiterNotes">Recruiter Notes (Optional)</Label>
              <Textarea
                id="recruiterNotes"
                value={recruiterNotes}
                onChange={(e) => setRecruiterNotes(e.target.value)}
                placeholder="Any specific areas to focus on or notes..."
                rows={2}
              />
            </div>

            <Button 
              onClick={startInterview} 
              disabled={!candidateName || !position}
              className="w-full"
            >
              <Play className="h-4 w-4 mr-2" />
              Start Interview
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (phase === 'conducting') {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1>Interview in Progress</h1>
              <p className="text-sm text-muted-foreground">
                {candidateName} • {position}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant={isInterviewActive ? "default" : "secondary"}>
              {isInterviewActive ? 'Active' : 'Paused'}
            </Badge>
            <Badge variant="outline">
              Question {questionCount + 1} / {difficultyConfig[difficulty].questionCount}
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
                    value={(questionCount / difficultyConfig[difficulty].questionCount) * 100} 
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
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.role === 'AI'
                              ? 'bg-muted text-muted-foreground'
                              : 'bg-primary text-primary-foreground'
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <p className="text-xs mt-1 opacity-70">
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
                      <Label>Candidate Response</Label>
                      <Textarea
                        value={candidateResponse}
                        onChange={(e) => setCandidateResponse(e.target.value)}
                        placeholder="Type the candidate's response here..."
                        rows={3}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={submitResponse} disabled={!candidateResponse.trim()}>
                        Submit Response
                      </Button>
                      <Button variant="outline" onClick={endInterview}>
                        End Interview
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Interview Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-xs text-muted-foreground">Candidate</Label>
                  <p>{candidateName}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Position</Label>
                  <p>{position}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Difficulty</Label>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${difficultyConfig[difficulty].color}`} />
                    <span>{difficultyConfig[difficulty].label}</span>
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Progress</Label>
                  <p>{questionCount} / {difficultyConfig[difficulty].questionCount} questions</p>
                </div>
              </CardContent>
            </Card>

            {recruiterNotes && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recruiter Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{recruiterNotes}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'evaluation' && evaluation) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1>Interview Evaluation</h1>
              <p className="text-sm text-muted-foreground">
                {candidateName} • {position}
              </p>
            </div>
          </div>
          <Button onClick={completeProcess}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Complete & Export
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Overall Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold">{evaluation.score_percent}%</span>
                  <Badge 
                    variant={
                      evaluation.recommendation === 'Hire' ? 'default' :
                      evaluation.recommendation === 'Next Round' ? 'secondary' : 'destructive'
                    }
                  >
                    {evaluation.recommendation}
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-4">{evaluation.summary}</p>
                
                <div className="space-y-3">
                  {Object.entries(evaluation.skills).map(([skill, score]) => (
                    <div key={skill}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm capitalize">{skill.replace('_', ' ')}</span>
                        <span className="text-sm">{score}/10</span>
                      </div>
                      <Progress value={score * 10} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-green-600">Strengths</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {evaluation.strengths.map((strength, index) => (
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
                  <CardTitle className="text-lg text-orange-600">Areas for Improvement</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {evaluation.weaknesses.map((weakness, index) => (
                      <li key={index} className="text-sm flex items-start gap-2">
                        <div className="w-4 h-4 rounded-full bg-orange-200 mt-0.5 flex-shrink-0" />
                        {weakness}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {evaluation.notable_quotes.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Notable Responses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {evaluation.notable_quotes.map((quote, index) => (
                      <blockquote key={index} className="border-l-4 border-primary pl-4 italic text-sm">
                        "{quote}"
                      </blockquote>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Evaluation Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-xs text-muted-foreground">Overall Confidence</Label>
                  <Badge variant={
                    evaluation.overall_confidence === 'High' ? 'default' :
                    evaluation.overall_confidence === 'Medium' ? 'secondary' : 'outline'
                  }>
                    {evaluation.overall_confidence}
                  </Badge>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Growth Potential</Label>
                  <p className="text-sm">{evaluation.growth_potential}</p>
                </div>
                {evaluation.red_flags.length > 0 && (
                  <div>
                    <Label className="text-xs text-muted-foreground">Red Flags</Label>
                    <ul className="text-sm text-red-600">
                      {evaluation.red_flags.map((flag, index) => (
                        <li key={index}>• {flag}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Interview Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Questions Asked</span>
                  <span className="text-sm font-medium">{questionCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Difficulty Level</span>
                  <span className="text-sm font-medium capitalize">{difficulty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Duration</span>
                  <span className="text-sm font-medium">~{questionCount * 3} minutes</span>
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