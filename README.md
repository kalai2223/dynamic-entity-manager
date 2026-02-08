#  Dynamic Entity Manager

A metadata-driven, extensible CRUD platform built with **React, TypeScript, Redux Toolkit, Zod, and Ant Design**.

The application dynamically generates forms and tables from a centralized configuration file, enabling scalable entity management with minimal code changes.

---

##  Overview

Dynamic Entity Manager is a configuration-driven CRUD system designed for scalability and maintainability.

Instead of hardcoding form fields and table columns, the UI is generated dynamically from a single configuration source. This ensures that adding new fields, or even entirely new entities, requires minimal code changes.


---

##  Architecture

Entity Config
        ↓
Dynamic Form Renderer
        ↓
Dynamic Table Column Builder
        ↓
Service Layer (axios/fetch)
        ↓
JSON Server


### Key Design Principles

- Single source of truth for field definitions
- No duplication between form and table configuration
- Entity-agnostic API handling
- Clear separation between UI, configuration, and API layers

---

##  Tech Stack

- React (Vite)
- TypeScript
- Redux Toolkit
- RTK Query
- Ant Design
- Zod (schema validation)
- JSON Server (mock backend)

---

##  Features

- Full CRUD operations
- Configuration-driven dynamic form rendering
- Dynamic table column generation
- Zod-based validation
- Drawer-based Create/Edit UI
- Delete confirmation modal
- Responsive layout using Ant Design Grid
- Clean modular folder structure
- Environment-based API configuration

---

##  Project Structure

src/
├── app/
│   └── store.ts
|   └── hook.ts
├── api/
│   └── baseApi.ts
├── config/
│   └── user.config.ts
├── components/
│   ├── DynamicForm/
│   └── EntityTable/
├── features/
│   └── entity/
│       └── entitySlice.ts
├── pages/
│   └── UsersPage.tsx
├── types/
└── utils/
│   └── buildZodSchema.ts

---

##  Example Entity Configuration

export const userConfig = {
  entityName: "users",
  fields: [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "role", label: "Role", type: "select", options: [...] }
  ]
};

From this single configuration:

- Form fields are generated
- Table columns are generated
- Validation schema is created
- API endpoints are consumed dynamically

---

##  Setup Instructions

###  Clone Repository

git clone git@github.com:kalai2223/dynamic-entity-manager.git
cd dynamic-entity-manager

###  Install Dependencies

pnpm install

###  Configure Environment Variables

Create a `.env` file:

VITE_API_BASE_URL=http://localhost:3000

###  Run Development Server

pnpm run dev

### Run Data server

pnpm run server

---

## Future Enhancements

- Role-based field visibility
- Dynamic entity switching
- Server-driven schema support
- Pagination & sorting
- Unit and integration testing
- Docker deployment

---

##  What This Project Demonstrates

- Scalable frontend architecture
- Metadata-driven UI generation
- Advanced RTK Query usage
- Clean separation of concerns
- Enterprise-ready design thinking

