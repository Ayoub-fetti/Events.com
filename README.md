# 🎉 Events.com - Event Management Platform

A comprehensive full-stack event management platform built with NestJS and Next.js. This application enables users to browse, create, and manage events, while participants can make reservations and download professional PDF tickets.

## 🚀 Features

### For Administrators
- **Event Management**: Create, update, publish, and cancel events
- **Image Upload**: Upload and manage event images
- **Reservation Management**: View and manage all reservations
- **Dashboard**: Monitor event statistics and reservations
- **User Management**: Admin panel for user oversight

### For Participants
- **Event Discovery**: Browse and search published events
- **Reservation System**: Book spots for events with capacity tracking
- **PDF Tickets**: Download professional event tickets with QR codes
- **Reservation History**: View and manage personal reservations
- **Profile Management**: Update personal information

### System Features
- **JWT Authentication**: Secure role-based authentication
- **Role-Based Access Control**: Admin and Participant roles
- **Real-time Validation**: Capacity checks and duplicate reservation prevention
- **Responsive Design**: Modern UI with Tailwind CSS
- **Docker Support**: Containerized deployment

## 🛠️ Technology Stack

### Backend
- **Framework**: NestJS (Node.js)
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **File Handling**: Multer for image uploads
- **PDF Generation**: PDFKit
- **Validation**: DTOs with class-validator

### Frontend
- **Framework**: Next.js 14 (React)
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Forms**: React Hook Form

### DevOps & Tools
- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **Package Management**: npm
- **Testing**: Jest (Unit & E2E)
- **Code Quality**: ESLint, Prettier

## 📁 Project Structure

```
Events.com/
├── apps/
│   ├── api/                 # NestJS Backend
│   │   ├── src/
│   │   │   ├── auth/        # Authentication module
│   │   │   │   ├── controllers/
│   │   │   │   ├── services/
│   │   │   │   ├── strategies/
│   │   │   │   ├── guards/
│   │   │   │   └── dto/
│   │   │   ├── events/      # Events management
│   │   │   ├── reservations/ # Reservations system
│   │   │   ├── users/        # User management
│   │   │   ├── pdf/          # PDF ticket generation
│   │   │   ├── config/       # Configuration modules
│   │   │   └── common/       # Shared utilities
│   │   ├── test/            # E2E and unit tests
│   │   ├── uploads/         # Uploaded files
│   │   └── Dockerfile
│   │
│   └── web/                 # Next.js Frontend
│       ├── src/
│       │   ├── app/         # Next.js App Router pages
│       │   │   ├── admin/   # Admin dashboard
│       │   │   ├── auth/    # Authentication pages
│       │   │   └── participant/ # Participant area
│       │   ├── components/  # Reusable components
│       │   ├── hooks/       # Custom React hooks
│       │   ├── services/    # API services
│       │   ├── store/       # Redux store
│       │   ├── types/       # TypeScript definitions
│       │   ├── lib/         # Utilities
│       │   └── _tests_/     # Frontend tests
│       └── Dockerfile
│
├── conception/              # Design documents
├── docker-compose.yml       # Docker orchestration
├── package.json            # Root package.json
└── README.md              # This file
```

## 🏃 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- MongoDB (local or cloud)
- Docker & Docker Compose (optional)

### Installation

1. **Clone the repository**
   ```bash
   cd /home/ayoub/Documents/youcode/Events.com
   ```

2. **Install dependencies for all apps**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**

   For the API:
   ```bash
   cp apps/api/.env.example apps/api/.env
   # Edit with your configuration
   ```

   For the Web:
   ```bash
   cp apps/web/.env.example apps/web/.env
   # Edit with your configuration
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```

   This will start:
   - API server: http://localhost:3000
   - Web server: http://localhost:3001

## 🐳 Docker Deployment

### Build and Run with Docker

```bash
# Build all services
npm run docker:build

# Start all services in detached mode
npm run docker:up

# View logs
npm run docker:logs

# Stop all services
npm run docker:down
```

### Manual Docker Compose Commands

```bash
# Build
docker compose build

# Start
docker compose up -d

# Stop
docker compose down

# View logs
docker compose logs -f
```

### Environment Variables

#### API (.env.production)
```env
MONGODB_URI=mongodb://mongodb:27017/events-db
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=24h
PORT=3000
```

#### Web (.env.production)
```env
NEXT_PUBLIC_API_URL=http://api:3000
NEXT_PUBLIC_APP_URL=http://web:3000
```

## 📡 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "role": "participant" // or "admin"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "...",
    "email": "john@example.com",
    "fullName": "John Doe",
    "role": "participant"
  }
}
```

### Events Endpoints

#### Get All Events (Admin Only)
```http
GET /events
Authorization: Bearer <token>

Query Parameters:
- status?: draft | published | canceled
- dateFrom?: ISO Date
- dateTo?: ISO Date
```

#### Get Published Events (Public)
```http
GET /events/published
Query Parameters:
- status?: draft | published | canceled
- dateFrom?: ISO Date
- dateTo?: ISO Date
```

#### Get Single Event
```http
GET /events/:id
Authorization: Bearer <token>
```

#### Create Event (Admin Only)
```http
POST /events
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "title": "Event Title",
  "description": "Event description",
  "location": "Event location",
  "date": "2024-12-25T18:00:00Z",
  "capacity": 100,
  "image": <file>
}
```

#### Update Event (Admin Only)
```http
PUT /events/:id
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

