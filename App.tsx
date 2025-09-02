import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Badge } from './components/ui/badge';
import { Users, FileText, Target, Download, Briefcase } from 'lucide-react';
import { LandingPage } from './components/LandingPage';
import { AuthSystem, User } from './components/AuthSystem';
import { Dashboard } from './components/Dashboard';
import { PaymentPlans } from './components/PaymentPlans';
import { RecruiterInterviewMode } from './components/RecruiterInterviewMode';
import { CandidateResumeTailoringMode } from './components/CandidateResumeTailoringMode';
import { CandidateSelfAssessmentMode } from './components/CandidateSelfAssessmentMode';
import { ExportMode } from './components/ExportMode';
import { JobManagement } from './components/JobManagement';
import { CandidateSearch } from './components/CandidateSearch';
import { SkillsAnalysis } from './components/SkillsAnalysis';
import { JobSearch } from './components/JobSearch';
import { Analytics } from './components/Analytics';
import { CoverLetterGenerator } from './components/CoverLetterGenerator';
import { Settings } from './components/Settings';
import { Notifications } from './components/Notifications';
import { FeaturesPage } from './components/FeaturesPage';
import { AboutPage } from './components/AboutPage';
import { HelpCenter } from './components/HelpCenter';
import { ContactPage } from './components/ContactPage';
import { PrivacyPolicy } from './components/PrivacyPolicy';

type AppMode = 'landing' | 'auth' | 'dashboard' | 'payment-plans' | 'recruiter-interview' | 'candidate-resume' | 'candidate-assessment' | 'export' | 'job-management' | 'candidate-search' | 'skills-analysis' | 'job-search' | 'analytics' | 'cover-letter' | 'settings' | 'notifications' | 'features' | 'about' | 'help-center' | 'contact' | 'privacy-policy';

