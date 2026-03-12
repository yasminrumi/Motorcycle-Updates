var var_speed = 100;  // Global variable for speed (var_speed as required)

const count = 50;
let array = new Array(count);
const visualizer = document.getElementById('vis-2310637');

function init() {
  visualizer.innerHTML = '';
  for (let i = 0; i < count; i++) {
    array[i] = i / count + Math.random() * 0.03;
    const bar = document.createElement('div');
    bar.classList.add('bar');
    visualizer.appendChild(bar);
  }
  updateBars();
}

init();

function updateSpeed(val) {
  var_speed = 201 - val;  // Invert slider so right = faster
}

function updateBars() {
  const bars = document.getElementsByClassName('bar');
  for (let i = 0; i < bars.length; i++) {
    bars[i].style.height = `${array[i] * 100}%`;
  }
}

async function startVisualizer() {
  document.getElementById('motorcycle').style.display = 'none';
  // Shuffle initially
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  updateBars();
  await bubbleSort(array);
}

async function bubbleSort(arr) {
  let swapped;
  do {
    swapped = false;
    for (let i = 1; i < arr.length; i++) {
      if (arr[i - 1] > arr[i]) {
        const aux = arr[i - 1];
        arr[i - 1] = arr[i];
        arr[i] = aux;
        swapped = true;
        updateBars();
        await new Promise(resolve => setTimeout(resolve, var_speed));  // Uses var_speed
      }
    }
  } while (swapped);
  runMotorcycle();
}

async function runMotorcycle() {
  const bike = document.getElementById('motorcycle');
  const bars = document.getElementsByClassName('bar');
  bike.style.display = 'block';

  for (let i = 0; i < bars.length; i++) {
    let currentBar = bars[i];
    bike.style.left = `${currentBar.offsetLeft}px`;
    bike.style.bottom = `${currentBar.offsetHeight - 2}px`;

    // Tilt motorcycle to match bar height gradient
    // Taller bar -> positive rotation (forward tilt)
    // Normalized tilt: -5 to +5 degrees based on bar height (0-200px)
    const tiltAngle = ((currentBar.offsetHeight / 2) - 50);  // max height 200px -> range -50 to 50
    bike.style.transform = `scaleX(-1) rotate(${tiltAngle / 10}deg)`;  // divide by 10 for degrees

    await new Promise(r => setTimeout(r, 55));
  }
}