# 📚 JavaScript GPA Calculator

A dynamic, interactive GPA calculator built with pure JavaScript, HTML, and CSS. This project allows users to track assignments, calculate GPA in real-time, and manage their academic data with a clean, responsive interface.

## 🎯 Features

- ✅ **Add Assignments**: Input assignment names and grades (0-5 scale)
- 📊 **Real-time GPA Calculation**: Automatic GPA updates as you add/remove assignments  
- 📋 **Assignment Management**: View, track, and remove assignments dynamically
- ⌨️ **Keyboard Shortcuts**: Press 'S' to log all data to browser console
- 💾 **Data Persistence**: Automatic local storage to save data between sessions
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- 🎨 **Modern UI**: Clean, gradient-based design with smooth animations
- ✨ **Input Validation**: Prevents invalid data entry with user-friendly feedback

## 🛠️ Technologies Used

- **HTML5**: Semantic structure and accessibility
- **CSS3**: Modern styling with gradients, animations, and responsive design
- **Vanilla JavaScript**: Core logic, DOM manipulation, and data management
- **LocalStorage API**: Client-side data persistence
- **GitHub Pages**: Hosting and deployment

## 🚀 Getting Started

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
   - Open `index.html` in your web browser

3. **Start using the calculator**
   - Enter assignment names and grades
   - Watch your GPA update in real-time
   - Press 'S' to view detailed data in console

## 📁 Project Structure

```
gpa-calculator/
├── index.html          # Main HTML structure
├── styles.css          # Styling and responsive design
├── script.js           # Core JavaScript functionality
├── README.md           # Project documentation
```

## 🎮 How to Use

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

## 👥 Team Members & Contributions

### Team JavaScript
- **[Team Lead]** - Repository setup, project coordination, GitHub management
- **[HTML/CSS Specialist]** - Created `index.html` structure and `styles.css` design
- **[Core Logic Developer]** - Implemented GPA calculation and data management in `script.js`
- **[DOM/Events Specialist]** - Handled user interactions, event listeners, and dynamic rendering
- **[Features Developer]** - Added localStorage, animations, validation, and bonus features

## 🎨 Design Decisions

- **Color Scheme**: Purple gradient theme for modern, professional appearance
- **Typography**: Segoe UI font family for readability across all platforms
- **Layout**: Card-based design with clear visual hierarchy
- **Animations**: Subtle transitions and feedback for enhanced user experience
- **Responsive**: Mobile-first approach with breakpoints at 768px and 480px

## 🔧 Technical Implementation

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

## 🌟 Features Breakdown

### Core Functionality
- **Assignment Management**: Add, view, and remove assignments
- **GPA Calculation**: Real-time calculation using reduce() method
- **Data Validation**: Prevents invalid input with user feedback
- **Responsive UI**: Works on all screen sizes

### Advanced Features
- **Keyboard Shortcuts**: 'S' key for console logging
- **Data Persistence**: localStorage for session continuity
- **Visual Feedback**: Animations and color-coded notifications
- **Grade Validation**: Real-time input validation with visual cues
- **Empty State Handling**: User-friendly messages when no data exists

### Developer Features
- **Console Logging**: Detailed data analysis including grade distribution
- **Sample Data Generator**: Development helper for testing
- **Error Handling**: Graceful fallbacks for localStorage issues
- **Export Functionality**: JSON data export capability

## 📊 Grade Scale

| Numeric Grade | Letter Grade | Description |
|---------------|--------------|-------------|
| 4.5 - 5.0     | A           | Excellent   |
| 3.5 - 4.4     | B           | Good        |
| 2.5 - 3.4     | C           | Satisfactory|
| 1.5 - 2.4     | D           | Poor        |
| 0.0 - 1.4     | F           | Fail        |

## 🚀 Deployment

### GitHub Pages Setup
1. Push your code to GitHub repository
2. Go to repository Settings → Pages
3. Select source branch (usually `main` or `master`)
4. Your site will be available at: `https://yourusername.github.io/gpa-calculator`

### Local Development
```bash
# Clone and run locally
git clone [repository-url]
cd gpa-calculator
open index.html  # macOS
start index.html # Windows
```

## 🔮 Future Enhancements

- [ ] **Course Management**: Group assignments by courses/subjects
- [ ] **Semester Tracking**: Calculate GPA by semester
- [ ] **Data Export**: CSV/PDF export functionality
- [ ] **Grade Trends**: Visual charts showing performance over time
- [ ] **Target GPA Calculator**: Calculate grades needed for target GPA
- [ ] **Multiple Grading Systems**: Support for different GPA scales
- [ ] **Dark Mode**: Toggle between light and dark themes
- [ ] **Assignment Categories**: Weight different types of assignments

## 🐛 Known Issues & Limitations

- localStorage is limited to ~5-10MB per domain
- No server-side data backup
- Grade scale fixed to 0-5 (could be made configurable)
- No user authentication or multi-user support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- Group 6 for collaborative development
- Modern web standards for clean, accessible code
- GitHub Pages for free hosting
- The web development community for inspiration and best practices

## 📞 Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check the browser console for error messages
- Ensure JavaScript is enabled in your browser
- Try clearing localStorage if data seems corrupted

---

**Built with ❤️ by Group 6** 

*Last updated: December 2024*