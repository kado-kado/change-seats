const taskQueue = [];
let isProcessing = false;

function taskName(label) {
    taskQueue.push(label);
    if (!isProcessing) {
        isProcessing = true;
        document.getElementById('load-overlay').style.display = 'flex';
        showNextTask();
    }
}

function showNextTask() {
    const list = document.getElementById('load-task-list');
    const complete = document.getElementById('load-complete');
    const overlay = document.getElementById('load-overlay');

    const prev = list.querySelector('[data-next="true"]');
    if (prev) {
        prev.dataset.next = "";
        const check = document.createElement('div');
        check.className = 'load-check';
        prev.replaceChild(check, prev.firstChild);
    }

    const current = taskQueue.shift();
    if (!current) {
        complete.style.display = 'block';
        requestAnimationFrame(() => complete.style.opacity = 1);
        setTimeout(() => {
            overlay.style.opacity = 0;
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 1000);
        }, 1000);
        isProcessing = false;
        return;
    }

    const row = document.createElement('div');
    row.className = 'load-task';
    row.dataset.next = 'true';
    row.style.opacity = 0.6;

    const arrow = document.createElement('div');
    arrow.style.width = '20px';
    arrow.style.marginRight = '10px';
    arrow.textContent = '→';

    const label = document.createElement('div');
    label.textContent = current;

    row.appendChild(arrow);
    row.appendChild(label);
    list.appendChild(row);

    setTimeout(showNextTask, 100);
}