# Census_CC_Portal

A lightweight client-side viewer & downloader for county-level Census and state projection data.

Accessible @ https://steventrev.github.io/Census_CC_Portal/

## Quickstart

1. Optional: Start a local HTTP server in the project folder (required for CSV operations) and navigate to `http://localhost:8000`:

     ```bash
     python -m http.server 8000
     ```

2. Select a State and County in the dropdown boxes
3. View available data and click **Download All Data (.ZIP)** to export county-level files

## Data Structure

The `data/` folder contains:

- `countystateFIPS.csv` — lookup table for state/county FIPS codes
- `projection_sources.csv` — metadata for population projection sources used for `02_Population_Projections.csv`.
- Per-state folders (example: `17_Illinois/`) containing the source .csvs:
  - `01_County_Population_Rank.csv`
  - `02_Population_Projections.csv`
  - `03_Population_Age.csv`
  - `04_Race.csv`
  - `05_Labor.csv`
  - `06_Industry.csv`
  - `07_Income.csv`
  - `08_Disability.csv`
  - `09_Limited_English.csv`
  - `10_Housing.csv`
  - `11_Commuting.csv`

To add a new state, create a folder named with the state FIPS prefix (e.g., `21_Kentucky`) with the required source .csvs

## How It Works

- `js/app.js` contains `CENSUS_TABLES` mapping the table definitions and the runtime logic
- The app uses [PapaParse](https://www.papaparse.com/) to parse CSVs in the browser and [JSZip](https://stuk.github.io/jszip/) to build ZIP exports
- The UI looks up county FIPS using `countystateFIPS.csv` and filters per-county tables from the per-state CSVs