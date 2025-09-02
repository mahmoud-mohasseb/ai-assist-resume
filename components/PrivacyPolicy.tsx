import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  ArrowLeft,
  Shield,
  Eye,
  Lock,
  Database,
  Globe,
  UserCheck,
  AlertTriangle,
  CheckCircle,
  Mail,
  Calendar
} from 'lucide-react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
  const lastUpdated = "December 1, 2024";

  const sections = [
    {
      id: "information-collection",
      title: "Information We Collect",
      icon: Database,
      content: [
        {
          subtitle: "Personal Information",
          details: "We collect information you provide directly to us, such as when you create an account, use our services, or contact us. This includes your name, email address, company information, and professional details."
        },
        {
          subtitle: "Usage Information",
          details: "We automatically collect information about how you use our services, including interview sessions, resume uploads, and platform interactions. This helps us improve our AI algorithms and user experience."
        },
        {
          subtitle: "Technical Information",
          details: "We collect technical information such as IP addresses, browser types, device information, and operating systems to ensure platform security and compatibility."
        }
      ]
    },
    {
      id: "information-use",
      title: "How We Use Your Information",
      icon: Eye,
      content: [
        {
          subtitle: "Service Provision",
          details: "We use your information to provide, maintain, and improve our AI-powered career assistance services, including interview simulations, resume optimization, and skills assessment."
        },
        {
          subtitle: "Personalization",
          details: "Your data helps us personalize your experience, provide relevant recommendations, and create customized learning paths based on your career goals and skill level."
        },
        {
          subtitle: "Communication",
          details: "We use your contact information to send you service updates, respond to your inquiries, and provide customer support when needed."
        }
      ]
    },
    {
      id: "information-sharing",
      title: "Information Sharing and Disclosure",
      icon: UserCheck,
      content: [
        {
          subtitle: "With Your Consent",
          details: "We only share your personal information with third parties when you explicitly consent, such as when sharing interview results with potential employers."
        },
        {
          subtitle: "Service Providers",
          details: "We work with trusted service providers who help us operate our platform. These partners are bound by strict confidentiality agreements and data protection requirements."
        },
        {
          subtitle: "Legal Requirements",
          details: "We may disclose information when required by law, to protect our rights, or to ensure the safety and security of our users and platform."
        }
      ]
    },
    {
      id: "data-security",
      title: "Data Security",
      icon: Lock,
      content: [
        {
          subtitle: "Encryption",
          details: "All data is encrypted both in transit and at rest using industry-standard encryption protocols. We implement multiple layers of security to protect your information."
        },
        {
          subtitle: "Access Controls",
          details: "We maintain strict access controls and authentication measures. Only authorized personnel can access user data, and all access is logged and monitored."
        },
        {
          subtitle: "Regular Audits",
          details: "We conduct regular security audits and assessments to identify and address potential vulnerabilities in our systems and processes."
        }
      ]
    },
    {
      id: "user-rights",
      title: "Your Rights and Choices",
      icon: Shield,
      content: [
        {
          subtitle: "Access and Portability",
          details: "You have the right to access, update, or delete your personal information. You can also request a copy of your data in a portable format."
        },
        {
          subtitle: "Consent Management",
          details: "You can withdraw your consent for data processing at any time. You also have granular controls over what information you share and with whom."
        },
        {
          subtitle: "Marketing Communications",
          details: "You can opt out of marketing communications at any time while still receiving important service-related updates and notifications."
        }
      ]
    }
  ];

  const gdprRights = [
    "Right to be informed about data collection and use",
    "Right to access your personal data",
    "Right to rectification of inaccurate data",
    "Right to erasure ('right to be forgotten')",
    "Right to restrict processing",
    "Right to data portability",
    "Right to object to processing",
    "Rights related to automated decision making"
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
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Privacy Policy</h1>
              <p className="text-sm text-muted-foreground">Your privacy and data protection</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Introduction */}
        <Card className="mb-8 border-2 border-blue-200 dark:border-blue-800">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-4 w-fit mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Privacy Policy</h2>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Last updated: {lastUpdated}</span>
              </div>
            </div>
            
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed text-center">
                At AI Career Assistant, we take your privacy seriously. This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you use our platform. We are committed to 
                protecting your personal data and maintaining transparency about our practices.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="text-center">
                <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-3 w-fit mx-auto mb-2">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <p className="text-sm font-medium">GDPR Compliant</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-3 w-fit mx-auto mb-2">
                  <Lock className="h-6 w-6 text-blue-600" />
                </div>
                <p className="text-sm font-medium">End-to-End Encryption</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900/30 rounded-lg p-3 w-fit mx-auto mb-2">
                  <Globe className="h-6 w-6 text-purple-600" />
                </div>
                <p className="text-sm font-medium">Global Standards</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <Card key={section.id} className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-2">
                    <section.icon className="h-5 w-5 text-white" />
                  </div>
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {section.content.map((item, itemIndex) => (
                  <div key={itemIndex}>
                    <h4 className="font-semibold text-lg mb-3">{item.subtitle}</h4>
                    <p className="text-muted-foreground leading-relaxed">{item.details}</p>
                    {itemIndex < section.content.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* GDPR Rights Section */}
        <Card className="mt-8 border-2 border-green-200 dark:border-green-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="bg-green-600 rounded-xl p-2">
                <UserCheck className="h-5 w-5 text-white" />
              </div>
              Your GDPR Rights
            </CardTitle>
            <CardDescription>
              Under the General Data Protection Regulation (GDPR), you have the following rights:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {gdprRights.map((right, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span className="text-sm">{right}</span>
                </div>
              ))}
            </div>
            <Separator className="my-6" />
            <p className="text-sm text-muted-foreground">
              To exercise any of these rights, please contact us at <strong>privacy@aicareerassistant.com</strong>. 
              We will respond to your request within 30 days as required by law.
            </p>
          </CardContent>
        </Card>

        {/* Data Retention */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-2">
                <Database className="h-5 w-5 text-white" />
              </div>
              Data Retention
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Active Accounts</h4>
                  <p className="text-sm text-muted-foreground">
                    We retain your data while your account is active and for as long as needed to provide our services.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Deleted Accounts</h4>
                  <p className="text-sm text-muted-foreground">
                    When you delete your account, we remove your personal data within 30 days, except where required by law.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Backup Data</h4>
                  <p className="text-sm text-muted-foreground">
                    Backup copies are automatically deleted within 90 days after account deletion.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Analytics Data</h4>
                  <p className="text-sm text-muted-foreground">
                    Anonymized analytics data may be retained longer for product improvement purposes.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card className="mt-8 border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20">
          <CardContent className="p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Questions About Your Privacy?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                If you have any questions about this Privacy Policy or our data practices, 
                we're here to help. Contact our privacy team directly.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Privacy Team
                </Button>
                <Button variant="outline">
                  <Shield className="h-4 w-4 mr-2" />
                  Data Protection Officer
                </Button>
              </div>

              <div className="mt-6 text-sm text-muted-foreground">
                <p>Email: privacy@aicareerassistant.com</p>
                <p>Response time: Within 48 hours</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Updates Notice */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
              <div>
                <h4 className="font-semibold mb-2">Policy Updates</h4>
                <p className="text-sm text-muted-foreground">
                  We may update this Privacy Policy from time to time. We will notify you of any material changes 
                  by email or through a prominent notice on our platform. Your continued use of our services after 
                  such modifications constitutes acceptance of the updated Privacy Policy.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}