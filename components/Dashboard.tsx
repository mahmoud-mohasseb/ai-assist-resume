import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  User, 
  TrendingUp, 
  Calendar, 
  Clock, 
  MapPin, 
  Mail, 
  Phone,
  Building,
  Target,
  Users,
  FileText,
  BarChart3,
  Star,
  Award,
  Briefcase,
  GraduationCap,
  Zap,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  Eye,
  Download,
  Filter,
  Search,
  Plus,
  MessageSquare,
  Video,
  BookOpen,
  DollarSign,
  Globe,
  CreditCard
} from 'lucide-react';
import { User as UserType } from './AuthSystem';

interface DashboardProps {
  user: UserType;
  onModeChange: (mode: string) => void;
  onLogout: () => void;
}

interface JobPost {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  posted: string;
  applicants: number;
  status: 'active' | 'closed' | 'draft';
}

interface Candidate {
  id: string;
  name: string;
  position: string;
  experience: string;
  location: string;
  skills: string[];
  matchScore: number;
  status: 'new' | 'reviewed' | 'interviewed' | 'hired' | 'rejected';
  avatar?: string;
}

export function Dashboard({ user, onModeChange, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const recentJobs: JobPost[] = [
    {
      id: '1',
      title: 'Senior Software Engineer',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      salary: '$120k - $180k',
      type: 'Full-time',
      posted: '2 days ago',
      applicants: 24,
      status: 'active'
    },
    {
      id: '2',
      title: 'Product Manager',
      company: 'InnovateLabs',
      location: 'Remote',
      salary: '$100k - $150k',
      type: 'Full-time',
      posted: '1 week ago',
      applicants: 45,
      status: 'active'
    }
  ];

  const topCandidates: Candidate[] = [
    {
      id: '1',
      name: 'Emily Rodriguez',
      position: 'Senior Frontend Developer',
      experience: '6 years',
      location: 'Austin, TX',
      skills: ['React', 'TypeScript', 'Node.js'],
      matchScore: 95,
      status: 'new'
    },
    {
      id: '2',
      name: 'Michael Chen',
      position: 'Full Stack Engineer',
      experience: '4 years',
      location: 'Seattle, WA',
      skills: ['Python', 'React', 'AWS'],
      matchScore: 89,
      status: 'reviewed'
    }
  ];

  const recommendedJobs = [
    {
      id: '1',
      title: 'Senior React Developer',
      company: 'StartupXYZ',
      location: 'New York, NY',
      salary: '$130k - $160k',
      matchScore: 94,
      posted: '1 day ago'
    },
    {
      id: '2',
      title: 'Frontend Lead',
      company: 'TechGiant',
      location: 'Remote',
      salary: '$140k - $180k',
      matchScore: 87,
      posted: '3 days ago'
    }
  ];

  const skillGaps = [
    { skill: 'Machine Learning', current: 60, target: 85 },
    { skill: 'System Design', current: 70, target: 90 },
    { skill: 'Leadership', current: 50, target: 80 }
  ];

  const QuickActions = () => (
    <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-white/95 to-blue-50/50 dark:from-gray-800/95 dark:to-blue-900/30 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-lg">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg p-2 shadow-md">
            <Zap className="h-5 w-5 text-white" />
          </div>
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="grid grid-cols-1 gap-3">
          {user.role === 'recruiter' ? (
            <>
              <button 
                className="group flex items-start gap-3 p-4 rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/70 dark:bg-gray-800/70 hover:bg-white dark:hover:bg-gray-750 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 cursor-pointer text-left backdrop-blur-sm transform hover:scale-105"
                onClick={() => onModeChange('recruiter-interview')}
              >
                <div className="bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg p-2 group-hover:from-blue-200 group-hover:to-blue-300 dark:group-hover:from-blue-900/50 dark:group-hover:to-blue-800/50 transition-all duration-300 shadow-sm">
                  <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">Interview</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">Conduct AI interview</p>
                </div>
              </button>

              <button 
                className="group flex items-start gap-3 p-4 rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/70 dark:bg-gray-800/70 hover:bg-white dark:hover:bg-gray-750 hover:shadow-lg hover:border-green-300 dark:hover:border-green-600 transition-all duration-300 cursor-pointer text-left backdrop-blur-sm transform hover:scale-105"
                onClick={() => onModeChange('job-management')}
              >
                <div className="bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-lg p-2 group-hover:from-green-200 group-hover:to-green-300 dark:group-hover:from-green-900/50 dark:group-hover:to-green-800/50 transition-all duration-300 shadow-sm">
                  <Plus className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors">Post Job</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">Create new posting</p>
                </div>
              </button>

              <button 
                className="group flex items-start gap-3 p-4 rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/70 dark:bg-gray-800/70 hover:bg-white dark:hover:bg-gray-750 hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 cursor-pointer text-left backdrop-blur-sm transform hover:scale-105"
                onClick={() => onModeChange('candidate-search')}
              >
                <div className="bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-lg p-2 group-hover:from-purple-200 group-hover:to-purple-300 dark:group-hover:from-purple-900/50 dark:group-hover:to-purple-800/50 transition-all duration-300 shadow-sm">
                  <Search className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">Find Talent</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">Search candidates</p>
                </div>
              </button>

              <button 
                className="group flex items-start gap-3 p-4 rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/70 dark:bg-gray-800/70 hover:bg-white dark:hover:bg-gray-750 hover:shadow-lg hover:border-orange-300 dark:hover:border-orange-600 transition-all duration-300 cursor-pointer text-left backdrop-blur-sm transform hover:scale-105"
                onClick={() => onModeChange('analytics')}
              >
                <div className="bg-gradient-to-r from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 rounded-lg p-2 group-hover:from-orange-200 group-hover:to-orange-300 dark:group-hover:from-orange-900/50 dark:group-hover:to-orange-800/50 transition-all duration-300 shadow-sm">
                  <BarChart3 className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-orange-700 dark:group-hover:text-orange-300 transition-colors">Analytics</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">View insights</p>
                </div>
              </button>

              <button 
                className="group flex items-start gap-3 p-4 rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/70 dark:bg-gray-800/70 hover:bg-white dark:hover:bg-gray-750 hover:shadow-lg hover:border-pink-300 dark:hover:border-pink-600 transition-all duration-300 cursor-pointer text-left backdrop-blur-sm transform hover:scale-105"
                onClick={() => onModeChange('payment-plans')}
              >
                <div className="bg-gradient-to-r from-pink-100 to-pink-200 dark:from-pink-900/30 dark:to-pink-800/30 rounded-lg p-2 group-hover:from-pink-200 group-hover:to-pink-300 dark:group-hover:from-pink-900/50 dark:group-hover:to-pink-800/50 transition-all duration-300 shadow-sm">
                  <CreditCard className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-pink-700 dark:group-hover:text-pink-300 transition-colors">Upgrade Plan</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">Manage subscription</p>
                </div>
              </button>
            </>
          ) : (
            <>
              <button 
                className="group flex items-start gap-3 p-4 rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/70 dark:bg-gray-800/70 hover:bg-white dark:hover:bg-gray-750 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 cursor-pointer text-left backdrop-blur-sm transform hover:scale-105"
                onClick={() => onModeChange('candidate-resume')}
              >
                <div className="bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg p-2 group-hover:from-blue-200 group-hover:to-blue-300 dark:group-hover:from-blue-900/50 dark:group-hover:to-blue-800/50 transition-all duration-300 shadow-sm">
                  <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">Optimize Resume</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">AI resume tailoring</p>
                </div>
              </button>

              <button 
                className="group flex items-start gap-3 p-4 rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/70 dark:bg-gray-800/70 hover:bg-white dark:hover:bg-gray-750 hover:shadow-lg hover:border-green-300 dark:hover:border-green-600 transition-all duration-300 cursor-pointer text-left backdrop-blur-sm transform hover:scale-105"
                onClick={() => onModeChange('candidate-assessment')}
              >
                <div className="bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-lg p-2 group-hover:from-green-200 group-hover:to-green-300 dark:group-hover:from-green-900/50 dark:group-hover:to-green-800/50 transition-all duration-300 shadow-sm">
                  <Target className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors">Mock Interview</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">Practice & assess</p>
                </div>
              </button>

              <button 
                className="group flex items-start gap-3 p-4 rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/70 dark:bg-gray-800/70 hover:bg-white dark:hover:bg-gray-750 hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-300 cursor-pointer text-left backdrop-blur-sm transform hover:scale-105"
                onClick={() => onModeChange('cover-letter')}
              >
                <div className="bg-gradient-to-r from-indigo-100 to-indigo-200 dark:from-indigo-900/30 dark:to-indigo-800/30 rounded-lg p-2 group-hover:from-indigo-200 group-hover:to-indigo-300 dark:group-hover:from-indigo-900/50 dark:group-hover:to-indigo-800/50 transition-all duration-300 shadow-sm">
                  <FileText className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">AI Cover Letter</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">Generate & optimize</p>
                </div>
              </button>

              <button 
                className="group flex items-start gap-3 p-4 rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/70 dark:bg-gray-800/70 hover:bg-white dark:hover:bg-gray-750 hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 cursor-pointer text-left backdrop-blur-sm transform hover:scale-105"
                onClick={() => onModeChange('job-search')}
              >
                <div className="bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-lg p-2 group-hover:from-purple-200 group-hover:to-purple-300 dark:group-hover:from-purple-900/50 dark:group-hover:to-purple-800/50 transition-all duration-300 shadow-sm">
                  <Search className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">Find Jobs</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">Explore opportunities</p>
                </div>
              </button>

              <button 
                className="group flex items-start gap-3 p-4 rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/70 dark:bg-gray-800/70 hover:bg-white dark:hover:bg-gray-750 hover:shadow-lg hover:border-orange-300 dark:hover:border-orange-600 transition-all duration-300 cursor-pointer text-left backdrop-blur-sm transform hover:scale-105"
                onClick={() => onModeChange('skills-analysis')}
              >
                <div className="bg-gradient-to-r from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30 rounded-lg p-2 group-hover:from-orange-200 group-hover:to-orange-300 dark:group-hover:from-orange-900/50 dark:group-hover:to-orange-800/50 transition-all duration-300 shadow-sm">
                  <TrendingUp className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-orange-700 dark:group-hover:text-orange-300 transition-colors">Skills Gap</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">Analyze & improve</p>
                </div>
              </button>

              <button 
                className="group flex items-start gap-3 p-4 rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/70 dark:bg-gray-800/70 hover:bg-white dark:hover:bg-gray-750 hover:shadow-lg hover:border-pink-300 dark:hover:border-pink-600 transition-all duration-300 cursor-pointer text-left backdrop-blur-sm transform hover:scale-105"
                onClick={() => onModeChange('payment-plans')}
              >
                <div className="bg-gradient-to-r from-pink-100 to-pink-200 dark:from-pink-900/30 dark:to-pink-800/30 rounded-lg p-2 group-hover:from-pink-200 group-hover:to-pink-300 dark:group-hover:from-pink-900/50 dark:group-hover:to-pink-800/50 transition-all duration-300 shadow-sm">
                  <CreditCard className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-pink-700 dark:group-hover:text-pink-300 transition-colors">Upgrade Plan</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">Manage subscription</p>
                </div>
              </button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const StatsCards = () => {
    if (user.role === 'recruiter') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-white/95 to-blue-50/50 dark:from-gray-800/95 dark:to-blue-900/30 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Jobs</p>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-xs text-green-600">+2 this week</p>
                </div>
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-xl shadow-md">
                  <Briefcase className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-white/95 to-green-50/50 dark:from-gray-800/95 dark:to-green-900/30 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Applications</p>
                  <p className="text-2xl font-bold">248</p>
                  <p className="text-xs text-blue-600">+15% this month</p>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-xl shadow-md">
                  <Users className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-white/95 to-orange-50/50 dark:from-gray-800/95 dark:to-orange-900/30 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Interviews Scheduled</p>
                  <p className="text-2xl font-bold">18</p>
                  <p className="text-xs text-orange-600">5 this week</p>
                </div>
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-xl shadow-md">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-white/95 to-purple-50/50 dark:from-gray-800/95 dark:to-purple-900/30 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Hires Made</p>
                  <p className="text-2xl font-bold">6</p>
                  <p className="text-xs text-purple-600">2 this month</p>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl shadow-md">
                  <Award className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    } else {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-white/95 to-blue-50/50 dark:from-gray-800/95 dark:to-blue-900/30 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Applications Sent</p>
                  <p className="text-2xl font-bold">14</p>
                  <p className="text-xs text-green-600">3 this week</p>
                </div>
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-xl shadow-md">
                  <FileText className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-white/95 to-green-50/50 dark:from-gray-800/95 dark:to-green-900/30 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Interview Invites</p>
                  <p className="text-2xl font-bold">5</p>
                  <p className="text-xs text-blue-600">2 pending</p>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-xl shadow-md">
                  <Video className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-white/95 to-orange-50/50 dark:from-gray-800/95 dark:to-orange-900/30 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Profile Views</p>
                  <p className="text-2xl font-bold">89</p>
                  <p className="text-xs text-orange-600">+12 this week</p>
                </div>
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-xl shadow-md">
                  <Eye className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-white/95 to-purple-50/50 dark:from-gray-800/95 dark:to-purple-900/30 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Skill Score</p>
                  <p className="text-2xl font-bold">87%</p>
                  <p className="text-xs text-purple-600">+5% improvement</p>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl shadow-md">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-2 shadow-lg">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">TalentFlow</h1>
                <p className="text-sm text-muted-foreground">
                  Welcome back, {user.name}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => onModeChange('notifications')} className="hover:bg-blue-50 dark:hover:bg-blue-900/30">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onModeChange('settings')} className="hover:bg-blue-50 dark:hover:bg-blue-900/30">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={onLogout} className="hover:bg-red-50 dark:hover:bg-red-900/30">
                <LogOut className="h-4 w-4" />
              </Button>
              <Avatar className="ring-2 ring-blue-500/20 ring-offset-2 dark:ring-offset-gray-900">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* User Profile Card */}
            <Card className="bg-gradient-to-br from-white/95 to-blue-50/50 dark:from-gray-800/95 dark:to-blue-900/30 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-16 w-16 ring-2 ring-blue-500/20 ring-offset-2 dark:ring-offset-gray-800">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="text-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.position}</p>
                    <Badge variant="secondary" className="mt-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 dark:from-blue-900/30 dark:to-purple-900/30 dark:text-blue-300">
                      {user.role === 'recruiter' ? 'Recruiter' : 'Candidate'}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  {user.company && (
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span>{user.company}</span>
                    </div>
                  )}
                  {user.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{user.location}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{user.email}</span>
                  </div>
                  {user.experience && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{user.experience} experience</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <QuickActions />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <StatsCards />

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {user.role === 'recruiter' ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Job Posts */}
                    <Card className="bg-gradient-to-br from-white/95 to-blue-50/50 dark:from-gray-800/95 dark:to-blue-900/30 backdrop-blur-sm border-0 shadow-lg">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>Recent Job Posts</CardTitle>
                          <Button variant="outline" size="sm" onClick={() => onModeChange('job-management')} className="hover:bg-green-50 hover:border-green-300 dark:hover:bg-green-900/30">
                            <Plus className="h-4 w-4 mr-2" />
                            New Job
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {recentJobs.map((job) => (
                            <div key={job.id} className="flex items-center justify-between p-3 border border-gray-200/50 dark:border-gray-700/50 rounded-lg hover:bg-white/50 dark:hover:bg-gray-750/50 transition-colors cursor-pointer">
                              <div>
                                <h4 className="font-medium">{job.title}</h4>
                                <p className="text-sm text-muted-foreground">{job.location}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge variant="outline">{job.applicants} applicants</Badge>
                                  <Badge variant={job.status === 'active' ? 'default' : 'secondary'}>
                                    {job.status}
                                  </Badge>
                                </div>
                              </div>
                              <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Top Candidates */}
                    <Card className="bg-gradient-to-br from-white/95 to-purple-50/50 dark:from-gray-800/95 dark:to-purple-900/30 backdrop-blur-sm border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle>Top Candidates</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {topCandidates.map((candidate) => (
                            <div key={candidate.id} className="flex items-center justify-between p-3 border border-gray-200/50 dark:border-gray-700/50 rounded-lg hover:bg-white/50 dark:hover:bg-gray-750/50 transition-colors cursor-pointer">
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage src={candidate.avatar} />
                                  <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <h4 className="font-medium">{candidate.name}</h4>
                                  <p className="text-sm text-muted-foreground">{candidate.position}</p>
                                  <div className="flex items-center gap-1 mt-1">
                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                    <span className="text-xs">{candidate.matchScore}% match</span>
                                  </div>
                                </div>
                              </div>
                              <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recommended Jobs */}
                    <Card className="bg-gradient-to-br from-white/95 to-blue-50/50 dark:from-gray-800/95 dark:to-blue-900/30 backdrop-blur-sm border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle>Recommended Jobs</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {recommendedJobs.map((job) => (
                            <div key={job.id} className="flex items-center justify-between p-3 border border-gray-200/50 dark:border-gray-700/50 rounded-lg hover:bg-white/50 dark:hover:bg-gray-750/50 transition-colors cursor-pointer">
                              <div>
                                <h4 className="font-medium">{job.title}</h4>
                                <p className="text-sm text-muted-foreground">{job.company} • {job.location}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge variant="outline">{job.salary}</Badge>
                                  <div className="flex items-center gap-1">
                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                    <span className="text-xs">{job.matchScore}% match</span>
                                  </div>
                                </div>
                              </div>
                              <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Skills Gap Analysis */}
                    <Card className="bg-gradient-to-br from-white/95 to-orange-50/50 dark:from-gray-800/95 dark:to-orange-900/30 backdrop-blur-sm border-0 shadow-lg">
                      <CardHeader>
                        <CardTitle>Skills Gap Analysis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {skillGaps.map((skill, index) => (
                            <div key={index} className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-medium">{skill.skill}</span>
                                <span className="text-xs text-muted-foreground">{skill.current}% / {skill.target}%</span>
                              </div>
                              <div className="relative">
                                <Progress value={skill.current} className="h-2" />
                                <div 
                                  className="absolute top-0 h-2 w-1 bg-red-500 rounded"
                                  style={{ left: `${skill.target}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="activity" className="space-y-6">
                <Card className="bg-gradient-to-br from-white/95 to-blue-50/50 dark:from-gray-800/95 dark:to-blue-900/30 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Activity timeline will be displayed here.</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="insights" className="space-y-6">
                <Card className="bg-gradient-to-br from-white/95 to-purple-50/50 dark:from-gray-800/95 dark:to-purple-900/30 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>AI Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">AI-powered insights and recommendations will be displayed here.</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="resources" className="space-y-6">
                <Card className="bg-gradient-to-br from-white/95 to-green-50/50 dark:from-gray-800/95 dark:to-green-900/30 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Learning Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Curated learning resources and career development materials will be displayed here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}