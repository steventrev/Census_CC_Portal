// All 11 tables mapped directly to the API endpoints and table IDs utilized in Census_CC_Data.py
// The urls are functions that dynamically inject both the selected state and county FIPS codes.
const CENSUS_TABLES = [
    { 
        id: "01", 
        file: "01_County_Population_Rank", 
        title: "01 County Population Rank", 
        render: true,
        sources: [
            { label: "2010 SF1 (Table P1)", url: (sFips, cFips) => `https://data.census.gov/table/DECENNIALSF12010.P1?g=050XX00US${sFips}${cFips}` },
            { label: "2020 DHC (Table P1)", url: (sFips, cFips) => `https://data.census.gov/table/DECENNIALDHC2020.P1?g=050XX00US${sFips}${cFips}` }
        ]
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
                        return { label: "Indiana Business Research Center (July 2024)", url: "https://www.stats.indiana.edu/pop_proj/" };
                    } else if (stateFolder.includes("Kentucky")) {
                        return { label: "Kentucky State Data Center (August 2022)", url: "https://centers.louisville.edu/kentucky-state-data-center/data-downloads" };
                    } else if (stateFolder.includes("Tennessee")) {
                        return { label: "Tennessee State Data Center (August 2024)", url: "https://tnsdc.utk.edu/estimates-and-projections/boyd-center-population-projections/" };
                    } else if (stateFolder.includes("Illinois")) {
                        return { label: "Illinois Department of Public Health (May 2024)", url: "https://dph.illinois.gov/data-statistics/vital-statistics/illinois-population-data.html" };
                    } else {
                        // General Fallback default parameter
                        return { label: "State Data Center Population Projections", url: "https://data.census.gov" };
                    }
                }
            }
        ]
    },
    { 
        id: "03", 
        file: "03_Population_Age", 
        title: "03 Population Age", 
        render: true,
        sources: [
            { label: "2000 SF1 (Table P012)", url: (sFips, cFips) => `https://data.census.gov/table/DECENNIALSF12000.P012?g=050XX00US${sFips}${cFips}` },
            { label: "2010 SF1 (Table P12)", url: (sFips, cFips) => `https://data.census.gov/table/DECENNIALSF12010.P12?g=050XX00US${sFips}${cFips}` },
            { label: "2020 DHC (Table P12)", url: (sFips, cFips) => `https://data.census.gov/table/DECENNIALDHC2020.P12?g=050XX00US${sFips}${cFips}` }
        ]
    },
    { 
        id: "04", 
        file: "04_Race", 
        title: "04 Race", 
        render: true,
        sources: [
            { label: "2020 DHC (Table P5)", url: (sFips, cFips) => `https://data.census.gov/table/DECENNIALDHC2020.P5?g=050XX00US${sFips}${cFips}` }
        ]
    },
    { 
        id: "05", 
        file: "05_Labor", 
        title: "05 Labor", 
        render: true,
        sources: [
            { label: "2024 ACS 5-Year Detailed Table (Table B23025)", url: (sFips, cFips) => `https://data.census.gov/table/ACSDT5Y2024.B23025?g=050XX00US${sFips}${cFips}` }
        ]
    },
    { 
        id: "06", 
        file: "06_Industry", 
        title: "06 Industry", 
        render: true,
        sources: [
            { label: "2024 ACS 5-Year Detailed Table (Table C24070)", url: (sFips, cFips) => `https://data.census.gov/table/ACSDT5Y2024.C24070?g=050XX00US${sFips}${cFips}` }
        ]
    },
    { 
        id: "07", 
        file: "07_Income", 
        title: "07 Income", 
        render: true,
        sources: [
            { label: "Median HH Income (Table B19013)", url: (sFips, cFips) => `https://data.census.gov/table/ACSDT5Y2024.B19013?g=050XX00US${sFips}${cFips}` },
            { label: "Per Capita Income (Table B19301)", url: (sFips, cFips) => `https://data.census.gov/table/ACSDT5Y2024.B19301?g=050XX00US${sFips}${cFips}` },
            { label: "Gini Index (Table B19083)", url: (sFips, cFips) => `https://data.census.gov/table/ACSDT5Y2024.B19083?g=050XX00US${sFips}${cFips}` },
            { label: "Poverty Status (Table C17002)", url: (sFips, cFips) => `https://data.census.gov/table/ACSDT5Y2024.C17002?g=050XX00US${sFips}${cFips}` }
        ]
    },
    { 
        id: "08", 
        file: "08_Disability", 
        title: "08 Disability", 
        render: true,
        sources: [
            { label: "2024 ACS 5-Year Detailed Table (Table C18108)", url: (sFips, cFips) => `https://data.census.gov/table/ACSDT5Y2024.C18108?g=050XX00US${sFips}${cFips}` }
        ]
    },
    { 
        id: "09", 
        file: "09_Limited_English", 
        title: "09 Limited English", 
        render: true,
        sources: [
            { label: "2024 ACS 5-Year Detailed Table (Table C16002)", url: (sFips, cFips) => `https://data.census.gov/table/ACSDT5Y2024.C16002?g=050XX00US${sFips}${cFips}` }
        ]
    },
    { 
        id: "10", 
        file: "10_Housing", 
        title: "10 Housing", 
        render: true,
        sources: [
            { label: "2024 ACS 5-Year Data Profile (Table DP04)", url: (sFips, cFips) => `https://data.census.gov/table/ACSDP5Y2024.DP04?g=050XX00US${sFips}${cFips}` }
        ]
    },
    { 
        id: "11", 
        file: "11_Commuting", 
        title: "11 Commuting", 
        render: true,
        sources: [
            { label: "2024 ACS 5-Year Subject Table (Table S0801)", url: (sFips, cFips) => `https://data.census.gov/table/ACSST5Y2024.S0801?g=050XX00US${sFips}${cFips}` }
        ]
    }
];

