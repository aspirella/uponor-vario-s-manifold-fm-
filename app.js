// Data Structure for Steps
const stepsData = [
    {
        id: 2,
        title: "",
        description: "",
        visual: "dimensions.gif",
        customTable: {
            headers: ["n", "L1 [mm]", "L2 [mm]"],
            rows: [
                ["2", "214", "155"],
                ["3", "264", "205"],
                ["4", "314", "255"],
                ["5", "364", "305"],
                ["6", "414", "355"],
                ["7", "464", "405"],
                ["8", "514", "455"],
                ["9", "564", "505"],
                ["10", "614", "555"],
                ["11", "664", "605"],
                ["12", "714", "655"],
                ["13", "764", "705"],
                ["14", "814", "755"],
                ["15", "864", "805"],
                ["16", "914", "855"]
            ]
        },
        checklist: [], // Empty checklist as requested
        specs: [
            { icon: "ϑsec = 15 – 60°C.svg", label: "ϑsec", value: "= 15 – 60°C" },
            { icon: "kvs = 0,95.svg", label: "kvs", value: "= 0,95 m³/h" },
            { icon: "Pmax = 6 bar.svg", label: "Pmax", value: "= 6 bar" },
            { icon: "kvs = 2,83.svg", label: "kvs", value: "= 2,83 m³/h" },
            { icon: "Ptest = 10 bar.svg", label: "Ptest", value: "= 10 bar" },
            { icon: "Vmax.svg", label: "V̇max", value: "= 3,6 m³/h (12 loops)" }
        ]
    },
    {
        id: 3,
        category: "installation",
        title: "Installation Step 1",
        description: "",
        visual: "installation-step-1.gif",
        checklist: [],
        specs: [
            { label: "Cut Angle", value: "90°" },
            { label: "Max Deviation", value: "2°" },
            { label: "Blade Status", value: "Sharp" }
        ]
    },
    {
        id: 7,
        category: "installation",
        title: "Installation Step 2",
        description: "",
        visual: "installation-step-2.gif",
        checklist: [],
        specs: [{ label: "Torque", value: "max. 25-30 Nm" }]
    },

    {
        id: 4,
        category: "flushing",
        title: "Pipe Insert & Connection",
        description: "",
        visual: "flushing-step-1.gif",
        checklist: [],
        specs: [
            { label: "Insertion Depth", value: "Full Stop" },
            { label: "Wrench Size", value: "24mm" },
            { label: "Torque", value: "30-40 Nm" }
        ]
    },
    {
        id: 9,
        category: "flushing",
        title: "Flushing Step 2",
        description: "",
        visual: "flushing-step-2.gif",
        checklist: [],
        specs: [
            { label: "Flow Status", value: "Clear" },
            { label: "Valve Position", value: "Closed" }
        ]
    },

    {
        id: 5,
        title: "Pressure Check",
        description: "",
        visual: "pressure-test.gif",
        checklist: [],
        specs: [
            { label: "Test Pressure", value: "6 Bar (min)" },
            { label: "Duration", value: "30 Mins" },
            { label: "Medium", value: "Water/Air" }
        ]
    },
    {
        id: 6,
        title: "Setting Levels / Balancing",
        description: "",
        visual: "operation.gif",
        checklist: [],
        specs: [
            { label: "Flow Range", value: "0 - 5 L/min" },
            { label: "Accuracy", value: "+/- 10%" },
            { label: "Lock Type", value: "Ring Lock" }
        ]
    }
];

// App State Keys
const SAVED_STEP_KEY = 'current-step-index';
const THEME_KEY = 'preferred-theme';

// App State
let currentStepIndex = 0;

// DOM Elements
const navItems = document.querySelectorAll('.nav-item');
const stepTitle = document.getElementById('current-step-title');
const stepDesc = document.getElementById('current-step-desc');
const visualWrapper = document.querySelector('.video-wrapper');
const mainImage = document.getElementById('main-image');
const checklistContainer = document.getElementById('checklist-container');
const specsContainer = document.getElementById('specs-container');

// Theme Toggle Elements
const themeToggle = document.getElementById('theme-toggle');
const themeLabel = document.getElementById('theme-label');
const body = document.body;

// Initialization
function init() {
    // Restore state
    const savedIndex = Number(localStorage.getItem(SAVED_STEP_KEY));
    currentStepIndex = isNaN(savedIndex) ? 0 : savedIndex;
    // Bounds check
    if (currentStepIndex < 0 || currentStepIndex >= stepsData.length) {
        currentStepIndex = 0;
    }

    // Restore Theme
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) {
        setTheme(savedTheme);
        if (themeToggle) themeToggle.checked = savedTheme === 'dark';
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
        if (themeToggle) themeToggle.checked = true;
    }

    renderStep(currentStepIndex);
    attachEventListeners();
    addNavigationControls();
}

