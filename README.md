# 🎱 UL Pool Club Website

The official website for the **University of Limerick Pool Club**, built and maintained by Killian Murnane. Designed to provide members and visitors with access to club news, event signups, booking functionality, and member profiles.

> 🚫 This project is private and intended for internal club use only.

---

## 🚀 Tech Stack

- **Frontend**: [Next.js 15](https://nextjs.org/), [React 19](https://react.dev)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Database**: [Prisma ORM](https://www.prisma.io/) with PostgreSQL
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Validation**: [Zod](https://zod.dev/)
- **Hosting**: Vercel or custom deployment

---

## 🛠 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/killmur/Pool-Club-App.git
cd ul-pool-club
npm install
```

### Running the App

Starting the dev server:
```bash
npm run dev
```

Building and starting the app for production:
```bash
npm run build
npm start
```

---

## 📄 Available Scripts

```bash
npm run dev              # Starts the development server locally
npm run build            # Builds the project for production
npm run start            # Runs the production server
npm run lint             # Runs ESLint to check for code issues
npm run format           # Formats the code using Prettier
```

---

## 🔐 Environment Variables

Create a .env file in the root directory and add the following:
```ini
DATABASE_URL=your_postgres_connection
NEXTAUTH_SECRET=some_random_string
NEXTAUTH_URL=http://localhost:3000
```
---

## 📁 Project Structure

```bash
/
├── pages/             # Next.js page routes
├── components/        # Reusable UI components
├── styles/            # Tailwind / global styles
├── lib/               # Utility functions
├── prisma/            # Prisma schema and client
└── public/            # Static files
```

---

## 📜 License

© 2025 Killian Murnane. All rights reserved.

This project is intended for internal club use only. Redistribution, commercial use, or derivative works are prohibited without express written permission from the UL Pool Club executive committee.

---

## 🧠 Notes

Developed and maintained by Killian Murnane, current Captain of the UL Pool Club as of 2025.

For questions or contributions, please contact the captain or open a GitHub issue (if you have access).

---

## 🤝 Acknowledgments

Thanks to the UL Students' Union, UL Clubs & Societies Office and UL Sports for their ongoing support.

## 📬 Contact
For any questions or inquiries, feel free to contact [Killian Murnane](mailto:killmur1@gmail.com).

Open an issue in this repository if you have any technical questions or need assistance.
