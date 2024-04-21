let semesters = [];

function generateSemesterTables()
{
    const semesterCount = parseInt(document.getElementById('semesterCount').value);
    if (isNaN(semesterCount) || semesterCount <= 0) 
    {
        alert('Please enter a valid number of semesters.');
        return;
    }

    let semesterTablesHTML = '';
    for(let i=1; i<=semesterCount; i++)
    {
        semesterTablesHTML += ` <h3>Semester ${i}</h3>
                                <table id="semester${i}">
                                <thead> 
                                    <tr> 
                                        <th>Subject</th> 
                                        <th>Grade</th> 
                                        <th>Credit</th> 
                                    </tr> 
                                </thead> 
                                <tbody id="semester${i}-subjects"></tbody>
                                </table>
        <button onclick="addSubject(${i})" >Add Subject</button>
        <button onclick="calculateGPA(${i})">Calculate GPA</button>
        <h3 id="d"> GPA: <span id="gpa-${i}">0.00</span></h3>
        <hr>`;   
    }

    document.getElementById('semesterTables').innerHTML = semesterTablesHTML;
    document.getElementById('calculateCGPAButton').style.display = 'block'; 
    document.getElementById('cgpa').textContent = '0.00';
}

function addSubject(semesterIndex)
{
    const semesterTable = document.getElementById(`semester${semesterIndex}`);
    const subjectsBody = semesterTable.querySelector(`#semester${semesterIndex}-subjects`);
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
         <td contenteditable="true" class="placeholder" placeholder="Enter Subject Name" id="f" ></td>
         <td contenteditable="true" class="placeholder" placeholder="Enter the Grade " id="f" ></td>
         <td contenteditable="true" class="placeholder" placeholder="Enter the Credit" id="f" ></td>
    `;
    subjectsBody.appendChild(newRow);
}

function calculateGPA(semesterIndex)
{
    const subjects = document.querySelectorAll(`#semester${semesterIndex}-subjects tr`);
    let totalCredits = 0;
    let weightedSum = 0;
    subjects.forEach(subject => 
        {
            const grade = subject.querySelector('td:nth-child(2)').textContent;
            const credit = parseInt(subject.querySelector('td:nth-child(3)').textContent);
            const gpa = getGPA(grade);
            totalCredits += credit;
            weightedSum += gpa * credit;
        });

        const gpa = totalCredits === 0 ? 0 : (weightedSum / totalCredits).toFixed(2);
        document.getElementById(`gpa-${semesterIndex}`).textContent = gpa;
}


function calculateCGPA()
{
    const totalSemesters = parseInt(document.getElementById('semesterCount').value);
    let totalGPA = 0;
    for (let i = 1; i <= totalSemesters; i++) {
        const gpa = parseFloat(document.getElementById(`gpa-${i}`).textContent);
        totalGPA += gpa;
    }
    const cgpa = totalSemesters === 0 ? 0 : (totalGPA / totalSemesters).toFixed(2);
    document.getElementById('cgpa').textContent = cgpa;
}


function getGPA(grade)
{
    switch (grade) { 
        case 'O': return 10.0; 
        case 'A+': return 9.0; 
        case 'A': return 8.0; 
        case 'B+': return 7.0; 
        case 'B': return 6.0; 
        case 'C': return 5.0;
        case 'RA': return 0.0; 
        default: return 0.0; 
    } 
}


function handleMouseOver() 
{
    const messageElement = document.getElementById('t');
    messageElement.textContent = 'ENTER THE TOTAL NUMBER OF SEMESTER :';
}

function handleMouseOut() 
{
    const messageElement = document.getElementById('t');
    messageElement.textContent = ' NUMBER OF SEMESTER :';
}


function handleFocus(element)
{
    element.style.backgroundColor = 'lightblue';
}

function handleBlur(element)
{
   
    element.style.backgroundColor = '';
}