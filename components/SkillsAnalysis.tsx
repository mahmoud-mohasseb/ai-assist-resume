import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  BookOpen, 
  Award, 
  Star,
  Plus,
  Search,
  Filter,
  BarChart3,
  PieChart,
  Calendar,
  Clock,
  Zap,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Play,
  Users,
  DollarSign,
  Globe,
  Brain,
  Lightbulb,
  Sparkles,
  GraduationCap,
  FileText,
  Video,
  MessageSquare,
  Rocket,
  Bot,
  PlayCircle
} from 'lucide-react';

interface SkillsAnalysisProps {
  onBack: () => void;
}

interface Skill {
  id: string;
  name: string;
  category: 'technical' | 'soft' | 'industry';
  currentLevel: number;
  marketDemand: number;
  salaryImpact: number;
  trend: 'growing' | 'stable' | 'declining';
  recommendations: string[];
  timeToImprove: string;
  relatedJobs: string[];
}

interface LearningResource {
  id: string;
  title: string;
  type: 'course' | 'book' | 'certification' | 'practice';
  provider: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  rating: number;
  price: string;
  skills: string[];
  url: string;
}

interface MarketInsight {
  skill: string;
  demandGrowth: number;
  averageSalary: number;
  jobOpenings: number;
  topCompanies: string[];
}

