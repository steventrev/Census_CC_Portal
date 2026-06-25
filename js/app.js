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
    sources: [
      {
        // Contextual function looking directly at the selected state folder string name
        getStateSource: (stateFolder) => {
          if (stateFolder.includes("Indiana")) {
            return {
              label: "Indiana Business Research Center (July 2024)",
              url: "https://www.stats.indiana.edu/pop_proj/",
            };
          } else if (stateFolder.includes("Kentucky")) {
            return {
              label: "Kentucky State Data Center (August 2022)",
              url: "https://centers.louisville.edu/kentucky-state-data-center/data-downloads",
            };
          } else if (stateFolder.includes("Tennessee")) {
            return {
              label: "Tennessee State Data Center (August 2024)",
              url: "https://tnsdc.utk.edu/estimates-and-projections/boyd-center-population-projections/",
            };
          } else if (stateFolder.includes("Illinois")) {
            return {
              label: "Illinois Department of Public Health (May 2024)",
              url: "https://dph.illinois.gov/data-statistics/vital-statistics/illinois-population-data.html",
            };
          } else {
            return {
              label: "State Data Center Population Projections",
              url: "https://data.census.gov",
            };
          }
        },
      },
    ],
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

let rawTablesCache = {};
let filteredReportData = {};

const stateSelect = document.getElementById("stateSelect");
const countySelect = document.getElementById("countySelect");
const reportContainer = document.getElementById("reportContainer");
const downloadAllBtn = document.getElementById("downloadAllBtn");

stateSelect.addEventListener("change", handleStateChange);
countySelect.addEventListener("change", handleCountyChange);
downloadAllBtn.addEventListener("click", downloadAllAsZip);

// Pulls the 2-digit state FIPS code safely from selection payload (e.g., "21_Kentucky" -> "21")
function getSelectedStateFIPS() {
  const val = stateSelect.value;
  if (!val) return "";
  const match = val.match(/^(\d+)_/);
  return match ? match[1] : "";
}

// Inspects ALL filtered county data arrays globally to locate and extract the unique 3-digit county FIPS code
function discoverCountyFIPS() {
  for (let tableId in filteredReportData) {
    const data = filteredReportData[tableId];
    if (!data || data.length === 0) continue;

    for (let row of data) {
      if (row.COUNTY && row.COUNTY.trim() !== "" && !isNaN(row.COUNTY)) {
        return row.COUNTY.trim().padStart(3, "0");
      }
      if (row.fips5 && row.fips5.trim() !== "" && row.fips5.length >= 5) {
        return row.fips5.trim().slice(-3);
      }
    }
  }
  return "";
}

// Step 1: Manage State Change
function handleStateChange() {
  const stateFolder = stateSelect.value;
  const stateName = stateSelect.options[stateSelect.selectedIndex].text;

  countySelect.innerHTML = '<option value="">-- Select County --</option>';
  countySelect.disabled = true;
  downloadAllBtn.disabled = true;
  reportContainer.innerHTML =
    "<p>Please select a county to generate reports.</p>";
  rawTablesCache = {};
  filteredReportData = {};

  if (stateFolder) {
    reportContainer.innerHTML = `<em>Loading county parameters for ${stateName}...</em>`;

    Papa.parse(`data/${stateFolder}/04_Race.csv`, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        populateCounties(results.data);
        reportContainer.innerHTML =
          "<p>State database connected. Please select a specific county to build reports.</p>";
      },
      error: function () {
        reportContainer.innerHTML = `<p style="color:red;">Failed to resolve directory paths for data/${stateFolder}/04_Race.csv</p>`;
      },
    });
  }
}

// Step 2: Populate Dropdown List (Fixed to support dynamic headers and clean county matching)
function populateCounties(data) {
  if (!data || data.length === 0) return;

  // Detect which column header is present in this dataset
  const firstRow = data[0];
  let countyKey = "GEO_1"; // Default fallback
  if (!("GEO_1" in firstRow)) {
    if ("NAME" in firstRow) {
      countyKey = "NAME";
    } else if ("Location" in firstRow) {
      countyKey = "Location";
    }
  }

  // Extract, clean, and deduplicate county values
  let rawCounties = data
    .map((row) => {
      let val = row[countyKey];
      if (!val) return "";
      val = val.trim();

      // If it's a standard Census full name (e.g., "Fayette County, Kentucky"),
      // extract just the county name part so it works with all other tables
      if (countyKey === "NAME" && val.includes(",")) {
        val = val.split(",")[0].trim();
      }
      return val;
    })
    .filter((geo) => geo !== "");

  const counties = [...new Set(rawCounties)];
  counties.sort();

  // Populate the HTML select option elements
  counties.forEach((county) => {
    const option = document.createElement("option");
    option.value = county;
    option.textContent = county;
    countySelect.appendChild(option);
  });

  countySelect.disabled = false;
}

