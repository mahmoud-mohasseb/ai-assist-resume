import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  Briefcase, 
  Users, 
  Target, 
  Eye, 
  EyeOff, 
  Mail, 
  Building, 
  MapPin, 
  Clock,
  Sparkles,
  Shield,
  Zap,
  Chrome
} from 'lucide-react';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'recruiter' | 'candidate';
  company?: string;
  position?: string;
  location?: string;
  experience?: string;
  avatar?: string;
  verified: boolean;
  joinedDate: string;
  lastActive: string;
}

interface AuthSystemProps {
  onLogin: (user: User) => void;
}

type AuthMode = 'login' | 'register';
type UserRole = 'recruiter' | 'candidate';

export function AuthSystem({ onLogin }: AuthSystemProps) {
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [selectedRole, setSelectedRole] = useState<UserRole>('candidate');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (authMode === 'register' && !name)) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Create user object
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: authMode === 'login' ? email.split('@')[0] : name,
      role: selectedRole,
      company: selectedRole === 'recruiter' ? company : undefined,
      position,
      location,
      experience,
      verified: true,
      joinedDate: new Date().toISOString(),
      lastActive: new Date().toISOString()
    };
    
    setIsLoading(false);
    onLogin(user);
  };

  const handleGoogleAuth = async () => {
    setIsGoogleLoading(true);
    
    // Simulate Google OAuth flow
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create user object from Google data
    const user: User = {
      id: 'google-' + Math.random().toString(36).substr(2, 9),
      email: 'user@gmail.com',
      name: 'John Doe',
      role: selectedRole,
      verified: true,
      joinedDate: new Date().toISOString(),
      lastActive: new Date().toISOString()
    };
    
    setIsGoogleLoading(false);
    onLogin(user);
  };

  const demoLogin = (role: UserRole) => {
    const demoUsers = {
      recruiter: {
        id: 'demo-recruiter',
        email: 'sarah.chen@techcorp.com',
        name: 'Sarah Chen',
        role: 'recruiter' as const,
        company: 'TechCorp Industries',
        position: 'Senior Talent Acquisition Manager',
        location: 'San Francisco, CA',
        verified: true,
        joinedDate: '2023-01-15T00:00:00.000Z',
        lastActive: new Date().toISOString()
      },
      candidate: {
        id: 'demo-candidate',
        email: 'alex.morgan@email.com',
        name: 'Alex Morgan',
        role: 'candidate' as const,
        position: 'Senior Software Engineer',
        location: 'New York, NY',
        experience: '5-7 years',
        verified: true,
        joinedDate: '2023-03-20T00:00:00.000Z',
        lastActive: new Date().toISOString()
      }
    };
    
    onLogin(demoUsers[role]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding & Features */}
        <div className="space-y-8">
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-4 shadow-lg">
                <Briefcase className="h-10 w-10 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  TalentFlow
                </h1>
                <p className="text-lg text-muted-foreground mt-1">
                  Your intelligent career companion
                </p>
              </div>
            </div>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0">
              Transform your career journey with AI-powered interviews, resume optimization, 
              and intelligent matching for both recruiters and candidates.
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 p-2 rounded-lg">
                  <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold">Smart Interviews</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-powered interview simulations with real-time feedback and scoring
              </p>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 p-2 rounded-lg">
                  <Target className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold">Resume Optimization</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-enhanced resume tailoring for maximum ATS compatibility
              </p>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 p-2 rounded-lg">
                  <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold">Smart Matching</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Intelligent candidate-job matching based on skills and culture fit
              </p>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-gradient-to-r from-orange-100 to-orange-200 dark:from-orange-900 dark:to-orange-800 p-2 rounded-lg">
                  <Sparkles className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="font-semibold">Career Insights</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Personalized career recommendations and market analytics
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Authentication Form */}
        <div className="w-full max-w-md mx-auto">
          <Card className="backdrop-blur-sm bg-white/95 dark:bg-gray-800/95 border border-white/20 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Welcome to TalentFlow</CardTitle>
              <CardDescription>
                Sign in to your account or create a new one
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={authMode} onValueChange={(value: string) => setAuthMode(value as AuthMode)}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Sign In</TabsTrigger>
                  <TabsTrigger value="register">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-4">
                  {/* Google Sign In */}
                  <div className="space-y-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
                      onClick={handleGoogleAuth}
                      disabled={isGoogleLoading}
                    >
                      {isGoogleLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
                          Signing in with Google...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Chrome className="h-5 w-5 text-blue-600" />
                          Continue with Google
                        </div>
                      )}
                    </Button>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white dark:bg-gray-800 px-2 text-muted-foreground">
                          Or continue with
                        </span>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Shield className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your password"
                          className="pl-10 pr-10"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-1 top-1 h-7 w-7 p-0"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" disabled={isLoading}>
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Signing in...
                        </div>
                      ) : (
                        'Sign In'
                      )}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="register" className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>I am a...</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          type="button"
                          variant={selectedRole === 'candidate' ? 'default' : 'outline'}
                          onClick={() => setSelectedRole('candidate')}
                          className="justify-start"
                        >
                          <Target className="h-4 w-4 mr-2" />
                          Candidate
                        </Button>
                        <Button
                          type="button"
                          variant={selectedRole === 'recruiter' ? 'default' : 'outline'}
                          onClick={() => setSelectedRole('recruiter')}
                          className="justify-start"
                        >
                          <Users className="h-4 w-4 mr-2" />
                          Recruiter
                        </Button>
                      </div>
                    </div>
                    
                    {/* Google Sign Up */}
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
                      onClick={handleGoogleAuth}
                      disabled={isGoogleLoading}
                    >
                      {isGoogleLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
                          Signing up with Google...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Chrome className="h-5 w-5 text-blue-600" />
                          Sign up with Google
                        </div>
                      )}
                    </Button>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white dark:bg-gray-800 px-2 text-muted-foreground">
                          Or create account with
                        </span>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="New York, NY"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="reg-email">Email</Label>
                        <Input
                          id="reg-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          required
                        />
                      </div>

                      {selectedRole === 'recruiter' && (
                        <div className="space-y-2">
                          <Label htmlFor="company">Company</Label>
                          <Input
                            id="company"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder="Acme Corp"
                          />
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-2">
                          <Label htmlFor="position">Position</Label>
                          <Input
                            id="position"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                            placeholder="Software Engineer"
                          />
                        </div>
                        {selectedRole === 'candidate' && (
                          <div className="space-y-2">
                            <Label htmlFor="experience">Experience</Label>
                            <Select value={experience} onValueChange={setExperience}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="0-1">0-1 years</SelectItem>
                                <SelectItem value="2-4">2-4 years</SelectItem>
                                <SelectItem value="5-7">5-7 years</SelectItem>
                                <SelectItem value="8-12">8-12 years</SelectItem>
                                <SelectItem value="12+">12+ years</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="reg-password">Password</Label>
                        <Input
                          id="reg-password"
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Create a password"
                          required
                        />
                      </div>

                      <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" disabled={isLoading}>
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Creating account...
                          </div>
                        ) : (
                          'Create Account'
                        )}
                      </Button>
                    </form>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-6">
                <Separator className="my-4" />
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-3">Try a demo account</p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => demoLogin('candidate')}
                      className="flex-1 hover:bg-blue-50 hover:border-blue-300 dark:hover:bg-blue-900/30"
                    >
                      <Target className="h-4 w-4 mr-2" />
                      Demo Candidate
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => demoLogin('recruiter')}
                      className="flex-1 hover:bg-purple-50 hover:border-purple-300 dark:hover:bg-purple-900/30"
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Demo Recruiter
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}