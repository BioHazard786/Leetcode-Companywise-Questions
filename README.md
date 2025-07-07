# 🎯 LeetCode Company-wise Questions

> A modern, responsive web application to explore and filter LeetCode problems categorized by companies, topics, and difficulty levels.

[![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-blue?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## ✨ Features

- 🔍 **Smart Search**: Find problems by title or description with real-time filtering
- 🏢 **Company Filtering**: Filter problems by specific companies (Google, Microsoft, Amazon, etc.)
- 📚 **Topic-based Filtering**: Browse problems by algorithms and data structures topics
- 📊 **Difficulty Levels**: Easy, Medium, and Hard problem categorization
- 📱 **Responsive Design**: Beautiful UI that works on desktop, tablet, and mobile
- ⚡ **Performance Optimized**: Built with Next.js 15 and React 19 for blazing-fast performance
- 🎨 **Modern UI**: Crafted with shadcn/ui components and Tailwind CSS
- 📄 **Virtualized Tables**: Efficient rendering for large datasets with TanStack Table
- 🔗 **URL State Management**: Shareable URLs with Nuqs for search parameters

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui with Radix UI primitives
- **Data Fetching**: TanStack Query (React Query)
- **Table Management**: TanStack Table with virtualization
- **State Management**: Nuqs for URL state
- **Icons**: Lucide React, React Icons

### Backend & Database

- **Database**: Neon PostgreSQL
- **ORM**: Drizzle ORM
- **Runtime**: Bun (development)

### Development Tools

- **Language**: TypeScript
- **Bundler**: Turbopack (Next.js)
- **Package Manager**: Bun

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/BioHazard786/Leetcode-Companywise-Questions.git
   cd Leetcode-Companywise-Questions
   ```

2. **Install dependencies**

   ```bash
   bun install
   # or with npm
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your database credentials
   ```

4. **Run the development server**

   ```bash
   bun dev
   # or with npm
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Database Setup

This project uses Neon PostgreSQL. To set up your database:

1. Create a [Neon](https://neon.tech) account
2. Create a new database project
3. Add your connection string to `.env.local`:

   ```env
   DATABASE_URL="your-neon-connection-string"
   ```

## 📁 Project Structure

```text
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── search-params.ts   # Search params configuration
├── components/            # React components
│   ├── problems/          # Problem-related components
│   │   ├── columns.tsx    # Table column definitions
│   │   ├── data-table.tsx # Main data table component
│   │   ├── filters.tsx    # Filter components
│   │   └── more-info.tsx  # Problem details modal
│   ├── providers/         # Context providers
│   └── ui/               # shadcn/ui components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and configuration
│   ├── constants.ts      # App constants
│   ├── db.ts            # Database configuration
│   ├── schema.ts        # Database schema
│   ├── types.ts         # TypeScript type definitions
│   └── utils.ts         # Utility functions
└── server/              # Server-side code
    └── action.ts        # Server actions
```

## 🎨 UI Components

This project uses [shadcn/ui](https://ui.shadcn.com/) for consistent, accessible, and beautiful UI components:

- **Data Display**: Tables, Cards, Badges
- **Navigation**: Sidebar, Dropdown menus
- **Forms**: Input fields, Select dropdowns, Multi-select
- **Feedback**: Loading spinners, Tooltips, Dialogs
- **Layout**: Sheets, Separators, Scroll areas

## 🔧 Available Scripts

```bash
# Development
bun dev          # Start development server with Turbopack
bun build        # Build for production
bun start        # Start production server
bun lint         # Run ESLint
```

## 🚀 Deployment

### Vercel (Recommended)

This project is optimized for deployment on Vercel with seamless integration:

#### Automatic Deployment

1. **Deploy to Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Sign in with your GitHub account
   - Click "New Project" and import your repository
   - Vercel will automatically detect Next.js and configure build settings

2. **Environment Variables**:
   - In your Vercel dashboard, go to Project Settings → Environment Variables
   - Add the following variables:

     ```env
     DATABASE_URL=your-neon-database-connection-string
     NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
     ```

3. **Deploy**: Vercel will automatically build and deploy your site on every push to the main branch

#### Manual Deployment with Vercel CLI

1. **Install Vercel CLI**:

   ```bash
   npm i -g vercel
   ```

2. **Deploy**:

   ```bash
   vercel
   ```

3. **Production deployment**:

   ```bash
   vercel --prod
   ```

## 🌟 Key Features Explained

### Smart Filtering System

- **Real-time Search**: Type to instantly filter problems by title
- **Multi-select Filters**: Choose multiple companies, topics, or difficulty levels
- **URL Persistence**: Filters are saved in the URL for easy sharing

### Performance Optimizations

- **Infinite Scrolling**: Load problems progressively for better performance
- **Virtual Scrolling**: Efficiently render large lists with TanStack Virtual
- **Server-side Rendering**: Fast initial page loads with Next.js SSR
- **Optimistic Updates**: Instant UI feedback with TanStack Query

### Responsive Design

- **Mobile-first**: Designed to work perfectly on all screen sizes
- **Touch-friendly**: Optimized for touch interactions on mobile devices
- **Keyboard Navigation**: Full keyboard accessibility support

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Liquidslr](https://github.com/liquidslr/leetcode-company-wise-problems) for providing the problem data
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [TanStack](https://tanstack.com/) for excellent data management tools
- [Next.js](https://nextjs.org/) team for the amazing framework

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or reach out to the maintainers.

---

Made with ❤️ for the coding community
