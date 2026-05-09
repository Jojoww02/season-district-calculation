## 1.Architecture design
```mermaid
graph TD
  A["User Browser"] --> B["React Frontend Application"]
  B --> C["Client-side Calculation Engine"]

  subgraph "Frontend Layer"
    B
    C
  end
```

## 2.Technology Description
- Frontend: React@18 + TypeScript + vite + tailwindcss@3
- Backend: None (kalkulasi berjalan di client)

## 3.Route definitions
| Route | Purpose |
|-------|---------|
| / | Halaman kalkulator untuk input parameter dan melihat hasil perhitungan |
