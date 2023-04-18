
function CreateEmployee(employeeDetail) {

  var firstName = employeeDetail.firstName.value;
  var lastName = employeeDetail.lastName.value;
  var email = employeeDetail.email.value;
  var jobTitle = employeeDetail.jobTitle.value;
  var office = employeeDetail.office.value;
  var department = employeeDetail.department.value;
  var phoneNumber = employeeDetail.phoneNumber.value;
  var skypeId = employeeDetail.skypeId.value;
  var newEmployee = new Employee(firstName, lastName, email, jobTitle, office, department, phoneNumber, skypeId);
  return newEmployee;

}

function GetEmployee() {
  var employeeList = JSON.parse(localStorage.getItem('employee'));
  if (employeeList == null) {
    return new Array();
  }
  return employeeList;

}

function GetEmployeesId() {
  var ListOfemployeesId = JSON.parse(localStorage.getItem('ID'));
  if (ListOfemployeesId == null) {
    return new Array();
  }
  return ListOfemployeesId;
}

var employeeList = GetEmployee();
var employeeClickedClassName = "";
editFormFlag=false;
addFormFlag = false;

class Employee {
  constructor(firstName, lastName, email, jobTitle, office, department, phoneNumber, skypeId) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.jobTitle = jobTitle;
    this.office = office;
    this.department = department;
    this.phoneNumber = phoneNumber;
    this.skypeId = skypeId;
  }
}

function addEmployee() {
  editFormFlag = false;
  var employeeDetail = document.getElementById("employeeDetail");
  var newEmployee = CreateEmployee(employeeDetail);
  employeeDetail.reset();
  var ListOfemployeesId = GetEmployeesId();
  employeeList.push(newEmployee);

  var count = ListOfemployeesId.length;
  ListOfemployeesId.push(count + 1);

  localStorage.setItem('employee', JSON.stringify(employeeList));
  displayEmployees(employeeList);
  UpdateSidebarFilter();

}

function validateForm() {

  var firstName = document.getElementById("firstName").value;
  var lastName = document.getElementById("lastName").value;
  var email = document.getElementById("email").value;
  var jobTitle = document.getElementById("jobTitle").value;
  var office = document.getElementById("office").value;
  var department = document.getElementById("department").value;
  var phoneNumber = document.getElementById("phoneNumber").value;
  var skypeId = document.getElementById("skypeId").value;

  if (firstName === "") {
    alert("Please enter First Name");
    return false;
  }

  if (lastName === "") {
    alert("Please enter Last Name");
    return false;
  }

  if (email === "") {
    alert("Please enter Email");
    return false;
  } else {
    
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailRegex)) {
      alert("Please enter a valid Email");
      return false;
    }
  }

 
  if (jobTitle === "") {
    alert("Please select Job Title");
    return false;
  }

  if (office === "") {
    alert("Please select Office");
    return false;
  }

  if (department === "") {
    alert("Please select Department");
    return false;
  }

  if (phoneNumber === "") {
    alert("Please enter Phone Number");
    return false;
  }


  if (skypeId === "") {
    alert("Please enter Skype ID");
    return false;
  }

  alert("Form is valid!");
  return true;
}


function AddAndEditEmployee(){
  if(editFormFlag === true){
    submitEdit();
  }
  else {
    addEmployee();
  }
}

function displayEmployees(employeeList) {
  var employeeCardContainer = document.getElementById('employeeCard');
  var employeesId = GetEmployeesId();
  var count = 0;
  employeeCardContainer.innerHTML = "";

  employeeList.forEach((employee,index) => {
    var employeeCard = document.createElement('div');

    employeeCard.classList.add('col-lg-3', 'col-md-4', 'col-sm-6', 'p-1');
    employeeCard.setAttribute('id', `employeeCard-${employeesId[count]}`);
    employeeCard.innerHTML = `
    <div class="employee-details-card d-flex p-2">
    <div class="col-3 d-flex">
      <img src="/EmployeeImg.png" alt="" />
    </div>
    <div class="employee-info col-9" id = "employeeCard - ${index}">
      <p class="name" id="employeeCardName-${index}">${employee.firstName} ${employee.lastName}</p>
      <p id="employeeCardTitle-${employee.id}">${employee.jobTitle}
      <p id="employeeCardDepartment-${employee.id}">${employee.department} Department </p>
      <span class="d-flex align-items-center">
        <i class="bi bi-telephone-fill"></i>
        <i class="bi bi-envelope-fill"></i>
        <i class="bi bi-chat-fill"></i>
        <i class="bi bi-star-fill"></i>
        <i class="bi bi-heart-fill"></i>
      </span>
    </div>
  </div>  
    `;

    employeeCard.addEventListener('click', (e) => {
      showEmployeeForm(employee);
      editFormFlag = true;
      employeeClickedClassName = e.target.parentElement.id;
    });

    employeeCardContainer.appendChild(employeeCard);
    count++;
  });
}
displayEmployees(employeeList);

