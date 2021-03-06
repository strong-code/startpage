/*=====================================================================================================*/
/* Giving credit where credit is due, The JS is all built off of my original mod of Twily's homepage. */
/* If there are any similarities left, it's probably because it's based on his code.                 */
/*==================================================================================================*/

var $ = function(id) {
  return document.getElementById(id);
};
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var dayNames = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THRUSDAY", "FRIDAY", "SATURDAY"];

/*==============*/
/*== Options ==*/
/*============*/

var CookiePrefix = "strongcode_stpg_"; //prefix for cookies.
var cmdPrefix = "!"; //prefix for commands.
var stockPrefix = "$"; //prefix for stock search.
var ssi = 6; //set default search provider. Use array index of the array below. (Starting with 0)
// Format: [Keyword, Search URL (Search query replaces "{Q}"), "Input placeholder text"]
var searchSources = [
  ["g",        "https://www.google.com/#q={Q}",                          "google_logo"],
  ["im",       "https://www.google.com/search?tbm=isch&q={Q}",           "google_logo Images"],
  ["imdb",     "http://www.imdb.com/find?q={Q}",                         "IMDB"],
  ["ud",       "http://www.urbandictionary.com/define.php?term={Q}",     "Urban Dictionary"],
  ["w",        "http://en.wikipedia.org/w/index.php?search={Q}",         "Wikipedia"],
  ["yt",       "https://www.youtube.com/results?search_query={Q}",       "YouTube"],
  ["ddg",      "https://duckduckgo.com/?q={Q}",                          "DuckDuckGo"],
  ["gr",       "https://goodreads.com/search?q={Q}",                     "GoodReads"],
  ["d",        "https://www.dictionary.com/browse/{Q}",                  "Dictionary"],
  ["last",     "https://www.last.fm/search?q={Q}",                       "Last.fm"]
];

// Sources for background images that dynamically load. Date color is to make it
// readable on different colored backgrounds
// Format: [filename, date color]
var bgSources = [
  ["aurora.gif", "white"],
  ["bridge.gif", "white"],
  ["cabin.jpg", "black"],
  ["cat.gif", "black"],
  ["cyberpunk.gif", "white"],
  ["farm.jpg", "black"],
  ["miami.gif", "white"],
  ["sheep.gif", "black"],
  ["smoking.gif", "white"],
  ["snowhouse.gif", "white"],
  ["train.gif", "white"],
]

