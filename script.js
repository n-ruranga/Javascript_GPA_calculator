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

/**
 * Data Persistence (localStorage)
 */
function saveToStorage() {
    try {
        const dataToSave = {
            assignments: assignments,
            assignmentIdCounter: assignmentIdCounter,
            lastUpdated: new Date().toISOString()
        };
        
        // Note: In Claude artifacts, localStorage is not available
        // This code would work in a real browser environment
        if (typeof Storage !== 'undefined') {
            localStorage.setItem('gpaCalculatorData', JSON.stringify(dataToSave));
            console.log('💾 Data saved to localStorage');
        }
    } catch (error) {
        console.warn('⚠️ Could not save to localStorage:', error.message);
    }
}

function loadFromStorage() {
    try {
        // Note: In Claude artifacts, localStorage is not available
        // This code would work in a real browser environment
        if (typeof Storage !== 'undefined') {
            const savedData = localStorage.getItem('gpaCalculatorData');
            
            if (savedData) {
                const parsedData = JSON.parse(savedData);
                assignments = parsedData.assignments || [];
                assignmentIdCounter = parsedData.assignmentIdCounter || 1;
                
                console.log('📂 Data loaded from localStorage');
                console.log(`Found ${assignments.length} saved assignments`);
            }
        }
    } catch (error) {
        console.warn('⚠️ Could not load from localStorage:', error.message);
        // Reset to default state
        assignments = [];
        assignmentIdCounter = 1;
    }
}

/**
 * Console Logging Feature (Press 'S')
 */
function logAllDataToConsole() {
    console.clear();
    console.log('📊 === GPA CALCULATOR DATA DUMP ===');
    console.log('🎓 Current GPA:', calculateGPA());
    console.log('📝 Total Assignments:', assignments.length);
    console.log('');
    
    if (assignments.length > 0) {
        console.log('📋 All Assignments:');
        console.table(assignments);
        
        console.log('');
        console.log('📈 Grade Distribution:');
        const gradeDistribution = assignments.reduce((dist, assignment) => {
            const grade = Math.floor(assignment.grade);
            dist[grade] = (dist[grade] || 0) + 1;
            return dist;
        }, {});
        console.table(gradeDistribution);
        
        console.log('');
        console.log('📊 Statistics:');
        const grades = assignments.map(a => a.grade);
        console.log('• Highest Grade:', Math.max(...grades));
        console.log('• Lowest Grade:', Math.min(...grades));
        console.log('• Average (GPA):', calculateGPA());
    } else {
        console.log('No assignments found.');
    }
    
    console.log('');
    console.log('💾 Raw Data (JSON):');
    console.log(JSON.stringify({
        assignments: assignments,
        gpa: calculateGPA(),
        totalAssignments: assignments.length,
        exportDate: new Date().toISOString()
    }, null, 2));
    
    // Visual feedback
    showFeedback('Data logged to console! Check browser dev tools (F12)', 'success');
}

/**
 * Utility Functions
 */
function clearInputFields() {
    assignmentNameInput.value = '';
    assignmentGradeInput.value = '';
    assignmentNameInput.focus();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showFeedback(message, type = 'info') {
    // Create feedback element
    const feedback = document.createElement('div');
    feedback.className = `feedback feedback-${type}`;
    feedback.textContent = message;
    feedback.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Set background color based on type
    const colors = {
        success: '#28a745',
        error: '#e74c3c',
        info: '#667eea'
    };
    feedback.style.backgroundColor = colors[type] || colors.info;
    
    // Add to page
    document.body.appendChild(feedback);
    
    // Remove after 3 seconds
    setTimeout(() => {
        feedback.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.parentNode.removeChild(feedback);
            }
        }, 300);
    }, 3000);
}

/**
 * Additional Features & Enhancements
 */

// Export data functionality
function exportData() {
    const dataToExport = {
        assignments: assignments,
        gpa: calculateGPA(),
        totalAssignments: assignments.length,
        exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(dataToExport, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `gpa-data-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

// Grade letter conversion utility
function getLetterGrade(numericGrade) {
    if (numericGrade >= 4.5) return 'A';
    if (numericGrade >= 3.5) return 'B';
    if (numericGrade >= 2.5) return 'C';
    if (numericGrade >= 1.5) return 'D';
    return 'F';
}

// Development helpers
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('🔧 Development mode detected');
    
    // Add some sample data for testing
    window.addSampleData = function() {
        const sampleAssignments = [
            { name: 'Math Quiz 1', grade: 4.5 },
            { name: 'History Essay', grade: 3.8 },
            { name: 'Science Lab Report', grade: 4.2 },
            { name: 'English Presentation', grade: 4.0 }
        ];
        
        sampleAssignments.forEach(sample => {
            assignments.push({
                id: assignmentIdCounter++,
                name: sample.name,
                grade: sample.grade,
                dateAdded: new Date().toLocaleDateString()
            });
        });
        
        updateDisplay();
        saveToStorage();
        console.log('📝 Sample data added for testing');
    };
    
    console.log('💡 Tip: Run addSampleData() to add test assignments');
}

console.log('✅ GPA Calculator script loaded successfully!');