// Step 3: Parse and Compile Files Asynchronously
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
  rawTablesCache = {};
  downloadAllBtn.disabled = true;

  const fetchPromises = CENSUS_TABLES.map((tableDef) => {
    return new Promise((resolve) => {
      Papa.parse(`data/${stateFolder}/${tableDef.file}.csv`, {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          rawTablesCache[tableDef.id] = results.data;

          // Cache the original CSV column header sequence order
          if (results.meta && results.meta.fields) {
            tableDef.originalHeaders = results.meta.fields;
          }

          const filtered = results.data.filter((row) => {
            const targetCountyLower = selectedCounty.toLowerCase().trim();

            if ("GEO_1" in row) {
              const geo1 = row.GEO_1 ? row.GEO_1.trim() : "";
              return geo1 === "" || geo1.toLowerCase() === targetCountyLower;
            }

            if ("NAME" in row) {
              const nameVal = row.NAME ? row.NAME.toLowerCase().trim() : "";
              return nameVal.includes(targetCountyLower);
            }

            if ("Location" in row) {
              const locVal = row.Location
                ? row.Location.toLowerCase().trim()
                : "";
              return locVal === targetCountyLower;
            }

            return false;
          });

          filteredReportData[tableDef.id] = filtered;
          resolve({ success: true, tableDef });
        },
        error: function () {
          filteredReportData[tableDef.id] = null;
          rawTablesCache[tableDef.id] = null;
          resolve({ success: false, tableDef });
        },
      });
    });
  });

  await Promise.all(fetchPromises);
  renderAllReportTables();
  downloadAllBtn.disabled = false;
}

// Step 4: Render UI Tables with Hyperlinked Sources
function renderAllReportTables() {
  reportContainer.innerHTML = "";
  const stateFolder = stateSelect.value;
  const stateFips = getSelectedStateFIPS();
  const countyFips = discoverCountyFIPS();

  CENSUS_TABLES.forEach((tableDef) => {
    if (!tableDef.render) return;

    const data = filteredReportData[tableDef.id];
    const section = document.createElement("div");
    section.className = "table-section";

    const headerContainer = document.createElement("div");
    headerContainer.className = "table-header-container";
    headerContainer.style.display = "block";
    headerContainer.style.marginBottom = "12px";

    const title = document.createElement("h3");
    title.style.margin = "0 0 4px 0";
    title.textContent = tableDef.title;
    headerContainer.appendChild(title);

    if (tableDef.sources && tableDef.sources.length > 0) {
      const sourceDiv = document.createElement("div");
      sourceDiv.style.fontSize = "12px";
      sourceDiv.style.color = "#666";
      sourceDiv.style.marginBottom = "6px";
      sourceDiv.innerHTML = `<strong>Data Source (${countySelect.value || "Selected County"}):</strong> `;

      if (tableDef.id === "02") {
        const stateMeta = tableDef.sources[0].getStateSource(stateFolder);
        const a = document.createElement("a");
        a.href = stateMeta.url;
        a.target = "_blank";
        a.style.color = "#0056b3";
        a.style.textDecoration = "underline";
        a.textContent = stateMeta.label;
        sourceDiv.appendChild(a);
      } else {
        tableDef.sources.forEach((src, idx) => {
          const a = document.createElement("a");
          const finalUrl = countyFips
            ? src.url(stateFips, countyFips)
            : src.url(stateFips, "").replace("g=0500000US", "g=0400000US");

          a.href = finalUrl;
          a.target = "_blank";
          a.style.color = "#0056b3";
          a.style.textDecoration = "underline";
          a.textContent = src.label;
          sourceDiv.appendChild(a);

          if (idx < tableDef.sources.length - 1) {
            sourceDiv.appendChild(document.createTextNode(" | "));
          }
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
      errorMsg.style.color = "#aa0000";
      errorMsg.textContent =
        "Data breakdown unavailable or source file missing matching county entries.";
      section.appendChild(errorMsg);
    }

    reportContainer.appendChild(section);
  });
}

// Step 5: Render HTML strings using explicit header constraints
function generateHtmlTableString(data, originalHeaders) {
  if (!data || data.length === 0) return "";

  const headers =
    originalHeaders && originalHeaders.length > 0
      ? originalHeaders
      : Object.keys(data[0]);

  let html = "<table><thead><tr>";
  headers.forEach((h) => (html += `<th>${h}</th>`));
  html += "</tr></thead><tbody>";

  data.forEach((row) => {
    html += "<tr>";
    headers.forEach((h) => {
      html += `<td>${row[h] !== undefined && row[h] !== null ? row[h] : ""}</td>`;
    });
    html += "</tr>";
  });

  html += "</tbody></table>";
  return html;
}

// --- BUNDLED ZIP DOWNLOAD LOGIC (Preserves 01 and 02 exactly as-is from disk) ---
async function downloadAllAsZip() {
  const zip = new JSZip();
  const stateFolder = stateSelect.value;
  const selectedCounty = countySelect.value.replace(/\s+/g, "_");

  downloadAllBtn.textContent = "Gathering files...";
  downloadAllBtn.disabled = true;

  const zipPromises = CENSUS_TABLES.map(async (tableDef) => {
    if (tableDef.id === "01" || tableDef.id === "02") {
      try {
        const response = await fetch(
          `data/${stateFolder}/${tableDef.file}.csv`,
        );
        if (response.ok) {
          const rawText = await response.text();
          zip.file(`${tableDef.file}.csv`, rawText);
        }
      } catch (err) {
        console.error(`Could not attach raw file for ${tableDef.file}:`, err);
      }
    } else {
      const filteredData = filteredReportData[tableDef.id];
      if (filteredData && filteredData.length > 0) {
        const csv = Papa.unparse(filteredData);
        zip.file(`${tableDef.file}_${selectedCounty}.csv`, csv);
      }
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

// --- INITIALIZATION GATEWAY ---
if (stateSelect.value === "21_Kentucky") {
  handleStateChange();
}
