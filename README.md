# KENYA REVENUE AUTHORITY (KRA)
## ICT DEPARTMENT - SERVICE MANAGEMENT OFFICE

# PROJECT DOCUMENTATION: KRA ICT HELPDESK & TICKETING SYSTEM (KRATicketPro)

| Project Name | KRA ICT Helpdesk & Ticketing System |
|--------------|--------------------------------------|
| Document Type| Technical & User Documentation       |
| Status       | Draft / Initial Release              |
| Version      | 1.0.0                                |
| Date         | May 2026                             |
| Prepared By  | ICT Support Team / KRATicketPro Team |

---

## 1. VERSION HISTORY

| Version | Date       | Description                   | Author      |
|---------|------------|-------------------------------|-------------|
| 1.0.0   | 2026-05-29 | Initial System Design & Build | Antigravity |

---

## 2. EXECUTIVE SUMMARY
The **KRA ICT Helpdesk & Support Ticketing System (KRATicketPro)** is designed to modernize and centralize technical support within the Kenya Revenue Authority. Moving away from manual reporting methods (phone calls, emails), this system provides a secure, role-based platform for tracking, managing, and resolving technical issues across all KRA departments.

---

## 3. SYSTEM ARCHITECTURE
The system follows an Enterprise Three-Tier Architecture:
1.  **Presentation Layer**: React (Vite) + Tailwind CSS + Framer Motion (Mobile Responsive)
2.  **Application Layer**: Django REST Framework (Python 3.x)
3.  **Database Layer**: PostgreSQL (Post-migration from SQLite)

---

## 4. FUNCTIONAL MODULES

### 4.1. User Authentication & Authorization
- **JWT Authentication**: Secure token-based access.
- **RBAC (Role-Based Access Control)**: 
    - `END_USER`: Staff raising tickets.
    - `ICT_STAFF`: Technicians resolving tickets.
    - `ADMIN`: Management governing the system.

### 4.2. Ticket Lifecycle Management
- **Creation**: Automated unique ID generation (e.g., `KRA-ICT-2026-0001`).
- **Prioritization**: LOW, MEDIUM, HIGH, CRITICAL levels.
- **Categorization**: Targeted assignment based on problem type (Network, Hardware, Email, etc.).
- **SLA Tracking**: Real-time monitoring of resolution deadlines.
- **Feedback**: Post-resolution User Satisfaction Rating (1-5 Stars).

### 4.3. Analytics & Reporting
- **Performance Dashboards**: Real-time KPIs (Total, Pending, Resolved, SLA Breaches).
- **Staff Performance**: Monitoring technician efficiency and resolution rates.
- **Trend Analysis**: 6-month historical volume tracking.

---

## 5. TECHNICAL SPECIFICATIONS

### 5.1. Backend (Django REST Framework)
- **Token Management**: `djangorestframework-simplejwt`
- **Security**: CORS protection, Password hashing (Argon2/PBKDF2), Rate limiting.
- **Analytics Engine**: Custom Django aggregation for real-time reporting.

### 5.2. Frontend (React)
- **State Management**: React Hooks + Auth Context.
- **UI System**: Custom KRA Brand Design System (Red/Gold/Glassmorphism).
- **Data Visualization**: Recharts for performance metrics.
- **Interactivity**: Lucide-React icons + Framer Motion transitions.

---

## 6. INSTALLATION & SETUP

### Prerequisites
- Python 3.10+
- Node.js 18+
- PostgreSQL (Recommended for Production)

### Backend Setup
```bash
cd kra_helpdesk_backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python seed.py
python manage.py runserver
```

### Frontend Setup
```bash
cd kra_helpdesk_frontend
npm install
npm run dev
```

---

## 7. USER MANUAL

### 7.1. Raising a Support Request (End User)
1.  Login to the portal.
2.  Navigate to **New Request**.
3.  Fill in the Issue Description, Category, and Priority.
4.  Submit and track status via **My Tickets**.

### 7.2. Resolving a Ticket (ICT Staff)
1.  Access the **Dashboard** to view unassigned/pending tickets.
2.  Assign the ticket to yourself or accept assignment.
3.  Update status to **In Progress**.
4.  Once resolved, update status to **Resolved** and add resolution notes.

---

## 8. FUTURE ROADMAP
- **AI Triage**: Automated ticket classification using NLP.
- **Mobile App**: Native Android/iOS application for field staff.
- **Inventory Integration**: Linking tickets to hardware asset barcodes via QR codes.
- **SMS Alerts**: Real-time SMS notifications via KRA Gateway.

---

## 9. CONFIDENTIALITY NOTICE
This document and the associated software are the property of the Kenya Revenue Authority (KRA). Unauthorized distribution or reproduction is strictly prohibited.
© 2026 KRA ICT Department.
# KRATICKETPRO
# KRATICKETPRO