interface AppData {
  interviewData?: any;
  resumeData?: any;
  assessmentData?: any;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentMode, setCurrentMode] = useState<AppMode>('landing');
  const [appData, setAppData] = useState<AppData>({});

  const handleGetStarted = () => {
    setCurrentMode('auth');
  };

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    setCurrentMode('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentMode('landing');
    setAppData({});
  };

  const handleModeComplete = (mode: AppMode, data: any) => {
    setAppData(prev => ({
      ...prev,
      [`${mode.replace('-', '')}Data`]: data
    }));
    if (mode !== 'export') {
      setCurrentMode('export');
    }
  };

  const handleModeChange = (mode: string) => {
    setCurrentMode(mode as AppMode);
  };

  const handleSubscribe = (planId: string) => {
    // Handle subscription logic here
    console.log('Subscribed to plan:', planId);
    setCurrentMode('dashboard');
  };

  // Show landing page if no user is logged in and not in auth mode
  if (!user && currentMode === 'landing') {
    return <LandingPage onGetStarted={handleGetStarted} onNavigate={handleModeChange} />;
  }

  // Show authentication if no user is logged in and in auth mode
  if (!user && currentMode === 'auth') {
    return <AuthSystem onLogin={handleLogin} onBack={() => setCurrentMode('landing')} />;
  }

  // Show public pages (accessible without login)
  if (!user && (currentMode === 'features' || currentMode === 'about' || currentMode === 'help-center' || currentMode === 'contact' || currentMode === 'privacy-policy')) {
    return (
      <div className="min-h-screen bg-background">
        {/* Public Navigation Header */}
        <div className="border-b">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentMode('landing')}
              className="flex items-center gap-2"
            >
              <Briefcase className="h-4 w-4" />
              TalentFlow
            </Button>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => setCurrentMode('features')}
                className={currentMode === 'features' ? 'bg-accent' : ''}
              >
                Features
              </Button>
              <Button
                variant="ghost"
                onClick={() => setCurrentMode('about')}
                className={currentMode === 'about' ? 'bg-accent' : ''}
              >
                About
              </Button>
              <Button
                variant="ghost"
                onClick={() => setCurrentMode('help-center')}
                className={currentMode === 'help-center' ? 'bg-accent' : ''}
              >
                Help
              </Button>
              <Button
                variant="ghost"
                onClick={() => setCurrentMode('contact')}
                className={currentMode === 'contact' ? 'bg-accent' : ''}
              >
                Contact
              </Button>
              <Button onClick={handleGetStarted}>
                Get Started
                <Users className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto p-4">
          {currentMode === 'features' && (
            <FeaturesPage onBack={() => setCurrentMode('landing')} />
          )}
          {currentMode === 'about' && (
            <AboutPage onBack={() => setCurrentMode('landing')} />
          )}
          {currentMode === 'help-center' && (
            <HelpCenter onBack={() => setCurrentMode('landing')} />
          )}
          {currentMode === 'contact' && (
            <ContactPage onBack={() => setCurrentMode('landing')} />
          )}
          {currentMode === 'privacy-policy' && (
            <PrivacyPolicy onBack={() => setCurrentMode('landing')} />
          )}
        </div>
      </div>
    );
  }

  // Show dashboard by default when user is logged in
  if (user && currentMode === 'dashboard') {
    return (
      <Dashboard 
        user={user} 
        onModeChange={handleModeChange}
        onLogout={handleLogout}
      />
    );
  }

  // Show payment plans
  if (user && currentMode === 'payment-plans') {
    return (
      <PaymentPlans
        user={user}
        onBack={() => setCurrentMode('dashboard')}
        onSubscribe={handleSubscribe}
      />
    );
  }



  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentMode('dashboard')}
            className="flex items-center gap-2"
          >
            <Briefcase className="h-4 w-4" />
            TalentFlow
          </Button>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => setCurrentMode('features')}
                className={currentMode === 'features' ? 'bg-accent' : ''}
              >
                Features
              </Button>
              <Button
                variant="ghost"
                onClick={() => setCurrentMode('about')}
                className={currentMode === 'about' ? 'bg-accent' : ''}
              >
                About
              </Button>
              <Button
                variant="ghost"
                onClick={() => setCurrentMode('help-center')}
                className={currentMode === 'help-center' ? 'bg-accent' : ''}
              >
                Help
              </Button>
              <Badge variant="secondary">
                {user.name} • {user.role}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        {currentMode === 'recruiter-interview' && (
          <RecruiterInterviewMode
            onComplete={(data) => handleModeComplete('recruiter-interview', data)}
            onBack={() => setCurrentMode('dashboard')}
          />
        )}
        {currentMode === 'candidate-resume' && (
          <CandidateResumeTailoringMode
            onComplete={(data) => handleModeComplete('candidate-resume', data)}
            onBack={() => setCurrentMode('dashboard')}
          />
        )}
        {currentMode === 'candidate-assessment' && (
          <CandidateSelfAssessmentMode
            onComplete={(data) => handleModeComplete('candidate-assessment', data)}
            onBack={() => setCurrentMode('dashboard')}
          />
        )}
        {currentMode === 'job-management' && (
          <JobManagement
            onBack={() => setCurrentMode('dashboard')}
          />
        )}
        {currentMode === 'candidate-search' && (
          <CandidateSearch
            onBack={() => setCurrentMode('dashboard')}
          />
        )}
        {currentMode === 'skills-analysis' && (
          <SkillsAnalysis
            onBack={() => setCurrentMode('dashboard')}
          />
        )}
        {currentMode === 'job-search' && (
          <JobSearch
            onBack={() => setCurrentMode('dashboard')}
          />
        )}
        {currentMode === 'analytics' && (
          <Analytics
            onBack={() => setCurrentMode('dashboard')}
          />
        )}
        {currentMode === 'cover-letter' && (
          <CoverLetterGenerator
            onBack={() => setCurrentMode('dashboard')}
          />
        )}
        {currentMode === 'settings' && (
          <Settings
            user={user}
            onBack={() => setCurrentMode('dashboard')}
          />
        )}
        {currentMode === 'notifications' && (
          <Notifications
            onBack={() => setCurrentMode('dashboard')}
          />
        )}
        {currentMode === 'export' && (
          <ExportMode
            data={appData}
            onBack={() => setCurrentMode('dashboard')}
          />
        )}
        {currentMode === 'features' && (
          <FeaturesPage
            onBack={() => setCurrentMode('dashboard')}
          />
        )}
        {currentMode === 'about' && (
          <AboutPage
            onBack={() => setCurrentMode('dashboard')}
          />
        )}
        {currentMode === 'help-center' && (
          <HelpCenter
            onBack={() => setCurrentMode('dashboard')}
          />
        )}
        {currentMode === 'contact' && (
          <ContactPage
            onBack={() => setCurrentMode('dashboard')}
          />
        )}
        {currentMode === 'privacy-policy' && (
          <PrivacyPolicy
            onBack={() => setCurrentMode('dashboard')}
          />
        )}
      </div>
    </div>
  );
}