// Because I care about readability in my JS. kthx.
var svgClover  = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"m19.9 8.78c1.05-0.611 2.01-1.51 2.42-2.68 0.503-1.41 0.089-3.08-0.98-4.11-0.425-0.381-0.987-0.729-1.58-0.6-0.433 0.083-0.737 0.43-0.942 0.797-0.349-0.648-0.699-1.32-1.29-1.79-0.755-0.616-2-0.446-2.57 0.336-0.911 1.13-1.16 2.65-1.17 4.06 0.039 1.93 0.514 3.88 1.4 5.59 1.7-0.4 3.4-0.76 4.8-1.62z\"/><path d=\"m10.8 8.75c-0.275-1.71-0.664-3.44-1.54-4.94-0.536-0.929-1.29-1.77-2.28-2.23-1.25-0.62-2.86-0.42-3.98 0.43-0.55 0.41-1.04 1.01-1.05 1.72 0.009 0.507 0.366 0.908 0.787 1.14-0.842 0.422-1.77 0.9-2.17 1.8-0.302 0.64-0.05 1.39 0.42 1.86 0.75 0.77 1.81 1.13 2.84 1.32 2.37 0.35 4.81-0.14 6.97-1.1z\"/><path d=\"m9.12 13.5c-1.58 0.447-3.14 1.09-4.46 2.08-0.913 0.694-1.72 1.6-2.04 2.73-0.442 1.45 0.102 3.12 1.26 4.08 0.495 0.399 1.17 0.737 1.81 0.504 0.418-0.127 0.61-0.552 0.833-0.888 0.463 0.773 1.07 1.55 1.95 1.86 0.635 0.238 1.36-0.032 1.78-0.541 0.658-0.787 0.89-1.83 0.968-2.83 0.128-2.48-0.738-4.9-2.02-6.99l-0.06-0.1z\"/><path d=\"m22.8 15.2c-0.885-0.733-2.02-1.1-3.14-1.27-2.14-0.318-4.3 0.091-6.32 0.784 0.158 1.72 0.477 3.46 1.25 5.01 0.549 1.09 1.39 2.1 2.55 2.56 1.45 0.584 3.25 0.204 4.29-0.973 0.329-0.374 0.572-0.896 0.443-1.4-0.092-0.388-0.413-0.646-0.695-0.897 0.922-0.318 1.91-0.825 2.31-1.77 0.3-0.7-0.2-1.5-0.7-2z\"/></svg>";
var svgCode    = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M8,3A2,2 0 0,0 6,5V9A2,2 0 0,1 4,11H3V13H4A2,2 0 0,1 6,15V19A2,2 0 0,0 8,21H10V19H8V14A2,2 0 0,0 6,12A2,2 0 0,0 8,10V5H10V3M16,3A2,2 0 0,1 18,5V9A2,2 0 0,0 20,11H21V13H20A2,2 0 0,0 18,15V19A2,2 0 0,1 16,21H14V19H16V14A2,2 0 0,1 18,12A2,2 0 0,1 16,10V5H14V3H16Z\" /></svg>";
var svgGamepad = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M7,6H17A6,6 0 0,1 23,12A6,6 0 0,1 17,18C15.22,18 13.63,17.23 12.53,16H11.47C10.37,17.23 8.78,18 7,18A6,6 0 0,1 1,12A6,6 0 0,1 7,6M6,9V11H4V13H6V15H8V13H10V11H8V9H6M15.5,12A1.5,1.5 0 0,0 14,13.5A1.5,1.5 0 0,0 15.5,15A1.5,1.5 0 0,0 17,13.5A1.5,1.5 0 0,0 15.5,12M18.5,9A1.5,1.5 0 0,0 17,10.5A1.5,1.5 0 0,0 18.5,12A1.5,1.5 0 0,0 20,10.5A1.5,1.5 0 0,0 18.5,9Z\" /></svg>";
var svgMore    = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z\" /></svg>";
var svgSocial  = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M18,16.08C17.24,16.08 16.56,16.38 16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8A3,3 0 0,0 21,5A3,3 0 0,0 18,2A3,3 0 0,0 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,9.31 6.79,9 6,9A3,3 0 0,0 3,12A3,3 0 0,0 6,15C6.79,15 7.5,14.69 8.04,14.19L15.16,18.34C15.11,18.55 15.08,18.77 15.08,19C15.08,20.61 16.39,21.91 18,21.91C19.61,21.91 20.92,20.61 20.92,19A2.92,2.92 0 0,0 18,16.08Z\" /></svg>";
var svgReddit  = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M24 11.779c0-1.459-1.192-2.645-2.657-2.645-.715 0-1.363.286-1.84.746-1.81-1.191-4.259-1.949-6.971-2.046l1.483-4.669 4.016.941-.006.058c0 1.193.975 2.163 2.174 2.163 1.198 0 2.172-.97 2.172-2.163s-.975-2.164-2.172-2.164c-.92 0-1.704.574-2.021 1.379l-4.329-1.015c-.189-.046-.381.063-.44.249l-1.654 5.207c-2.838.034-5.409.798-7.3 2.025-.474-.438-1.103-.712-1.799-.712-1.465 0-2.656 1.187-2.656 2.646 0 .97.533 1.811 1.317 2.271-.052.282-.086.567-.086.857 0 3.911 4.808 7.093 10.719 7.093s10.72-3.182 10.72-7.093c0-.274-.029-.544-.075-.81.832-.447 1.405-1.312 1.405-2.318zm-17.224 1.816c0-.868.71-1.575 1.582-1.575.872 0 1.581.707 1.581 1.575s-.709 1.574-1.581 1.574-1.582-.706-1.582-1.574zm9.061 4.669c-.797.793-2.048 1.179-3.824 1.179l-.013-.003-.013.003c-1.777 0-3.028-.386-3.824-1.179-.145-.144-.145-.379 0-.523.145-.145.381-.145.526 0 .65.647 1.729.961 3.298.961l.013.003.013-.003c1.569 0 2.648-.315 3.298-.962.145-.145.381-.144.526 0 .145.145.145.379 0 .524zm-.189-3.095c-.872 0-1.581-.706-1.581-1.574 0-.868.709-1.575 1.581-1.575s1.581.707 1.581 1.575-.709 1.574-1.581 1.574z\" /></svg>";
var svgDl      = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewbox=\"0 0 24 24\"><path d=\"M23.984 11h-2.006c-.057-.557-.143-1.104-.287-1.631l1.82-.862c.245.799.401 1.632.473 2.493zm-3.035-3.493l1.81-.857c-.353-.7-.758-1.368-1.236-1.981l-1.512 1.318c.36.474.667.986.938 1.52zm.039 8.939c-.26.519-.562 1.01-.904 1.473l1.539 1.29c.465-.616.871-1.276 1.211-1.976l-1.846-.787zm-.836-13.238c-.589-.54-1.214-1.038-1.9-1.454l-1.216 1.599c.577.334 1.104.739 1.602 1.177l1.514-1.322zm-1.414 16.195c-1.779 1.608-4.129 2.597-6.713 2.597-5.525 0-10.021-4.486-10.021-10 0-3.692 2.021-6.915 5.011-8.647l-1.215-1.599c-3.473 2.103-5.8 5.897-5.8 10.246 0 6.627 5.385 12 12.025 12 3.204 0 6.107-1.259 8.264-3.297l-1.551-1.3zm3.258-6.403c-.054.54-.162 1.063-.299 1.574l1.864.795c.224-.762.372-1.553.439-2.369h-2.004zm-9.996 5l7-8h-4v-10h-6v10h-4l7 8z\" /></svg>";
var svgTrash   = "<svg style=\"width:24px;height:24px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z\" /></svg>";
var svgMoney   = "<svg style=\"width:24px;height:30px\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"3 5 20 20\"><path d=\"M12.478,17.795c-1.307,0-2.507-0.456-3.343-0.955l-0.578,2.041c0.771,0.521,2.168,0.912,3.518,0.955v1.913h1.71v-2.044 c2.357-0.391,3.621-2.019,3.621-3.865c0-1.932-1.072-3.105-3.471-4.017c-1.821-0.738-2.593-1.238-2.593-2.128 c0-0.738,0.536-1.52,2.036-1.52c1.457,0,2.399,0.5,2.914,0.738l0.579-1.997c-0.686-0.348-1.607-0.673-2.957-0.717V4.25h-1.757v2.059 c-2.164,0.391-3.45,1.824-3.45,3.692c0,2.019,1.457,3.061,3.707,3.886c1.586,0.586,2.336,1.216,2.336,2.193 C14.749,17.123,13.827,17.795,12.478,17.795z\" /></svg>";

