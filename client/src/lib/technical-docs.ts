// Technical Documentation for Healthcare Dashboard API
// This file serves as living documentation for the backend architecture

export interface APIEndpoint {
  method: string;
  endpoint: string;
  description: string;
  authentication: string;
  parameters?: Array<{
    name: string;
    type: string;
    required: boolean;
    description: string;
  }>;
  response: {
    status: number;
    example: any;
  };
  notes?: string;
}

export interface DatabaseSchema {
  table: string;
  description: string;
  fields: Array<{
    name: string;
    type: string;
    nullable: boolean;
    description: string;
    constraints?: string[];
  }>;
  relationships?: Array<{
    type: 'one-to-many' | 'many-to-one' | 'many-to-many';
    table: string;
    description: string;
  }>;
}

// API Endpoints Documentation
export const API_ENDPOINTS: APIEndpoint[] = [
  {
    method: "GET",
    endpoint: "/api/admin/metrics",
    description: "Retrieve administrative metrics for hospital operations",
    authentication: "Bearer Token (Admin Role)",
    parameters: [
      { name: "timeFilter", type: "string", required: false, description: "Filter by time period: 3months, 6months, 1year" },
      { name: "department", type: "string", required: false, description: "Filter by department ID" }
    ],
    response: {
      status: 200,
      example: {
        id: 1,
        month: "May",
        year: 2025,
        totalRevenue: 1850000,
        operatingCosts: 1420000,
        patientCount: 1247,
        avgWaitTime: 15,
        bedOccupancy: 0.84,
        staffUtilization: 0.92
      }
    },
    notes: "HIPAA compliant - No PII returned. Aggregated metrics only."
  },
  {
    method: "GET",
    endpoint: "/api/clinician/high-risk-patients",
    description: "Get list of patients requiring immediate attention",
    authentication: "Bearer Token (Clinician Role)",
    response: {
      status: 200,
      example: [
        {
          id: 1,
          patientName: "John D.", // Anonymized
          a1c: "9.2",
          lastVisit: "2025-04-15",
          riskFactors: "Uncontrolled diabetes, missed appointments",
          urgencyLevel: "high"
        }
      ]
    },
    notes: "Returns anonymized patient data. Full access requires HIPAA authorization."
  },
  {
    method: "POST",
    endpoint: "/api/patient/appointments/reschedule",
    description: "Reschedule patient appointment",
    authentication: "Bearer Token (Patient Role)",
    parameters: [
      { name: "appointmentId", type: "number", required: true, description: "ID of appointment to reschedule" },
      { name: "newDateTime", type: "ISO8601", required: true, description: "New appointment date and time" },
      { name: "reason", type: "string", required: false, description: "Reason for rescheduling" }
    ],
    response: {
      status: 200,
      example: {
        success: true,
        appointmentId: 123,
        oldDateTime: "2025-06-05T14:00:00Z",
        newDateTime: "2025-06-10T10:00:00Z",
        confirmationNumber: "APT-2025-001234"
      }
    }
  },
  {
    method: "GET",
    endpoint: "/api/finance/payer-trends",
    description: "Revenue trends by insurance payer type",
    authentication: "Bearer Token (Finance Role)",
    parameters: [
      { name: "startDate", type: "date", required: false, description: "Start date for trend analysis" },
      { name: "endDate", type: "date", required: false, description: "End date for trend analysis" }
    ],
    response: {
      status: 200,
      example: [
        {
          month: "Jan 2025",
          medicare: 4500,
          medicaid: 1800,
          private: 3000,
          other: 900
        }
      ]
    }
  }
];

