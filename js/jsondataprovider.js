// var myPositions = JSON.parse(positions);
// var mySkillset = JSON.parse(skillset);
var mySkillset = { skills: [], alltags: [] };
var mySocialLinks;

var myPositionsHTML = '<div class="row">';
var myPositionsPopupHTML = "";
var skillsAppendHTML = "";
var filtersAppendHTML =
  '<ul><li id="allSkillsBtn" class="active btn btn-secondary" data-filter=".all">All</li>';
let positionSlideStart = false;
let skillsSlideStart = false;
let position_count = 4;
let skills_count = 24;
let skill_filter = "all";

if (WURFL.is_mobile === true) {
  position_count = 3;
  skills_count = 9;
}

//------------------------------------------------------------------------------------//
async function loadJobHistory() {
  try {
    const response = await fetch("./assets/prabhu_positions.json");
    if (!response.ok) throw new Error("Failed to fetch job history data");

    const myPositions = await response.json();
    const popupHTML = [];
    const positionsHTML = myPositions.map((position) => {
      popupHTML.push(`
        <div id="popup_${position.id}" class="overlay">
          <div class="popup">
            <h2>${position.company}</h2>
            <strong>${position.postion}</strong>
            <a class="close" href="#history">&times;</a>
            <div class="content">${position.description}</div>
          </div>
        </div>`);

      return `
        <div class="col-lg-6">
          <a href="#popup_${position.id}">
            <div class="single-job">
              <div class="row d-flex justify-content-between">
                <div class="col-8">
                  <h5>${position.postion}</h5>
                  ${position.company}<br/>
                  <strong>${position.startDate} to ${position.endDate}</strong>
                </div>
                <div class="col-4">
                  <div class="pull-right">
                    <img src="${position.image}" width="100" alt="${position.company}"/>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>`;
    });

    document.getElementById("positions").innerHTML = `
      <div class="row">
        ${positionsHTML.join("")}
        ${popupHTML.join("")}
      </div>`;
  } catch (error) {
    console.error("Error loading job history:", error);
  }
}

//------------------------------------------------------------------------------------//
function timeSince(date_future) {
  var seconds = Math.abs(date_future - new Date()) / 1000;
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  return Object.entries(intervals).reduce((result, [key, value]) => {
    result[key] = Math.floor(seconds / value);
    seconds %= value;
    return result;
  }, {});
}

function headerIconClick() {
  $("body,html").animate(
    {
      scrollTop: 0,
    },
    1000
  );
}

async function seturl(id) {
  try {
    if (!mySocialLinks) {
      const response = await fetch("./assets/prabhu_links.json");
      if (!response.ok) throw new Error("Failed to fetch social links");
      mySocialLinks = await response.json();
    }

    const platform = WURFL.is_mobile ? "mobile" : "desktop";
    const url = mySocialLinks[platform]?.[id];
    console.log(`Setting URL for ${id}: ${url}`);
    if (url) {
      document.getElementById(id).setAttribute("href", url);
    } else {
      console.warn(`URL not found for id: ${id}`);
    }
  } catch (error) {
    console.error("Error setting URL:", error);
  }
}