function showEmployeeForm(employeeDetail) {

  addFormFlag = false;
  //var employee = getEmployeeById(employeeId);  
  //var employeeForm = document.createElement('div');
   var EditButton = document.getElementById("exampleModalLabel");
   EditButton.innerHTML = "Edit Employee Details";
  // employeeForm.innerHTML = `
  //   <label for="firstName">First Name</label>
  //   <input type="text" id="editFormfirstName" name="firstName" value="${employeeDetail.firstName}">

  //   <label for="lastName">Last Name</label>
  //   <input type="text" id="editFormlastName" name="lastName" value="${employeeDetail.lastName}">

  //   <label for="jobTitle">Job Title</label>
  //   <input type="text" id="editFormjobTitle" name="jobTitle" value="${employeeDetail.jobTitle}">

  //   <label for="department">Department</label>
  //   <input type="text" id="editFormdepartment" name="department" value="${employeeDetail.department}">

  //   <button type="button" onclick="cancelEdit()">Cancel</button>
  //    <button type="button" onclick="submitEdit()">Submit</button>
  //`;
  editFormFlag= true;
  document.getElementById("firstName").value = employeeDetail.firstName;
  document.getElementById("lastName").value = employeeDetail.lastName;
  document.getElementById("email").value = employeeDetail.email;
  document.getElementById("phoneNumber").value = employeeDetail.phoneNumber;
  document.getElementById("skypeId").value = employeeDetail.skypeId;
  document.getElementById("department").value = employeeDetail.department;
  
  document.getElementById("add-btn").click();
}

function getEmployeeById(employeeId) {
  var employee = employeesList[employeeId];
  return employee;
}


function cancelEdit() {
  editFormFlag = false;
  addFormFlag = false;
}

function submitEdit() {

  var firstName = document.getElementById('firstName').value;
  var lastName = document.getElementById('lastName').value;
  var email = document.getElementById('email').value;
  var department = document.getElementById('department').value;
  var office = document.getElementById('office').value;
  var jobTitle = document.getElementById('jobTitle').value;
  var phoneNumber = document.getElementById('phoneNumber').value;
  var skypeId = document.getElementById('skypeId').value;

  var employeeList = GetEmployee();
  const employeeId = parseInt(employeeClickedClassName.split("-")[1]);

  employeeList[employeeId].firstName = firstName;
  employeeList[employeeId].lastName = lastName;
  employeeList[employeeId].jobTitle = jobTitle;
  employeeList[employeeId].email = email;
  employeeList[employeeId].department = department;
  employeeList[employeeId].office = office;
  employeeList[employeeId].phoneNumber = phoneNumber;
  employeeList[employeeId].skypeId = skypeId;

  
  localStorage.setItem('employee', JSON.stringify(employeeList));
  clearFilter();

  // var employeeCard = document.getElementById(`employeeCard-${employeeId}`);
  // employeeCard.querySelector(`#employeeCardName-${employeeId}`).textContent = `${firstName} ${lastName}`;
  // employeeCard.querySelector(`#employeeCardTitle-${employeeId}`).textContent = jobTitle;
  // employeeCard.querySelector(`#employeeCardDepartment-${employeeId}`).textContent = `${department} Department`;

  var popup = document.querySelector('.popup');
  document.body.removeChild(popup);
}


var textval = document.getElementById("searchInput");
textval.addEventListener("keyup", function (e) {
  if (e.code === "Enter") {
    searchWithFilter();
  }
});

