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
  var _sessionStorage$getIt;
  console.log(window.firstListener);
  if (window.promoInit) {
    window.promoInit = false;
    return;
  }
  window.promoInit = true;
  window.addEventListener('beforeunload', function () {
    document.removeEventListener('click', handleTeamControlClick);
    placeBetBtn.removeEventListener('click', handlePlaceBetClick);
    removeClickTracking();
    placeBetBtn.removeEventListener('click', PlaceBetButtonClick);
  });
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
  var locale = (_sessionStorage$getIt = sessionStorage.getItem("locale")) !== null && _sessionStorage$getIt !== void 0 ? _sessionStorage$getIt : "uk";
  // let locale = "uk"
  // let locale = "en"

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
    console.log(userId);
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
    console.log(bet);
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
    console.log(sessionStorage.getItem("currentBet"));
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
      console.log("translation work!");
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
    console.log("click");
    e.preventDefault();
    if (currentBet === undefined) {
      currentBet = new Bet(userId, matchNumber);
    }
    placeBet(currentBet);
  }
  function init() {
    initClickTracking();
    if (window.store) {
      var state = window.store.getState();
      userId = state.auth.isAuthorized && state.auth.id || '';
      console.log(userId);
      if (!currentBet) {
        currentBet = new Bet(userId, matchNumber);
      }
      // currentBet = new Bet(userId, matchNumber)
      InitPage();
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
    InitPage();
    placeBetBtn.addEventListener('click', PlaceBetButtonClick);
    // document.addEventListener('click', handleTeamControlClick);

    document.querySelectorAll('.predict__team').forEach(function (teamEl, index) {
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
    // console.log(currentBet);
  }

  function updateFirstGoal(matchNumber, firstGoal) {
    if (currentBet && currentBet.matchNumber === matchNumber) {
      currentBet.updateFirstGoal(firstGoal);
    }

    // console.log(currentBet);
  }

  function updateTopForecasts(matchNumber) {
    request("/users/".concat(matchNumber)).then(function (data) {
      // console.log(data.topForecasts); // Перевірка отриманих даних

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

      // console.log(users)
      var isScoreTabActive = document.querySelector('.predict__tabs-score.active');
      var isGoalTabActive = document.querySelector('.predict__tabs-goal.active');
      if (users.length >= 3) {
        showTopForecast = true;
      }
      if (users.length < 3) {
        showTopForecast = false;
      }
      if (isScoreTabActive && showTopForecast) topForecast.classList.remove("hide");
      if (isGoalTabActive) topForecast.classList.add("hide");

      // console.log(typeof userId)

      populateUsersTable(users, userId, currentTabTable);

      // console.log(users)
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
    console.log(clickedTab);
    var tabPair = clickedTab.closest('.predict__tabs-global') || clickedTab.closest('.predict__tabs-dates');

    // console.log(clickedTab)

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
        // console.log(this.querySelector("input").value)

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
    console.log(clickStats);
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
  }

  // Нова функція для обробки кліку на кнопку ставки
  function handlePlaceBetClick(e) {
    console.log("click");
    e.preventDefault();
    if (currentBet === undefined) {
      currentBet = new Bet(userId, matchNumber);
    }
    placeBet(currentBet);
  }
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiY29uc29sZSIsImxvZyIsIndpbmRvdyIsImZpcnN0TGlzdGVuZXIiLCJwcm9tb0luaXQiLCJhZGRFdmVudExpc3RlbmVyIiwiZG9jdW1lbnQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiaGFuZGxlVGVhbUNvbnRyb2xDbGljayIsInBsYWNlQmV0QnRuIiwiaGFuZGxlUGxhY2VCZXRDbGljayIsInJlbW92ZUNsaWNrVHJhY2tpbmciLCJQbGFjZUJldEJ1dHRvbkNsaWNrIiwiYXBpVVJMIiwidW5hdXRoTXNncyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJ5b3VBcmVJbkJ0bnMiLCJtYWluUGFnZSIsInF1ZXJ5U2VsZWN0b3IiLCJyZXN1bHRzVGFibGUiLCJyZXN1bHRzVGFibGVPdGhlciIsImxhc3RQcmVkaWN0IiwidG9wRm9yZWNhc3QiLCJjdXJyZW50VGFiIiwiY3VycmVudFRhYlRhYmxlIiwibWF0Y2hOdW1iZXIiLCJzaG93VG9wRm9yZWNhc3QiLCJGSVJTVF9NQVRDSF9EQVRFIiwiRGF0ZSIsImN1cnJlbnREYXRlIiwibG9ja01hdGNoQ29udGFpbmVyIiwibWF0Y2hEYXRlIiwiY29udGFpbmVycyIsImZvckVhY2giLCJjb250YWluZXIiLCJjbGFzc0xpc3QiLCJhZGQiLCJzZXRJbnRlcnZhbCIsIkJldCIsInVzZXJJZCIsInRlYW0xR29hbHMiLCJ0ZWFtMkdvYWxzIiwiZmlyc3RHb2FsIiwidXNlcmlkIiwidGVhbTEiLCJ0ZWFtMiIsInVuZGVmaW5lZCIsImdvYWxzVXBkYXRlZCIsImZpcnN0R29hbFVwZGF0ZWQiLCJjYWNoZSIsInByZWRpY3REYXRhIiwidHJhbnNsYXRlU3RhdGUiLCJkZWJ1ZyIsImxvY2FsZSIsInNlc3Npb25TdG9yYWdlIiwiZ2V0SXRlbSIsInVrTGVuZyIsImVuTGVuZyIsImkxOG5EYXRhIiwiY3VycmVudEJldCIsInJlcXVlc3QiLCJsaW5rIiwiZXh0cmFPcHRpb25zIiwiZmV0Y2giLCJoZWFkZXJzIiwidGhlbiIsInJlcyIsIm9rIiwiRXJyb3IiLCJqc29uIiwiZXJyIiwiZXJyb3IiLCJyZXBvcnRFcnJvciIsInN0eWxlIiwiZGlzcGxheSIsImxvY2F0aW9uIiwiaHJlZiIsInN0YXJ0c1dpdGgiLCJQcm9taXNlIiwicmVqZWN0IiwicmVwb3J0RGF0YSIsIm9yaWdpbiIsImVycm9yVGV4dCIsInRleHQiLCJtZXNzYWdlIiwidHlwZSIsIm5hbWUiLCJzdGFjayIsIm1ldGhvZCIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5Iiwid2FybiIsImdldExhc3RCZXQiLCJiZXRzIiwiZmluZCIsImJldCIsInJlZnJlc2hCZXRJbmZvIiwic2NvcmUxIiwic2NvcmUyIiwiZ29hbDEiLCJnb2FsMiIsImRhdGEiLCJiZXRBdmFpbGFibGUiLCJzb21lIiwibGFzdFRlYW0xIiwibGFzdFRlYW0yIiwic2NvcmVUZWFtMSIsInNjb3JlVGVhbTIiLCJyZW1vdmUiLCJsYXN0QmV0IiwidGV4dENvbnRlbnQiLCJiZXRDb25maXJtZWQiLCJpdGVtIiwic2V0QXR0cmlidXRlIiwidHJhbnNsYXRlIiwiY29udGFpbnMiLCJJbml0UGFnZSIsImNoZWNrVXNlckF1dGgiLCJyZW5kZXJVc2VycyIsInVwZGF0ZVRvcEZvcmVjYXN0cyIsInlvdUFyZUluQnRuIiwidW5hdXRoTWVzIiwicGxhY2VCZXQiLCJidG4iLCJzY29yZUluaXQiLCJhY3RpdmVUYWJzIiwicmVxIiwidGFiIiwiYWN0aXZlSW5wdXQiLCJ2YWx1ZSIsInNldEl0ZW0iLCJsb2FkVHJhbnNsYXRpb25zIiwibXV0YXRpb25PYnNlcnZlciIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJtdXRhdGlvbnMiLCJvYnNlcnZlIiwiZ2V0RWxlbWVudEJ5SWQiLCJjaGlsZExpc3QiLCJzdWJ0cmVlIiwiZWxlbXMiLCJlbGVtIiwia2V5IiwiZ2V0QXR0cmlidXRlIiwiaW5uZXJIVE1MIiwicmVtb3ZlQXR0cmlidXRlIiwicmVmcmVzaExvY2FsaXplZENsYXNzIiwiZWxlbWVudCIsImxhbmciLCJlIiwicHJldmVudERlZmF1bHQiLCJpbml0IiwiaW5pdENsaWNrVHJhY2tpbmciLCJzdG9yZSIsInN0YXRlIiwiZ2V0U3RhdGUiLCJhdXRoIiwiaXNBdXRob3JpemVkIiwiaWQiLCJjIiwiaSIsImdfdXNlcl9pZCIsImNsZWFySW50ZXJ2YWwiLCJ0ZWFtRWwiLCJpbmRleCIsInRlYW1OdW1iZXIiLCJjb250cm9sSFRNTCIsImluc2VydEFkamFjZW50SFRNTCIsInVwZGF0ZVNjb3JlIiwidXBkYXRlR29hbHMiLCJ1cGRhdGVGaXJzdEdvYWwiLCJmb3JlY2FzdHNDb250YWluZXIiLCJ0b3BGb3JlY2FzdHMiLCJmb3JlY2FzdCIsImZvcmVjYXN0SXRlbSIsImNyZWF0ZUVsZW1lbnQiLCJwZXJjZW50YWdlIiwicGFyc2VGbG9hdCIsInRvRml4ZWQiLCJwZXJjZW50YWdlU3BhbiIsImZvcmVjYXN0VGV4dCIsImNyZWF0ZVRleHROb2RlIiwiYXBwZW5kQ2hpbGQiLCJ1c2VycyIsImlzU2NvcmVUYWJBY3RpdmUiLCJpc0dvYWxUYWJBY3RpdmUiLCJsZW5ndGgiLCJwb3B1bGF0ZVVzZXJzVGFibGUiLCJjdXJyZW50VXNlcklkIiwiY3VycmVudFVzZXIiLCJ1c2VyIiwiZGlzcGxheVVzZXIiLCJpc0N1cnJlbnRVc2VyIiwidGFibGUiLCJhbGxVc2VycyIsImFkZGl0aW9uYWxVc2VyUm93IiwibWFza1VzZXJJZCIsInlvdUJsb2NrIiwiaW5zZXJ0QmVmb3JlIiwiY2hpbGRyZW4iLCJhcHBlbmQiLCJ0b1N0cmluZyIsInNsaWNlIiwiY2FyZHMiLCJhbmdsZSIsImFuaW1hdGVDYXJkcyIsInJvdGF0ZVgiLCJNYXRoIiwic2luIiwiUEkiLCJyb3RhdGVZIiwiY29zIiwiY2FyZCIsInRyYW5zZm9ybSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInRhYnMiLCJoYW5kbGVUYWJDbGljayIsImV2ZW50IiwiY3VycmVudE1hdGNoIiwiY2xpY2tlZFRhYiIsInRhcmdldCIsImNsb3Nlc3QiLCJ0YWJQYWlyIiwicGFpciIsInVwZGF0ZUNvbnRhaW5lcnMiLCJzY29yZSIsImJ1dHRvbiIsImNoZWNrZWQiLCJ0ZWFtQ29udHJvbCIsIm1hdGNoQ29udGFpbmVyIiwicGFyc2VJbnQiLCJkYXRhc2V0IiwiZ2V0R29hbHMiLCJ0ZWFtIiwiTnVtYmVyIiwic2V0UG9wdXBzIiwidHJpZ2dlckJ1dHRvbnMiLCJwb3B1cENsYXNzIiwicG9wdXBzQ29udGFpbmVyIiwicG9wdXAiLCJwb3B1cEJ0biIsInRyaWdnZXJCdXR0b24iLCJvdmVyZmxvdyIsImNsb3NlQnV0dG9uIiwiYnRuQ2xvc2UiLCJjbG9zZVBvcHVwIiwidGFyZ2V0RWxlbWVudCIsInRhcmdldFBvc2l0aW9uIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwidG9wIiwicGFnZVlPZmZzZXQiLCJzY3JvbGxUbyIsImJlaGF2aW9yIiwicmFkaW9Db250YWluZXJzIiwicmFkaW9JbnB1dHMiLCJyYWRpbyIsImNsaWNrU3RhdHMiLCJwYXJzZSIsImNsaWNrVHJhY2tpbmciLCJjbGlja05hbWUiLCJjdXJyZW50VGFyZ2V0IiwiY2xpY2tEcm9wIiwiaXNBdXRoIiwiZXhpc3RpbmdJdGVtIiwiY2xpY2tlZEl0ZW0iLCJjb3VudGVyIiwicHVzaCIsImNsaWNrYWJsZUVsZW1lbnRzIiwiZWwiLCJzZW5kQ2xpY2tTdGF0cyIsInN0b3JlZFN0YXRzIiwicmVzcG9uc2UiLCJyZW1vdmVJdGVtIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUNBLENBQUMsWUFBWTtFQUFBO0VBQ1RBLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDQyxNQUFNLENBQUNDLGFBQWEsQ0FBQztFQUNqQyxJQUFJRCxNQUFNLENBQUNFLFNBQVMsRUFBRTtJQUNsQkYsTUFBTSxDQUFDRSxTQUFTLEdBQUcsS0FBSztJQUN4QjtFQUNKO0VBQ0FGLE1BQU0sQ0FBQ0UsU0FBUyxHQUFHLElBQUk7RUFHdkJGLE1BQU0sQ0FBQ0csZ0JBQWdCLENBQUMsY0FBYyxFQUFFLFlBQVc7SUFDL0NDLFFBQVEsQ0FBQ0MsbUJBQW1CLENBQUMs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QUFDO0lBQ3pELElBQU14RCxVQUFVLEdBQUcrRCxXQUFXLENBQUNsTixhQUFhLENBQUMsdUJBQXVCLENBQUM7SUFDckUsSUFBTW1OLGNBQWMsR0FBR3pHLEdBQUcsQ0FBQ2lHLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQztJQUV6RCxJQUFJM0YsS0FBSyxHQUFHb0csUUFBUSxDQUFDakUsVUFBVSxDQUFDdEQsV0FBVyxDQUFDO0lBQzVDLElBQUlhLEdBQUcsQ0FBQ3pGLFNBQVMsQ0FBQ2lGLFFBQVEsQ0FBQyx3QkFBd0IsQ0FBQyxFQUFFO01BQ2xEYyxLQUFLLElBQUksQ0FBQztJQUNkLENBQUMsTUFBTSxJQUFJQSxLQUFLLEdBQUcsQ0FBQyxFQUFFO01BQ2xCQSxLQUFLLElBQUksQ0FBQztJQUNkO0lBQ0FtQyxVQUFVLENBQUN0RCxXQUFXLGFBQU1tQixLQUFLLENBQUU7SUFDbkNMLFNBQVMsQ0FBQ0QsR0FBRyxDQUFDO0VBQ2xCOztFQUVBO0VBQ0EsU0FBU2xILG1CQUFtQixDQUFDMkksQ0FBQyxFQUFFO0lBQzVCckosT0FBTyxDQUFDQyxHQUFHLENBQUMsT0FBTyxDQUFDO0lBQ3BCb0osQ0FBQyxDQUFDQyxjQUFjLEVBQUU7SUFDbEIsSUFBRzNGLFVBQVUsS0FBS2IsU0FBUyxFQUFFO01BQ3pCYSxVQUFVLEdBQUcsSUFBSXJCLEdBQUcsQ0FBQ0MsTUFBTSxFQUFFZCxXQUFXLENBQUM7SUFDN0M7SUFDQWtHLFFBQVEsQ0FBQ2hFLFVBQVUsQ0FBQztFQUN4QjtBQUlKLENBQUMsR0FBRyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4oZnVuY3Rpb24gKCkge1xuICAgIGNvbnNvbGUubG9nKHdpbmRvdy5maXJzdExpc3RlbmVyKVxuICAgIGlmICh3aW5kb3cucHJvbW9Jbml0KSB7XG4gICAgICAgIHdpbmRvdy5wcm9tb0luaXQgPSBmYWxzZVxuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHdpbmRvdy5wcm9tb0luaXQgPSB0cnVlO1xuXG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlVGVhbUNvbnRyb2xDbGljayk7XG4gICAgICAgIHBsYWNlQmV0QnRuLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlUGxhY2VCZXRDbGljayk7XG4gICAgICAgIHJlbW92ZUNsaWNrVHJhY2tpbmcoKVxuICAgICAgICBwbGFjZUJldEJ0bi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIFBsYWNlQmV0QnV0dG9uQ2xpY2spO1xuICAgIH0pO1xuXG5cbiAgICBjb25zdCBhcGlVUkwgPSAnaHR0cHM6Ly9mYXYtcHJvbS5jb20vYXBpX2Zvb3RiYWxsX3NoYWtodGFyJyxcbiAgICAgICAgdW5hdXRoTXNncyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy51bmF1dGgtbXNnJyksXG4gICAgICAgIHlvdUFyZUluQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50b29rLXBhcnQnKSxcbiAgICAgICAgbWFpblBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZhdi1wYWdlXCIpLFxuICAgICAgICByZXN1bHRzVGFibGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVzdWx0cy10YWJsZScpLFxuICAgICAgICByZXN1bHRzVGFibGVPdGhlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZXN1bHRzLXRhYmxlLW90aGVyJyksXG4gICAgICAgIHBsYWNlQmV0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmVkaWN0LWJ0blwiKSxcbiAgICAgICAgbGFzdFByZWRpY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByZWRpY3RfX2xhc3RcIiksXG4gICAgICAgIHRvcEZvcmVjYXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b3BGb3JlY2FzdFwiKVxuXG4gICAgbGV0IGN1cnJlbnRUYWIgPSAxXG4gICAgbGV0IGN1cnJlbnRUYWJUYWJsZSA9IDFcbiAgICBsZXQgbWF0Y2hOdW1iZXIgPSAxXG4gICAgbGV0IHNob3dUb3BGb3JlY2FzdCA9IGZhbHNlXG5cbiAgICAvLyBjb25zdCBGSVJTVF9NQVRDSF9EQVRFID0gbmV3IERhdGUoJzIwMjUtMDQtMjdUMTc6MzA6MDAnKSAvLyDQtNCw0YLQsCDQvNCw0YLRh9GDIC0gMzDRhdCyINGB0L/RgNCw0LLQttC90Y8g0LTQsNGC0LBcbiAgICBjb25zdCBGSVJTVF9NQVRDSF9EQVRFID0gbmV3IERhdGUoJzIwMjUtMDQtMjdUMTc6MzA6MDAnKSAvLyDQtNCw0YLQsCDQvNCw0YLRh9GDIC0gMzDRhdCyXG4gICAgY29uc3QgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpXG5cbiAgICBmdW5jdGlvbiBsb2NrTWF0Y2hDb250YWluZXIobWF0Y2hEYXRlLCBtYXRjaE51bWJlcikge1xuICAgICAgICBpZiAobmV3IERhdGUoKSA+IG1hdGNoRGF0ZSkge1xuICAgICAgICAgICAgY29uc3QgY29udGFpbmVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5wcmVkaWN0X19jb250YWluZXJbZGF0YS1tYXRjaC1udW1iZXI9XCIke21hdGNoTnVtYmVyfVwiXWApO1xuXG4gICAgICAgICAgICBjb250YWluZXJzLmZvckVhY2goY29udGFpbmVyID0+IHtcbiAgICAgICAgICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnX2xvY2snKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBwbGFjZUJldEJ0bi5jbGFzc0xpc3QuYWRkKFwiX2xvY2tcIilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxvY2tNYXRjaENvbnRhaW5lcihGSVJTVF9NQVRDSF9EQVRFLCAxKTsgLy8g0JTQu9GPINC/0LXRgNGI0L7Qs9C+INC80LDRgtGH0YNcblxuICAgIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgY29uc3QgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpOyAvLyDQntC90L7QstC40YLQuCDQv9C+0YLQvtGH0L3RgyDQtNCw0YLRg1xuICAgICAgICBsb2NrTWF0Y2hDb250YWluZXIoRklSU1RfTUFUQ0hfREFURSwgMSk7XG4gICAgfSwgNjAwMDAwKTsgLy8g0J7QvdC+0LLQu9GO0LLQsNGC0Lgg0LrQvtC20L3RliAxMCDRhdCyXG5cbiAgICBjbGFzcyBCZXQge1xuICAgICAgICBjb25zdHJ1Y3Rvcih1c2VySWQsIG1hdGNoTnVtYmVyLCB0ZWFtMUdvYWxzID0gMCwgdGVhbTJHb2FscyA9IDAsIGZpcnN0R29hbCkge1xuICAgICAgICAgICAgaWYodXNlcklkICE9PSBudWxsKSB0aGlzLnVzZXJpZCA9IHVzZXJJZDtcbiAgICAgICAgICAgIHRoaXMubWF0Y2hOdW1iZXIgPSBtYXRjaE51bWJlcjtcbiAgICAgICAgICAgIHRoaXMudGVhbTEgPSB0ZWFtMUdvYWxzO1xuICAgICAgICAgICAgdGhpcy50ZWFtMiA9IHRlYW0yR29hbHM7XG4gICAgICAgICAgICBpZihmaXJzdEdvYWwgIT09IHVuZGVmaW5lZCkgdGhpcy5maXJzdEdvYWwgPSBmaXJzdEdvYWw7XG4gICAgICAgIH1cblxuICAgICAgICB1cGRhdGVHb2Fscyh0ZWFtMUdvYWxzLCB0ZWFtMkdvYWxzKSB7XG4gICAgICAgICAgICBpZiAodGVhbTFHb2FscyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50ZWFtMSA9IHRlYW0xR29hbHMgIT09IG51bGwgPyB0ZWFtMUdvYWxzIDogdGhpcy50ZWFtMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0ZWFtMkdvYWxzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRlYW0yID0gdGVhbTJHb2FscyAhPT0gbnVsbCA/IHRlYW0yR29hbHMgOiB0aGlzLnRlYW0yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5nb2Fsc1VwZGF0ZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdXBkYXRlRmlyc3RHb2FsKGZpcnN0R29hbCkge1xuICAgICAgICAgICAgaWYgKGZpcnN0R29hbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJzdEdvYWwgPSBmaXJzdEdvYWwgIT09IG51bGwgPyBmaXJzdEdvYWwgOiB0aGlzLmZpcnN0R29hbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZmlyc3RHb2FsVXBkYXRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBjYWNoZSA9IHt9O1xuICAgIGxldCBwcmVkaWN0RGF0YSA9IFtdO1xuXG4gICAgbGV0IHRyYW5zbGF0ZVN0YXRlID0gdHJ1ZVxuICAgIGxldCBkZWJ1ZyA9IGZhbHNlXG5cbiAgICBsZXQgbG9jYWxlID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcImxvY2FsZVwiKSA/PyBcInVrXCJcbiAgICAvLyBsZXQgbG9jYWxlID0gXCJ1a1wiXG4gICAgLy8gbGV0IGxvY2FsZSA9IFwiZW5cIlxuXG5cbiAgICBjb25zdCB1a0xlbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdWtMZW5nJyk7XG4gICAgY29uc3QgZW5MZW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VuTGVuZycpO1xuXG5cbiAgICBsZXQgaTE4bkRhdGEgPSB7fTtcblxuICAgIGxldCB1c2VySWQ7XG4gICAgLy8gdXNlcklkID0gMTAwMzAwMjY4O1xuXG4gICAgbGV0IGN1cnJlbnRCZXQ7XG5cbiAgICBpZiAodWtMZW5nKSBsb2NhbGUgPSAndWsnO1xuICAgIGlmIChlbkxlbmcpIGxvY2FsZSA9ICdlbic7XG5cbiAgICBjb25zdCByZXF1ZXN0ID0gKGxpbmssIGV4dHJhT3B0aW9ucykgPT5cbiAgICAgICAgZmV0Y2goYXBpVVJMICsgbGluaywge1xuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC4uLihleHRyYU9wdGlvbnMgfHwge30pXG4gICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghcmVzLm9rKSB0aHJvdyBuZXcgRXJyb3IoJ0FQSSBlcnJvcicpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0FQSSByZXF1ZXN0IGZhaWxlZDonLCBlcnIpO1xuXG4gICAgICAgICAgICAgICAgcmVwb3J0RXJyb3IoZXJyKTtcblxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mYXYtcGFnZScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5ocmVmLnN0YXJ0c1dpdGgoXCJodHRwczovL3d3dy5mYXZiZXQuaHIvXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9wcm9tb2NpamUvcHJvbW9jaWphL3N0dWIvJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvcHJvbW9zL3Byb21vL3N0dWIvJztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gcmVwb3J0RXJyb3IoZXJyKSB7XG4gICAgICAgIGNvbnN0IHJlcG9ydERhdGEgPSB7XG4gICAgICAgICAgICBvcmlnaW46IHdpbmRvdy5sb2NhdGlvbi5ocmVmLFxuICAgICAgICAgICAgdXNlcmlkOiB1c2VySWQsXG4gICAgICAgICAgICBlcnJvclRleHQ6IGVycj8uZXJyb3IgfHwgZXJyPy50ZXh0IHx8IGVycj8ubWVzc2FnZSB8fCAnVW5rbm93biBlcnJvcicsXG4gICAgICAgICAgICB0eXBlOiBlcnI/Lm5hbWUgfHwgJ1Vua25vd25FcnJvcicsXG4gICAgICAgICAgICBzdGFjazogZXJyPy5zdGFjayB8fCAnJ1xuICAgICAgICB9O1xuXG4gICAgICAgIGZldGNoKCdodHRwczovL2Zhdi1wcm9tLmNvbS9hcGktY21zL3JlcG9ydHMvYWRkJywge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHJlcG9ydERhdGEpXG4gICAgICAgIH0pLmNhdGNoKGNvbnNvbGUud2Fybik7XG4gICAgfVxuXG4gICAgY29uc3QgZ2V0TGFzdEJldCA9IChiZXRzLCBtYXRjaE51bWJlcikgPT57XG4gICAgICAgIGlmKCFiZXRzKSByZXR1cm4gZmFsc2VcbiAgICAgICAgcmV0dXJuIGJldHMuZmluZChiZXQgPT4gYmV0Lm1hdGNoTnVtYmVyID09PSBtYXRjaE51bWJlcik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVmcmVzaEJldEluZm8odXNlcklkKSB7XG4gICAgICAgIGNvbnN0IHNjb3JlMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2NvcmUtMVwiKVxuICAgICAgICBjb25zdCBzY29yZTIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNjb3JlLTJcIilcbiAgICAgICAgY29uc3QgZ29hbDEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdvYWwtMVwiKVxuICAgICAgICBjb25zdCBnb2FsMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ29hbC0yXCIpXG5cbiAgICAgICAgLy8gY29uc29sZS5sb2cobWF0Y2hOdW1iZXIpXG5cbiAgICAgICAgcmVxdWVzdChgL2ZhdnVzZXIvJHt1c2VySWR9YCwge1xuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgICAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgaWYoZGF0YS5iZXRzKXtcbiAgICAgICAgICAgICAgICBjb25zdCBiZXRBdmFpbGFibGUgPSBkYXRhLmJldHMuc29tZShiZXQgPT57XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBiZXQubWF0Y2hOdW1iZXIgPT09IG1hdGNoTnVtYmVyXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhiZXRBdmFpbGFibGUpXG4gICAgICAgICAgICAgICAgY29uc3QgbGFzdFRlYW0xID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmVkaWN0X19sYXN0LXRlYW0udGVhbTFcIik7XG4gICAgICAgICAgICAgICAgY29uc3QgbGFzdFRlYW0yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmVkaWN0X19sYXN0LXRlYW0udGVhbTJcIik7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2NvcmVUZWFtMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2NvcmVUZWFtMVwiKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzY29yZVRlYW0yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zY29yZVRlYW0yXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpcnN0R29hbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJlZGljdF9fbGFzdC1jb3VudHJ5XCIpO1xuICAgICAgICAgICAgICAgIGlmKGJldEF2YWlsYWJsZSl7XG4gICAgICAgICAgICAgICAgICAgIGxhc3RQcmVkaWN0LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RCZXQgPSBnZXRMYXN0QmV0KGRhdGEuYmV0cywgbWF0Y2hOdW1iZXIpO1xuICAgICAgICAgICAgICAgICAgICBzY29yZVRlYW0xLnRleHRDb250ZW50ID0gbGFzdEJldC50ZWFtMSA9PT0gdW5kZWZpbmVkID8gXCItXCIgOmAke2xhc3RCZXQudGVhbTF9YDtcbiAgICAgICAgICAgICAgICAgICAgc2NvcmVUZWFtMi50ZXh0Q29udGVudCA9IGxhc3RCZXQudGVhbTIgPT09IHVuZGVmaW5lZCA/IFwiLVwiIDpgJHtsYXN0QmV0LnRlYW0yfWA7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGxhc3RCZXQpXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RCZXQuYmV0Q29uZmlybWVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByZWRpY3RfX2xhc3QtcmVzdWx0LnVuY29uZmlybWVkXCIpLmZvckVhY2goaXRlbSA9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcmVkaWN0X19sYXN0LXJlc3VsdC5jb25maXJtZWRcIikuZm9yRWFjaChpdGVtID0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByZWRpY3RfX2xhc3QtcmVzdWx0LnVuY29uZmlybWVkXCIpLmZvckVhY2goaXRlbSA9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcmVkaWN0X19sYXN0LXJlc3VsdC5jb25maXJtZWRcIikuZm9yRWFjaChpdGVtID0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAobGFzdEJldC5tYXRjaE51bWJlciA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFRlYW0xLnNldEF0dHJpYnV0ZShcImRhdGEtdHJhbnNsYXRlXCIsIFwic2hha2h0YXJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0VGVhbTIuc2V0QXR0cmlidXRlKFwiZGF0YS10cmFuc2xhdGVcIiwgXCJkeW5hbW9cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmKHNjb3JlMS5jbGFzc0xpc3QuY29udGFpbnMoXCJhY3RpdmVcIikpe1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmVkaWN0X19sYXN0LXNjb3JlXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByZWRpY3RfX2xhc3QtZ29hbFwiKS5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoZ29hbDEuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlXCIpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJlZGljdF9fbGFzdC1zY29yZVwiKS5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmVkaWN0X19sYXN0LWdvYWxcIikuY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIilcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmKGxhc3RCZXQuZmlyc3RHb2FsKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGxhc3RCZXQuZmlyc3RHb2FsID09PSBcInNoYWtodGFyXCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0R29hbC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXRyYW5zbGF0ZVwiLCBcInNoYWtodGFyXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobGFzdEJldC5maXJzdEdvYWwgPT09IFwiZHluYW1vXCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0R29hbC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXRyYW5zbGF0ZVwiLCBcImR5bmFtb1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGxhc3RCZXQuZmlyc3RHb2FsID09PSBcImRyYXdcIil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RHb2FsLnNldEF0dHJpYnV0ZShcImRhdGEtdHJhbnNsYXRlXCIsIFwiZHJhd1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGdvYWwxLmNsYXNzTGlzdC5jb250YWlucyhcImFjdGl2ZVwiKSB8fCBnb2FsMi5jbGFzc0xpc3QuY29udGFpbnMoXCJhY3RpdmVcIikpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJlZGljdF9fbGFzdFwiKS5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoIWJldEF2YWlsYWJsZSl7XG4gICAgICAgICAgICAgICAgICAgIGxhc3RQcmVkaWN0LmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgbGFzdFByZWRpY3QuY2xhc3NMaXN0LmFkZChcImhpZGVcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3I6JywgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgY29uc3QgSW5pdFBhZ2UgPSAoKSA9PiB7XG4gICAgICAgIGNoZWNrVXNlckF1dGgoKTtcbiAgICAgICAgcmVuZGVyVXNlcnMoKTtcbiAgICAgICAgdXBkYXRlVG9wRm9yZWNhc3RzKGN1cnJlbnRUYWIpXG4gICAgICAgIHJlZnJlc2hCZXRJbmZvKHVzZXJJZClcbiAgICB9XG5cbiAgICBsZXQgY2hlY2tVc2VyQXV0aCA9ICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2codXNlcklkKVxuICAgICAgICBpZiAodXNlcklkKSB7XG4gICAgICAgICAgICB5b3VBcmVJbkJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpKTtcbiAgICAgICAgICAgIHVuYXV0aE1zZ3MuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LmFkZCgnaGlkZScpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobGV0IHlvdUFyZUluQnRuIG9mIHlvdUFyZUluQnRucykge1xuICAgICAgICAgICAgICAgIHlvdUFyZUluQnRuLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoY29uc3QgdW5hdXRoTWVzIG9mIHVuYXV0aE1zZ3MpIHtcbiAgICAgICAgICAgICAgICB1bmF1dGhNZXMuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHBsYWNlQmV0KGJldCkge1xuICAgICAgICBpZiAoIXVzZXJJZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKGJldClcblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByZWRpY3RfX2NvbnRhaW5lci5hY3RpdmVcIilcbiAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKCcucHJlZGljdF9fdGVhbS1pbmNyZWFzZSwgLnByZWRpY3RfX3RlYW0tZGVjcmVhc2UnKVxuICAgICAgICAgICAgLmZvckVhY2goYnRuID0+IHtcbiAgICAgICAgICAgICAgICBzY29yZUluaXQoYnRuKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGFjdGl2ZVRhYnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdvYWxDb250XCIpXG4gICAgICAgIC8vIGNvbnN0IGFjdGl2ZUlucHV0ID0gYWN0aXZlVGFiLnF1ZXJ5U2VsZWN0b3IoXCIucHJlZGljdF9fcmFkaW8taXRlbSBpbnB1dFwiKVxuXG5cblxuICAgICAgICBsZXQgcmVxID0ge1xuICAgICAgICAgICAgbWF0Y2hOdW1iZXI6IGJldC5tYXRjaE51bWJlcixcbiAgICAgICAgICAgIHVzZXJpZDogYmV0LnVzZXJpZCxcbiAgICAgICAgfTtcblxuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGFjdGl2ZVRhYnMpXG4gICAgICAgIGZvciAoY29uc3QgdGFiIG9mIGFjdGl2ZVRhYnMpIHtcbiAgICAgICAgICAgIGlmICh0YWIuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlXCIpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYWN0aXZlSW5wdXQgPSB0YWIucXVlcnlTZWxlY3RvcihcIi5wcmVkaWN0X19yYWRpby1pdGVtLl9hY3RpdmUgaW5wdXRcIik7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGFiKVxuXG4gICAgICAgICAgICAgICAgaWYgKGFjdGl2ZUlucHV0KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGFjdGl2ZUlucHV0KVxuICAgICAgICAgICAgICAgICAgICByZXEuZmlyc3RHb2FsID0gYWN0aXZlSW5wdXQudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cblxuICAgICAgICBpZiAoYmV0LmZpcnN0R29hbFVwZGF0ZWQpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGJldC5maXJzdEdvYWwpXG4gICAgICAgICAgICByZXEuZmlyc3RHb2FsID0gYmV0LmZpcnN0R29hbDtcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGJldC5nb2Fsc1VwZGF0ZWQpIHtcbiAgICAgICAgICAgIHJlcS50ZWFtMSA9IGJldC50ZWFtMTtcbiAgICAgICAgICAgIHJlcS50ZWFtMiA9IGJldC50ZWFtMjtcbiAgICAgICAgfVxuXG5cblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhhY3RpdmVJbnB1dCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGFjdGl2ZVRhYilcblxuXG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJjdXJyZW50QmV0XCIsIEpTT04uc3RyaW5naWZ5KHJlcSkpXG5cbiAgICAgICAgY29uc29sZS5sb2coc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcImN1cnJlbnRCZXRcIikpXG5cbiAgICAgICAgcmVxdWVzdCgnL2JldCcsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgYm9keTogc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcImN1cnJlbnRCZXRcIilcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ0JldCBwbGFjZWQ6JywgcmVzKTtcbiAgICAgICAgICAgICAgICBJbml0UGFnZSgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKCdFcnJvciBwbGFjaW5nIGJldDonLCBlcnJvcikpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvYWRUcmFuc2xhdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiBmZXRjaChgJHthcGlVUkx9L25ldy10cmFuc2xhdGVzLyR7bG9jYWxlfWApLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgICAgICAgICAudGhlbihqc29uID0+IHtcbiAgICAgICAgICAgICAgICBpMThuRGF0YSA9IGpzb247XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlKCk7XG4gICAgICAgICAgICAgICAgdmFyIG11dGF0aW9uT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbiAobXV0YXRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG11dGF0aW9uT2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ29hbHMtb3ItemVyb3MnKSwge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHN1YnRyZWU6IHRydWUsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGUoKSB7XG4gICAgICAgIGNvbnN0IGVsZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdHJhbnNsYXRlXScpXG4gICAgICAgIGlmKHRyYW5zbGF0ZVN0YXRlKXtcbiAgICAgICAgICAgIGVsZW1zLmZvckVhY2goZWxlbSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gZWxlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdHJhbnNsYXRlJyk7XG4gICAgICAgICAgICAgICAgZWxlbS5pbm5lckhUTUwgPSBpMThuRGF0YVtrZXldIHx8ICcqLS0tLU5FRUQgVE8gQkUgVFJBTlNMQVRFRC0tLS0qICAga2V5OiAgJyArIGtleTtcbiAgICAgICAgICAgICAgICBlbGVtLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS10cmFuc2xhdGUnKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0cmFuc2xhdGlvbiB3b3JrIVwiKVxuICAgICAgICB9XG4gICAgICAgIHJlZnJlc2hMb2NhbGl6ZWRDbGFzcyhtYWluUGFnZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVmcmVzaExvY2FsaXplZENsYXNzKGVsZW1lbnQpIHtcbiAgICAgICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBsYW5nIG9mIFsndWsnLCAnZW4nXSkge1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGxhbmcpO1xuICAgICAgICB9XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChsb2NhbGUpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBQbGFjZUJldEJ1dHRvbkNsaWNrKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJjbGlja1wiKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAoY3VycmVudEJldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjdXJyZW50QmV0ID0gbmV3IEJldCh1c2VySWQsIG1hdGNoTnVtYmVyKTtcbiAgICAgICAgfVxuICAgICAgICBwbGFjZUJldChjdXJyZW50QmV0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbml0KCkge1xuXG5cbiAgICAgICAgaW5pdENsaWNrVHJhY2tpbmcoKVxuICAgICAgICBpZiAod2luZG93LnN0b3JlKSB7XG4gICAgICAgICAgICB2YXIgc3RhdGUgPSB3aW5kb3cuc3RvcmUuZ2V0U3RhdGUoKTtcbiAgICAgICAgICAgIHVzZXJJZCA9IHN0YXRlLmF1dGguaXNBdXRob3JpemVkICYmIHN0YXRlLmF1dGguaWQgfHwgJyc7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh1c2VySWQpXG4gICAgICAgICAgICBpZighY3VycmVudEJldCl7XG4gICAgICAgICAgICAgICAgY3VycmVudEJldCA9IG5ldyBCZXQodXNlcklkLCBtYXRjaE51bWJlcilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGN1cnJlbnRCZXQgPSBuZXcgQmV0KHVzZXJJZCwgbWF0Y2hOdW1iZXIpXG4gICAgICAgICAgICBJbml0UGFnZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IGMgPSAwO1xuICAgICAgICAgICAgdmFyIGkgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGMgPCA1MCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoISF3aW5kb3cuZ191c2VyX2lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VySWQgPSB3aW5kb3cuZ191c2VyX2lkO1xuICAgICAgICAgICAgICAgICAgICAgICAgSW5pdFBhZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBJbml0UGFnZSgpO1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDIwMCk7XG5cbiAgICAgICAgfVxuICAgICAgICBJbml0UGFnZSgpXG4gICAgICAgIHBsYWNlQmV0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgUGxhY2VCZXRCdXR0b25DbGljayk7XG4gICAgICAgIC8vIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlVGVhbUNvbnRyb2xDbGljayk7XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByZWRpY3RfX3RlYW0nKS5mb3JFYWNoKCh0ZWFtRWwsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAoIXRlYW1FbC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fdGVhbS1jb250cm9sJykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0ZWFtTnVtYmVyID0gaW5kZXggKyAxO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgY29udHJvbEhUTUwgPSBgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJlZGljdF9fdGVhbS1jb250cm9sXCIgZGF0YS10ZWFtPVwidGVhbSR7dGVhbU51bWJlcn1cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJlZGljdF9fdGVhbS1kZWNyZWFzZSB0ZWFtJHt0ZWFtTnVtYmVyfS1taW51c1wiIHJvbGU9XCJidXR0b25cIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJlZGljdF9fdGVhbS1udW1iZXJcIj4wPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByZWRpY3RfX3RlYW0taW5jcmVhc2UgdGVhbSR7dGVhbU51bWJlcn0tcGx1c1wiIHJvbGU9XCJidXR0b25cIj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgO1xuXG4gICAgICAgICAgICAgICAgdGVhbUVsLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgY29udHJvbEhUTUwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJlZGljdF9fdGVhbS1pbmNyZWFzZSwgLnByZWRpY3RfX3RlYW0tZGVjcmVhc2UnKS5mb3JFYWNoKGJ0biA9PiB7XG4gICAgICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVUZWFtQ29udHJvbENsaWNrKTtcbiAgICAgICAgfSk7XG5cblxuICAgIH1cbiAgICBmdW5jdGlvbiB1cGRhdGVTY29yZShtYXRjaE51bWJlciwgdGVhbTFHb2FscywgdGVhbTJHb2Fscykge1xuICAgICAgICBpZiAoY3VycmVudEJldCAmJiBjdXJyZW50QmV0Lm1hdGNoTnVtYmVyID09PSBtYXRjaE51bWJlcikge1xuICAgICAgICAgICAgY3VycmVudEJldC51cGRhdGVHb2Fscyh0ZWFtMUdvYWxzLCB0ZWFtMkdvYWxzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGN1cnJlbnRCZXQgPSBuZXcgQmV0KHVzZXJJZCwgbWF0Y2hOdW1iZXIsIHRlYW0xR29hbHMsIHRlYW0yR29hbHMpO1xuICAgICAgICAgICAgY3VycmVudEJldC51cGRhdGVHb2Fscyh0ZWFtMUdvYWxzLCB0ZWFtMkdvYWxzKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhjdXJyZW50QmV0KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gdXBkYXRlRmlyc3RHb2FsKG1hdGNoTnVtYmVyLCBmaXJzdEdvYWwpIHtcbiAgICAgICAgaWYgKGN1cnJlbnRCZXQgJiYgY3VycmVudEJldC5tYXRjaE51bWJlciA9PT0gbWF0Y2hOdW1iZXIpIHtcbiAgICAgICAgICAgIGN1cnJlbnRCZXQudXBkYXRlRmlyc3RHb2FsKGZpcnN0R29hbCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhjdXJyZW50QmV0KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gdXBkYXRlVG9wRm9yZWNhc3RzKG1hdGNoTnVtYmVyKSB7XG4gICAgICAgIHJlcXVlc3QoYC91c2Vycy8ke21hdGNoTnVtYmVyfWApLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhLnRvcEZvcmVjYXN0cyk7IC8vINCf0LXRgNC10LLRltGA0LrQsCDQvtGC0YDQuNC80LDQvdC40YUg0LTQsNC90LjRhVxuXG4gICAgICAgICAgICBjb25zdCBmb3JlY2FzdHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fZm9yZWNhc3RzJyk7XG4gICAgICAgICAgICBmb3JlY2FzdHNDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG5cblxuICAgICAgICAgICAgZGF0YS50b3BGb3JlY2FzdHMuZm9yRWFjaChmb3JlY2FzdCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZm9yZWNhc3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgZm9yZWNhc3RJdGVtLmNsYXNzTGlzdC5hZGQoJ3ByZWRpY3RfX2ZvcmVjYXN0cy1pdGVtJyk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBwZXJjZW50YWdlID0gcGFyc2VGbG9hdChmb3JlY2FzdC5wZXJjZW50YWdlKS50b0ZpeGVkKDEpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHBlcmNlbnRhZ2VTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgICAgIHBlcmNlbnRhZ2VTcGFuLnRleHRDb250ZW50ID0gYCR7cGVyY2VudGFnZX0lYDtcblxuXG4gICAgICAgICAgICAgICAgY29uc3QgZm9yZWNhc3RUZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoYCAke2ZvcmVjYXN0LmZvcmVjYXN0ID8/IFwiMC0wXCJ9YCk7XG4gICAgICAgICAgICAgICAgZm9yZWNhc3RJdGVtLmFwcGVuZENoaWxkKHBlcmNlbnRhZ2VTcGFuKTtcbiAgICAgICAgICAgICAgICBmb3JlY2FzdEl0ZW0uYXBwZW5kQ2hpbGQoZm9yZWNhc3RUZXh0KTtcblxuICAgICAgICAgICAgICAgIGZvcmVjYXN0c0NvbnRhaW5lci5hcHBlbmRDaGlsZChmb3JlY2FzdEl0ZW0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIHRvcCBmb3JlY2FzdHM6JywgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVuZGVyVXNlcnMoKSB7XG4gICAgICAgIHJlcXVlc3QoYC91c2Vycy8ke2N1cnJlbnRUYWJUYWJsZX1gKVxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XG5cbiAgICAgICAgICAgICAgICBsZXQgdXNlcnMgPSBkYXRhLnVzZXJzXG5cbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh1c2VycylcbiAgICAgICAgICAgICAgICBjb25zdCBpc1Njb3JlVGFiQWN0aXZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX3RhYnMtc2NvcmUuYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgaXNHb2FsVGFiQWN0aXZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX3RhYnMtZ29hbC5hY3RpdmUnKTtcblxuXG4gICAgICAgICAgICAgICAgaWYodXNlcnMubGVuZ3RoID49IDMpe1xuICAgICAgICAgICAgICAgICAgICBzaG93VG9wRm9yZWNhc3QgPSB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKHVzZXJzLmxlbmd0aCA8IDMpe1xuICAgICAgICAgICAgICAgICAgICBzaG93VG9wRm9yZWNhc3QgPSBmYWxzZVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChpc1Njb3JlVGFiQWN0aXZlICYmIHNob3dUb3BGb3JlY2FzdCkgdG9wRm9yZWNhc3QuY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIilcbiAgICAgICAgICAgICAgICBpZiAoaXNHb2FsVGFiQWN0aXZlKSB0b3BGb3JlY2FzdC5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKVxuXG5cbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0eXBlb2YgdXNlcklkKVxuXG4gICAgICAgICAgICAgICAgcG9wdWxhdGVVc2Vyc1RhYmxlKHVzZXJzLCB1c2VySWQsIGN1cnJlbnRUYWJUYWJsZSlcblxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHVzZXJzKVxuICAgICAgICAgICAgfSk7XG5cbiAgICB9XG4gICAgZnVuY3Rpb24gcG9wdWxhdGVVc2Vyc1RhYmxlKHVzZXJzLCBjdXJyZW50VXNlcklkLCBtYXRjaE51bWJlcikge1xuICAgICAgICByZXN1bHRzVGFibGUuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIHJlc3VsdHNUYWJsZU90aGVyLmlubmVySFRNTCA9ICcnO1xuXG4gICAgICAgIGlmICghdXNlcnMgfHwgIXVzZXJzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIC8vIC8vINCk0ZbQu9GM0YLRgNGD0ZTQvNC+INC60L7RgNC40YHRgtGD0LLQsNGH0ZbQsiwg0Y/QutGWINC30YDQvtCx0LjQu9C4INGB0YLQsNCy0LrRgyDQvdCwINCy0LrQsNC30LDQvdC40Lkg0LzQsNGC0YdcbiAgICAgICAgLy8gY29uc3QgdXNlcnMgPSB1c2Vycy5maWx0ZXIodXNlciA9PlxuICAgICAgICAvLyAgICAgdXNlci5iZXRzLnNvbWUoYmV0ID0+IGJldC5tYXRjaE51bWJlciA9PT0gbWF0Y2hOdW1iZXIpXG4gICAgICAgIC8vICk7XG5cbiAgICAgICAgLy8gaWYgKCF1c2Vycy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICAvLyDQl9C90LDRhdC+0LTQuNC80L4g0L/QvtGC0L7Rh9C90L7Qs9C+INC60L7RgNC40YHRgtGD0LLQsNGH0LBcbiAgICAgICAgY29uc3QgY3VycmVudFVzZXIgPSB1c2Vycy5maW5kKHVzZXIgPT4gdXNlci51c2VyaWQgPT09IGN1cnJlbnRVc2VySWQpO1xuXG4gICAgICAgIC8vINCS0LjQstC+0LTQuNC80L4g0LLRgdGW0YUg0ZbQvdGI0LjRhSDQutC+0YDQuNGB0YLRg9Cy0LDRh9GW0LIg0YMgcmVzdWx0c1RhYmxlXG4gICAgICAgIHVzZXJzLmZvckVhY2godXNlciA9PiB7XG4gICAgICAgICAgICBpZiAodXNlci51c2VyaWQgIT09IGN1cnJlbnRVc2VySWQpIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5VXNlcih1c2VyLCBmYWxzZSwgcmVzdWx0c1RhYmxlLCB1c2VycywgbWF0Y2hOdW1iZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyDQktC40LLQvtC00LjQvNC+INC/0L7RgtC+0YfQvdC+0LPQviDQutC+0YDQuNGB0YLRg9Cy0LDRh9CwINCyIHJlc3VsdHNUYWJsZU90aGVyXG4gICAgICAgIGlmIChjdXJyZW50VXNlcikge1xuICAgICAgICAgICAgZGlzcGxheVVzZXIoY3VycmVudFVzZXIsIHRydWUsIHJlc3VsdHNUYWJsZU90aGVyLCB1c2VycywgbWF0Y2hOdW1iZXIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGRpc3BsYXlVc2VyKHVzZXIsIGlzQ3VycmVudFVzZXIsIHRhYmxlLCBhbGxVc2VycywgbWF0Y2hOdW1iZXIpIHtcbiAgICAgICAgbGV0IG1hdGNoRGF0ZTtcblxuICAgICAgICBpZiAobWF0Y2hOdW1iZXIgPT09IDEpIHtcbiAgICAgICAgICAgIG1hdGNoRGF0ZSA9IEZJUlNUX01BVENIX0RBVEU7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBhZGRpdGlvbmFsVXNlclJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBhZGRpdGlvbmFsVXNlclJvdy5jbGFzc0xpc3QuYWRkKCd0YWJsZV9fcm93Jyk7XG5cbiAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuaW5uZXJIVE1MID0gYFxuICAgIDxkaXYgY2xhc3M9XCJ0YWJsZV9fcm93LWl0ZW1cIj4ke2lzQ3VycmVudFVzZXIgPyB1c2VyLnVzZXJpZCA6IG1hc2tVc2VySWQodXNlci51c2VyaWQpfTwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJ0YWJsZV9fcm93LWl0ZW1cIj5cbiAgICAgICAgJHtjdXJyZW50RGF0ZSA+PSBtYXRjaERhdGUgP1xuICAgICAgICAgICAgYDxzcGFuPiR7dXNlci50ZWFtMSAhPT0gdW5kZWZpbmVkICYmIHVzZXIudGVhbTEgIT09IG51bGwgPyB1c2VyLnRlYW0xIDogXCItXCJ9PC9zcGFuPjxpbWcgc3JjPVwiaHR0cHM6Ly9mYXYtcHJvbS5jb20vaHRtbC9nb2Fscy1vci16ZXJvZXMvaW1nL3ZzLnBuZ1wiIGFsdD1cInZzXCI+PHNwYW4+JHt1c2VyLnRlYW0yICE9PSB1bmRlZmluZWQgJiYgdXNlci50ZWFtMiAhPT0gbnVsbCA/IHVzZXIudGVhbTIgOiBcIi1cIn08L3NwYW4+YCA6XG4gICAgICAgICAgICBgPHNwYW4+Kio8L3NwYW4+PGltZyBzcmM9XCJodHRwczovL2Zhdi1wcm9tLmNvbS9odG1sL2dvYWxzLW9yLXplcm9lcy9pbWcvdnMucG5nXCIgYWx0PVwidnNcIj48c3Bhbj4qKjwvc3Bhbj5gXG4gICAgICAgIH1cbiAgICA8L2Rpdj5cbiAgICBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZV9fcm93LWl0ZW1cIiA+KioqKio8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZV9fcm93LWl0ZW1cIiA+KioqKio8L2Rpdj5cbmA7XG5cbiAgICAgICAgaWYgKGlzQ3VycmVudFVzZXIpIHtcbiAgICAgICAgICAgIGFkZGl0aW9uYWxVc2VyUm93LmNsYXNzTGlzdC5hZGQoXCJ5b3VcIik7XG4gICAgICAgICAgICBhZGRpdGlvbmFsVXNlclJvdy5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZV9fcm93LWl0ZW1cIj4ke2lzQ3VycmVudFVzZXIgPyB1c2VyLnVzZXJpZCA6IG1hc2tVc2VySWQodXNlci51c2VyaWQpfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVfX3Jvdy1pdGVtXCI+XG4gICAgICAgICAgICA8c3Bhbj4ke3VzZXIudGVhbTEgIT09IHVuZGVmaW5lZCAmJiB1c2VyLnRlYW0xICE9PSBudWxsID8gdXNlci50ZWFtMSA6IFwiLVwifTwvc3Bhbj48aW1nIHNyYz1cImh0dHBzOi8vZmF2LXByb20uY29tL2h0bWwvZ29hbHMtb3ItemVyb2VzL2ltZy92cy5wbmdcIiBhbHQ9XCJ2c1wiPjxzcGFuPiR7dXNlci50ZWFtMiAhPT0gdW5kZWZpbmVkICYmIHVzZXIudGVhbTIgIT09IG51bGwgPyB1c2VyLnRlYW0yIDogXCItXCJ9PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlX19yb3ctaXRlbVwiID4qKioqKjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVfX3Jvdy1pdGVtXCIgPioqKioqPC9kaXY+XG4gICAgYDtcbiAgICAgICAgICAgIGNvbnN0IHlvdUJsb2NrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB5b3VCbG9jay5jbGFzc0xpc3QuYWRkKCd0YWJsZV9fcm93LXlvdScpO1xuICAgICAgICAgICAgeW91QmxvY2suc2V0QXR0cmlidXRlKCdkYXRhLXRyYW5zbGF0ZScsICd0YWJsZVlvdScpO1xuICAgICAgICAgICAgLy8geW91QmxvY2sudGV4dENvbnRlbnQgPSBcIllvdVwiO1xuICAgICAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuaW5zZXJ0QmVmb3JlKHlvdUJsb2NrLCBhZGRpdGlvbmFsVXNlclJvdy5jaGlsZHJlblsxXSk7XG4gICAgICAgIH1cblxuICAgICAgICB0YWJsZS5hcHBlbmQoYWRkaXRpb25hbFVzZXJSb3cpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBtYXNrVXNlcklkKHVzZXJJZCkge1xuICAgICAgICByZXR1cm4gXCIqKlwiICsgdXNlcklkLnRvU3RyaW5nKCkuc2xpY2UoMik7XG4gICAgfVxuXG4gICAgLy8gM0QgYW5pbVxuICAgIGNvbnN0IGNhcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50ZWFtLCAuYW5pbUNhcmQsIC5hbmltUmlnaHRcIik7IC8vINCU0L7QsdCw0LLQu9GP0LXQvCAuYW5pbVJpZ2h0XG4gICAgbGV0IGFuZ2xlID0gMDtcblxuICAgIGZ1bmN0aW9uIGFuaW1hdGVDYXJkcygpIHtcbiAgICAgICAgYW5nbGUgKz0gMC45OyAvLyBzcGVlZFxuICAgICAgICBjb25zdCByb3RhdGVYID0gTWF0aC5zaW4oYW5nbGUgKiAoTWF0aC5QSSAvIDE4MCkpICogMTA7IC8vINCa0L7Qu9C10LHQsNC90LjQtSDQv9C+IFhcbiAgICAgICAgY29uc3Qgcm90YXRlWSA9IE1hdGguY29zKGFuZ2xlICogKE1hdGguUEkgLyAxODApKSAqIDEwOyAvLyDQmtC+0LvQtdCx0LDQvdC40LUg0L/QviBZXG5cbiAgICAgICAgY2FyZHMuZm9yRWFjaChjYXJkID0+IHtcbiAgICAgICAgICAgIGlmIChjYXJkLmNsYXNzTGlzdC5jb250YWlucyhcImFuaW1SaWdodFwiKSkge1xuICAgICAgICAgICAgICAgIGNhcmQuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZVkoJHstcm90YXRlWX1kZWcpIHJvdGF0ZVgoJHstcm90YXRlWH1kZWcpYDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2FyZC5zdHlsZS50cmFuc2Zvcm0gPSBgcm90YXRlWSgke3JvdGF0ZVl9ZGVnKSByb3RhdGVYKCR7cm90YXRlWH1kZWcpYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGVDYXJkcyk7XG4gICAgfVxuICAgIGFuaW1hdGVDYXJkcygpO1xuXG4gICAgLy8gcHJlZGljdCB0YWJzXG4gICAgY29uc3QgdGFicyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcmVkaWN0X190YWJzLWdsb2JhbCA+IGRpdiwgLnByZWRpY3RfX3RhYnMtZGF0ZXMgPiBkaXYnKTtcbiAgICBjb25zdCBjb250YWluZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByZWRpY3RfX2NvbnRhaW5lcicpO1xuXG4gICAgZnVuY3Rpb24gaGFuZGxlVGFiQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgbGV0IG1hdGNoRGF0ZTtcbiAgICAgICAgbGV0IGN1cnJlbnRNYXRjaCA9IDFcblxuICAgICAgICBjb25zdCBjbGlja2VkVGFiID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoXCIucHJlZGljdF9fdGFicy1kYXRlXCIpIHx8IGV2ZW50LnRhcmdldC5jbG9zZXN0KFwiLnByZWRpY3RfX3RhYnMtZ29hbFwiKSB8fCBldmVudC50YXJnZXQuY2xvc2VzdChcIi5wcmVkaWN0X190YWJzLXNjb3JlXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhjbGlja2VkVGFiKVxuICAgICAgICBjb25zdCB0YWJQYWlyID0gY2xpY2tlZFRhYi5jbG9zZXN0KCcucHJlZGljdF9fdGFicy1nbG9iYWwnKSB8fCBjbGlja2VkVGFiLmNsb3Nlc3QoJy5wcmVkaWN0X190YWJzLWRhdGVzJyk7XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coY2xpY2tlZFRhYilcblxuICAgICAgICBpZihjdXJyZW50TWF0Y2ggPT09IDEpe1xuICAgICAgICAgICAgbWF0Y2hEYXRlID0gRklSU1RfTUFUQ0hfREFURVxuICAgICAgICB9XG4gICAgICAgIGlmKGN1cnJlbnREYXRlID4gbWF0Y2hEYXRlKXtcbiAgICAgICAgICAgIHBsYWNlQmV0QnRuLmNsYXNzTGlzdC5hZGQoXCJfbG9ja1wiKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHBsYWNlQmV0QnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJfbG9ja1wiKVxuICAgICAgICB9XG5cblxuICAgICAgICBpZiAoY2xpY2tlZFRhYi5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSByZXR1cm47XG4gICAgICAgIGlmICh0YWJQYWlyKSB7XG4gICAgICAgICAgICBjb25zdCBwYWlyID0gdGFiUGFpci5xdWVyeVNlbGVjdG9yQWxsKCcuYWN0aXZlJyk7XG4gICAgICAgICAgICBpZiAocGFpci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgcGFpclswXS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNsaWNrZWRUYWIuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgIHVwZGF0ZUNvbnRhaW5lcnMoKTtcbiAgICAgICAgLy8gcmVmcmVzaEJldEluZm8odXNlcklkKVxuICAgICAgICBpZihjbGlja2VkVGFiLmNsb3Nlc3QoJy5wcmVkaWN0X190YWJzLXNjb3JlJykpe1xuICAgICAgICAgICAgdXBkYXRlVG9wRm9yZWNhc3RzKGN1cnJlbnRNYXRjaClcbiAgICAgICAgICAgIGN1cnJlbnRCZXQgPSBuZXcgQmV0KHVzZXJJZCwgY3VycmVudE1hdGNoKVxuICAgICAgICAgICAgbWF0Y2hOdW1iZXIgPSAxXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByZWRpY3RfX3RlYW0tbnVtYmVyXCIpLmZvckVhY2goKHNjb3JlLCBpKSA9PntcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhtYXRjaERhdGUsIG1hdGNoTnVtYmVyKVxuICAgICAgICAgICAgICAgIGlmKGN1cnJlbnREYXRlID4gbWF0Y2hEYXRlICYmIGkgPT09IDEgJiYgbWF0Y2hOdW1iZXIgPT09IDEpe1xuICAgICAgICAgICAgICAgICAgICBzY29yZS50ZXh0Q29udGVudCA9IFwiMFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYoY3VycmVudERhdGUgPiBtYXRjaERhdGUgJiYgaSA9PT0gMCAmJiBtYXRjaE51bWJlciA9PT0gMSl7XG4gICAgICAgICAgICAgICAgICAgIHNjb3JlLnRleHRDb250ZW50ID0gXCIwXCJcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFt0eXBlPVwicmFkaW9cIl06Y2hlY2tlZCcpLmZvckVhY2goYnV0dG9uID0+IHtcbiAgICAgICAgICAgICAgICBidXR0b24uY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuICAgICAgICBsb2NrTWF0Y2hDb250YWluZXIoRklSU1RfTUFUQ0hfREFURSwgMSk7IC8vINCU0LvRjyDQv9C10YDRiNC+0LPQviDQvNCw0YLRh9GDXG4gICAgfVxuXG4gICAgdGFicy5mb3JFYWNoKHRhYiA9PiB0YWIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVUYWJDbGljaykpO1xuXG4gICAgZnVuY3Rpb24gdXBkYXRlQ29udGFpbmVycygpIHtcbiAgICAgICAgY29udGFpbmVycy5mb3JFYWNoKGNvbnRhaW5lciA9PiBjb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xuICAgICAgICByZWZyZXNoQmV0SW5mbyh1c2VySWQpXG4gICAgICAgIGNvbnN0IGlzU2NvcmVUYWJBY3RpdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fdGFicy1zY29yZS5hY3RpdmUnKTtcbiAgICAgICAgY29uc3QgaXNHb2FsVGFiQWN0aXZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX3RhYnMtZ29hbC5hY3RpdmUnKTtcblxuXG4gICAgICAgIGlmIChpc1Njb3JlVGFiQWN0aXZlKSB7XG4gICAgICAgICAgICBpZiAoc2hvd1RvcEZvcmVjYXN0KSB0b3BGb3JlY2FzdC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVwiKVxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX2NvbnRhaW5lci5zY29yZS0xJykuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fdGFicy10eHQtMicpLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X190YWJzLXR4dC0xJykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzR29hbFRhYkFjdGl2ZSkge1xuICAgICAgICAgICAgaWYgKHNob3dUb3BGb3JlY2FzdCkgdG9wRm9yZWNhc3QuY2xhc3NMaXN0LmFkZChcImhpZGVcIilcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X190YWJzLXR4dC0xJykuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX3RhYnMtdHh0LTInKS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fY29udGFpbmVyLmdvYWwtMScpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy9zY29yZVxuXG4gICAgZnVuY3Rpb24gc2NvcmVJbml0KGJ0bil7XG4gICAgICAgIGNvbnN0IHRlYW1Db250cm9sID0gYnRuLmNsb3Nlc3QoJy5wcmVkaWN0X190ZWFtLWNvbnRyb2wnKTtcbiAgICAgICAgY29uc3QgdGVhbU51bWJlciA9IHRlYW1Db250cm9sLnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X190ZWFtLW51bWJlcicpXG4gICAgICAgIGNvbnN0IG1hdGNoQ29udGFpbmVyID0gYnRuLmNsb3Nlc3QoJy5wcmVkaWN0X19jb250YWluZXInKTtcbiAgICAgICAgY29uc3QgbWF0Y2hOdW1iZXIgPSBwYXJzZUludChtYXRjaENvbnRhaW5lci5kYXRhc2V0Lm1hdGNoTnVtYmVyKTtcblxuICAgICAgICBjb25zdCBnZXRHb2FscyA9ICh0ZWFtKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gbWF0Y2hDb250YWluZXIucXVlcnlTZWxlY3RvcihgW2RhdGEtdGVhbT1cIiR7dGVhbX1cIl0gLnByZWRpY3RfX3RlYW0tbnVtYmVyYCk7XG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudCA/IE51bWJlcihlbGVtZW50LnRleHRDb250ZW50KSB8fCAwIDogMDtcbiAgICAgICAgfTtcblxuXG4gICAgICAgIGNvbnN0IHRlYW0xR29hbHMgPSBnZXRHb2FscygndGVhbTEnKSA7XG4gICAgICAgIGNvbnN0IHRlYW0yR29hbHMgPSBnZXRHb2FscygndGVhbTInKTtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0ZWFtMUdvYWxzLCB0ZWFtMkdvYWxzKVxuXG4gICAgICAgIHVwZGF0ZVNjb3JlKG1hdGNoTnVtYmVyLCB0ZWFtMUdvYWxzLCB0ZWFtMkdvYWxzKTtcbiAgICB9XG5cbiAgICAvL3RhYmxlIHRhYnNcbiAgICAvLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFibGVfX3RhYnMtZGF0ZScpLmZvckVhY2godGFiID0+IHtcbiAgICAvLyAgICAgdGFiLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgLy8gICAgICAgICBpZiAodGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XG4gICAgLy8gICAgICAgICAgICAgcmV0dXJuO1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYmxlX190YWJzLWRhdGUnKS5mb3JFYWNoKHRhYiA9PiB0YWIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xuICAgIC8vICAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAvLyAgICAgICAgIGN1cnJlbnRUYWJUYWJsZSA9IE51bWJlcihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhYmxlX190YWJzLWRhdGUuYWN0aXZlXCIpLmdldEF0dHJpYnV0ZShcImRhdGEtbWF0Y2gtbnVtYmVyXCIpKVxuICAgIC8vICAgICAgICAgcmVuZGVyVXNlcnMoKTtcbiAgICAvLyAgICAgfSk7XG4gICAgLy8gfSk7XG5cblxuICAgIC8vcG9wdXBzXG5cbiAgICBmdW5jdGlvbiBzZXRQb3B1cHModHJpZ2dlckJ1dHRvbnMsIHBvcHVwQ2xhc3MpIHtcbiAgICAgICAgY29uc3QgcG9wdXBzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwcycpO1xuICAgICAgICBjb25zdCBwb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5wb3B1cHNfX2l0ZW0uJHtwb3B1cENsYXNzfWApO1xuICAgICAgICBjb25zdCBwb3B1cEJ0biA9IHBvcHVwc0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwc19faXRlbS1idG5cIilcblxuXG4gICAgICAgIGlmICghdHJpZ2dlckJ1dHRvbnMgfHwgIXBvcHVwIHx8ICFwb3B1cHNDb250YWluZXIpIHJldHVybjtcblxuICAgICAgICB0cmlnZ2VyQnV0dG9ucy5mb3JFYWNoKHRyaWdnZXJCdXR0b24gPT4ge1xuICAgICAgICAgICAgdHJpZ2dlckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBwb3B1cHNDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnX29wYWNpdHknKTtcbiAgICAgICAgICAgICAgICBwb3B1cHNDb250YWluZXIuY2xhc3NMaXN0LmFkZChwb3B1cENsYXNzKTtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgY2xvc2VCdXR0b24gPSBwb3B1cC5xdWVyeVNlbGVjdG9yKCcucG9wdXBzX19pdGVtLWNsb3NlJyk7XG4gICAgICAgIGNvbnN0IGJ0bkNsb3NlID0gcG9wdXAucXVlcnlTZWxlY3RvcignLmJ0bi1jbG9zZScpO1xuXG4gICAgICAgIHBvcHVwc0NvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgICAgIGlmIChlLnRhcmdldCA9PT0gcG9wdXBzQ29udGFpbmVyIHx8IGUudGFyZ2V0ID09PSBjbG9zZUJ1dHRvbiB8fCBlLnRhcmdldCA9PT0gYnRuQ2xvc2UpIHtcbiAgICAgICAgICAgICAgICBjbG9zZVBvcHVwKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZ1bmN0aW9uIGNsb3NlUG9wdXAoKSB7XG4gICAgICAgICAgICBwb3B1cHNDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnX29wYWNpdHknKTtcbiAgICAgICAgICAgIHBvcHVwc0NvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKHBvcHVwQ2xhc3MpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICcnO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHBvcHVwQnRuKVxuICAgICAgICBwb3B1cEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+e1xuICAgICAgICAgICAgY2xvc2VQb3B1cCgpXG4gICAgICAgIH0pXG5cbiAgICB9XG5cbiAgICBzZXRQb3B1cHMoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdpZGVfX2xpc3QtYnRuJyksICdnaWRlUG9wdXAnKTtcbiAgICBzZXRQb3B1cHMoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByZWRpY3RfX2J0bi50b29rLXBhcnQnKSwgJ19jb25maXJtUG9wdXAnKTtcblxuICAgIC8vZ28gdG8gcHJlZGljdFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9QcmVkaWN0XCIpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCB0YXJnZXRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmVkaWN0XCIpO1xuICAgICAgICBjb25zdCB0YXJnZXRQb3NpdGlvbiA9IHRhcmdldEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgd2luZG93LnBhZ2VZT2Zmc2V0IC0gMjtcblxuICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oe1xuICAgICAgICAgICAgdG9wOiB0YXJnZXRQb3NpdGlvbixcbiAgICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJyxcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCByYWRpb0NvbnRhaW5lcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJlZGljdF9fcmFkaW8nKTtcblxuICAgIHJhZGlvQ29udGFpbmVycy5mb3JFYWNoKGNvbnRhaW5lciA9PiB7XG4gICAgICAgIGNvbnN0IHJhZGlvSW5wdXRzID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcmVkaWN0X19yYWRpby1pdGVtJyk7XG5cbiAgICAgICAgcmFkaW9JbnB1dHMuZm9yRWFjaCgocmFkaW8pID0+IHtcbiAgICAgICAgICAgIHJhZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJhZGlvSW5wdXRzLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ19hY3RpdmUnKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdfYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5xdWVyeVNlbGVjdG9yKFwiaW5wdXRcIikudmFsdWUpXG5cbiAgICAgICAgICAgICAgICB1cGRhdGVGaXJzdEdvYWwobWF0Y2hOdW1iZXIsIHRoaXMucXVlcnlTZWxlY3RvcihcImlucHV0XCIpLnZhbHVlKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgbGV0IGNsaWNrU3RhdHMgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ2NsaWNrU3RhdHMnKSkgfHwgW107XG5cbiAgICBmdW5jdGlvbiBjbGlja1RyYWNraW5nKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGNsaWNrTmFtZSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWNsaWNrLW5hbWUnKTtcbiAgICAgICAgY29uc3QgY2xpY2tEcm9wID0gZXZlbnQuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY2xpY2stZHJvcCcpO1xuXG4gICAgICAgIGlmICghY2xpY2tOYW1lKSByZXR1cm47XG5cbiAgICAgICAgaWYgKGNsaWNrRHJvcCkge1xuICAgICAgICAgICAgY29uc3QgaXNBdXRoID0gISF1c2VySWQ7XG5cbiAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nSXRlbSA9IGNsaWNrU3RhdHMuZmluZChcbiAgICAgICAgICAgICAgICBpdGVtID0+IGl0ZW0uY2xpY2tlZEl0ZW0gPT09IGNsaWNrTmFtZSAmJiBpdGVtLmF1dGggPT09IGlzQXV0aFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgaWYgKGV4aXN0aW5nSXRlbSkge1xuICAgICAgICAgICAgICAgIGV4aXN0aW5nSXRlbS5jb3VudGVyICs9IDE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNsaWNrU3RhdHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGNsaWNrZWRJdGVtOiBjbGlja05hbWUsXG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXI6IDEsXG4gICAgICAgICAgICAgICAgICAgIGF1dGg6IGlzQXV0aFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZXhpc3RpbmdJdGVtID0gY2xpY2tTdGF0cy5maW5kKGl0ZW0gPT4gaXRlbS5jbGlja2VkSXRlbSA9PT0gY2xpY2tOYW1lKTtcbiAgICAgICAgICAgIGlmIChleGlzdGluZ0l0ZW0pIHtcbiAgICAgICAgICAgICAgICBleGlzdGluZ0l0ZW0uY291bnRlciArPSAxO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjbGlja1N0YXRzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBjbGlja2VkSXRlbTogY2xpY2tOYW1lLFxuICAgICAgICAgICAgICAgICAgICBjb3VudGVyOiAxXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdjbGlja1N0YXRzJywgSlNPTi5zdHJpbmdpZnkoY2xpY2tTdGF0cykpO1xuICAgICAgICBjb25zb2xlLmxvZyhjbGlja1N0YXRzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbml0Q2xpY2tUcmFja2luZygpIHtcbiAgICAgICAgY29uc3QgY2xpY2thYmxlRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1jbGljay1uYW1lXScpO1xuICAgICAgICBjbGlja2FibGVFbGVtZW50cy5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tUcmFja2luZyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZUNsaWNrVHJhY2tpbmcoKSB7XG4gICAgICAgIGNvbnN0IGNsaWNrYWJsZUVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtY2xpY2stbmFtZV0nKTtcbiAgICAgICAgY2xpY2thYmxlRWxlbWVudHMuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrVHJhY2tpbmcpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZW5kQ2xpY2tTdGF0cygpIHtcbiAgICAgICAgY29uc3Qgc3RvcmVkU3RhdHMgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ2NsaWNrU3RhdHMnKSk7XG5cbiAgICAgICAgaWYgKCFzdG9yZWRTdGF0cyB8fCBzdG9yZWRTdGF0cy5sZW5ndGggPT09IDApIHJldHVybjtcblxuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KCBzdG9yZWRTdGF0cykpXG5cbiAgICAgICAgZmV0Y2goYCR7YXBpVVJMfS9jbGljay1zdGF0YCwge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHN0b3JlZFN0YXRzKVxuICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgICAgICBjbGlja1N0YXRzID0gW107XG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oJ2NsaWNrU3RhdHMnKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ9Ca0LvRltC60Lgg0YPRgdC/0ZbRiNC90L4g0LLRltC00L/RgNCw0LLQu9C10L3QviDQuSDQvtGH0LjRidC10L3QvicpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ9Cf0L7QvNC40LvQutCwINC/0YDQuCDQstGW0LTQv9GA0LDQstGG0ZYg0LrQu9GW0LrRltCyJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcign0J/QvtC80LjQu9C60LAg0LfKvNGU0LTQvdCw0L3QvdGPOicsIGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNldEludGVydmFsKHNlbmRDbGlja1N0YXRzLCAxMDAwMCk7XG5cbiAgICBsb2FkVHJhbnNsYXRpb25zKClcbiAgICAgICAgLnRoZW4oaW5pdClcblxuXG4gICAgLy8g0J3QvtCy0LAg0YTRg9C90LrRhtGW0Y8g0LTQu9GPINC+0LHRgNC+0LHQutC4INC60LvRltC60ZbQsiDQvdCwINC60L3QvtC/0LrQuCArLy1cbiAgICBmdW5jdGlvbiBoYW5kbGVUZWFtQ29udHJvbENsaWNrKGUpIHtcbiAgICAgICAgY29uc3QgYnRuID0gZS50YXJnZXQuY2xvc2VzdCgnLnByZWRpY3RfX3RlYW0taW5jcmVhc2UsIC5wcmVkaWN0X190ZWFtLWRlY3JlYXNlJyk7XG4gICAgICAgIGlmICghYnRuKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgdGVhbUNvbnRyb2wgPSBidG4uY2xvc2VzdCgnLnByZWRpY3RfX3RlYW0tY29udHJvbCcpO1xuICAgICAgICBjb25zdCB0ZWFtTnVtYmVyID0gdGVhbUNvbnRyb2wucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX3RlYW0tbnVtYmVyJyk7XG4gICAgICAgIGNvbnN0IG1hdGNoQ29udGFpbmVyID0gYnRuLmNsb3Nlc3QoJy5wcmVkaWN0X19jb250YWluZXInKTtcblxuICAgICAgICBsZXQgdmFsdWUgPSBwYXJzZUludCh0ZWFtTnVtYmVyLnRleHRDb250ZW50KTtcbiAgICAgICAgaWYgKGJ0bi5jbGFzc0xpc3QuY29udGFpbnMoJ3ByZWRpY3RfX3RlYW0taW5jcmVhc2UnKSkge1xuICAgICAgICAgICAgdmFsdWUgKz0gMTtcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA+IDApIHtcbiAgICAgICAgICAgIHZhbHVlIC09IDE7XG4gICAgICAgIH1cbiAgICAgICAgdGVhbU51bWJlci50ZXh0Q29udGVudCA9IGAke3ZhbHVlfWA7XG4gICAgICAgIHNjb3JlSW5pdChidG4pO1xuICAgIH1cblxuICAgIC8vINCd0L7QstCwINGE0YPQvdC60YbRltGPINC00LvRjyDQvtCx0YDQvtCx0LrQuCDQutC70ZbQutGDINC90LAg0LrQvdC+0L/QutGDINGB0YLQsNCy0LrQuFxuICAgIGZ1bmN0aW9uIGhhbmRsZVBsYWNlQmV0Q2xpY2soZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImNsaWNrXCIpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmKGN1cnJlbnRCZXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY3VycmVudEJldCA9IG5ldyBCZXQodXNlcklkLCBtYXRjaE51bWJlcik7XG4gICAgICAgIH1cbiAgICAgICAgcGxhY2VCZXQoY3VycmVudEJldCk7XG4gICAgfVxuXG5cblxufSkoKVxuXG5cblxuIl19
