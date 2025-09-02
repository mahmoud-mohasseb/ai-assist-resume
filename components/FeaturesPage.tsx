import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  ArrowLeft,
  Brain,
  FileText,
  Target,
  BarChart3,
  Users,
  Zap,
  Shield,
  Clock,
  Globe,
  Star,
  CheckCircle,
  Sparkles,
  Briefcase,
  MessageSquare,
  Download,
  Palette,
  Bot,
  TrendingUp,
  Award,
  Rocket
} from 'lucide-react';

interface FeaturesPageProps {
  onBack: () => void;
  onGetStarted?: () => void;
}

export function FeaturesPage({ onBack, onGetStarted }: FeaturesPageProps) {
  const features = [
    {
      category: "AI-Powered Intelligence",
      items: [
        {
          icon: Brain,
          title: "AI Interview Assistant",
          description: "Advanced AI conducts realistic interviews with real-time feedback and scoring",
          benefits: ["Natural conversation flow", "Adaptive questioning", "Instant performance analysis"]
        },
        {
          icon: FileText,
          title: "Smart Resume Optimization",
          description: "AI analyzes and tailors resumes for specific job postings with keyword optimization",
          benefits: ["ATS compatibility", "Keyword matching", "Industry-specific formatting"]
        },
        {
          icon: Bot,
          title: "AI Career Coach",
          description: "Personalized career guidance with skill gap analysis and learning recommendations",
          benefits: ["Skill assessment", "Learning paths", "Market insights"]
        }
      ]
    },
    {
      category: "Professional Assessment Tools",
      items: [
        {
          icon: Target,
          title: "Skills Gap Analysis",
          description: "Comprehensive evaluation of current skills vs market demands",
          benefits: ["Market trend analysis", "Skill prioritization", "Improvement roadmap"]
        },
        {
          icon: BarChart3,
          title: "Performance Analytics",
          description: "Detailed analytics and insights on interview performance and career progress",
          benefits: ["Progress tracking", "Strength identification", "Weakness analysis"]
        },
        {
          icon: Award,
          title: "Certification Tracking",
          description: "Track and manage professional certifications and achievements",
          benefits: ["Achievement portfolio", "Expiration tracking", "Industry recognition"]
        }
      ]
    },
    {
      category: "Collaboration & Export",
      items: [
        {
          icon: Users,
          title: "Team Collaboration",
          description: "Seamless collaboration between recruiters and candidates",
          benefits: ["Real-time sharing", "Feedback system", "Progress visibility"]
        },
        {
          icon: Download,
          title: "Professional Exports",
          description: "Export reports, designs, and data in multiple professional formats",
          benefits: ["PDF/DOCX reports", "Figma design files", "CSV data exports"]
        },
        {
          icon: Palette,
          title: "Design System Export",
          description: "Export complete design systems and components for design teams",
          benefits: ["Figma integration", "CSS tokens", "Component library"]
        }
      ]
    }
  ];

  const highlights = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get interview feedback and resume optimization in seconds"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level security with GDPR compliance and data encryption"
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Support for multiple languages and international job markets"
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Practice interviews and optimize resumes anytime, anywhere"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
      {/* Header */}
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-2">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Features</h1>
              <p className="text-sm text-muted-foreground">Discover what makes our platform special</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            <h2 className="text-4xl font-bold mb-4">Powerful Features for Modern Recruitment</h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Experience the future of career development with AI-powered tools designed for both candidates and recruiters
          </p>
          
          {/* Key Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {highlights.map((highlight, index) => (
              <Card key={index} className="border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full p-3 w-fit mx-auto mb-4">
                    <highlight.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold mb-2">{highlight.title}</h3>
                  <p className="text-sm text-muted-foreground">{highlight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Detailed Features */}
        <div className="space-y-16">
          {features.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold mb-4">{section.category}</h3>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {section.items.map((feature, featureIndex) => (
                  <Card key={featureIndex} className="group hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-800">
                    <CardHeader>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-3 group-hover:scale-110 transition-transform duration-300">
                          <feature.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{feature.title}</CardTitle>
                        </div>
                      </div>
                      <CardDescription className="text-base leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {feature.benefits.map((benefit, benefitIndex) => (
                          <div key={benefitIndex} className="flex items-center gap-3">
                            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                            <span className="text-sm">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Integration Section */}
        <div className="mt-20">
          <Card className="border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20">
            <CardContent className="p-12">
              <div className="text-center">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-4 w-fit mx-auto mb-6">
                  <Rocket className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Complete Workflow Integration</h3>
                <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
                  Our platform seamlessly integrates with your existing workflow, from initial candidate screening 
                  to final hiring decisions. Experience end-to-end recruitment efficiency.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                  <div className="text-center">
                    <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-3 w-fit mx-auto mb-4">
                      <span className="text-2xl font-bold text-blue-600">1</span>
                    </div>
                    <h4 className="font-semibold mb-2">Assess & Optimize</h4>
                    <p className="text-sm text-muted-foreground">AI-powered skill assessment and resume optimization</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-purple-100 dark:bg-purple-900/30 rounded-full p-3 w-fit mx-auto mb-4">
                      <span className="text-2xl font-bold text-purple-600">2</span>
                    </div>
                    <h4 className="font-semibold mb-2">Interview & Evaluate</h4>
                    <p className="text-sm text-muted-foreground">Conduct realistic interviews with real-time feedback</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-3 w-fit mx-auto mb-4">
                      <span className="text-2xl font-bold text-green-600">3</span>
                    </div>
                    <h4 className="font-semibold mb-2">Report & Export</h4>
                    <p className="text-sm text-muted-foreground">Generate professional reports and export designs</p>
                  </div>
                </div>

                {onGetStarted && (
                  <Button 
                    onClick={onGetStarted}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl"
                  >
                    <Rocket className="h-4 w-4 mr-2" />
                    Get Started Today
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-8">Trusted by Professionals Worldwide</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-sm text-muted-foreground">Interviews Conducted</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">5K+</div>
              <div className="text-sm text-muted-foreground">Resumes Optimized</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
              <div className="text-sm text-muted-foreground">User Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Platform Availability</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}