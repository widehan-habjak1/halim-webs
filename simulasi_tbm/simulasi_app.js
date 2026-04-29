const uniformCanvas = document.getElementById("uniform-canvas");
const gaussianCanvas = document.getElementById("gaussian-canvas");
const uniformCtx = uniformCanvas.getContext("2d");
const gaussianCtx = gaussianCanvas.getContext("2d");

const sampleCountInput = document.getElementById("sample-count");
const runButton = document.getElementById("run-simulation");
const resetButton = document.getElementById("reset-canvas");

const uniformCountValue = document.getElementById("uniform-count");
const gaussianCountValue = document.getElementById("gaussian-count");
const z0Value = document.getElementById("z0-value");
const z1Value = document.getElementById("z1-value");

function randomUniformPair() {
    return {
        x: Math.random(),
        y: Math.random(),
    };
}

function boxMuller() {
    let u1 = 0;
    let u2 = 0;

    while (u1 === 0) {
        u1 = Math.random();
    }

    while (u2 === 0) {
        u2 = Math.random();
    }

    const factor = Math.sqrt(-2 * Math.log(u1));

    return {
        z0: factor * Math.cos(2 * Math.PI * u2),
        z1: factor * Math.sin(2 * Math.PI * u2),
    };
}

function clearPlot(ctx, canvas, title) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgb(249, 252, 250)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "rgba(72, 111, 102, 0.35)";
    ctx.lineWidth = 1;
    ctx.strokeRect(24, 24, canvas.width - 48, canvas.height - 48);

    ctx.fillStyle = "rgb(63, 81, 76)";
    ctx.font = "14px system-ui";
    ctx.fillText(title, 24, 18);
}

function drawPoint(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, 2.2, 0, Math.PI * 2);
    ctx.fill();
}

function plotUniform(points) {
    clearPlot(uniformCtx, uniformCanvas, "Turtle uniform random dots");

    const scale = 100;
    const centerX = uniformCanvas.width / 2;
    const centerY = uniformCanvas.height / 2;

    for (const point of points) {
        const x = centerX + (point.x - 0.5) * scale * 2;
        const y = centerY - (point.y - 0.5) * scale * 2;
        drawPoint(uniformCtx, x, y, "rgb(31, 78, 121)");
    }
}

function plotGaussian(points) {
    clearPlot(gaussianCtx, gaussianCanvas, "Box-Muller gaussian dots");

    const scale = 100;
    const centerX = gaussianCanvas.width / 2;
    const centerY = gaussianCanvas.height / 2;

    gaussianCtx.strokeStyle = "rgba(39, 76, 119, 0.2)";
    gaussianCtx.beginPath();
    gaussianCtx.moveTo(centerX, 24);
    gaussianCtx.lineTo(centerX, gaussianCanvas.height - 24);
    gaussianCtx.moveTo(24, centerY);
    gaussianCtx.lineTo(gaussianCanvas.width - 24, centerY);
    gaussianCtx.stroke();

    for (const point of points) {
        const x = centerX + point.x * scale;
        const y = centerY - point.y * scale;
        if (x >= 24 && x <= gaussianCanvas.width - 24 && y >= 24 && y <= gaussianCanvas.height - 24) {
            drawPoint(gaussianCtx, x, y, "rgb(184, 61, 61)");
        }
    }
}

function runSimulation() {
    const n = Number(sampleCountInput.value);
    const uniformPoints = [];
    const gaussianPoints = [];
    let lastGaussian = { z0: 0, z1: 0 };

    for (let index = 0; index < n; index += 1) {
        uniformPoints.push(randomUniformPair());

        const gaussian = boxMuller();
        lastGaussian = gaussian;
        gaussianPoints.push({ x: gaussian.z0, y: gaussian.z1 });
    }

    plotUniform(uniformPoints);
    plotGaussian(gaussianPoints);

    uniformCountValue.textContent = uniformPoints.length;
    gaussianCountValue.textContent = gaussianPoints.length;
    z0Value.textContent = lastGaussian.z0.toFixed(4);
    z1Value.textContent = lastGaussian.z1.toFixed(4);
}

function resetSimulation() {
    clearPlot(uniformCtx, uniformCanvas, "Turtle uniform random dots");
    clearPlot(gaussianCtx, gaussianCanvas, "Box-Muller gaussian dots");
    uniformCountValue.textContent = "-";
    gaussianCountValue.textContent = "-";
    z0Value.textContent = "-";
    z1Value.textContent = "-";
}

runButton.addEventListener("click", runSimulation);
resetButton.addEventListener("click", resetSimulation);

resetSimulation();
runSimulation();