// Database Schema Documentation
export const DATABASE_SCHEMAS: DatabaseSchema[] = [
  {
    table: "patients",
    description: "Core patient information with HIPAA compliance",
    fields: [
      { name: "id", type: "SERIAL PRIMARY KEY", nullable: false, description: "Unique patient identifier" },
      { name: "mrn", type: "VARCHAR(20) UNIQUE", nullable: false, description: "Medical Record Number", constraints: ["UNIQUE", "NOT NULL"] },
      { name: "encrypted_name", type: "TEXT", nullable: false, description: "Encrypted patient name (AES-256)" },
      { name: "date_of_birth", type: "DATE", nullable: false, description: "Patient date of birth" },
      { name: "gender", type: "VARCHAR(10)", nullable: true, description: "Patient gender identity" },
      { name: "current_a1c", type: "DECIMAL(3,1)", nullable: true, description: "Most recent HbA1c value" },
      { name: "diabetes_type", type: "VARCHAR(20)", nullable: true, description: "Type 1, Type 2, Gestational, etc." },
      { name: "enrollment_date", type: "TIMESTAMP", nullable: false, description: "Date enrolled in diabetes program" },
      { name: "created_at", type: "TIMESTAMP DEFAULT NOW()", nullable: false, description: "Record creation timestamp" },
      { name: "updated_at", type: "TIMESTAMP DEFAULT NOW()", nullable: false, description: "Last update timestamp" }
    ],
    relationships: [
      { type: "one-to-many", table: "appointments", description: "Patient can have multiple appointments" },
      { type: "one-to-many", table: "lab_results", description: "Patient can have multiple lab results" },
      { type: "many-to-many", table: "providers", description: "Patients can see multiple providers" }
    ]
  },
  {
    table: "appointments",
    description: "Patient appointment scheduling and tracking",
    fields: [
      { name: "id", type: "SERIAL PRIMARY KEY", nullable: false, description: "Unique appointment identifier" },
      { name: "patient_id", type: "INTEGER REFERENCES patients(id)", nullable: false, description: "Foreign key to patients table" },
      { name: "provider_id", type: "INTEGER REFERENCES providers(id)", nullable: false, description: "Assigned healthcare provider" },
      { name: "appointment_datetime", type: "TIMESTAMP", nullable: false, description: "Scheduled appointment date/time" },
      { name: "duration_minutes", type: "INTEGER DEFAULT 30", nullable: false, description: "Appointment duration in minutes" },
      { name: "appointment_type", type: "VARCHAR(50)", nullable: false, description: "Type: routine, urgent, follow-up, etc." },
      { name: "status", type: "VARCHAR(20) DEFAULT 'scheduled'", nullable: false, description: "scheduled, completed, cancelled, no-show" },
      { name: "notes", type: "TEXT", nullable: true, description: "Appointment notes and observations" },
      { name: "created_at", type: "TIMESTAMP DEFAULT NOW()", nullable: false, description: "Record creation timestamp" }
    ],
    relationships: [
      { type: "many-to-one", table: "patients", description: "Multiple appointments belong to one patient" },
      { type: "many-to-one", table: "providers", description: "Multiple appointments can be with one provider" }
    ]
  },
  {
    table: "lab_results",
    description: "Laboratory test results for diabetes monitoring",
    fields: [
      { name: "id", type: "SERIAL PRIMARY KEY", nullable: false, description: "Unique lab result identifier" },
      { name: "patient_id", type: "INTEGER REFERENCES patients(id)", nullable: false, description: "Foreign key to patients table" },
      { name: "test_date", type: "DATE", nullable: false, description: "Date lab test was performed" },
      { name: "test_type", type: "VARCHAR(50)", nullable: false, description: "HbA1c, glucose, lipid panel, etc." },
      { name: "result_value", type: "DECIMAL(5,2)", nullable: false, description: "Numeric test result" },
      { name: "result_unit", type: "VARCHAR(20)", nullable: false, description: "Unit of measurement (%, mg/dL, etc.)" },
      { name: "reference_range", type: "VARCHAR(50)", nullable: true, description: "Normal reference range for test" },
      { name: "is_critical", type: "BOOLEAN DEFAULT FALSE", nullable: false, description: "Flags critical/abnormal results" },
      { name: "ordered_by", type: "INTEGER REFERENCES providers(id)", nullable: false, description: "Provider who ordered the test" }
    ]
  }
];

// Authentication & Authorization Documentation
export const AUTH_DOCUMENTATION = {
  overview: "JWT-based authentication with role-based access control (RBAC)",
  roles: [
    {
      role: "admin",
      description: "Hospital administrators with full system access",
      permissions: ["read:all", "write:all", "delete:appointments", "manage:users"]
    },
    {
      role: "clinician", 
      description: "Healthcare providers with patient care access",
      permissions: ["read:patients", "write:appointments", "read:lab_results", "write:care_plans"]
    },
    {
      role: "finance",
      description: "Financial analysts with revenue/billing access", 
      permissions: ["read:billing", "read:revenue", "write:financial_reports"]
    },
    {
      role: "patient",
      description: "Individual patients with limited self-service access",
      permissions: ["read:own_data", "write:appointments", "read:own_lab_results"]
    }
  ],
  tokenStructure: {
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    payload: {
      sub: "user_id",
      role: "clinician",
      permissions: ["read:patients", "write:appointments"],
      iat: 1640995200,
      exp: 1640998800
    }
  }
};

// Integration Guidelines
export const INTEGRATION_GUIDE = {
  gettingStarted: [
    "1. Obtain API credentials from system administrator",
    "2. Configure authentication headers with Bearer token",
    "3. Review HIPAA compliance requirements for your use case",
    "4. Test endpoints in development environment first",
    "5. Implement proper error handling for all API calls"
  ],
  errorHandling: {
    "400": "Bad Request - Check request parameters",
    "401": "Unauthorized - Invalid or expired token",
    "403": "Forbidden - Insufficient permissions for this resource",
    "404": "Not Found - Resource does not exist",
    "429": "Rate Limited - Too many requests, implement backoff",
    "500": "Internal Server Error - Contact system administrator"
  },
  bestPractices: [
    "Always validate input data before sending to API",
    "Implement exponential backoff for retries",
    "Cache responses when appropriate to reduce API calls",
    "Use pagination for large datasets",
    "Log all API interactions for debugging",
    "Never log sensitive patient data"
  ]
};