// Render Functions
function renderStep(index) {
    // Safety check
    if (!stepsData[index]) return;

    // Save state
    localStorage.setItem(SAVED_STEP_KEY, index);

    const step = stepsData[index];

    // 1. Update Content Header
    const translatedTitle = i18n.t(`step_${step.id}_title`, step.title);
    const translatedDesc = i18n.t(`step_${step.id}_desc`, step.description);

    const stepInfo = document.querySelector('.step-info');

    // Show only the navigation buttons for the "installation" category
    // Hide title and description globally as per previous request
    // Show only the navigation buttons for categorization
    // Hide title and description globally as per previous request
    if (stepInfo) {
        if (step.category) {
            stepInfo.classList.remove('hidden');
            if (stepTitle) stepTitle.classList.add('hidden');
            if (stepDesc) stepDesc.classList.add('hidden');
        } else {
            stepInfo.classList.add('hidden');
        }
    }

    // Simplified: All steps now use the default large visual container style
    const videoContainer = document.querySelector('.video-player-container');
    if (videoContainer) {
        // Class removed as base style is now large enough
        videoContainer.classList.remove('large-visual-mode');
    }

    // 2. Update Visual (Image only)
    if (mainImage) {
        if (step.visual) {
            mainImage.classList.remove('hidden');
            mainImage.onerror = function () {
                // Prevent infinite loop if fallback missing
                this.onerror = null;
                this.src = 'Dimensions.svg';
                this.style.objectFit = 'contain';
                console.warn(`[Media] Failed to load image: ${step.visual}, using fallback`);
            };
            mainImage.src = step.visual;
        } else {
            mainImage.classList.add('hidden');
        }
    }

    // 3. Update Checklist or Table
    const checklistHeader = document.querySelector('.tool-section:nth-of-type(1) h3');
    if (step.customTable) {
        if (checklistHeader) {
            checklistHeader.classList.remove('hidden');
            checklistHeader.innerHTML = `<span class="icon">📏</span> ${i18n.t('sidebar_dimensions', 'Dimensions Table')}`;
        }
        renderTable(step.customTable);
        // 4. Update Specs (only for Dimensions)
        renderSpecs(step.specs);
    } else {
        if (checklistHeader) {
            checklistHeader.classList.add('hidden');
        }
        // Empty containers instead of rendering items
        if (checklistContainer) checklistContainer.innerHTML = '';
        if (specsContainer) specsContainer.innerHTML = '';
    }

    // 5. Update Navigation State
    updateNavState(index);

    // 6. Update Button States
    updateButtonStates(index);
}

function updateButtonStates(index) {
    const prevBtn = document.getElementById('prev-step');
    const nextBtn = document.getElementById('next-step');
    if (!prevBtn || !nextBtn) return;

    const currentStep = stepsData[index];

    if (currentStep.category) {
        const categorySteps = stepsData.filter(s => s.category === currentStep.category);
        const firstCategoryStep = categorySteps[0];
        const lastCategoryStep = categorySteps[categorySteps.length - 1];

        // Disable Previous on first step of category
        prevBtn.disabled = (currentStep.id === firstCategoryStep.id);
        prevBtn.style.opacity = prevBtn.disabled ? "0.5" : "1";
        prevBtn.style.cursor = prevBtn.disabled ? "not-allowed" : "pointer";

        // Disable Next on last step of category
        nextBtn.disabled = (currentStep.id === lastCategoryStep.id);
        nextBtn.style.opacity = nextBtn.disabled ? "0.5" : "1";
        nextBtn.style.cursor = nextBtn.disabled ? "not-allowed" : "pointer";
    } else {
        // Default behavior for other categories if needed
        prevBtn.disabled = (index === 0);
        nextBtn.disabled = (index === stepsData.length - 1);
        prevBtn.style.opacity = prevBtn.disabled ? "0.5" : "1";
        nextBtn.style.opacity = nextBtn.disabled ? "0.5" : "1";
        prevBtn.style.cursor = prevBtn.disabled ? "not-allowed" : "pointer";
        nextBtn.style.cursor = nextBtn.disabled ? "not-allowed" : "pointer";
    }
}

function renderChecklist(items, stepId) {
    if (!checklistContainer) return;
    checklistContainer.innerHTML = '';

    items.forEach((itemText, index) => {
        const label = document.createElement('label');
        label.className = 'checkbox-item';

        const storageKey = `step-${stepId}-item-${index}`;
        const isChecked = localStorage.getItem(storageKey) === 'true';

        label.innerHTML = `
            <input type="checkbox" ${isChecked ? 'checked' : ''} data-index="${index}">
            <span class="checkmark"></span>
            <span class="text">${i18n.t(`step_${stepId}_checklist_${index}`, itemText)}</span>
        `;

        const checkbox = label.querySelector('input');
        checkbox.addEventListener('change', (e) => {
            localStorage.setItem(storageKey, e.target.checked);
        });

        checklistContainer.appendChild(label);
    });
}

