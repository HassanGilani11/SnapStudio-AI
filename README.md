# ✨ SnapStudio AI

**SnapStudio AI** is a high-end product photography editor powered by the latest **Gemini 2.5 and 3.0** models. It allows e-commerce sellers, creators, and photographers to transform raw product shots into professional studio-quality assets using simple natural language instructions.

## 🚀 Key Features

- **Multi-Model Redundancy**: Intelligent fallback system that automatically switches between `Gemini 2.5 Flash Image` and `Gemini 3 Pro Image` if quota limits are reached.
- **Professional Mode**: Allows users to select their own paid API key to bypass free tier quotas and access higher resolution processing.
- **Background Removal & Replacement**: Instantly isolate products or place them in premium studio environments.
- **Natural Language Editing**: Type instructions like "Add a soft shadow" or "Make the lighting more dramatic".
- **Real-time Comparison**: Interactive slider to compare your original shot with the AI-enhanced version.

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS
- **AI Engine**: Google Gemini Multimodal Models
- **Build Tool**: Vite

## ⚙️ Getting Started

### Environment Variables

To run the app, you need a `API_KEY` in your environment. For production (Vercel), add `API_KEY` to your Project Settings.

```env
API_KEY=your_gemini_api_key_here
```

### Quota Management

If you encounter a `429 Quota Exceeded` error, SnapStudio will try to use secondary models automatically. If all models are exhausted, use the **Professional Mode** button in the sidebar to provide a billing-enabled key from your Google Cloud project.

## 📄 License

MIT
