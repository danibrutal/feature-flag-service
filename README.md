# Feature Flag Service

This project implements a simple feature flag system with:

- Laravel backend: Admin UI, API, and evaluation logic
- Next.js client: Car Damage Reports UI consuming flags
- MySQL: persistence
- Redis: caching

## Architecture

```text
client (Next.js)
  ↓
backend (Laravel API + Admin)
  ↓
MySQL (data)
Redis (cache)
```

- Next.js fetches evaluated flags from Laravel.
- Laravel evaluates flags: boolean, schedule, and percentage rollout.
- Redis caches flag evaluation per user.
- Admin UI allows managing flags.

## How to Run

```bash
docker compose up --build
```

Apps:

- Client: http://localhost:3000/reports
- Admin: http://localhost:8000/admin/feature-flags
- API: http://localhost:8000/api/feature-flags

## Feature Flags

Supported:

- Boolean flags
- Scheduled flags using `starts_at` and `ends_at`
- Percentage rollout using deterministic hashing by `user_id`

Examples:

- `show_photo_upload`
- `allow_report_update`

## Key Decisions

### 1. Backend-Driven Evaluation

- Client receives only evaluated booleans.
- Avoids duplicating logic in the frontend.
- Keeps rollout logic centralized.

### 2. Caching Strategy

- Redis caches evaluated flags per `user_id`.
- TTL: 30 seconds.
- Cache is flushed on admin updates.

### 3. Handling Stale Flags

If a flag changes after the UI is rendered:

- Frontend may still show UI due to caching.
- Backend re-checks the flag on action.
- If disabled, the backend returns `403`.
- UI shows: "This feature is no longer available."

### 4. Separation of Concerns

- Laravel: admin, API, and business logic.
- Next.js: UI and feature gating.
- Services are used for evaluation logic.

### 5. Design System Approach

- Custom UI components with CSS Modules.
- Radix primitives used where needed.
- No heavy UI framework, keeping control over styling.

## Notes / Trade-Offs

- Reports API is minimal: no auth and no persistence beyond basics.
- Feature flags are evaluated per request and optimized via Redis.
- No real user system: `user_id` is mocked in the client.
