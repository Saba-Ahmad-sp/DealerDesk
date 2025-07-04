This is a [Next.js](https://nextjs.org) project Created with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# DealerDesk

## Getting Started (How to Run the Project)
First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Then open http://localhost:3000 in your browser to see the app in action.

## 👤 Authentication Guide
Click on "Create Account" to register a new user.
Your user data (Full Name, Email and Password) will be securely stored in the browser's localStorage.
After registering, you can also:
Log out.

Then log back in anytime using the same credentials via the "Login" form.
⚠️ Note: This project uses client-side authentication only (no backend), intended for demonstration purposes.


## 🚀 Enhancements & Features

### 🛒 State Management & Persistence
- **Cart and Orders Persistence**: Utilized `localStorage` to retain cart and past order data across sessions.
- **Custom Hook - `useCart`**: Abstracted cart logic using React Context and a custom hook for cleaner and reusable state access.

### 🔍 User Experience Improvements
- **Product Filtering**: Real-time filtering of products via a search bar.
- **Toast Notifications**: Feedback alerts for user actions like placing orders using a toast system.
- **Loading Shimmer Effect**: Skeleton loaders to enhance the UI while fetching content.
- **Basic Error Handling**: Graceful handling of common UI and network failures.

### 🔐 Authentication Enhancements
- **Form Validation**: Login and registration forms include:
  - Valid email format validation
  - User existence and password checks (basic logic)

### 🧩 Type Safety & Code Quality
- **TypeScript Interfaces / PropTypes**: Structured definitions for product, order, and cart types to ensure type safety and improve maintainability.


## ⏱ Aproximate Time Spent
- **Total Time Invested**: ~25–30 hours  
- **Development Period**: 4 days  
- **Daily Average**: ~6–8 hours/day
 
 
