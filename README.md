# AI Career Assistant - Next.js App

A comprehensive AI-powered recruitment and career development platform built with Next.js 14 and React.

## 🚀 Features

### For Recruiters
- **AI-Powered Interviews** - Conduct intelligent interviews with real-time evaluation
- **Job Management** - Create, edit, and manage job postings
- **Candidate Search** - Find and filter candidates with AI matching
- **Analytics Dashboard** - Track hiring metrics and performance
- **Payment Plans** - Subscription management and billing

### For Candidates  
- **Resume Optimization** - AI-tailored resumes that pass ATS systems
- **Mock Interviews** - Practice with AI-powered interview simulations
- **Skills Analysis** - Comprehensive skill evaluation and gap analysis
- **Job Search** - AI-powered job matching and recommendations
- **Cover Letter Generator** - AI-powered cover letter creation
- **Career Insights** - Personalized career development recommendations

### Common Features
- **Role-based Authentication** - Secure login for recruiters and candidates
- **Settings & Notifications** - Personalized preferences and alerts
- **Export Functionality** - Export data and reports including Figma designs
- **Responsive Design** - Works seamlessly on desktop and mobile
- **Dark/Light Mode** - Theme switching support

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Animations**: Motion (Framer Motion)
- **Charts**: Recharts
- **Forms**: React Hook Form
- **Notifications**: Sonner

## 🏗️ Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Landing page
│   ├── globals.css       # Global styles
│   ├── auth/             # Authentication pages
│   ├── dashboard/        # Dashboard and protected routes
│   ├── features/         # Features page
│   ├── about/           # About page
│   ├── contact/         # Contact page
│   ├── privacy/         # Privacy policy
│   └── providers/       # Context providers
├── components/           # React components
│   ├── ui/              # shadcn/ui components
│   ├── Dashboard.tsx    # Main dashboard
│   ├── AuthSystem.tsx   # Authentication
│   ├── JobManagement.tsx # Job posting management
│   └── ...             # Other feature components
├── styles/             # Global styles
└── public/            # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-career-assistant
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 Key Features Explained

### Authentication System
- Role-based authentication (Recruiter/Candidate)
- Persistent sessions with localStorage
- Protected routes with automatic redirects

### Dashboard
- Personalized dashboards based on user role
- Quick actions for common tasks
- Real-time statistics and metrics
- Activity feeds and insights

### Job Management (Recruiters)
- Create comprehensive job postings
- Manage application status and deadlines
- Track applicant metrics
- Edit and duplicate existing postings

### AI Tools
- **Resume Optimization**: Upload and enhance resumes with AI suggestions
- **Interview Practice**: AI-powered mock interviews with feedback
- **Skills Analysis**: Identify skill gaps and receive recommendations
- **Cover Letter Generator**: Create tailored cover letters

### Navigation
- Clean, intuitive navigation between features
- Breadcrumb navigation for complex workflows
- Mobile-responsive hamburger menu
- Quick access to settings and notifications

## 🎨 Design System

The application uses a professional design system with:

- **Colors**: Blue/purple gradient theme with light/dark mode support
- **Typography**: Clean, readable fonts with proper hierarchy
- **Components**: Consistent UI components from shadcn/ui
- **Spacing**: Systematic spacing using Tailwind's design tokens
- **Animations**: Smooth transitions and micro-interactions

## 📱 Responsive Design

The application is fully responsive and works across:
- Desktop (1024px+)
- Tablet (768px - 1024px)  
- Mobile (320px - 768px)

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for environment-specific configuration:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Tailwind Configuration
The project uses Tailwind CSS v4 with custom design tokens defined in `app/globals.css`.

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Deploy to Vercel
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Deploy to Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- Heroku
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in this repository
- Contact the development team
- Check the documentation

## 🔄 Migration from React SPA

This codebase has been converted from a React SPA to Next.js App Router. Key changes include:

- Client-side routing replaced with Next.js routing
- State management moved to React Context
- Components updated for Next.js compatibility
- Authentication persistence improved
- SEO and performance optimizations added

## ⚡ Performance

The application is optimized for performance with:
- Next.js automatic code splitting
- Image optimization
- Font optimization  
- Lazy loading of components
- Efficient re-rendering patterns

---

Built with ❤️ using Next.js and React