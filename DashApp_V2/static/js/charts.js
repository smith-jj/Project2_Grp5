// Global X and y variables for Boy's Math Chart
const xmmlabels = [];
const ymmgap = [];
// Global x and y variables for Girl's Math chart 
const xfmlabels = [];
const yfmgap = [];
// Global x and y variables for Boy's Reading Chart 
const xmrlabels = [];
const ymrgap = [];
// Global x nad y variables for Girl's Reading Chart 
const xfrlabels = [];
const yfrgap = [];

// Call Boy's Math Chart  
chartMM();
// Call Girl's Math Chart
chartFM();
// Call Boy's Reading Chart
chartMR();
// Call Girl's Reading Chart
chartFR();

// Function to create Boy's Math Chart from CSV
async function chartMM() {
    await getMMdata();
    const ctx = document.getElementById('mmChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: xmmlabels,
            datasets: [{
                label: "Percent Change",
                data: ymmgap,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        }
    });
}

async function getMMdata() {
    const response = await fetch('male_math_data.csv');
    const data = await response.text();

    const mmTable = data.split('\n').slice(1);
    mmTable.forEach(row => {
        const columns = row.split(',');
        const state = columns[1];
        xmmlabels.push(state);
        const mmgap = columns[5];
        ymmgap.push(parseFloat(mmgap));
        console.log(state, mmgap);
    });
}

// Function to create Girls's Math Chart from CSV
async function chartFM() {
    await getFMdata();
    const ctx = document.getElementById('fmChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: xfmlabels,
            datasets: [{
                label: "Percent Change",
                data: yfmgap,
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }]
        }
    });
}

async function getFMdata() {
    const response = await fetch('female_math_data.csv');
    const data = await response.text();

    const fmTable = data.split('\n').slice(1);
    fmTable.forEach(row => {
        const columns = row.split(',');
        const state = columns[1];
        xfmlabels.push(state);
        const fmgap = columns[5];
        yfmgap.push(parseFloat(fmgap));
        console.log(state, fmgap);
    });
}

// Function to create Boy's Reading Chart from CSV
async function chartMR() {
    await getMRdata();
    const ctx = document.getElementById('mrChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: xmrlabels,
            datasets: [{
                label: "Percent Change",
                data: ymrgap,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        }
    });
}

async function getMRdata() {
    const response = await fetch('male_reading_data.csv');
    const data = await response.text();

    const mrTable = data.split('\n').slice(1);
    mrTable.forEach(row => {
        const columns = row.split(',');
        const state = columns[1];
        xmrlabels.push(state);
        const mrgap = columns[5];
        ymrgap.push(parseFloat(mrgap));
        console.log(state, mrgap);
    });
}

// Function to create Girl's Reading Chart from CSV
async function chartFR() {
    await getFRdata();
    const ctx = document.getElementById('frChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: xfrlabels,
            datasets: [{
                label: "Percent Change",
                data: yfrgap,
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }]
        }
    });
}

async function getFRdata() {
    const response = await fetch('female_reading_data.csv');
    const data = await response.text();

    const frTable = data.split('\n').slice(1);
    frTable.forEach(row => {
        const columns = row.split(',');
        const state = columns[1];
        xfrlabels.push(state);
        const frgap = columns[5];
        yfrgap.push(parseFloat(frgap));
        console.log(state, frgap);
    });
}