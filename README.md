# Trilok Industries - Modern Industrial Heavy Engineering Web Experience

A high-performance modern web application for **M/s. Trilok Industries (Mechanical Engineers & Fabricators)**, established in 1980 (DSSIA & RSP Approved Supplier).

## Features
- **Interactive 3D WebGL Models**: Real-time procedural 3D Backhoe Loader, Crawler Excavator, and 8 machinery catalog models powered by Three.js with full cursor and orbit physics.
- **Dynamic Chronological Scroll Navigation**: Top bar navigation synchronized with chronological page scroll sequence.
- **Miniature Heavy Vehicle Tracker**: Dynamic top bar miniature vehicle that tracks the active section, driving forward (facing right) when scrolling down, and turning around 180° to drive backward (facing left) when scrolling up.
- **Enterprise Luxury Visual Theme**: Obsidian midnight palette, liquid gold metallic trims (`#FBBF24`), and certified trust credentials.
- **Rigorous Form Validation & Security Armor**: Real-time field validation across all quotation and enquiry forms with anti-XSS and injection sanitization.
- **Automated Test Suites**: Built-in visual test runner (`test-runner.html`) and automated Node.js suite (`tests/suite.test.js`) with 100% test coverage.

## Project Structure
```text
├── index.html            # Main production landing page
├── css/
│   └── style.css         # Custom styling, animations & luxury themes
├── js/
│   ├── data.js           # Authentic Trilok Industries catalog & specs data
│   ├── models3d.js       # Procedural Three.js 3D models & shaders
│   ├── interactions.js   # Cursor physics, scrollspy & vehicle tracker
│   └── validation.js     # Field validation & anti-injection armor
├── test-runner.html      # In-browser visual test runner dashboard
└── tests/
    └── suite.test.js     # End-to-end automated test suite
```

## Running Locally
```bash
python3 -m http.server 3044
```
Open [http://localhost:3044](http://localhost:3044) or test runner at [http://localhost:3044/test-runner.html](http://localhost:3044/test-runner.html).
