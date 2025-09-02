import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { 
  ArrowLeft,
  Search,
  MessageSquare,
  Book,
  Video,
  HelpCircle,
  Users,
  Settings,
  FileText,
  Target,
  Download,
  Mail,
  Phone,
  Clock,
  CheckCircle,
  ArrowRight,
  PlayCircle,
  ExternalLink
} from 'lucide-react';

interface HelpCenterProps {
  onBack: () => void;
}

export function HelpCenter({ onBack }: HelpCenterProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: PlayCircle,
      description: 'Learn the basics and set up your account',
      articles: [
        'How to create your account',
        'Setting up your profile',
        'Understanding user roles',
        'First interview walkthrough'
      ]
    },
    {
      id: 'interviews',
      title: 'AI Interviews',
      icon: MessageSquare,
      description: 'Everything about AI-powered interviews',
      articles: [
        'How AI interviews work',
        'Preparing for your interview',
        'Understanding feedback and scoring',
        'Interview best practices'
      ]
    },
    {
      id: 'resume',
      title: 'Resume Optimization',
      icon: FileText,
      description: 'Optimize your resume with AI assistance',
      articles: [
        'Uploading your resume',
        'Understanding ATS optimization',
        'Keyword matching explained',
        'Exporting optimized resumes'
      ]
    },
    {
      id: 'skills',
      title: 'Skills Analysis',
      icon: Target,
      description: 'Track and improve your professional skills',
      articles: [
        'How skills assessment works',
        'Understanding skill gaps',
        'Creating learning paths',
        'Tracking progress'
      ]
    },
    {
      id: 'account',
      title: 'Account & Settings',
      icon: Settings,
      description: 'Manage your account and preferences',
      articles: [
        'Profile settings',
        'Privacy controls',
        'Notification preferences',
        'Subscription management'
      ]
    },
    {
      id: 'export',
      title: 'Reports & Export',
      icon: Download,
      description: 'Generate and export professional reports',
      articles: [
        'Generating reports',
        'Export formats available',
        'Figma design exports',
        'Sharing reports'
      ]
    }
  ];

  const faqs = [
    {
      question: "How does the AI interview system work?",
      answer: "Our AI interview system uses advanced natural language processing to conduct realistic conversations. It analyzes your responses in real-time, evaluates your skills, and provides detailed feedback on your performance including communication skills, technical knowledge, and overall suitability for the role."
    },
    {
      question: "Is my data secure and private?",
      answer: "Yes, we take data security very seriously. All data is encrypted both in transit and at rest. We comply with GDPR and other privacy regulations. Your personal information and interview data are never shared with third parties without your explicit consent."
    },
    {
      question: "Can I practice interviews multiple times?",
      answer: "Absolutely! You can practice as many interviews as you want. Each session provides unique questions and scenarios, allowing you to improve your skills progressively. Your practice history is saved so you can track your improvement over time."
    },
    {
      question: "What file formats can I export my reports in?",
      answer: "You can export your reports in multiple formats including PDF, DOCX, and Markdown. We also offer Figma design file exports for design-related assessments and CSV exports for data analysis."
    },
    {
      question: "How accurate is the skills assessment?",
      answer: "Our skills assessment is highly accurate, with a 95% correlation with traditional assessment methods. The AI analyzes multiple factors including your responses, problem-solving approach, and domain knowledge to provide comprehensive skill evaluations."
    },
    {
      question: "Can recruiters see my practice sessions?",
      answer: "No, your practice sessions are completely private. Only formal assessments that you explicitly agree to share with recruiters are visible to them. You have full control over what information you share and with whom."
    },
    {
      question: "What languages are supported?",
      answer: "Currently, we support English, Spanish, French, German, and Chinese. We're continuously adding more languages based on user demand. The AI can conduct interviews and provide feedback in all supported languages."
    },
    {
      question: "How do I cancel my subscription?",
      answer: "You can cancel your subscription at any time from your account settings. Go to Billing & Subscription, and click 'Cancel Subscription'. You'll continue to have access until the end of your billing period."
    }
  ];

  const quickLinks = [
    {
      title: 'Video Tutorials',
      description: 'Watch step-by-step guides',
      icon: Video,
      link: '#tutorials'
    },
    {
      title: 'API Documentation',
      description: 'For developers and integrations',
      icon: Book,
      link: '#api-docs'
    },
    {
      title: 'Community Forum',
      description: 'Connect with other users',
      icon: Users,
      link: '#community'
    },
    {
      title: 'Status Page',
      description: 'Check system status',
      icon: CheckCircle,
      link: '#status'
    }
  ];

  const filteredCategories = categories.filter(category =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.articles.some(article => article.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
              <HelpCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Help Center</h1>
              <p className="text-sm text-muted-foreground">Find answers and get help</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How can we help you?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Search our knowledge base or browse categories to find the information you need
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <Search className="absolute left-4 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for help articles, guides, and FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 text-base rounded-xl border-2 focus:border-blue-300"
            />
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {quickLinks.map((link, index) => (
              <Card key={index} className="hover:shadow-md transition-all duration-200 cursor-pointer group">
                <CardContent className="p-4 text-center">
                  <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-2 w-fit mx-auto mb-2 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                    <link.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <h4 className="font-medium text-sm mb-1">{link.title}</h4>
                  <p className="text-xs text-muted-foreground">{link.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Tabs defaultValue="categories" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="categories">Browse Topics</TabsTrigger>
            <TabsTrigger value="faq">Popular FAQs</TabsTrigger>
          </TabsList>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map((category) => (
                <Card key={category.id} className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-2 group-hover:scale-110 transition-transform duration-300">
                        <category.icon className="h-5 w-5 text-white" />
                      </div>
                      <CardTitle className="text-lg">{category.title}</CardTitle>
                    </div>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {category.articles.slice(0, 3).map((article, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                          <ArrowRight className="h-3 w-3" />
                          {article}
                        </div>
                      ))}
                      {category.articles.length > 3 && (
                        <div className="text-sm text-blue-600 font-medium cursor-pointer hover:underline">
                          View all {category.articles.length} articles →
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {searchTerm && filteredCategories.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No results found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search terms or browse our categories above
                  </p>
                  <Button variant="outline" onClick={() => setSearchTerm('')}>
                    Clear Search
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* FAQ Tab */}
          <TabsContent value="faq" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Frequently Asked Questions</CardTitle>
                <CardDescription className="text-center">
                  Find quick answers to the most common questions about our platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="space-y-2">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`faq-${index}`} className="border rounded-lg px-4">
                      <AccordionTrigger className="text-left font-medium">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Contact Support */}
        <Card className="mt-12 border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">Still need help?</h3>
              <p className="text-muted-foreground">
                Can't find what you're looking for? Our support team is here to help
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center hover:shadow-md transition-all duration-200">
                <CardContent className="p-6">
                  <Mail className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                  <h4 className="font-semibold mb-2">Email Support</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get help via email
                  </p>
                  <Button variant="outline" className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-md transition-all duration-200">
                <CardContent className="p-6">
                  <MessageSquare className="h-8 w-8 text-green-600 mx-auto mb-4" />
                  <h4 className="font-semibold mb-2">Live Chat</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Chat with our team
                  </p>
                  <Button variant="outline" className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Start Chat
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-md transition-all duration-200">
                <CardContent className="p-6">
                  <Clock className="h-8 w-8 text-purple-600 mx-auto mb-4" />
                  <h4 className="font-semibold mb-2">Response Time</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Usually within 2 hours
                  </p>
                  <Badge variant="outline" className="w-full justify-center">
                    24/7 Support
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}