# JavaScript GPA Calculator

A simple web-based GPA calculator built with JavaScript, HTML, and CSS. This project allows users to track assignments, calculate GPA in real-time, and manage their academic data with a clean, responsive interface.

## Features

### Core Functionality
- **Assignment Management**: Add assignments with a grade (out of 5), view and remove assignments
- **GPA Calculation**: Automatically updates GPA as you add/remove assignments using reduce() method
- **Data Validation**: Prevents invalid input with user feedback
- **Responsive UI**: Works on all screen sizes

### Advanced Features
- **Keyboard Shortcuts**: 'S' key for console logging
- **Data Persistence**: localStorage for session continuity
- **Visual Feedback**: Animations and color-coded notifications
- **Input Validation**: Prevents invalid data entry with user-friendly feedback

### Developer Features
- **Console Logging**: Detailed data analysis including grade distribution
- **Sample Data Generator**: Development helper for testing
- **Error Handling**: Graceful fallbacks for localStorage issues
- **Export Functionality**: JSON data export capability


## Technologies Used

- **HTML5**
- **CSS3**
- **Vanilla JavaScript**: Core logic, DOM manipulation, and data management
- **LocalStorage API**: Client-side data persistence

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code recommended)
- Git for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/n-ruranga/gpa-calculator.git
   cd gpa-calculator
   ```

2. **Open the project**
   - On Windows: 
   ```bash  
   start `index.html` 
   ```
   - On macOS:
   ```bash
   open `index.html` 
   ```

3. **Start using the calculator**
   - Enter assignment names and grades
   - Watch your GPA update in real-time
   - Press 'S' to view detailed data in console

## Project Structure

```
gpa-calculator/
├── index.html          # Main HTML structure
├── styles.css          # Styling and responsive design
├── script.js           # Core JavaScript functionality
├── README.md           # Project documentation
```

## How to Use

1. **Adding Assignments**
   - Enter an assignment name in the first input field
   - Enter a grade between 0-5 in the second field
   - Click "Add Assignment" or press Enter

2. **Viewing Your GPA**
   - Your current GPA displays prominently in the center
   - Total assignment count is shown below the GPA

3. **Managing Assignments**
   - All assignments appear in the list below
   - Click "Remove" to delete any assignment
   - Data is automatically saved locally

4. **Console Logging**
   - Press the 'S' key anywhere on the page
   - Check browser console (F12) for detailed data analysis
   - Includes grade distribution, statistics, and raw JSON data

## Technical Implementation

### GPA Calculation
```javascript
function calculateGPA() {
    if (assignments.length === 0) return 0;
    
    const totalPoints = assignments.reduce((sum, assignment) => {
        return sum + parseFloat(assignment.grade);
    }, 0);
    
    return (totalPoints / assignments.length).toFixed(2);
}
```

### Data Structure
```javascript
const assignment = {
    id: 1,
    name: "Math Quiz 1",
    grade: 4.5,
    dateAdded: "12/8/2024"
};
```

### Local Storage Implementation
```javascript
function saveToStorage() {
    const dataToSave = {
        assignments: assignments,
        assignmentIdCounter: assignmentIdCounter,
        lastUpdated: new Date().toISOString()
    };
    localStorage.setItem('gpaCalculatorData', JSON.stringify(dataToSave));
}
```


## 📊 Grade Scale

| Numeric Grade | Letter Grade | Description |
|---------------|--------------|-------------|
| 4.5 - 5.0     | A            | Excellent   |
| 3.5 - 4.4     | B            | Good        |
| 2.5 - 3.4     | C            | Satisfactory|
| 1.5 - 2.4     | D            | Poor        |
| 0.0 - 1.4     | F            | Fail        |

## Team Members & Contributions

### Team Names of Group 6
- **NSHUTI Jabes Ruranga**
- **Colombe Marie Nyituriki Igihozo**
- **Kethia Ngabire Kayigire**
- **Steven Kayitare**
- **Brad Arnaud Shema Ruganintwali**


---

**Created by Group 6** 