export function SkillsAnalysis({ onBack }: SkillsAnalysisProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock skills data
  const skills: Skill[] = [
    {
      id: '1',
      name: 'React',
      category: 'technical',
      currentLevel: 85,
      marketDemand: 95,
      salaryImpact: 88,
      trend: 'growing',
      recommendations: [
        'Learn React 18 features and concurrent mode',
        'Master advanced patterns like compound components',
        'Build a complex project with state management'
      ],
      timeToImprove: '2-3 months',
      relatedJobs: ['Frontend Developer', 'Full Stack Engineer', 'React Developer']
    },
    {
      id: '2',
      name: 'TypeScript',
      category: 'technical',
      currentLevel: 70,
      marketDemand: 92,
      salaryImpact: 85,
      trend: 'growing',
      recommendations: [
        'Learn advanced types and generics',
        'Practice with utility types',
        'Implement strict TypeScript in projects'
      ],
      timeToImprove: '1-2 months',
      relatedJobs: ['Frontend Developer', 'Full Stack Engineer', 'TypeScript Developer']
    },
    {
      id: '3',
      name: 'System Design',
      category: 'technical',
      currentLevel: 55,
      marketDemand: 88,
      salaryImpact: 95,
      trend: 'growing',
      recommendations: [
        'Study distributed systems concepts',
        'Practice designing scalable architectures',
        'Learn about microservices patterns'
      ],
      timeToImprove: '4-6 months',
      relatedJobs: ['Senior Engineer', 'Staff Engineer', 'Technical Lead']
    },
    {
      id: '4',
      name: 'Leadership',
      category: 'soft',
      currentLevel: 60,
      marketDemand: 85,
      salaryImpact: 90,
      trend: 'stable',
      recommendations: [
        'Take on mentoring responsibilities',
        'Lead a project or initiative',
        'Practice public speaking and presentation skills'
      ],
      timeToImprove: '6-12 months',
      relatedJobs: ['Tech Lead', 'Engineering Manager', 'Senior Developer']
    },
    {
      id: '5',
      name: 'Machine Learning',
      category: 'technical',
      currentLevel: 35,
      marketDemand: 90,
      salaryImpact: 92,
      trend: 'growing',
      recommendations: [
        'Complete a comprehensive ML course',
        'Work on practical ML projects',
        'Learn popular frameworks like TensorFlow or PyTorch'
      ],
      timeToImprove: '6-9 months',
      relatedJobs: ['ML Engineer', 'Data Scientist', 'AI Developer']
    }
  ];

  const learningResources: LearningResource[] = [
    {
      id: '1',
      title: 'Complete React Developer Course',
      type: 'course',
      provider: 'React Academy',
      duration: '40 hours',
      difficulty: 'intermediate',
      rating: 4.8,
      price: '$99',
      skills: ['React', 'JavaScript'],
      url: '#'
    },
    {
      id: '2',
      title: 'TypeScript Deep Dive',
      type: 'book',
      provider: 'Tech Books',
      duration: '6-8 hours',
      difficulty: 'intermediate',
      rating: 4.6,
      price: '$29',
      skills: ['TypeScript'],
      url: '#'
    },
    {
      id: '3',
      title: 'AWS Certified Solutions Architect',
      type: 'certification',
      provider: 'Amazon',
      duration: '3 months prep',
      difficulty: 'advanced',
      rating: 4.9,
      price: '$150',
      skills: ['Cloud Architecture', 'AWS'],
      url: '#'
    },
    {
      id: '4',
      title: 'System Design Interview Practice',
      type: 'practice',
      provider: 'Interview Prep',
      duration: 'Self-paced',
      difficulty: 'advanced',
      rating: 4.7,
      price: '$49',
      skills: ['System Design'],
      url: '#'
    }
  ];

  const marketInsights: MarketInsight[] = [
    {
      skill: 'React',
      demandGrowth: 25,
      averageSalary: 125000,
      jobOpenings: 15240,
      topCompanies: ['Meta', 'Netflix', 'Airbnb', 'Uber']
    },
    {
      skill: 'TypeScript',
      demandGrowth: 35,
      averageSalary: 130000,
      jobOpenings: 12180,
      topCompanies: ['Microsoft', 'Slack', 'Shopify', 'Discord']
    },
    {
      skill: 'Machine Learning',
      demandGrowth: 45,
      averageSalary: 155000,
      jobOpenings: 8960,
      topCompanies: ['Google', 'Tesla', 'OpenAI', 'NVIDIA']
    }
  ];

  const filteredSkills = skills.filter(skill => {
    const matchesCategory = selectedCategory === 'all' || skill.category === selectedCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getSkillScore = (skill: Skill) => {
    return Math.round((skill.currentLevel + skill.marketDemand + skill.salaryImpact) / 3);
  };

  const getSkillGap = (skill: Skill) => {
    const targetLevel = 90; // Assuming 90% is the target for most skills
    return Math.max(0, targetLevel - skill.currentLevel);
  };

  const SkillCard = ({ skill }: { skill: Skill }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold mb-1">{skill.name}</h3>
            <Badge variant="outline" className="text-xs capitalize">
              {skill.category}
            </Badge>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 mb-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{getSkillScore(skill)}</span>
            </div>
            <Badge variant={skill.trend === 'growing' ? 'default' : skill.trend === 'stable' ? 'secondary' : 'destructive'}>
              {skill.trend === 'growing' && <TrendingUp className="h-3 w-3 mr-1" />}
              {skill.trend === 'declining' && <TrendingDown className="h-3 w-3 mr-1" />}
              {skill.trend}
            </Badge>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">Current Level</span>
              <span className="text-sm font-medium">{skill.currentLevel}%</span>
            </div>
            <Progress value={skill.currentLevel} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">Market Demand</span>
              <span className="text-sm font-medium">{skill.marketDemand}%</span>
            </div>
            <Progress value={skill.marketDemand} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">Salary Impact</span>
              <span className="text-sm font-medium">{skill.salaryImpact}%</span>
            </div>
            <Progress value={skill.salaryImpact} className="h-2" />
          </div>
        </div>

        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{skill.timeToImprove} to improve</span>
            </div>
            <Button variant="outline" size="sm">
              <BookOpen className="h-4 w-4 mr-2" />
              Learn
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const OverviewStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Overall Score</p>
              <p className="text-2xl font-bold">78%</p>
              <p className="text-xs text-green-600">+5% this month</p>
            </div>
            <Target className="h-8 w-8 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Skills Tracked</p>
              <p className="text-2xl font-bold">{skills.length}</p>
              <p className="text-xs text-blue-600">3 improving</p>
            </div>
            <BarChart3 className="h-8 w-8 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Market Alignment</p>
              <p className="text-2xl font-bold">85%</p>
              <p className="text-xs text-purple-600">High demand</p>
            </div>
            <TrendingUp className="h-8 w-8 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Learning Hours</p>
              <p className="text-2xl font-bold">24</p>
              <p className="text-xs text-orange-600">This month</p>
            </div>
            <BookOpen className="h-8 w-8 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const ResourceCard = ({ resource }: { resource: LearningResource }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h4 className="font-medium mb-1">{resource.title}</h4>
            <p className="text-sm text-muted-foreground">{resource.provider}</p>
          </div>
          <Badge variant="outline" className="text-xs capitalize">
            {resource.type}
          </Badge>
        </div>

        <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {resource.duration}
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            {resource.rating}
          </div>
          <Badge variant="secondary" className="text-xs">
            {resource.difficulty}
          </Badge>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {resource.skills.map((skill, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span className="font-medium text-green-600">{resource.price}</span>
          <Button variant="outline" size="sm">
            <ExternalLink className="h-4 w-4 mr-2" />
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1>Skills Analysis</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="skills">Skills Gap</TabsTrigger>
          <TabsTrigger value="ai-recommendations">AI Insights</TabsTrigger>
          <TabsTrigger value="market">Market Insights</TabsTrigger>
          <TabsTrigger value="learning">Learning Path</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <OverviewStats />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Skills Distribution</CardTitle>
                <CardDescription>Your current skill levels across categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Technical Skills</span>
                      <span className="text-sm">72%</span>
                    </div>
                    <Progress value={72} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Soft Skills</span>
                      <span className="text-sm">68%</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Industry Knowledge</span>
                      <span className="text-sm">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Priority Skills</CardTitle>
                <CardDescription>Skills with highest impact on your career</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {skills.slice(0, 4).map((skill) => (
                    <div key={skill.id} className="flex items-center justify-between p-2 border rounded-lg">
                      <div>
                        <span className="font-medium">{skill.name}</span>
                        <p className="text-xs text-muted-foreground">Gap: {getSkillGap(skill)}%</p>
                      </div>
                      <Badge variant={getSkillGap(skill) > 30 ? 'destructive' : getSkillGap(skill) > 15 ? 'secondary' : 'default'}>
                        {getSkillGap(skill) > 30 ? 'High Priority' : getSkillGap(skill) > 15 ? 'Medium' : 'Low Priority'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="soft">Soft Skills</SelectItem>
                <SelectItem value="industry">Industry</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Skill
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ai-recommendations" className="space-y-6">
          {/* AI-Powered Personalized Recommendations */}
          <Card className="border-2 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-blue-600" />
                AI-Powered Career Insights
              </CardTitle>
              <CardDescription>
                Personalized recommendations based on your skills, market trends, and career goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6 mb-6">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-2">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Your AI Career Assistant Says:</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Based on your current skill set and market analysis, focusing on <strong>System Design</strong> and <strong>Machine Learning</strong> 
                      will have the highest impact on your career growth. These skills are in high demand and can increase your earning potential by up to 35%.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Priority Skills with AI Reasoning */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-orange-600" />
                      Priority Skills (AI Recommended)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4 bg-red-50 dark:bg-red-900/20">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">System Design</h4>
                          <Badge variant="destructive">Critical Gap</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Essential for senior roles. 35% skill gap identified.
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Bot className="h-3 w-3" />
                          AI suggests prioritizing this for leadership roles
                        </div>
                      </div>

                      <div className="border rounded-lg p-4 bg-yellow-50 dark:bg-yellow-900/20">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">Machine Learning</h4>
                          <Badge variant="secondary">High Impact</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Growing field with 45% market demand increase.
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Bot className="h-3 w-3" />
                          AI predicts 25% salary increase potential
                        </div>
                      </div>

                      <div className="border rounded-lg p-4 bg-green-50 dark:bg-green-900/20">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">Leadership</h4>
                          <Badge variant="default">Medium Priority</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Complements technical skills for career advancement.
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Bot className="h-3 w-3" />
                          AI recommends for management track
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* AI-Generated Learning Plan */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Rocket className="h-4 w-4 text-purple-600" />
                      AI-Generated Learning Plan
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-1">
                          <span className="text-xs font-bold text-blue-600 block w-5 h-5 flex items-center justify-center">1</span>
                        </div>
                        <div>
                          <h4 className="font-medium">Immediate (Next 30 days)</h4>
                          <p className="text-sm text-muted-foreground">
                            Complete TypeScript advanced concepts and start system design fundamentals
                          </p>
                          <div className="flex items-center gap-1 mt-2">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">15 hours/week</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-1">
                          <span className="text-xs font-bold text-green-600 block w-5 h-5 flex items-center justify-center">2</span>
                        </div>
                        <div>
                          <h4 className="font-medium">Short-term (2-3 months)</h4>
                          <p className="text-sm text-muted-foreground">
                            Master distributed systems and scalability patterns
                          </p>
                          <div className="flex items-center gap-1 mt-2">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">10 hours/week</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="bg-purple-100 dark:bg-purple-900/30 rounded-full p-1">
                          <span className="text-xs font-bold text-purple-600 block w-5 h-5 flex items-center justify-center">3</span>
                        </div>
                        <div>
                          <h4 className="font-medium">Long-term (4-6 months)</h4>
                          <p className="text-sm text-muted-foreground">
                            Dive into machine learning algorithms and practical applications
                          </p>
                          <div className="flex items-center gap-1 mt-2">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">12 hours/week</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600">
                      <Zap className="h-4 w-4 mr-2" />
                      Start AI-Guided Learning
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* AI-Curated Resources */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-green-600" />
                    AI-Curated Learning Resources
                  </CardTitle>
                  <CardDescription>
                    Personalized resources based on your learning style and goals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      {
                        title: "System Design Interview Prep",
                        type: "course",
                        provider: "Tech Interview Pro",
                        aiReason: "Matches your current level and career goals",
                        difficulty: "intermediate",
                        duration: "8 weeks",
                        rating: 4.8,
                        icon: Video,
                        color: "bg-blue-100 dark:bg-blue-900/30"
                      },
                      {
                        title: "Machine Learning Foundations",
                        type: "interactive",
                        provider: "AI Learning Hub",
                        aiReason: "Perfect introduction for your background",
                        difficulty: "beginner",
                        duration: "12 weeks",
                        rating: 4.9,
                        icon: Brain,
                        color: "bg-purple-100 dark:bg-purple-900/30"
                      },
                      {
                        title: "Distributed Systems Patterns",
                        type: "book",
                        provider: "Tech Books Pro",
                        aiReason: "Complements your React knowledge well",
                        difficulty: "advanced",
                        duration: "4 weeks",
                        rating: 4.7,
                        icon: FileText,
                        color: "bg-green-100 dark:bg-green-900/30"
                      }
                    ].map((resource, index) => (
                      <Card key={index} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3 mb-3">
                            <div className={`${resource.color} rounded-lg p-2`}>
                              <resource.icon className="h-4 w-4" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{resource.title}</h4>
                              <p className="text-xs text-muted-foreground">{resource.provider}</p>
                            </div>
                          </div>
                          
                          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 mb-3">
                            <div className="flex items-center gap-2 mb-1">
                              <Bot className="h-3 w-3 text-blue-600" />
                              <span className="text-xs font-medium text-blue-600">AI Insight</span>
                            </div>
                            <p className="text-xs text-muted-foreground">{resource.aiReason}</p>
                          </div>

                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">{resource.difficulty}</Badge>
                              <span className="text-muted-foreground">{resource.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span>{resource.rating}</span>
                            </div>
                          </div>

                          <Button variant="outline" size="sm" className="w-full mt-3">
                            <PlayCircle className="h-3 w-3 mr-2" />
                            Start Learning
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* AI Chat Assistant */}
              <Card className="mt-6 border-2 border-purple-200 dark:border-purple-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-purple-600" />
                    Ask Your AI Career Coach
                  </CardTitle>
                  <CardDescription>
                    Get personalized advice about your skill development journey
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg p-4 mb-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-full p-2">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium mb-1">Hi! I'm your AI Career Coach 👋</p>
                        <p className="text-sm text-muted-foreground">
                          Ask me anything about your skill development, career progression, or learning recommendations!
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      "How can I transition to a senior role?",
                      "What's the fastest way to learn System Design?",
                      "Should I focus on ML or leadership skills?",
                      "How do I prepare for tech interviews?"
                    ].map((question, index) => (
                      <Button key={index} variant="outline" className="text-left justify-start h-auto p-3">
                        <Lightbulb className="h-3 w-3 mr-2 text-yellow-600" />
                        <span className="text-xs">{question}</span>
                      </Button>
                    ))}
                  </div>

                  <Button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Start Conversation with AI Coach
                  </Button>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="market" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {marketInsights.map((insight, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    {insight.skill}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Demand Growth</p>
                      <p className="text-lg font-bold text-green-600">+{insight.demandGrowth}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Avg Salary</p>
                      <p className="text-lg font-bold">${insight.averageSalary.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Job Openings</p>
                    <p className="font-semibold">{insight.jobOpenings.toLocaleString()}</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Top Companies</p>
                    <div className="flex flex-wrap gap-1">
                      {insight.topCompanies.map((company, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {company}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="learning" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recommended Learning Path</CardTitle>
              <CardDescription>Curated resources to improve your skills based on market demand</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {learningResources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Learning Schedule</CardTitle>
              <CardDescription>Suggested timeline for skill development</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Calendar className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Week 1-4: TypeScript Fundamentals</p>
                    <p className="text-sm text-muted-foreground">Complete advanced TypeScript course</p>
                  </div>
                  <Badge variant="outline">In Progress</Badge>
                </div>
                
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Target className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Week 5-12: System Design Mastery</p>
                    <p className="text-sm text-muted-foreground">Learn distributed systems concepts</p>
                  </div>
                  <Badge variant="secondary">Planned</Badge>
                </div>
                
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Award className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">Week 13-20: Machine Learning Basics</p>
                    <p className="text-sm text-muted-foreground">Build ML projects and portfolio</p>
                  </div>
                  <Badge variant="outline">Future</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}