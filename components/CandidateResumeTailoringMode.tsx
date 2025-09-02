import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { ArrowLeft, Upload, Wand2, CheckCircle, FileText, Target, TrendingUp, AlertTriangle, History, Calendar, Eye, Download, Copy, Trash2, Star, FileType, Printer, Clipboard, MoreVertical, Share, PieChart } from 'lucide-react';

interface CandidateResumeTailoringModeProps {
  onComplete: (data: any) => void;
  onBack: () => void;
}

interface TailoringAnalysis {
  keywordMatch: number;
  skillsAlignment: number;
  experienceRelevance: number;
  formatOptimization: number;
  overallScore: number;
  missingKeywords: string[];
  suggestions: string[];
  strengthAreas: string[];
  improvementAreas: string[];
}

interface TailoringHistoryItem {
  id: string;
  date: string;
  candidateName: string;
  targetPosition: string;
  companyName?: string;
  originalResume: string;
  jobDescription: string;
  tailoredResume: string;
  analysis: TailoringAnalysis;
  isFavorite: boolean;
  tags: string[];
}

type TailoringPhase = 'input' | 'analyzing' | 'results';

export function CandidateResumeTailoringMode({ onComplete, onBack }: CandidateResumeTailoringModeProps) {
  const [phase, setPhase] = useState<TailoringPhase>('input');
  const [candidateName, setCandidateName] = useState('');
  const [targetPosition, setTargetPosition] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [originalResume, setOriginalResume] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [tailoredResume, setTailoredResume] = useState('');
  const [analysis, setAnalysis] = useState<TailoringAnalysis | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentTab, setCurrentTab] = useState('new-tailoring');
  const [history, setHistory] = useState<TailoringHistoryItem[]>([]);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<TailoringHistoryItem | null>(null);

  // Load history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('talentflow-resume-history');
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        setHistory(parsedHistory);
      } catch (error) {
        console.error('Error loading resume history:', error);
        // Initialize with sample data if no history exists
        initializeSampleHistory();
      }
    } else {
      // Initialize with sample data if no history exists
      initializeSampleHistory();
    }
  }, []);

  // Initialize with sample history data for demo purposes
  const initializeSampleHistory = () => {
    const sampleHistory: TailoringHistoryItem[] = [
      {
        id: 'sample-1',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
        candidateName: 'Sarah Johnson',
        targetPosition: 'Senior Product Manager',
        companyName: 'Google',
        originalResume: 'Sample original resume content...',
        jobDescription: 'Sample job description for Senior Product Manager role...',
        tailoredResume: '# Sarah Johnson\n**Senior Product Manager**\n\n---\n\n## Professional Summary\n\nResults-driven product management professional with 8+ years of experience driving product strategy, cross-functional collaboration, and data-driven decision making. Proven track record of launching successful products that have generated $50M+ in revenue. Seeking to leverage product strategy and team leadership expertise to drive success in a Senior Product Manager role at Google.\n\n---\n\n## Core Competencies\n\n**Leadership:** Product Strategy • Team Management • Cross-functional Collaboration • Stakeholder Engagement\n**Technical:** Data Analysis • A/B Testing • User Research • Product Analytics\n**Communication:** Presentation Skills • Executive Communication • Customer Interviews • Team Leadership\n\n---\n\n## Professional Experience\n\n**Senior Product Manager** | *TechCorp* | 2020 - Present\n• Led product strategy for B2B SaaS platform serving 10,000+ enterprise customers\n• Increased user engagement by 40% through data-driven feature prioritization\n• Managed cross-functional teams of 12+ engineers, designers, and data scientists\n• Collaborated with C-level executives on product roadmap and strategic initiatives\n\n**Product Manager** | *StartupXYZ* | 2018 - 2020\n• Launched 3 major product features resulting in 25% increase in monthly active users\n• Conducted user research and A/B tests to optimize product experience\n• Built strong relationships with key stakeholders and external partners\n• Mentored junior product team members on best practices and methodologies',
        analysis: {
          keywordMatch: 92,
          skillsAlignment: 88,
          experienceRelevance: 95,
          formatOptimization: 90,
          overallScore: 91,
          missingKeywords: ['machine learning', 'agile methodology'],
          suggestions: [
            'Enhanced keyword density for Google-specific requirements',
            'Highlighted quantifiable product metrics and KPIs',
            'Emphasized cross-functional leadership experience',
            'Added technical skills relevant to product management'
          ],
          strengthAreas: [
            'Strong quantifiable achievements',
            'Relevant product management experience',
            'Clear leadership examples',
            'Technical competency alignment'
          ],
          improvementAreas: [
            'Could add more Google-specific terminology',
            'Consider highlighting AI/ML experience',
            'Additional metrics would strengthen impact'
          ]
        },
        isFavorite: true,
        tags: ['product-management', 'tech', 'google']
      },
      {
        id: 'sample-2',
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
        candidateName: 'Sarah Johnson',
        targetPosition: 'Marketing Director',
        companyName: 'Microsoft',
        originalResume: 'Sample marketing resume content...',
        jobDescription: 'Sample job description for Marketing Director role...',
        tailoredResume: '# Sarah Johnson\n**Marketing Director**\n\n---\n\n## Professional Summary\n\nStrategic marketing leader with 10+ years of experience in digital marketing, brand management, and campaign optimization. Proven ability to drive 200%+ growth in lead generation and build high-performing marketing teams. Seeking to leverage digital marketing expertise and strategic planning capabilities to drive success in a Marketing Director role.\n\n---\n\n## Core Competencies\n\n**Leadership:** Marketing Strategy • Team Management • Budget Management • Campaign Planning\n**Technical:** Marketing Automation • SEO/SEM • Analytics Platforms • CRM Integration\n**Communication:** Brand Messaging • Content Strategy • Executive Reporting • Stakeholder Management\n\n---\n\n## Professional Experience\n\n**Senior Marketing Manager** | *MarketingCorp* | 2019 - Present\n• Developed and executed multi-channel marketing campaigns generating $10M+ in revenue\n• Led team of 8 marketing specialists across digital, content, and events\n• Increased qualified leads by 150% through strategic campaign optimization\n• Managed $2M annual marketing budget with 95% efficiency rating',
        analysis: {
          keywordMatch: 85,
          skillsAlignment: 90,
          experienceRelevance: 87,
          formatOptimization: 88,
          overallScore: 88,
          missingKeywords: ['azure', 'cloud marketing', 'b2b sales'],
          suggestions: [
            'Optimized for Microsoft marketing terminology',
            'Enhanced B2B marketing focus',
            'Added quantifiable marketing metrics',
            'Structured for ATS compatibility'
          ],
          strengthAreas: [
            'Strong marketing leadership experience',
            'Quantifiable results and metrics',
            'Budget management experience',
            'Team leadership examples'
          ],
          improvementAreas: [
            'Could emphasize cloud/tech marketing',
            'Add more Microsoft-specific experience',
            'Include customer success metrics'
          ]
        },
        isFavorite: false,
        tags: ['marketing', 'microsoft', 'leadership']
      }
    ];
    
    setHistory(sampleHistory);
  };

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('talentflow-resume-history', JSON.stringify(history));
  }, [history]);

  const handleTailorResume = async () => {
    if (!originalResume || !jobDescription) return;
    
    setIsProcessing(true);
    setPhase('analyzing');
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Generate tailored resume and analysis
    const tailoredContent = generateTailoredResume();
    const analysisResults = generateAnalysis();
    
    setTailoredResume(tailoredContent);
    setAnalysis(analysisResults);
    setPhase('results');
    setIsProcessing(false);
  };

  const generateTailoredResume = () => {
    // Extract key information from job description
    const jobKeywords = extractKeywords(jobDescription);
    const currentSections = parseResume(originalResume);
    
    // Create optimized resume structure
    return `# ${candidateName || 'Your Name'}
**${targetPosition || 'Target Position'}**

---

## Professional Summary

Results-driven professional with proven expertise in ${jobKeywords.slice(0, 3).join(', ')}. Demonstrated ability to ${getRelevantAchievements()} with a focus on delivering measurable business impact. Seeking to leverage ${getKeySkills()} to drive success in a ${targetPosition || 'target'} role.

---

## Core Competencies

${generateSkillsSection(jobKeywords)}

---

## Professional Experience

${generateExperienceSection(currentSections.experience)}

---

## Education

${currentSections.education || 'Bachelor\'s Degree in Computer Science\nUniversity Name, Year'}

---

## Technical Skills

${generateTechnicalSkills(jobKeywords)}

---

## Achievements & Certifications

${generateAchievements()}

---

*This resume has been optimized for the ${targetPosition || 'target position'} role with enhanced keyword alignment and strategic content positioning.*`;
  };

  const extractKeywords = (text: string): string[] => {
    const commonKeywords = [
      'leadership', 'management', 'development', 'strategy', 'analysis',
      'communication', 'collaboration', 'innovation', 'problem-solving',
      'project management', 'team leadership', 'data analysis', 'strategic planning'
    ];
    
    const textLower = text.toLowerCase();
    return commonKeywords.filter(keyword => textLower.includes(keyword));
  };

  const parseResume = (resume: string) => {
    return {
      experience: extractSection(resume, 'experience') || 'Senior Professional | Company Name | 2020-Present\n• Led cross-functional teams to deliver key initiatives\n• Implemented process improvements resulting in 25% efficiency gains\n• Managed stakeholder relationships and strategic partnerships',
      education: extractSection(resume, 'education'),
      skills: extractSection(resume, 'skills')
    };
  };

  const extractSection = (text: string, section: string): string | null => {
    const regex = new RegExp(`${section}[\\s\\S]*?(?=\\n\\n|$)`, 'i');
    const match = text.match(regex);
    return match ? match[0] : null;
  };

  const getRelevantAchievements = () => {
    const achievements = [
      'streamline operations and improve efficiency',
      'lead high-performing teams',
      'drive strategic initiatives',
      'optimize processes and workflows',
      'deliver exceptional results'
    ];
    return achievements[Math.floor(Math.random() * achievements.length)];
  };

  const getKeySkills = () => {
    const jobKeywords = extractKeywords(jobDescription);
    return jobKeywords.slice(0, 2).join(' and ') || 'technical expertise and leadership capabilities';
  };

  const generateSkillsSection = (keywords: string[]) => {
    const skillCategories = {
      'Leadership': ['Team Management', 'Strategic Planning', 'Change Management', 'Stakeholder Engagement'],
      'Technical': ['Data Analysis', 'Process Optimization', 'System Implementation', 'Quality Assurance'],
      'Communication': ['Presentation Skills', 'Cross-functional Collaboration', 'Client Relations', 'Negotiation']
    };
    
    let skillsText = '';
    Object.entries(skillCategories).forEach(([category, skills]) => {
      skillsText += `**${category}:** ${skills.join(' • ')}\n`;
    });
    
    return skillsText;
  };

  const generateExperienceSection = (originalExp: string) => {
    return originalExp || `**Senior Professional** | *Company Name* | 2020 - Present
• Led strategic initiatives resulting in 30% improvement in operational efficiency
• Managed cross-functional teams of 8+ members across multiple departments
• Implemented data-driven solutions that increased revenue by $2M annually
• Collaborated with C-level executives on organizational transformation projects

**Professional** | *Previous Company* | 2018 - 2020
• Developed and executed project plans for complex technical implementations
• Mentored junior team members and conducted training sessions
• Optimized business processes resulting in 20% cost reduction
• Built strong relationships with key stakeholders and external partners`;
  };

  const generateTechnicalSkills = (keywords: string[]) => {
    const techSkills = [
      'Data Analysis & Visualization',
      'Project Management Tools',
      'CRM & ERP Systems',
      'Process Automation',
      'Performance Analytics',
      'Strategic Planning Software'
    ];
    
    return `**Proficient:** ${techSkills.slice(0, 3).join(' • ')}\n**Experienced:** ${techSkills.slice(3).join(' • ')}`;
  };

  const generateAchievements = () => {
    return `• Certified Project Management Professional (PMP)
• Leadership Excellence Award 2023
• Successfully completed advanced training in strategic management
• Published thought leadership articles in industry publications`;
  };

  const generateAnalysis = (): TailoringAnalysis => {
    const jobKeywords = extractKeywords(jobDescription);
    const resumeKeywords = extractKeywords(originalResume);
    
    const keywordMatch = Math.min(95, 60 + (jobKeywords.filter(k => resumeKeywords.includes(k)).length * 5));
    const skillsAlignment = Math.floor(Math.random() * 20) + 75;
    const experienceRelevance = Math.floor(Math.random() * 15) + 80;
    const formatOptimization = 92;
    const overallScore = Math.round((keywordMatch + skillsAlignment + experienceRelevance + formatOptimization) / 4);
    
    const allKeywords = ['project management', 'data analysis', 'leadership', 'strategic planning', 'communication'];
    const missingKeywords = allKeywords.filter(k => !jobKeywords.includes(k)).slice(0, 3);
    
    return {
      keywordMatch,
      skillsAlignment,
      experienceRelevance,
      formatOptimization,
      overallScore,
      missingKeywords,
      suggestions: [
        'Enhanced keyword density for better ATS compatibility',
        'Restructured experience section to highlight relevant achievements',
        'Added quantifiable metrics and impact statements',
        'Optimized formatting for improved readability',
        'Aligned core competencies with job requirements'
      ],
      strengthAreas: [
        'Strong professional summary',
        'Relevant technical skills',
        'Clear achievement statements',
        'Proper formatting structure'
      ],
      improvementAreas: [
        'Could include more industry-specific terminology',
        'Additional quantifiable results would strengthen impact',
        'Consider adding relevant certifications or training'
      ]
    };
  };

  const saveToHistory = () => {
    if (!analysis) return;

    const historyItem: TailoringHistoryItem = {
      id: `tailoring-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      date: new Date().toISOString(),
      candidateName,
      targetPosition,
      companyName,
      originalResume,
      jobDescription,
      tailoredResume,
      analysis,
      isFavorite: false,
      tags: []
    };

    setHistory(prev => [historyItem, ...prev]);
    return historyItem.id;
  };

  const completeProcess = () => {
    const historyId = saveToHistory();
    
    onComplete({
      candidateName,
      targetPosition,
      companyName,
      originalResume,
      jobDescription,
      tailoredResume,
      analysis,
      historyId
    });
  };

  const loadFromHistory = (item: TailoringHistoryItem) => {
    setCandidateName(item.candidateName);
    setTargetPosition(item.targetPosition);
    setCompanyName(item.companyName || '');
    setOriginalResume(item.originalResume);
    setJobDescription(item.jobDescription);
    setTailoredResume(item.tailoredResume);
    setAnalysis(item.analysis);
    setPhase('results');
    setCurrentTab('new-tailoring');
  };

  const toggleFavorite = (id: string) => {
    setHistory(prev => prev.map(item => 
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
    ));
  };

  const deleteHistoryItem = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  const duplicateHistoryItem = (item: TailoringHistoryItem) => {
    setCandidateName(item.candidateName);
    setTargetPosition(item.targetPosition);
    setCompanyName(item.companyName || '');
    setOriginalResume(item.originalResume);
    setJobDescription(item.jobDescription);
    setTailoredResume('');
    setAnalysis(null);
    setPhase('input');
    setCurrentTab('new-tailoring');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Export functionality
  const exportResumeToPDF = (content: string, filename: string) => {
    // Simulate PDF export
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${filename}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const exportResumeToWord = (content: string, filename: string) => {
    // Simulate Word export
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'application/msword' });
    element.href = URL.createObjectURL(file);
    element.download = `${filename}.doc`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const copyToClipboard = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      // You could add a toast notification here
      alert('Resume copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = content;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Resume copied to clipboard!');
    }
  };

  const shareResume = (item: TailoringHistoryItem) => {
    if (navigator.share) {
      navigator.share({
        title: `${item.targetPosition} Resume - ${item.candidateName}`,
        text: item.tailoredResume,
      });
    } else {
      copyToClipboard(item.tailoredResume);
    }
  };

  if (phase === 'input') {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1>Resume Tailoring</h1>
        </div>

        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="new-tailoring" className="flex items-center gap-2">
              <Wand2 className="h-4 w-4" />
              New Tailoring
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              History ({history.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="new-tailoring" className="mt-6">
            <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Resume Optimization Setup
            </CardTitle>
            <CardDescription>
              Upload your resume and job description to get AI-powered optimization recommendations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <Label htmlFor="targetPosition">Target Position</Label>
                <Input
                  id="targetPosition"
                  value={targetPosition}
                  onChange={(e) => setTargetPosition(e.target.value)}
                  placeholder="e.g. Senior Product Manager"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name (Optional)</Label>
                <Input
                  id="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Google, Microsoft"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="originalResume">Current Resume/CV</Label>
              <Textarea
                id="originalResume"
                value={originalResume}
                onChange={(e) => setOriginalResume(e.target.value)}
                placeholder="Paste your current resume text here..."
                rows={8}
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Tip: Copy and paste your resume text for best results. Include all sections: summary, experience, education, skills.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobDescription">Job Description</Label>
              <Textarea
                id="jobDescription"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the complete job description here..."
                rows={6}
              />
              <p className="text-xs text-muted-foreground">
                Include the full job posting with requirements, responsibilities, and qualifications.
              </p>
            </div>

            <Button 
              onClick={handleTailorResume} 
              disabled={!originalResume || !jobDescription || isProcessing}
              className="w-full"
            >
              <Wand2 className="h-4 w-4 mr-2" />
              Tailor My Resume
            </Button>
          </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Tailored Resume History
                </CardTitle>
                <CardDescription>
                  View your previously tailored resumes and track your optimization progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                {history.length === 0 ? (
                  <div className="text-center py-12">
                    <History className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Tailored Resumes Yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Start by creating your first tailored resume to see your history here.
                    </p>
                    <Button onClick={() => setCurrentTab('new-tailoring')}>
                      <Wand2 className="h-4 w-4 mr-2" />
                      Create Tailored Resume
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Favorites first */}
                    {history.filter(item => item.isFavorite).length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <h3 className="font-medium">Favorites</h3>
                        </div>
                        <div className="grid gap-4">
                          {history.filter(item => item.isFavorite).map((item) => (
                            <HistoryItemCard
                              key={item.id}
                              item={item}
                              onView={() => loadFromHistory(item)}
                              onToggleFavorite={() => toggleFavorite(item.id)}
                              onDuplicate={() => duplicateHistoryItem(item)}
                              onDelete={() => deleteHistoryItem(item.id)}
                              formatDate={formatDate}
                            />
                          ))}
                        </div>
                        <Separator className="my-6" />
                      </div>
                    )}
                    
                    {/* All items */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium">All Resume Tailoring History</h3>
                        <Badge variant="secondary">{history.length} items</Badge>
                      </div>
                      <div className="grid gap-4">
                        {history.map((item) => (
                          <HistoryItemCard
                            key={item.id}
                            item={item}
                            onView={() => loadFromHistory(item)}
                            onToggleFavorite={() => toggleFavorite(item.id)}
                            onDuplicate={() => duplicateHistoryItem(item)}
                            onDelete={() => deleteHistoryItem(item.id)}
                            formatDate={formatDate}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  if (phase === 'analyzing') {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => setPhase('input')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1>Analyzing Resume</h1>
          </div>
          <Button variant="ghost" onClick={onBack}>
            Back to Dashboard
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 animate-spin" />
              AI Resume Optimization in Progress
            </CardTitle>
            <CardDescription>
              Our AI is analyzing your resume and tailoring it for the target position
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Analyzing keyword density...</span>
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <span>Optimizing content structure...</span>
                <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Enhancing ATS compatibility...</span>
                <div className="h-5 w-5" />
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Finalizing recommendations...</span>
                <div className="h-5 w-5" />
              </div>
            </div>
            
            <Progress value={66} className="w-full" />
            
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Pro Tip:</strong> The AI is comparing your resume against industry best practices 
                and optimizing for keyword alignment with the job description. This process typically 
                takes 30-60 seconds.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (phase === 'results' && analysis) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => setPhase('input')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1>Resume Optimization Results</h1>
              <p className="text-sm text-muted-foreground">
                {candidateName} • {targetPosition}
                {companyName && ` • ${companyName}`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={onBack}>
              Back to Dashboard
            </Button>
            <Button onClick={completeProcess}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Complete & Export
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Optimization Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-green-600">{analysis.overallScore}%</div>
                  <p className="text-sm text-muted-foreground">Overall Optimization</p>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Keyword Match</span>
                      <span className="text-sm">{analysis.keywordMatch}%</span>
                    </div>
                    <Progress value={analysis.keywordMatch} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Skills Alignment</span>
                      <span className="text-sm">{analysis.skillsAlignment}%</span>
                    </div>
                    <Progress value={analysis.skillsAlignment} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Experience Relevance</span>
                      <span className="text-sm">{analysis.experienceRelevance}%</span>
                    </div>
                    <Progress value={analysis.experienceRelevance} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Format Optimization</span>
                      <span className="text-sm">{analysis.formatOptimization}%</span>
                    </div>
                    <Progress value={analysis.formatOptimization} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Key Improvements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-green-600 mb-2">Strengths Enhanced</h4>
                    <ul className="space-y-1">
                      {analysis.strengthAreas.map((strength, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-medium text-orange-600 mb-2">Optimization Areas</h4>
                    <ul className="space-y-1">
                      {analysis.improvementAreas.map((area, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                          {area}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {analysis.missingKeywords.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Suggested Keywords</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {analysis.missingKeywords.map((keyword, index) => (
                      <Badge key={index} variant="outline">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Consider incorporating these keywords naturally into your resume
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Optimized Resume
                </CardTitle>
                <CardDescription>
                  Your tailored resume optimized for the target position
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <div className="bg-white p-6 border rounded-lg font-mono text-sm leading-relaxed">
                    <pre className="whitespace-pre-wrap">{tailoredResume}</pre>
                  </div>
                </ScrollArea>
                
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Optimization Summary</h4>
                  <ul className="space-y-1">
                    {analysis.suggestions.map((suggestion, index) => (
                      <li key={index} className="text-sm flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {suggestion}
                      </li>
                    ))}
                  </ul>
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

// Enhanced component for history item cards with export functionality
interface HistoryItemCardProps {
  item: TailoringHistoryItem;
  onView: () => void;
  onToggleFavorite: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  formatDate: (date: string) => string;
}

function HistoryItemCard({ 
  item, 
  onView, 
  onToggleFavorite, 
  onDuplicate, 
  onDelete, 
  formatDate 
}: HistoryItemCardProps) {
  // Export functionality
  const exportToPDF = () => {
    const filename = `${item.candidateName}_${item.targetPosition}_Resume`.replace(/\s+/g, '_');
    const element = document.createElement('a');
    const file = new Blob([item.tailoredResume], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${filename}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const exportToWord = () => {
    const filename = `${item.candidateName}_${item.targetPosition}_Resume`.replace(/\s+/g, '_');
    const element = document.createElement('a');
    const file = new Blob([item.tailoredResume], { type: 'application/msword' });
    element.href = URL.createObjectURL(file);
    element.download = `${filename}.doc`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(item.tailoredResume);
      alert('Resume copied to clipboard!');
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = item.tailoredResume;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Resume copied to clipboard!');
    }
  };

  const shareResume = () => {
    if (navigator.share) {
      navigator.share({
        title: `${item.targetPosition} Resume - ${item.candidateName}`,
        text: item.tailoredResume,
      });
    } else {
      copyToClipboard();
    }
  };

  return (
    <TooltipProvider>
      <Card className="relative hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary/20 hover:border-l-primary">
        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-3">
                <h4 className="text-lg font-semibold truncate">{item.targetPosition}</h4>
                {item.companyName && (
                  <Badge variant="secondary" className="text-xs font-medium">
                    {item.companyName}
                  </Badge>
                )}
                {item.isFavorite && <Star className="h-5 w-5 text-yellow-500 fill-current" />}
                <Badge 
                  variant={item.analysis.overallScore >= 90 ? "default" : 
                          item.analysis.overallScore >= 75 ? "secondary" : "outline"}
                  className="ml-auto"
                >
                  {item.analysis.overallScore}% Optimized
                </Badge>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {formatDate(item.date)}
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  {item.candidateName}
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-sm font-medium text-blue-600">{item.analysis.keywordMatch}%</div>
                  <div className="text-xs text-muted-foreground">Keywords</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-green-600">{item.analysis.skillsAlignment}%</div>
                  <div className="text-xs text-muted-foreground">Skills</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-purple-600">{item.analysis.experienceRelevance}%</div>
                  <div className="text-xs text-muted-foreground">Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-orange-600">{item.analysis.formatOptimization}%</div>
                  <div className="text-xs text-muted-foreground">Format</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Progress value={item.analysis.overallScore} className="flex-1 h-2" />
                <span className="text-xs text-muted-foreground min-w-[3rem]">
                  {item.analysis.overallScore >= 90 ? 'Excellent' : 
                   item.analysis.overallScore >= 75 ? 'Good' : 
                   item.analysis.overallScore >= 60 ? 'Fair' : 'Needs Work'}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-9 w-9">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Preview Resume</TooltipContent>
                  </Tooltip>
                </DialogTrigger>
                <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      {item.targetPosition} - Enhanced Resume Preview
                    </DialogTitle>
                    <DialogDescription>
                      {item.candidateName} • Created {formatDate(item.date)}
                      {item.companyName && ` • ${item.companyName}`}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(90vh-120px)]">
                    {/* Enhanced Left Sidebar */}
                    <div className="lg:col-span-1 space-y-4 overflow-y-auto pr-2">
                      {/* Score Overview */}
                      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center gap-2 text-base">
                            <PieChart className="h-5 w-5 text-blue-600" />
                            Optimization Score
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="text-center">
                            <div className="text-4xl font-bold text-blue-600 mb-1">
                              {item.analysis.overallScore}%
                            </div>
                            <p className="text-sm text-muted-foreground">Overall Optimization</p>
                          </div>
                          
                          <div className="space-y-3">
                            {[
                              { label: 'Keyword Match', value: item.analysis.keywordMatch, color: 'bg-blue-500' },
                              { label: 'Skills Alignment', value: item.analysis.skillsAlignment, color: 'bg-green-500' },
                              { label: 'Experience Relevance', value: item.analysis.experienceRelevance, color: 'bg-purple-500' },
                              { label: 'Format Optimization', value: item.analysis.formatOptimization, color: 'bg-orange-500' }
                            ].map((metric, index) => (
                              <div key={index} className="space-y-1">
                                <div className="flex justify-between text-sm">
                                  <span>{metric.label}</span>
                                  <span className="font-medium">{metric.value}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div 
                                    className={`h-2 rounded-full ${metric.color}`}
                                    style={{ width: `${metric.value}%` }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Export Options */}
                      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center gap-2 text-base">
                            <Download className="h-5 w-5 text-green-600" />
                            Export Options
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <Button 
                            onClick={exportToPDF} 
                            variant="outline" 
                            size="sm" 
                            className="w-full justify-start gap-2 hover:bg-green-50"
                          >
                            <FileType className="h-4 w-4" />
                            Export as PDF
                          </Button>
                          <Button 
                            onClick={exportToWord} 
                            variant="outline" 
                            size="sm" 
                            className="w-full justify-start gap-2 hover:bg-blue-50"
                          >
                            <FileText className="h-4 w-4" />
                            Export as Word
                          </Button>
                          <Button 
                            onClick={copyToClipboard} 
                            variant="outline" 
                            size="sm" 
                            className="w-full justify-start gap-2 hover:bg-purple-50"
                          >
                            <Clipboard className="h-4 w-4" />
                            Copy to Clipboard
                          </Button>
                          <Button 
                            onClick={shareResume} 
                            variant="outline" 
                            size="sm" 
                            className="w-full justify-start gap-2 hover:bg-orange-50"
                          >
                            <Share className="h-4 w-4" />
                            Share Resume
                          </Button>
                        </CardContent>
                      </Card>

                      {/* Quick Actions */}
                      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center gap-2 text-base">
                            <Target className="h-5 w-5 text-purple-600" />
                            Quick Actions
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <Button 
                            onClick={onView} 
                            variant="default" 
                            size="sm" 
                            className="w-full justify-start gap-2"
                          >
                            <Eye className="h-4 w-4" />
                            View Full Results
                          </Button>
                          <Button 
                            onClick={onDuplicate} 
                            variant="outline" 
                            size="sm" 
                            className="w-full justify-start gap-2 hover:bg-green-50"
                          >
                            <Copy className="h-4 w-4" />
                            Duplicate Settings
                          </Button>
                          <Button
                            onClick={onToggleFavorite}
                            variant="outline"
                            size="sm"
                            className="w-full justify-start gap-2 hover:bg-yellow-50"
                          >
                            <Star className={`h-4 w-4 ${item.isFavorite ? 'fill-current text-yellow-500' : ''}`} />
                            {item.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                          </Button>
                        </CardContent>
                      </Card>

                      {/* Key Insights */}
                      <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base">Key Insights</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div>
                            <h4 className="text-sm font-medium text-green-600 mb-2">Strengths</h4>
                            <ul className="space-y-1">
                              {item.analysis.strengthAreas.slice(0, 2).map((strength, index) => (
                                <li key={index} className="text-xs flex items-start gap-2">
                                  <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                                  {strength}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <Separator />
                          
                          <div>
                            <h4 className="text-sm font-medium text-orange-600 mb-2">Improvements</h4>
                            <ul className="space-y-1">
                              {item.analysis.improvementAreas.slice(0, 2).map((area, index) => (
                                <li key={index} className="text-xs flex items-start gap-2">
                                  <AlertTriangle className="h-3 w-3 text-orange-500 mt-0.5 flex-shrink-0" />
                                  {area}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    {/* Resume Content */}
                    <div className="lg:col-span-3">
                      <Card className="h-full">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            Optimized Resume Content
                          </CardTitle>
                          <CardDescription>
                            Your tailored resume optimized for the target position
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="h-[calc(100%-80px)]">
                          <ScrollArea className="h-full">
                            <div className="bg-white p-6 border rounded-lg font-mono text-sm leading-relaxed shadow-inner">
                              <pre className="whitespace-pre-wrap">{item.tailoredResume}</pre>
                            </div>
                          </ScrollArea>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onToggleFavorite}
                    className={`h-9 w-9 ${item.isFavorite ? 'text-yellow-500 hover:text-yellow-600' : 'text-muted-foreground hover:text-yellow-500'}`}
                  >
                    <Star className={`h-4 w-4 ${item.isFavorite ? 'fill-current' : ''}`} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{item.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</TooltipContent>
              </Tooltip>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-9 w-9">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>More Actions</TooltipContent>
                  </Tooltip>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={exportToPDF}>
                    <FileType className="h-4 w-4 mr-2" />
                    Export as PDF
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={exportToWord}>
                    <FileText className="h-4 w-4 mr-2" />
                    Export as Word
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={copyToClipboard}>
                    <Clipboard className="h-4 w-4 mr-2" />
                    Copy to Clipboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={shareResume}>
                    <Share className="h-4 w-4 mr-2" />
                    Share Resume
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onDuplicate}>
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicate Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onDelete} className="text-red-600">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}