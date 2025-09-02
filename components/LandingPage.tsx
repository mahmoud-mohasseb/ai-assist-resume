import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Briefcase, 
  Users, 
  Target, 
  FileText, 
  BarChart3, 
  Search, 
  Zap, 
  Star, 
  CheckCircle, 
  ArrowRight, 
  Play, 
  TrendingUp, 
  Clock, 
  Shield, 
  Award,
  Brain,
  Rocket,
  Globe,
  Heart,
  Sparkles,
  ChevronDown,
  MessageSquare,
  Video,
  Download,
  Settings,
  Building,
  Twitter,
  Linkedin,
  Github,
  Instagram
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onNavigate: (mode: string) => void;
}

export function LandingPage({ onGetStarted, onNavigate }: LandingPageProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Interviews",
      description: "Conduct intelligent interviews with real-time evaluation and detailed feedback",
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: FileText,
      title: "Smart Resume Optimization",
      description: "AI-tailored resumes that match job requirements and pass ATS systems",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: Target,
      title: "Skills Assessment",
      description: "Comprehensive skill evaluation with personalized improvement recommendations",
      color: "from-orange-500 to-red-600"
    },
    {
      icon: Search,
      title: "Intelligent Job Matching",
      description: "Find perfect candidates or opportunities with AI-powered matching algorithms",
      color: "from-purple-500 to-pink-600"
    }
  ];

  const stats = [
    { value: "50K+", label: "Active Users", icon: Users },
    { value: "95%", label: "Success Rate", icon: TrendingUp },
    { value: "2.5x", label: "Faster Hiring", icon: Clock },
    { value: "98%", label: "Satisfaction", icon: Heart }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "HR Director at TechCorp",
      content: "This platform revolutionized our hiring process. We reduced time-to-hire by 60% while improving candidate quality.",
      avatar: "SJ"
    },
    {
      name: "Michael Chen",
      role: "Software Engineer",
      content: "The AI resume optimization helped me land my dream job. The interview practice was incredibly realistic.",
      avatar: "MC"
    },
    {
      name: "Emily Rodriguez",
      role: "Talent Acquisition Lead",
      content: "The candidate matching is phenomenal. We're finding better fits faster than ever before.",
      avatar: "ER"
    }
  ];

  const pricingPlans = [
    {
      name: "Candidate Free",
      description: "Perfect for job seekers starting out",
      price: "Free",
      period: "",
      features: [
        "AI Resume Optimization (3 per month)",
        "Basic Interview Practice", 
        "Basic Skills Assessment",
        "Job Search & Matching",
        "Email Support"
      ],
      popular: false,
      color: "from-blue-500 to-purple-600"
    },
    {
      name: "Recruiter Free",
      description: "For hiring professionals to get started",
      price: "Free",
      period: "",
      features: [
        "AI-Powered Interviews (5 per month)",
        "Basic Candidate Search",
        "Basic Analytics",
        "Email Support"
      ],
      popular: false,
      color: "from-purple-500 to-pink-600"
    },
    {
      name: "Enterprise",
      description: "For large organizations",
      price: "Custom",
      period: "",
      features: [
        "Unlimited Everything",
        "White-label Solution",
        "Custom AI Training",
        "Dedicated Support",
        "SLA Guarantees",
        "Advanced Security"
      ],
      popular: false,
      color: "from-green-500 to-emerald-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 overflow-hidden">
      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-2 shadow-lg">
                <Briefcase className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  TalentFlow
                </h1>
                <p className="text-sm text-muted-foreground">Your intelligent career companion</p>
              </div>
            </motion.div>
            
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                className="hidden md:inline-flex hover:bg-blue-50 dark:hover:bg-blue-900/30"
                onClick={() => onNavigate('features')}
              >
                Features
              </Button>
              <Button 
                variant="ghost" 
                className="hidden md:inline-flex hover:bg-blue-50 dark:hover:bg-blue-900/30"
                onClick={() => {
                  // Scroll to pricing section on current page
                  const pricingSection = document.querySelector('#pricing-section');
                  if (pricingSection) {
                    pricingSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Pricing
              </Button>
              <Button 
                variant="ghost" 
                className="hidden md:inline-flex hover:bg-blue-50 dark:hover:bg-blue-900/30"
                onClick={() => onNavigate('about')}
              >
                About
              </Button>
              <Button 
                variant="ghost" 
                className="hidden md:inline-flex hover:bg-blue-50 dark:hover:bg-blue-900/30"
                onClick={() => onNavigate('contact')}
              >
                Contact
              </Button>
              <Button onClick={onGetStarted} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
                Get Started
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700 shadow-md">
                <Sparkles className="h-3 w-3 mr-1" />
                Powered by Advanced AI
              </Badge>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Revolutionize Your
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Career Journey
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              The world's most advanced AI-powered platform for recruitment and career development.
              Transform how you hire, get hired, and grow professionally.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Button 
                size="lg" 
                onClick={onGetStarted}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                Start Free Trial
                <Rocket className="h-5 w-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-6 border-2 hover:bg-gray-50 dark:hover:bg-gray-800 group relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Play className="h-5 w-5 mr-2" />
                  Schedule Demo
                </span>
                <span className="flex items-center group-hover:opacity-0 transition-opacity duration-300">
                  <Play className="h-5 w-5 mr-2" />
                  Watch Demo
                </span>
              </Button>
            </motion.div>

            {/* Floating Stats */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <stat.icon className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-pink-400/20 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Powerful Features for Every Role
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Whether you're a recruiter looking for top talent or a candidate seeking your dream job,
              our AI-powered tools will supercharge your success.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="group"
              >
                <Card className="h-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${feature.color} p-4 shadow-lg group-hover:shadow-xl transition-all duration-500`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get started in minutes with our intuitive platform designed for maximum efficiency.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Sign Up & Set Profile",
                description: "Create your account and set up your professional profile with our guided onboarding.",
                icon: Users
              },
              {
                step: "02", 
                title: "AI Analysis & Matching",
                description: "Our AI analyzes your profile and matches you with perfect opportunities or candidates.",
                icon: Brain
              },
              {
                step: "03",
                title: "Take Action & Succeed",
                description: "Use our tools to conduct interviews, optimize resumes, and achieve your career goals.",
                icon: Award
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative mb-8">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                    <step.icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold text-gray-900 shadow-lg">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">What Our Users Say</h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of professionals who have transformed their careers with our platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
              >
                <Card className="h-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing-section" className="py-20 bg-gradient-to-r from-gray-50/50 to-blue-50/50 dark:from-gray-900/50 dark:to-blue-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Choose Your Plan</h2>
            <p className="text-xl text-muted-foreground">
              Flexible pricing designed to grow with your needs. Start free, upgrade anytime.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
                className="relative"
              >
                <Card className="h-full border-0 shadow-xl hover:shadow-2xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${plan.color} p-4 shadow-lg`}>
                      {index === 0 && <Users className="h-8 w-8 text-white" />}
                      {index === 1 && <Briefcase className="h-8 w-8 text-white" />}
                      {index === 2 && <Building className="h-8 w-8 text-white" />}
                    </div>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className="w-full shadow-lg hover:shadow-xl transition-all duration-300"
                      variant="outline"
                      onClick={onGetStarted}
                    >
                      {plan.price === "Custom" ? "Contact Sales" : "Get Started Free"}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Join thousands of professionals who have already revolutionized their career journey with our AI-powered platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={onGetStarted}
                className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                Start Your Free Trial
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Schedule Demo
                <Video className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-2 shadow-lg">
                  <Briefcase className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">TalentFlow</span>
              </div>
              <p className="text-gray-400">
                Revolutionizing recruitment and career development with the power of artificial intelligence.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => onNavigate('features')} className="hover:text-white transition-colors">Features</button></li>
                <li><button onClick={() => {
                  const pricingSection = document.querySelector('#pricing-section');
                  if (pricingSection) {
                    pricingSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }} className="hover:text-white transition-colors">Pricing</button></li>
                <li><button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">About</button></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => onNavigate('help-center')} className="hover:text-white transition-colors">Help Center</button></li>
                <li><button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">Contact Us</button></li>
                <li><button onClick={() => onNavigate('privacy-policy')} className="hover:text-white transition-colors">Privacy Policy</button></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-200">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-200">
                  <Linkedin className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-200">
                  <Github className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-200">
                  <Instagram className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TalentFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}