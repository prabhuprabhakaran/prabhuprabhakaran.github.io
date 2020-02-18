var myPositions = JSON.parse(positions);
var mySkillset = JSON.parse(skillset);
var mySocialLinks = JSON.parse(sociallinks);

var myPositionsHTML = '<div class="row">';
var skillsAppendHTML = "";
var filtersAppendHTML = '<ul><li id="allSkillsBtn" class="active" data-filter=".all">All</li>';

for (let i = 0; i < myPositions.length; i++) {
  myPositionsHTML +=
    '<div class="col-lg-6">' +
    '<div class="single-job">' +
    '<div class="top-sec row d-flex justify-content-between">' +
    '<div class="col col-sm-8 col-md-8 col-lg-8 col-xl-8">' +
    "<h5>" +
    myPositions[i].postion +
    "</h5>" +
    myPositions[i].company +
    "<br/>" +
    "<b>" +
    myPositions[i].startDate +
    " to " +
    myPositions[i].endDate +
    "</b>" +
    "</div>" +
    '<div class="col-sm-4 col-md-4 col-lg-4 col-xl-4">' +
    '<div class="pull-right"><img src="'+myPositions[i].image+'" width=100/></div>' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>";
}
//------------------------------------------------------------------------------------//

for (let i = 0; i < mySkillset.skills.length; i++) {
  for (let j = 0; j < mySkillset.skills[i].name.length; j++) {
    skillsAppendHTML += '<div class="single-work col-lg-3 col-md-6 col-sm-12 ';
    for (let k = 0; k < mySkillset.skills[i].tags.length; k++) {
      skillsAppendHTML += mySkillset.skills[i].tags[k] + " ";
    }
    skillsAppendHTML += '">' + '<div class="relative">' + '<div class="thumb">' + "<h4>" + mySkillset.skills[i].name[j] + "</h4>" + "</div>" + "</div>" + "</div>";
  }
}

for (let i = 0; i < mySkillset.alltags.length; i++) {
  filtersAppendHTML += '<li data-filter=".' + mySkillset.alltags[i].name + '">' + mySkillset.alltags[i].description + "</li>";
}
filtersAppendHTML += "</ul>";
//------------------------------------------------------------------------------------//