function renderTable(tableData) {
    if (!checklistContainer) return;
    checklistContainer.innerHTML = `
        <div class="custom-table-wrapper">
            <table class="dimensions-table">
                <thead>
                    <tr>
                        ${tableData.headers.map(h => `<th>${h}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${tableData.rows.map(row => `
                        <tr>
                            ${row.map(cell => `<td>${cell}</td>`).join('')}
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}
function renderSpecs(items) {
    if (!specsContainer) return;
    specsContainer.innerHTML = '';

    const grid = document.createElement('div');
    grid.className = 'specs-grid';

    items.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'spec-grid-item';

        // If icon is provided, use it. Otherwise fall back to text label
        if (item.icon) {
            div.innerHTML = `
                <div class="spec-icon-wrapper">
                    <img src="${item.icon}" alt="${item.label}" class="spec-grid-icon">
                </div>
                <div class="spec-text-wrapper">
                    <span class="spec-label">${item.label}</span>
                    <span class="spec-value">${item.value}</span>
                </div>
            `;
        } else {
            div.className = 'spec-item'; // Revert to old style for simple items
            div.innerHTML = `
                <span class="label">${i18n.t(`spec_label_${item.label.toLowerCase().replace(/ /g, '_')}`, item.label)}</span>
                <span class="value">${i18n.t(`spec_value_${item.value.toLowerCase().replace(/ /g, '_')}`, item.value)}</span>
            `;
        }
        grid.appendChild(div);
    });
    specsContainer.appendChild(grid);
}

function updateNavState(index) {
    navItems.forEach(item => item.classList.remove('active'));
    // Find item that matches current step ID (more robust than index match if lists differ)
    // Find item that matches current step ID OR maps to Installation (ID 3)
    const currentStep = stepsData[index];
    let targetNavId = currentStep.id;

    // If it's a sub-step of a category, highlight the main category tab
    if (currentStep.category === "installation") {
        targetNavId = 3;
    } else if (currentStep.category === "flushing") {
        targetNavId = 4;
    }

    const matchingNavItem = Array.from(navItems).find(item => Number(item.dataset.step) === targetNavId);
    if (matchingNavItem) {
        matchingNavItem.classList.add('active');
    }
}

// New: Add Navigation Buttons dynamically
function addNavigationControls() {
    // Only add if not already present
    if (document.querySelector('.step-navigation-btns')) return;

    const stepInfo = document.querySelector('.step-info');
    if (!stepInfo) return; // Defensive check

    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'step-navigation-btns';
    controlsDiv.innerHTML = `
        <button id="prev-step" class="control-btn-nav" data-i18n="btn_prev">${i18n.t('btn_prev', '← Previous')}</button>
        <button id="next-step" class="control-btn-nav" data-i18n="btn_next">${i18n.t('btn_next', 'Next Step →')}</button>
    `;
    // Append to step-info container
    stepInfo.appendChild(controlsDiv);

    // Logic
    document.getElementById('prev-step').addEventListener('click', () => {
        const currentStep = stepsData[currentStepIndex];

        if (currentStep.category) {
            const categorySteps = stepsData.filter(s => s.category === currentStep.category);
            const firstCategoryStep = categorySteps[0];
            if (currentStep.id === firstCategoryStep.id) return;
        }

        if (currentStepIndex > 0) {
            currentStepIndex--;
            renderStep(currentStepIndex);
        }
    });

    document.getElementById('next-step').addEventListener('click', () => {
        const currentStep = stepsData[currentStepIndex];

        if (currentStep.category) {
            const categorySteps = stepsData.filter(s => s.category === currentStep.category);
            const lastCategoryStep = categorySteps[categorySteps.length - 1];
            if (currentStep.id === lastCategoryStep.id) return;
        }

        if (currentStepIndex < stepsData.length - 1) {
            currentStepIndex++;
            renderStep(currentStepIndex);
        }
    });
}



// Theme Logic
function setTheme(mode) {
    localStorage.setItem(THEME_KEY, mode);
    if (mode === 'dark') {
        body.classList.add('dark-mode');
        if (themeLabel) themeLabel.textContent = 'Dark';
    } else {
        body.classList.remove('dark-mode');
        if (themeLabel) themeLabel.textContent = 'Light';
    }
}

// Event Listeners
function attachEventListeners() {
    // Robust Navigation
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const stepId = Number(item.dataset.step);
            const index = stepsData.findIndex(s => s.id === stepId);
            if (index !== -1) {
                currentStepIndex = index;
                renderStep(index);
            }
        });

        // Keyboard navigation for nav items
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                item.click();
            }
        });
    });

    // Theme Toggle
    if (themeToggle) {
        themeToggle.addEventListener('change', (e) => {
            setTheme(e.target.checked ? 'dark' : 'light');
        });
    }
}


// Keyboard Navigation
function handleKeyboardShortcuts(e) {
    // Don't trigger if user is typing in an input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    switch (e.key) {
        case 'ArrowLeft':
            e.preventDefault();
            document.getElementById('prev-step')?.click();
            break;
        case 'ArrowRight':
            e.preventDefault();
            document.getElementById('next-step')?.click();
            break;
    }
}

// Start App
document.addEventListener("DOMContentLoaded", () => {
    init();
});

// Add keyboard shortcuts
document.addEventListener('keydown', handleKeyboardShortcuts);
