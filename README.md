# ♻️ Waste Management Website

A web-based platform designed to connect waste sellers with potential buyers and promote recycling, reuse, and sustainable waste management. Users can register as buyers or sellers, and sellers can create waste listings with details such as material type, weight, price, location, and contact information.

## 📌 Project Overview

The Waste Management Website aims to simplify the process of finding and trading recyclable waste materials through a centralized digital platform. It helps sellers showcase available waste materials and enables buyers to discover materials that may be suitable for reuse or recycling.

## 🎯 Objectives

- Encourage recycling and responsible waste management.
- Connect waste sellers with potential buyers.
- Provide a structured system for waste material listings.
- Store user profiles and waste listing information securely.
- Track listing availability and status.
- Support sustainable resource utilization.

## ✨ Features

- **User Registration:** Store user details, contact information, and address.
- **Role-Based Users:** Support BUYER and SELLER roles.
- **Waste Listings:** Store waste type, weight, unit, price, and description.
- **Location Details:** Maintain listing locations and addresses.
- **Seller Information:** Associate each waste listing with its seller.
- **Listing Status:** Manage listings using ACTIVE, SOLD, and PENDING statuses.
- **Database Indexing:** Improve lookup efficiency for seller and listing status queries.
- **Persistent Storage:** Use SQLite for local database storage.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Next.js | Web application framework |
| React | User interface |
| TypeScript / JavaScript | Application development |
| Prisma ORM | Database access and schema management |
| SQLite | Relational database |
| Tailwind CSS | UI styling, if configured |
| Node.js | Runtime environment |
| Git and GitHub | Version control and collaboration |

## 🗄️ Database Design

The application uses Prisma ORM with an SQLite database.

### 1. User Model

Stores registered user information.

| Field | Description |
|---|---|
| `id` | Unique user identifier |
| `email` | Unique email address |
| `password` | Stored password value |
| `firstName` | User's first name |
| `lastName` | User's last name |
| `phone` | Contact number |
| `role` | BUYER or SELLER |
| `company` | Optional company name |
| `businessType` | Optional business category |
| `address` | Street or postal address |
| `city` | City |
| `state` | State |
| `zipCode` | Postal code |
| `createdAt` | Account creation timestamp |
| `updatedAt` | Last update timestamp |

### 2. WasteListing Model

Stores information about waste materials available on the platform.

| Field | Description |
|---|---|
| `id` | Unique listing identifier |
| `type` | Type of waste material |
| `weight` | Weight of the material |
| `unit` | Unit of measurement |
| `price` | Listed price |
| `location` | Listing location |
| `address` | Listing address |
| `contactNumber` | Contact number for the listing |
| `description` | Details about the material |
| `status` | ACTIVE, SOLD, or PENDING |
| `createdAt` | Listing creation timestamp |
| `sellerId` | Identifier of the seller |

### 3. Relationships

- One seller can create multiple waste listings.
- Each waste listing belongs to one seller.
- Each user has a unique email address.
- Listing status defaults to `ACTIVE`.
- User IDs and listing IDs are generated using Prisma's `cuid()` function.

## 🏗️ System Architecture

The application follows a web application architecture:

1. **Frontend:** Provides the user interface for interacting with the platform.
2. **Application Layer:** Handles application logic and database operations.
3. **Prisma ORM:** Connects application code to the database.
4. **SQLite Database:** Stores users and waste listings.

## ⚙️ Installation and Setup

### Prerequisites

- Node.js and npm
- Git
- Visual Studio Code (recommended)

### Step 1: Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

### Step 2: Navigate to the Project Folder

```bash
cd "waste management website"
```

Adjust the folder name if your local project uses a different name.

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Configure Environment Variables

Create or update the `.env` file in the project root:

```env
DATABASE_URL="file:./dev.db"
```

Use the database URL appropriate for your existing Prisma setup. Do not upload secrets or sensitive credentials to GitHub.

### Step 5: Generate Prisma Client

```bash
npx prisma generate
```

### Step 6: Synchronize the Database

If you use Prisma Migrate:

```bash
npx prisma migrate dev --name init
```

Alternatively, if your project uses schema synchronization without migrations:

```bash
npx prisma db push
```

Use the method that matches your existing database setup.

### Step 7: Start the Development Server

```bash
npm run dev
```

Open the local URL shown in your terminal, usually:

`http://localhost:3000`

## 📂 Project Structure

```text
waste-management-website/
├── prisma/
│   ├── schema.prisma
│   └── dev.db
├── src/
│   └── app/
├── public/
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
├── next.config.js
├── tailwind.config.js
├── netlify.toml
└── vercel.json
```

The exact folders and configuration files may differ based on your implementation.

## 🔐 Security Considerations

- Passwords should be hashed before being stored in the database.
- Authentication and authorization should be implemented to protect user accounts and listings.
- Environment files containing secrets should be excluded from version control.
- Server-side validation should be used for user input and listing data.
- Only authorized users should be allowed to modify or delete their own listings.

## 🚀 Future Enhancements

- Search and filter waste listings by category and location.
- Add buyer and seller dashboards.
- Implement secure authentication and authorization.
- Add images for listed waste materials.
- Integrate online payments.
- Add notifications for listing updates.
- Introduce an administrator dashboard.
- Provide analytics and reports on recycling activity.
- Add map-based discovery of nearby listings.

## 🌍 Expected Impact

The project aims to improve access to recyclable materials, support waste recovery, encourage reuse, and contribute to more sustainable waste
