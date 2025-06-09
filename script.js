/**
 * JavaScript GPA Calculator
 * Team Project - Core Logic Implementation
 */

// Global state management
let assignments = [];
let assignmentIdCounter = 1;

// DOM element references
const assignmentNameInput = document.getElementById('assignment-name');
const assignmentGradeInput = document.getElementById('assignment-grade');
const addButton = document.getElementById('add-btn');
const gpaDisplay = document.getElementById('gpa-display');
const countDisplay = document.getElementById('count-display');
const assignmentsList = document.getElementById('assignments-list');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadFromStorage();
    setupEventListeners();
    updateDisplay();
    console.log('🎓 GPA Calculator initialized successfully!');
});

/**
 * Event Listeners Setup
 */
function setupEventListeners() {
    // Add assignment button click
    addButton.addEventListener('click', handleAddAssignment);
    
    // Enter key press in input fields
    assignmentNameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleAddAssignment();
        }
    });
    
    assignmentGradeInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleAddAssignment();
        }
    });
    
    // Global keyboard shortcut for logging data (Press 'S')
    document.addEventListener('keydown', function(e) {
        if (e.key.toLowerCase() === 's' && !e.ctrlKey && !e.metaKey) {
            // Only trigger if not focused on input elements
            if (document.activeElement.tagName !== 'INPUT') {
                e.preventDefault();
                logAllDataToConsole();
            }
        }
    });
    
    // Input validation and real-time feedback
    assignmentGradeInput.addEventListener('input', validateGradeInput);
}

/**
 * Core GPA Calculation Logic
 */
function calculateGPA() {
    if (assignments.length === 0) {
        return 0;
    }
    
    const totalPoints = assignments.reduce((sum, assignment) => {
        return sum + parseFloat(assignment.grade);
    }, 0);
    
    return (totalPoints / assignments.length).toFixed(2);
}

/**
 * Add Assignment Handler
 */
function handleAddAssignment() {
    const name = assignmentNameInput.value.trim();
    const grade = parseFloat(assignmentGradeInput.value);
    
    // Validation
    if (!validateInput(name, grade)) {
        return;
    }
    
    // Create new assignment object
    const newAssignment = {
        id: assignmentIdCounter++,
        name: name,
        grade: grade,
        dateAdded: new Date().toLocaleDateString()
    };
    
    // Add to assignments array
    assignments.push(newAssignment);
    
    // Update display and save
    updateDisplay();
    saveToStorage();
    clearInputFields();
    
    // Provide user feedback
    showFeedback('Assignment added successfully!', 'success');
    
    console.log('📝 Assignment added:', newAssignment);
}

/**
 * Input Validation
 */
function validateInput(name, grade) {
    // Check if name is provided
    if (!name) {
        showFeedback('Please enter an assignment name', 'error');
        assignmentNameInput.focus();
        return false;
    }
    
    // Check if grade is valid
    if (isNaN(grade) || grade < 0 || grade > 5) {
        showFeedback('Please enter a valid grade (0-5)', 'error');
        assignmentGradeInput.focus();
        return false;
    }
    
    // Check for duplicate assignment names
    if (assignments.some(assignment => assignment.name.toLowerCase() === name.toLowerCase())) {
        showFeedback('Assignment name already exists', 'error');
        assignmentNameInput.focus();
        return false;
    }
    
    return true;
}

/**
 * Real-time Grade Input Validation
 */
function validateGradeInput() {
    const grade = parseFloat(assignmentGradeInput.value);
    const input = assignmentGradeInput;
    
    if (assignmentGradeInput.value && (isNaN(grade) || grade < 0 || grade > 5)) {
        input.style.borderColor = '#e74c3c';
        input.style.boxShadow = '0 0 0 3px rgba(231, 76, 60, 0.1)';
    } else {
        input.style.borderColor = '#ddd';
        input.style.boxShadow = 'none';
    }
}

/**
 * Display Update Functions
 */
function updateDisplay() {
    updateGPADisplay();
    updateAssignmentsList();
    updateAssignmentsCount();
}

function updateGPADisplay() {
    const gpa = calculateGPA();
    gpaDisplay.textContent = gpa;
    
    // Add animation class for visual feedback
    gpaDisplay.classList.add('gpa-updated');
    setTimeout(() => {
        gpaDisplay.classList.remove('gpa-updated');
    }, 500);
}

function updateAssignmentsList() {
    if (assignments.length === 0) {
        assignmentsList.innerHTML = `
            <div class="empty-state">
                <p>No assignments added yet. Start by adding your first assignment above!</p>
            </div>
        `;
        return;
    }
    
    const assignmentsHTML = assignments.map(assignment => `
        <div class="assignment-item" data-id="${assignment.id}">
            <div class="assignment-info">
                <h4>${escapeHtml(assignment.name)}</h4>
                <p>Added on ${assignment.dateAdded}</p>
            </div>
            <div class="grade-badge">${assignment.grade}</div>
            <div class="assignment-actions">
                <button class="btn btn-danger" onclick="removeAssignment(${assignment.id})">
                    Remove
                </button>
            </div>
        </div>
    `).join('');
    
    assignmentsList.innerHTML = assignmentsHTML;
}

function updateAssignmentsCount() {
    countDisplay.textContent = assignments.length;
}

/**
 * Assignment Management
 */
function removeAssignment(id) {
    // Find and remove assignment
    const index = assignments.findIndex(assignment => assignment.id === id);
    
    if (index !== -1) {
        const removedAssignment = assignments.splice(index, 1)[0];
        
        // Update display and save
        updateDisplay();
        saveToStorage();
        
        // Provide feedback
        showFeedback(`"${removedAssignment.name}" removed successfully`, 'success');
        
        console.log('🗑️ Assignment removed:', removedAssignment);
    }
}
