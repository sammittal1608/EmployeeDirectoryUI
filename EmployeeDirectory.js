let searchTerm = "";
let searchCriteria = "", firstLetter = "", filterByDepart = "", filterByOff = "", filterByJob = "";

filteredEmployees = [];
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
var employeeList = filteredEmployees = GetEmployee();

function GetEmployeesId() {
  var ListOfemployeesId = JSON.parse(localStorage.getItem('ID'));
  if (ListOfemployeesId == null) {
    return new Array();
  }
  return ListOfemployeesId;
}

var employeeList = GetEmployee();
var employeeClickedClassName = "";
editFormFlag = false;
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
  if (validateForm()) {
    var employeeDetail = document.getElementById("employeeDetail");
    var newEmployee = CreateEmployee(employeeDetail);
    employeeDetail.reset();
    employeeList.push(newEmployee);
    filteredEmployees = employeeList;

    localStorage.setItem('employee', JSON.stringify(employeeList));
    var myModalEl = document.getElementById('exampleModal');
    var modal = bootstrap.Modal.getInstance(myModalEl);
    modal.hide();

  }

  displayEmployees(employeeList);
  UpdateSidebarFilter();

}


function validateEmail(email) {
  var emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(email);
}


function validatePhoneNumber(phoneNumber) {
  var phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phoneNumber);
}

function validateForm() {

  var firstName = document.getElementById("firstName").value;
  var lastName = document.getElementById("lastName").value;
  var email = document.getElementById("email").value;
  var jobTitle = document.getElementById("jobTitle").value;
  var office = document.getElementById("office").value;
  var department = document.getElementById("department").value;
  var phoneNumber = document.getElementById("phoneNumber").value;

  document.getElementById("firstNameError").style.display = "none";
  document.getElementById("lastNameError").style.display = "none";
  document.getElementById("emailError").style.display = "none";
  document.getElementById("jobTitleError").style.display = "none";
  document.getElementById("officeError").style.display = "none";
  document.getElementById("departmentError").style.display = "none";
  document.getElementById("phoneNumberError").style.display = "none";


  if (firstName === "") {
    document.getElementById("firstNameError").style.display = "block";
    return false;
  }


  if (lastName === "") {
    document.getElementById("lastNameError").style.display = "block";
    return false;
  }


  if (!validateEmail(email)) {
    document.getElementById("emailError").style.display = "block";
    return false;
  }

  if (jobTitle === "") {
    document.getElementById("jobTitleError").style.display = "block";
    return false;
  }

  if (office === "") {
    document.getElementById("officeError").style.display = "block";
    return false;
  }


  if (department === "") {
    document.getElementById("departmentError").style.display = "block";
    return false;
  }


  if (!validatePhoneNumber(phoneNumber)) {
    document.getElementById("phoneNumberError").style.display = "block";
    return false;
  }

  return true;
}


