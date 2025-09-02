import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Slider } from './ui/slider';
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Briefcase, 
  GraduationCap,
  Mail,
  Phone,
  Calendar,
  TrendingUp,
  Eye,
  MessageSquare,
  UserPlus,
  Download,
  Heart,
  Clock,
  Users,
  Target
} from 'lucide-react';

interface CandidateSearchProps {
  onBack: () => void;
}

interface Candidate {
  id: string;
  name: string;
  title: string;
  company: string;
  location: string;
  experience: string;
  education: string;
  skills: string[];
  summary: string;
  email: string;
  phone: string;
  avatar?: string;
  matchScore: number;
  salary: {
    current: number;
    expected: number;
  };
  availability: 'immediate' | '2-weeks' | '1-month' | 'flexible';
  status: 'available' | 'interviewing' | 'not-looking';
  lastActive: string;
  viewCount: number;
  responseRate: number;
}

export function CandidateSearch({ onBack }: CandidateSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    location: '',
    experience: 'any',
    skills: '',
    salary: [50000, 200000],
    availability: 'any',
    education: ''
  });

  // Mock candidate data
  const candidates: Candidate[] = [
    {
      id: '1',
      name: 'Emily Rodriguez',
      title: 'Senior Frontend Developer',
      company: 'TechCorp',
      location: 'Austin, TX',
      experience: '6 years',
      education: 'BS Computer Science, UT Austin',
      skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'],
      summary: 'Passionate frontend developer with 6 years of experience building scalable web applications. Expert in React ecosystem with strong backend knowledge.',
      email: 'emily.rodriguez@email.com',
      phone: '+1 (555) 123-4567',
      matchScore: 95,
      salary: { current: 120000, expected: 140000 },
      availability: 'flexible',
      status: 'available',
      lastActive: '2 days ago',
      viewCount: 45,
      responseRate: 85
    },
    {
      id: '2',
      name: 'Michael Chen',
      title: 'Full Stack Engineer',
      company: 'StartupABC',
      location: 'Seattle, WA',
      experience: '4 years',
      education: 'MS Software Engineering, UW',
      skills: ['Python', 'React', 'PostgreSQL', 'Docker', 'Kubernetes'],
      summary: 'Full-stack engineer with expertise in Python and modern web technologies. Strong background in DevOps and cloud infrastructure.',
      email: 'michael.chen@email.com',
      phone: '+1 (555) 987-6543',
      matchScore: 89,
      salary: { current: 95000, expected: 115000 },
      availability: '2-weeks',
      status: 'interviewing',
      lastActive: '1 day ago',
      viewCount: 32,
      responseRate: 92
    },
    {
      id: '3',
      name: 'Sarah Johnson',
      title: 'DevOps Engineer',
      company: 'CloudSystems',
      location: 'San Francisco, CA',
      experience: '5 years',
      education: 'BS Information Systems, Stanford',
      skills: ['AWS', 'Terraform', 'Kubernetes', 'Python', 'Jenkins'],
      summary: 'DevOps engineer specializing in cloud infrastructure and automation. Proven track record of improving deployment efficiency by 60%.',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 456-7890',
      matchScore: 82,
      salary: { current: 130000, expected: 155000 },
      availability: 'immediate',
      status: 'available',
      lastActive: '3 hours ago',
      viewCount: 28,
      responseRate: 78
    },
    {
      id: '4',
      name: 'David Kim',
      title: 'Mobile App Developer',
      company: 'MobileFirst Inc',
      location: 'New York, NY',
      experience: '3 years',
      education: 'BS Computer Engineering, NYU',
      skills: ['React Native', 'Swift', 'Kotlin', 'Firebase', 'Redux'],
      summary: 'Mobile developer with expertise in cross-platform development. Published 5 apps with over 100k downloads combined.',
      email: 'david.kim@email.com',
      phone: '+1 (555) 321-0987',
      matchScore: 76,
      salary: { current: 85000, expected: 105000 },
      availability: '1-month',
      status: 'not-looking',
      lastActive: '1 week ago',
      viewCount: 15,
      responseRate: 65
    }
  ];

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLocation = !filters.location || candidate.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchesExperience = !filters.experience || filters.experience === 'any' || candidate.experience.includes(filters.experience);
    const matchesSkills = !filters.skills || candidate.skills.some(skill => 
      skill.toLowerCase().includes(filters.skills.toLowerCase())
    );
    const matchesAvailability = !filters.availability || filters.availability === 'any' || candidate.availability === filters.availability;
    
    return matchesSearch && matchesLocation && matchesExperience && matchesSkills && matchesAvailability;
  });

  const CandidateCard = ({ candidate }: { candidate: Candidate }) => (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedCandidate(candidate)}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={candidate.avatar} />
            <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-lg font-semibold">{candidate.name}</h3>
                <p className="text-muted-foreground">{candidate.title}</p>
                <p className="text-sm text-muted-foreground">{candidate.company} • {candidate.location}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 mb-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{candidate.matchScore}%</span>
                </div>
                <Badge variant={
                  candidate.status === 'available' ? 'default' :
                  candidate.status === 'interviewing' ? 'secondary' : 'outline'
                }>
                  {candidate.status}
                </Badge>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {candidate.summary}
            </p>

            <div className="flex flex-wrap gap-2 mb-3">
              {candidate.skills.slice(0, 4).map((skill, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {candidate.skills.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{candidate.skills.length - 4} more
                </Badge>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  {candidate.experience}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {candidate.availability}
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" />
                  {candidate.responseRate}% response
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <MessageSquare className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const FilterPanel = () => (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Location</Label>
          <Input
            placeholder="City, State or Remote"
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label>Experience Level</Label>
          <Select value={filters.experience} onValueChange={(value) => setFilters({ ...filters, experience: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Any experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any experience</SelectItem>
              <SelectItem value="1-2">1-2 years</SelectItem>
              <SelectItem value="3-5">3-5 years</SelectItem>
              <SelectItem value="5+">5+ years</SelectItem>
              <SelectItem value="10+">10+ years</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Skills</Label>
          <Input
            placeholder="React, Python, AWS..."
            value={filters.skills}
            onChange={(e) => setFilters({ ...filters, skills: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label>Salary Range</Label>
          <div className="px-2">
            <Slider
              value={filters.salary}
              onValueChange={(value) => setFilters({ ...filters, salary: value })}
              max={300000}
              min={30000}
              step={5000}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-1">
              <span>${filters.salary[0].toLocaleString()}</span>
              <span>${filters.salary[1].toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Availability</Label>
          <Select value={filters.availability} onValueChange={(value) => setFilters({ ...filters, availability: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Any availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any availability</SelectItem>
              <SelectItem value="immediate">Immediate</SelectItem>
              <SelectItem value="2-weeks">2 weeks notice</SelectItem>
              <SelectItem value="1-month">1 month notice</SelectItem>
              <SelectItem value="flexible">Flexible</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline" className="w-full" onClick={() => setFilters({
          location: '',
          experience: 'any',
          skills: '',
          salary: [50000, 200000],
          availability: 'any',
          education: ''
        })}>
          Clear Filters
        </Button>
      </CardContent>
    </Card>
  );

  if (selectedCandidate) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" onClick={() => setSelectedCandidate(null)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1>Candidate Profile</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={selectedCandidate.avatar} />
                    <AvatarFallback className="text-xl">
                      {selectedCandidate.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-2xl font-bold">{selectedCandidate.name}</h2>
                        <p className="text-lg text-muted-foreground">{selectedCandidate.title}</p>
                        <p className="text-muted-foreground">{selectedCandidate.company}</p>
                        <div className="flex items-center gap-1 mt-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{selectedCandidate.location}</span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-2">
                          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          <span className="text-xl font-bold">{selectedCandidate.matchScore}%</span>
                        </div>
                        <Badge variant={
                          selectedCandidate.status === 'available' ? 'default' :
                          selectedCandidate.status === 'interviewing' ? 'secondary' : 'outline'
                        }>
                          {selectedCandidate.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Briefcase className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">Experience</span>
                    </div>
                    <p className="font-semibold">{selectedCandidate.experience}</p>
                  </div>
                  
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">Availability</span>
                    </div>
                    <p className="font-semibold">{selectedCandidate.availability}</p>
                  </div>
                  
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="h-4 w-4 text-purple-600" />
                      <span className="text-sm font-medium">Response Rate</span>
                    </div>
                    <p className="font-semibold">{selectedCandidate.responseRate}%</p>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">About</h3>
                    <p className="text-muted-foreground">{selectedCandidate.summary}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCandidate.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Education</h3>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedCandidate.education}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{selectedCandidate.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{selectedCandidate.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Last active: {selectedCandidate.lastActive}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Salary Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Current Salary</p>
                  <p className="font-semibold">${selectedCandidate.salary.current.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Expected Salary</p>
                  <p className="font-semibold">${selectedCandidate.salary.expected.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="outline" className="w-full">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add to Pipeline
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Resume
                </Button>
                <Button variant="outline" className="w-full">
                  <Heart className="h-4 w-4 mr-2" />
                  Save Candidate
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1>Candidate Search</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <FilterPanel />
        </div>

        {/* Search Results */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search candidates by name, title, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Found {filteredCandidates.length} candidates
            </p>
            <Select defaultValue="match">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="match">Best Match</SelectItem>
                <SelectItem value="recent">Recently Active</SelectItem>
                <SelectItem value="experience">Most Experience</SelectItem>
                <SelectItem value="salary">Salary Range</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {filteredCandidates.map((candidate) => (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
            
            {filteredCandidates.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No candidates found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search terms or filters to find more candidates
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}