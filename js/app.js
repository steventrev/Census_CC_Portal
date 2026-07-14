// All 11 tables mapped directly to the API endpoints and table IDs utilized in Census_CC_Data.py
const CENSUS_TABLES = [
  {
    id: "01",
    file: "01_County_Population_Rank",
    title: "01 County Population Rank",
    render: true,
    sources: [
      {
        label: "2010 SF1 (Table P1)",
        url: (sFips, cFips) =>
          `https://data.census.gov/table/DECENNIALSF12010.P1?g=0500000US${sFips}${cFips}`,
      },
      {
        label: "2020 DHC (Table P1)",
        url: (sFips, cFips) =>
          `https://data.census.gov/table/DECENNIALDHC2020.P1?g=0500000US${sFips}${cFips}`,
      },
    ],
  },
  {
    id: "02",
    file: "02_Population_Projections",
    title: "02 Population Projections",
    render: true,
    sources: [], // Dynamically extracted from projection_sources.csv
  },
  {
    id: "03",
    file: "03_Population_Age",
    title: "03 Population Age",
    render: true,
    sources: [
      {
        label: "2000 SF1 (Table P012)",
        url: (sFips, cFips) =>
          `https://data.census.gov/table/DECENNIALSF12000.P012?g=0500000US${sFips}${cFips}`,
      },
      {
        label: "2010 SF1 (Table P12)",
        url: (sFips, cFips) =>
          `https://data.census.gov/table/DECENNIALSF12010.P12?g=0500000US${sFips}${cFips}`,
      },
      {
        label: "2020 DHC (Table P12)",
        url: (sFips, cFips) =>
          `https://data.census.gov/table/DECENNIALDHC2020.P12?g=0500000US${sFips}${cFips}`,
      },
    ],
  },
  {
    id: "04",
    file: "04_Race",
    title: "04 Race",
    render: true,
    sources: [
      {
        label: "2020 DHC (Table P5)",
        url: (sFips, cFips) =>
          `https://data.census.gov/table/DECENNIALDHC2020.P5?g=0500000US${sFips}${cFips}`,
      },
    ],
  },
  {
    id: "05",
    file: "05_Labor",
    title: "05 Labor",
    render: true,
    sources: [
      {
        label: "2024 ACS 5-Year Detailed Table (Table B23025)",
        url: (sFips, cFips) =>
          `https://data.census.gov/table/ACSDT5Y2024.B23025?g=0500000US${sFips}${cFips}`,
      },
    ],
  },
  {
    id: "06",
    file: "06_Industry",
    title: "06 Industry",
    render: true,
    sources: [
      {
        label: "2024 ACS 5-Year Detailed Table (Table C24070)",
        url: (sFips, cFips) =>
          `https://data.census.gov/table/ACSDT5Y2024.C24070?g=0500000US${sFips}${cFips}`,
      },
    ],
  },
  {
    id: "07",
    file: "07_Income",
    title: "07 Income",
    render: true,
    sources: [
      {
        label: "Median HH Income (Table B19013)",
        url: (sFips, cFips) =>
          `https://data.census.gov/table/ACSDT5Y2024.B19013?g=0500000US${sFips}${cFips}`,
      },
      {
        label: "Per Capita Income (Table B19301)",
        url: (sFips, cFips) =>
          `https://data.census.gov/table/ACSDT5Y2024.B19301?g=0500000US${sFips}${cFips}`,
      },
      {
        label: "Gini Index (Table B19083)",
        url: (sFips, cFips) =>
          `https://data.census.gov/table/ACSDT5Y2024.B19083?g=0500000US${sFips}${cFips}`,
      },
      {
        label: "Poverty Status (Table C17002)",
        url: (sFips, cFips) =>
          `https://data.census.gov/table/ACSDT5Y2024.C17002?g=0500000US${sFips}${cFips}`,
      },
    ],
  },
  {
    id: "08",
    file: "08_Disability",
    title: "08 Disability",
    render: true,
    sources: [
      {
        label: "2024 ACS 5-Year Detailed Table (Table C18108)",
        url: (sFips, cFips) =>
          `https://data.census.gov/table/ACSDT5Y2024.C18108?g=0500000US${sFips}${cFips}`,
      },
    ],
  },
  {
    id: "09",
    file: "09_Limited_English",
    title: "09 Limited English",
    render: true,
    sources: [
      {
        label: "2024 ACS 5-Year Detailed Table (Table C16002)",
        url: (sFips, cFips) =>
          `https://data.census.gov/table/ACSDT5Y2024.C16002?g=0500000US${sFips}${cFips}`,
      },
    ],
  },
  {
    id: "10",
    file: "10_Housing",
    title: "10 Housing",
    render: true,
    sources: [
      {
        label: "2024 ACS 5-Year Data Profile (Table DP04)",
        url: (sFips, cFips) =>
          `https://data.census.gov/table/ACSDP5Y2024.DP04?g=0500000US${sFips}${cFips}`,
      },
    ],
  },
  {
    id: "11",
    file: "11_Commuting",
    title: "11 Commuting",
    render: true,
    sources: [
      {
        label: "2024 ACS 5-Year Subject Table (Table S0801)",
        url: (sFips, cFips) =>
          `https://data.census.gov/table/ACSST5Y2024.S0801?g=0500000US${sFips}${cFips}`,
      },
    ],
  },
];