let rawTablesCache = {};    
let filteredReportData = {}; 

const stateSelect = document.getElementById('stateSelect');
const countySelect = document.getElementById('countySelect');
const reportContainer = document.getElementById('reportContainer');
const downloadAllBtn = document.getElementById('downloadAllBtn');

stateSelect.addEventListener('change', handleStateChange);
countySelect.addEventListener('change', handleCountyChange);
downloadAllBtn.addEventListener('click', downloadAllAsZip);

// Pulls the 2-digit state FIPS code safely from selection payload (e.g., "21_Kentucky" -> "21")
function getSelectedStateFIPS() {
    const val = stateSelect.value;
    if (!val) return "";
    const match = val.match(/^(\d+)_/);
    return match ? match[1] : "";
}

// Inspects the filtered county data arrays to locate and extract the unique 3-digit county FIPS code
function discoverCountyFIPS(tableId) {
    const data = filteredReportData[tableId];
    if (!data || data.length === 0) return "";
    
    for (let row of data) {
        if (row.COUNTY && row.COUNTY.trim() !== "" && !isNaN(row.COUNTY)) {
            return row.COUNTY.trim().padStart(3, '0');
        }
        if (row.fips5 && row.fips5.trim() !== "" && row.fips5.length >= 5) {
            return row.fips5.trim().slice(-3);
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
    reportContainer.innerHTML = "<p>Please select a county to generate reports.</p>";
    rawTablesCache = {};
    filteredReportData = {}; 

    if (stateFolder) {
        reportContainer.innerHTML = `<em>Loading county parameters for ${stateName}...</em>`;
        
        Papa.parse(`data/${stateFolder}/04_Race.csv`, {
            download: true,
            header: true,
            skipEmptyLines: true,
            complete: function(results) {
                populateCounties(results.data);
                reportContainer.innerHTML = "<p>State database connected. Please select a specific county to build reports.</p>";
            },
            error: function() {
                reportContainer.innerHTML = `<p style="color:red;">Failed to resolve directory paths for data/${stateFolder}/04_Race.csv</p>`;
            }
        });
    }
}

// Step 2: Populate Dropdown List
function populateCounties(data) {
    const counties = [...new Set(data.map(row => row.GEO_1).filter(geo => geo && geo.trim() !== ''))];
    counties.sort();

    counties.forEach(county => {
        const option = document.createElement('option');
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
        reportContainer.innerHTML = "<p>Please select a county to view complete records.</p>";
        downloadAllBtn.disabled = true;
        return;
    }

    reportContainer.innerHTML = `<h3>Generating Comprehensive Assessment for ${selectedCounty}...</h3><p>Processing 11 structural data matrix streams...</p>`;
    filteredReportData = {};
    rawTablesCache = {};
    downloadAllBtn.disabled = true;

    const fetchPromises = CENSUS_TABLES.map(tableDef => {
        return new Promise((resolve) => {
            Papa.parse(`data/${stateFolder}/${tableDef.file}.csv`, {
                download: true,
                header: true,
                skipEmptyLines: true,
                complete: function(results) {
                    rawTablesCache[tableDef.id] = results.data; 

                    const filtered = results.data.filter(row => {
                        const targetCountyLower = selectedCounty.toLowerCase().trim();

                        if ('GEO_1' in row) {
                            const geo1 = row.GEO_1 ? row.GEO_1.trim() : '';
                            return geo1 === '' || geo1.toLowerCase() === targetCountyLower;
                        }
                        
                        if ('NAME' in row) {
                            const nameVal = row.NAME ? row.NAME.toLowerCase().trim() : '';
                            return nameVal.includes(targetCountyLower);
                        }

                        if ('Location' in row) {
                            const locVal = row.Location ? row.Location.toLowerCase().trim() : '';
                            return locVal === targetCountyLower;
                        }

                        return false;
                    });
                    
                    filteredReportData[tableDef.id] = filtered; 
                    resolve({ success: true, tableDef });
                },