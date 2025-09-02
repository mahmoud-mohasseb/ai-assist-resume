import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Separator } from './ui/separator';
import { 
  CheckCircle, 
  ArrowLeft, 
  CreditCard, 
  Lock, 
  Star, 
  Users, 
  Briefcase, 
  Building, 
  Zap,
  Shield,
  Crown,
  Sparkles,
  Calendar,
  DollarSign,
  Globe,
  MessageSquare
} from 'lucide-react';
import { User } from './AuthSystem';

interface PaymentPlansProps {
  user: User;
  onBack: () => void;
  onSubscribe: (plan: string) => void;
}

interface PlanFeature {
  name: string;
  included: boolean;
  description?: string;
}

interface Plan {
  id: string;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  period: string;
  features: PlanFeature[];
  popular: boolean;
  color: string;
  icon: React.ElementType;
  badge?: string;
}

export function PaymentPlans({ user, onBack, onSubscribe }: PaymentPlansProps) {
  const [isAnnual, setIsAnnual] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    holderName: '',
    country: '',
    zipCode: ''
  });

  const candidatePlans: Plan[] = [
    {
      id: 'candidate-free',
      name: 'Free',
      description: 'Start your career journey at no cost',
      price: '$0',
      period: '/month',
      popular: false,
      color: 'from-green-500 to-emerald-500',
      icon: Users,
      features: [
        { name: 'Basic Resume Review', included: true, description: 'Simple resume analysis and tips' },
        { name: 'Job Search Access', included: true, description: 'Browse available job listings' },
        { name: 'Skills Assessment (1/month)', included: true, description: 'Monthly basic skill evaluation' },
        { name: 'Community Support', included: true, description: 'Access to user forums' },
        { name: 'AI Resume Optimization', included: false },
        { name: 'Mock Interview Practice', included: false },
        { name: 'Advanced Career Insights', included: false },
        { name: 'Priority Support', included: false }
      ]
    },
    {
      id: 'candidate-starter',
      name: 'Starter',
      description: 'Perfect for job seekers getting started',
      price: isAnnual ? '$19' : '$25',
      originalPrice: isAnnual ? '$29' : '$35',
      period: isAnnual ? '/month (billed annually)' : '/month',
      popular: false,
      color: 'from-blue-500 to-cyan-500',
      icon: Users,
      features: [
        { name: 'Everything in Free', included: true },
        { name: 'AI Resume Optimization', included: true, description: 'Basic AI-powered resume improvements' },
        { name: 'Skills Assessment (Unlimited)', included: true, description: 'Evaluate your current skill level' },
        { name: 'Basic Analytics', included: true, description: 'Track your application performance' },
        { name: 'Email Support', included: true },
        { name: 'Mock Interview Practice', included: false },
        { name: 'Advanced Career Insights', included: false },
        { name: 'Priority Support', included: false }
      ]
    },
    {
      id: 'candidate-pro',
      name: 'Professional',
      description: 'For serious job seekers who want to excel',
      price: isAnnual ? '$39' : '$49',
      originalPrice: isAnnual ? '$59' : '$69',
      period: isAnnual ? '/month (billed annually)' : '/month',
      popular: false,
      color: 'from-purple-500 to-pink-500',
      icon: Star,
      features: [
        { name: 'Everything in Starter', included: true },
        { name: 'Advanced AI Resume Optimization', included: true, description: 'Industry-specific resume tailoring' },
        { name: 'Mock Interview Practice', included: true, description: 'Unlimited AI-powered interview practice' },
        { name: 'Advanced Career Insights', included: true, description: 'Market trends and salary data' },
        { name: 'Skill Gap Analysis', included: true, description: 'Identify areas for improvement' },
        { name: 'Priority Support', included: true, description: '24/7 chat and email support' },
        { name: 'Profile Optimization', included: true },
        { name: 'Custom Cover Letters', included: true }
      ]
    },
    {
      id: 'candidate-premium',
      name: 'Premium',
      description: 'For executives and senior professionals',
      price: isAnnual ? '$79' : '$99',
      originalPrice: isAnnual ? '$119' : '$149',
      period: isAnnual ? '/month (billed annually)' : '/month',
      popular: false,
      color: 'from-yellow-500 to-orange-500',
      icon: Crown,
      badge: 'Executive',
      features: [
        { name: 'Everything in Professional', included: true },
        { name: '1-on-1 Career Coaching', included: true, description: 'Monthly sessions with career experts' },
        { name: 'Executive Resume Writing', included: true, description: 'Professional writer assistance' },
        { name: 'Salary Negotiation Support', included: true },
        { name: 'LinkedIn Profile Optimization', included: true },
        { name: 'Interview Coaching', included: true, description: 'Live coaching sessions' },
        { name: 'Network Building Tools', included: true },
        { name: 'White-glove Support', included: true }
      ]
    }
  ];

  const recruiterPlans: Plan[] = [
    {
      id: 'recruiter-free',
      name: 'Free',
      description: 'Try our platform with basic features',
      price: '$0',
      period: '/month',
      popular: false,
      color: 'from-green-500 to-emerald-500',
      icon: Users,
      features: [
        { name: 'AI-Powered Interviews (5/month)', included: true, description: 'Limited monthly interviews' },
        { name: 'Basic Candidate Search', included: true, description: 'Simple search functionality' },
        { name: 'Job Posting (1 active)', included: true, description: 'One active job at a time' },
        { name: 'Community Support', included: true, description: 'Access to user forums' },
        { name: 'Advanced Analytics', included: false },
        { name: 'Team Collaboration', included: false },
        { name: 'Priority Support', included: false },
        { name: 'Custom Branding', included: false }
      ]
    },
    {
      id: 'recruiter-starter',
      name: 'Starter',
      description: 'For small teams and individual recruiters',
      price: isAnnual ? '$79' : '$99',
      originalPrice: isAnnual ? '$119' : '$149',
      period: isAnnual ? '/month (billed annually)' : '/month',
      popular: false,
      color: 'from-blue-500 to-purple-500',
      icon: Briefcase,
      features: [
        { name: 'Everything in Free', included: true },
        { name: 'AI-Powered Interviews (50/month)', included: true, description: 'Increased monthly limit' },
        { name: 'Advanced Candidate Search', included: true, description: 'Enhanced search and filtering' },
        { name: 'Basic Analytics', included: true },
        { name: 'Email Support', included: true },
        { name: 'Job Posting (5 active)', included: true },
        { name: 'Team Collaboration', included: false },
        { name: 'Custom Branding', included: false }
      ]
    },
    {
      id: 'recruiter-pro',
      name: 'Professional',
      description: 'For growing recruitment teams',
      price: isAnnual ? '$149' : '$199',
      originalPrice: isAnnual ? '$229' : '$299',
      period: isAnnual ? '/month (billed annually)' : '/month',
      popular: false,
      color: 'from-purple-500 to-pink-500',
      icon: Star,
      features: [
        { name: 'Everything in Starter', included: true },
        { name: 'Unlimited AI Interviews', included: true },
        { name: 'Advanced Candidate Search', included: true, description: 'AI-powered matching' },
        { name: 'Team Collaboration', included: true, description: 'Share candidates and notes' },
        { name: 'Advanced Analytics', included: true, description: 'Detailed hiring metrics' },
        { name: 'Priority Support', included: true },
        { name: 'Unlimited Job Postings', included: true },
        { name: 'Custom Interview Templates', included: true }
      ]
    },
    {
      id: 'recruiter-enterprise',
      name: 'Enterprise',
      description: 'For large organizations with complex needs',
      price: 'Custom',
      period: '',
      popular: false,
      color: 'from-purple-500 to-indigo-500',
      icon: Building,
      badge: 'Enterprise',
      features: [
        { name: 'Everything in Professional', included: true },
        { name: 'Custom AI Training', included: true, description: 'Train AI on your company data' },
        { name: 'White-label Solution', included: true },
        { name: 'Advanced Security', included: true, description: 'SOC 2, GDPR compliance' },
        { name: 'Dedicated Support', included: true, description: 'Dedicated customer success manager' },
        { name: 'SLA Guarantees', included: true },
        { name: 'Custom Integrations', included: true },
        { name: 'Unlimited Users', included: true }
      ]
    }
  ];

  const plans = user.role === 'candidate' ? candidatePlans : recruiterPlans;

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    if (plan.price === 'Custom') {
      // Handle enterprise contact
      return;
    }
    setShowPaymentForm(true);
  };

  const handlePayment = () => {
    // In a real app, this would integrate with a payment processor like Stripe
    if (selectedPlan) {
      onSubscribe(selectedPlan.id);
      setShowPaymentForm(false);
    }
  };

  const currentPlan = user.role === 'candidate' ? 'candidate-free' : 'recruiter-free'; // Mock current plan

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
              <CreditCard className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Subscription Plans</h1>
              <p className="text-sm text-muted-foreground">
                Choose the perfect plan for your {user.role === 'candidate' ? 'career growth' : 'hiring needs'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Billing Toggle */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-2 border"
          >
            <span className={`px-4 py-2 ${!isAnnual ? 'font-semibold' : ''}`}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                isAnnual ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
            <span className={`px-4 py-2 ${isAnnual ? 'font-semibold' : ''}`}>
              Annual
              <Badge className="ml-2 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                Save 20%
              </Badge>
            </span>
          </motion.div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative ${plan.popular ? 'scale-105' : ''}`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className={`${
                    plan.badge === 'Most Popular' 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600' 
                      : plan.badge === 'Executive'
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                      : 'bg-gradient-to-r from-purple-600 to-indigo-600'
                  } text-white px-4 py-1`}>
                    {plan.badge === 'Most Popular' && <Star className="h-3 w-3 mr-1" />}
                    {plan.badge === 'Executive' && <Crown className="h-3 w-3 mr-1" />}
                    {plan.badge === 'Enterprise' && <Building className="h-3 w-3 mr-1" />}
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <Card className={`h-full ${
                plan.popular 
                  ? 'border-2 border-blue-500 shadow-2xl' 
                  : 'border-0 shadow-xl'
              } bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm overflow-hidden relative`}>
                
                {/* Current Plan Indicator */}
                {currentPlan === plan.id && (
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Current Plan
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${plan.color} p-4 shadow-lg`}>
                    <plan.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-base">{plan.description}</CardDescription>
                  
                  <div className="mt-6">
                    {plan.originalPrice && (
                      <div className="text-sm text-muted-foreground line-through">
                        {plan.originalPrice}{plan.period}
                      </div>
                    )}
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                    {isAnnual && plan.originalPrice && (
                      <div className="text-sm text-green-600 dark:text-green-400 mt-1">
                        <Sparkles className="h-3 w-3 inline mr-1" />
                        Save {Math.round((1 - parseInt(plan.price.replace('$', '')) / parseInt(plan.originalPrice.replace('$', ''))) * 100)}% annually
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="px-6 pb-6">
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <div className="mt-0.5">
                          {feature.included ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
                          )}
                        </div>
                        <div className={feature.included ? '' : 'text-muted-foreground'}>
                          <span className="text-sm font-medium">{feature.name}</span>
                          {feature.description && (
                            <p className="text-xs text-muted-foreground mt-0.5">{feature.description}</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' 
                        : ''
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => handleSelectPlan(plan)}
                    disabled={currentPlan === plan.id}
                  >
                    {currentPlan === plan.id 
                      ? 'Current Plan' 
                      : plan.price === 'Custom' 
                        ? 'Contact Sales' 
                        : 'Upgrade to ' + plan.name
                    }
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Features Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Why Choose Our Platform?</CardTitle>
              <CardDescription className="text-center">
                Advanced AI technology meets user-friendly design for the ultimate {user.role === 'candidate' ? 'career' : 'recruitment'} experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 p-3">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">Lightning Fast</h3>
                  <p className="text-sm text-muted-foreground">
                    Get results in seconds with our optimized AI algorithms
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 p-3">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">Secure & Private</h3>
                  <p className="text-sm text-muted-foreground">
                    Enterprise-grade security with full data protection
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 p-3">
                    <MessageSquare className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">24/7 Support</h3>
                  <p className="text-sm text-muted-foreground">
                    Expert support whenever you need help
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Payment Dialog */}
      <Dialog open={showPaymentForm} onOpenChange={setShowPaymentForm}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Secure Payment
            </DialogTitle>
            <DialogDescription>
              Complete your subscription to {selectedPlan?.name} plan
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Plan Summary */}
            {selectedPlan && (
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{selectedPlan.name} Plan</span>
                  <span className="font-bold">{selectedPlan.price}{selectedPlan.period}</span>
                </div>
                {isAnnual && (
                  <div className="text-sm text-green-600 dark:text-green-400">
                    <Sparkles className="h-3 w-3 inline mr-1" />
                    Annual billing - Save 20%
                  </div>
                )}
              </div>
            )}

            {/* Payment Form */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Card Number</label>
                <Input 
                  placeholder="1234 5678 9012 3456"
                  value={paymentData.cardNumber}
                  onChange={(e) => setPaymentData(prev => ({ ...prev, cardNumber: e.target.value }))}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Expiry Date</label>
                  <Input 
                    placeholder="MM/YY"
                    value={paymentData.expiryDate}
                    onChange={(e) => setPaymentData(prev => ({ ...prev, expiryDate: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">CVV</label>
                  <Input 
                    placeholder="123"
                    value={paymentData.cvv}
                    onChange={(e) => setPaymentData(prev => ({ ...prev, cvv: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Cardholder Name</label>
                <Input 
                  placeholder="John Doe"
                  value={paymentData.holderName}
                  onChange={(e) => setPaymentData(prev => ({ ...prev, holderName: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Country</label>
                  <Select 
                    value={paymentData.country} 
                    onValueChange={(value) => setPaymentData(prev => ({ ...prev, country: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="de">Germany</SelectItem>
                      <SelectItem value="fr">France</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">ZIP Code</label>
                  <Input 
                    placeholder="12345"
                    value={paymentData.zipCode}
                    onChange={(e) => setPaymentData(prev => ({ ...prev, zipCode: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              Your payment information is encrypted and secure
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowPaymentForm(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handlePayment} className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600">
                <CreditCard className="h-4 w-4 mr-2" />
                Subscribe Now
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}