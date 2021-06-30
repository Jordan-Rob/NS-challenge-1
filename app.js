const courseTable = document.getElementById('course-table');
const baseLink = 'https://www.smart-investment.club/ercapi';
//Get token from local storage
const token = localStorage.getItem('accessToken');
let myHeaders = new Headers();

myHeaders.append('Application-Key', 'YOUR-APP-KEY'); //replace YOUR-APP-KEY with the real key
myHeaders.append('Authorization', 'Bearer ' + token);
myHeaders.append('Content-Type', 'application/json');

let requestOptions = {
  headers: myHeaders,
};

//Add table headers
courseTable.innerHTML = `<tr>
            <th>Id</th>
            <th>Name</th>
            <th>#participants</th>
        </tr>`;

//Get a list of courses
const getCourses = async () => {

  requestOptions.method = 'GET';
  const response = await fetch(baseLink + '/api/courses', requestOptions);
  if (response.status === 200) {
    const data = await response.json();
    const courses = data.content;
    
    //Add courses to the table
    courses.forEach((course) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${course.id}</td> 
                     <td>${course.name}</td>
                     <td>${course.numParticipants}</td>`;
      courseTable.appendChild(tr);
    });
  } else {
    const div = document.createElement('div');
    const message = `Something went wrong with your request (${response.status})`;
    div.innerHTML = message;
    document.body.appendChild(div);
  }
};