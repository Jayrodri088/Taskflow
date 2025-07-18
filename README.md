# TaskFlow Pro

![TaskFlow Pro Dashboard](https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-GMecCGLVvZaUKImGBnKvmfNhoUSkf1.png)

TaskFlow Pro is a modern, intuitive task management and team collaboration web application designed to streamline your workflow, enhance productivity, and simplify project coordination. With a sleek dark interface and smooth animations, it provides a premium user experience for individuals and teams.

## ✨ Features

*   **Intuitive Task Management**: Create, organize, and track tasks with detailed descriptions, priorities, and due dates.
*   **Team Collaboration**: Assign tasks to team members, manage roles, and keep everyone in sync.
*   **Smart Scheduling**: Plan your work effectively with clear task statuses.
*   **User Authentication**: Secure sign-up and login using local storage for a quick start.
*   **Dynamic Dashboard**: Get an overview of your tasks, their statuses, and team activities.
*   **Responsive Design**: Optimized for various screen sizes, from desktop to mobile.
*   **GSAP Animations**: Enjoy a fluid and engaging user experience with subtle yet impactful animations.
*   **Modern UI**: A dark theme with high contrast, glass effects, and vibrant color-coded elements for clarity.

## 🚀 Technologies Used

*   **Next.js 15**: React framework for building performant web applications (App Router).
*   **React**: A JavaScript library for building user interfaces.
*   **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
*   **shadcn/ui**: Reusable UI components built with Radix UI and Tailwind CSS.
*   **GSAP (GreenSock Animation Platform)**: A robust JavaScript animation library for professional-grade animations.
*   **TypeScript**: For type-safe code.

## 📦 Local Setup

To get TaskFlow Pro up and running on your local machine, follow these steps:

1.  **Clone the repository (if applicable):**
    ```bash
    git clone <your-repo-url>
    cd taskflow-pro
    ```
    *(If you created the project manually, navigate to your project directory.)*

2.  **Install Dependencies:**
    Make sure you have Node.js (v18+) and npm/yarn installed. Then, install the project dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Ensure Tailwind CSS Configuration is Up-to-Date:**
    Verify your `tailwind.config.ts` and `app/globals.css` match the latest provided configurations to ensure all styles and colors render correctly. Specifically, ensure the `content` array in `tailwind.config.ts` includes `./utils/**/*.{ts,tsx}`.

4.  **Run the Development Server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

5.  **Access the Application:**
    Open your browser and navigate to `http://localhost:3000`.

## 💡 Usage

*   **Landing Page (`/`)**: Introduction to TaskFlow Pro.
*   **Onboarding (`/onboarding`)**: A guided tour of the app's features.
*   **Sign Up (`/auth/signup`)**: Create a new account.
*   **Login (`/auth/login`)**: Sign in to your existing account.
*   **Dashboard (`/dashboard`)**: Your main workspace for managing tasks.
    *   **Create New Task**: Use the "New Task" button to add tasks, assign them, set priority, status, and due dates.
    *   **Team Management**: Use the "Add Member" button to manage your team.
    *   **Filter & Search**: Easily find tasks using the search bar and status filters.
    *   **Task Views**: Switch between "All Tasks", "Assigned to Me", and "Assigned by Me" tabs.

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please feel free to open an issue or submit a pull request.

## 📄 License

This project is open-source and available under the [MIT License](https://opensource.org/licenses/MIT).
