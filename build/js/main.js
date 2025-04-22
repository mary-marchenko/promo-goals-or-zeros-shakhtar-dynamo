"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
(function () {
  // if (window.promoInit) {
  //     window.promoInit = false
  //     return;
  // }
  // window.promoInit = true;

  window.counterClick = 1;
  var apiURL = 'https://fav-prom.com/api_football_shakhtar',
    unauthMsgs = document.querySelectorAll('.unauth-msg'),
    youAreInBtns = document.querySelectorAll('.took-part'),
    mainPage = document.querySelector(".fav-page"),
    resultsTable = document.querySelector('#results-table'),
    resultsTableOther = document.querySelector('#results-table-other'),
    placeBetBtn = document.querySelector(".predict-btn"),
    lastPredict = document.querySelector(".predict__last"),
    topForecast = document.querySelector(".topForecast");
  var currentTab = 1;
  var currentTabTable = 1;
  var matchNumber = 1;
  var showTopForecast = false;

  // const FIRST_MATCH_DATE = new Date('2025-04-27T17:30:00') // дата матчу - 30хв справжня дата
  var FIRST_MATCH_DATE = new Date('2025-04-27T17:30:00'); // дата матчу - 30хв
  var currentDate = new Date();
  function lockMatchContainer(matchDate, matchNumber) {
    if (new Date() > matchDate) {
      var _containers = document.querySelectorAll(".predict__container[data-match-number=\"".concat(matchNumber, "\"]"));
      _containers.forEach(function (container) {
        container.classList.add('_lock');
      });
      placeBetBtn.classList.add("_lock");
    }
  }
  lockMatchContainer(FIRST_MATCH_DATE, 1); // Для першого матчу

  setInterval(function () {
    var currentDate = new Date(); // Оновити поточну дату
    lockMatchContainer(FIRST_MATCH_DATE, 1);
  }, 600000); // Оновлювати кожні 10 хв
  var Bet = /*#__PURE__*/function () {
    function Bet(userId, matchNumber) {
      var team1Goals = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var team2Goals = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      var firstGoal = arguments.length > 4 ? arguments[4] : undefined;
      _classCallCheck(this, Bet);
      if (userId !== null) this.userid = userId;
      this.matchNumber = matchNumber;
      this.team1 = team1Goals;
      this.team2 = team2Goals;
      if (firstGoal !== undefined) this.firstGoal = firstGoal;
    }
    _createClass(Bet, [{
      key: "updateGoals",
      value: function updateGoals(team1Goals, team2Goals) {
        if (team1Goals !== undefined) {
          this.team1 = team1Goals !== null ? team1Goals : this.team1;
        }
        if (team2Goals !== undefined) {
          this.team2 = team2Goals !== null ? team2Goals : this.team2;
        }
        this.goalsUpdated = true;
      }
    }, {
      key: "updateFirstGoal",
      value: function updateFirstGoal(firstGoal) {
        if (firstGoal !== undefined) {
          this.firstGoal = firstGoal !== null ? firstGoal : this.firstGoal;
        }
        this.firstGoalUpdated = true;
      }
    }]);
    return Bet;
  }();
  var cache = {};
  var predictData = [];
  var translateState = true;
  var debug = false;
  var locale = "en";
  var ukLeng = document.querySelector('#ukLeng');
  var enLeng = document.querySelector('#enLeng');
  var i18nData = {};
  var userId;
  // userId = 100300268;

  var currentBet;
  if (ukLeng) locale = 'uk';
  if (enLeng) locale = 'en';
  var request = function request(link, extraOptions) {
    return fetch(apiURL + link, _objectSpread({
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }, extraOptions || {})).then(function (res) {
      if (!res.ok) throw new Error('API error');
      return res.json();
    })["catch"](function (err) {
      console.error('API request failed:', err);
      reportError(err);
      document.querySelector('.fav-page').style.display = 'none';
      if (window.location.href.startsWith("https://www.favbet.hr/")) {
        window.location.href = '/promocije/promocija/stub/';
      } else {
        window.location.href = '/promos/promo/stub/';
      }
      return Promise.reject(err);
    });
  };
  function reportError(err) {
    var reportData = {
      origin: window.location.href,
      userid: userId,
      errorText: (err === null || err === void 0 ? void 0 : err.error) || (err === null || err === void 0 ? void 0 : err.text) || (err === null || err === void 0 ? void 0 : err.message) || 'Unknown error',
      type: (err === null || err === void 0 ? void 0 : err.name) || 'UnknownError',
      stack: (err === null || err === void 0 ? void 0 : err.stack) || ''
    };
    fetch('https://fav-prom.com/api-cms/reports/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reportData)
    })["catch"](console.warn);
  }
  var getLastBet = function getLastBet(bets, matchNumber) {
    if (!bets) return false;
    return bets.find(function (bet) {
      return bet.matchNumber === matchNumber;
    });
  };
  function refreshBetInfo(userId) {
    var score1 = document.querySelector(".score-1");
    var score2 = document.querySelector(".score-2");
    var goal1 = document.querySelector(".goal-1");
    var goal2 = document.querySelector(".goal-2");

    // console.log(matchNumber)

    request("/favuser/".concat(userId), {
      method: 'GET'
    }).then(function (data) {
      if (data.bets) {
        var betAvailable = data.bets.some(function (bet) {
          return bet.matchNumber === matchNumber;
        });
        // console.log(betAvailable)
        var lastTeam1 = document.querySelector(".predict__last-team.team1");
        var lastTeam2 = document.querySelector(".predict__last-team.team2");
        var scoreTeam1 = document.querySelector(".scoreTeam1");
        var scoreTeam2 = document.querySelector(".scoreTeam2");
        var firstGoal = document.querySelector(".predict__last-country");
        if (betAvailable) {
          lastPredict.classList.remove("hide");
          var lastBet = getLastBet(data.bets, matchNumber);
          scoreTeam1.textContent = lastBet.team1 === undefined ? "-" : "".concat(lastBet.team1);
          scoreTeam2.textContent = lastBet.team2 === undefined ? "-" : "".concat(lastBet.team2);
          // console.log(lastBet)

          if (lastBet.betConfirmed) {
            document.querySelectorAll(".predict__last-result.unconfirmed").forEach(function (item) {
              item.classList.remove("active");
            });
            document.querySelectorAll(".predict__last-result.confirmed").forEach(function (item) {
              item.classList.add("active");
            });
          } else {
            document.querySelectorAll(".predict__last-result.unconfirmed").forEach(function (item) {
              item.classList.add("active");
            });
            document.querySelectorAll(".predict__last-result.confirmed").forEach(function (item) {
              item.classList.remove("active");
            });
          }
          if (lastBet.matchNumber === 1) {
            lastTeam1.setAttribute("data-translate", "shakhtar");
            lastTeam2.setAttribute("data-translate", "dynamo");
            translate();
          }
          if (score1.classList.contains("active")) {
            document.querySelector(".predict__last-score").classList.remove("hide");
            document.querySelector(".predict__last-goal").classList.add("hide");
          }
          if (goal1.classList.contains("active")) {
            document.querySelector(".predict__last-score").classList.add("hide");
            document.querySelector(".predict__last-goal").classList.remove("hide");
          }
          if (lastBet.firstGoal) {
            if (lastBet.firstGoal === "shakhtar") {
              firstGoal.setAttribute("data-translate", "shakhtar");
            }
            if (lastBet.firstGoal === "dynamo") {
              firstGoal.setAttribute("data-translate", "dynamo");
            }
            if (lastBet.firstGoal === "draw") {
              firstGoal.setAttribute("data-translate", "draw");
            }
          } else {
            if (goal1.classList.contains("active") || goal2.classList.contains("active")) {
              document.querySelector(".predict__last").classList.add("hide");
            }
          }
        }
        if (!betAvailable) {
          lastPredict.classList.add("hide");
        }
      } else {
        lastPredict.classList.add("hide");
      }
    })["catch"](function (error) {
      console.error('Error:', error);
    });
  }
  var InitPage = function InitPage() {
    checkUserAuth();
    renderUsers();
    updateTopForecasts(currentTab);
    refreshBetInfo(userId);
  };
  var checkUserAuth = function checkUserAuth() {
    if (userId) {
      youAreInBtns.forEach(function (item) {
        return item.classList.remove('hide');
      });
      unauthMsgs.forEach(function (item) {
        return item.classList.add('hide');
      });
    } else {
      var _iterator = _createForOfIteratorHelper(youAreInBtns),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var youAreInBtn = _step.value;
          youAreInBtn.classList.add('hide');
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      var _iterator2 = _createForOfIteratorHelper(unauthMsgs),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var unauthMes = _step2.value;
          unauthMes.classList.remove('hide');
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  };
  function placeBet(bet) {
    if (!userId) {
      return;
    }
    document.querySelector(".predict__container.active").querySelectorAll('.predict__team-increase, .predict__team-decrease').forEach(function (btn) {
      scoreInit(btn);
    });
    var activeTabs = document.querySelectorAll(".goalCont");
    // const activeInput = activeTab.querySelector(".predict__radio-item input")

    var req = {
      matchNumber: bet.matchNumber,
      userid: bet.userid
    };

    // console.log(activeTabs)
    var _iterator3 = _createForOfIteratorHelper(activeTabs),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var tab = _step3.value;
        if (tab.classList.contains("active")) {
          var activeInput = tab.querySelector(".predict__radio-item._active input");
          // console.log(tab)

          if (activeInput) {
            // console.log(activeInput)
            req.firstGoal = activeInput.value;
            break;
          }
        }
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    if (bet.firstGoalUpdated) {
      // console.log(bet.firstGoal)
      req.firstGoal = bet.firstGoal;
    }
    if (bet.goalsUpdated) {
      req.team1 = bet.team1;
      req.team2 = bet.team2;
    }

    // console.log(activeInput);
    // console.log(activeTab)

    sessionStorage.setItem("currentBet", JSON.stringify(req));
    request('/bet', {
      method: 'POST',
      body: sessionStorage.getItem("currentBet")
    }).then(function (res) {
      // console.log('Bet placed:', res);
      InitPage();
    })["catch"](function (error) {
      return console.error('Error placing bet:', error);
    });
  }
  function loadTranslations() {
    return fetch("".concat(apiURL, "/new-translates/").concat(locale)).then(function (res) {
      return res.json();
    }).then(function (json) {
      i18nData = json;
      translate();
      var mutationObserver = new MutationObserver(function (mutations) {
        translate();
      });
      mutationObserver.observe(document.getElementById('goals-or-zeros'), {
        childList: true,
        subtree: true
      });
    });
  }
  function translate() {
    var elems = document.querySelectorAll('[data-translate]');
    if (translateState) {
      elems.forEach(function (elem) {
        var key = elem.getAttribute('data-translate');
        elem.innerHTML = i18nData[key] || '*----NEED TO BE TRANSLATED----*   key:  ' + key;
        elem.removeAttribute('data-translate');
      });
    } else {
      console.log("translation works!");
    }
    refreshLocalizedClass(mainPage);
  }
  function refreshLocalizedClass(element) {
    if (!element) {
      return;
    }
    for (var _i = 0, _arr = ['uk', 'en']; _i < _arr.length; _i++) {
      var lang = _arr[_i];
      element.classList.remove(lang);
    }
    element.classList.add(locale);
  }
  function PlaceBetButtonClick(e) {
    e.preventDefault();
    if (currentBet === undefined) {
      currentBet = new Bet(userId, matchNumber);
    }
    placeBet(currentBet);
  }
  function init() {
    InitPage();
    initClickTracking();
    if (window.store) {
      var state = window.store.getState();
      userId = state.auth.isAuthorized && state.auth.id || '';
      if (!currentBet) {
        currentBet = new Bet(userId, matchNumber);
      }
    } else {
      var c = 0;
      var i = setInterval(function () {
        if (c < 50) {
          if (!!window.g_user_id) {
            userId = window.g_user_id;
            InitPage();
            clearInterval(i);
          }
        } else {
          InitPage();
          clearInterval(i);
        }
      }, 200);
    }
    placeBetBtn.addEventListener('click', PlaceBetButtonClick);
    document.querySelectorAll('.scoreCounter').forEach(function (teamEl, index) {
      if (!teamEl.querySelector('.predict__team-control')) {
        var teamNumber = index + 1;
        var controlHTML = "\n            <div class=\"predict__team-control\" data-team=\"team".concat(teamNumber, "\">\n                <div class=\"predict__team-decrease team").concat(teamNumber, "-minus\" role=\"button\"></div>\n                <div class=\"predict__team-number\">0</div>\n                <div class=\"predict__team-increase team").concat(teamNumber, "-plus\" role=\"button\"></div>\n            </div>\n        ");
        teamEl.insertAdjacentHTML('beforeend', controlHTML);
      }
    });
    document.querySelectorAll('.predict__team-increase, .predict__team-decrease').forEach(function (btn) {
      btn.addEventListener('click', handleTeamControlClick);
    });
  }
  function updateScore(matchNumber, team1Goals, team2Goals) {
    if (currentBet && currentBet.matchNumber === matchNumber) {
      currentBet.updateGoals(team1Goals, team2Goals);
    } else {
      currentBet = new Bet(userId, matchNumber, team1Goals, team2Goals);
      currentBet.updateGoals(team1Goals, team2Goals);
    }
  }
  function updateFirstGoal(matchNumber, firstGoal) {
    if (currentBet && currentBet.matchNumber === matchNumber) {
      currentBet.updateFirstGoal(firstGoal);
    }
  }
  function updateTopForecasts(matchNumber) {
    request("/users/".concat(matchNumber)).then(function (data) {
      var forecastsContainer = document.querySelector('.predict__forecasts');
      forecastsContainer.innerHTML = '';
      data.topForecasts.forEach(function (forecast) {
        var _forecast$forecast;
        var forecastItem = document.createElement('div');
        forecastItem.classList.add('predict__forecasts-item');
        var percentage = parseFloat(forecast.percentage).toFixed(1);
        var percentageSpan = document.createElement('span');
        percentageSpan.textContent = "".concat(percentage, "%");
        var forecastText = document.createTextNode(" ".concat((_forecast$forecast = forecast.forecast) !== null && _forecast$forecast !== void 0 ? _forecast$forecast : "0-0"));
        forecastItem.appendChild(percentageSpan);
        forecastItem.appendChild(forecastText);
        forecastsContainer.appendChild(forecastItem);
      });
    })["catch"](function (error) {
      console.error('Error fetching top forecasts:', error);
    });
  }
  function renderUsers() {
    request("/users/".concat(currentTabTable)).then(function (data) {
      var users = data.users;
      var isScoreTabActive = document.querySelector('.predict__tabs-score.active');
      var isGoalTabActive = document.querySelector('.predict__tabs-goal.active');
      if (users.length >= 50) {
        showTopForecast = true;
      }
      if (users.length < 50) {
        showTopForecast = false;
      }
      if (isScoreTabActive && showTopForecast) topForecast.classList.remove("hide");
      if (isGoalTabActive) topForecast.classList.add("hide");
      populateUsersTable(users, userId, currentTabTable);
    });
  }
  function populateUsersTable(users, currentUserId, matchNumber) {
    resultsTable.innerHTML = '';
    resultsTableOther.innerHTML = '';
    if (!users || !users.length) return;

    // // Фільтруємо користувачів, які зробили ставку на вказаний матч
    // const users = users.filter(user =>
    //     user.bets.some(bet => bet.matchNumber === matchNumber)
    // );

    // if (!users.length) return;

    // Знаходимо поточного користувача
    var currentUser = users.find(function (user) {
      return user.userid === currentUserId;
    });

    // Виводимо всіх інших користувачів у resultsTable
    users.forEach(function (user) {
      if (user.userid !== currentUserId) {
        displayUser(user, false, resultsTable, users, matchNumber);
      }
    });

    // Виводимо поточного користувача в resultsTableOther
    if (currentUser) {
      displayUser(currentUser, true, resultsTableOther, users, matchNumber);
    }
  }
  function displayUser(user, isCurrentUser, table, allUsers, matchNumber) {
    var matchDate;
    if (matchNumber === 1) {
      matchDate = FIRST_MATCH_DATE;
    }
    var additionalUserRow = document.createElement('div');
    additionalUserRow.classList.add('table__row');
    additionalUserRow.innerHTML = "\n    <div class=\"table__row-item\">".concat(isCurrentUser ? user.userid : maskUserId(user.userid), "</div>\n    <div class=\"table__row-item\">\n        ").concat(currentDate >= matchDate ? "<span>".concat(user.team1 !== undefined && user.team1 !== null ? user.team1 : "-", "</span><img src=\"https://fav-prom.com/html/goals-or-zeroes/img/vs.png\" alt=\"vs\"><span>").concat(user.team2 !== undefined && user.team2 !== null ? user.team2 : "-", "</span>") : "<span>**</span><img src=\"https://fav-prom.com/html/goals-or-zeroes/img/vs.png\" alt=\"vs\"><span>**</span>", "\n    </div>\n    \n            <div class=\"table__row-item\" >*****</div>\n            <div class=\"table__row-item\" >*****</div>\n");
    if (isCurrentUser) {
      additionalUserRow.classList.add("you");
      additionalUserRow.innerHTML = "\n        <div class=\"table__row-item\">".concat(isCurrentUser ? user.userid : maskUserId(user.userid), "</div>\n        <div class=\"table__row-item\">\n            <span>").concat(user.team1 !== undefined && user.team1 !== null ? user.team1 : "-", "</span><img src=\"https://fav-prom.com/html/goals-or-zeroes/img/vs.png\" alt=\"vs\"><span>").concat(user.team2 !== undefined && user.team2 !== null ? user.team2 : "-", "</span>\n        </div>\n        <div class=\"table__row-item\" >*****</div>\n        <div class=\"table__row-item\" >*****</div>\n    ");
      var youBlock = document.createElement('div');
      youBlock.classList.add('table__row-you');
      youBlock.setAttribute('data-translate', 'tableYou');
      // youBlock.textContent = "You";
      additionalUserRow.insertBefore(youBlock, additionalUserRow.children[1]);
    }
    table.append(additionalUserRow);
  }
  function maskUserId(userId) {
    return "**" + userId.toString().slice(2);
  }

  // 3D anim
  var cards = document.querySelectorAll(".team, .animCard, .animRight"); // Добавляем .animRight
  var angle = 0;
  function animateCards() {
    angle += 0.9; // speed
    var rotateX = Math.sin(angle * (Math.PI / 180)) * 10; // Колебание по X
    var rotateY = Math.cos(angle * (Math.PI / 180)) * 10; // Колебание по Y

    cards.forEach(function (card) {
      if (card.classList.contains("animRight")) {
        card.style.transform = "rotateY(".concat(-rotateY, "deg) rotateX(").concat(-rotateX, "deg)");
      } else {
        card.style.transform = "rotateY(".concat(rotateY, "deg) rotateX(").concat(rotateX, "deg)");
      }
    });
    requestAnimationFrame(animateCards);
  }
  animateCards();

  // predict tabs
  var tabs = document.querySelectorAll('.predict__tabs-global > div, .predict__tabs-dates > div');
  var containers = document.querySelectorAll('.predict__container');
  function handleTabClick(event) {
    var matchDate;
    var currentMatch = 1;
    var clickedTab = event.target.closest(".predict__tabs-date") || event.target.closest(".predict__tabs-goal") || event.target.closest(".predict__tabs-score");
    var tabPair = clickedTab.closest('.predict__tabs-global') || clickedTab.closest('.predict__tabs-dates');
    if (currentMatch === 1) {
      matchDate = FIRST_MATCH_DATE;
    }
    if (currentDate > matchDate) {
      placeBetBtn.classList.add("_lock");
    } else {
      placeBetBtn.classList.remove("_lock");
    }
    if (clickedTab.classList.contains('active')) return;
    if (tabPair) {
      var pair = tabPair.querySelectorAll('.active');
      if (pair.length > 0) {
        pair[0].classList.remove('active');
      }
    }
    clickedTab.classList.add('active');
    updateContainers();
    // refreshBetInfo(userId)
    if (clickedTab.closest('.predict__tabs-score')) {
      updateTopForecasts(currentMatch);
      currentBet = new Bet(userId, currentMatch);
      matchNumber = 1;
      document.querySelectorAll(".predict__team-number").forEach(function (score, i) {
        // console.log(matchDate, matchNumber)
        if (currentDate > matchDate && i === 1 && matchNumber === 1) {
          score.textContent = "0";
        } else if (currentDate > matchDate && i === 0 && matchNumber === 1) {
          score.textContent = "0";
        }
      });
      document.querySelectorAll('input[type="radio"]:checked').forEach(function (button) {
        button.checked = false;
      });
    }
    lockMatchContainer(FIRST_MATCH_DATE, 1); // Для першого матчу
  }

  tabs.forEach(function (tab) {
    return tab.addEventListener('click', handleTabClick);
  });
  function updateContainers() {
    containers.forEach(function (container) {
      return container.classList.remove('active');
    });
    refreshBetInfo(userId);
    var isScoreTabActive = document.querySelector('.predict__tabs-score.active');
    var isGoalTabActive = document.querySelector('.predict__tabs-goal.active');
    if (isScoreTabActive) {
      if (showTopForecast) topForecast.classList.remove("hide");
      document.querySelector('.predict__container.score-1').classList.add('active');
      document.querySelector('.predict__tabs-txt-2').classList.add('hide');
      document.querySelector('.predict__tabs-txt-1').classList.remove('hide');
    } else if (isGoalTabActive) {
      if (showTopForecast) topForecast.classList.add("hide");
      document.querySelector('.predict__tabs-txt-1').classList.add('hide');
      document.querySelector('.predict__tabs-txt-2').classList.remove('hide');
      document.querySelector('.predict__container.goal-1').classList.add('active');
    }
  }

  //score

  function scoreInit(btn) {
    var teamControl = btn.closest('.predict__team-control');
    var teamNumber = teamControl.querySelector('.predict__team-number');
    var matchContainer = btn.closest('.predict__container');
    var matchNumber = parseInt(matchContainer.dataset.matchNumber);
    var getGoals = function getGoals(team) {
      var element = matchContainer.querySelector("[data-team=\"".concat(team, "\"] .predict__team-number"));
      return element ? Number(element.textContent) || 0 : 0;
    };
    var team1Goals = getGoals('team1');
    var team2Goals = getGoals('team2');

    // console.log(team1Goals, team2Goals)

    updateScore(matchNumber, team1Goals, team2Goals);
  }

  //table tabs
  // document.querySelectorAll('.table__tabs-date').forEach(tab => {
  //     tab.addEventListener('click', function() {
  //         if (this.classList.contains('active')) {
  //             return;
  //         }
  //         document.querySelectorAll('.table__tabs-date').forEach(tab => tab.classList.remove('active'));
  //         this.classList.add('active');
  //         currentTabTable = Number(document.querySelector(".table__tabs-date.active").getAttribute("data-match-number"))
  //         renderUsers();
  //     });
  // });

  //popups

  function setPopups(triggerButtons, popupClass) {
    var popupsContainer = document.querySelector('.popups');
    var popup = document.querySelector(".popups__item.".concat(popupClass));
    var popupBtn = popupsContainer.querySelector(".popups__item-btn");
    if (!triggerButtons || !popup || !popupsContainer) return;
    triggerButtons.forEach(function (triggerButton) {
      triggerButton.addEventListener('click', function () {
        popupsContainer.classList.remove('_opacity');
        popupsContainer.classList.add(popupClass);
        document.body.style.overflow = 'hidden';
      });
    });
    var closeButton = popup.querySelector('.popups__item-close');
    var btnClose = popup.querySelector('.btn-close');
    popupsContainer.addEventListener("click", function (e) {
      if (e.target === popupsContainer || e.target === closeButton || e.target === btnClose) {
        closePopup();
      }
    });
    function closePopup() {
      popupsContainer.classList.add('_opacity');
      popupsContainer.classList.remove(popupClass);
      document.body.style.overflow = '';
    }
    // console.log(popupBtn)
    popupBtn.addEventListener("click", function (e) {
      closePopup();
    });
  }
  setPopups(document.querySelectorAll('.gide__list-btn'), 'gidePopup');
  setPopups(document.querySelectorAll('.predict__btn.took-part'), '_confirmPopup');

  //go to predict
  document.querySelector(".toPredict").addEventListener('click', function () {
    var targetElement = document.getElementById("predict");
    var targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 2;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  });
  var radioContainers = document.querySelectorAll('.predict__radio');
  radioContainers.forEach(function (container) {
    var radioInputs = container.querySelectorAll('.predict__radio-item');
    radioInputs.forEach(function (radio) {
      radio.addEventListener('change', function () {
        radioInputs.forEach(function (item) {
          return item.classList.remove('_active');
        });
        this.classList.add('_active');
        updateFirstGoal(matchNumber, this.querySelector("input").value);
      });
    });
  });
  var clickStats = JSON.parse(sessionStorage.getItem('clickStats')) || [];
  function clickTracking(event) {
    var clickName = event.currentTarget.getAttribute('data-click-name');
    var clickDrop = event.currentTarget.getAttribute('data-click-drop');
    if (!clickName) return;
    if (clickDrop) {
      var isAuth = !!userId;
      var existingItem = clickStats.find(function (item) {
        return item.clickedItem === clickName && item.auth === isAuth;
      });
      if (existingItem) {
        existingItem.counter += 1;
      } else {
        clickStats.push({
          clickedItem: clickName,
          counter: 1,
          auth: isAuth
        });
      }
    } else {
      var _existingItem = clickStats.find(function (item) {
        return item.clickedItem === clickName;
      });
      if (_existingItem) {
        _existingItem.counter += 1;
      } else {
        clickStats.push({
          clickedItem: clickName,
          counter: 1
        });
      }
    }
    sessionStorage.setItem('clickStats', JSON.stringify(clickStats));
  }
  function initClickTracking() {
    var clickableElements = document.querySelectorAll('[data-click-name]');
    clickableElements.forEach(function (el) {
      el.addEventListener('click', clickTracking);
    });
  }
  function removeClickTracking() {
    var clickableElements = document.querySelectorAll('[data-click-name]');
    clickableElements.forEach(function (el) {
      el.removeEventListener('click', clickTracking);
    });
  }
  function sendClickStats() {
    var storedStats = JSON.parse(sessionStorage.getItem('clickStats'));
    if (!storedStats || storedStats.length === 0) return;

    // console.log(JSON.stringify( storedStats))

    fetch("".concat(apiURL, "/click-stat"), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(storedStats)
    }).then(function (response) {
      if (response.ok) {
        clickStats = [];
        sessionStorage.removeItem('clickStats');
        // console.log('Кліки успішно відправлено й очищено');
      } else {
        console.error('Помилка при відправці кліків');
      }
    })["catch"](function (error) {
      console.error('Помилка зʼєднання:', error);
    });
  }
  setInterval(sendClickStats, 10000);
  loadTranslations().then(init);

  // Нова функція для обробки кліків на кнопки +/-
  function handleTeamControlClick(e) {
    var btn = e.target.closest('.predict__team-increase, .predict__team-decrease');
    if (!btn) return;
    if (window.counterClick > 1) {
      return;
    } else {
      var teamControl = btn.closest('.predict__team-control');
      var teamNumber = teamControl.querySelector('.predict__team-number');
      var matchContainer = btn.closest('.predict__container');
      var value = parseInt(teamNumber.textContent);
      if (btn.classList.contains('predict__team-increase')) {
        value += 1;
      } else if (value > 0) {
        value -= 1;
      }
      teamNumber.textContent = "".concat(value);
      scoreInit(btn);
      window.counterClick += 1;
      btn.style.pointerEvents = 'none';
      setTimeout(function () {
        window.counterClick = 1;
        btn.style.pointerEvents = 'initial';
      }, 200);
    }
  }
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsid2luZG93IiwiY291bnRlckNsaWNrIiwiYXBpVVJMIiwidW5hdXRoTXNncyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsInlvdUFyZUluQnRucyIsIm1haW5QYWdlIiwicXVlcnlTZWxlY3RvciIsInJlc3VsdHNUYWJsZSIsInJlc3VsdHNUYWJsZU90aGVyIiwicGxhY2VCZXRCdG4iLCJsYXN0UHJlZGljdCIsInRvcEZvcmVjYXN0IiwiY3VycmVudFRhYiIsImN1cnJlbnRUYWJUYWJsZSIsIm1hdGNoTnVtYmVyIiwic2hvd1RvcEZvcmVjYXN0IiwiRklSU1RfTUFUQ0hfREFURSIsIkRhdGUiLCJjdXJyZW50RGF0ZSIsImxvY2tNYXRjaENvbnRhaW5lciIsIm1hdGNoRGF0ZSIsImNvbnRhaW5lcnMiLCJmb3JFYWNoIiwiY29udGFpbmVyIiwiY2xhc3NMaXN0IiwiYWRkIiwic2V0SW50ZXJ2YWwiLCJCZXQiLCJ1c2VySWQiLCJ0ZWFtMUdvYWxzIiwidGVhbTJHb2FscyIsImZpcnN0R29hbCIsInVzZXJpZCIsInRlYW0xIiwidGVhbTIiLCJ1bmRlZmluZWQiLCJnb2Fsc1VwZGF0ZWQiLCJmaXJzdEdvYWxVcGRhdGVkIiwiY2FjaGUiLCJwcmVkaWN0RGF0YSIsInRyYW5zbGF0ZVN0YXRlIiwiZGVidWciLCJsb2NhbGUiLCJ1a0xlbmciLCJlbkxlbmciLCJpMThuRGF0YSIsImN1cnJlbnRCZXQiLCJyZXF1ZXN0IiwibGluayIsImV4dHJhT3B0aW9ucyIsImZldGNoIiwiaGVhZGVycyIsInRoZW4iLCJyZXMiLCJvayIsIkVycm9yIiwianNvbiIsImVyciIsImNvbnNvbGUiLCJlcnJvciIsInJlcG9ydEVycm9yIiwic3R5bGUiLCJkaXNwbGF5IiwibG9jYXRpb24iLCJocmVmIiwic3RhcnRzV2l0aCIsIlByb21pc2UiLCJyZWplY3QiLCJyZXBvcnREYXRhIiwib3JpZ2luIiwiZXJyb3JUZXh0IiwidGV4dCIsIm1lc3NhZ2UiLCJ0eXBlIiwibmFtZSIsInN0YWNrIiwibWV0aG9kIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJ3YXJuIiwiZ2V0TGFzdEJldCIsImJldHMiLCJmaW5kIiwiYmV0IiwicmVmcmVzaEJldEluZm8iLCJzY29yZTEiLCJzY29yZTIiLCJnb2FsMSIsImdvYWwyIiwiZGF0YSIsImJldEF2YWlsYWJsZSIsInNvbWUiLCJsYXN0VGVhbTEiLCJsYXN0VGVhbTIiLCJzY29yZVRlYW0xIiwic2NvcmVUZWFtMiIsInJlbW92ZSIsImxhc3RCZXQiLCJ0ZXh0Q29udGVudCIsImJldENvbmZpcm1lZCIsIml0ZW0iLCJzZXRBdHRyaWJ1dGUiLCJ0cmFuc2xhdGUiLCJjb250YWlucyIsIkluaXRQYWdlIiwiY2hlY2tVc2VyQXV0aCIsInJlbmRlclVzZXJzIiwidXBkYXRlVG9wRm9yZWNhc3RzIiwieW91QXJlSW5CdG4iLCJ1bmF1dGhNZXMiLCJwbGFjZUJldCIsImJ0biIsInNjb3JlSW5pdCIsImFjdGl2ZVRhYnMiLCJyZXEiLCJ0YWIiLCJhY3RpdmVJbnB1dCIsInZhbHVlIiwic2Vzc2lvblN0b3JhZ2UiLCJzZXRJdGVtIiwiZ2V0SXRlbSIsImxvYWRUcmFuc2xhdGlvbnMiLCJtdXRhdGlvbk9ic2VydmVyIiwiTXV0YXRpb25PYnNlcnZlciIsIm11dGF0aW9ucyIsIm9ic2VydmUiLCJnZXRFbGVtZW50QnlJZCIsImNoaWxkTGlzdCIsInN1YnRyZWUiLCJlbGVtcyIsImVsZW0iLCJrZXkiLCJnZXRBdHRyaWJ1dGUiLCJpbm5lckhUTUwiLCJyZW1vdmVBdHRyaWJ1dGUiLCJsb2ciLCJyZWZyZXNoTG9jYWxpemVkQ2xhc3MiLCJlbGVtZW50IiwibGFuZyIsIlBsYWNlQmV0QnV0dG9uQ2xpY2siLCJlIiwicHJldmVudERlZmF1bHQiLCJpbml0IiwiaW5pdENsaWNrVHJhY2tpbmciLCJzdG9yZSIsInN0YXRlIiwiZ2V0U3RhdGUiLCJhdXRoIiwiaXNBdXRob3JpemVkIiwiaWQiLCJjIiwiaSIsImdfdXNlcl9pZCIsImNsZWFySW50ZXJ2YWwiLCJhZGRFdmVudExpc3RlbmVyIiwidGVhbUVsIiwiaW5kZXgiLCJ0ZWFtTnVtYmVyIiwiY29udHJvbEhUTUwiLCJpbnNlcnRBZGphY2VudEhUTUwiLCJoYW5kbGVUZWFtQ29udHJvbENsaWNrIiwidXBkYXRlU2NvcmUiLCJ1cGRhdGVHb2FscyIsInVwZGF0ZUZpcnN0R29hbCIsImZvcmVjYXN0c0NvbnRhaW5lciIsInRvcEZvcmVjYXN0cyIsImZvcmVjYXN0IiwiZm9yZWNhc3RJdGVtIiwiY3JlYXRlRWxlbWVudCIsInBlcmNlbnRhZ2UiLCJwYXJzZUZsb2F0IiwidG9GaXhlZCIsInBlcmNlbnRhZ2VTcGFuIiwiZm9yZWNhc3RUZXh0IiwiY3JlYXRlVGV4dE5vZGUiLCJhcHBlbmRDaGlsZCIsInVzZXJzIiwiaXNTY29yZVRhYkFjdGl2ZSIsImlzR29hbFRhYkFjdGl2ZSIsImxlbmd0aCIsInBvcHVsYXRlVXNlcnNUYWJsZSIsImN1cnJlbnRVc2VySWQiLCJjdXJyZW50VXNlciIsInVzZXIiLCJkaXNwbGF5VXNlciIsImlzQ3VycmVudFVzZXIiLCJ0YWJsZSIsImFsbFVzZXJzIiwiYWRkaXRpb25hbFVzZXJSb3ciLCJtYXNrVXNlcklkIiwieW91QmxvY2siLCJpbnNlcnRCZWZvcmUiLCJjaGlsZHJlbiIsImFwcGVuZCIsInRvU3RyaW5nIiwic2xpY2UiLCJjYXJkcyIsImFuZ2xlIiwiYW5pbWF0ZUNhcmRzIiwicm90YXRlWCIsIk1hdGgiLCJzaW4iLCJQSSIsInJvdGF0ZVkiLCJjb3MiLCJjYXJkIiwidHJhbnNmb3JtIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwidGFicyIsImhhbmRsZVRhYkNsaWNrIiwiZXZlbnQiLCJjdXJyZW50TWF0Y2giLCJjbGlja2VkVGFiIiwidGFyZ2V0IiwiY2xvc2VzdCIsInRhYlBhaXIiLCJwYWlyIiwidXBkYXRlQ29udGFpbmVycyIsInNjb3JlIiwiYnV0dG9uIiwiY2hlY2tlZCIsInRlYW1Db250cm9sIiwibWF0Y2hDb250YWluZXIiLCJwYXJzZUludCIsImRhdGFzZXQiLCJnZXRHb2FscyIsInRlYW0iLCJOdW1iZXIiLCJzZXRQb3B1cHMiLCJ0cmlnZ2VyQnV0dG9ucyIsInBvcHVwQ2xhc3MiLCJwb3B1cHNDb250YWluZXIiLCJwb3B1cCIsInBvcHVwQnRuIiwidHJpZ2dlckJ1dHRvbiIsIm92ZXJmbG93IiwiY2xvc2VCdXR0b24iLCJidG5DbG9zZSIsImNsb3NlUG9wdXAiLCJ0YXJnZXRFbGVtZW50IiwidGFyZ2V0UG9zaXRpb24iLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ0b3AiLCJwYWdlWU9mZnNldCIsInNjcm9sbFRvIiwiYmVoYXZpb3IiLCJyYWRpb0NvbnRhaW5lcnMiLCJyYWRpb0lucHV0cyIsInJhZGlvIiwiY2xpY2tTdGF0cyIsInBhcnNlIiwiY2xpY2tUcmFja2luZyIsImNsaWNrTmFtZSIsImN1cnJlbnRUYXJnZXQiLCJjbGlja0Ryb3AiLCJpc0F1dGgiLCJleGlzdGluZ0l0ZW0iLCJjbGlja2VkSXRlbSIsImNvdW50ZXIiLCJwdXNoIiwiY2xpY2thYmxlRWxlbWVudHMiLCJlbCIsInJlbW92ZUNsaWNrVHJhY2tpbmciLCJyZW1vdmVFdmVudExpc3RlbmVyIiwic2VuZENsaWNrU3RhdHMiLCJzdG9yZWRTdGF0cyIsInJlc3BvbnNlIiwicmVtb3ZlSXRlbSIsInBvaW50ZXJFdmVudHMiLCJzZXRUaW1lb3V0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUNBLENBQUMsWUFBWTtFQUNUO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0VBRUFBLE1BQU0sQ0FBQ0MsWUFBWSxHQUFHLENBQUM7RUFFdkIsSUFBTUMsTUFBTSxHQUFHLDRDQUE0QztJQUN2REMsVUFBVSxHQUFHQyxRQUFRLENBQUNDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQztJQUNyREMsWUFBWSxHQUFHRixRQUFRLENBQUNDLGdCQUFnQixDQUFDLFlBQVksQ0FBQztJQUN0REUsUUFBUSxHQUFHSCxRQUFRLENBQUNJLGFBQWEsQ0FBQyxXQUFXLENBQUM7SUFDOUND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Q0FBQztJQUNoRixJQUFJLENBQUN2RyxHQUFHLEVBQUU7SUFDVixJQUFHbEgsTUFBTSxDQUFDQyxZQUFZLEdBQUcsQ0FBQyxFQUFDO01BQ3ZCO0lBQ0osQ0FBQyxNQUFJO01BQ0QsSUFBTStOLFdBQVcsR0FBRzlHLEdBQUcsQ0FBQ3VHLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQztNQUN6RCxJQUFNekQsVUFBVSxHQUFHZ0UsV0FBVyxDQUFDeE4sYUFBYSxDQUFDLHVCQUF1QixDQUFDO01BQ3JFLElBQU15TixjQUFjLEdBQUcvRyxHQUFHLENBQUN1RyxPQUFPLENBQUMscUJBQXFCLENBQUM7TUFFekQsSUFBSWpHLEtBQUssR0FBRzBHLFFBQVEsQ0FBQ2xFLFVBQVUsQ0FBQzNELFdBQVcsQ0FBQztNQUM1QyxJQUFJYSxHQUFHLENBQUN4RixTQUFTLENBQUNnRixRQUFRLENBQUMsd0JBQXdCLENBQUMsRUFBRTtRQUNsRGMsS0FBSyxJQUFJLENBQUM7TUFDZCxDQUFDLE1BQU0sSUFBSUEsS0FBSyxHQUFHLENBQUMsRUFBRTtRQUNsQkEsS0FBSyxJQUFJLENBQUM7TUFDZDtNQUNBd0MsVUFBVSxDQUFDM0QsV0FBVyxhQUFNbUIsS0FBSyxDQUFFO01BQ25DTCxTQUFTLENBQUNELEdBQUcsQ0FBQztNQUNkbEgsTUFBTSxDQUFDQyxZQUFZLElBQUksQ0FBQztNQUN4QmlILEdBQUcsQ0FBQ25ELEtBQUssQ0FBQ2dOLGFBQWEsR0FBRyxNQUFNO01BQ2hDQyxVQUFVLENBQUMsWUFBSztRQUNaaFIsTUFBTSxDQUFDQyxZQUFZLEdBQUcsQ0FBQztRQUN2QmlILEdBQUcsQ0FBQ25ELEtBQUssQ0FBQ2dOLGFBQWEsR0FBRyxTQUFTO01BQ3ZDLENBQUMsRUFBRSxHQUFHLENBQUM7SUFDWDtFQUlKO0FBSUosQ0FBQyxHQUFHIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbihmdW5jdGlvbiAoKSB7XG4gICAgLy8gaWYgKHdpbmRvdy5wcm9tb0luaXQpIHtcbiAgICAvLyAgICAgd2luZG93LnByb21vSW5pdCA9IGZhbHNlXG4gICAgLy8gICAgIHJldHVybjtcbiAgICAvLyB9XG4gICAgLy8gd2luZG93LnByb21vSW5pdCA9IHRydWU7XG5cbiAgICB3aW5kb3cuY291bnRlckNsaWNrID0gMVxuXG4gICAgY29uc3QgYXBpVVJMID0gJ2h0dHBzOi8vZmF2LXByb20uY29tL2FwaV9mb290YmFsbF9zaGFraHRhcicsXG4gICAgICAgIHVuYXV0aE1zZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudW5hdXRoLW1zZycpLFxuICAgICAgICB5b3VBcmVJbkJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9vay1wYXJ0JyksXG4gICAgICAgIG1haW5QYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mYXYtcGFnZVwiKSxcbiAgICAgICAgcmVzdWx0c1RhYmxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Jlc3VsdHMtdGFibGUnKSxcbiAgICAgICAgcmVzdWx0c1RhYmxlT3RoZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVzdWx0cy10YWJsZS1vdGhlcicpLFxuICAgICAgICBwbGFjZUJldEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJlZGljdC1idG5cIiksXG4gICAgICAgIGxhc3RQcmVkaWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmVkaWN0X19sYXN0XCIpLFxuICAgICAgICB0b3BGb3JlY2FzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9wRm9yZWNhc3RcIilcblxuICAgIGxldCBjdXJyZW50VGFiID0gMVxuICAgIGxldCBjdXJyZW50VGFiVGFibGUgPSAxXG4gICAgbGV0IG1hdGNoTnVtYmVyID0gMVxuICAgIGxldCBzaG93VG9wRm9yZWNhc3QgPSBmYWxzZVxuXG4gICAgLy8gY29uc3QgRklSU1RfTUFUQ0hfREFURSA9IG5ldyBEYXRlKCcyMDI1LTA0LTI3VDE3OjMwOjAwJykgLy8g0LTQsNGC0LAg0LzQsNGC0YfRgyAtIDMw0YXQsiDRgdC/0YDQsNCy0LbQvdGPINC00LDRgtCwXG4gICAgY29uc3QgRklSU1RfTUFUQ0hfREFURSA9IG5ldyBEYXRlKCcyMDI1LTA0LTI3VDE3OjMwOjAwJykgLy8g0LTQsNGC0LAg0LzQsNGC0YfRgyAtIDMw0YXQslxuICAgIGNvbnN0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKVxuXG4gICAgZnVuY3Rpb24gbG9ja01hdGNoQ29udGFpbmVyKG1hdGNoRGF0ZSwgbWF0Y2hOdW1iZXIpIHtcbiAgICAgICAgaWYgKG5ldyBEYXRlKCkgPiBtYXRjaERhdGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAucHJlZGljdF9fY29udGFpbmVyW2RhdGEtbWF0Y2gtbnVtYmVyPVwiJHttYXRjaE51bWJlcn1cIl1gKTtcblxuICAgICAgICAgICAgY29udGFpbmVycy5mb3JFYWNoKGNvbnRhaW5lciA9PiB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ19sb2NrJyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcGxhY2VCZXRCdG4uY2xhc3NMaXN0LmFkZChcIl9sb2NrXCIpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsb2NrTWF0Y2hDb250YWluZXIoRklSU1RfTUFUQ0hfREFURSwgMSk7IC8vINCU0LvRjyDQv9C10YDRiNC+0LPQviDQvNCw0YLRh9GDXG5cbiAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKTsgLy8g0J7QvdC+0LLQuNGC0Lgg0L/QvtGC0L7Rh9C90YMg0LTQsNGC0YNcbiAgICAgICAgbG9ja01hdGNoQ29udGFpbmVyKEZJUlNUX01BVENIX0RBVEUsIDEpO1xuICAgIH0sIDYwMDAwMCk7IC8vINCe0L3QvtCy0LvRjtCy0LDRgtC4INC60L7QttC90ZYgMTAg0YXQslxuXG4gICAgY2xhc3MgQmV0IHtcbiAgICAgICAgY29uc3RydWN0b3IodXNlcklkLCBtYXRjaE51bWJlciwgdGVhbTFHb2FscyA9IDAsIHRlYW0yR29hbHMgPSAwLCBmaXJzdEdvYWwpIHtcbiAgICAgICAgICAgIGlmKHVzZXJJZCAhPT0gbnVsbCkgdGhpcy51c2VyaWQgPSB1c2VySWQ7XG4gICAgICAgICAgICB0aGlzLm1hdGNoTnVtYmVyID0gbWF0Y2hOdW1iZXI7XG4gICAgICAgICAgICB0aGlzLnRlYW0xID0gdGVhbTFHb2FscztcbiAgICAgICAgICAgIHRoaXMudGVhbTIgPSB0ZWFtMkdvYWxzO1xuICAgICAgICAgICAgaWYoZmlyc3RHb2FsICE9PSB1bmRlZmluZWQpIHRoaXMuZmlyc3RHb2FsID0gZmlyc3RHb2FsO1xuICAgICAgICB9XG5cbiAgICAgICAgdXBkYXRlR29hbHModGVhbTFHb2FscywgdGVhbTJHb2Fscykge1xuICAgICAgICAgICAgaWYgKHRlYW0xR29hbHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMudGVhbTEgPSB0ZWFtMUdvYWxzICE9PSBudWxsID8gdGVhbTFHb2FscyA6IHRoaXMudGVhbTE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGVhbTJHb2FscyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50ZWFtMiA9IHRlYW0yR29hbHMgIT09IG51bGwgPyB0ZWFtMkdvYWxzIDogdGhpcy50ZWFtMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZ29hbHNVcGRhdGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHVwZGF0ZUZpcnN0R29hbChmaXJzdEdvYWwpIHtcbiAgICAgICAgICAgIGlmIChmaXJzdEdvYWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyc3RHb2FsID0gZmlyc3RHb2FsICE9PSBudWxsID8gZmlyc3RHb2FsIDogdGhpcy5maXJzdEdvYWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmZpcnN0R29hbFVwZGF0ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY2FjaGUgPSB7fTtcbiAgICBsZXQgcHJlZGljdERhdGEgPSBbXTtcblxuICAgIGxldCB0cmFuc2xhdGVTdGF0ZSA9IHRydWVcbiAgICBsZXQgZGVidWcgPSBmYWxzZVxuXG4gICAgbGV0IGxvY2FsZSA9IFwiZW5cIlxuXG5cblxuICAgIGNvbnN0IHVrTGVuZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1a0xlbmcnKTtcbiAgICBjb25zdCBlbkxlbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZW5MZW5nJyk7XG5cblxuICAgIGxldCBpMThuRGF0YSA9IHt9O1xuXG4gICAgbGV0IHVzZXJJZDtcbiAgICAvLyB1c2VySWQgPSAxMDAzMDAyNjg7XG5cbiAgICBsZXQgY3VycmVudEJldDtcblxuICAgIGlmICh1a0xlbmcpIGxvY2FsZSA9ICd1ayc7XG4gICAgaWYgKGVuTGVuZykgbG9jYWxlID0gJ2VuJztcblxuICAgIGNvbnN0IHJlcXVlc3QgPSAobGluaywgZXh0cmFPcHRpb25zKSA9PlxuICAgICAgICBmZXRjaChhcGlVUkwgKyBsaW5rLCB7XG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLi4uKGV4dHJhT3B0aW9ucyB8fCB7fSlcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFyZXMub2spIHRocm93IG5ldyBFcnJvcignQVBJIGVycm9yJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignQVBJIHJlcXVlc3QgZmFpbGVkOicsIGVycik7XG5cbiAgICAgICAgICAgICAgICByZXBvcnRFcnJvcihlcnIpO1xuXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZhdi1wYWdlJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgICAgICBpZiAod2luZG93LmxvY2F0aW9uLmhyZWYuc3RhcnRzV2l0aChcImh0dHBzOi8vd3d3LmZhdmJldC5oci9cIikpIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL3Byb21vY2lqZS9wcm9tb2NpamEvc3R1Yi8nO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9wcm9tb3MvcHJvbW8vc3R1Yi8nO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICBmdW5jdGlvbiByZXBvcnRFcnJvcihlcnIpIHtcbiAgICAgICAgY29uc3QgcmVwb3J0RGF0YSA9IHtcbiAgICAgICAgICAgIG9yaWdpbjogd2luZG93LmxvY2F0aW9uLmhyZWYsXG4gICAgICAgICAgICB1c2VyaWQ6IHVzZXJJZCxcbiAgICAgICAgICAgIGVycm9yVGV4dDogZXJyPy5lcnJvciB8fCBlcnI/LnRleHQgfHwgZXJyPy5tZXNzYWdlIHx8ICdVbmtub3duIGVycm9yJyxcbiAgICAgICAgICAgIHR5cGU6IGVycj8ubmFtZSB8fCAnVW5rbm93bkVycm9yJyxcbiAgICAgICAgICAgIHN0YWNrOiBlcnI/LnN0YWNrIHx8ICcnXG4gICAgICAgIH07XG5cbiAgICAgICAgZmV0Y2goJ2h0dHBzOi8vZmF2LXByb20uY29tL2FwaS1jbXMvcmVwb3J0cy9hZGQnLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocmVwb3J0RGF0YSlcbiAgICAgICAgfSkuY2F0Y2goY29uc29sZS53YXJuKTtcbiAgICB9XG5cbiAgICBjb25zdCBnZXRMYXN0QmV0ID0gKGJldHMsIG1hdGNoTnVtYmVyKSA9PntcbiAgICAgICAgaWYoIWJldHMpIHJldHVybiBmYWxzZVxuICAgICAgICByZXR1cm4gYmV0cy5maW5kKGJldCA9PiBiZXQubWF0Y2hOdW1iZXIgPT09IG1hdGNoTnVtYmVyKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWZyZXNoQmV0SW5mbyh1c2VySWQpIHtcbiAgICAgICAgY29uc3Qgc2NvcmUxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zY29yZS0xXCIpXG4gICAgICAgIGNvbnN0IHNjb3JlMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2NvcmUtMlwiKVxuICAgICAgICBjb25zdCBnb2FsMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ29hbC0xXCIpXG4gICAgICAgIGNvbnN0IGdvYWwyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nb2FsLTJcIilcblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhtYXRjaE51bWJlcilcblxuICAgICAgICByZXF1ZXN0KGAvZmF2dXNlci8ke3VzZXJJZH1gLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnXG4gICAgICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBpZihkYXRhLmJldHMpe1xuICAgICAgICAgICAgICAgIGNvbnN0IGJldEF2YWlsYWJsZSA9IGRhdGEuYmV0cy5zb21lKGJldCA9PntcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJldC5tYXRjaE51bWJlciA9PT0gbWF0Y2hOdW1iZXJcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGJldEF2YWlsYWJsZSlcbiAgICAgICAgICAgICAgICBjb25zdCBsYXN0VGVhbTEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByZWRpY3RfX2xhc3QtdGVhbS50ZWFtMVwiKTtcbiAgICAgICAgICAgICAgICBjb25zdCBsYXN0VGVhbTIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByZWRpY3RfX2xhc3QtdGVhbS50ZWFtMlwiKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzY29yZVRlYW0xID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zY29yZVRlYW0xXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNjb3JlVGVhbTIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNjb3JlVGVhbTJcIik7XG4gICAgICAgICAgICAgICAgY29uc3QgZmlyc3RHb2FsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmVkaWN0X19sYXN0LWNvdW50cnlcIik7XG4gICAgICAgICAgICAgICAgaWYoYmV0QXZhaWxhYmxlKXtcbiAgICAgICAgICAgICAgICAgICAgbGFzdFByZWRpY3QuY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIilcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFzdEJldCA9IGdldExhc3RCZXQoZGF0YS5iZXRzLCBtYXRjaE51bWJlcik7XG4gICAgICAgICAgICAgICAgICAgIHNjb3JlVGVhbTEudGV4dENvbnRlbnQgPSBsYXN0QmV0LnRlYW0xID09PSB1bmRlZmluZWQgPyBcIi1cIiA6YCR7bGFzdEJldC50ZWFtMX1gO1xuICAgICAgICAgICAgICAgICAgICBzY29yZVRlYW0yLnRleHRDb250ZW50ID0gbGFzdEJldC50ZWFtMiA9PT0gdW5kZWZpbmVkID8gXCItXCIgOmAke2xhc3RCZXQudGVhbTJ9YDtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cobGFzdEJldClcblxuICAgICAgICAgICAgICAgICAgICBpZiAobGFzdEJldC5iZXRDb25maXJtZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJlZGljdF9fbGFzdC1yZXN1bHQudW5jb25maXJtZWRcIikuZm9yRWFjaChpdGVtID0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByZWRpY3RfX2xhc3QtcmVzdWx0LmNvbmZpcm1lZFwiKS5mb3JFYWNoKGl0ZW0gPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJlZGljdF9fbGFzdC1yZXN1bHQudW5jb25maXJtZWRcIikuZm9yRWFjaChpdGVtID0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByZWRpY3RfX2xhc3QtcmVzdWx0LmNvbmZpcm1lZFwiKS5mb3JFYWNoKGl0ZW0gPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChsYXN0QmV0Lm1hdGNoTnVtYmVyID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0VGVhbTEuc2V0QXR0cmlidXRlKFwiZGF0YS10cmFuc2xhdGVcIiwgXCJzaGFraHRhclwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RUZWFtMi5zZXRBdHRyaWJ1dGUoXCJkYXRhLXRyYW5zbGF0ZVwiLCBcImR5bmFtb1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoc2NvcmUxLmNsYXNzTGlzdC5jb250YWlucyhcImFjdGl2ZVwiKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByZWRpY3RfX2xhc3Qtc2NvcmVcIikuY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJlZGljdF9fbGFzdC1nb2FsXCIpLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZihnb2FsMS5jbGFzc0xpc3QuY29udGFpbnMoXCJhY3RpdmVcIikpe1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmVkaWN0X19sYXN0LXNjb3JlXCIpLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByZWRpY3RfX2xhc3QtZ29hbFwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVwiKVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYobGFzdEJldC5maXJzdEdvYWwpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYobGFzdEJldC5maXJzdEdvYWwgPT09IFwic2hha2h0YXJcIil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RHb2FsLnNldEF0dHJpYnV0ZShcImRhdGEtdHJhbnNsYXRlXCIsIFwic2hha2h0YXJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihsYXN0QmV0LmZpcnN0R29hbCA9PT0gXCJkeW5hbW9cIil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RHb2FsLnNldEF0dHJpYnV0ZShcImRhdGEtdHJhbnNsYXRlXCIsIFwiZHluYW1vXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobGFzdEJldC5maXJzdEdvYWwgPT09IFwiZHJhd1wiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdEdvYWwuc2V0QXR0cmlidXRlKFwiZGF0YS10cmFuc2xhdGVcIiwgXCJkcmF3XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZ29hbDEuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlXCIpIHx8IGdvYWwyLmNsYXNzTGlzdC5jb250YWlucyhcImFjdGl2ZVwiKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmVkaWN0X19sYXN0XCIpLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZighYmV0QXZhaWxhYmxlKXtcbiAgICAgICAgICAgICAgICAgICAgbGFzdFByZWRpY3QuY2xhc3NMaXN0LmFkZChcImhpZGVcIilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBsYXN0UHJlZGljdC5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvcjonLCBlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zdCBJbml0UGFnZSA9ICgpID0+IHtcbiAgICAgICAgY2hlY2tVc2VyQXV0aCgpO1xuICAgICAgICByZW5kZXJVc2VycygpO1xuICAgICAgICB1cGRhdGVUb3BGb3JlY2FzdHMoY3VycmVudFRhYilcbiAgICAgICAgcmVmcmVzaEJldEluZm8odXNlcklkKVxuICAgIH1cblxuICAgIGxldCBjaGVja1VzZXJBdXRoID0gKCkgPT4ge1xuICAgICAgICBpZiAodXNlcklkKSB7XG4gICAgICAgICAgICB5b3VBcmVJbkJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpKTtcbiAgICAgICAgICAgIHVuYXV0aE1zZ3MuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LmFkZCgnaGlkZScpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobGV0IHlvdUFyZUluQnRuIG9mIHlvdUFyZUluQnRucykge1xuICAgICAgICAgICAgICAgIHlvdUFyZUluQnRuLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoY29uc3QgdW5hdXRoTWVzIG9mIHVuYXV0aE1zZ3MpIHtcbiAgICAgICAgICAgICAgICB1bmF1dGhNZXMuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHBsYWNlQmV0KGJldCkge1xuICAgICAgICBpZiAoIXVzZXJJZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJlZGljdF9fY29udGFpbmVyLmFjdGl2ZVwiKVxuICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcmVkaWN0X190ZWFtLWluY3JlYXNlLCAucHJlZGljdF9fdGVhbS1kZWNyZWFzZScpXG4gICAgICAgICAgICAuZm9yRWFjaChidG4gPT4ge1xuICAgICAgICAgICAgICAgIHNjb3JlSW5pdChidG4pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgYWN0aXZlVGFicyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ29hbENvbnRcIilcbiAgICAgICAgLy8gY29uc3QgYWN0aXZlSW5wdXQgPSBhY3RpdmVUYWIucXVlcnlTZWxlY3RvcihcIi5wcmVkaWN0X19yYWRpby1pdGVtIGlucHV0XCIpXG5cblxuXG4gICAgICAgIGxldCByZXEgPSB7XG4gICAgICAgICAgICBtYXRjaE51bWJlcjogYmV0Lm1hdGNoTnVtYmVyLFxuICAgICAgICAgICAgdXNlcmlkOiBiZXQudXNlcmlkLFxuICAgICAgICB9O1xuXG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coYWN0aXZlVGFicylcbiAgICAgICAgZm9yIChjb25zdCB0YWIgb2YgYWN0aXZlVGFicykge1xuICAgICAgICAgICAgaWYgKHRhYi5jbGFzc0xpc3QuY29udGFpbnMoXCJhY3RpdmVcIikpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBhY3RpdmVJbnB1dCA9IHRhYi5xdWVyeVNlbGVjdG9yKFwiLnByZWRpY3RfX3JhZGlvLWl0ZW0uX2FjdGl2ZSBpbnB1dFwiKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0YWIpXG5cbiAgICAgICAgICAgICAgICBpZiAoYWN0aXZlSW5wdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYWN0aXZlSW5wdXQpXG4gICAgICAgICAgICAgICAgICAgIHJlcS5maXJzdEdvYWwgPSBhY3RpdmVJbnB1dC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuXG4gICAgICAgIGlmIChiZXQuZmlyc3RHb2FsVXBkYXRlZCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYmV0LmZpcnN0R29hbClcbiAgICAgICAgICAgIHJlcS5maXJzdEdvYWwgPSBiZXQuZmlyc3RHb2FsO1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYmV0LmdvYWxzVXBkYXRlZCkge1xuICAgICAgICAgICAgcmVxLnRlYW0xID0gYmV0LnRlYW0xO1xuICAgICAgICAgICAgcmVxLnRlYW0yID0gYmV0LnRlYW0yO1xuICAgICAgICB9XG5cblxuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGFjdGl2ZUlucHV0KTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coYWN0aXZlVGFiKVxuXG5cbiAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcImN1cnJlbnRCZXRcIiwgSlNPTi5zdHJpbmdpZnkocmVxKSlcblxuXG4gICAgICAgIHJlcXVlc3QoJy9iZXQnLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGJvZHk6IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJjdXJyZW50QmV0XCIpXG4gICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdCZXQgcGxhY2VkOicsIHJlcyk7XG4gICAgICAgICAgICAgICAgSW5pdFBhZ2UoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcignRXJyb3IgcGxhY2luZyBiZXQ6JywgZXJyb3IpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2FkVHJhbnNsYXRpb25zKCkge1xuICAgICAgICByZXR1cm4gZmV0Y2goYCR7YXBpVVJMfS9uZXctdHJhbnNsYXRlcy8ke2xvY2FsZX1gKS50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgICAgICAgICAgLnRoZW4oanNvbiA9PiB7XG4gICAgICAgICAgICAgICAgaTE4bkRhdGEgPSBqc29uO1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZSgpO1xuICAgICAgICAgICAgICAgIHZhciBtdXRhdGlvbk9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKG11dGF0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBtdXRhdGlvbk9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dvYWxzLW9yLXplcm9zJyksIHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlKCkge1xuICAgICAgICBjb25zdCBlbGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRyYW5zbGF0ZV0nKVxuICAgICAgICBpZih0cmFuc2xhdGVTdGF0ZSl7XG4gICAgICAgICAgICBlbGVtcy5mb3JFYWNoKGVsZW0gPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IGVsZW0uZ2V0QXR0cmlidXRlKCdkYXRhLXRyYW5zbGF0ZScpO1xuICAgICAgICAgICAgICAgIGVsZW0uaW5uZXJIVE1MID0gaTE4bkRhdGFba2V5XSB8fCAnKi0tLS1ORUVEIFRPIEJFIFRSQU5TTEFURUQtLS0tKiAgIGtleTogICcgKyBrZXk7XG4gICAgICAgICAgICAgICAgZWxlbS5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtdHJhbnNsYXRlJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidHJhbnNsYXRpb24gd29ya3MhXCIpXG4gICAgICAgIH1cbiAgICAgICAgcmVmcmVzaExvY2FsaXplZENsYXNzKG1haW5QYWdlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWZyZXNoTG9jYWxpemVkQ2xhc3MoZWxlbWVudCkge1xuICAgICAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGxhbmcgb2YgWyd1aycsICdlbiddKSB7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUobGFuZyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGxvY2FsZSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIFBsYWNlQmV0QnV0dG9uQ2xpY2soZSkge1xuICAgICAgICBcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAoY3VycmVudEJldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjdXJyZW50QmV0ID0gbmV3IEJldCh1c2VySWQsIG1hdGNoTnVtYmVyKTtcbiAgICAgICAgfVxuICAgICAgICBwbGFjZUJldChjdXJyZW50QmV0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICBJbml0UGFnZSgpXG4gICAgICAgIGluaXRDbGlja1RyYWNraW5nKClcbiAgICAgICAgaWYgKHdpbmRvdy5zdG9yZSkge1xuICAgICAgICAgICAgdmFyIHN0YXRlID0gd2luZG93LnN0b3JlLmdldFN0YXRlKCk7XG4gICAgICAgICAgICB1c2VySWQgPSBzdGF0ZS5hdXRoLmlzQXV0aG9yaXplZCAmJiBzdGF0ZS5hdXRoLmlkIHx8ICcnO1xuICAgICAgICAgICAgaWYoIWN1cnJlbnRCZXQpe1xuICAgICAgICAgICAgICAgIGN1cnJlbnRCZXQgPSBuZXcgQmV0KHVzZXJJZCwgbWF0Y2hOdW1iZXIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgYyA9IDA7XG4gICAgICAgICAgICB2YXIgaSA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoYyA8IDUwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghIXdpbmRvdy5nX3VzZXJfaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJZCA9IHdpbmRvdy5nX3VzZXJfaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBJbml0UGFnZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIEluaXRQYWdlKCk7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMjAwKTtcblxuICAgICAgICB9XG4gICAgICAgIHBsYWNlQmV0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgUGxhY2VCZXRCdXR0b25DbGljayk7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zY29yZUNvdW50ZXInKS5mb3JFYWNoKCh0ZWFtRWwsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAoIXRlYW1FbC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fdGVhbS1jb250cm9sJykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0ZWFtTnVtYmVyID0gaW5kZXggKyAxO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRyb2xIVE1MID0gYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByZWRpY3RfX3RlYW0tY29udHJvbFwiIGRhdGEtdGVhbT1cInRlYW0ke3RlYW1OdW1iZXJ9XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByZWRpY3RfX3RlYW0tZGVjcmVhc2UgdGVhbSR7dGVhbU51bWJlcn0tbWludXNcIiByb2xlPVwiYnV0dG9uXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByZWRpY3RfX3RlYW0tbnVtYmVyXCI+MDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcmVkaWN0X190ZWFtLWluY3JlYXNlIHRlYW0ke3RlYW1OdW1iZXJ9LXBsdXNcIiByb2xlPVwiYnV0dG9uXCI+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcblxuICAgICAgICAgICAgICAgIHRlYW1FbC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGNvbnRyb2xIVE1MKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByZWRpY3RfX3RlYW0taW5jcmVhc2UsIC5wcmVkaWN0X190ZWFtLWRlY3JlYXNlJykuZm9yRWFjaChidG4gPT4ge1xuICAgICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlVGVhbUNvbnRyb2xDbGljayk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuICAgIGZ1bmN0aW9uIHVwZGF0ZVNjb3JlKG1hdGNoTnVtYmVyLCB0ZWFtMUdvYWxzLCB0ZWFtMkdvYWxzKSB7XG4gICAgICAgIGlmIChjdXJyZW50QmV0ICYmIGN1cnJlbnRCZXQubWF0Y2hOdW1iZXIgPT09IG1hdGNoTnVtYmVyKSB7XG4gICAgICAgICAgICBjdXJyZW50QmV0LnVwZGF0ZUdvYWxzKHRlYW0xR29hbHMsIHRlYW0yR29hbHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY3VycmVudEJldCA9IG5ldyBCZXQodXNlcklkLCBtYXRjaE51bWJlciwgdGVhbTFHb2FscywgdGVhbTJHb2Fscyk7XG4gICAgICAgICAgICBjdXJyZW50QmV0LnVwZGF0ZUdvYWxzKHRlYW0xR29hbHMsIHRlYW0yR29hbHMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHVwZGF0ZUZpcnN0R29hbChtYXRjaE51bWJlciwgZmlyc3RHb2FsKSB7XG4gICAgICAgIGlmIChjdXJyZW50QmV0ICYmIGN1cnJlbnRCZXQubWF0Y2hOdW1iZXIgPT09IG1hdGNoTnVtYmVyKSB7XG4gICAgICAgICAgICBjdXJyZW50QmV0LnVwZGF0ZUZpcnN0R29hbChmaXJzdEdvYWwpO1xuICAgICAgICB9XG5cbiAgICB9XG4gICAgZnVuY3Rpb24gdXBkYXRlVG9wRm9yZWNhc3RzKG1hdGNoTnVtYmVyKSB7XG4gICAgICAgIHJlcXVlc3QoYC91c2Vycy8ke21hdGNoTnVtYmVyfWApLnRoZW4oZGF0YSA9PiB7XG5cbiAgICAgICAgICAgIGNvbnN0IGZvcmVjYXN0c0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X19mb3JlY2FzdHMnKTtcbiAgICAgICAgICAgIGZvcmVjYXN0c0NvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcblxuXG4gICAgICAgICAgICBkYXRhLnRvcEZvcmVjYXN0cy5mb3JFYWNoKGZvcmVjYXN0ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3JlY2FzdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICBmb3JlY2FzdEl0ZW0uY2xhc3NMaXN0LmFkZCgncHJlZGljdF9fZm9yZWNhc3RzLWl0ZW0nKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHBlcmNlbnRhZ2UgPSBwYXJzZUZsb2F0KGZvcmVjYXN0LnBlcmNlbnRhZ2UpLnRvRml4ZWQoMSk7XG4gICAgICAgICAgICAgICAgY29uc3QgcGVyY2VudGFnZVNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICAgICAgcGVyY2VudGFnZVNwYW4udGV4dENvbnRlbnQgPSBgJHtwZXJjZW50YWdlfSVgO1xuXG5cbiAgICAgICAgICAgICAgICBjb25zdCBmb3JlY2FzdFRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShgICR7Zm9yZWNhc3QuZm9yZWNhc3QgPz8gXCIwLTBcIn1gKTtcbiAgICAgICAgICAgICAgICBmb3JlY2FzdEl0ZW0uYXBwZW5kQ2hpbGQocGVyY2VudGFnZVNwYW4pO1xuICAgICAgICAgICAgICAgIGZvcmVjYXN0SXRlbS5hcHBlbmRDaGlsZChmb3JlY2FzdFRleHQpO1xuXG4gICAgICAgICAgICAgICAgZm9yZWNhc3RzQ29udGFpbmVyLmFwcGVuZENoaWxkKGZvcmVjYXN0SXRlbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgdG9wIGZvcmVjYXN0czonLCBlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZW5kZXJVc2VycygpIHtcbiAgICAgICAgcmVxdWVzdChgL3VzZXJzLyR7Y3VycmVudFRhYlRhYmxlfWApXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcblxuICAgICAgICAgICAgICAgIGxldCB1c2VycyA9IGRhdGEudXNlcnNcblxuICAgICAgICAgICAgICAgIGNvbnN0IGlzU2NvcmVUYWJBY3RpdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fdGFicy1zY29yZS5hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICBjb25zdCBpc0dvYWxUYWJBY3RpdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fdGFicy1nb2FsLmFjdGl2ZScpO1xuXG5cbiAgICAgICAgICAgICAgICBpZih1c2Vycy5sZW5ndGggPj0gNTApe1xuICAgICAgICAgICAgICAgICAgICBzaG93VG9wRm9yZWNhc3QgPSB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKHVzZXJzLmxlbmd0aCA8IDUwKXtcbiAgICAgICAgICAgICAgICAgICAgc2hvd1RvcEZvcmVjYXN0ID0gZmFsc2VcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNTY29yZVRhYkFjdGl2ZSAmJiBzaG93VG9wRm9yZWNhc3QpIHRvcEZvcmVjYXN0LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpXG4gICAgICAgICAgICAgICAgaWYgKGlzR29hbFRhYkFjdGl2ZSkgdG9wRm9yZWNhc3QuY2xhc3NMaXN0LmFkZChcImhpZGVcIilcblxuXG5cbiAgICAgICAgICAgICAgICBwb3B1bGF0ZVVzZXJzVGFibGUodXNlcnMsIHVzZXJJZCwgY3VycmVudFRhYlRhYmxlKVxuXG4gICAgICAgICAgICB9KTtcblxuICAgIH1cbiAgICBmdW5jdGlvbiBwb3B1bGF0ZVVzZXJzVGFibGUodXNlcnMsIGN1cnJlbnRVc2VySWQsIG1hdGNoTnVtYmVyKSB7XG4gICAgICAgIHJlc3VsdHNUYWJsZS5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgcmVzdWx0c1RhYmxlT3RoZXIuaW5uZXJIVE1MID0gJyc7XG5cbiAgICAgICAgaWYgKCF1c2VycyB8fCAhdXNlcnMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgLy8gLy8g0KTRltC70YzRgtGA0YPRlNC80L4g0LrQvtGA0LjRgdGC0YPQstCw0YfRltCyLCDRj9C60ZYg0LfRgNC+0LHQuNC70Lgg0YHRgtCw0LLQutGDINC90LAg0LLQutCw0LfQsNC90LjQuSDQvNCw0YLRh1xuICAgICAgICAvLyBjb25zdCB1c2VycyA9IHVzZXJzLmZpbHRlcih1c2VyID0+XG4gICAgICAgIC8vICAgICB1c2VyLmJldHMuc29tZShiZXQgPT4gYmV0Lm1hdGNoTnVtYmVyID09PSBtYXRjaE51bWJlcilcbiAgICAgICAgLy8gKTtcblxuICAgICAgICAvLyBpZiAoIXVzZXJzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIC8vINCX0L3QsNGF0L7QtNC40LzQviDQv9C+0YLQvtGH0L3QvtCz0L4g0LrQvtGA0LjRgdGC0YPQstCw0YfQsFxuICAgICAgICBjb25zdCBjdXJyZW50VXNlciA9IHVzZXJzLmZpbmQodXNlciA9PiB1c2VyLnVzZXJpZCA9PT0gY3VycmVudFVzZXJJZCk7XG5cbiAgICAgICAgLy8g0JLQuNCy0L7QtNC40LzQviDQstGB0ZbRhSDRltC90YjQuNGFINC60L7RgNC40YHRgtGD0LLQsNGH0ZbQsiDRgyByZXN1bHRzVGFibGVcbiAgICAgICAgdXNlcnMuZm9yRWFjaCh1c2VyID0+IHtcbiAgICAgICAgICAgIGlmICh1c2VyLnVzZXJpZCAhPT0gY3VycmVudFVzZXJJZCkge1xuICAgICAgICAgICAgICAgIGRpc3BsYXlVc2VyKHVzZXIsIGZhbHNlLCByZXN1bHRzVGFibGUsIHVzZXJzLCBtYXRjaE51bWJlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vINCS0LjQstC+0LTQuNC80L4g0L/QvtGC0L7Rh9C90L7Qs9C+INC60L7RgNC40YHRgtGD0LLQsNGH0LAg0LIgcmVzdWx0c1RhYmxlT3RoZXJcbiAgICAgICAgaWYgKGN1cnJlbnRVc2VyKSB7XG4gICAgICAgICAgICBkaXNwbGF5VXNlcihjdXJyZW50VXNlciwgdHJ1ZSwgcmVzdWx0c1RhYmxlT3RoZXIsIHVzZXJzLCBtYXRjaE51bWJlcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gZGlzcGxheVVzZXIodXNlciwgaXNDdXJyZW50VXNlciwgdGFibGUsIGFsbFVzZXJzLCBtYXRjaE51bWJlcikge1xuICAgICAgICBsZXQgbWF0Y2hEYXRlO1xuXG4gICAgICAgIGlmIChtYXRjaE51bWJlciA9PT0gMSkge1xuICAgICAgICAgICAgbWF0Y2hEYXRlID0gRklSU1RfTUFUQ0hfREFURTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGFkZGl0aW9uYWxVc2VyUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGFkZGl0aW9uYWxVc2VyUm93LmNsYXNzTGlzdC5hZGQoJ3RhYmxlX19yb3cnKTtcblxuICAgICAgICBhZGRpdGlvbmFsVXNlclJvdy5pbm5lckhUTUwgPSBgXG4gICAgPGRpdiBjbGFzcz1cInRhYmxlX19yb3ctaXRlbVwiPiR7aXNDdXJyZW50VXNlciA/IHVzZXIudXNlcmlkIDogbWFza1VzZXJJZCh1c2VyLnVzZXJpZCl9PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInRhYmxlX19yb3ctaXRlbVwiPlxuICAgICAgICAke2N1cnJlbnREYXRlID49IG1hdGNoRGF0ZSA/XG4gICAgICAgICAgICBgPHNwYW4+JHt1c2VyLnRlYW0xICE9PSB1bmRlZmluZWQgJiYgdXNlci50ZWFtMSAhPT0gbnVsbCA/IHVzZXIudGVhbTEgOiBcIi1cIn08L3NwYW4+PGltZyBzcmM9XCJodHRwczovL2Zhdi1wcm9tLmNvbS9odG1sL2dvYWxzLW9yLXplcm9lcy9pbWcvdnMucG5nXCIgYWx0PVwidnNcIj48c3Bhbj4ke3VzZXIudGVhbTIgIT09IHVuZGVmaW5lZCAmJiB1c2VyLnRlYW0yICE9PSBudWxsID8gdXNlci50ZWFtMiA6IFwiLVwifTwvc3Bhbj5gIDpcbiAgICAgICAgICAgIGA8c3Bhbj4qKjwvc3Bhbj48aW1nIHNyYz1cImh0dHBzOi8vZmF2LXByb20uY29tL2h0bWwvZ29hbHMtb3ItemVyb2VzL2ltZy92cy5wbmdcIiBhbHQ9XCJ2c1wiPjxzcGFuPioqPC9zcGFuPmBcbiAgICAgICAgfVxuICAgIDwvZGl2PlxuICAgIFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlX19yb3ctaXRlbVwiID4qKioqKjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlX19yb3ctaXRlbVwiID4qKioqKjwvZGl2PlxuYDtcblxuICAgICAgICBpZiAoaXNDdXJyZW50VXNlcikge1xuICAgICAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuY2xhc3NMaXN0LmFkZChcInlvdVwiKTtcbiAgICAgICAgICAgIGFkZGl0aW9uYWxVc2VyUm93LmlubmVySFRNTCA9IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlX19yb3ctaXRlbVwiPiR7aXNDdXJyZW50VXNlciA/IHVzZXIudXNlcmlkIDogbWFza1VzZXJJZCh1c2VyLnVzZXJpZCl9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZV9fcm93LWl0ZW1cIj5cbiAgICAgICAgICAgIDxzcGFuPiR7dXNlci50ZWFtMSAhPT0gdW5kZWZpbmVkICYmIHVzZXIudGVhbTEgIT09IG51bGwgPyB1c2VyLnRlYW0xIDogXCItXCJ9PC9zcGFuPjxpbWcgc3JjPVwiaHR0cHM6Ly9mYXYtcHJvbS5jb20vaHRtbC9nb2Fscy1vci16ZXJvZXMvaW1nL3ZzLnBuZ1wiIGFsdD1cInZzXCI+PHNwYW4+JHt1c2VyLnRlYW0yICE9PSB1bmRlZmluZWQgJiYgdXNlci50ZWFtMiAhPT0gbnVsbCA/IHVzZXIudGVhbTIgOiBcIi1cIn08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVfX3Jvdy1pdGVtXCIgPioqKioqPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZV9fcm93LWl0ZW1cIiA+KioqKio8L2Rpdj5cbiAgICBgO1xuICAgICAgICAgICAgY29uc3QgeW91QmxvY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHlvdUJsb2NrLmNsYXNzTGlzdC5hZGQoJ3RhYmxlX19yb3cteW91Jyk7XG4gICAgICAgICAgICB5b3VCbG9jay5zZXRBdHRyaWJ1dGUoJ2RhdGEtdHJhbnNsYXRlJywgJ3RhYmxlWW91Jyk7XG4gICAgICAgICAgICAvLyB5b3VCbG9jay50ZXh0Q29udGVudCA9IFwiWW91XCI7XG4gICAgICAgICAgICBhZGRpdGlvbmFsVXNlclJvdy5pbnNlcnRCZWZvcmUoeW91QmxvY2ssIGFkZGl0aW9uYWxVc2VyUm93LmNoaWxkcmVuWzFdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRhYmxlLmFwcGVuZChhZGRpdGlvbmFsVXNlclJvdyk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG1hc2tVc2VySWQodXNlcklkKSB7XG4gICAgICAgIHJldHVybiBcIioqXCIgKyB1c2VySWQudG9TdHJpbmcoKS5zbGljZSgyKTtcbiAgICB9XG5cbiAgICAvLyAzRCBhbmltXG4gICAgY29uc3QgY2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRlYW0sIC5hbmltQ2FyZCwgLmFuaW1SaWdodFwiKTsgLy8g0JTQvtCx0LDQstC70Y/QtdC8IC5hbmltUmlnaHRcbiAgICBsZXQgYW5nbGUgPSAwO1xuXG4gICAgZnVuY3Rpb24gYW5pbWF0ZUNhcmRzKCkge1xuICAgICAgICBhbmdsZSArPSAwLjk7IC8vIHNwZWVkXG4gICAgICAgIGNvbnN0IHJvdGF0ZVggPSBNYXRoLnNpbihhbmdsZSAqIChNYXRoLlBJIC8gMTgwKSkgKiAxMDsgLy8g0JrQvtC70LXQsdCw0L3QuNC1INC/0L4gWFxuICAgICAgICBjb25zdCByb3RhdGVZID0gTWF0aC5jb3MoYW5nbGUgKiAoTWF0aC5QSSAvIDE4MCkpICogMTA7IC8vINCa0L7Qu9C10LHQsNC90LjQtSDQv9C+IFlcblxuICAgICAgICBjYXJkcy5mb3JFYWNoKGNhcmQgPT4ge1xuICAgICAgICAgICAgaWYgKGNhcmQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYW5pbVJpZ2h0XCIpKSB7XG4gICAgICAgICAgICAgICAgY2FyZC5zdHlsZS50cmFuc2Zvcm0gPSBgcm90YXRlWSgkey1yb3RhdGVZfWRlZykgcm90YXRlWCgkey1yb3RhdGVYfWRlZylgO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYXJkLnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGVZKCR7cm90YXRlWX1kZWcpIHJvdGF0ZVgoJHtyb3RhdGVYfWRlZylgO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZUNhcmRzKTtcbiAgICB9XG4gICAgYW5pbWF0ZUNhcmRzKCk7XG5cbiAgICAvLyBwcmVkaWN0IHRhYnNcbiAgICBjb25zdCB0YWJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByZWRpY3RfX3RhYnMtZ2xvYmFsID4gZGl2LCAucHJlZGljdF9fdGFicy1kYXRlcyA+IGRpdicpO1xuICAgIGNvbnN0IGNvbnRhaW5lcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJlZGljdF9fY29udGFpbmVyJyk7XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVUYWJDbGljayhldmVudCkge1xuICAgICAgICBsZXQgbWF0Y2hEYXRlO1xuICAgICAgICBsZXQgY3VycmVudE1hdGNoID0gMVxuXG4gICAgICAgIGNvbnN0IGNsaWNrZWRUYWIgPSBldmVudC50YXJnZXQuY2xvc2VzdChcIi5wcmVkaWN0X190YWJzLWRhdGVcIikgfHwgZXZlbnQudGFyZ2V0LmNsb3Nlc3QoXCIucHJlZGljdF9fdGFicy1nb2FsXCIpIHx8IGV2ZW50LnRhcmdldC5jbG9zZXN0KFwiLnByZWRpY3RfX3RhYnMtc2NvcmVcIik7XG4gICAgICAgIGNvbnN0IHRhYlBhaXIgPSBjbGlja2VkVGFiLmNsb3Nlc3QoJy5wcmVkaWN0X190YWJzLWdsb2JhbCcpIHx8IGNsaWNrZWRUYWIuY2xvc2VzdCgnLnByZWRpY3RfX3RhYnMtZGF0ZXMnKTtcblxuXG4gICAgICAgIGlmKGN1cnJlbnRNYXRjaCA9PT0gMSl7XG4gICAgICAgICAgICBtYXRjaERhdGUgPSBGSVJTVF9NQVRDSF9EQVRFXG4gICAgICAgIH1cbiAgICAgICAgaWYoY3VycmVudERhdGUgPiBtYXRjaERhdGUpe1xuICAgICAgICAgICAgcGxhY2VCZXRCdG4uY2xhc3NMaXN0LmFkZChcIl9sb2NrXCIpXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcGxhY2VCZXRCdG4uY2xhc3NMaXN0LnJlbW92ZShcIl9sb2NrXCIpXG4gICAgICAgIH1cblxuXG4gICAgICAgIGlmIChjbGlja2VkVGFiLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHJldHVybjtcbiAgICAgICAgaWYgKHRhYlBhaXIpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhaXIgPSB0YWJQYWlyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5hY3RpdmUnKTtcbiAgICAgICAgICAgIGlmIChwYWlyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBwYWlyWzBdLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY2xpY2tlZFRhYi5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgdXBkYXRlQ29udGFpbmVycygpO1xuICAgICAgICAvLyByZWZyZXNoQmV0SW5mbyh1c2VySWQpXG4gICAgICAgIGlmKGNsaWNrZWRUYWIuY2xvc2VzdCgnLnByZWRpY3RfX3RhYnMtc2NvcmUnKSl7XG4gICAgICAgICAgICB1cGRhdGVUb3BGb3JlY2FzdHMoY3VycmVudE1hdGNoKVxuICAgICAgICAgICAgY3VycmVudEJldCA9IG5ldyBCZXQodXNlcklkLCBjdXJyZW50TWF0Y2gpXG4gICAgICAgICAgICBtYXRjaE51bWJlciA9IDFcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJlZGljdF9fdGVhbS1udW1iZXJcIikuZm9yRWFjaCgoc2NvcmUsIGkpID0+e1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG1hdGNoRGF0ZSwgbWF0Y2hOdW1iZXIpXG4gICAgICAgICAgICAgICAgaWYoY3VycmVudERhdGUgPiBtYXRjaERhdGUgJiYgaSA9PT0gMSAmJiBtYXRjaE51bWJlciA9PT0gMSl7XG4gICAgICAgICAgICAgICAgICAgIHNjb3JlLnRleHRDb250ZW50ID0gXCIwXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZihjdXJyZW50RGF0ZSA+IG1hdGNoRGF0ZSAmJiBpID09PSAwICYmIG1hdGNoTnVtYmVyID09PSAxKXtcbiAgICAgICAgICAgICAgICAgICAgc2NvcmUudGV4dENvbnRlbnQgPSBcIjBcIlxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W3R5cGU9XCJyYWRpb1wiXTpjaGVja2VkJykuZm9yRWFjaChidXR0b24gPT4ge1xuICAgICAgICAgICAgICAgIGJ1dHRvbi5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG4gICAgICAgIGxvY2tNYXRjaENvbnRhaW5lcihGSVJTVF9NQVRDSF9EQVRFLCAxKTsgLy8g0JTQu9GPINC/0LXRgNGI0L7Qs9C+INC80LDRgtGH0YNcbiAgICB9XG5cbiAgICB0YWJzLmZvckVhY2godGFiID0+IHRhYi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZVRhYkNsaWNrKSk7XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVDb250YWluZXJzKCkge1xuICAgICAgICBjb250YWluZXJzLmZvckVhY2goY29udGFpbmVyID0+IGNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XG4gICAgICAgIHJlZnJlc2hCZXRJbmZvKHVzZXJJZClcbiAgICAgICAgY29uc3QgaXNTY29yZVRhYkFjdGl2ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X190YWJzLXNjb3JlLmFjdGl2ZScpO1xuICAgICAgICBjb25zdCBpc0dvYWxUYWJBY3RpdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fdGFicy1nb2FsLmFjdGl2ZScpO1xuXG5cbiAgICAgICAgaWYgKGlzU2NvcmVUYWJBY3RpdmUpIHtcbiAgICAgICAgICAgIGlmIChzaG93VG9wRm9yZWNhc3QpIHRvcEZvcmVjYXN0LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fY29udGFpbmVyLnNjb3JlLTEnKS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X190YWJzLXR4dC0yJykuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX3RhYnMtdHh0LTEnKS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNHb2FsVGFiQWN0aXZlKSB7XG4gICAgICAgICAgICBpZiAoc2hvd1RvcEZvcmVjYXN0KSB0b3BGb3JlY2FzdC5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKVxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX3RhYnMtdHh0LTEnKS5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fdGFicy10eHQtMicpLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X19jb250YWluZXIuZ29hbC0xJykuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL3Njb3JlXG5cbiAgICBmdW5jdGlvbiBzY29yZUluaXQoYnRuKXtcbiAgICAgICAgY29uc3QgdGVhbUNvbnRyb2wgPSBidG4uY2xvc2VzdCgnLnByZWRpY3RfX3RlYW0tY29udHJvbCcpO1xuICAgICAgICBjb25zdCB0ZWFtTnVtYmVyID0gdGVhbUNvbnRyb2wucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX3RlYW0tbnVtYmVyJylcbiAgICAgICAgY29uc3QgbWF0Y2hDb250YWluZXIgPSBidG4uY2xvc2VzdCgnLnByZWRpY3RfX2NvbnRhaW5lcicpO1xuICAgICAgICBjb25zdCBtYXRjaE51bWJlciA9IHBhcnNlSW50KG1hdGNoQ29udGFpbmVyLmRhdGFzZXQubWF0Y2hOdW1iZXIpO1xuXG4gICAgICAgIGNvbnN0IGdldEdvYWxzID0gKHRlYW0pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBtYXRjaENvbnRhaW5lci5xdWVyeVNlbGVjdG9yKGBbZGF0YS10ZWFtPVwiJHt0ZWFtfVwiXSAucHJlZGljdF9fdGVhbS1udW1iZXJgKTtcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50ID8gTnVtYmVyKGVsZW1lbnQudGV4dENvbnRlbnQpIHx8IDAgOiAwO1xuICAgICAgICB9O1xuXG5cbiAgICAgICAgY29uc3QgdGVhbTFHb2FscyA9IGdldEdvYWxzKCd0ZWFtMScpIDtcbiAgICAgICAgY29uc3QgdGVhbTJHb2FscyA9IGdldEdvYWxzKCd0ZWFtMicpO1xuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRlYW0xR29hbHMsIHRlYW0yR29hbHMpXG5cbiAgICAgICAgdXBkYXRlU2NvcmUobWF0Y2hOdW1iZXIsIHRlYW0xR29hbHMsIHRlYW0yR29hbHMpO1xuICAgIH1cblxuICAgIC8vdGFibGUgdGFic1xuICAgIC8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJsZV9fdGFicy1kYXRlJykuZm9yRWFjaCh0YWIgPT4ge1xuICAgIC8vICAgICB0YWIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAvLyAgICAgICAgIGlmICh0aGlzLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcbiAgICAvLyAgICAgICAgICAgICByZXR1cm47XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFibGVfX3RhYnMtZGF0ZScpLmZvckVhY2godGFiID0+IHRhYi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XG4gICAgLy8gICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIC8vICAgICAgICAgY3VycmVudFRhYlRhYmxlID0gTnVtYmVyKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFibGVfX3RhYnMtZGF0ZS5hY3RpdmVcIikuZ2V0QXR0cmlidXRlKFwiZGF0YS1tYXRjaC1udW1iZXJcIikpXG4gICAgLy8gICAgICAgICByZW5kZXJVc2VycygpO1xuICAgIC8vICAgICB9KTtcbiAgICAvLyB9KTtcblxuXG4gICAgLy9wb3B1cHNcblxuICAgIGZ1bmN0aW9uIHNldFBvcHVwcyh0cmlnZ2VyQnV0dG9ucywgcG9wdXBDbGFzcykge1xuICAgICAgICBjb25zdCBwb3B1cHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXBzJyk7XG4gICAgICAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnBvcHVwc19faXRlbS4ke3BvcHVwQ2xhc3N9YCk7XG4gICAgICAgIGNvbnN0IHBvcHVwQnRuID0gcG9wdXBzQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBzX19pdGVtLWJ0blwiKVxuXG5cbiAgICAgICAgaWYgKCF0cmlnZ2VyQnV0dG9ucyB8fCAhcG9wdXAgfHwgIXBvcHVwc0NvbnRhaW5lcikgcmV0dXJuO1xuXG4gICAgICAgIHRyaWdnZXJCdXR0b25zLmZvckVhY2godHJpZ2dlckJ1dHRvbiA9PiB7XG4gICAgICAgICAgICB0cmlnZ2VyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHBvcHVwc0NvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdfb3BhY2l0eScpO1xuICAgICAgICAgICAgICAgIHBvcHVwc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKHBvcHVwQ2xhc3MpO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBjbG9zZUJ1dHRvbiA9IHBvcHVwLnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cHNfX2l0ZW0tY2xvc2UnKTtcbiAgICAgICAgY29uc3QgYnRuQ2xvc2UgPSBwb3B1cC5xdWVyeVNlbGVjdG9yKCcuYnRuLWNsb3NlJyk7XG5cbiAgICAgICAgcG9wdXBzQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGUudGFyZ2V0ID09PSBwb3B1cHNDb250YWluZXIgfHwgZS50YXJnZXQgPT09IGNsb3NlQnV0dG9uIHx8IGUudGFyZ2V0ID09PSBidG5DbG9zZSkge1xuICAgICAgICAgICAgICAgIGNsb3NlUG9wdXAoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZnVuY3Rpb24gY2xvc2VQb3B1cCgpIHtcbiAgICAgICAgICAgIHBvcHVwc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdfb3BhY2l0eScpO1xuICAgICAgICAgICAgcG9wdXBzQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUocG9wdXBDbGFzcyk7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJyc7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5sb2cocG9wdXBCdG4pXG4gICAgICAgIHBvcHVwQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT57XG4gICAgICAgICAgICBjbG9zZVBvcHVwKClcbiAgICAgICAgfSlcblxuICAgIH1cblxuICAgIHNldFBvcHVwcyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ2lkZV9fbGlzdC1idG4nKSwgJ2dpZGVQb3B1cCcpO1xuICAgIHNldFBvcHVwcyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJlZGljdF9fYnRuLnRvb2stcGFydCcpLCAnX2NvbmZpcm1Qb3B1cCcpO1xuXG4gICAgLy9nbyB0byBwcmVkaWN0XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b1ByZWRpY3RcIikuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IHRhcmdldEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByZWRpY3RcIik7XG4gICAgICAgIGNvbnN0IHRhcmdldFBvc2l0aW9uID0gdGFyZ2V0RWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyB3aW5kb3cucGFnZVlPZmZzZXQgLSAyO1xuXG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7XG4gICAgICAgICAgICB0b3A6IHRhcmdldFBvc2l0aW9uLFxuICAgICAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnLFxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHJhZGlvQ29udGFpbmVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcmVkaWN0X19yYWRpbycpO1xuXG4gICAgcmFkaW9Db250YWluZXJzLmZvckVhY2goY29udGFpbmVyID0+IHtcbiAgICAgICAgY29uc3QgcmFkaW9JbnB1dHMgPSBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnLnByZWRpY3RfX3JhZGlvLWl0ZW0nKTtcblxuICAgICAgICByYWRpb0lucHV0cy5mb3JFYWNoKChyYWRpbykgPT4ge1xuICAgICAgICAgICAgcmFkaW8uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmFkaW9JbnB1dHMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnX2FjdGl2ZScpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ19hY3RpdmUnKTtcblxuICAgICAgICAgICAgICAgIHVwZGF0ZUZpcnN0R29hbChtYXRjaE51bWJlciwgdGhpcy5xdWVyeVNlbGVjdG9yKFwiaW5wdXRcIikudmFsdWUpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBsZXQgY2xpY2tTdGF0cyA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnY2xpY2tTdGF0cycpKSB8fCBbXTtcblxuICAgIGZ1bmN0aW9uIGNsaWNrVHJhY2tpbmcoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgY2xpY2tOYW1lID0gZXZlbnQuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY2xpY2stbmFtZScpO1xuICAgICAgICBjb25zdCBjbGlja0Ryb3AgPSBldmVudC5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1jbGljay1kcm9wJyk7XG5cbiAgICAgICAgaWYgKCFjbGlja05hbWUpIHJldHVybjtcblxuICAgICAgICBpZiAoY2xpY2tEcm9wKSB7XG4gICAgICAgICAgICBjb25zdCBpc0F1dGggPSAhIXVzZXJJZDtcblxuICAgICAgICAgICAgY29uc3QgZXhpc3RpbmdJdGVtID0gY2xpY2tTdGF0cy5maW5kKFxuICAgICAgICAgICAgICAgIGl0ZW0gPT4gaXRlbS5jbGlja2VkSXRlbSA9PT0gY2xpY2tOYW1lICYmIGl0ZW0uYXV0aCA9PT0gaXNBdXRoXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBpZiAoZXhpc3RpbmdJdGVtKSB7XG4gICAgICAgICAgICAgICAgZXhpc3RpbmdJdGVtLmNvdW50ZXIgKz0gMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2xpY2tTdGF0cy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgY2xpY2tlZEl0ZW06IGNsaWNrTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgY291bnRlcjogMSxcbiAgICAgICAgICAgICAgICAgICAgYXV0aDogaXNBdXRoXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBleGlzdGluZ0l0ZW0gPSBjbGlja1N0YXRzLmZpbmQoaXRlbSA9PiBpdGVtLmNsaWNrZWRJdGVtID09PSBjbGlja05hbWUpO1xuICAgICAgICAgICAgaWYgKGV4aXN0aW5nSXRlbSkge1xuICAgICAgICAgICAgICAgIGV4aXN0aW5nSXRlbS5jb3VudGVyICs9IDE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNsaWNrU3RhdHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGNsaWNrZWRJdGVtOiBjbGlja05hbWUsXG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXI6IDFcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ2NsaWNrU3RhdHMnLCBKU09OLnN0cmluZ2lmeShjbGlja1N0YXRzKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5pdENsaWNrVHJhY2tpbmcoKSB7XG4gICAgICAgIGNvbnN0IGNsaWNrYWJsZUVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtY2xpY2stbmFtZV0nKTtcbiAgICAgICAgY2xpY2thYmxlRWxlbWVudHMuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrVHJhY2tpbmcpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVDbGlja1RyYWNraW5nKCkge1xuICAgICAgICBjb25zdCBjbGlja2FibGVFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWNsaWNrLW5hbWVdJyk7XG4gICAgICAgIGNsaWNrYWJsZUVsZW1lbnRzLmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGlja1RyYWNraW5nKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2VuZENsaWNrU3RhdHMoKSB7XG4gICAgICAgIGNvbnN0IHN0b3JlZFN0YXRzID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdjbGlja1N0YXRzJykpO1xuXG4gICAgICAgIGlmICghc3RvcmVkU3RhdHMgfHwgc3RvcmVkU3RhdHMubGVuZ3RoID09PSAwKSByZXR1cm47XG5cblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSggc3RvcmVkU3RhdHMpKVxuXG4gICAgICAgIGZldGNoKGAke2FwaVVSTH0vY2xpY2stc3RhdGAsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShzdG9yZWRTdGF0cylcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgICAgICAgICAgY2xpY2tTdGF0cyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKCdjbGlja1N0YXRzJyk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCfQmtC70ZbQutC4INGD0YHQv9GW0YjQvdC+INCy0ZbQtNC/0YDQsNCy0LvQtdC90L4g0Lkg0L7Rh9C40YnQtdC90L4nKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCfQn9C+0LzQuNC70LrQsCDQv9GA0Lgg0LLRltC00L/RgNCw0LLRhtGWINC60LvRltC60ZbQsicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ9Cf0L7QvNC40LvQutCwINC3yrzRlNC00L3QsNC90L3RjzonLCBlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZXRJbnRlcnZhbChzZW5kQ2xpY2tTdGF0cywgMTAwMDApO1xuXG4gICAgbG9hZFRyYW5zbGF0aW9ucygpXG4gICAgICAgIC50aGVuKGluaXQpXG5cblxuICAgIC8vINCd0L7QstCwINGE0YPQvdC60YbRltGPINC00LvRjyDQvtCx0YDQvtCx0LrQuCDQutC70ZbQutGW0LIg0L3QsCDQutC90L7Qv9C60LggKy8tXG4gICAgZnVuY3Rpb24gaGFuZGxlVGVhbUNvbnRyb2xDbGljayhlKSB7XG4gICAgICAgIGNvbnN0IGJ0biA9IGUudGFyZ2V0LmNsb3Nlc3QoJy5wcmVkaWN0X190ZWFtLWluY3JlYXNlLCAucHJlZGljdF9fdGVhbS1kZWNyZWFzZScpO1xuICAgICAgICBpZiAoIWJ0bikgcmV0dXJuO1xuICAgICAgICBpZih3aW5kb3cuY291bnRlckNsaWNrID4gMSl7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBjb25zdCB0ZWFtQ29udHJvbCA9IGJ0bi5jbG9zZXN0KCcucHJlZGljdF9fdGVhbS1jb250cm9sJyk7XG4gICAgICAgICAgICBjb25zdCB0ZWFtTnVtYmVyID0gdGVhbUNvbnRyb2wucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX3RlYW0tbnVtYmVyJyk7XG4gICAgICAgICAgICBjb25zdCBtYXRjaENvbnRhaW5lciA9IGJ0bi5jbG9zZXN0KCcucHJlZGljdF9fY29udGFpbmVyJyk7XG5cbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHBhcnNlSW50KHRlYW1OdW1iZXIudGV4dENvbnRlbnQpO1xuICAgICAgICAgICAgaWYgKGJ0bi5jbGFzc0xpc3QuY29udGFpbnMoJ3ByZWRpY3RfX3RlYW0taW5jcmVhc2UnKSkge1xuICAgICAgICAgICAgICAgIHZhbHVlICs9IDE7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID4gMCkge1xuICAgICAgICAgICAgICAgIHZhbHVlIC09IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0ZWFtTnVtYmVyLnRleHRDb250ZW50ID0gYCR7dmFsdWV9YDtcbiAgICAgICAgICAgIHNjb3JlSW5pdChidG4pO1xuICAgICAgICAgICAgd2luZG93LmNvdW50ZXJDbGljayArPSAxXG4gICAgICAgICAgICBidG4uc3R5bGUucG9pbnRlckV2ZW50cyA9ICdub25lJ1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PntcbiAgICAgICAgICAgICAgICB3aW5kb3cuY291bnRlckNsaWNrID0gMVxuICAgICAgICAgICAgICAgIGJ0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ2luaXRpYWwnXG4gICAgICAgICAgICB9LCAyMDApXG4gICAgICAgIH1cblxuXG5cbiAgICB9XG5cblxuXG59KSgpXG5cblxuXG4iXX0=