function clearFilter() {
  employeesList = GetEmployee();
  employeeList = employeesList
  displayEmployees(employeeList);
  
}

    // implement pagianation 
    // var paginationDiv = document.getElementById('filterInput');
    // for (let charCode = 65; charCode <= 90; charCode++) {
    //   var char = String.fromCharCode(charCode);
    //   var button = document.createElement('button');
    //   button.classList.add('pagination-div');
    //   button.innerText = char;
    //   button.addEventListener('click', function () {
    //     filterEmployees(char);
    //   });
    //   paginationDiv.appendChild(button);
    // }
    
    // filter by search
  function searchWithFilter() {
    let filteredEmployees = [];
  
    var filterSelect = document.getElementById("filterSelect");
    var searchTerm = document.getElementById("searchInput").value.toLowerCase();
    var employeesList = employeeList;
  
    if (searchTerm !== "") {
      var searchCriteria = filterSelect.value;
      filteredEmployees = employeeList.filter((employee) =>
        employee[searchCriteria].toLowerCase().includes(searchTerm));
  
    }
    employeeList = filteredEmployees;
  
    displayEmployees(filteredEmployees);
  
  }
  // filter employee by pagination char 
  
  function filterEmployees(firstLetter) {
    var filteredEmployees = employeeList.filter((employee) => {
      return employee.firstName.charAt(0).toUpperCase() === firstLetter;
    });
    employeeList = filteredEmployees;
    displayEmployees(employeeList);
  }


  // implement pagination with all letters
  var paginationDiv = document.getElementById('filterInput');
  var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  letters.forEach(function (char) {
    var button = document.createElement('button');
    button.classList.add('pagination-div');
    button.innerText = char;
    button.addEventListener('click', function () {
      filterEmployees(char);
    });
    paginationDiv.appendChild(button);
  });


  // sideBarFilter Implementation....
  var sideBarDepartmentContainer = document.getElementById('sideBarDepartment');
  var sideBarOfficeContainer = document.getElementById('sideBarOffice');
  var sideBarJobTitleContainer = document.getElementById('sideBarJobTitle');
  var employeesList = employeeList;
  UpdateSidebarFilter();


  // update Sidebar 
  function UpdateSidebarFilter() {
    var departments = {
      'IT': 0,
      'Human Resources': 0,
      'MD': 0,
      'Sales': 0
    };

    var offices = {
      'Seattle': 0,
      'India': 0
    };

    var jobTitles = {
      'Sharepoint Practice Head': 0,
      '.Net Development Lead': 0,
      'Recruiting Expert': 0,
      'BI Developer': 0,
      'Business Analyst': 0
    };

    employeeList.forEach((employee) => {
      departments[employee.department] += 1;
      offices[employee.office] += 1;
      jobTitles[employee.jobTitle] += 1;
    });

    var departmentHTML = `
    <li class="filter-title" id="sideBarDepartment">Departments</li>
  `;

    for (var dept in departments) {
      departmentHTML += `
      <li><a href="#" onclick="SidebarFilter('${dept}', 'department')">${dept}( <span>${departments[dept]}</span> )</a></li>
    `;
    }

    sideBarDepartmentContainer.innerHTML = departmentHTML;


    var officeHTML = `
    <li class="filter-title" id="sideBarOffice">Offices</li>
  `;

    for (var off in offices) {
      officeHTML += `
      <li><a href="#" onclick="SidebarFilter('${off}', 'office')">${off}( <span>${offices[off]}</span> )</a></li>
    `;
    }

    sideBarOfficeContainer.innerHTML = officeHTML;

    var jobTitleHTML = `
    <li class="filter-title" id="sideBarJobTitle">Job title</li>
  `;

    for (var title in jobTitles) {
      jobTitleHTML += `
      <li><a href="#" onclick="SidebarFilter('${title}', 'jobTitle')">${title}( <span>${jobTitles[title]}</span> )</a></li>
    `;
    }

    jobTitleHTML += `
    <li><a href="#" style="color: dodgerblue;" onclick="viewElement()" id="view-btn-block">view more</a></li>
  `;

    sideBarJobTitleContainer.innerHTML = jobTitleHTML;
  }


  // filter sidebar
  function SidebarFilter(filterValue, filterBy) {
    var filteredEmployees = [];

    switch (filterBy) {
      case 'department':
        filteredEmployees = employeeList.filter(employee => employee.department === filterValue);
        break;

      case 'office':
        filteredEmployees = employeeList.filter(employee => employee.office === filterValue);
        break;

      case 'jobTitle':
        filteredEmployees = employeeList.filter(employee => employee.jobTitle === filterValue);
        break;
    }
    //employeeList = filteredEmployees;
    displayEmployees(filteredEmployees);
  }

  document.getElementById("add-btn").addEventListener('click', function(){
    editFormFlag = false;
  })


