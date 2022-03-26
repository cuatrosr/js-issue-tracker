function saveIssue(e) {
  e.preventDefault();
  var issueId = chance.guid();
  var issueDesc = document.getElementById('issueDescInput').value;
  var issueSeverity = document.getElementById('issueSeverityInput').value;
  var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
  var issueStatus = 'Open';

  var issue = {
    id: issueId,
    description: issueDesc,
    severity: issueSeverity,
    assignedTo: issueAssignedTo,
    status: issueStatus
  }

  if (localStorage.getItem('issues') === null) {
    var issues = [];
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  } else {
    setIssue(issue)
  }
  fetchIssues();
  document.getElementById('issueInputForm').reset();
}

const fetch = () => {
  //clearStorage()
  if (getIssues() != null) {
    fetchIssues()
  }
}

function fetchIssues() {
  var container = document.getElementById('issuesList')
  removeAllChildNodes(container)
  var card = document.createElement("div")
  getIssues().map(({ id, description, severity, assignedTo, status})=>{
    card.innerHTML += 
    `
    <div class="shadow-lg p-3 mb-5 bg-body rounded">
    <h4>${id}</h4>
    <span class="mb-3 mt-2 text-uppercase fs-6 badge rounded-pill bg-${badgeType(status)}"></span>
    <p class="ms-3 fw-lighter">Severty:  ${severity}</p>
    <p class="ms-3 fw-lighter">Assigned to: ${assignedTo}</p>
    <div class="alert alert-warning">Description: ${description}</div>
    </div>
    `
  })
  container.appendChild(card)
}

//Aux
function getIssues() {
  return JSON.parse(localStorage.getItem('issues'))
}

function setIssue(issue) {
  var issues = getIssues();
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));
}

function clearStorage() {
  localStorage.clear()
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function badgeType(status) {
  var type = ''
  switch (status) {
    case 'Open':
      type = 'success'
      break;
    case 'Closed':
      type = 'danger'
      break;
    default:
      type = 'warning'
      break;
  }
  return type
}

document.getElementById('issueInputForm').addEventListener('submit', saveIssue);