// Structural Runtime State Stores
let indexedTablesCache = {}; // High-performance mapping: [tableId][normalizedCountyName] -> array rows
let filteredReportData = {};
let fipsLookupMap = {}; // Structural O(1) county lookup cache
let stateLookupMap = {}; // State name metadata lookup dictionary
let projectionSourcesMap = {}; // State projection credential metadata dictionary
let allLookedUpCounties = []; // Base elements read from countystateFIPS.csv

const stateSelect = document.getElementById("stateSelect");
const countySelect = document.getElementById("countySelect");
const reportContainer = document.getElementById("reportContainer");
const downloadAllBtn = document.getElementById("downloadAllBtn");

stateSelect.addEventListener("change", handleStateChange);
countySelect.addEventListener("change", handleCountyChange);
downloadAllBtn.addEventListener("click", downloadAllAsZip);

// Fast functional normalization of geographic string elements
function cleanGeographicString(str) {
  return (str || "")
    .toLowerCase()
    .split(",")[0]
    .replace(/\bcounty\b/gi, "")
    .replace(/[^a-z0-9]/g, "")
    .trim();
}

// Looks up the 2-digit State FIPS and clean label based on select choice text matching
function getSelectedStateDetails() {
  const folderValue = stateSelect.value;
  if (!folderValue) return { stateFips: "", stateName: "" };

  const cleanFolderSegment = folderValue
    .replace(/[^a-zA-Z]/g, "")
    .toLowerCase();
  const match = stateLookupMap[cleanFolderSegment];
  return match
    ? { stateFips: match.stateFips, stateName: match.stateName }
    : { stateFips: "", stateName: "" };
}

// Dictionary lookup wrapper for bounding coordinates and target FIPS codes
function lookupGeographicMetadata() {
  const { stateFips } = getSelectedStateDetails();
  const countySelection = countySelect.value;
  if (!stateFips || !countySelection) return null;

  return (
    fipsLookupMap[`${stateFips}_${cleanGeographicString(countySelection)}`] ||
    null
  );
}

// Parses and caches county tracking parameters
function initFipsLookupTable() {
  Papa.parse("countystateFIPS.csv", {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function (results) {
      allLookedUpCounties = results.data;

      results.data.forEach((row) => {
        if (!row.fips || !row.county) return;
        const rawFips = row.fips.trim();

        if (rawFips.length <= 2 || !row.county.includes(",")) {
          const stateFips = rawFips.padStart(2, "0");
          const stateName = row.county.trim();
          stateLookupMap[stateName.replace(/[^a-zA-Z]/g, "").toLowerCase()] = {
            stateFips,
            stateName,
          };
        } else {
          const fullFips = rawFips.padStart(5, "0");
          const stateFips = fullFips.slice(0, 2);
          fipsLookupMap[`${stateFips}_${cleanGeographicString(row.county)}`] = {
            stateFips: stateFips,
            countyFips: fullFips.slice(2),
            bbox: row.bbox,
          };
        }
      });
      console.log("FIPS metadata dictionaries populated successfully.");
      initProjectionSourcesTable();
    },
    error: (err) =>
      console.error(
        "Critical: Geo-lookup structural elements failed to execute.",
        err,
      ),
  });
}

// Reads metadata matrix and dynamically constructs active UI Dropdown options
function initProjectionSourcesTable() {
  Papa.parse("/data/projection_sources.csv", {
    download: true,
    header: true,
    skipEmptyLines: true,
    transformHeader: function (header) {
      return header
        .replace(/^\uFEFF/, "")
        .trim()
        .toLowerCase();
    },
    complete: function (results) {
      let activeStates = [];

      results.data.forEach((row) => {
        if (!row.fips) return;

        const stateFips = row.fips.trim().padStart(2, "0");
        const stateName = row.county ? row.county.trim() : "";

        projectionSourcesMap[stateFips] = {
          source: row.source ? row.source.trim() : "",
          url: row.url ? row.url.trim() : "",
          vintage: row.vintage ? row.vintage.trim() : "",
        };

        // UI Injection Guard: Only build dropdown option tags if active source links are detected
        if (row.url && row.source) {
          activeStates.push({
            value: `${stateFips}_${stateName.replace(/\s+/g, "")}`,
            name: stateName,
          });
        }
      });

      activeStates.sort((a, b) => a.name.localeCompare(b.name));
      stateSelect.innerHTML = '<option value="">-- Select State --</option>';

      let defaultStateValue = "";

      activeStates.forEach((state) => {
        const option = document.createElement("option");
        option.value = state.value;
        option.textContent = state.name;
        stateSelect.appendChild(option);

        // Track the value that matches Kentucky case-insensitively
        if (state.name.trim().toLowerCase() === "kentucky") {
          defaultStateValue = state.value;
        }
      });

      // Explicitly set selection default post-loop
      if (defaultStateValue) {
        stateSelect.value = defaultStateValue;
      }

      console.log("Dynamic state dropdown compiled successfully.");
      if (stateSelect.value) handleStateChange();
    },
    error: (err) =>
      console.error(
        "Critical: Projection sources structural components failed to load.",
        err,
      ),
  });
}