/* Header Format: ["(Label)", "(Accent Color)", "-HEAD-"],
*   - The labels are setup for 24px SVGs. by default they are separated from the linkMenu for readability.
*   - Accent color can be: black, white, blue, green, cyan, red, magenta, and yellow. by default, the accent color is white.
*   - ALL categories need a header to start them. Headers are signified by the -HEAD- in the 3rd position.
* Link Format: ["Name", "URL",""],
*   - Name and URL are pretty self explanitory.
*   - 3rd position may be used in the future, but right now it's not used and can be left blank.
*/
// Also yes I could totally use a json object to represent the menus, but I didn't feel like reprogramming the whole script. Probably doing that next site, though.
var linkMenu = [
  [svgDl,                   "blue",                                        "-HEAD-"], // Downloads
  ["1337x",         "https://1337x.to",""],
  ["RARBG",         "https://rarbg.to/torrents.php",""],
  ["LibGen",        "https://libgen.is/",""],
  ["B-OK",          "https://b-ok.xyz/",""],
  ["AudioBookBay",  "http://audiobookbay.nl/",""],
  ["Megasearch",    "http://megasearch.co/",""],
  ["Zooqle",        "https://zooqle.com/",""],
  ["Pluto.tv",      "https://pluto.tv/live-tv",""],

  [svgReddit,                  "green",                                       "-HEAD-"], // Reddit
  ["/r/buildapcsales",         "https://reddit.com/r/buildapcsales/new",""],
  ["/r/analog",                "https://reddit.com/r/analog",""],
  ["/r/entreprenuer",          "https://reddit.com/r/Entrepreneur/",""],
  ["/r/juststart",             "https://reddit.com/r/juststart",""],
  ["/r/frugalmalefashion",     "https://reddit.com/r/frugalmalefashion",""],
  ["/r/battlestations",        "https://reddit.com/r/battlestations",""],
  ["/r/hardwareswap",          "https://old.reddit.com/r/hardwareswap/new/",""],
  ["/r/forhire",               "https://reddit.com/r/forhire",""],

  [svgClover,                  "cyan",                                        "-HEAD-"], // 4chan
  ["/biz/ Business & Finance", "https://boards.4chan.org/biz/",""],
  ["/g/ Technology",           "https://boards.4chan.org/g/",""],
  ["/v/ Video Games",          "https://boards.4chan.org/v/",""],
  ["/fit/ Fitness",            "https://boards.4chan.org/fit/",""],
  ["/p/ Photography",          "https://boards.4chan.org/p/",""],
  ["/out/ Outdoors",           "https://boards.4chan.org/out/",""],

  [svgCode,                    "red",                                         "-HEAD-"], // Coding
  ["HackerNews",               "https://news.ycombinator.com",""],
  ["Lobste.rs",                "https://lobste.rs/",""],
  ["DigitalOcean",             "https://cloud.digitalocean.com/projects",""],
  ["GitHub",                   "https://github.com",""],
  ["webmshare",                "https://webmshare.com/",""],
  ["Imgur",                    "https://imgur.com/upload",""],
  ["DownDetector",             "https://downdetector.com",""],
  ["10 Minute Mail",           "https://10minutemail.net/",""],
  ["Whats My DNS",             "https://www.whatsmydns.net/",""],
  ["VirusTotal",               "https://www.virustotal.com/#/home/upload",""],

  [svgGamepad,                 "magenta",                                     "-HEAD-"], // Gaming
  ["CrackWatch",               "https://crackwatch.com/",""],
  ["Steam",                    "https://store.steampowered.com/",""],
  ["Humble Bundle",            "https://www.humblebundle.com/",""],
  ["Fitgirl",                  "https://fitgirl-repacks.site/",""],
  
  [svgMore,                    "yellow",                                      "-HEAD-"], // Other
  ["YouTube",                  "https://www.youtube.com/",""],
  ["500px",                    "https://500px.com",""],
  ["GoodReads",                "https://goodreads.com",""],
  ["CoinMarketCap",            "https://coinmarketcap.com",""],
  ["eBay",                     "https://www.ebay.com/myb/Summary",""],
  ["Pivotal Tracker",          "https://www.pivotaltracker.com/n/projects/2187004",""],
  ["SlickDeals",               "https://slickdeals.net/",""],
  ["Misc",                     "https://forum.bodybuilding.com/forumdisplay.php?f=19",""],

  [svgMoney,                   "white",                                      "-HEAD-"], // Other
  ["Ahrefs",                   "https://ahrefs.com/dashboard/metrics",""],
  ["Google Analytics",         "https://analytics.google.com/analytics/web/#/",""],
  ["Google Webmaster Tools",   "https://search.google.com/search-console",""],
  ["Amazon Affiliates",        "https://affiliate-program.amazon.com/home",""],
  ["Adsense",                  "https://www.google.com/adsense/new/u/0/pub-3243030667692436/home",""],
  ["Fiverr",                   "https://fiverraffiliates.com/affiliatev2",""],
  ["TheStreamSetup (Admin)",   "https://thestreamsetup.com/wp-admin/",""],
  ["TheStreamSetup (Email)",   "https://webmailer.1and1.com/?Username=editor@thestreamsetup.com",""],
  ["Facebook Advertising",     "https://www.facebook.com/adsmanager/manage/campaigns?act=680565441959914&columns=name%2Cerrors%2Cdelivery%2Cresults%2Creach%2Cimpressions%2Ccost_per_result%2Cbudget%2Cspend%2Cend_time%2Cschedule%2Crelevance_score%3Ascore%2Cfrequency%2Cunique_actions%3Alink_click&attribution_windows=default",""],
  ["PayPal",                   "https://www.paypal.com/",""],
];
// DID I FORGET TO MENTION?! THE DEMO LINKS DO NOTHING!