function AddAndEditEmployee() {
  if (editFormFlag === true) {
    addFormFlag = true;
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

  employeeList.forEach((employee, index) => {
    var employeeCard = document.createElement('div');

    employeeCard.classList.add('col-lg-3', 'col-md-4', 'col-sm-6', 'p-1');
    employeeCard.setAttribute('id', `employeeCard-${employeesId[count]}`);
    employeeCard.innerHTML = `
    <div class="employee-details-card d-flex p-2">
    <div class="col-3 d-flex">
      <img src="/EmployeeImg.jpg" alt="" />
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
  editFormFlag = true;
  document.getElementById("firstName").value = employeeDetail.firstName;
  document.getElementById("lastName").value = employeeDetail.lastName;
  document.getElementById("email").value = employeeDetail.email;
  document.getElementById("phoneNumber").value = employeeDetail.phoneNumber;
  document.getElementById("skypeId").value = employeeDetail.skypeId;
  document.getElementById("department").value = employeeDetail.department;
  document.getElementById("jobTitle").value = employeeDetail.jobTitle;
  document.getElementById("office").value = employeeDetail.office;

  document.getElementById("add-btn").click();
}

function getEmployeeById(employeeId) {
  var employee = employeesList[employeeId];
  return employee;
}


function cancelEdit() {
  editFormFlag = false;
  addFormFlag = true;
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

  var myModalEl = document.getElementById('exampleModal');
  var modal = bootstrap.Modal.getInstance(myModalEl);
  modal.hide();

  //clearFilter();
  SearchFilter();
  displayEmployees(employeeList);

  // var employeeCard = document.getElementById(`employeeCard-${employeeId}`);
  // employeeCard.querySelector(`#employeeCardName-${employeeId}`).textContent = `${firstName} ${lastName}`;
  // employeeCard.querySelector(`#employeeCardTitle-${employeeId}`).textContent = jobTitle;
  // employeeCard.querySelector(`#employeeCardDepartment-${employeeId}`).textContent = `${department} Department`;

  // var popup = document.querySelector('.popup');
  // document.body.removeChild(popup);
}


var textval = document.getElementById("searchInput");
textval.addEventListener("keyup", function (e) {
  if (e.code === "Enter") {
    SearchFilter();
  }
});

function clearFilter() {
  document.getElementById('searchInput').value = '';
  searchTerm = "";
  SearchAndFilter();
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
// function searchWithFilter() {
//   let filteredEmployees = [];

//   var filterSelect = document.getElementById("filterSelect");
//   var searchTerm = document.getElementById("searchInput").value.toLowerCase();
//   var employeesList = employeeList;

//   if (searchTerm !== "") {
//     var searchCriteria = filterSelect.value;
//     filteredEmployees = employeeList.filter((employee) =>
//       employee[searchCriteria].toLowerCase().match(searchTerm));

//   }
//   employeeList = filteredEmployees;

//   displayEmployees(filteredEmployees);

// }
// filter employee by pagination char 

// function filterEmployees(firstLetter) {
//   var filteredEmployees = employeeList.filter((employee) => {
//     return employee.firstName.charAt(0).toUpperCase() === firstLetter;
//   });
//   employeeList = filteredEmployees;
//   displayEmployees(employeeList);
// }

// implement pagination with all letters


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
    <li><a href="#" onclick="Departmentfilter('${dept}')" data-set-dep id="depart-${dept}">${dept}( <span>${departments[dept]}</span> )</a></li>
    `;
  }
  
  sideBarDepartmentContainer.innerHTML = departmentHTML;

  
  var officeHTML = `
  <li class="filter-title" id="sideBarOffice">Offices</li>
  `;
  
  for (var off in offices) {
    officeHTML += `
    <li><a href="#" onclick="OfficeFilter('${off}')" data-set-off id="office-${off}">${off}( <span>${offices[off]}</span> )</a></li>
    `;
  }
  
  sideBarOfficeContainer.innerHTML = officeHTML;
  
  var jobTitleHTML = `
  <li class="filter-title" id="sideBarJobTitle">Job title</li>
  `;
  
  for (var title in jobTitles) {
    jobTitleHTML += `
      <li><a href="#" onclick="JobTitlefilter('${title}')" data-set-jobTitle id="jobTitle-${title}">${title}( <span>${jobTitles[title]}</span> )</a></li>
      `;
  }
  
  jobTitleHTML += `
    <li><a href="#" style="color: dodgerblue;" onclick="viewElement()" id="view-btn-block">view more</a></li>
  `;
  
  sideBarJobTitleContainer.innerHTML = jobTitleHTML;
}


// filter sidebar
// function SidebarFilter(filterValue, filterBy) {
  //   var filteredEmployees = [];
  
  //   switch (filterBy) {
    //     case 'department':
    //       filteredEmployees = employeeList.filter(employee => employee.department === filterValue);
    //       break;
    
    //     case 'office':
    //       filteredEmployees = employeeList.filter(employee => employee.office === filterValue);
    //       break;
    
    //     case 'jobTitle':
    //       filteredEmployees = employeeList.filter(employee => employee.jobTitle === filterValue);
    //       break;
    //   }
    //   employeeList = filteredEmployees;
//   displayEmployees(filteredEmployees);
// }

// Reset the form
document.getElementById("add-btn").addEventListener('click', function () {
  if (addFormFlag == true) {
    editFormFlag = false;
    document.getElementById("employeeDetail").reset();
  }
})

document.getElementById("closeBtn").addEventListener('click', function () {
  cancelEdit();
})

function clearFilterChar() {
  firstLetter = "";
  var buttons = document.getElementById('filterInput');
      buttons.classList.add('pagination-div');
  
  SearchAndFilter();
}

function removeFilterClass(filterClassName) {
  
  switch (filterClassName) {
    case "department":
      document.querySelectorAll('[data-set-dep]').forEach((list) => {
        list.style.color = "#746f6f";
        
      })
      break;
      case "office":
        document.querySelectorAll('[data-set-off]').forEach((list) => {
        list.style.color = "#746f6f"
      })
      break;
      case "jobTitle":
        document.querySelectorAll('[data-set-jobTitle]').forEach((list) => {
          list.style.color = "#746f6f"
        })
        break;
      }
      
    }
    
    
    var paginationDiv = document.getElementById('filterInput');
    var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    letters.forEach(function (char) {
      var button = document.createElement('button');
      button.classList.add('pagination-div');
      button.innerText = char;
      button.addEventListener('click', function (event) {
           event.target.style.background="black";
          AlphabetSearch(char);
        
        });
        // button.addEventListener('click', (event) =>  AlphabetSearch(event, char));
         paginationDiv.appendChild(button);
      });
      

      function AlphabetSearch( selectedAlphabet) {
        //update the alphabet search

      // let previousSelectedAlphabet = document.getElementById("selected-alphabet");
      if(selectedAlphabet ===firstLetter){
        selectedAlphabet.id = '';
      }
      // event.target.id = "#selected-alphabet";
      firstLetter = selectedAlphabet;
      SearchAndFilter();
    }


function SearchFilter() {
  //update search text
  searchCriteria = document.getElementById("filterSelect");
  searchTerm = document.getElementById("searchInput").value.toLowerCase();

  SearchAndFilter();
}

function Departmentfilter(departmentValue) {
  var filterId = 'depart-' + departmentValue;
  filterElement = document.getElementById(filterId);
  if (filterByDepart === departmentValue) {
    filterByDepart = "";
    removeFilterClass('department');
  }
  else {
    filterByDepart = departmentValue;
    removeFilterClass('department');
    filterElement.style.color = 'dodgerblue';
  }
  SearchAndFilter();
}

function OfficeFilter(officeValue) {
  var filterId = 'office-' + officeValue;
  filterElement = document.getElementById(filterId);
  if (filterByOff === officeValue) {
    filterByOff = "";
    removeFilterClass('office');
  }
  else {
    filterByOff = officeValue;
    removeFilterClass('office');
    filterElement.style.color = 'dodgerblue';
  }
  SearchAndFilter();
}

function JobTitlefilter(jobTitleValue) {
  var filterId = 'jobTitle-' + jobTitleValue;
  filterElement = document.getElementById(filterId);
  if (filterByJob === jobTitleValue) {
    filterByJob = "";
    removeFilterClass('jobTitle');
  }
  else {
    filterByJob = jobTitleValue;
    removeFilterClass('jobTitle');
    filterElement.style.color = 'dodgerblue';
  }
  SearchAndFilter();
}

function SearchAndFilter() {
  filteredEmployees = employeeList;
  //getting all the variables

  //filter by char
  if (firstLetter !== "") {
    filteredEmployees = filteredEmployees.filter((employee) =>
      employee.firstName.charAt(0).toUpperCase() === firstLetter
    );
  }

  // filter by search
  if (searchTerm !== "") {
    var searchCriteria = filterSelect.value;
    filteredEmployees = filteredEmployees.filter((employee) =>
      employee[searchCriteria].toLowerCase().match(searchTerm));

  }
  if (filterByDepart !== "") {
    filteredEmployees = filteredEmployees.filter(employee => employee.department === filterByDepart);
  }

  if (filterByOff !== "") {
    filteredEmployees = filteredEmployees.filter(employee => employee.office === filterByOff);
  }
  if (filterByJob !== "") {
    filteredEmployees = filteredEmployees.filter(employee => employee.jobTitle === filterByJob);
  }

  // filter by sidebarFilter

  displayEmployees(filteredEmployees);

  //return the final list
}