#### Publish Event (Admin Only)
```http
PATCH /events/:id/publish
Authorization: Bearer <token>
```

#### Cancel Event (Admin Only)
```http
PATCH /events/:id/cancel
Authorization: Bearer <token>
```

#### Delete Event (Admin Only)
```http
DELETE /events/:id
Authorization: Bearer <token>
```

### Reservations Endpoints

#### Create Reservation (Participant)
```http
POST /reservations
Authorization: Bearer <token>
Content-Type: application/json

{
  "eventId": "event-id-here"
}
```

#### Get My Reservations (Participant)
```http
GET /reservations/my-reservations
Authorization: Bearer <token>
```

#### Cancel Reservation (Participant)
```http
PATCH /reservations/:id/cancel
Authorization: Bearer <token>
```

#### Download Ticket (Participant)
```http
GET /reservations/:id/ticket
Authorization: Bearer <token>
```

#### Get All Reservations (Admin)
```http
GET /reservations
Authorization: Bearer <token>
```

#### Get Reservations by Event (Admin)
```http
GET /reservations/event/:eventId
Authorization: Bearer <token>
```

#### Get Reservation Count (Admin/Participant)
```http
GET /reservations/event/:eventId/count
Authorization: Bearer <token>
```

#### Update Reservation Status (Admin)
```http
PATCH /reservations/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "confirmed" // pending, confirmed, refused, canceled
}
```

## 🔐 User Roles

### Admin
- Full access to all endpoints
- Create, update, publish, and cancel events
- Manage all reservations
- View system statistics

### Participant
- Browse published events
- Create reservations
- Download tickets
- Manage personal reservations

## 📝 Database Models

### User
```typescript
{
  fullName: string;
  email: string;
  password: string;
  role: 'admin' | 'participant';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Event
```typescript
{
  title: string;
  description: string;
  location: string;
  date: Date;
  capacity: number;
  status: 'draft' | 'published' | 'canceled';
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Reservation
```typescript
{
  eventId: ObjectId (ref: Event);
  userId: ObjectId (ref: User);
  status: 'pending' | 'confirmed' | 'refused' | 'canceled';
  createdAt: Date;
  updatedAt: Date;
}
```

## 🧪 Testing

### Backend Tests

```bash
cd apps/api

# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Run tests with coverage
npm run test:cov
```

### Frontend Tests

```bash
cd apps/web

# Run unit tests
npm run test

# Run tests with coverage
npm run test:cov
```

### Complete Flow E2E Tests

The project includes comprehensive end-to-end tests covering:
- Complete user journey from registration to ticket download
- Admin event management workflow
- Reservation system validation
- Cancellation and status update flows

## 🔧 Configuration

### JWT Configuration

```typescript
// Default configuration
{
  secret: 'your-secret-key',
  expiresIn: '24h'
}
```

### MongoDB Configuration

```typescript
// Connection string format
mongodb://localhost:27017/events-db
// Or use cloud URI
mongodb+srv://<username>:<password>@cluster.mongodb.net/events-db
```

### File Upload Configuration

- **Location**: `./uploads/events`
- **Max File Size**: 10MB
- **Allowed Types**: jpg, jpeg, png, gif

## 🎨 Frontend Pages

### Public Pages
- `/` - Landing page with featured events
- `/auth/login` - Login page
- `/auth/register` - Registration page

### Admin Pages
- `/admin/dashboard` - Admin dashboard
- `/admin/events` - Event management
- `/admin/events/create` - Create new event
- `/admin/events/[id]` - Edit event
- `/admin/reservations` - Reservation management
- `/admin/users` - User management

### Participant Pages
- `/participant/dashboard` - Personal dashboard
- `/participant/events` - Browse events
- `/participant/reservations` - My reservations
- `/participant/profile` - Profile management

## 📦 Key Libraries

### Backend
- `@nestjs/common` - Core NestJS utilities
- `@nestjs/mongoose` - MongoDB integration
- `@nestjs/jwt` - JWT authentication
- `@nestjs/config` - Configuration management
- `bcrypt` - Password hashing
- `pdfkit` - PDF generation
- `multer` - File upload handling

### Frontend
- `next` - Next.js framework
- `@reduxjs/toolkit` - State management
- `react-hook-form` - Form handling
- `axios` - HTTP client
- `tailwindcss` - Styling
- `lucide-react` - Icons

## 🚀 Deployment

### Production Build

```bash
# Build both applications
npm run build

# Build API
npm run build:api

# Build Web
npm run build:web
```

### Environment Setup

For production, ensure all environment variables are properly set in the `.env.production` files for both applications.

### Docker Production

```bash
# Build production images
docker compose -f docker-compose.yml build

# Run in production mode
docker compose -f docker-compose.yml up -d
```

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support, please open an issue in the repository or contact the development team.

---

Built with ❤️ using NestJS, Next.js, and MongoDB