// Initialization Entrypoint
initFipsLookupTable();

function handleStateChange() {
  const stateFolder = stateSelect.value;
  const { stateFips, stateName } = getSelectedStateDetails();

  countySelect.innerHTML = '<option value="">-- Select County --</option>';
  countySelect.disabled = true;
  downloadAllBtn.disabled = true;
  reportContainer.innerHTML =
    "<p>Please select a county to generate reports.</p>";
  indexedTablesCache = {};
  filteredReportData = {};

  if (!stateFolder || !stateFips) return;
  reportContainer.innerHTML = `<em>Loading county parameters for ${stateName}...</em>`;

  let matchedCounties = allLookedUpCounties
    .filter((row) => {
      if (!row.fips) return false;
      const cleanRowFips = row.fips.trim().padStart(5, "0");
      return (
        cleanRowFips.startsWith(stateFips) &&
        cleanRowFips.length === 5 &&
        row.county.includes(",")
      );
    })
    .map((row) => row.county.split(",")[0].trim())
    .filter((name) => name !== "");

  matchedCounties = [...new Set(matchedCounties)].sort();

  if (matchedCounties.length > 0) {
    matchedCounties.forEach((countyName) => {
      const option = document.createElement("option");
      option.value = countyName;
      option.textContent = countyName;
      countySelect.appendChild(option);
    });
    countySelect.disabled = false;
    reportContainer.innerHTML =
      "<p>State database connected. Please select a specific county to build reports.</p>";
  } else {
    reportContainer.innerHTML = `<p class="table-error-message">No county mappings detected matching state FIPS code ${stateFips}</p>`;
  }
}

async function handleCountyChange() {
  const stateFolder = stateSelect.value;
  const selectedCounty = countySelect.value;

  if (!selectedCounty) {
    reportContainer.innerHTML =
      "<p>Please select a county to view complete records.</p>";
    downloadAllBtn.disabled = true;
    return;
  }

  reportContainer.innerHTML = `<h3>Generating Comprehensive Assessment for ${selectedCounty}...</h3><p>Processing 11 structural data matrix streams...</p>`;
  filteredReportData = {};
  downloadAllBtn.disabled = true;

  const fetchPromises = CENSUS_TABLES.map((tableDef) => {
    return new Promise((resolve) => {
      if (indexedTablesCache[tableDef.id]) {
        filteredReportData[tableDef.id] =
          indexedTablesCache[tableDef.id][
            cleanGeographicString(selectedCounty)
          ] || [];
        return resolve({ success: true, tableDef });
      }

      Papa.parse(`data/${stateFolder}/${tableDef.file}.csv`, {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          if (results.meta?.fields)
            tableDef.originalHeaders = results.meta.fields;

          const fields = results.meta?.fields || [];
          const geoKey =
            fields.find((f) => ["GEO_1", "NAME", "Location"].includes(f)) || "";
          const tableIndex = {};

          results.data.forEach((row) => {
            let rowVal = row[geoKey] ? row[geoKey].trim() : "";
            if (geoKey === "NAME" && rowVal.includes(","))
              rowVal = rowVal.split(",")[0].trim();

            const cleanKey = rowVal === "" ? "" : cleanGeographicString(rowVal);
            if (cleanKey === "") {
              tableDef.summaryRow = row;
            } else {
              if (!tableIndex[cleanKey]) tableIndex[cleanKey] = [];
              tableIndex[cleanKey].push(row);
            }
          });

          indexedTablesCache[tableDef.id] = tableIndex;
          let matchedRows =
            tableIndex[cleanGeographicString(selectedCounty)] || [];
          if (tableDef.summaryRow)
            matchedRows = [tableDef.summaryRow, ...matchedRows];

          filteredReportData[tableDef.id] = matchedRows;
          resolve({ success: true, tableDef });
        },
        error: () => {
          filteredReportData[tableDef.id] = null;
          indexedTablesCache[tableDef.id] = null;
          resolve({ success: false, tableDef });
        },
      });
    });
  });

  await Promise.all(fetchPromises);
  renderAllReportTables();
  downloadAllBtn.disabled = false;
}

