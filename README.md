# ♟️ Chess.com Clone (Learning Project)

This project is a **learning-focused clone of Chess.com**, built to understand **real-time multiplayer systems**, **WebSockets**, and **game state management**.

The goal of this version is **not UI perfection or production readiness**, but to deeply understand how:
- Two users connect in real time
- Wait for an opponent
- Start a game
- Play chess live using WebSockets

---

## 🚀 Project Overview

This application allows:
- A user to connect to the server
- Enter a **waiting queue**
- Get matched with another player
- Play chess **in real time**

All real-time updates are handled using **WebSockets**, and chess logic is managed using **chess.js**.

---

## 🧠 Core Learning Objectives

- WebSocket-based real-time communication
- Game lifecycle management
- Multiplayer matchmaking
- State synchronization between clients
- Designing scalable real-time systems (conceptually)

---

## 🛠 Tech Stack

### Backend
- **Node.js**
- **TypeScript**
- **WebSocket (ws)**
- **chess.js**
- In-memory game state storage

### Frontend
- **React**
- **chess.js**
- WebSocket client

---

## ✨ Features (Current Version)

### ✅ Implemented

1. **Simple UI Flow**
   - Landing page
   - Click `Play` → user enters waiting queue

2. **Matchmaking**
   - If another user is available, a game starts
   - Users are redirected to `/game`

3. **Real-Time Gameplay**
   - Moves are synced instantly using WebSockets
   - Chess rules validated via `chess.js`

4. **In-Memory Game State**
   - Each game is stored in memory
   - No persistence or recovery
   - Not scalable (intentional for learning)

---

## ⚠️ Limitations (By Design)

- ❌ No authentication
- ❌ No timers
- ❌ No database
- ❌ No crash recovery
- ❌ Single server only

These trade-offs were made intentionally to **focus on core real-time mechanics first**.

---

## 🔮 Future Scope

### 🔹 Version 2 (Production Readiness)

1. **Authentication**
   - Google / GitHub / Facebook OAuth

2. **Timers**
   - Player clocks
   - Time-based game ending

3. **Persistence**
   - Database for users & games
   - In-memory cache for active games
   - Game recovery after refresh/crash

4. **Scalability (Sharding)**
   - Multiple WebSocket servers
   - Ensure both players of a game connect to the **same WS server**
   - Sharding based on gameId / roomId

---

### 🔹 Version 3 (Chess.com–Scale Architecture)

1. **Pub/Sub Model**
   - Support spectators (audience)
   - Similar to chess.com where thousands watch live games

2. **Audience Scale**
   - ~150 WebSocket servers
   - Players can be on any server
   - Game events published to a **Pub/Sub system**
   - All subscribed servers relay updates to spectators

3. **No Hard Sharding Needed**
   - Pub/Sub removes strict server affinity
   - Better fault tolerance and scalability

---

## 🧩 High-Level Architecture (Reference)

Below is a reference design used while building and thinking about scalability:

![System Design Reference](./Design.png)

---

## 📌 Notes

This project is built as a **learning and system-design exercise**.  
The focus is on **understanding internals**, not cloning chess.com feature-by-feature.

If you’re interested in **WebSockets, real-time systems, and scalable architecture**, this project serves as a strong foundation.

---

## 🙌 Author

**Manish Patidar**  
Full Stack Developer | Real-Time Systems Learner  
