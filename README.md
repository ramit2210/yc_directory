# 🚀 YC Directory - Startup Pitch Platform

A modern web application where entrepreneurs can pitch their startup ideas, connect with other founders, and get noticed in a virtual competition environment. Built with Next.js 16 and powered by real-time updates.

## 🌐 Live Demo

**Deployed URL:** [https://yc-directory-beryl-psi.vercel.app](https://yc-directory-beryl-psi.vercel.app)

## ✨ Features

### Core Functionality

-   **🎯 Pitch Submission**: Submit your startup ideas with title, description, category, and detailed pitch using Markdown editor
-   **🔍 Smart Search**: Search and filter startups by keywords and categories
-   **👁️ View Tracking**: Track views on each startup pitch
-   **📊 Real-time Updates**: Live updates using Supabase real-time subscriptions
-   **👤 User Profiles**: View author profiles and their submitted startups
-   **🔐 GitHub Authentication**: Secure sign-in with GitHub OAuth

### User Experience

-   **📱 Responsive Design**: Fully responsive UI built with Tailwind CSS
-   **🎨 Modern UI Components**: Beautiful components using Radix UI and shadcn/ui
-   **✍️ Markdown Editor**: Rich text editing for detailed pitch descriptions
-   **⚡ Fast Performance**: Optimized with Next.js 16 App Router and React 19
-   **🔔 Toast Notifications**: User-friendly feedback for actions

## 🛠️ Technology Stack

### Frontend

-   **Framework**: Next.js 16 (App Router)
-   **React**: 19.2.0
-   **TypeScript**: 5.9.3
-   **Styling**: Tailwind CSS 3.4 with tailwindcss-animate
-   **UI Components**:
    -   Radix UI (Avatar, Toast, Slot)
    -   shadcn/ui components
    -   Lucide React (Icons)
-   **Markdown**: @uiw/react-md-editor, markdown-it

### Backend & Database

-   **Database**: PostgreSQL (Supabase)
-   **ORM**: Drizzle ORM 0.44.7
-   **Real-time**: Supabase Realtime
-   **Authentication**: NextAuth.js 5.0 (GitHub Provider)

### DevOps & Monitoring

-   **Deployment**: Vercel
-   **Error Tracking**: Sentry
-   **Build Tool**: Turbo 2.6.1

### Additional Tools

-   **Data Fetching**: SWR 2.3.6
-   **Utilities**:
    -   clsx, tailwind-merge (className management)
    -   slugify (URL-friendly slugs)
    -   class-variance-authority (component variants)

## 📋 Prerequisites

Before running this project locally, make sure you have:

-   Node.js 20.x or higher
-   npm, yarn, pnpm, or bun package manager
-   PostgreSQL database (or Supabase account)
-   GitHub OAuth App credentials

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd yc_directory
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# Authentication
AUTH_SECRET="your-auth-secret"
AUTH_GITHUB_ID="your-github-oauth-app-id"
AUTH_GITHUB_SECRET="your-github-oauth-app-secret"

# Database
DATABASE_URL="your-postgresql-connection-string"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="your-supabase-project-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
```

#### How to Get Credentials:

**GitHub OAuth:**

1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Create a new OAuth App
3. Set Authorization callback URL to `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID and Client Secret

**Supabase:**

1. Create a project at [supabase.com](https://supabase.com)
2. Go to Project Settings → API
3. Copy the Project URL and anon/public key

**Auth Secret:**

```bash
# Generate a secure random string
openssl rand -base64 32
```

### 4. Database Setup

Run database migrations:

```bash
npm run db:push
# or use drizzle-kit commands
npx drizzle-kit push
```

### 5. Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── (root)/            # Main application pages
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── Navbar.tsx        # Navigation component
│   ├── StartupCard.tsx   # Startup display card
│   └── StartupForm.tsx   # Pitch submission form
├── db/                    # Database schema and config
├── lib/                   # Utility functions and helpers
├── hooks/                 # Custom React hooks
├── public/               # Static assets
└── scripts/              # Utility scripts
```

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🌟 Key Features Explained

### Real-time Updates

The application uses Supabase real-time subscriptions to automatically update the startup list when new pitches are submitted or existing ones are modified.

### Authentication Flow

Users sign in with their GitHub account. On first login, a new author profile is automatically created in the database with their GitHub information.

### Markdown Support

The pitch editor supports full Markdown syntax, allowing users to create rich, formatted content for their startup descriptions.

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## 📄 License

This project is private and proprietary.

## 👨‍💻 Author

Built with ❤️ using Next.js and modern web technologies.

---

**Note**: Make sure to keep your `.env.local` file secure and never commit it to version control.