function renderAllReportTables() {
  reportContainer.innerHTML = "";
  const { stateFips, stateName } = getSelectedStateDetails();
  const geoMetadata = lookupGeographicMetadata();
  const countyFips = geoMetadata ? geoMetadata.countyFips : "";

  CENSUS_TABLES.forEach((tableDef) => {
    if (!tableDef.render) return;

    const data = filteredReportData[tableDef.id];
    const section = document.createElement("div");
    section.className = "table-section";

    const headerContainer = document.createElement("div");
    headerContainer.className = "table-header-container";

    const title = document.createElement("h3");
    title.className = "table-title";
    title.textContent = tableDef.title;
    headerContainer.appendChild(title);

    if (
      (tableDef.sources && tableDef.sources.length > 0) ||
      tableDef.id === "02"
    ) {
      const sourceDiv = document.createElement("div");
      sourceDiv.className = "table-source-info";
      sourceDiv.innerHTML = `<strong>Data Source (${countySelect.value || "Selected County"}):</strong> `;

      if (tableDef.id === "02") {
        const stateMeta = projectionSourcesMap[stateFips];
        const a = document.createElement("a");
        a.className = "table-source-link";
        a.target = "_blank";

        if (stateMeta && stateMeta.url && stateMeta.source) {
          a.href = stateMeta.url;
          a.textContent = `${stateMeta.source} (${stateMeta.vintage})`;
        } else {
          a.href = "https://data.census.gov";
          a.textContent = `${stateName} State Data Center Projections`;
        }
        sourceDiv.appendChild(a);
      } else {
        tableDef.sources.forEach((src, idx) => {
          const a = document.createElement("a");
          a.className = "table-source-link";
          a.target = "_blank";
          a.href = countyFips
            ? src.url(stateFips, countyFips)
            : src.url(stateFips, "").replace("g=0500000US", "g=0400000US");
          a.textContent = src.label;
          sourceDiv.appendChild(a);
          if (idx < tableDef.sources.length - 1)
            sourceDiv.appendChild(document.createTextNode(" | "));
        });
      }
      headerContainer.appendChild(sourceDiv);
    }
    section.appendChild(headerContainer);

    if (data && data.length > 0) {
      const wrapper = document.createElement("div");
      wrapper.className = "table-wrapper";
      wrapper.innerHTML = generateHtmlTableString(
        data,
        tableDef.originalHeaders,
      );
      section.appendChild(wrapper);
    } else {
      const errorMsg = document.createElement("p");
      errorMsg.className = "table-error-message";
      errorMsg.textContent =
        "Data breakdown unavailable or source file missing matching county entries.";
      section.appendChild(errorMsg);
    }

    reportContainer.appendChild(section);
  });
}

function generateHtmlTableString(data, originalHeaders) {
  if (!data?.length) return "";
  const headers = originalHeaders?.length
    ? originalHeaders
    : Object.keys(data[0]);

  const headerRow = headers.map((h) => `<th>${h}</th>`).join("");
  const bodyRows = data
    .map((row) => {
      const cells = headers.map((h) => `<td>${row[h] ?? ""}</td>`).join("");
      return `<tr>${cells}</tr>`;
    })
    .join("");

  return `<table><thead><tr>${headerRow}</tr></thead><tbody>${bodyRows}</tbody></table>`;
}

async function downloadAllAsZip() {
  const zip = new JSZip();
  const stateFolder = stateSelect.value;
  const selectedCounty = countySelect.value.replace(/\s+/g, "_");

  downloadAllBtn.textContent = "Gathering files...";
  downloadAllBtn.disabled = true;

  const zipPromises = CENSUS_TABLES.map(async (tableDef) => {
    if (["01", "02"].includes(tableDef.id)) {
      try {
        const response = await fetch(
          `data/${stateFolder}/${tableDef.file}.csv`,
        );
        if (response.ok)
          zip.file(`${tableDef.file}.csv`, await response.text());
      } catch (err) {
        console.error(`Could not attach raw file for ${tableDef.file}:`, err);
      }
    } else {
      const filteredData = filteredReportData[tableDef.id];
      if (filteredData?.length)
        zip.file(
          `${tableDef.file}_${selectedCounty}.csv`,
          Papa.unparse(filteredData),
        );
    }
  });

  await Promise.all(zipPromises);
  downloadAllBtn.textContent = "Zipping archive...";

  zip.generateAsync({ type: "blob" }).then(function (content) {
    const url = URL.createObjectURL(content);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${stateFolder}_${selectedCounty}_Census_CC_Data.zip`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    downloadAllBtn.textContent = "Download All Data (.ZIP)";
    downloadAllBtn.disabled = false;
  });
}
