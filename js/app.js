// Definition of the 9 tables to pull down
const CENSUS_TABLES = [
    { id: "03", file: "03_Population_Age", title: "03 Population Age" },
    { id: "04", file: "04_Race", title: "04 Race" },
    { id: "05", file: "05_Labor", title: "05 Labor" },
    { id: "06", file: "06_Industry", title: "06 Industry" },
    { id: "07", file: "07_Income", title: "07 Income" },
    { id: "08", file: "08_Disability", title: "08 Disability" },
    { id: "09", file: "09_Limited_English", title: "09 Limited English" },
    { id: "10", file: "10_Housing", title: "10 Housing" },
    { id: "11", file: "11_Commuting", title: "11 Commuting" }
];

// Global runtime data structures holding parsed information
let stateCachedTables = {}; 
let filteredReportData = {};

const stateSelect = document.getElementById('stateSelect');
const countySelect = document.getElementById('countySelect');
const reportContainer = document.getElementById('reportContainer');

// Master Download Elements
const downloadLabel = document.getElementById('downloadLabel');
const masterBtn01 = document.getElementById('masterBtn01');
const masterBtn02 = document.getElementById('masterBtn02');

stateSelect.addEventListener('change', handleStateChange);
countySelect.addEventListener('change', handleCountyChange);

// Step 1: Handle State Switch and Pre-Fetch Unique Counties from Reference Table (04_Race)
function handleStateChange() {
    const stateFolder = stateSelect.value; // e.g., "21_Kentucky"
    const stateName = stateSelect.options[stateSelect.selectedIndex].text;

    countySelect.innerHTML = '<option value="">-- Select County --</option>';
    countySelect.disabled = true;
    reportContainer.innerHTML = "<p>Please select a county to generate reports.</p>";
    stateCachedTables = {}; 

    if (stateFolder) {
        // Enable Master Downloads
        downloadLabel.textContent = `Download complete master datasets for ${stateName}:`;
        masterBtn01.disabled = false;
        masterBtn02.disabled = false;

        reportContainer.innerHTML = `<em>Loading county configurations for ${stateName}...</em>`;
        
        // Read 04_Race first simply to extract unique county variants available in this state
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
    } else {
        downloadLabel.textContent = "Select a state to download master datasets:";
        masterBtn01.disabled = true;
        masterBtn02.disabled = true;
    }
}

// Step 2: Extract Counties 
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

// Step 3: Handle County Changes - Fetch All 9 Tables Simultaneously
async function handleCountyChange() {
    const stateFolder = stateSelect.value;
    const selectedCounty = countySelect.value;

    if (!selectedCounty) {
        reportContainer.innerHTML = "<p>Please select a county to view complete records.</p>";
        return;
    }

    reportContainer.innerHTML = `<h3>Generating Comprehensive Assessment for ${selectedCounty}...</h3><p>Processing 9 core metrics...</p>`;
    filteredReportData = {}; 

    // Build processing queues asynchronously
    const fetchPromises = CENSUS_TABLES.map(tableDef => {
        return new Promise((resolve) => {
            Papa.parse(`data/${stateFolder}/${tableDef.file}.csv`, {
                download: true,
                header: true,
                skipEmptyLines: true,
                complete: function(results) {
                    // Filter matching your criteria: GEO_1 is empty (State) OR matching selected county
                    const filtered = results.data.filter(row => {
                        const geo1 = row.GEO_1 ? row.GEO_1.trim() : '';
                        return geo1 === '' || geo1.toLowerCase() === selectedCounty.toLowerCase();
                    });
                    
                    filteredReportData[tableDef.id] = filtered;
                    resolve({ success: true, tableDef });
                },
                error: function() {
                    filteredReportData[tableDef.id] = null; // Mark missing files safely
                    resolve({ success: false, tableDef });
                }
            });
        });
    });

    await Promise.all(fetchPromises);
    renderAllReportTables();
}

// Step 4: Render All Report Cards to UI Layout
function renderAllReportTables() {
    reportContainer.innerHTML = ""; // Clear loader text

    CENSUS_TABLES.forEach(tableDef => {
        const data = filteredReportData[tableDef.id];
        
        const section = document.createElement('div');
        section.className = 'table-section';

        // Header and Contextual Actions Bar
        const headerContainer = document.createElement('div');
        headerContainer.className = 'table-header-container';
        
        const title = document.createElement('h3');
        title.textContent = tableDef.title;
        headerContainer.appendChild(title);

        if (data && data.length > 0) {
            const dlBtn = document.createElement('button');
            dlBtn.textContent = "Download CSV Slice";
            dlBtn.className = "secondary";
            dlBtn.style.padding = "4px 8px";
            dlBtn.style.fontSize = "12px";
            dlBtn.onclick = () => downloadFilteredSlice(tableDef.id, tableDef.file);
            headerContainer.appendChild(dlBtn);
            section.appendChild(headerContainer);

            // Output data structures to table blocks
            const wrapper = document.createElement('div');
            wrapper.className = 'table-wrapper';
            wrapper.innerHTML = generateHtmlTableString(data);
            section.appendChild(wrapper);
        } else {
            section.appendChild(headerContainer);
            const errorMsg = document.createElement('p');
            errorMsg.style.color = '#aa0000';
            errorMsg.textContent = "Data breakdown unavailable or source file missing path resolution mapping.";
            section.appendChild(errorMsg);
        }

        reportContainer.appendChild(section);
    });
}

// Core formatting loop producing inner rows
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

// --- FILE SYSTEM EXPORT UTILITIES ---

function downloadStateMaster(fileName) {
    const stateFolder = stateSelect.value;
    if (!stateFolder) return;

    const link = document.createElement('a');
    link.href = `data/${stateFolder}/${fileName}`;
    link.download = `${stateFolder}_${fileName}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function downloadFilteredSlice(tableId, filename) {
    const data = filteredReportData[tableId];
    if (!data || data.length === 0) return;

    const csvContent = Papa.unparse(data);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Filtered_${stateSelect.value}_${countySelect.value}_${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

masterBtn01.addEventListener('click', () => downloadStateMaster('01_County_Population_Rank.csv'));
masterBtn02.addEventListener('click', () => downloadStateMaster('02_Population_Projections.csv'));

// --- INITIALIZATION GATEWAY ---
if (stateSelect.value === '21_Kentucky') {
    handleStateChange();
}