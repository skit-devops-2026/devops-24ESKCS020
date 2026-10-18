# devops-24ESKCS020 — To-Do Application

## Author

| Roll No. | Name | GitHub username |
|---|---|---|
| 24ESKCS020 | Aditya Mangal | adityamangal123 |

## About

A full-stack containerized To-Do List application built with Node.js/Express and MongoDB, automated with GitHub Actions CI, monitored with Prometheus & Grafana, and deployed on Kubernetes.

## Tech stack

- Frontend: HTML5, CSS3, Modern JavaScript
- Backend: Node.js / Express
- Database: MongoDB
- Monitoring: Prometheus & Grafana
- Containerization: Docker & Docker Compose
- Orchestration: Kubernetes

## Running locally

```bash
docker compose up -d
```

## Live URL

https://adityamangal123.github.io/todo-ci-practice/

## Health endpoint

`GET /health` returns `{"status":"ok"}`.
- Live endpoint: https://adityamangal123.github.io/todo-ci-practice/health/
- Local endpoint: http://localhost:5000/health

## Metrics endpoint

`GET /metrics` returns Prometheus metrics.
- Local endpoint: http://localhost:5000/metrics

---

# MT2 — Containerization, Deployment, Monitoring & Kubernetes

## 1. Docker Setup
This project uses Docker for containerization. The `Dockerfile` at the root creates an image containing the Node.js application.

## 2. Docker Build Command
```bash
docker build -t devops-24eskcs020 .
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

## 6. /health endpoint
The application exposes a health check endpoint at `GET /health` which returns `{"status":"ok"}`.
Live: https://adityamangal123.github.io/todo-ci-practice/health/

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
