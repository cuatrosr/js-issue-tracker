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
  getIssues().map(({ id, description, severity, assignedTo, status }) => {

    //Renders
    var idRender = document.createElement("h4")
    var descriptionRender = document.createElement("div")
    var severityRender = document.createElement("p")
    var assignedToRender = document.createElement("p")
    var statusRender = document.createElement("span")

    //Styles
    descriptionRender.className += "alert alert-warning"
    statusRender.className += "mb-3 mt-2 text-uppercase fs-6 badge rounded-pill bg-" + badgeType(status)
    severityRender.className += "ms-3 fw-lighter"
    assignedToRender.className += "ms-3 fw-lighter"

    //Adding Info
    idRender.innerHTML = id
    descriptionRender.innerHTML = "Description: " + description
    severityRender.innerHTML = "Severty: " + severity
    assignedToRender.innerHTML = "Assigned to: " + assignedTo
    statusRender.innerHTML = status

    //Pushing to template
    var card = document.createElement("div")
    card.className += "shadow-lg p-3 mb-5 bg-body rounded"
    card.append(idRender, statusRender, assignedToRender, severityRender, descriptionRender)
    container.appendChild(card)
  })
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
