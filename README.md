# 🏠 SmartHome — Home Automation Dashboard

A full-stack home automation system where users can manage smart devices (lights, fans, thermostats, locks) across multiple rooms, set automation rules, and monitor usage — all through a clean, simple dashboard.

Since no physical hardware is used, devices are **simulated in software**: their states change through user actions and a backend simulation engine that mimics real-world sensor behavior (e.g., temperature drift, response delay).

---

## ✨ Features

- 🔐 **Authentication** — JWT-based login/signup with role-based access (Admin/User)
- 🏘️ **Home → Room → Device hierarchy** — organize devices by room
- 💡 **Device control** — toggle switches, sliders, and buttons for lights, fans, thermostats, locks, plugs
- ⚡ **Real-time updates** — device state changes sync live across tabs/clients via WebSocket
- 🤖 **Automation rules** — define simple "if-this-then-that" rules (e.g., *if temperature > 30°C, turn on fan*)
- 📊 **Usage analytics** — charts showing device usage and estimated energy cost
- 🔔 **Notifications** — alerts when automation rules trigger or devices stay on/unlocked too long
- 🎛️ **Simulated device engine** — backend job that mimics sensor fluctuations and device response delay

---

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + TypeScript, Vite, Tailwind CSS, Recharts, STOMP.js / SockJS |
| Backend | Java Spring Boot, Spring Security (JWT), Spring WebSocket |
| Database | PostgreSQL (or MySQL) |
| Scheduling | Spring `@Scheduled` (device simulation + rule evaluation) |
| Deployment | Docker Compose, Vercel/Netlify (frontend), Render/Railway (backend) |

---

## 🎨 Design Philosophy

Kept intentionally **simple and minimal**:
- Card-based layouts for rooms/devices — no clutter, no unnecessary nesting
- Neutral color palette with clear on/off state indicators
- Mobile-responsive from day one
- Few clicks to control any device from the dashboard

---

## 🗂️ Project Structure

```
smart-home/
├── frontend/               # React + TypeScript app
│   ├── src/
│   │   ├── components/     # Reusable UI (DeviceCard, RoomGrid, Sidebar, etc.)
│   │   ├── pages/          # Dashboard, Rooms, Login, Rules, Analytics
│   │   ├── context/        # Auth & global state
│   │   ├── services/       # API + WebSocket service layer
│   │   └── types/          # Shared TypeScript interfaces
│   └── ...
├── backend/                 # Spring Boot app
│   ├── src/main/java/...
│   │   ├── controller/      # REST controllers
│   │   ├── service/         # Business logic + simulation engine
│   │   ├── repository/      # Spring Data JPA repos
│   │   ├── model/           # Entities: User, Home, Room, Device, Rule, DeviceLog
│   │   ├── security/        # JWT + Spring Security config
│   │   └── websocket/       # STOMP config
│   └── ...
├── docker-compose.yml
└── README.md
```

---

## 🗺️ Data Model (high level)

```
User ──< Home ──< Room ──< Device ──< DeviceLog
                              │
                              └──< AutomationRule
```

- **User** — id, name, email, password (hashed), role
- **Home** — id, name, owner (User)
- **Room** — id, name, home (Home)
- **Device** — id, name, type (LIGHT/FAN/THERMOSTAT/LOCK/PLUG), state (JSON: on/off, value), room (Room)
- **DeviceLog** — id, device, previous state, new state, timestamp
- **AutomationRule** — id, condition (e.g., `temperature > 30`), action (e.g., `turn on fan`), device, enabled

---

## 📅 Development Plan (Frontend-First, 10 Weeks)

| Week | Focus |
|---|---|
| 1 | Project setup + static UI shell (mock data) |
| 2 | Interactive device cards + room views |
| 3 | Auth UI + global state + API service layer (mocked) |
| 4 | Automation rules UI + analytics charts (mocked) |
| 5 | Spring Boot setup + DB schema + real CRUD APIs |
| 6 | Auth & security (JWT, roles) |
| 7 | WebSocket real-time layer + device simulation engine |
| 8 | Automation rules engine (backend logic) |
| 9 | Analytics backend + notifications |
| 10 | Testing, Docker, deployment, documentation |

---

## 🚀 Getting Started

> Setup instructions will be filled in as each part is built.

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
./mvnw spring-boot:run
```

### Full stack (Docker)
```bash
docker-compose up --build
```

---

## 📌 Status

🚧 **Week 1 in progress** — building the static frontend UI shell.

---

## 📄 License

MIT
