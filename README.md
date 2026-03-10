# 💸 PayTM-like App: Full-Stack Payments Monorepo

A high-performance, distributed payments platform built with **Next.js**, **Node.js**, and **PostgreSQL**. This project features a decoupled architecture, secure P2P transfers, and an automated bank-webhook processing system.

## 🚀 Technical Highlights

- **Monorepo Architecture:** Managed via **Turborepo** and **npm workspaces** to optimize build pipelines and enable seamless code sharing across frontend and backend services.
- **Decoupled Microservices:** Independent deployment of the **User-App** (Next.js) and **Bank-Webhook** (Express) for optimized scaling on **Render**.
- **Atomic Transactions:** Leverages **Prisma Transactions** to ensure ACID compliance during wallet balance updates and P2P transfers.
- **Security Migration:** Successfully transitioned from plaintext storage to **Bcrypt hashing**, implementing a hybrid "auto-upgrade" logic to secure legacy user data.
- **CI/CD & DevOps:** Automated deployment pipelines using **GitHub Actions** and **Docker** to ensure environment parity and streamlined service updates.

## 🛠️ Tech Stack

- **Frontend:** Next.js 14 (App Router), Tailwind CSS, NextAuth.js
- **Backend:** Node.js, Express.js, TypeScript
- **Database:** PostgreSQL, Prisma ORM, Neon DB
- **Infrastructure:** Docker, Render, GitHub Actions, Turborepo

---

## 🏗️ System Design

The application is split into two primary services that share a common database schema and shared TypeScript types:

1.  **User-App:** Handles the UI, user authentication, dashboard visualization, and P2P transfer requests.
2.  **Bank-Webhook:** A "headless" service that listens for external bank notifications to fulfill "Add Money" requests asynchronously.

---

## 🏗️ System Architecture

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#3b82f6', 'edgeLabelBackground':'#ffffff', 'tertiaryColor': '#f3f4f6'}}}%%
graph TD
    subgraph External ["External Actors"]
        User([👤 User Browser])
        BankApi[🏦 External Bank API]
    end

    subgraph RenderDeployment ["Render Deployment (Monorepo)"]
        style RenderDeployment fill:#f8fafc,stroke:#cbd5e1,stroke-width:2px,stroke-dasharray: 5 5

        subgraph Services ["Microservices"]
            UserApp["🖥️ User App (Next.js)
            (Auth, Dashboard, P2P)"]
            WebhookApp["⚙️ Bank Webhook (Express)
            (Async Balance Updates)"]
        end

        subgraph SharedLibs ["Shared Packages"]
            PrismaClient["📦 @repo/db
            (Prisma Client & Schema)"]
        end
    end

    subgraph DataLayer ["Data  Layer"]
        Postgres[(🗄️ PostgreSQL DB
        Neon DB)]
    end

    %% Connections
    User ==>|HTTPS / NextAuth| UserApp
    BankApi ==>|POST Webhook| WebhookApp

    UserApp -.->|Imports| PrismaClient
    WebhookApp -.->|Imports| PrismaClient

    PrismaClient ==>|"TCP Connection
    (Transactions/Queries)"| Postgres

    %% Styling classes
    classDef external fill:#fff1f2,stroke:#e11d48,stroke-width:2px;
    classDef service fill:#dbeafe,stroke:#2563eb,stroke-width:2px;
    classDef shared fill:#f3f4f6,stroke:#64748b,stroke-width:1px,stroke-dasharray: 5 5;
    classDef database fill:#fef3c7,stroke:#d97706,stroke-width:2px;

    class User,BankApi external;
    class UserApp,WebhookApp service;
    class PrismaClient shared;
    class Postgres database;
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v18+)
- Docker (Optional)
- PostgreSQL instance (or Neon DB account)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/rah7202/paytm.git
    cd paytm
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Setup Environment Variables:**
    Create a `.env` file in the root and add your `DATABASE_URL` and `NEXTAUTH_SECRET`.

4.  **Database Migration & Seeding:**

    ```bash
    npx prisma migrate dev
    npx prisma db seed
    ```

5.  **Run the application:**
    ```bash
    npm run dev
    ```

---

## 🐳 Docker Deployment

To run the entire ecosystem (Frontend, Backend, and DB) locally using Docker:

```bash
docker-compose up --build
```
