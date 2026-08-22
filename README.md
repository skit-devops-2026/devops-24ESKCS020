# Home Automation

A self-hosted home automation system with a Flask REST API backend, an MQTT-based sensor/device layer, and a web dashboard for controlling devices, managing rooms, and creating automation rules.

## Features

- **User accounts** — registration and login (session-less, credential check against a MySQL database)
- **Live sensor data** — temperature and humidity readings streamed in over MQTT and logged to the database, with a history endpoint for the last 50 readings
- **Device control** — turn devices on/off per room, and dedicated controls for an AC unit (power, mode, fan speed, temperature)
- **Rooms & devices management** — create, update, and delete rooms and the devices assigned to them
- **Automation rules** — define rules that trigger device actions when a sensor condition (greater/less/equal) is met, plus support for time-based conditions via a background scheduler
- **Favorites** — mark and manage favorite automation rules
- **Web dashboard** — a multi-page frontend (login, main dashboard, automations, settings) built with vanilla HTML/CSS/JS

## Project Structure

```
HomeAutomation/
├── app.py                  # Flask API server (routes, MQTT client, scheduler, DB logic)
├── debug.py                 # Debug helper script
├── diagnose.py               # Diagnostics helper script
├── requirements.txt          # Python dependencies
├── js auto backup.js         # JS backup/utility script
├── login/                   # Login page (HTML/CSS/JS)
├── main/                    # Main dashboard page (HTML/CSS/JS)
├── automations/              # Shared automation styles (media queries)
├── Automations/               # Automations page (HTML/CSS/JS)
├── settings/                 # Settings page (HTML/CSS/JS)
└── test.html                 # Standalone test page
```

## Tech Stack

**Backend**
- [Flask](https://flask.palletsprojects.com/) + Flask-CORS — REST API
- [paho-mqtt](https://pypi.org/project/paho-mqtt/) — MQTT client for sensor/device messaging
- [APScheduler](https://apscheduler.readthedocs.io/) — background job scheduling for time-based automation rules
- MySQL — persistent storage (users, devices, rooms, automation rules, sensor logs, login history)
- Gunicorn — production WSGI server

**Frontend**
- HTML, CSS, and vanilla JavaScript (no framework)

## Getting Started

### Prerequisites

- Python 3.8+
- A running MySQL server
- Access to an MQTT broker (the app connects to `broker.mqtt.cool` by default)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/saksham172121/HomeAutomation.git
   cd HomeAutomation
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
   > Note: `app.py` also requires `mysql-connector-python` and `apscheduler`, which aren't currently listed in `requirements.txt` — install them as well if you hit import errors:
   > ```bash
   > pip install mysql-connector-python apscheduler
   > ```

3. Set up the MySQL database and update the `DB_CONFIG` dictionary at the top of `app.py` with your host, user, password, and database name.

4. Create the required tables (users, devices, rooms, automation_rules, action_values, sensor_logs, login_logs, favorites) to match the queries in `app.py`.

5. Run the server:
   ```bash
   python app.py
   ```
   For production, use Gunicorn:
   ```bash
   gunicorn app:app
   ```

6. Open the frontend by serving/opening `login/login.html` in a browser, then navigate through to the main dashboard.

## API Overview

| Endpoint | Method | Description |
|---|---|---|
| `/register` | POST | Register a new user |
| `/login` | POST | Authenticate a user |
| `/user/latest` | GET | Get the most recently registered/active user |
| `/sensor-data` | GET | Get the latest temperature/humidity reading |
| `/sensor-history` | GET | Get the last 50 sensor readings |
| `/device/<id>` | POST | Turn a device on/off |
| `/ac` | POST | Control AC power, mode, fan, and temperature |
| `/rules` | GET, POST | List or create automation rules |
| `/rules/<id>` | DELETE | Delete an automation rule |
| `/favorites` | GET | List favorite rules |
| `/favorites/<id>` | POST, DELETE | Add or remove a favorite rule |
| `/favorites/descriptions` | GET | Get descriptions for favorite rules |
| `/rooms` | GET, POST | List or create rooms |
| `/rooms/<id>` | PUT, DELETE | Update or delete a room |
| `/rooms/<id>/devices` | GET, POST | List or add devices in a room |
| `/rooms/get_devices` | GET | Get devices across rooms |
| `/devices/<id>` | PUT, DELETE | Update or delete a device |

## Security Notes

This project is a personal/hobby automation service and currently has some rough edges worth knowing about before deploying it beyond a local network:

- Passwords are stored and compared in plain text — hashing (e.g. with `bcrypt`) is strongly recommended before any real-world use.
- `DB_CONFIG` credentials are hardcoded in `app.py` — move these to environment variables before deploying.
- CORS is currently wide open (`*`) — restrict this to trusted origins in production.

## License

No license file is currently included in this repository. Add one (e.g. MIT) if you intend for others to use or contribute to this project.