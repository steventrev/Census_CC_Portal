// All 11 tables now have render: true to display as sliced tables on the page
const CENSUS_TABLES = [
    { id: "01", file: "01_County_Population_Rank", title: "01 County Population Rank", render: true },
    { id: "02", file: "02_Population_Projections", title: "02 Population Projections", render: true },
    { id: "03", file: "03_Population_Age", title: "03 Population Age", render: true },
    { id: "04", file: "04_Race", title: "04 Race", render: true },
    { id: "05", file: "05_Labor", title: "05 Labor", render: true },
    { id: "06", file: "06_Industry", title: "06 Industry", render: true },
    { id: "07", file: "07_Income", title: "07 Income", render: true },
    { id: "08", file: "08_Disability", title: "08 Disability", render: true },
    { id: "09", file: "09_Limited_English", title: "09 Limited English", render: true },
    { id: "10", file: "10_Housing", title: "10 Housing", render: true },
    { id: "11", file: "11_Commuting", title: "11 Commuting", render: true }
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
                    rawTablesCache[tableDef.id] = results.data; // Full un-sliced file backup preserved here

                    // Apply geographic slice rule
                    const filtered = results.data.filter(row => {
                        const geo1 = row.GEO_1 ? row.GEO_1.trim() : '';
                        return geo1 === '' || geo1.toLowerCase() === selectedCounty.toLowerCase();
                    });
                    
                    filteredReportData[tableDef.id] = filtered; // County slice backup stored here
                    resolve({ success: true, tableDef });
                },
                error: function() {
                    filteredReportData[tableDef.id] = null;
                    rawTablesCache[tableDef.id] = null;
                    resolve({ success: false, tableDef });
                }
            });
        });
    });

    await Promise.all(fetchPromises);
    renderAllReportTables();
    downloadAllBtn.disabled = false; 
}

// Step 4: Render UI Tables (All 11 are now visible)
function renderAllReportTables() {
    reportContainer.innerHTML = ""; 

    CENSUS_TABLES.forEach(tableDef => {
        if (!tableDef.render) return; // Guard clause (ready in case you hide any later)

        const data = filteredReportData[tableDef.id];
        const section = document.createElement('div');
        section.className = 'table-section';

        const headerContainer = document.createElement('div');
        headerContainer.className = 'table-header-container';
        
        const title = document.createElement('h3');
        title.textContent = tableDef.title;
        headerContainer.appendChild(title);
        section.appendChild(headerContainer);

        if (data && data.length > 0) {
            const wrapper = document.createElement('div');
            wrapper.className = 'table-wrapper';
            wrapper.innerHTML = generateHtmlTableString(data);
            section.appendChild(wrapper);
        } else {
            const errorMsg = document.createElement('p');
            errorMsg.style.color = '#aa0000';
            errorMsg.textContent = "Data breakdown unavailable or source file missing path resolution mapping.";
            section.appendChild(errorMsg);
        }

        reportContainer.appendChild(section);
    });
}

function generateHtmlTableString(data) {
    const headers = Object.keys(data[0]);
    let html = '<table><thead><tr>';
    headers.forEach(h => html += `<th>${h}</th>`);
    html += '</tr></thead><tbody>';

    data.forEach(row => {
        html += '<tr>';
        headers.forEach(h => html += `<td>${row[h] || ''}</td>`);
        html += '</tr>';
    });

    html += '</tbody></table>';
    return html;
}

// --- BUNDLED ZIP DOWNLOAD LOGIC ---
function downloadAllAsZip() {
    const zip = new JSZip();
    const stateFolder = stateSelect.value;
    const selectedCounty = countySelect.value.replace(/\s+/g, '_'); 

    CENSUS_TABLES.forEach(tableDef => {
        if (tableDef.id === "01" || tableDef.id === "02") {
            // SUCCESS: Grab full un-sliced array for 01 and 02
            const rawData = rawTablesCache[tableDef.id];
            if (rawData && rawData.length > 0) {
                const csv = Papa.unparse(rawData);
                zip.file(`${tableDef.file}.csv`, csv);
            }
        } else {
            // Grab filtered slices for 03 through 11
            const filteredData = filteredReportData[tableDef.id];
            if (filteredData && filteredData.length > 0) {
                const csv = Papa.unparse(filteredData);
                zip.file(`${tableDef.file}_${selectedCounty}.csv`, csv);
            }
        }
    });

    downloadAllBtn.textContent = "Zipping files...";
    downloadAllBtn.disabled = true;

    zip.generateAsync({ type: "blob" }).then(function (content) {
        const url = URL.createObjectURL(content);
        const link = document.createElement('a');
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
if (stateSelect.value === '21_Kentucky') {
    handleStateChange();
}