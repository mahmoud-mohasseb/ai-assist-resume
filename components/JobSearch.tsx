import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Clock, 
  DollarSign, 
  Building, 
  Users, 
  ChevronRight, 
  Heart, 
  Star, 
  ArrowLeft, 
  Filter,
  Bookmark,
  Send,
  Eye,
  TrendingUp,
  Award,
  Globe,
  Target,
  FileText,
  CheckCircle
} from 'lucide-react';

interface JobSearchProps {
  onBack: () => void;
}

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  experience: string;
  salary: string;
  posted: string;
  description: string;
  requirements: string[];
  benefits: string[];
  matchScore: number;
  isBookmarked: boolean;
  isApplied: boolean;
  companyLogo?: string;
  applicants: number;
  skills: string[];
}

interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  appliedDate: string;
  status: 'pending' | 'reviewed' | 'interview' | 'rejected' | 'offer';
  coverLetter: string;
}

export function JobSearch({ onBack }: JobSearchProps) {
  const [activeTab, setActiveTab] = useState('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showApplicationDialog, setShowApplicationDialog] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [filters, setFilters] = useState({
    location: 'any',
    type: 'any',
    experience: 'any',
    salary: 'any'
  });

  // Mock job data
  const jobs: Job[] = [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      type: 'Full-time',
      experience: '5+ years',
      salary: '$120k - $160k',
      posted: '2 days ago',
      description: 'We are looking for a passionate Senior Frontend Developer to join our growing team. You will be responsible for building the next generation of our web applications using modern technologies.',
      requirements: [
        '5+ years of experience with React and TypeScript',
        'Strong understanding of modern CSS and responsive design',
        'Experience with state management (Redux, Context)',
        'Knowledge of testing frameworks (Jest, Cypress)',
        'Experience with Git and CI/CD pipelines'
      ],
      benefits: [
        'Competitive salary and equity',
        'Comprehensive health insurance',
        'Flexible work arrangements',
        'Professional development budget',
        'Unlimited PTO'
      ],
      matchScore: 95,
      isBookmarked: false,
      isApplied: false,
      applicants: 47,
      skills: ['React', 'TypeScript', 'CSS', 'Redux']
    },
    {
      id: '2',
      title: 'Product Manager',
      company: 'StartupXYZ',
      location: 'Remote',
      type: 'Remote',
      experience: '3-5 years',
      salary: '$100k - $140k',
      posted: '1 week ago',
      description: 'Join our product team to help shape the future of our platform. You will work closely with engineering, design, and stakeholders to deliver amazing user experiences.',
      requirements: [
        '3+ years of product management experience',
        'Experience with agile development methodologies',
        'Strong analytical and problem-solving skills',
        'Excellent communication and leadership abilities',
        'Experience with product analytics tools'
      ],
      benefits: [
        'Remote-first culture',
        'Stock options',
        'Health and dental insurance',
        'Home office stipend',
        'Annual company retreats'
      ],
      matchScore: 87,
      isBookmarked: true,
      isApplied: false,
      applicants: 89,
      skills: ['Product Management', 'Analytics', 'Agile', 'Leadership']
    },
    {
      id: '3',
      title: 'Full Stack Engineer',
      company: 'InnovateLabs',
      location: 'New York, NY',
      type: 'Full-time',
      experience: '4+ years',
      salary: '$110k - $150k',
      posted: '3 days ago',
      description: 'We are seeking a talented Full Stack Engineer to build scalable web applications. You will work across the entire technology stack from frontend to backend.',
      requirements: [
        '4+ years of full stack development experience',
        'Proficiency in Node.js and React',
        'Experience with databases (PostgreSQL, MongoDB)',
        'Knowledge of cloud platforms (AWS, GCP)',
        'Understanding of microservices architecture'
      ],
      benefits: [
        'Competitive compensation',
        'Comprehensive benefits package',
        'Learning and development opportunities',
        'Flexible work schedule',
        'Catered meals and snacks'
      ],
      matchScore: 82,
      isBookmarked: false,
      isApplied: true,
      applicants: 34,
      skills: ['Node.js', 'React', 'PostgreSQL', 'AWS']
    },
    {
      id: '4',
      title: 'UX Designer',
      company: 'DesignCo',
      location: 'Los Angeles, CA',
      type: 'Full-time',
      experience: '2-4 years',
      salary: '$80k - $120k',
      posted: '5 days ago',
      description: 'We are looking for a creative UX Designer to join our design team. You will be responsible for creating intuitive and engaging user experiences.',
      requirements: [
        '2+ years of UX design experience',
        'Proficiency in design tools (Figma, Sketch)',
        'Strong portfolio showcasing UX projects',
        'Understanding of user research methodologies',
        'Knowledge of accessibility principles'
      ],
      benefits: [
        'Creative and collaborative environment',
        'Health and wellness benefits',
        'Professional development budget',
        'Flexible PTO policy',
        'Design tool subscriptions'
      ],
      matchScore: 78,
      isBookmarked: true,
      isApplied: false,
      applicants: 56,
      skills: ['UX Design', 'Figma', 'User Research', 'Prototyping']
    },
    {
      id: '5',
      title: 'DevOps Engineer',
      company: 'CloudTech',
      location: 'Seattle, WA',
      type: 'Full-time',
      experience: '3+ years',
      salary: '$105k - $145k',
      posted: '1 day ago',
      description: 'Join our infrastructure team to build and maintain scalable, reliable systems. You will work with cutting-edge cloud technologies and automation tools.',
      requirements: [
        '3+ years of DevOps/Infrastructure experience',
        'Strong knowledge of AWS/Azure/GCP',
        'Experience with containerization (Docker, Kubernetes)',
        'Proficiency in Infrastructure as Code (Terraform)',
        'Knowledge of CI/CD pipelines and automation'
      ],
      benefits: [
        'Cutting-edge technology stack',
        'Comprehensive health benefits',
        'Stock options and bonuses',
        'Remote work flexibility',
        'Conference and training budget'
      ],
      matchScore: 90,
      isBookmarked: false,
      isApplied: false,
      applicants: 23,
      skills: ['AWS', 'Kubernetes', 'Terraform', 'Docker']
    }
  ];

  // Mock applications data
  const applications: Application[] = [
    {
      id: '1',
      jobId: '3',
      jobTitle: 'Full Stack Engineer',
      company: 'InnovateLabs',
      appliedDate: '2024-03-15',
      status: 'interview',
      coverLetter: 'I am excited to apply for the Full Stack Engineer position...'
    },
    {
      id: '2',
      jobId: '6',
      jobTitle: 'Software Engineer',
      company: 'TechStartup',
      appliedDate: '2024-03-10',
      status: 'reviewed',
      coverLetter: 'Dear Hiring Manager, I would like to express my interest...'
    },
    {
      id: '3',
      jobId: '7',
      jobTitle: 'Frontend Developer',
      company: 'WebCorp',
      appliedDate: '2024-03-08',
      status: 'pending',
      coverLetter: 'I am writing to apply for the Frontend Developer role...'
    }
  ];

  const bookmarkedJobs = jobs.filter(job => job.isBookmarked);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesLocation = filters.location === 'any' || job.location.includes(filters.location);
    const matchesType = filters.type === 'any' || job.type === filters.type;
    const matchesExperience = filters.experience === 'any' || job.experience.includes(filters.experience);
    
    return matchesSearch && matchesLocation && matchesType && matchesExperience;
  });

  const handleApply = (job: Job) => {
    setSelectedJob(job);
    setShowApplicationDialog(true);
  };

  const submitApplication = () => {
    // In a real app, this would submit to an API
    setShowApplicationDialog(false);
    setCoverLetter('');
    setSelectedJob(null);
    // Update job status to applied
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'reviewed': return 'text-blue-600 bg-blue-50';
      case 'interview': return 'text-purple-600 bg-purple-50';
      case 'rejected': return 'text-red-600 bg-red-50';
      case 'offer': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
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
              <Search className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Job Search</h1>
              <p className="text-sm text-muted-foreground">Find your next opportunity</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="search">Job Search</TabsTrigger>
            <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Input
                        placeholder="Search jobs by title, company, or skills..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Select value={filters.location} onValueChange={(value) => setFilters(prev => ({ ...prev, location: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Location</SelectItem>
                        <SelectItem value="San Francisco">San Francisco</SelectItem>
                        <SelectItem value="New York">New York</SelectItem>
                        <SelectItem value="Los Angeles">Los Angeles</SelectItem>
                        <SelectItem value="Seattle">Seattle</SelectItem>
                        <SelectItem value="Remote">Remote</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={filters.type} onValueChange={(value) => setFilters(prev => ({ ...prev, type: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Job Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Type</SelectItem>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Remote">Remote</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={filters.experience} onValueChange={(value) => setFilters(prev => ({ ...prev, experience: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Experience</SelectItem>
                        <SelectItem value="Entry">Entry Level</SelectItem>
                        <SelectItem value="2-4">2-4 years</SelectItem>
                        <SelectItem value="5+">5+ years</SelectItem>
                        <SelectItem value="Senior">Senior Level</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={filters.salary} onValueChange={(value) => setFilters(prev => ({ ...prev, salary: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Salary Range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Salary</SelectItem>
                        <SelectItem value="60k">$60k+</SelectItem>
                        <SelectItem value="80k">$80k+</SelectItem>
                        <SelectItem value="100k">$100k+</SelectItem>
                        <SelectItem value="120k">$120k+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Search Results */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Job Listings */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">{filteredJobs.length} Jobs Found</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Sort by:</span>
                    <Select defaultValue="relevance">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="relevance">Relevance</SelectItem>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="salary">Salary</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {filteredJobs.map((job) => (
                  <Card key={job.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-start gap-4">
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-3">
                              <Building className="h-6 w-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg">{job.title}</h3>
                              <p className="text-muted-foreground">{job.company}</p>
                              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  <span>{job.location}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  <span>{job.type}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <DollarSign className="h-4 w-4" />
                                  <span>{job.salary}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 mt-3">
                                {job.skills.slice(0, 3).map((skill) => (
                                  <Badge key={skill} variant="secondary">{skill}</Badge>
                                ))}
                                {job.skills.length > 3 && (
                                  <Badge variant="outline">+{job.skills.length - 3} more</Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{job.matchScore}% match</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{job.posted}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Toggle bookmark
                              }}
                            >
                              <Bookmark className={`h-4 w-4 ${job.isBookmarked ? 'fill-current' : ''}`} />
                            </Button>
                            {job.isApplied ? (
                              <Badge variant="outline" className="text-green-600">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Applied
                              </Badge>
                            ) : (
                              <Button
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleApply(job);
                                }}
                              >
                                Apply Now
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>{job.applicants} applicants</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Job Search Tips */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Job Search Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-sm font-medium">Optimize your profile</p>
                      <p className="text-xs text-muted-foreground">Complete your profile to increase visibility</p>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <p className="text-sm font-medium">Tailor your applications</p>
                      <p className="text-xs text-muted-foreground">Customize your resume for each role</p>
                    </div>
                    <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <p className="text-sm font-medium">Network actively</p>
                      <p className="text-xs text-muted-foreground">Connect with professionals in your field</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Market Insights */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Market Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Average Salary</span>
                        <span className="text-sm font-medium">$118k</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Job Demand</span>
                        <span className="text-sm font-medium">High</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Competition</span>
                        <span className="text-sm font-medium">Medium</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="bookmarked" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bookmark className="h-5 w-5" />
                  Bookmarked Jobs ({bookmarkedJobs.length})
                </CardTitle>
                <CardDescription>Jobs you've saved for later</CardDescription>
              </CardHeader>
              <CardContent>
                {bookmarkedJobs.length > 0 ? (
                  <div className="space-y-4">
                    {bookmarkedJobs.map((job) => (
                      <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{job.title}</h4>
                          <p className="text-sm text-muted-foreground">{job.company} • {job.location}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline">{job.matchScore}% match</Badge>
                            <Badge variant="secondary">{job.type}</Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" onClick={() => handleApply(job)}>
                            Apply
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Bookmark className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No bookmarked jobs yet</p>
                    <p className="text-sm text-muted-foreground">Save jobs you're interested in to view them here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  My Applications ({applications.length})
                </CardTitle>
                <CardDescription>Track your job application status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applications.map((application) => (
                    <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{application.jobTitle}</h4>
                        <p className="text-sm text-muted-foreground">{application.company}</p>
                        <p className="text-xs text-muted-foreground">Applied on {new Date(application.appliedDate).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(application.status)}>
                          {application.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Profile Strength
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">87%</div>
                    <p className="text-sm text-muted-foreground">Very Strong</p>
                    <Progress value={87} className="mt-3" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Profile Views
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold">124</div>
                    <p className="text-sm text-muted-foreground">This month</p>
                    <p className="text-xs text-green-600 mt-1">+15% from last month</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Application Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold">23%</div>
                    <p className="text-sm text-muted-foreground">Response rate</p>
                    <p className="text-xs text-blue-600 mt-1">Above average</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recommended Actions</CardTitle>
                <CardDescription>Improve your job search success</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Update your resume</p>
                      <p className="text-sm text-muted-foreground">Add recent projects and skills</p>
                    </div>
                    <Button size="sm" variant="outline">Update</Button>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <Users className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">Expand your network</p>
                      <p className="text-sm text-muted-foreground">Connect with industry professionals</p>
                    </div>
                    <Button size="sm" variant="outline">Connect</Button>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <Star className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-medium">Get skill certifications</p>
                      <p className="text-sm text-muted-foreground">Stand out with verified skills</p>
                    </div>
                    <Button size="sm" variant="outline">Browse</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Application Dialog */}
      <Dialog open={showApplicationDialog} onOpenChange={setShowApplicationDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Apply for {selectedJob?.title}</DialogTitle>
            <DialogDescription>
              {selectedJob?.company} • {selectedJob?.location}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium">Cover Letter</label>
              <Textarea
                placeholder="Write a compelling cover letter..."
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                className="mt-2 min-h-32"
              />
            </div>
            <div className="flex items-center gap-2 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <FileText className="h-5 w-5 text-blue-600" />
              <div className="flex-1">
                <p className="font-medium">Resume attached</p>
                <p className="text-sm text-muted-foreground">Your current resume will be sent with this application</p>
              </div>
              <Button variant="outline" size="sm">Change</Button>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowApplicationDialog(false)}>
                Cancel
              </Button>
              <Button onClick={submitApplication}>
                <Send className="h-4 w-4 mr-2" />
                Submit Application
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}