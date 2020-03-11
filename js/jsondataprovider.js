var myPositions = JSON.parse(positions);
var mySkillset = JSON.parse(skillset);
var mySocialLinks = JSON.parse(sociallinks);

var myPositionsHTML = "";
var skillsAppendHTML = "";
var filtersAppendHTML = '<ul><li id="allSkillsBtn" class="active" data-filter=".all">All</li>';
let positionSlideStart = false;
let skillsSlideStart = false;
let position_count = 4;
let skills_count = 24;
let skill_filter = "all";
if (WURFL.is_mobile === true) {
  position_count = 3;
  skills_count = 9;
}
for (let i = 0; i < myPositions.length; i++) {
  if (i % position_count == 0) {
    positionSlideStart = true;
    myPositionsHTML += '<div class="slide"><div class="row">';
  }
  myPositionsHTML +=
    '<div class="col-lg-6">' +
    '<div class="single-job">' +
    '<div class="row d-flex justify-content-between">' +
    '<div class="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">' +
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
    '<div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">' +
    '<div class="pull-right"><img src="' +
    myPositions[i].image +
    '" width=100/></div>' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>";
  if (positionSlideStart && i % position_count == position_count - 1) {
    myPositionsHTML += "</div></div>";
    positionSlideStart = false;
  }
  if (positionSlideStart && i == myPositions.length - 1) {
    myPositionsHTML += "</div></div>";
  }
}
// myPositionsHTML += "";
//------------------------------------------------------------------------------------//
function generateFilteredSkills() {
  let skill_index = 0;
  for (let i = 0; i < mySkillset.skills.length; i++) {
    if (mySkillset.skills[i].tags.includes(skill_filter)) {
      for (let j = 0; j < mySkillset.skills[i].name.length; j++) {
        if (skill_index % skills_count == 0) {
          skillsSlideStart = true;
          // skillsAppendHTML += '<div class="slide"> <div class="row grid">';
        }
        skillsAppendHTML += '<div class="single-work col-6 col-xl-3 col-lg-3 col-md-4 col-sm-6 ';
        for (let k = 0; k < mySkillset.skills[i].tags.length; k++) {
          skillsAppendHTML += mySkillset.skills[i].tags[k] + " ";
        }
        skillsAppendHTML += '">' + '<div class="relative">' + '<div class="thumb">' + "<h4>" + mySkillset.skills[i].name[j] + "</h4>" + "</div>" + "</div>" + "</div>";
        skill_index++;
        if (skillsSlideStart && skill_index % skills_count == 0) {
          // skillsAppendHTML += "</div> </div>";
          skillsSlideStart = false;
        }
      }
    }
    if (skillsSlideStart && i == mySkillset.skills.length - 1) {
      // skillsAppendHTML += "</div> </div>";
    }
  }
}
generateFilteredSkills();

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function getImageNumber() {
  let image_number = parseInt(getCookie("image_number"));
  if (!image_number) {
    image_number = 0;
  }
  if (image_number == 99) {
    image_number = 0;
  }
  image_number++;
  setCookie("image_number", image_number, 365);
  return image_number % 3;
}

for (let i = 0; i < mySkillset.alltags.length; i++) {
  filtersAppendHTML += '<li data-filter=".' + mySkillset.alltags[i].name + '">' + mySkillset.alltags[i].description + "</li>";
}
filtersAppendHTML += "</ul>";
//------------------------------------------------------------------------------------//
function timeSince(date_future) {
  var d = Math.abs(date_future - new Date()) / 1000; // delta
  var r = {}; // result
  var s = {
    // structure
    year: 31536000,
    month: 2592000,
    week: 604800, // uncomment row to ignore
    day: 86400, // feel free to add your own row
    hour: 3600,
    minute: 60,
    second: 1
  };

  Object.keys(s).forEach(function(key) {
    r[key] = Math.floor(d / s[key]);
    d -= r[key] * s[key];
  });

  return r;
}
