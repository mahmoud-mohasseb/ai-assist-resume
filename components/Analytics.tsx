import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ArrowLeft, 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Target, 
  Calendar, 
  Clock, 
  Star,
  Award,
  Briefcase,
  Eye,
  Download,
  Filter
} from 'lucide-react';

interface AnalyticsProps {
  onBack: () => void;
}

export function Analytics({ onBack }: AnalyticsProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('30d');

  // Mock analytics data
  const overviewStats = [
    {
      title: 'Total Interviews',
      value: '1,234',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Success Rate',
      value: '87.3%',
      change: '+3.2%',
      trend: 'up',
      icon: Target,
      color: 'text-green-600'
    },
    {
      title: 'Avg. Time to Hire',
      value: '14 days',
      change: '-2.1 days',
      trend: 'up',
      icon: Clock,
      color: 'text-orange-600'
    },
    {
      title: 'Candidate Satisfaction',
      value: '4.8/5',
      change: '+0.3',
      trend: 'up',
      icon: Star,
      color: 'text-purple-600'
    }
  ];

  const topPerformers = [
    { name: 'Sarah Johnson', role: 'Senior Recruiter', interviews: 45, successRate: 92 },
    { name: 'Michael Chen', role: 'Talent Acquisition', interviews: 38, successRate: 89 },
    { name: 'Emily Rodriguez', role: 'HR Manager', interviews: 32, successRate: 85 }
  ];

  const recentActivity = [
    { action: 'Interview completed', candidate: 'John Doe', time: '2 hours ago', status: 'success' },
    { action: 'Candidate hired', candidate: 'Jane Smith', time: '4 hours ago', status: 'success' },
    { action: 'Interview scheduled', candidate: 'Bob Wilson', time: '6 hours ago', status: 'pending' },
    { action: 'Resume reviewed', candidate: 'Alice Brown', time: '8 hours ago', status: 'info' }
  ];

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
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Analytics Dashboard</h1>
              <p className="text-sm text-muted-foreground">Track your performance and insights</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Time Range Filter */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant={timeRange === '7d' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange('7d')}
            >
              7 Days
            </Button>
            <Button
              variant={timeRange === '30d' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange('30d')}
            >
              30 Days
            </Button>
            <Button
              variant={timeRange === '90d' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange('90d')}
            >
              90 Days
            </Button>
            <Button
              variant={timeRange === '1y' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange('1y')}
            >
              1 Year
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {overviewStats.map((stat, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className={`text-xs flex items-center gap-1 ${
                          stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stat.trend === 'up' ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : (
                            <TrendingDown className="h-3 w-3" />
                          )}
                          {stat.change}
                        </p>
                      </div>
                      <stat.icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Performers */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Performers</CardTitle>
                  <CardDescription>Best performing team members this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topPerformers.map((performer, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div>
                          <h4 className="font-medium">{performer.name}</h4>
                          <p className="text-sm text-muted-foreground">{performer.role}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{performer.interviews} interviews</p>
                          <p className="text-sm text-green-600">{performer.successRate}% success</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest platform activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.status === 'success' ? 'bg-green-500' :
                          activity.status === 'pending' ? 'bg-yellow-500' :
                          'bg-blue-500'
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.candidate}</p>
                        </div>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Hiring Pipeline */}
            <Card>
              <CardHeader>
                <CardTitle>Hiring Pipeline</CardTitle>
                <CardDescription>Current status of your recruitment process</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {[
                    { stage: 'Applied', count: 156, color: 'bg-blue-500' },
                    { stage: 'Screening', count: 89, color: 'bg-yellow-500' },
                    { stage: 'Interview', count: 34, color: 'bg-orange-500' },
                    { stage: 'Final Round', count: 12, color: 'bg-purple-500' },
                    { stage: 'Hired', count: 8, color: 'bg-green-500' }
                  ].map((stage, index) => (
                    <div key={index} className="text-center">
                      <div className={`w-16 h-16 mx-auto rounded-full ${stage.color} flex items-center justify-center text-white font-bold text-lg mb-2`}>
                        {stage.count}
                      </div>
                      <p className="text-sm font-medium">{stage.stage}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Detailed performance analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Interview Completion Rate</span>
                      <span className="text-sm text-muted-foreground">94%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Candidate Satisfaction</span>
                      <span className="text-sm text-muted-foreground">87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Time to Hire Efficiency</span>
                      <span className="text-sm text-muted-foreground">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Quality of Hire</span>
                      <span className="text-sm text-muted-foreground">91%</span>
                    </div>
                    <Progress value={91} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Hiring Trends</CardTitle>
                <CardDescription>Analyze hiring patterns and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Advanced Charts Coming Soon</h3>
                  <p className="text-muted-foreground">
                    Interactive charts and trend analysis will be available in the next update.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Generated Reports</CardTitle>
                <CardDescription>Download and share your analytics reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Monthly Hiring Report', date: '2024-03-01', type: 'PDF' },
                    { name: 'Candidate Analytics', date: '2024-02-28', type: 'Excel' },
                    { name: 'Performance Summary', date: '2024-02-25', type: 'PDF' },
                    { name: 'Team Metrics', date: '2024-02-20', type: 'Excel' }
                  ].map((report, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{report.name}</h4>
                        <p className="text-sm text-muted-foreground">Generated on {report.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{report.type}</Badge>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}