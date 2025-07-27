# 🌀 Circular Carousel (React)

A visually rich, animated circular carousel built entirely with React. Each card represents a travel destination, rotating around a central axis. The right-most card (at 0° or 3 o'clock position) expands to show detailed content.

---

## 🚀 Features

- 🔄 Circular layout with 8 cards
- 🖱️ Mouse scroll-based rotation
- 🎯 Auto-rotation via buttons (clockwise / anticlockwise)
- 🧭 Expanding feature card at the 0° (right) position
- 💬 Display panel with info for the featured card
- ✨ Smooth transitions and stylish effects

---

## ⚙️ Getting Started

Clone the repo and run the app locally:

```bash
git clone https://github.com/yashraj4/react-circular-carousel.git
cd your-repo
npm install
npm start
```

## 🎮 Controls & Usage

| Action | Description |
|--------|-------------|
| 🖱️ **Mouse Scroll**         | Rotates the wheel manually |
| 🔁 **Clockwise Button**     | Starts auto‑rotation clockwise |
| 🔁 **Anticlockwise Button** | Starts auto‑rotation anticlockwise |
| ⛔ **Stop Button**          | Stops any auto‑rotation in progress |

---

## ⚠️ Important Instructions

> [!CAUTION]
> **Do _not_ click “Clockwise” or “Anticlockwise” multiple times without pressing “Stop” first.**  
> Each button starts a new auto‑rotation loop, and stacking them can break the snapping or animations.  
> **Always press “Stop” before triggering another auto‑rotate direction.**

> [!NOTE]
>  **Mouse scroll won't work while auto‑rotation is running.**

---

## 🖼️ Card Contents

Each card displays:

- 📍 **Travel‑destination image**
- 📄 **Description** shown in a panel next to the expanded card

---

## 📁 Project Structure

```text
src/
├── components/
│   ├── Wheel.js         # Main carousel logic
│   ├── Card.js          # Individual card rendering
│ 
├── App.js               # Main entry point
└── index.js             # Renders App component
```
---

## 📸 Screenshots 
![Image](https://github.com/user-attachments/assets/69ee6261-d84c-47c1-bd7f-eb0592ead652)
