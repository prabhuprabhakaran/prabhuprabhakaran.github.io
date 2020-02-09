// import "../assests/positions1.json";
// import "../assests/skills1.json";

// var positions = require('../assests/positions.json');
// var AllSkillset = require('../assests/skills.json');

var myPositions = JSON.parse(positions);
var myPositionsHTML = '<div class="row">';
var skillsAppendHTML = "";
var filtersAppendHTML = '<ul><li id="allSkillsBtn" class="active" data-filter=".all">All</li>';

for (let i = 0; i < myPositions.length; i++) {
  myPositionsHTML +=
    '<div class="col-lg-6">' +
    '<div class="single-job">' +
    '<div class="top-sec d-flex justify-content-between">' +
    '<div class="top-left">' +
    "<h4>" +
    myPositions[i].postion +
    "</h4>" +
    "<p>" +
    myPositions[i].company +
    "</p>" +
    "</div>" +
    '<div class="top-right">' +
    '<a href="#" class="primary-btn" data-text="' +
    myPositions[i].startDate +
    " to " +
    myPositions[i].endDate +
    '">';

  var chars = myPositions[i].startDate.split("");
  for (let j = 0; j < chars.length; j++) {
    myPositionsHTML += "<span>" + chars[j] + "</span>";
  }
  myPositionsHTML += "<span>&nbsp;t</span>" + "<span>o&nbsp;</span>";

  chars = myPositions[i].endDate.split("");
  for (let j = 0; j < chars.length; j++) {
    myPositionsHTML += "<span>" + chars[j] + "</span>";
  }
  myPositionsHTML += "</a>" + "</div>" + "</div>" + '<div class="bottom-sec">' + myPositions[i].description + "</div>" + "</div>" + "</div>";
}
myPositionsHTML += "</div>";

var AllSkillset = JSON.parse(skillset);

for (let i = 0; i < AllSkillset.skills.length; i++) {
  for (let j = 0; j < AllSkillset.skills[i].name.length; j++) {
    skillsAppendHTML += '<div class="single-work col-lg-3 col-md-6 col-sm-12 ';
    for (let k = 0; k < AllSkillset.skills[i].tags.length; k++) {
      skillsAppendHTML += AllSkillset.skills[i].tags[k] + " ";
    }
    skillsAppendHTML += '">' + '<div class="relative">' + '<div class="thumb">' + "<h4>" + AllSkillset.skills[i].name[j] + "</h4>" + "</div>" + "</div>" + "</div>";
  }
}

for (let i = 0; i < AllSkillset.alltags.length; i++) {
  filtersAppendHTML += '<li data-filter=".' + AllSkillset.alltags[i].name + '">' + AllSkillset.alltags[i].description + "</li>";
}
filtersAppendHTML += "</ul>";