/*==================*/
/*== Main Script ==*/
/*================*/

//core element vars
var searchInput = $('searchBar');
var rootMenuUL = $('categoryMenu');
var dateDiv = $('dateContainer');
var notesTextarea = $('notesInput');

function init() {
  initBackground();
  initSearchBar();
  buildMenu();
  $('body').style.opacity = 1;
  $('mainContainer').style.opacity = 1;
  $('dateContainer').style.opacity = 1;
  $('notesWidget').style.opacity = 1;
}

function initBackground() {
  // Get the bgSource element
  var topBound = bgSources.length;
  var background = bgSources[Math.floor(Math.random() * (11 - 0))];

  // Change background image
  var bgFilepath = "url(./media/" + background[0] + ")";
  document.getElementById("background_").style.backgroundImage = bgFilepath;

  buildDate(background[1]);
}

function initSearchBar() {
  // document.getElementById("searchBar").focus();
  if (searchSources[ssi] !== undefined)
    searchInput.placeholder = searchSources[ssi][2];
  else {
    ssi = 0;
    searchInput.placeholder = "Do you know what you're doing?";
    alert("Error: default search engine setting is invalid!");
  }

  document.addEventListener('keydown', function(event) { handleKeydown(event); });

  searchInput.value = "";
}

function buildDate(color) {
  var today = new Date();
  dateDiv.innerHTML = "<font class=\"font-3em\" color=\"" + color + "\">" +
                      monthNames[today.getMonth()] +
                      " " +
                      today.getDate() +
                      "</font><br><font class=\"font-1em\" color=\"" + color + "\">" +
                      dayNames[today.getDay()] +
                      ", " +
                      today.getFullYear() +
                      "</font>";
}

