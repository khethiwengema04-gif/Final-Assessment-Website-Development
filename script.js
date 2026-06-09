// Get HTML elements
const scoreEl = document.getElementById('score');
const gradeEl = document.getElementById('grade');
const descEl = document.getElementById('description');
const summaryList = document.getElementById('summary-list');

// Load data from data.json dynamically
fetch('./data.json')
  .then(response => response.json())
  .then(data => {
    // Calculate average score for the circle
    const avgScore = Math.round(data.reduce((sum, item) => sum + item.score, 0) / data.length);
    scoreEl.textContent = avgScore;
    
    // Set grade + description based on score
    let grade = 'Great';
    let desc = 'You scored higher than 65% of the people who have taken these tests.';
    
    if (avgScore >= 80) {
      grade = 'Excellent';
      desc = 'You scored higher than 80% of the people who have taken these tests.';
    } else if (avgScore < 60) {
      grade = 'Good';
      desc = 'You scored higher than 40% of the people who have taken these tests.';
    }
    
    gradeEl.textContent = grade;
    descEl.textContent = desc;

    // Loop through data.json and build summary items
    summaryList.innerHTML = '';
    data.forEach(item => {
      const category = item.category.toLowerCase();
      const div = document.createElement('div');
      div.className = `summary-item ${category}`;
      div.innerHTML = `
        <div>
          <img src="./assets/images/icon-${category}.svg" alt="${item.category} icon">
          <span>${item.category}</span>
        </div>
        <p>${item.score} <span>/ 100</span></p>
      `;
      summaryList.appendChild(div);
    });
  })
  .catch(error => {
    console.error('Error loading data.json:', error);
    scoreEl.textContent = '00';
    gradeEl.textContent = 'Error';
  });