# SmartHome — Home Automation Dashboard

A full-stack home automation system for managing smart devices (lights, fans, thermostats, locks, plugs) across multiple rooms, with automation rules, usage analytics, and real-time WebSocket updates.

---

## 📌 Status

| Week | Focus | Status |
|------|-------|--------|
| 1 | Static frontend UI shell (mock data) | ✅ Complete |
| 2 | Interactive device cards + room views | 🔜 |
| 3 | Auth UI + global state + API service layer (mocked) | 🔜 |
| 4 | Automation rules UI + analytics charts (mocked) | 🔜 |
| 5 | Spring Boot setup + DB schema + real CRUD APIs | 🔜 |
| 6 | Auth & security (JWT, roles) | 🔜 |
| 7 | WebSocket real-time layer + device simulation engine | 🔜 |
| 8 | Automation rules engine (backend logic) | 🔜 |
| 9 | Analytics backend + notifications | 🔜 |
| 10 | Testing, Docker, deployment, documentation | 🔜 |

---

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS v3, Recharts, STOMP.js / SockJS |
| Backend | Java 21, Spring Boot 3.3, Spring Security (JWT), Spring WebSocket |
| Database | PostgreSQL 16 |
| Scheduling | Spring `@Scheduled` |
| Deployment | Docker Compose, Vercel (frontend), Render/Railway (backend) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- Java 21+
- Docker (optional, for full-stack)

### Frontend (Week 1 — fully functional with mock data)
```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

**Demo accounts (no signup needed):**
- Click **"Login as Admin"** — full access
- Click **"Login as User"** — standard access

### Backend (Week 5+)
```bash
cd backend
./mvnw spring-boot:run
```

### PostgreSQL only (Docker)
```bash
docker-compose up postgres
```

### Full stack (Week 10+)
```bash
docker-compose up --build
```

---

## 🗂️ Project Structure

```
smart-home/
├── frontend/                   # React + TypeScript app (Vite)
│   └── src/
│       ├── components/
│       │   ├── devices/        # DeviceCard, DeviceIcon
│       │   ├── rooms/          # RoomCard
│       │   ├── automation/     # RuleCard
│       │   ├── notifications/  # NotificationItem
│       │   ├── layout/         # Sidebar, TopBar, AppLayout
│       │   └── ui/             # Button, Card, Toggle, Badge, Modal
│       ├── pages/              # Dashboard, Rooms, RoomDetail, Automation, Analytics, Notifications, Settings, Login
│       ├── context/            # AuthContext, DeviceContext
│       ├── mock/               # data.ts — rich mock dataset
│       ├── types/              # Shared TypeScript interfaces
│       └── lib/                # utils.ts, time.ts
├── backend/                    # Spring Boot app (Week 5)
│   ├── pom.xml
│   └── src/main/java/io/smarthome/
│       ├── controller/
│       ├── service/
│       ├── repository/
│       ├── model/
│       ├── security/
│       ├── websocket/
│       └── dto/
├── docker-compose.yml
└── README.md
```

---

## 🗺️ Data Model

```
User ──< Home ──< Room ──< Device ──< DeviceLog
                              │
                              └──< AutomationRule
```

| Entity | Key Fields |
|--------|-----------|
| User | id, name, email, password, role (ADMIN/USER) |
| Home | id, name, owner |
| Room | id, name, home, icon |
| Device | id, name, type (LIGHT/FAN/THERMOSTAT/LOCK/PLUG), state (JSON), room |
| DeviceLog | id, device, previousState, newState, triggeredBy, timestamp |
| AutomationRule | id, condition, action, enabled, lastTriggered |

---

## 📄 License

MIT

## Frontend Update
Improved the SmartHome dashboard frontend.
## Backend Update
Documented the SmartHome backend service and API layer.

## Jenkins Pipeline
<!-- PR 1 dummy change -->
feature/pr-2
<!-- PR 2 NEW dummy change -->


<!-- PR 3 NEW dummy change -->

<!-- PR 4 NEW dummy change -->




# MT2 — Containerization, Deployment, Monitoring & Kubernetes

## 1. Docker Setup
This project uses Docker for containerization. The `Dockerfile` at the root creates an image containing the Node.js application.

## 2. Docker Build Command
```bash
docker build -t devops-24eskcs024 .
```

## 3. Docker Compose
The `docker-compose.yml` configures the application and its MongoDB dependency, as well as Prometheus for monitoring.
```bash
docker compose up -d
```

## 4. Container Registry Image
Image pushed to GHCR automatically by CI workflows:
`ghcr.io/skit-devops-2026/devops-24eskcs020:latest`

## 5. Live Deployment URL
Live URL: https://adityamangal123.github.io/todo-ci-practice/

## Live URL
https://adityamangal123.github.io/todo-ci-practice/

## 6. /health endpoint
The application exposes a health check endpoint at `GET /health` which returns `{"status":"ok"}`. Live at: https://adityamangal123.github.io/todo-ci-practice/health

## 7. /metrics endpoint
The application exposes Prometheus-compatible metrics at `GET /metrics`.

## 8. Prometheus
Prometheus configuration is located in `monitoring/prometheus.yml`.

## 9. Monitoring dashboard
A Grafana dashboard configuration is provided at `monitoring/grafana/dashboards/hostel-fix-dashboard.json`.

## 10. Kubernetes deployment
Kubernetes Deployment manifests are present in `k8s/deployment.yaml`.

## 11. Kubernetes service
Kubernetes Service manifests are present in `k8s/service.yaml`.

## 12. Verification commands
```bash
# Verify health
curl http://localhost:5000/health

# Verify metrics
curl http://localhost:5000/metrics

# Verify Kubernetes manifests
kubectl apply --dry-run=client -f k8s/
```