function buildMenu() {
  var newMenu = "";
  var accent = "";

  if(linkMenu[0][2] === "-HEAD-") {

    if (linkMenu[0][1] !== "") accent = linkMenu[0][1].toLowerCase();
    else accent = "white";

    newMenu += "<li class=\"button-container expanding-down\"><div class=\"button accent-" + accent + "\"><label class=\"button-content\">" + linkMenu[0][0] + "</label><div class=\"button-expanded-content\"><ul class=\"menu-link container\">";
  } else {
    alert("linkMenu is invalid. Ensure to start the list with a -HEAD- entry.");
  }
  for (var i = 1; i < linkMenu.length; i++) {
    if (linkMenu[i][2] === "-HEAD-") {

      if (linkMenu[i][1] !== "") accent = linkMenu[i][1].toLowerCase();
      else accent = "white";

      newMenu += "</ul></div></div></li><li class=\"button-container expanding-down\"><div class=\"button accent-" + accent + "\"><label class=\"button-content\">" + linkMenu[i][0] + "</label><div class=\"button-expanded-content\"><ul class=\"menu-link container\">";
    } else {
      newMenu += "<li class='menu-link-item'><a href=\"" + linkMenu[i][1] + "\" target=\"_self\"><label>" + linkMenu[i][0] + "</label></a></li>";
    }
  }
  newMenu +="</ul></div></div></li>";

  rootMenuUL.innerHTML = newMenu;
}

