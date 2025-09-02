import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  ArrowLeft,
  Target,
  Users,
  Award,
  Heart,
  Globe,
  Zap,
  Shield,
  Lightbulb,
  TrendingUp,
  Star,
  CheckCircle,
  Rocket,
  Brain,
  Building,
  Calendar
} from 'lucide-react';

interface AboutPageProps {
  onBack: () => void;
  onGetStarted?: () => void;
}

export function AboutPage({ onBack, onGetStarted }: AboutPageProps) {
  const values = [
    {
      icon: Brain,
      title: "Innovation First",
      description: "We leverage cutting-edge AI technology to solve real-world recruitment challenges and create meaningful career opportunities."
    },
    {
      icon: Users,
      title: "People-Centered",
      description: "Every feature we build puts people first - whether you're a candidate seeking growth or a recruiter finding talent."
    },
    {
      icon: Shield,
      title: "Trust & Privacy",
      description: "We maintain the highest standards of data security and privacy, ensuring your information is always protected."
    },
    {
      icon: Globe,
      title: "Inclusive Access",
      description: "We believe great talent exists everywhere and work to make career opportunities accessible to all."
    }
  ];

  const team = [
    {
      name: "Sarah Chen",
      role: "CEO & Co-Founder",
      bio: "Former VP of Engineering at TechCorp, passionate about democratizing career opportunities through AI.",
      avatar: "SC",
      linkedin: "#"
    },
    {
      name: "Michael Rodriguez",
      role: "CTO & Co-Founder",
      bio: "AI researcher with 10+ years experience in machine learning and natural language processing.",
      avatar: "MR",
      linkedin: "#"
    },
    {
      name: "Emily Johnson",
      role: "Head of Product",
      bio: "Former product leader at LinkedIn, focused on creating intuitive experiences for career development.",
      avatar: "EJ",
      linkedin: "#"
    },
    {
      name: "David Kim",
      role: "Head of AI Research",
      bio: "PhD in Computer Science, specializing in conversational AI and behavioral analysis.",
      avatar: "DK",
      linkedin: "#"
    }
  ];

  const milestones = [
    {
      year: "2022",
      title: "Founded",
      description: "AI Career Assistant was founded with a vision to revolutionize recruitment through AI"
    },
    {
      year: "2023",
      title: "First Million Users",
      description: "Reached 1M+ users across 50+ countries, conducting over 500K interviews"
    },
    {
      year: "2023",
      title: "Series A Funding",
      description: "Raised $15M Series A to accelerate AI development and global expansion"
    },
    {
      year: "2024",
      title: "Enterprise Launch",
      description: "Launched enterprise solutions, partnering with Fortune 500 companies"
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
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">About Us</h1>
              <p className="text-sm text-muted-foreground">Our mission, team, and story</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            <h2 className="text-4xl font-bold mb-6">Transforming Careers Through AI</h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            We're on a mission to democratize career opportunities by making professional development 
            and recruitment more efficient, fair, and accessible through artificial intelligence.
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="mb-16 border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20">
          <CardContent className="p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-3">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Our Mission</h3>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  To bridge the gap between talent and opportunity by providing AI-powered tools that make 
                  career development more personalized, efficient, and successful for everyone.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Eliminate bias in hiring processes</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Provide equal opportunities for all candidates</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Make professional development accessible</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
                  <div className="text-sm text-muted-foreground">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
                  <div className="text-sm text-muted-foreground">Support</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Values Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Our Core Values</h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              The principles that guide everything we do and every decision we make
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-3 group-hover:scale-110 transition-transform duration-300">
                      <value.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-3">{value.title}</h4>
                      <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Meet Our Team</h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Passionate professionals dedicated to transforming the future of work
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <Avatar className="h-20 w-20 mx-auto mb-4">
                    <AvatarImage src="#" />
                    <AvatarFallback className="text-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                      {member.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <h4 className="font-semibold text-lg mb-1">{member.name}</h4>
                  <p className="text-blue-600 text-sm mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Journey Timeline */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Our Journey</h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Key milestones in our mission to transform career development
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((milestone, index) => (
              <Card key={index} className="relative hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="absolute -top-3 left-6">
                    <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                      {milestone.year}
                    </Badge>
                  </div>
                  <div className="pt-4">
                    <h4 className="font-semibold text-lg mb-2">{milestone.title}</h4>
                    <p className="text-muted-foreground text-sm">{milestone.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <Card className="border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20">
          <CardContent className="p-12 text-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-4 w-fit mx-auto mb-6">
              <Rocket className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold mb-4">Join Our Mission</h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
              Whether you're a candidate looking to advance your career or a recruiter seeking top talent, 
              we're here to help you succeed with the power of AI.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {onGetStarted && (
                <Button 
                  onClick={onGetStarted}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl"
                >
                  <Rocket className="h-4 w-4 mr-2" />
                  Get Started Today
                </Button>
              )}
              <Button variant="outline" className="px-8 py-3 rounded-xl">
                <Building className="h-4 w-4 mr-2" />
                Contact Sales
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <div className="mt-12 text-center">
          <h4 className="font-semibold mb-4">Get in Touch</h4>
          <div className="flex flex-col sm:flex-row gap-6 justify-center text-sm text-muted-foreground">
            <div>📧 hello@aicareerassistant.com</div>
            <div>📍 San Francisco, CA</div>
            <div>🌐 Available Worldwide</div>
          </div>
        </div>
      </div>
    </div>
  );
}