# MoviCloud Spa UI

Luxury spa management web app UI built with React, Vite, and Tailwind CSS. The project focuses on a premium wellness aesthetic with dashboard, services, therapists, appointments, and offers views.

## Tech Stack
- React 19
- Vite 8
- Tailwind CSS 4 (CSS-first configuration)

## Features

### Appointment Booking System
- **5-Step Booking Process**: Client Details -> Health Details -> Appointment Details -> Payment -> Terms & Conditions
- **18+ Spa Services**: Massage, Facial, Beauty, Body, Hair, and Wellness treatments
- **3 Therapists**: Sarah Jenkins, Julian Reed, Elena Moretti
- **Payment Integration**: Credit/Debit Card and UPI with QR code support
- **Form Validation**: Real-time step completion checking
- **Success Confirmation**: Transaction ID generation and personalized confirmation

### Pages
- **Dashboard**: Overview with next appointment and wellness insights
- **Services**: Browse and book spa treatments
- **Therapists**: View therapist profiles and specialties
- **Appointments**: Complete booking system with management
- **Offers**: Special packages and promotions

## Quick Start

### 1) Clone Repository
```bash
git clone https://github.com/Sanjaycs096/MOVICLOUD-SPA.git
cd MOVICLOUD-SPA
```

### 2) Install Dependencies
```bash
npm install
```

### 3) Run Development Server
```bash
npm run dev
```

### 4) Open Browser
Navigate to `http://localhost:5173` (or the URL shown in terminal)

## Scripts
- `npm run dev`: start the dev server
- `npm run build`: build the app
- `npm run preview`: preview the build
- `npm run lint`: run ESLint

## Project Structure
- `src/App.jsx`: app layout and page views
- `src/frontend/AppointmentsPage.jsx`: complete appointment booking system
- `src/index.css`: Tailwind base and theme tokens
- `src/App.css`: component and layout styles

## UI Notes
- Login page uses Tailwind utility classes
- Dashboard and other views use structured CSS in src/App.css
- Icons are inline SVGs for consistency and control
- Responsive design with mobile-friendly layouts

## Brand Tokens
- Primary: #1F4D3E
- Accent: #2F7D6D
- Soft Background: #F5F3EF
- Heading Text: #1A1A1A
- Muted Text: #6B7280
- Gold Accent: #C8A97E
- Fonts: Playfair Display (headings), Inter (body)

## Recent Updates
- Complete appointment booking system implementation
- 5-step form with validation
- Payment processing integration
- Terms & Conditions with mandatory acceptance
- Success confirmation with transaction IDs
updated by Sandhya