function handleQuery(event, query) {
  var key = event.keyCode || event.which;
  if(query !== "") {
    var qlist;
    if (key === 32) {
      qList = query.split(" ");
      if (qList[0].charAt(0) === cmdPrefix) {
        var keyword = "";
        for (var i = 0; i < searchSources.length; i++) {
          keyword = cmdPrefix + searchSources[i][0];
          if (keyword === qList[0]) {
            ssi = i;
            searchInput.placeholder = searchSources[ssi][2];
            searchInput.value = query.replace(keyword, "").trim();
            event.preventDefault();
            break;
          }
        }
      }
    } else if (key === 13) {
      var ticker = "";
      if (query.charAt(0) === "$") { // Check if this is a stock query
        ticker = query.split("$");
        window.location = "https://finance.yahoo.com/quote/" + ticker[1];
      } else {
        qList = query.split(" ");
        if (qList[0].charAt(0) === cmdPrefix) {
          var keyword = "";
          for (var i = 0; i < searchSources.length; i++) {
            keyword = cmdPrefix + searchSources[i][0];
            if (keyword === qList[0]) {
              ssi = i;
              break;
            }
          }
          if (qList.length > 1) {
            window.location = searchSources[ssi][1].replace("{Q}", encodeURIComponent(query.replace(keyword, ""))).trim();
          } else {
            searchInput.placeholder = searchSources[ssi][2];
            searchInput.value = "";
          }
        } else {
          window.location = searchSources[ssi][1].replace("{Q}", encodeURIComponent(query));
        }
      }
    }
  } else if (event.key === "$" ) {
    // switch to Yahoo Finance if first '$' is entered
    searchInput.placeholder = "Yahoo Finance";
    searchInput.value = "$";
    event.preventDefault();
  }
  if (key === 27) {
    searchInput.blur();
  }
}

function handleNoteInput(event) {
  var key = event.keyCode || event.which;
  if (key === 27) {
    notesTextarea.blur();
  }
}

var noteText = null;
function handleNotes(event, focus){
  if (focus) {
    if(!noteText) {
      noteText = GetCookie("notes") || "";
    }
    notesTextarea.value = noteText;
    addClass('notesContainer', "active");
  } else {
    removeClass('notesContainer', "active");
    if(noteText !== notesTextarea.value) {
      noteText = notesTextarea.value;
      SetCookie("notes", noteText, 365 * 24 * 60 * 60 * 1000);
    }
  }
}

var ignoredKeys = [9,13,16,17,18,19,20,27,33,34,35,36,37,38,39,40,45,46,91,92,93,112,113,114,115,116,117,118,119,120,121,122,123,144,145];
function handleKeydown(event) {
  if(notesInput === document.activeElement) return;
  if(searchInput === document.activeElement) return;
  if (ignoredKeys.includes(event.keyCode)) return;
  searchInput.focus();
}

function addClass(elementID, className) {
  $(elementID).classList.add(className);
}
function removeClass(elementID, className) {
  $(elementID).classList.remove(className);
}

function GetCookie(name) {
    try {
        var cookie = document.cookie;
        name = CookiePrefix + name;
        var valueStart = cookie.indexOf(name + "=") + 1;
        if (valueStart === 0) {
            return null;
        }
        valueStart += name.length;
        var valueEnd = cookie.indexOf(";", valueStart);
        if (valueEnd == -1)
            valueEnd = cookie.length;
        return decodeURIComponent(cookie.substring(valueStart, valueEnd));
    } catch (e) {
      console.log(e);
    }
    return null;
}
function SetCookie(name, value, expire) {
    var temp = CookiePrefix + name + "=" + escape(value) + ";" + (expire !== 0 ? "expires=" + ((new Date((new Date()).getTime() + expire)).toUTCString()) + ";" : " path=/;");
    console.log(temp);
    document.cookie = temp;
}
function CanSetCookies() {
    SetCookie('CookieTest', 'true', 0);
    var can = GetCookie('CookieTest') !== null;
    DelCookie('CookieTest');
    return can;
}
function DelCookie(name) {
    document.cookie = fr.client.CookieBase + name + '=0; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
