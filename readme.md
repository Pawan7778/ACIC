# Interactive 3D Campus Experience 🚀

![Award](https://img.shields.io/badge/Act2Innovate_Competition-2nd_Runner--Up-blue?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Engine-Verge3D-orange?style=for-the-badge)
![Platform](https://img.shields.io/badge/Platform-Web-brightgreen?style=for-the-badge)

An award-winning, immersive 3D web experience of a college campus, designed as a proof-of-concept for virtual tours and remote event planning.

---

### 🔴 Live Demo

**[Check out the live project here!](https://pawan7778.github.io/ACIC/ACIC.html)**

---

 
*A short demonstration of the campus navigation and interactive features.*

## 🏆 Award-Winning Project

This project was developed for the **Act2Innovate** hackathon, organized by the **Atal Community Innovation Centre (ACIC) at IIT(ISM) Foundation**. I am proud to have been awarded **2nd Runner-up** for demonstrating an innovative and practical solution for virtual site visualization.

The core idea was to show how public institutions like universities can leverage 'digital twins' to allow prospective students, parents, and event planners to explore a location immersively from anywhere in the world.

## ✨ Key Features

*   **🚶‍♂️ First-Person Navigation:** Explore the campus environment with familiar WASD and mouse controls.
*   **🎯 Interactive Hotspots:** Click on key buildings and points of interest to get more information (a feature built with the Puzzles editor).
*   **⚡ Optimized for Web:** 3D models and textures were carefully optimized in Blender to ensure smooth, real-time performance and fast loading speeds directly in the browser.
*   **🌐 End-to-End Pipeline:** Managed the complete workflow from 3D modeling in Blender to final deployment on the web using the Verge3D toolkit.

## 🛠️ Technology & Tools Used

*   **3D Engine:** **Verge3D** (for bridging Blender and the web)
*   **3D Modeling:** **Blender** (for creating and optimizing all 3D assets)
*   **Interactive Logic:** **Puzzles Editor** (Verge3D's visual scripting system for interactivity)
*   **Web Technologies:** **HTML5, CSS3, JavaScript**

## 🔧 Getting Started & Running Locally

This project can be run directly in a web browser, but requires a local server to handle asset loading correctly.

**Prerequisites:**
*   A modern web browser (Chrome, Firefox, Edge)
*   A local web server (like the `Live Server` extension for VS Code)

**Instructions:**
1.  **Clone the repository:**
    ```sh
    git clone https://github.com/Pawan7778/ACIC.git
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd ACIC
    ```
3.  **Start a local server:**
    *   If you have the **Live Server** extension in VS Code, right-click on `ACIC.html` and select "**Open with Live Server**".
    *   Alternatively, you can use Python's built-in server:
      ```sh
      python -m http.server
      ```
4.  Open your browser and navigate to `http://localhost:8000/ACIC.html` (the port may vary).

## 📂 Project Structure

The repository contains the standard output from a Verge3D project:
