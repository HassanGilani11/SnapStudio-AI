# ✨ SnapStudio AI

**SnapStudio AI** is a high-end product photography editor powered by the latest **Gemini 2.5 Flash Image** model. It allows e-commerce sellers, creators, and photographers to transform raw product shots into professional studio-quality assets using nothing but natural language instructions.

![SnapStudio AI Preview](https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1000) *(Placeholder for app screenshot)*

## 🚀 Features

- **Background Removal & Replacement**: Instantly isolate products or place them on marble tables, in nature, or against clean studio backdrops.
- **Natural Language Editing**: Type "make the lighting warmer" or "remove the dust and scratches" and watch the AI execute complex edits.
- **Smart Presets**: One-click professional workflows for:
  - ✨ Seamless Background Removal
  - 💡 Professional Studio Lighting
  - 🌓 Realistic Soft Shadows
  - 🌿 Nature/Outdoor Environments
- **Non-Destructive History**: Keep track of your edits and iterate on the perfect shot.
- **High Fidelity**: Leverages the vision-comprehension of Gemini 2.5 to maintain product details while modifying the environment.

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **AI Engine**: [Google Gemini 2.5 Flash Image](https://ai.google.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## ⚙️ How it Works

SnapStudio AI uses a "Vision-to-Image" pipeline. Unlike traditional filters, it interprets your text prompt in the context of the uploaded image. The **Gemini 2.5 Flash Image** model understands spatial relationships, lighting, and textures, allowing it to regenerate parts of the image (like backgrounds) while keeping the subject intact.

## 🛠️ Getting Started

### Prerequisites

- An API Key from [Google AI Studio](https://aistudio.google.com/).
- Node.js installed on your machine.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/snapstudio-ai.git
   cd snapstudio-ai
   ```

2. **Set up environment variables**
   Create a `.env` file in the root directory and add your API key:
   ```env
   API_KEY=your_gemini_api_key_here
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Run the app**
   ```bash
   npm start
   ```

## 🎨 UI Overview

- **The Sidebar**: Contains the prompt engine and quick-action presets.
- **The Stage**: A side-by-side comparison view showing the `Original` and the `AI-Edited` output.
- **The Controls**: Easy access to image downloading and clearing the workspace.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

*Built with ❤️ using Google Gemini.*
