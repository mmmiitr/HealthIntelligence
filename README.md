# Diabetes Care Dashboard V0

A comprehensive healthcare analytics platform delivering diabetes care insights through advanced predictive modeling and user-centric visualization technologies.

## 🚀 Features

- **Multi-Role Dashboards**: Summary, Finance, Operations, Clinical, Patient, and Technical views
- **Real-time Analytics**: Advanced clinical dashboards with predictive modeling
- **Financial Management**: Comprehensive revenue/cost analysis with CPT code tracking
- **Clinical Insights**: HbA1c trends, risk stratification, and patient outcomes
- **Responsive Design**: Modern React UI with dynamic view mode switching
- **HIPAA Compliant**: Healthcare data security and privacy standards

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL (configurable)
- **Charts**: Recharts for data visualization
- **UI Components**: Shadcn/ui, Radix UI
- **State Management**: TanStack Query
- **Authentication**: Passport.js
- **Routing**: Wouter

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL (optional - uses in-memory storage by default)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd diabetes-care-dashboard
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup (Optional)
Create a `.env` file for database configuration:
```bash
# Optional: PostgreSQL Database
DATABASE_URL=postgresql://username:password@localhost:5432/diabetes_care
PGPORT=5432
PGUSER=your_username
PGPASSWORD=your_password
PGDATABASE=diabetes_care
PGHOST=localhost

# Development
NODE_ENV=development
```

### 4. Start Development Server
```bash
npm run dev
```

The application will be available at: `http://localhost:5000`

### 5. Running on Windows

If you are on Windows, please note:

- You must have [Node.js LTS](https://nodejs.org/en/download/) installed (the Windows installer will add `node` and `npm` to your PATH).
- The project uses [`cross-env`](https://www.npmjs.com/package/cross-env) for setting environment variables in scripts, so you do **not** need to change any npm scripts for Windows compatibility.
- The server is configured to listen on `127.0.0.1` and does **not** use the `reusePort` option, which is unsupported on Windows.

## 📁 Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── diabetes/   # Dashboard components
│   │   │   └── ui/         # Shadcn UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utilities and data
│   │   ├── pages/          # Page components
│   │   └── App.tsx         # Main app component
│   └── index.html
├── server/                 # Express backend
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Data storage layer
│   └── vite.ts            # Vite integration
├── shared/                # Shared types and schemas
│   └── schema.ts          # Database schemas
└── README.md
```

## 🏥 Dashboard Overview

### Summary Dashboard
- Executive overview with key metrics
- Active panel size and telemedicine patient tracking
- HbA1c control rates and CCM enrollment
- Separate trend analysis for key indicators

### Finance Dashboard  
- **Main Metrics**: Profit, Revenue, Cost analysis
- **Revenue Section**: 
  - Revenue per patient, CPT code breakdown
  - Payer mix distribution, revenue source splits
  - Service type revenue tracking (In-Person, CCM, Telemedicine, DSMT, Labs)
- **Cost Section**:
  - Cost per patient/visit, labor cost analysis
  - Detailed labor breakdown by role
- **Predictive Analytics**: Revenue forecasting with 95% confidence intervals

### Clinical Dashboard
- Patient risk stratification and HbA1c trends
- Medication adherence and complication rates
- High-risk patient identification
- ADA 2024 Standards of Care compliance

### Operations Dashboard
- Resource utilization and patient flow
- Provider workload management
- Service utilization trends
- Capacity planning insights

### Patient Dashboard
- Individual patient view (John Doe example)
- Personal HbA1c tracking and goals
- Educational resources and tips
- Care plan management

### Technical Dashboard
- API documentation and endpoints
- Database schema references
- Integration guides for developers
- Technical specifications

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run TypeScript checks
```

### Database Configuration
The application uses in-memory storage by default. To use PostgreSQL:

1. Install and setup PostgreSQL
2. Create a database named `diabetes_care`
3. Set environment variables in `.env`
4. The application will automatically use PostgreSQL when `DATABASE_URL` is provided

### Adding New Features
1. **Frontend Components**: Add to `client/src/components/`
2. **API Endpoints**: Define in `server/routes.ts`
3. **Database Schema**: Update `shared/schema.ts`
4. **Mock Data**: Add to `client/src/lib/mock-data.ts`

## 📊 Data Models

### Core Entities
- **Patients**: Demographics, medical history, care plans
- **Metrics**: Clinical outcomes, financial data, operational KPIs
- **Providers**: Healthcare team members and workloads
- **Revenue**: Payment data, CPT codes, payer information
- **Costs**: Operational expenses, labor costs, resource utilization

### Key Metrics Tracked
- HbA1c levels and control rates
- 30-day ED visits/hospitalizations  
- Medication adherence rates
- Revenue per patient and service type
- Labor costs by role
- Resource utilization efficiency

## 🔒 Security & Compliance

- **HIPAA Compliance**: Healthcare data protection standards
- **Authentication**: Secure user sessions with Passport.js
- **Data Encryption**: Protected data transmission
- **Access Controls**: Role-based dashboard access
- **Audit Trails**: User activity logging

## 🚀 Deployment

### Production Build
```bash
npm run build
npm run preview
```

### Environment Variables
Set these for production:
```bash
NODE_ENV=production
DATABASE_URL=your_production_database_url
# Add other production-specific variables
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 API Documentation

The Technical dashboard provides comprehensive API documentation including:
- Authentication endpoints
- Patient data management
- Clinical metrics retrieval
- Financial reporting APIs
- Administrative functions

## 🆘 Troubleshooting

### Common Issues

**Port 5000 already in use:**
```bash
# Kill process using port 5000
lsof -ti:5000 | xargs kill -9
# Or change port in vite.config.ts
```

**Database connection issues:**
- Verify PostgreSQL is running
- Check DATABASE_URL format
- Ensure database exists
- Verify user permissions

**Missing dependencies:**
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📞 Support

For technical support or questions:
- Check the Technical dashboard for API documentation
- Review the troubleshooting section
- Open an issue in the repository

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with ❤️ for improved diabetes care management**