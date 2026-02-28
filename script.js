const output = document.getElementById("output");

output.innerHTML = `
    <tr id="loading">
        <td colspan="2" class="text-center">Loading...</td>
    </tr>
`;

function createPromise() {
    const randomTime = Math.random() * 2 + 1;

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(randomTime);
        }, randomTime * 1000);
    });
}

const promise1 = createPromise();
const promise2 = createPromise();
const promise3 = createPromise();

const startTime = performance.now();

Promise.all([promise1, promise2, promise3])
    .then((values) => {
        const endTime = performance.now();
        const totalTime = (endTime - startTime) / 1000;

        const loadingRow = document.getElementById("loading");
        if (loadingRow) {
            loadingRow.remove();
        }

        values.forEach((time, index) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>Promise ${index + 1}</td>
                <td>${time.toFixed(3)}</td>
            `;

            output.appendChild(row);
        });

        const totalRow = document.createElement("tr");

        totalRow.innerHTML = `
            <td>Total</td>
            <td>${totalTime.toFixed(3)}</td>
        `;

        output.appendChild(totalRow);
    });