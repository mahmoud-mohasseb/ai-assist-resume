import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Users, 
  MapPin, 
  DollarSign, 
  Clock, 
  Briefcase,
  Building,
  Calendar,
  TrendingUp,
  Star,
  Send,
  Copy,
  Share
} from 'lucide-react';

interface JobManagementProps {
  onBack: () => void;
}

interface JobPost {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  description: string;
  requirements: string[];
  benefits: string[];
  status: 'draft' | 'active' | 'closed' | 'archived';
  applicants: number;
  views: number;
  posted: string;
  deadline: string;
}

export function JobManagement({ onBack }: JobManagementProps) {
  const [activeTab, setActiveTab] = useState('active');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState<JobPost | null>(null);

  // Form state for creating new job
  const [newJob, setNewJob] = useState({
    title: '',
    department: '',
    location: '',
    type: 'full-time',
    salaryMin: '',
    salaryMax: '',
    description: '',
    requirements: '',
    benefits: '',
    deadline: ''
  });

  // Mock job data
  const jobs: JobPost[] = [
    {
      id: '1',
      title: 'Senior Software Engineer',
      department: 'Engineering',
      location: 'San Francisco, CA',
      type: 'full-time',
      salary: { min: 120000, max: 180000, currency: 'USD' },
      description: 'We are looking for a Senior Software Engineer to join our growing team...',
      requirements: ['5+ years experience', 'React/TypeScript', 'System design'],
      benefits: ['Health insurance', 'Stock options', 'Remote work'],
      status: 'active',
      applicants: 24,
      views: 156,
      posted: '2024-01-15',
      deadline: '2024-02-15'
    },
    {
      id: '2',
      title: 'Product Manager',
      department: 'Product',
      location: 'Remote',
      type: 'full-time',
      salary: { min: 100000, max: 150000, currency: 'USD' },
      description: 'Seeking an experienced Product Manager to lead our product strategy...',
      requirements: ['3+ years PM experience', 'Analytics skills', 'Leadership'],
      benefits: ['Health insurance', 'Equity', 'Flexible hours'],
      status: 'active',
      applicants: 45,
      views: 234,
      posted: '2024-01-10',
      deadline: '2024-02-10'
    },
    {
      id: '3',
      title: 'UX Designer',
      department: 'Design',
      location: 'New York, NY',
      type: 'contract',
      salary: { min: 80000, max: 120000, currency: 'USD' },
      description: 'Contract UX Designer needed for a 6-month project...',
      requirements: ['Figma expertise', 'User research', 'Portfolio'],
      benefits: ['Hourly rate', 'Project bonus'],
      status: 'draft',
      applicants: 0,
      views: 0,
      posted: '2024-01-20',
      deadline: '2024-03-01'
    }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || job.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleCreateJob = () => {
    console.log('Creating job:', newJob);
    // Here you would typically send to API
    setShowCreateForm(false);
    setNewJob({
      title: '',
      department: '',
      location: '',
      type: 'full-time',
      salaryMin: '',
      salaryMax: '',
      description: '',
      requirements: '',
      benefits: '',
      deadline: ''
    });
  };

  const JobCard = ({ job }: { job: JobPost }) => (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedJob(job)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold mb-1">{job.title}</h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Building className="h-4 w-4" />
                {job.department}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {job.location}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {job.type}
              </div>
            </div>
          </div>
          <Badge variant={
            job.status === 'active' ? 'default' :
            job.status === 'draft' ? 'secondary' :
            job.status === 'closed' ? 'destructive' : 'outline'
          }>
            {job.status}
          </Badge>
        </div>

        <div className="flex items-center gap-1 mb-4">
          <DollarSign className="h-4 w-4 text-green-600" />
          <span className="font-medium text-green-600">
            ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()}
          </span>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {job.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-blue-600" />
              <span>{job.applicants} applicants</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4 text-gray-600" />
              <span>{job.views} views</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Share className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const CreateJobForm = () => (
    <Card>
      <CardHeader>
        <CardTitle>Create New Job Posting</CardTitle>
        <CardDescription>Fill out the details for your new job posting</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Job Title</Label>
            <Input
              id="title"
              value={newJob.title}
              onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
              placeholder="e.g. Senior Software Engineer"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Select value={newJob.department} onValueChange={(value) => setNewJob({ ...newJob, department: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="product">Product</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="hr">Human Resources</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={newJob.location}
              onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
              placeholder="e.g. San Francisco, CA or Remote"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Employment Type</Label>
            <Select value={newJob.type} onValueChange={(value) => setNewJob({ ...newJob, type: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="salaryMin">Minimum Salary ($)</Label>
            <Input
              id="salaryMin"
              type="number"
              value={newJob.salaryMin}
              onChange={(e) => setNewJob({ ...newJob, salaryMin: e.target.value })}
              placeholder="80000"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="salaryMax">Maximum Salary ($)</Label>
            <Input
              id="salaryMax"
              type="number"
              value={newJob.salaryMax}
              onChange={(e) => setNewJob({ ...newJob, salaryMax: e.target.value })}
              placeholder="120000"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Job Description</Label>
          <Textarea
            id="description"
            value={newJob.description}
            onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
            placeholder="Describe the role, responsibilities, and company culture..."
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="requirements">Requirements (one per line)</Label>
          <Textarea
            id="requirements"
            value={newJob.requirements}
            onChange={(e) => setNewJob({ ...newJob, requirements: e.target.value })}
            placeholder="5+ years of experience in software development&#10;Proficiency in React and TypeScript&#10;Experience with system design"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="benefits">Benefits (one per line)</Label>
          <Textarea
            id="benefits"
            value={newJob.benefits}
            onChange={(e) => setNewJob({ ...newJob, benefits: e.target.value })}
            placeholder="Health, dental, and vision insurance&#10;Stock options&#10;Remote work options"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="deadline">Application Deadline</Label>
          <Input
            id="deadline"
            type="date"
            value={newJob.deadline}
            onChange={(e) => setNewJob({ ...newJob, deadline: e.target.value })}
          />
        </div>

        <div className="flex gap-4">
          <Button onClick={handleCreateJob} className="flex-1">
            <Send className="h-4 w-4 mr-2" />
            Publish Job
          </Button>
          <Button variant="outline" onClick={() => setShowCreateForm(false)}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  if (selectedJob) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" onClick={() => setSelectedJob(null)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1>Job Details</h1>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl">{selectedJob.title}</CardTitle>
                <CardDescription className="text-lg mt-2">
                  {selectedJob.department} • {selectedJob.location}
                </CardDescription>
              </div>
              <Badge variant={
                selectedJob.status === 'active' ? 'default' :
                selectedJob.status === 'draft' ? 'secondary' : 'destructive'
              }>
                {selectedJob.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <span className="font-medium">Salary Range</span>
                </div>
                <p className="text-xl font-bold text-green-600">
                  ${selectedJob.salary.min.toLocaleString()} - ${selectedJob.salary.max.toLocaleString()}
                </p>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">Applicants</span>
                </div>
                <p className="text-xl font-bold text-blue-600">{selectedJob.applicants}</p>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="h-5 w-5 text-purple-600" />
                  <span className="font-medium">Views</span>
                </div>
                <p className="text-xl font-bold text-purple-600">{selectedJob.views}</p>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-3">Job Description</h3>
              <p className="text-muted-foreground">{selectedJob.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Requirements</h3>
              <ul className="space-y-2">
                {selectedJob.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Benefits</h3>
              <ul className="space-y-2">
                {selectedJob.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4">
              <Button>
                <Edit className="h-4 w-4 mr-2" />
                Edit Job
              </Button>
              <Button variant="outline">
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </Button>
              <Button variant="outline">
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
              {selectedJob.status === 'active' && (
                <Button variant="destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Close Position
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showCreateForm) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" onClick={() => setShowCreateForm(false)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1>Create Job Posting</h1>
        </div>
        <CreateJobForm />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1>Job Management</h1>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
          <Button onClick={() => setShowCreateForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Job
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="active">Active ({jobs.filter(j => j.status === 'active').length})</TabsTrigger>
            <TabsTrigger value="draft">Draft ({jobs.filter(j => j.status === 'draft').length})</TabsTrigger>
            <TabsTrigger value="closed">Closed ({jobs.filter(j => j.status === 'closed').length})</TabsTrigger>
            <TabsTrigger value="all">All ({jobs.length})</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <div className="grid grid-cols-1 gap-4">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
              
              {filteredJobs.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No jobs found</h3>
                    <p className="text-muted-foreground mb-4">
                      {searchTerm ? 'Try adjusting your search terms' : 'Get started by creating your first job posting'}
                    </p>
                    {!searchTerm && (
                      <Button onClick={() => setShowCreateForm(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Job
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}