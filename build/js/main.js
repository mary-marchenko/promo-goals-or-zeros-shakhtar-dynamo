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
  var _sessionStorage$getIt, _document$querySelect3, _sessionStorage$getIt2;
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
  window.addEventListener('error', function (e) {
    reportError(e.error || e);
    return false;
  });
  window.addEventListener('unhandledrejection', function (e) {
    reportError(e.reason || e);
  });
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
      console.log(i18nData);
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
  function init() {
    if (!currentBet) {
      currentBet = new Bet(userId, matchNumber);
    }
    if (window.store) {
      var state = window.store.getState();
      userId = state.auth.isAuthorized && state.auth.id || '';
      // currentBet = new Bet(userId, matchNumber)
      InitPage();
    } else {
      InitPage();
      var c = 0;
      var i = setInterval(function () {
        if (c < 50) {
          if (!!window.g_user_id) {
            userId = window.g_user_id;
            InitPage();
            clearInterval(i);
          }
        } else {
          clearInterval(i);
        }
      }, 200);
    }
    InitPage();
    placeBetBtn.addEventListener('click', function (e) {
      console.log("click");
      e.preventDefault();
      if (currentBet === undefined) {
        currentBet = new Bet(userId, matchNumber);
      }
      placeBet(currentBet);
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
      if (users.length >= 50) {
        showTopForecast = true;
      }
      if (users.length < 50) {
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
    additionalUserRow.innerHTML = "\n        <div class=\"table__row-item\">".concat(isCurrentUser ? user.userid : maskUserId(user.userid), "</div>\n        <div class=\"table__row-item\">\n            ").concat(currentDate >= matchDate ? "<span>".concat(user.team1 !== undefined && user.team1 !== null ? user.team1 : "-", "</span><img src=\"https://fav-prom.com/html/goals-or-zeroes/img/vs.png\" alt=\"vs\"><span>").concat(user.team2 !== undefined && user.team2 !== null ? user.team2 : "-", "</span>") : "<span>**</span><img src=\"https://fav-prom.com/html/goals-or-zeroes/img/vs.png\" alt=\"vs\"><span>**</span>", "\n        </div>\n\n        ").concat(user.winner === true ? "<div class=\"table__row-item\" data-translate=\"prize\">*****</div>" : "<div class=\"table__row-item\" data-translate=\"noWinners\">*****</div>", "\n\n        ").concat(user.bonusFirstGoal === true ? "<div class=\"table__row-item\" data-translate=\"ss500\">*****</div>" : "<div class=\"table__row-item\" data-translate=\"noWinners\">*****</div>", "\n    ");
    if (isCurrentUser) {
      additionalUserRow.classList.add("you");
      additionalUserRow.innerHTML = "\n            <div class=\"table__row-item\">".concat(isCurrentUser ? user.userid : maskUserId(user.userid), "</div>\n            <div class=\"table__row-item\">\n                <span>").concat(user.team1 !== undefined && user.team1 !== null ? user.team1 : "-", "</span><img src=\"https://fav-prom.com/html/goals-or-zeroes/img/vs.png\" alt=\"vs\"><span>").concat(user.team2 !== undefined && user.team2 !== null ? user.team2 : "-", "</span>\n            </div>\n            ").concat(user.winner === true ? "<div class=\"table__row-item\" data-translate=\"prize\">*****</div>" : "<div class=\"table__row-item\" data-translate=\"noWinners\">*****</div>", "\n\n            ").concat(user.bonusFirstGoal === true ? "<div class=\"table__row-item\" data-translate=\"ss500\">*****</div>" : "<div class=\"table__row-item\" data-translate=\"noWinners\">*****</div>", "\n        ");
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
    // console.log(clickedTab)
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
  document.querySelectorAll('.predict__team-increase, .predict__team-decrease').forEach(function (btn) {
    btn.addEventListener("click", function () {
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
      // console.log(bet)
    });
  });

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
  loadTranslations().then(init);

  // TEST
  document.querySelector('.dark-btn').addEventListener('click', function () {
    document.body.classList.toggle('dark');
  });
  var lngBtn = document.querySelector(".lng-btn");
  lngBtn.addEventListener("click", function () {
    if (sessionStorage.getItem("locale")) {
      sessionStorage.removeItem("locale");
    } else {
      sessionStorage.setItem("locale", "en");
    }
    window.location.reload();
  });
  var authBtn = document.querySelector(".auth-btn");
  authBtn.addEventListener("click", function () {
    if (userId) {
      sessionStorage.removeItem("userId");
    } else {
      sessionStorage.setItem("userId", "18908465");
    }
    window.location.reload();
  });
  document.querySelectorAll('.btn-lastPred').forEach(function (button) {
    button.addEventListener('click', function () {
      document.querySelectorAll('.predict__last').forEach(function (element) {
        element.classList.toggle('hide');
      });
    });
  });
  setPopups(document.querySelectorAll('.btn-thenks'), '_confirmPopup');
  document.querySelectorAll('.btn-predict').forEach(function (button) {
    button.addEventListener('click', function () {
      document.querySelectorAll('.unconfirmed').forEach(function (unconfirmed) {
        unconfirmed.classList.toggle('active');
      });
      document.querySelectorAll('.confirmed').forEach(function (confirmed) {
        confirmed.classList.toggle('active');
      });
    });
  });
  document.addEventListener("DOMContentLoaded", function () {
    var _document$querySelect;
    (_document$querySelect = document.querySelector(".menu-btn")) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.addEventListener("click", function () {
      var _document$querySelect2;
      (_document$querySelect2 = document.querySelector(".menu-test")) === null || _document$querySelect2 === void 0 ? void 0 : _document$querySelect2.classList.toggle("hide");
    });
  });
  (_document$querySelect3 = document.querySelector(".btn-after")) === null || _document$querySelect3 === void 0 ? void 0 : _document$querySelect3.addEventListener("click", function () {
    var FIRST_MATCH_DATE = new Date('2022-03-20T21:15:00');
    lockMatchContainer(FIRST_MATCH_DATE, 1);
    placeBetBtn.classList.add("_lock");
    console.log("lock table");
  });
  userId = (_sessionStorage$getIt2 = sessionStorage.getItem("userId")) !== null && _sessionStorage$getIt2 !== void 0 ? _sessionStorage$getIt2 : null;
  updateTopForecasts = function updateTopForecasts() {
    console.log('updateTopForecasts вимкнено для тесту');
  };
  renderUsers = function renderUsers() {
    console.log('renderUsers вимкнено для тесту');
  };
  populateUsersTable = function populateUsersTable() {
    console.log('populateUsersTable вимкнено для тесту');
  };
  displayUser = function displayUser() {
    console.log('displayUser вимкнено для тесту');
  };
  showTopForecast = true;
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiYXBpVVJMIiwidW5hdXRoTXNncyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsInlvdUFyZUluQnRucyIsIm1haW5QYWdlIiwicXVlcnlTZWxlY3RvciIsInJlc3VsdHNUYWJsZSIsInJlc3VsdHNUYWJsZU90aGVyIiwicGxhY2VCZXRCdG4iLCJsYXN0UHJlZGljdCIsInRvcEZvcmVjYXN0IiwiY3VycmVudFRhYiIsImN1cnJlbnRUYWJUYWJsZSIsIm1hdGNoTnVtYmVyIiwic2hvd1RvcEZvcmVjYXN0IiwiRklSU1RfTUFUQ0hfREFURSIsIkRhdGUiLCJjdXJyZW50RGF0ZSIsImxvY2tNYXRjaENvbnRhaW5lciIsIm1hdGNoRGF0ZSIsImNvbnRhaW5lcnMiLCJmb3JFYWNoIiwiY29udGFpbmVyIiwiY2xhc3NMaXN0IiwiYWRkIiwic2V0SW50ZXJ2YWwiLCJCZXQiLCJ1c2VySWQiLCJ0ZWFtMUdvYWxzIiwidGVhbTJHb2FscyIsImZpcnN0R29hbCIsInVzZXJpZCIsInRlYW0xIiwidGVhbTIiLCJ1bmRlZmluZWQiLCJnb2Fsc1VwZGF0ZWQiLCJmaXJzdEdvYWxVcGRhdGVkIiwiY2FjaGUiLCJwcmVkaWN0RGF0YSIsInRyYW5zbGF0ZVN0YXRlIiwiZGVidWciLCJsb2NhbGUiLCJzZXNzaW9uU3RvcmFnZSIsImdldEl0ZW0iLCJ1a0xlbmciLCJlbkxlbmciLCJpMThuRGF0YSIsImN1cnJlbnRCZXQiLCJyZXF1ZXN0IiwibGluayIsImV4dHJhT3B0aW9ucyIsImZldGNoIiwiaGVhZGVycyIsInRoZW4iLCJyZXMiLCJvayIsIkVycm9yIiwianNvbiIsImVyciIsImNvbnNvbGUiLCJlcnJvciIsInJlcG9ydEVycm9yIiwic3R5bGUiLCJkaXNwbGF5Iiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwic3RhcnRzV2l0aCIsIlByb21pc2UiLCJyZWplY3QiLCJyZXBvcnREYXRhIiwib3JpZ2luIiwiZXJyb3JUZXh0IiwidGV4dCIsIm1lc3NhZ2UiLCJ0eXBlIiwibmFtZSIsInN0YWNrIiwibWV0aG9kIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJ3YXJuIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJyZWFzb24iLCJnZXRMYXN0QmV0IiwiYmV0cyIsImZpbmQiLCJiZXQiLCJyZWZyZXNoQmV0SW5mbyIsInNjb3JlMSIsInNjb3JlMiIsImdvYWwxIiwiZ29hbDIiLCJkYXRhIiwiYmV0QXZhaWxhYmxlIiwic29tZSIsImxhc3RUZWFtMSIsImxhc3RUZWFtMiIsInNjb3JlVGVhbTEiLCJzY29yZVRlYW0yIiwicmVtb3ZlIiwibGFzdEJldCIsInRleHRDb250ZW50IiwiYmV0Q29uZmlybWVkIiwiaXRlbSIsInNldEF0dHJpYnV0ZSIsInRyYW5zbGF0ZSIsImNvbnRhaW5zIiwiSW5pdFBhZ2UiLCJjaGVja1VzZXJBdXRoIiwicmVuZGVyVXNlcnMiLCJ1cGRhdGVUb3BGb3JlY2FzdHMiLCJ5b3VBcmVJbkJ0biIsInVuYXV0aE1lcyIsInBsYWNlQmV0IiwibG9nIiwiYnRuIiwic2NvcmVJbml0IiwiYWN0aXZlVGFicyIsInJlcSIsInRhYiIsImFjdGl2ZUlucHV0IiwidmFsdWUiLCJzZXRJdGVtIiwibG9hZFRyYW5zbGF0aW9ucyIsIm11dGF0aW9uT2JzZXJ2ZXIiLCJNdXRhdGlvbk9ic2VydmVyIiwibXV0YXRpb25zIiwib2JzZXJ2ZSIsImdldEVsZW1lbnRCeUlkIiwiY2hpbGRMaXN0Iiwic3VidHJlZSIsImVsZW1zIiwiZWxlbSIsImtleSIsImdldEF0dHJpYnV0ZSIsImlubmVySFRNTCIsInJlbW92ZUF0dHJpYnV0ZSIsInJlZnJlc2hMb2NhbGl6ZWRDbGFzcyIsImVsZW1lbnQiLCJsYW5nIiwiaW5pdCIsInN0b3JlIiwic3RhdGUiLCJnZXRTdGF0ZSIsImF1dGgiLCJpc0F1dGhvcml6ZWQiLCJpZCIsImMiLCJpIiwiZ191c2VyX2lkIiwiY2xlYXJJbnRlcnZhbCIsInByZXZlbnREZWZhdWx0IiwidXBkYXRlU2NvcmUiLCJ1cGRhdGVHb2FscyIsInVwZGF0ZUZpcnN0R29hbCIsImZvcmVjYXN0c0NvbnRhaW5lciIsInRvcEZvcmVjYXN0cyIsImZvcmVjYXN0IiwiZm9yZWNhc3RJdGVtIiwiY3JlYXRlRWxlbWVudCIsInBlcmNlbnRhZ2UiLCJwYXJzZUZsb2F0IiwidG9GaXhlZCIsInBlcmNlbnRhZ2VTcGFuIiwiZm9yZWNhc3RUZXh0IiwiY3JlYXRlVGV4dE5vZGUiLCJhcHBlbmRDaGlsZCIsInVzZXJzIiwiaXNTY29yZVRhYkFjdGl2ZSIsImlzR29hbFRhYkFjdGl2ZSIsImxlbmd0aCIsInBvcHVsYXRlVXNlcnNUYWJsZSIsImN1cnJlbnRVc2VySWQiLCJjdXJyZW50VXNlciIsInVzZXIiLCJkaXNwbGF5VXNlciIsImlzQ3VycmVudFVzZXIiLCJ0YWJsZSIsImFsbFVzZXJzIiwiYWRkaXRpb25hbFVzZXJSb3ciLCJtYXNrVXNlcklkIiwid2lubmVyIiwiYm9udXNGaXJzdEdvYWwiLCJ5b3VCbG9jayIsImluc2VydEJlZm9yZSIsImNoaWxkcmVuIiwiYXBwZW5kIiwidG9TdHJpbmciLCJzbGljZSIsImNhcmRzIiwiYW5nbGUiLCJhbmltYXRlQ2FyZHMiLCJyb3RhdGVYIiwiTWF0aCIsInNpbiIsIlBJIiwicm90YXRlWSIsImNvcyIsImNhcmQiLCJ0cmFuc2Zvcm0iLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ0YWJzIiwiaGFuZGxlVGFiQ2xpY2siLCJldmVudCIsImN1cnJlbnRNYXRjaCIsImNsaWNrZWRUYWIiLCJ0YXJnZXQiLCJjbG9zZXN0IiwidGFiUGFpciIsInBhaXIiLCJ1cGRhdGVDb250YWluZXJzIiwic2NvcmUiLCJidXR0b24iLCJjaGVja2VkIiwidGVhbUNvbnRyb2wiLCJ0ZWFtTnVtYmVyIiwibWF0Y2hDb250YWluZXIiLCJwYXJzZUludCIsImRhdGFzZXQiLCJnZXRHb2FscyIsInRlYW0iLCJOdW1iZXIiLCJzZXRQb3B1cHMiLCJ0cmlnZ2VyQnV0dG9ucyIsInBvcHVwQ2xhc3MiLCJwb3B1cHNDb250YWluZXIiLCJwb3B1cCIsInBvcHVwQnRuIiwidHJpZ2dlckJ1dHRvbiIsIm92ZXJmbG93IiwiY2xvc2VCdXR0b24iLCJidG5DbG9zZSIsImNsb3NlUG9wdXAiLCJ0YXJnZXRFbGVtZW50IiwidGFyZ2V0UG9zaXRpb24iLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ0b3AiLCJwYWdlWU9mZnNldCIsInNjcm9sbFRvIiwiYmVoYXZpb3IiLCJyYWRpb0NvbnRhaW5lcnMiLCJyYWRpb0lucHV0cyIsInJhZGlvIiwidG9nZ2xlIiwibG5nQnRuIiwicmVtb3ZlSXRlbSIsInJlbG9hZCIsImF1dGhCdG4iLCJ1bmNvbmZpcm1lZCIsImNvbmZpcm1lZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxDQUFDLFlBQVk7RUFBQTtFQUNULElBQU1BLE1BQU0sR0FBRyw0Q0FBNEM7SUFDdkRDLFVBQVUsR0FBR0MsUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUM7SUFDckRDLFlBQVksR0FBR0YsUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUM7SUFDdERFLFFBQVEsR0FBR0gsUUFBUSxDQUFDSSxhQUFhLENBQUMsV0FBVyxDQUFDO0lBQzlDQyxZQUFZLEdBQUdMLFFBQVEsQ0FBQ0ksYUFBYSxDQUFDLGdCQUFnQixDQUFDO0lBQ3ZERSxpQkFBaUIsR0FBR04sUUFBUSxDQUFDSSxhQUFhLENBQUMsc0JBQXNCLENBQUM7SUFDbEVHLFdBQVcsR0FBR1AsUUFBUSxDQUFDSSxhQUFhLENBQUMsY0FBYyxDQUFDO0lBQ3BESSxXQUFXLEdBQUdSLFFBQVEsQ0FBQ0ksYUFBYSxDQUFDLGdCQUFnQixDQUFDO0lBQ3RESyxXQUFXLEdBQUdULFFBQVEsQ0FBQ0ksYUFBYSxDQUFDLGNBQWMsQ0FBQztFQUV4RCxJQUFJTSxVQUFVLEdBQUcsQ0FBQztFQUNsQixJQUFJQyxlQUFlLEdBQUcsQ0FBQztFQUN2QixJQUFJQyxXQUFXLEdBQUcsQ0FBQztFQUNuQixJQUFJQyxlQUFlLEdBQUcsS0FBSztFQUUzQixJ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QixTQUFTLENBQUMrTixNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2xFLENBQUMsQ0FBQztFQUNOLENBQUMsQ0FBQztFQUVGLDBCQUFBclAsUUFBUSxDQUFDSSxhQUFhLENBQUMsWUFBWSxDQUFDLDJEQUFwQyx1QkFBc0M4RSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBTTtJQUNsRSxJQUFNcEUsZ0JBQWdCLEdBQUcsSUFBSUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDO0lBQ3hERSxrQkFBa0IsQ0FBQ0gsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZDUCxXQUFXLENBQUNlLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLE9BQU8sQ0FBQztJQUNsQ21DLE9BQU8sQ0FBQzBELEdBQUcsQ0FBQyxZQUFZLENBQUM7RUFDN0IsQ0FBQyxDQUFDO0VBRUYxRixNQUFNLDZCQUFHZSxjQUFjLENBQUNDLE9BQU8sQ0FBQyxRQUFRLENBQUMsMkVBQUksSUFBSTtFQUVqRHNFLGtCQUFrQixHQUFHLDhCQUFZO0lBQzdCdEQsT0FBTyxDQUFDMEQsR0FBRyxDQUFDLHVDQUF1QyxDQUFDO0VBQ3hELENBQUM7RUFFREwsV0FBVyxHQUFHLHVCQUFZO0lBQ3RCckQsT0FBTyxDQUFDMEQsR0FBRyxDQUFDLGdDQUFnQyxDQUFDO0VBQ2pELENBQUM7RUFFRHlELGtCQUFrQixHQUFHLDhCQUFZO0lBQzdCbkgsT0FBTyxDQUFDMEQsR0FBRyxDQUFDLHVDQUF1QyxDQUFDO0VBQ3hELENBQUM7RUFFRDZELFdBQVcsR0FBRyx1QkFBWTtJQUN0QnZILE9BQU8sQ0FBQzBELEdBQUcsQ0FBQyxnQ0FBZ0MsQ0FBQztFQUNqRCxDQUFDO0VBQ0R2RyxlQUFlLEdBQUcsSUFBSTtBQUMxQixDQUFDLEdBQUciLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgYXBpVVJMID0gJ2h0dHBzOi8vZmF2LXByb20uY29tL2FwaV9mb290YmFsbF9zaGFraHRhcicsXG4gICAgICAgIHVuYXV0aE1zZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudW5hdXRoLW1zZycpLFxuICAgICAgICB5b3VBcmVJbkJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9vay1wYXJ0JyksXG4gICAgICAgIG1haW5QYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mYXYtcGFnZVwiKSxcbiAgICAgICAgcmVzdWx0c1RhYmxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Jlc3VsdHMtdGFibGUnKSxcbiAgICAgICAgcmVzdWx0c1RhYmxlT3RoZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVzdWx0cy10YWJsZS1vdGhlcicpLFxuICAgICAgICBwbGFjZUJldEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJlZGljdC1idG5cIiksXG4gICAgICAgIGxhc3RQcmVkaWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmVkaWN0X19sYXN0XCIpLFxuICAgICAgICB0b3BGb3JlY2FzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9wRm9yZWNhc3RcIilcblxuICAgIGxldCBjdXJyZW50VGFiID0gMVxuICAgIGxldCBjdXJyZW50VGFiVGFibGUgPSAxXG4gICAgbGV0IG1hdGNoTnVtYmVyID0gMVxuICAgIGxldCBzaG93VG9wRm9yZWNhc3QgPSBmYWxzZVxuXG4gICAgY29uc3QgRklSU1RfTUFUQ0hfREFURSA9IG5ldyBEYXRlKCcyMDI1LTA0LTI3VDE3OjMwOjAwJykgLy8g0LTQsNGC0LAg0LzQsNGC0YfRgyAtIDMw0YXQslxuICAgIGNvbnN0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKVxuXG4gICAgZnVuY3Rpb24gbG9ja01hdGNoQ29udGFpbmVyKG1hdGNoRGF0ZSwgbWF0Y2hOdW1iZXIpIHtcbiAgICAgICAgaWYgKG5ldyBEYXRlKCkgPiBtYXRjaERhdGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAucHJlZGljdF9fY29udGFpbmVyW2RhdGEtbWF0Y2gtbnVtYmVyPVwiJHttYXRjaE51bWJlcn1cIl1gKTtcblxuICAgICAgICAgICAgY29udGFpbmVycy5mb3JFYWNoKGNvbnRhaW5lciA9PiB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ19sb2NrJyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcGxhY2VCZXRCdG4uY2xhc3NMaXN0LmFkZChcIl9sb2NrXCIpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsb2NrTWF0Y2hDb250YWluZXIoRklSU1RfTUFUQ0hfREFURSwgMSk7IC8vINCU0LvRjyDQv9C10YDRiNC+0LPQviDQvNCw0YLRh9GDXG5cbiAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKTsgLy8g0J7QvdC+0LLQuNGC0Lgg0L/QvtGC0L7Rh9C90YMg0LTQsNGC0YNcbiAgICAgICAgbG9ja01hdGNoQ29udGFpbmVyKEZJUlNUX01BVENIX0RBVEUsIDEpO1xuICAgIH0sIDYwMDAwMCk7IC8vINCe0L3QvtCy0LvRjtCy0LDRgtC4INC60L7QttC90ZYgMTAg0YXQslxuXG4gICAgY2xhc3MgQmV0IHtcbiAgICAgICAgY29uc3RydWN0b3IodXNlcklkLCBtYXRjaE51bWJlciwgdGVhbTFHb2FscyA9IDAsIHRlYW0yR29hbHMgPSAwLCBmaXJzdEdvYWwpIHtcbiAgICAgICAgICAgIGlmKHVzZXJJZCAhPT0gbnVsbCkgdGhpcy51c2VyaWQgPSB1c2VySWQ7XG4gICAgICAgICAgICB0aGlzLm1hdGNoTnVtYmVyID0gbWF0Y2hOdW1iZXI7XG4gICAgICAgICAgICB0aGlzLnRlYW0xID0gdGVhbTFHb2FscztcbiAgICAgICAgICAgIHRoaXMudGVhbTIgPSB0ZWFtMkdvYWxzO1xuICAgICAgICAgICAgaWYoZmlyc3RHb2FsICE9PSB1bmRlZmluZWQpIHRoaXMuZmlyc3RHb2FsID0gZmlyc3RHb2FsO1xuICAgICAgICB9XG5cbiAgICAgICAgdXBkYXRlR29hbHModGVhbTFHb2FscywgdGVhbTJHb2Fscykge1xuICAgICAgICAgICAgaWYgKHRlYW0xR29hbHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMudGVhbTEgPSB0ZWFtMUdvYWxzICE9PSBudWxsID8gdGVhbTFHb2FscyA6IHRoaXMudGVhbTE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGVhbTJHb2FscyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50ZWFtMiA9IHRlYW0yR29hbHMgIT09IG51bGwgPyB0ZWFtMkdvYWxzIDogdGhpcy50ZWFtMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZ29hbHNVcGRhdGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHVwZGF0ZUZpcnN0R29hbChmaXJzdEdvYWwpIHtcbiAgICAgICAgICAgIGlmIChmaXJzdEdvYWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyc3RHb2FsID0gZmlyc3RHb2FsICE9PSBudWxsID8gZmlyc3RHb2FsIDogdGhpcy5maXJzdEdvYWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmZpcnN0R29hbFVwZGF0ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY2FjaGUgPSB7fTtcbiAgICBsZXQgcHJlZGljdERhdGEgPSBbXTtcblxuICAgIGxldCB0cmFuc2xhdGVTdGF0ZSA9IHRydWVcbiAgICBsZXQgZGVidWcgPSBmYWxzZVxuXG4gICAgbGV0IGxvY2FsZSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJsb2NhbGVcIikgPz8gXCJ1a1wiXG4gICAgLy8gbGV0IGxvY2FsZSA9IFwidWtcIlxuICAgIC8vIGxldCBsb2NhbGUgPSBcImVuXCJcblxuXG4gICAgY29uc3QgdWtMZW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3VrTGVuZycpO1xuICAgIGNvbnN0IGVuTGVuZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlbkxlbmcnKTtcblxuXG4gICAgbGV0IGkxOG5EYXRhID0ge307XG5cbiAgICBsZXQgdXNlcklkO1xuICAgIC8vIHVzZXJJZCA9IDEwMDMwMDI2ODtcblxuICAgIGxldCBjdXJyZW50QmV0O1xuXG4gICAgaWYgKHVrTGVuZykgbG9jYWxlID0gJ3VrJztcbiAgICBpZiAoZW5MZW5nKSBsb2NhbGUgPSAnZW4nO1xuXG4gICAgY29uc3QgcmVxdWVzdCA9IChsaW5rLCBleHRyYU9wdGlvbnMpID0+XG4gICAgICAgIGZldGNoKGFwaVVSTCArIGxpbmssIHtcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAuLi4oZXh0cmFPcHRpb25zIHx8IHt9KVxuICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXJlcy5vaykgdGhyb3cgbmV3IEVycm9yKCdBUEkgZXJyb3InKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdBUEkgcmVxdWVzdCBmYWlsZWQ6JywgZXJyKTtcblxuICAgICAgICAgICAgICAgIHJlcG9ydEVycm9yKGVycik7XG5cbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmF2LXBhZ2UnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cubG9jYXRpb24uaHJlZi5zdGFydHNXaXRoKFwiaHR0cHM6Ly93d3cuZmF2YmV0LmhyL1wiKSkge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvcHJvbW9jaWplL3Byb21vY2lqYS9zdHViLyc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL3Byb21vcy9wcm9tby9zdHViLyc7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gICAgICAgICAgICB9KTtcblxuICAgIGZ1bmN0aW9uIHJlcG9ydEVycm9yKGVycikge1xuICAgICAgICBjb25zdCByZXBvcnREYXRhID0ge1xuICAgICAgICAgICAgb3JpZ2luOiB3aW5kb3cubG9jYXRpb24uaHJlZixcbiAgICAgICAgICAgIHVzZXJpZDogdXNlcklkLFxuICAgICAgICAgICAgZXJyb3JUZXh0OiBlcnI/LmVycm9yIHx8IGVycj8udGV4dCB8fCBlcnI/Lm1lc3NhZ2UgfHwgJ1Vua25vd24gZXJyb3InLFxuICAgICAgICAgICAgdHlwZTogZXJyPy5uYW1lIHx8ICdVbmtub3duRXJyb3InLFxuICAgICAgICAgICAgc3RhY2s6IGVycj8uc3RhY2sgfHwgJydcbiAgICAgICAgfTtcblxuICAgICAgICBmZXRjaCgnaHR0cHM6Ly9mYXYtcHJvbS5jb20vYXBpLWNtcy9yZXBvcnRzL2FkZCcsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShyZXBvcnREYXRhKVxuICAgICAgICB9KS5jYXRjaChjb25zb2xlLndhcm4pO1xuICAgIH1cblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHJlcG9ydEVycm9yKGUuZXJyb3IgfHwgZSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd1bmhhbmRsZWRyZWplY3Rpb24nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICByZXBvcnRFcnJvcihlLnJlYXNvbiB8fCBlKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGdldExhc3RCZXQgPSAoYmV0cywgbWF0Y2hOdW1iZXIpID0+e1xuICAgICAgICBpZighYmV0cykgcmV0dXJuIGZhbHNlXG4gICAgICAgIHJldHVybiBiZXRzLmZpbmQoYmV0ID0+IGJldC5tYXRjaE51bWJlciA9PT0gbWF0Y2hOdW1iZXIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hCZXRJbmZvKHVzZXJJZCkge1xuICAgICAgICBjb25zdCBzY29yZTEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNjb3JlLTFcIilcbiAgICAgICAgY29uc3Qgc2NvcmUyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zY29yZS0yXCIpXG4gICAgICAgIGNvbnN0IGdvYWwxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nb2FsLTFcIilcbiAgICAgICAgY29uc3QgZ29hbDIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdvYWwtMlwiKVxuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKG1hdGNoTnVtYmVyKVxuXG4gICAgICAgIHJlcXVlc3QoYC9mYXZ1c2VyLyR7dXNlcklkfWAsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICAgICAgfSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIGlmKGRhdGEuYmV0cyl7XG4gICAgICAgICAgICAgICAgY29uc3QgYmV0QXZhaWxhYmxlID0gZGF0YS5iZXRzLnNvbWUoYmV0ID0+e1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmV0Lm1hdGNoTnVtYmVyID09PSBtYXRjaE51bWJlclxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYmV0QXZhaWxhYmxlKVxuICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RUZWFtMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJlZGljdF9fbGFzdC10ZWFtLnRlYW0xXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RUZWFtMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJlZGljdF9fbGFzdC10ZWFtLnRlYW0yXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNjb3JlVGVhbTEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNjb3JlVGVhbTFcIik7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2NvcmVUZWFtMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2NvcmVUZWFtMlwiKTtcbiAgICAgICAgICAgICAgICBjb25zdCBmaXJzdEdvYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByZWRpY3RfX2xhc3QtY291bnRyeVwiKTtcbiAgICAgICAgICAgICAgICBpZihiZXRBdmFpbGFibGUpe1xuICAgICAgICAgICAgICAgICAgICBsYXN0UHJlZGljdC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVwiKVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0QmV0ID0gZ2V0TGFzdEJldChkYXRhLmJldHMsIG1hdGNoTnVtYmVyKTtcbiAgICAgICAgICAgICAgICAgICAgc2NvcmVUZWFtMS50ZXh0Q29udGVudCA9IGxhc3RCZXQudGVhbTEgPT09IHVuZGVmaW5lZCA/IFwiLVwiIDpgJHtsYXN0QmV0LnRlYW0xfWA7XG4gICAgICAgICAgICAgICAgICAgIHNjb3JlVGVhbTIudGV4dENvbnRlbnQgPSBsYXN0QmV0LnRlYW0yID09PSB1bmRlZmluZWQgPyBcIi1cIiA6YCR7bGFzdEJldC50ZWFtMn1gO1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhsYXN0QmV0KVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChsYXN0QmV0LmJldENvbmZpcm1lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcmVkaWN0X19sYXN0LXJlc3VsdC51bmNvbmZpcm1lZFwiKS5mb3JFYWNoKGl0ZW0gPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJlZGljdF9fbGFzdC1yZXN1bHQuY29uZmlybWVkXCIpLmZvckVhY2goaXRlbSA9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcmVkaWN0X19sYXN0LXJlc3VsdC51bmNvbmZpcm1lZFwiKS5mb3JFYWNoKGl0ZW0gPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJlZGljdF9fbGFzdC1yZXN1bHQuY29uZmlybWVkXCIpLmZvckVhY2goaXRlbSA9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RCZXQubWF0Y2hOdW1iZXIgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RUZWFtMS5zZXRBdHRyaWJ1dGUoXCJkYXRhLXRyYW5zbGF0ZVwiLCBcInNoYWtodGFyXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFRlYW0yLnNldEF0dHJpYnV0ZShcImRhdGEtdHJhbnNsYXRlXCIsIFwiZHluYW1vXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZihzY29yZTEuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlXCIpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJlZGljdF9fbGFzdC1zY29yZVwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmVkaWN0X19sYXN0LWdvYWxcIikuY2xhc3NMaXN0LmFkZChcImhpZGVcIilcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmKGdvYWwxLmNsYXNzTGlzdC5jb250YWlucyhcImFjdGl2ZVwiKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByZWRpY3RfX2xhc3Qtc2NvcmVcIikuY2xhc3NMaXN0LmFkZChcImhpZGVcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJlZGljdF9fbGFzdC1nb2FsXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZihsYXN0QmV0LmZpcnN0R29hbCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihsYXN0QmV0LmZpcnN0R29hbCA9PT0gXCJzaGFraHRhclwiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdEdvYWwuc2V0QXR0cmlidXRlKFwiZGF0YS10cmFuc2xhdGVcIiwgXCJzaGFraHRhclwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGxhc3RCZXQuZmlyc3RHb2FsID09PSBcImR5bmFtb1wiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdEdvYWwuc2V0QXR0cmlidXRlKFwiZGF0YS10cmFuc2xhdGVcIiwgXCJkeW5hbW9cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihsYXN0QmV0LmZpcnN0R29hbCA9PT0gXCJkcmF3XCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0R29hbC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXRyYW5zbGF0ZVwiLCBcImRyYXdcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihnb2FsMS5jbGFzc0xpc3QuY29udGFpbnMoXCJhY3RpdmVcIikgfHwgZ29hbDIuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlXCIpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByZWRpY3RfX2xhc3RcIikuY2xhc3NMaXN0LmFkZChcImhpZGVcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKCFiZXRBdmFpbGFibGUpe1xuICAgICAgICAgICAgICAgICAgICBsYXN0UHJlZGljdC5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGxhc3RQcmVkaWN0LmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yOicsIGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNvbnN0IEluaXRQYWdlID0gKCkgPT4ge1xuICAgICAgICBjaGVja1VzZXJBdXRoKCk7XG4gICAgICAgIHJlbmRlclVzZXJzKCk7XG4gICAgICAgIHVwZGF0ZVRvcEZvcmVjYXN0cyhjdXJyZW50VGFiKVxuICAgICAgICByZWZyZXNoQmV0SW5mbyh1c2VySWQpXG4gICAgfVxuXG4gICAgbGV0IGNoZWNrVXNlckF1dGggPSAoKSA9PiB7XG4gICAgICAgIGlmICh1c2VySWQpIHtcbiAgICAgICAgICAgIHlvdUFyZUluQnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJykpO1xuICAgICAgICAgICAgdW5hdXRoTXNncy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QuYWRkKCdoaWRlJykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChsZXQgeW91QXJlSW5CdG4gb2YgeW91QXJlSW5CdG5zKSB7XG4gICAgICAgICAgICAgICAgeW91QXJlSW5CdG4uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChjb25zdCB1bmF1dGhNZXMgb2YgdW5hdXRoTXNncykge1xuICAgICAgICAgICAgICAgIHVuYXV0aE1lcy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gcGxhY2VCZXQoYmV0KSB7XG4gICAgICAgIGlmICghdXNlcklkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coYmV0KVxuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJlZGljdF9fY29udGFpbmVyLmFjdGl2ZVwiKVxuICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcmVkaWN0X190ZWFtLWluY3JlYXNlLCAucHJlZGljdF9fdGVhbS1kZWNyZWFzZScpXG4gICAgICAgICAgICAuZm9yRWFjaChidG4gPT4ge1xuICAgICAgICAgICAgICAgIHNjb3JlSW5pdChidG4pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgYWN0aXZlVGFicyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ29hbENvbnRcIilcbiAgICAgICAgLy8gY29uc3QgYWN0aXZlSW5wdXQgPSBhY3RpdmVUYWIucXVlcnlTZWxlY3RvcihcIi5wcmVkaWN0X19yYWRpby1pdGVtIGlucHV0XCIpXG5cblxuXG4gICAgICAgIGxldCByZXEgPSB7XG4gICAgICAgICAgICBtYXRjaE51bWJlcjogYmV0Lm1hdGNoTnVtYmVyLFxuICAgICAgICAgICAgdXNlcmlkOiBiZXQudXNlcmlkLFxuICAgICAgICB9O1xuXG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coYWN0aXZlVGFicylcbiAgICAgICAgZm9yIChjb25zdCB0YWIgb2YgYWN0aXZlVGFicykge1xuICAgICAgICAgICAgaWYgKHRhYi5jbGFzc0xpc3QuY29udGFpbnMoXCJhY3RpdmVcIikpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBhY3RpdmVJbnB1dCA9IHRhYi5xdWVyeVNlbGVjdG9yKFwiLnByZWRpY3RfX3JhZGlvLWl0ZW0uX2FjdGl2ZSBpbnB1dFwiKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0YWIpXG5cbiAgICAgICAgICAgICAgICBpZiAoYWN0aXZlSW5wdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYWN0aXZlSW5wdXQpXG4gICAgICAgICAgICAgICAgICAgIHJlcS5maXJzdEdvYWwgPSBhY3RpdmVJbnB1dC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuXG4gICAgICAgIGlmIChiZXQuZmlyc3RHb2FsVXBkYXRlZCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYmV0LmZpcnN0R29hbClcbiAgICAgICAgICAgIHJlcS5maXJzdEdvYWwgPSBiZXQuZmlyc3RHb2FsO1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYmV0LmdvYWxzVXBkYXRlZCkge1xuICAgICAgICAgICAgcmVxLnRlYW0xID0gYmV0LnRlYW0xO1xuICAgICAgICAgICAgcmVxLnRlYW0yID0gYmV0LnRlYW0yO1xuICAgICAgICB9XG5cblxuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGFjdGl2ZUlucHV0KTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coYWN0aXZlVGFiKVxuXG5cbiAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcImN1cnJlbnRCZXRcIiwgSlNPTi5zdHJpbmdpZnkocmVxKSlcblxuICAgICAgICBjb25zb2xlLmxvZyhzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiY3VycmVudEJldFwiKSlcblxuICAgICAgICByZXF1ZXN0KCcvYmV0Jywge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBib2R5OiBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiY3VycmVudEJldFwiKVxuICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnQmV0IHBsYWNlZDonLCByZXMpO1xuICAgICAgICAgICAgICAgIEluaXRQYWdlKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHBsYWNpbmcgYmV0OicsIGVycm9yKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9hZFRyYW5zbGF0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIGZldGNoKGAke2FwaVVSTH0vbmV3LXRyYW5zbGF0ZXMvJHtsb2NhbGV9YCkudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAgICAgICAgIC50aGVuKGpzb24gPT4ge1xuICAgICAgICAgICAgICAgIGkxOG5EYXRhID0ganNvbjtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpMThuRGF0YSk7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlKCk7XG4gICAgICAgICAgICAgICAgdmFyIG11dGF0aW9uT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbiAobXV0YXRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG11dGF0aW9uT2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ29hbHMtb3ItemVyb3MnKSwge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHN1YnRyZWU6IHRydWUsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGUoKSB7XG4gICAgICAgIGNvbnN0IGVsZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdHJhbnNsYXRlXScpXG4gICAgICAgIGlmKHRyYW5zbGF0ZVN0YXRlKXtcbiAgICAgICAgICAgIGVsZW1zLmZvckVhY2goZWxlbSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gZWxlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdHJhbnNsYXRlJyk7XG4gICAgICAgICAgICAgICAgZWxlbS5pbm5lckhUTUwgPSBpMThuRGF0YVtrZXldIHx8ICcqLS0tLU5FRUQgVE8gQkUgVFJBTlNMQVRFRC0tLS0qICAga2V5OiAgJyArIGtleTtcbiAgICAgICAgICAgICAgICBlbGVtLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS10cmFuc2xhdGUnKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0cmFuc2xhdGlvbiB3b3JrIVwiKVxuICAgICAgICB9XG4gICAgICAgIHJlZnJlc2hMb2NhbGl6ZWRDbGFzcyhtYWluUGFnZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVmcmVzaExvY2FsaXplZENsYXNzKGVsZW1lbnQpIHtcbiAgICAgICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBsYW5nIG9mIFsndWsnLCAnZW4nXSkge1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGxhbmcpO1xuICAgICAgICB9XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChsb2NhbGUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIGlmKCFjdXJyZW50QmV0KXtcbiAgICAgICAgICAgIGN1cnJlbnRCZXQgPSBuZXcgQmV0KHVzZXJJZCwgbWF0Y2hOdW1iZXIpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHdpbmRvdy5zdG9yZSkge1xuICAgICAgICAgICAgdmFyIHN0YXRlID0gd2luZG93LnN0b3JlLmdldFN0YXRlKCk7XG4gICAgICAgICAgICB1c2VySWQgPSBzdGF0ZS5hdXRoLmlzQXV0aG9yaXplZCAmJiBzdGF0ZS5hdXRoLmlkIHx8ICcnO1xuICAgICAgICAgICAgLy8gY3VycmVudEJldCA9IG5ldyBCZXQodXNlcklkLCBtYXRjaE51bWJlcilcbiAgICAgICAgICAgIEluaXRQYWdlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBJbml0UGFnZSgpO1xuICAgICAgICAgICAgbGV0IGMgPSAwO1xuICAgICAgICAgICAgdmFyIGkgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGMgPCA1MCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoISF3aW5kb3cuZ191c2VyX2lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VySWQgPSB3aW5kb3cuZ191c2VyX2lkO1xuICAgICAgICAgICAgICAgICAgICAgICAgSW5pdFBhZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDIwMCk7XG5cbiAgICAgICAgfVxuICAgICAgICBJbml0UGFnZSgpXG4gICAgICAgIHBsYWNlQmV0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2xpY2tcIilcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmKGN1cnJlbnRCZXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRCZXQgPSBuZXcgQmV0KHVzZXJJZCwgbWF0Y2hOdW1iZXIpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwbGFjZUJldChjdXJyZW50QmV0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHVwZGF0ZVNjb3JlKG1hdGNoTnVtYmVyLCB0ZWFtMUdvYWxzLCB0ZWFtMkdvYWxzKSB7XG4gICAgICAgIGlmIChjdXJyZW50QmV0ICYmIGN1cnJlbnRCZXQubWF0Y2hOdW1iZXIgPT09IG1hdGNoTnVtYmVyKSB7XG4gICAgICAgICAgICBjdXJyZW50QmV0LnVwZGF0ZUdvYWxzKHRlYW0xR29hbHMsIHRlYW0yR29hbHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY3VycmVudEJldCA9IG5ldyBCZXQodXNlcklkLCBtYXRjaE51bWJlciwgdGVhbTFHb2FscywgdGVhbTJHb2Fscyk7XG4gICAgICAgICAgICBjdXJyZW50QmV0LnVwZGF0ZUdvYWxzKHRlYW0xR29hbHMsIHRlYW0yR29hbHMpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGN1cnJlbnRCZXQpO1xuICAgIH1cbiAgICBmdW5jdGlvbiB1cGRhdGVGaXJzdEdvYWwobWF0Y2hOdW1iZXIsIGZpcnN0R29hbCkge1xuICAgICAgICBpZiAoY3VycmVudEJldCAmJiBjdXJyZW50QmV0Lm1hdGNoTnVtYmVyID09PSBtYXRjaE51bWJlcikge1xuICAgICAgICAgICAgY3VycmVudEJldC51cGRhdGVGaXJzdEdvYWwoZmlyc3RHb2FsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGN1cnJlbnRCZXQpO1xuICAgIH1cbiAgICBmdW5jdGlvbiB1cGRhdGVUb3BGb3JlY2FzdHMobWF0Y2hOdW1iZXIpIHtcbiAgICAgICAgcmVxdWVzdChgL3VzZXJzLyR7bWF0Y2hOdW1iZXJ9YCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGEudG9wRm9yZWNhc3RzKTsgLy8g0J/QtdGA0LXQstGW0YDQutCwINC+0YLRgNC40LzQsNC90LjRhSDQtNCw0L3QuNGFXG5cbiAgICAgICAgICAgIGNvbnN0IGZvcmVjYXN0c0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X19mb3JlY2FzdHMnKTtcbiAgICAgICAgICAgIGZvcmVjYXN0c0NvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcblxuXG4gICAgICAgICAgICBkYXRhLnRvcEZvcmVjYXN0cy5mb3JFYWNoKGZvcmVjYXN0ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3JlY2FzdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICBmb3JlY2FzdEl0ZW0uY2xhc3NMaXN0LmFkZCgncHJlZGljdF9fZm9yZWNhc3RzLWl0ZW0nKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHBlcmNlbnRhZ2UgPSBwYXJzZUZsb2F0KGZvcmVjYXN0LnBlcmNlbnRhZ2UpLnRvRml4ZWQoMSk7XG4gICAgICAgICAgICAgICAgY29uc3QgcGVyY2VudGFnZVNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICAgICAgcGVyY2VudGFnZVNwYW4udGV4dENvbnRlbnQgPSBgJHtwZXJjZW50YWdlfSVgO1xuXG5cbiAgICAgICAgICAgICAgICBjb25zdCBmb3JlY2FzdFRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShgICR7Zm9yZWNhc3QuZm9yZWNhc3QgPz8gXCIwLTBcIn1gKTtcbiAgICAgICAgICAgICAgICBmb3JlY2FzdEl0ZW0uYXBwZW5kQ2hpbGQocGVyY2VudGFnZVNwYW4pO1xuICAgICAgICAgICAgICAgIGZvcmVjYXN0SXRlbS5hcHBlbmRDaGlsZChmb3JlY2FzdFRleHQpO1xuXG4gICAgICAgICAgICAgICAgZm9yZWNhc3RzQ29udGFpbmVyLmFwcGVuZENoaWxkKGZvcmVjYXN0SXRlbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgdG9wIGZvcmVjYXN0czonLCBlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZW5kZXJVc2VycygpIHtcbiAgICAgICAgcmVxdWVzdChgL3VzZXJzLyR7Y3VycmVudFRhYlRhYmxlfWApXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcblxuICAgICAgICAgICAgICAgIGxldCB1c2VycyA9IGRhdGEudXNlcnNcblxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHVzZXJzKVxuICAgICAgICAgICAgICAgIGNvbnN0IGlzU2NvcmVUYWJBY3RpdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fdGFicy1zY29yZS5hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICBjb25zdCBpc0dvYWxUYWJBY3RpdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fdGFicy1nb2FsLmFjdGl2ZScpO1xuXG4gICAgICAgICAgICAgICAgaWYodXNlcnMubGVuZ3RoID49IDUwKXtcbiAgICAgICAgICAgICAgICAgICAgc2hvd1RvcEZvcmVjYXN0ID0gdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZih1c2Vycy5sZW5ndGggPCA1MCl7XG4gICAgICAgICAgICAgICAgICAgIHNob3dUb3BGb3JlY2FzdCA9IGZhbHNlXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGlzU2NvcmVUYWJBY3RpdmUgJiYgc2hvd1RvcEZvcmVjYXN0KSB0b3BGb3JlY2FzdC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVwiKVxuICAgICAgICAgICAgICAgIGlmIChpc0dvYWxUYWJBY3RpdmUpIHRvcEZvcmVjYXN0LmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpXG5cblxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHR5cGVvZiB1c2VySWQpXG5cbiAgICAgICAgICAgICAgICBwb3B1bGF0ZVVzZXJzVGFibGUodXNlcnMsIHVzZXJJZCwgY3VycmVudFRhYlRhYmxlKVxuXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codXNlcnMpXG4gICAgICAgICAgICB9KTtcblxuICAgIH1cbiAgICBmdW5jdGlvbiBwb3B1bGF0ZVVzZXJzVGFibGUodXNlcnMsIGN1cnJlbnRVc2VySWQsIG1hdGNoTnVtYmVyKSB7XG4gICAgICAgIHJlc3VsdHNUYWJsZS5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgcmVzdWx0c1RhYmxlT3RoZXIuaW5uZXJIVE1MID0gJyc7XG5cbiAgICAgICAgaWYgKCF1c2VycyB8fCAhdXNlcnMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgLy8gLy8g0KTRltC70YzRgtGA0YPRlNC80L4g0LrQvtGA0LjRgdGC0YPQstCw0YfRltCyLCDRj9C60ZYg0LfRgNC+0LHQuNC70Lgg0YHRgtCw0LLQutGDINC90LAg0LLQutCw0LfQsNC90LjQuSDQvNCw0YLRh1xuICAgICAgICAvLyBjb25zdCB1c2VycyA9IHVzZXJzLmZpbHRlcih1c2VyID0+XG4gICAgICAgIC8vICAgICB1c2VyLmJldHMuc29tZShiZXQgPT4gYmV0Lm1hdGNoTnVtYmVyID09PSBtYXRjaE51bWJlcilcbiAgICAgICAgLy8gKTtcblxuICAgICAgICAvLyBpZiAoIXVzZXJzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIC8vINCX0L3QsNGF0L7QtNC40LzQviDQv9C+0YLQvtGH0L3QvtCz0L4g0LrQvtGA0LjRgdGC0YPQstCw0YfQsFxuICAgICAgICBjb25zdCBjdXJyZW50VXNlciA9IHVzZXJzLmZpbmQodXNlciA9PiB1c2VyLnVzZXJpZCA9PT0gY3VycmVudFVzZXJJZCk7XG5cbiAgICAgICAgLy8g0JLQuNCy0L7QtNC40LzQviDQstGB0ZbRhSDRltC90YjQuNGFINC60L7RgNC40YHRgtGD0LLQsNGH0ZbQsiDRgyByZXN1bHRzVGFibGVcbiAgICAgICAgdXNlcnMuZm9yRWFjaCh1c2VyID0+IHtcbiAgICAgICAgICAgIGlmICh1c2VyLnVzZXJpZCAhPT0gY3VycmVudFVzZXJJZCkge1xuICAgICAgICAgICAgICAgIGRpc3BsYXlVc2VyKHVzZXIsIGZhbHNlLCByZXN1bHRzVGFibGUsIHVzZXJzLCBtYXRjaE51bWJlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vINCS0LjQstC+0LTQuNC80L4g0L/QvtGC0L7Rh9C90L7Qs9C+INC60L7RgNC40YHRgtGD0LLQsNGH0LAg0LIgcmVzdWx0c1RhYmxlT3RoZXJcbiAgICAgICAgaWYgKGN1cnJlbnRVc2VyKSB7XG4gICAgICAgICAgICBkaXNwbGF5VXNlcihjdXJyZW50VXNlciwgdHJ1ZSwgcmVzdWx0c1RhYmxlT3RoZXIsIHVzZXJzLCBtYXRjaE51bWJlcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gZGlzcGxheVVzZXIodXNlciwgaXNDdXJyZW50VXNlciwgdGFibGUsIGFsbFVzZXJzLCBtYXRjaE51bWJlcikge1xuICAgICAgICBsZXQgbWF0Y2hEYXRlO1xuXG4gICAgICAgIGlmIChtYXRjaE51bWJlciA9PT0gMSkge1xuICAgICAgICAgICAgbWF0Y2hEYXRlID0gRklSU1RfTUFUQ0hfREFURTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGFkZGl0aW9uYWxVc2VyUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGFkZGl0aW9uYWxVc2VyUm93LmNsYXNzTGlzdC5hZGQoJ3RhYmxlX19yb3cnKTtcblxuICAgICAgICBhZGRpdGlvbmFsVXNlclJvdy5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZV9fcm93LWl0ZW1cIj4ke2lzQ3VycmVudFVzZXIgPyB1c2VyLnVzZXJpZCA6IG1hc2tVc2VySWQodXNlci51c2VyaWQpfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVfX3Jvdy1pdGVtXCI+XG4gICAgICAgICAgICAke2N1cnJlbnREYXRlID49IG1hdGNoRGF0ZSA/XG4gICAgICAgICAgICBgPHNwYW4+JHt1c2VyLnRlYW0xICE9PSB1bmRlZmluZWQgJiYgdXNlci50ZWFtMSAhPT0gbnVsbCA/IHVzZXIudGVhbTEgOiBcIi1cIn08L3NwYW4+PGltZyBzcmM9XCJodHRwczovL2Zhdi1wcm9tLmNvbS9odG1sL2dvYWxzLW9yLXplcm9lcy9pbWcvdnMucG5nXCIgYWx0PVwidnNcIj48c3Bhbj4ke3VzZXIudGVhbTIgIT09IHVuZGVmaW5lZCAmJiB1c2VyLnRlYW0yICE9PSBudWxsID8gdXNlci50ZWFtMiA6IFwiLVwifTwvc3Bhbj5gIDpcbiAgICAgICAgICAgIGA8c3Bhbj4qKjwvc3Bhbj48aW1nIHNyYz1cImh0dHBzOi8vZmF2LXByb20uY29tL2h0bWwvZ29hbHMtb3ItemVyb2VzL2ltZy92cy5wbmdcIiBhbHQ9XCJ2c1wiPjxzcGFuPioqPC9zcGFuPmBcbiAgICAgICAgfVxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICAke3VzZXIud2lubmVyID09PSB0cnVlICA/XG4gICAgICAgICAgICBgPGRpdiBjbGFzcz1cInRhYmxlX19yb3ctaXRlbVwiIGRhdGEtdHJhbnNsYXRlPVwicHJpemVcIj4qKioqKjwvZGl2PmAgOlxuICAgICAgICAgICAgYDxkaXYgY2xhc3M9XCJ0YWJsZV9fcm93LWl0ZW1cIiBkYXRhLXRyYW5zbGF0ZT1cIm5vV2lubmVyc1wiPioqKioqPC9kaXY+YFxuICAgICAgICB9XG5cbiAgICAgICAgJHt1c2VyLmJvbnVzRmlyc3RHb2FsID09PSB0cnVlICA/XG4gICAgICAgICAgICBgPGRpdiBjbGFzcz1cInRhYmxlX19yb3ctaXRlbVwiIGRhdGEtdHJhbnNsYXRlPVwic3M1MDBcIj4qKioqKjwvZGl2PmAgOlxuICAgICAgICAgICAgYDxkaXYgY2xhc3M9XCJ0YWJsZV9fcm93LWl0ZW1cIiBkYXRhLXRyYW5zbGF0ZT1cIm5vV2lubmVyc1wiPioqKioqPC9kaXY+YFxuICAgICAgICB9XG4gICAgYDtcblxuICAgICAgICBpZiAoaXNDdXJyZW50VXNlcikge1xuICAgICAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuY2xhc3NMaXN0LmFkZChcInlvdVwiKTtcbiAgICAgICAgICAgIGFkZGl0aW9uYWxVc2VyUm93LmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZV9fcm93LWl0ZW1cIj4ke2lzQ3VycmVudFVzZXIgPyB1c2VyLnVzZXJpZCA6IG1hc2tVc2VySWQodXNlci51c2VyaWQpfTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlX19yb3ctaXRlbVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuPiR7dXNlci50ZWFtMSAhPT0gdW5kZWZpbmVkICYmIHVzZXIudGVhbTEgIT09IG51bGwgPyB1c2VyLnRlYW0xIDogXCItXCJ9PC9zcGFuPjxpbWcgc3JjPVwiaHR0cHM6Ly9mYXYtcHJvbS5jb20vaHRtbC9nb2Fscy1vci16ZXJvZXMvaW1nL3ZzLnBuZ1wiIGFsdD1cInZzXCI+PHNwYW4+JHt1c2VyLnRlYW0yICE9PSB1bmRlZmluZWQgJiYgdXNlci50ZWFtMiAhPT0gbnVsbCA/IHVzZXIudGVhbTIgOiBcIi1cIn08L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICR7dXNlci53aW5uZXIgPT09IHRydWUgID9cbiAgICAgICAgICAgICAgICBgPGRpdiBjbGFzcz1cInRhYmxlX19yb3ctaXRlbVwiIGRhdGEtdHJhbnNsYXRlPVwicHJpemVcIj4qKioqKjwvZGl2PmAgOlxuICAgICAgICAgICAgICAgIGA8ZGl2IGNsYXNzPVwidGFibGVfX3Jvdy1pdGVtXCIgZGF0YS10cmFuc2xhdGU9XCJub1dpbm5lcnNcIj4qKioqKjwvZGl2PmBcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJHt1c2VyLmJvbnVzRmlyc3RHb2FsID09PSB0cnVlICA/XG4gICAgICAgICAgICAgICAgYDxkaXYgY2xhc3M9XCJ0YWJsZV9fcm93LWl0ZW1cIiBkYXRhLXRyYW5zbGF0ZT1cInNzNTAwXCI+KioqKio8L2Rpdj5gIDpcbiAgICAgICAgICAgICAgICBgPGRpdiBjbGFzcz1cInRhYmxlX19yb3ctaXRlbVwiIGRhdGEtdHJhbnNsYXRlPVwibm9XaW5uZXJzXCI+KioqKio8L2Rpdj5gXG4gICAgICAgICAgICB9XG4gICAgICAgIGA7XG4gICAgICAgICAgICBjb25zdCB5b3VCbG9jayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgeW91QmxvY2suY2xhc3NMaXN0LmFkZCgndGFibGVfX3Jvdy15b3UnKTtcbiAgICAgICAgICAgIHlvdUJsb2NrLnNldEF0dHJpYnV0ZSgnZGF0YS10cmFuc2xhdGUnLCAndGFibGVZb3UnKTtcbiAgICAgICAgICAgIC8vIHlvdUJsb2NrLnRleHRDb250ZW50ID0gXCJZb3VcIjtcbiAgICAgICAgICAgIGFkZGl0aW9uYWxVc2VyUm93Lmluc2VydEJlZm9yZSh5b3VCbG9jaywgYWRkaXRpb25hbFVzZXJSb3cuY2hpbGRyZW5bMV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGFibGUuYXBwZW5kKGFkZGl0aW9uYWxVc2VyUm93KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbWFza1VzZXJJZCh1c2VySWQpIHtcbiAgICAgICAgcmV0dXJuIFwiKipcIiArIHVzZXJJZC50b1N0cmluZygpLnNsaWNlKDIpO1xuICAgIH1cblxuICAgIC8vIDNEIGFuaW1cbiAgICBjb25zdCBjYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGVhbSwgLmFuaW1DYXJkLCAuYW5pbVJpZ2h0XCIpOyAvLyDQlNC+0LHQsNCy0LvRj9C10LwgLmFuaW1SaWdodFxuICAgIGxldCBhbmdsZSA9IDA7XG5cbiAgICBmdW5jdGlvbiBhbmltYXRlQ2FyZHMoKSB7XG4gICAgICAgIGFuZ2xlICs9IDAuOTsgLy8gc3BlZWRcbiAgICAgICAgY29uc3Qgcm90YXRlWCA9IE1hdGguc2luKGFuZ2xlICogKE1hdGguUEkgLyAxODApKSAqIDEwOyAvLyDQmtC+0LvQtdCx0LDQvdC40LUg0L/QviBYXG4gICAgICAgIGNvbnN0IHJvdGF0ZVkgPSBNYXRoLmNvcyhhbmdsZSAqIChNYXRoLlBJIC8gMTgwKSkgKiAxMDsgLy8g0JrQvtC70LXQsdCw0L3QuNC1INC/0L4gWVxuXG4gICAgICAgIGNhcmRzLmZvckVhY2goY2FyZCA9PiB7XG4gICAgICAgICAgICBpZiAoY2FyZC5jbGFzc0xpc3QuY29udGFpbnMoXCJhbmltUmlnaHRcIikpIHtcbiAgICAgICAgICAgICAgICBjYXJkLnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGVZKCR7LXJvdGF0ZVl9ZGVnKSByb3RhdGVYKCR7LXJvdGF0ZVh9ZGVnKWA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNhcmQuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZVkoJHtyb3RhdGVZfWRlZykgcm90YXRlWCgke3JvdGF0ZVh9ZGVnKWA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlQ2FyZHMpO1xuICAgIH1cbiAgICBhbmltYXRlQ2FyZHMoKTtcblxuICAgIC8vIHByZWRpY3QgdGFic1xuICAgIGNvbnN0IHRhYnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJlZGljdF9fdGFicy1nbG9iYWwgPiBkaXYsIC5wcmVkaWN0X190YWJzLWRhdGVzID4gZGl2Jyk7XG4gICAgY29uc3QgY29udGFpbmVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcmVkaWN0X19jb250YWluZXInKTtcblxuICAgIGZ1bmN0aW9uIGhhbmRsZVRhYkNsaWNrKGV2ZW50KSB7XG4gICAgICAgIGxldCBtYXRjaERhdGU7XG4gICAgICAgIGxldCBjdXJyZW50TWF0Y2ggPSAxXG5cbiAgICAgICAgY29uc3QgY2xpY2tlZFRhYiA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KFwiLnByZWRpY3RfX3RhYnMtZGF0ZVwiKSB8fCBldmVudC50YXJnZXQuY2xvc2VzdChcIi5wcmVkaWN0X190YWJzLWdvYWxcIikgfHwgZXZlbnQudGFyZ2V0LmNsb3Nlc3QoXCIucHJlZGljdF9fdGFicy1zY29yZVwiKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY2xpY2tlZFRhYilcbiAgICAgICAgY29uc3QgdGFiUGFpciA9IGNsaWNrZWRUYWIuY2xvc2VzdCgnLnByZWRpY3RfX3RhYnMtZ2xvYmFsJykgfHwgY2xpY2tlZFRhYi5jbG9zZXN0KCcucHJlZGljdF9fdGFicy1kYXRlcycpO1xuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNsaWNrZWRUYWIpXG5cbiAgICAgICAgaWYoY3VycmVudE1hdGNoID09PSAxKXtcbiAgICAgICAgICAgIG1hdGNoRGF0ZSA9IEZJUlNUX01BVENIX0RBVEVcbiAgICAgICAgfVxuICAgICAgICBpZihjdXJyZW50RGF0ZSA+IG1hdGNoRGF0ZSl7XG4gICAgICAgICAgICBwbGFjZUJldEJ0bi5jbGFzc0xpc3QuYWRkKFwiX2xvY2tcIilcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBwbGFjZUJldEJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwiX2xvY2tcIilcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYgKGNsaWNrZWRUYWIuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkgcmV0dXJuO1xuICAgICAgICBpZiAodGFiUGFpcikge1xuICAgICAgICAgICAgY29uc3QgcGFpciA9IHRhYlBhaXIucXVlcnlTZWxlY3RvckFsbCgnLmFjdGl2ZScpO1xuICAgICAgICAgICAgaWYgKHBhaXIubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHBhaXJbMF0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjbGlja2VkVGFiLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICB1cGRhdGVDb250YWluZXJzKCk7XG4gICAgICAgIC8vIHJlZnJlc2hCZXRJbmZvKHVzZXJJZClcbiAgICAgICAgaWYoY2xpY2tlZFRhYi5jbG9zZXN0KCcucHJlZGljdF9fdGFicy1zY29yZScpKXtcbiAgICAgICAgICAgIHVwZGF0ZVRvcEZvcmVjYXN0cyhjdXJyZW50TWF0Y2gpXG4gICAgICAgICAgICBjdXJyZW50QmV0ID0gbmV3IEJldCh1c2VySWQsIGN1cnJlbnRNYXRjaClcbiAgICAgICAgICAgIG1hdGNoTnVtYmVyID0gMVxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcmVkaWN0X190ZWFtLW51bWJlclwiKS5mb3JFYWNoKChzY29yZSwgaSkgPT57XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cobWF0Y2hEYXRlLCBtYXRjaE51bWJlcilcbiAgICAgICAgICAgICAgICBpZihjdXJyZW50RGF0ZSA+IG1hdGNoRGF0ZSAmJiBpID09PSAxICYmIG1hdGNoTnVtYmVyID09PSAxKXtcbiAgICAgICAgICAgICAgICAgICAgc2NvcmUudGV4dENvbnRlbnQgPSBcIjBcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKGN1cnJlbnREYXRlID4gbWF0Y2hEYXRlICYmIGkgPT09IDAgJiYgbWF0Y2hOdW1iZXIgPT09IDEpe1xuICAgICAgICAgICAgICAgICAgICBzY29yZS50ZXh0Q29udGVudCA9IFwiMFwiXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbdHlwZT1cInJhZGlvXCJdOmNoZWNrZWQnKS5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICAgICAgICAgICAgYnV0dG9uLmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cbiAgICAgICAgbG9ja01hdGNoQ29udGFpbmVyKEZJUlNUX01BVENIX0RBVEUsIDEpOyAvLyDQlNC70Y8g0L/QtdGA0YjQvtCz0L4g0LzQsNGC0YfRg1xuICAgIH1cblxuICAgIHRhYnMuZm9yRWFjaCh0YWIgPT4gdGFiLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlVGFiQ2xpY2spKTtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUNvbnRhaW5lcnMoKSB7XG4gICAgICAgIGNvbnRhaW5lcnMuZm9yRWFjaChjb250YWluZXIgPT4gY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcbiAgICAgICAgcmVmcmVzaEJldEluZm8odXNlcklkKVxuICAgICAgICBjb25zdCBpc1Njb3JlVGFiQWN0aXZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX3RhYnMtc2NvcmUuYWN0aXZlJyk7XG4gICAgICAgIGNvbnN0IGlzR29hbFRhYkFjdGl2ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X190YWJzLWdvYWwuYWN0aXZlJyk7XG4gICAgICAgIGlmIChpc1Njb3JlVGFiQWN0aXZlKSB7XG4gICAgICAgICAgICBpZihzaG93VG9wRm9yZWNhc3QpIHRvcEZvcmVjYXN0LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fY29udGFpbmVyLnNjb3JlLTEnKS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X190YWJzLXR4dC0yJykuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX3RhYnMtdHh0LTEnKS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNHb2FsVGFiQWN0aXZlKSB7XG4gICAgICAgICAgICBpZihzaG93VG9wRm9yZWNhc3QpIHRvcEZvcmVjYXN0LmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fdGFicy10eHQtMScpLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X190YWJzLXR4dC0yJykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX2NvbnRhaW5lci5nb2FsLTEnKS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vc2NvcmVcblxuICAgIGZ1bmN0aW9uIHNjb3JlSW5pdChidG4pe1xuICAgICAgICBjb25zdCB0ZWFtQ29udHJvbCA9IGJ0bi5jbG9zZXN0KCcucHJlZGljdF9fdGVhbS1jb250cm9sJyk7XG4gICAgICAgIGNvbnN0IHRlYW1OdW1iZXIgPSB0ZWFtQ29udHJvbC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fdGVhbS1udW1iZXInKVxuICAgICAgICBjb25zdCBtYXRjaENvbnRhaW5lciA9IGJ0bi5jbG9zZXN0KCcucHJlZGljdF9fY29udGFpbmVyJyk7XG4gICAgICAgIGNvbnN0IG1hdGNoTnVtYmVyID0gcGFyc2VJbnQobWF0Y2hDb250YWluZXIuZGF0YXNldC5tYXRjaE51bWJlcik7XG5cbiAgICAgICAgY29uc3QgZ2V0R29hbHMgPSAodGVhbSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IG1hdGNoQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXRlYW09XCIke3RlYW19XCJdIC5wcmVkaWN0X190ZWFtLW51bWJlcmApO1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQgPyBOdW1iZXIoZWxlbWVudC50ZXh0Q29udGVudCkgfHwgMCA6IDA7XG4gICAgICAgIH07XG5cblxuICAgICAgICBjb25zdCB0ZWFtMUdvYWxzID0gZ2V0R29hbHMoJ3RlYW0xJykgO1xuICAgICAgICBjb25zdCB0ZWFtMkdvYWxzID0gZ2V0R29hbHMoJ3RlYW0yJyk7XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2codGVhbTFHb2FscywgdGVhbTJHb2FscylcblxuICAgICAgICB1cGRhdGVTY29yZShtYXRjaE51bWJlciwgdGVhbTFHb2FscywgdGVhbTJHb2Fscyk7XG4gICAgfVxuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByZWRpY3RfX3RlYW0taW5jcmVhc2UsIC5wcmVkaWN0X190ZWFtLWRlY3JlYXNlJykuZm9yRWFjaChidG4gPT4ge1xuICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICAgICAgY29uc3QgdGVhbUNvbnRyb2wgPSBidG4uY2xvc2VzdCgnLnByZWRpY3RfX3RlYW0tY29udHJvbCcpO1xuICAgICAgICAgICAgY29uc3QgdGVhbU51bWJlciA9IHRlYW1Db250cm9sLnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X190ZWFtLW51bWJlcicpXG4gICAgICAgICAgICBjb25zdCBtYXRjaENvbnRhaW5lciA9IGJ0bi5jbG9zZXN0KCcucHJlZGljdF9fY29udGFpbmVyJyk7XG5cbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHBhcnNlSW50KHRlYW1OdW1iZXIudGV4dENvbnRlbnQpO1xuICAgICAgICAgICAgaWYgKGJ0bi5jbGFzc0xpc3QuY29udGFpbnMoJ3ByZWRpY3RfX3RlYW0taW5jcmVhc2UnKSkge1xuICAgICAgICAgICAgICAgIHZhbHVlICs9IDE7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID4gMCkge1xuICAgICAgICAgICAgICAgIHZhbHVlIC09IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0ZWFtTnVtYmVyLnRleHRDb250ZW50ID0gYCR7dmFsdWV9YDtcbiAgICAgICAgICAgIHNjb3JlSW5pdChidG4pXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhiZXQpXG4gICAgICAgIH0pXG4gICAgfSk7XG5cbiAgICAvL3RhYmxlIHRhYnNcbiAgICAvLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFibGVfX3RhYnMtZGF0ZScpLmZvckVhY2godGFiID0+IHtcbiAgICAvLyAgICAgdGFiLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgLy8gICAgICAgICBpZiAodGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XG4gICAgLy8gICAgICAgICAgICAgcmV0dXJuO1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYmxlX190YWJzLWRhdGUnKS5mb3JFYWNoKHRhYiA9PiB0YWIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xuICAgIC8vICAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAvLyAgICAgICAgIGN1cnJlbnRUYWJUYWJsZSA9IE51bWJlcihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhYmxlX190YWJzLWRhdGUuYWN0aXZlXCIpLmdldEF0dHJpYnV0ZShcImRhdGEtbWF0Y2gtbnVtYmVyXCIpKVxuICAgIC8vICAgICAgICAgcmVuZGVyVXNlcnMoKTtcbiAgICAvLyAgICAgfSk7XG4gICAgLy8gfSk7XG5cblxuICAgIC8vcG9wdXBzXG5cbiAgICBmdW5jdGlvbiBzZXRQb3B1cHModHJpZ2dlckJ1dHRvbnMsIHBvcHVwQ2xhc3MpIHtcbiAgICAgICAgY29uc3QgcG9wdXBzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwcycpO1xuICAgICAgICBjb25zdCBwb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5wb3B1cHNfX2l0ZW0uJHtwb3B1cENsYXNzfWApO1xuICAgICAgICBjb25zdCBwb3B1cEJ0biA9IHBvcHVwc0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwc19faXRlbS1idG5cIilcblxuXG4gICAgICAgIGlmICghdHJpZ2dlckJ1dHRvbnMgfHwgIXBvcHVwIHx8ICFwb3B1cHNDb250YWluZXIpIHJldHVybjtcblxuICAgICAgICB0cmlnZ2VyQnV0dG9ucy5mb3JFYWNoKHRyaWdnZXJCdXR0b24gPT4ge1xuICAgICAgICAgICAgdHJpZ2dlckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBwb3B1cHNDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnX29wYWNpdHknKTtcbiAgICAgICAgICAgICAgICBwb3B1cHNDb250YWluZXIuY2xhc3NMaXN0LmFkZChwb3B1cENsYXNzKTtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgY2xvc2VCdXR0b24gPSBwb3B1cC5xdWVyeVNlbGVjdG9yKCcucG9wdXBzX19pdGVtLWNsb3NlJyk7XG4gICAgICAgIGNvbnN0IGJ0bkNsb3NlID0gcG9wdXAucXVlcnlTZWxlY3RvcignLmJ0bi1jbG9zZScpO1xuXG4gICAgICAgIHBvcHVwc0NvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgICAgIGlmIChlLnRhcmdldCA9PT0gcG9wdXBzQ29udGFpbmVyIHx8IGUudGFyZ2V0ID09PSBjbG9zZUJ1dHRvbiB8fCBlLnRhcmdldCA9PT0gYnRuQ2xvc2UpIHtcbiAgICAgICAgICAgICAgICBjbG9zZVBvcHVwKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZ1bmN0aW9uIGNsb3NlUG9wdXAoKSB7XG4gICAgICAgICAgICBwb3B1cHNDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnX29wYWNpdHknKTtcbiAgICAgICAgICAgIHBvcHVwc0NvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKHBvcHVwQ2xhc3MpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICcnO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHBvcHVwQnRuKVxuICAgICAgICBwb3B1cEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+e1xuICAgICAgICAgICAgY2xvc2VQb3B1cCgpXG4gICAgICAgIH0pXG5cbiAgICB9XG5cbiAgICBzZXRQb3B1cHMoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdpZGVfX2xpc3QtYnRuJyksICdnaWRlUG9wdXAnKTtcbiAgICBzZXRQb3B1cHMoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByZWRpY3RfX2J0bi50b29rLXBhcnQnKSwgJ19jb25maXJtUG9wdXAnKTtcblxuICAgIC8vZ28gdG8gcHJlZGljdFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9QcmVkaWN0XCIpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCB0YXJnZXRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmVkaWN0XCIpO1xuICAgICAgICBjb25zdCB0YXJnZXRQb3NpdGlvbiA9IHRhcmdldEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgd2luZG93LnBhZ2VZT2Zmc2V0IC0gMjtcblxuICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oe1xuICAgICAgICAgICAgdG9wOiB0YXJnZXRQb3NpdGlvbixcbiAgICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJyxcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCByYWRpb0NvbnRhaW5lcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJlZGljdF9fcmFkaW8nKTtcblxuICAgIHJhZGlvQ29udGFpbmVycy5mb3JFYWNoKGNvbnRhaW5lciA9PiB7XG4gICAgICAgIGNvbnN0IHJhZGlvSW5wdXRzID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcmVkaWN0X19yYWRpby1pdGVtJyk7XG5cbiAgICAgICAgcmFkaW9JbnB1dHMuZm9yRWFjaCgocmFkaW8pID0+IHtcbiAgICAgICAgICAgIHJhZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJhZGlvSW5wdXRzLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ19hY3RpdmUnKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdfYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5xdWVyeVNlbGVjdG9yKFwiaW5wdXRcIikudmFsdWUpXG5cbiAgICAgICAgICAgICAgICB1cGRhdGVGaXJzdEdvYWwobWF0Y2hOdW1iZXIsIHRoaXMucXVlcnlTZWxlY3RvcihcImlucHV0XCIpLnZhbHVlKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGxvYWRUcmFuc2xhdGlvbnMoKVxuICAgICAgICAudGhlbihpbml0KVxuXG4gICAgLy8gVEVTVFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXJrLWJ0bicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoJ2RhcmsnKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGxuZ0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubG5nLWJ0blwiKVxuXG4gICAgbG5nQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGlmIChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwibG9jYWxlXCIpKSB7XG4gICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKFwibG9jYWxlXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcImxvY2FsZVwiLCBcImVuXCIpO1xuICAgICAgICB9XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGF1dGhCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmF1dGgtYnRuXCIpXG5cbiAgICBhdXRoQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgaWYodXNlcklkKXtcbiAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oXCJ1c2VySWRcIilcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwidXNlcklkXCIsIFwiMTg5MDg0NjVcIilcbiAgICAgICAgfVxuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKClcbiAgICB9KTtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG4tbGFzdFByZWQnKS5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByZWRpY3RfX2xhc3QnKS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZScpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgc2V0UG9wdXBzKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG4tdGhlbmtzJyksICdfY29uZmlybVBvcHVwJyk7XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYnRuLXByZWRpY3QnKS5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy51bmNvbmZpcm1lZCcpLmZvckVhY2godW5jb25maXJtZWQgPT4ge1xuICAgICAgICAgICAgICAgIHVuY29uZmlybWVkLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb25maXJtZWQnKS5mb3JFYWNoKGNvbmZpcm1lZCA9PiB7XG4gICAgICAgICAgICAgICAgY29uZmlybWVkLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1lbnUtYnRuXCIpPy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tZW51LXRlc3RcIik/LmNsYXNzTGlzdC50b2dnbGUoXCJoaWRlXCIpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLWFmdGVyXCIpPy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBjb25zdCBGSVJTVF9NQVRDSF9EQVRFID0gbmV3IERhdGUoJzIwMjItMDMtMjBUMjE6MTU6MDAnKVxuICAgICAgICBsb2NrTWF0Y2hDb250YWluZXIoRklSU1RfTUFUQ0hfREFURSwgMSk7XG4gICAgICAgIHBsYWNlQmV0QnRuLmNsYXNzTGlzdC5hZGQoXCJfbG9ja1wiKVxuICAgICAgICBjb25zb2xlLmxvZyhcImxvY2sgdGFibGVcIilcbiAgICB9KTtcblxuICAgIHVzZXJJZCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJ1c2VySWRcIikgPz8gbnVsbFxuICAgIFxuICAgIHVwZGF0ZVRvcEZvcmVjYXN0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3VwZGF0ZVRvcEZvcmVjYXN0cyDQstC40LzQutC90LXQvdC+INC00LvRjyDRgtC10YHRgtGDJyk7XG4gICAgfVxuXG4gICAgcmVuZGVyVXNlcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdyZW5kZXJVc2VycyDQstC40LzQutC90LXQvdC+INC00LvRjyDRgtC10YHRgtGDJyk7XG4gICAgfVxuXG4gICAgcG9wdWxhdGVVc2Vyc1RhYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZygncG9wdWxhdGVVc2Vyc1RhYmxlINCy0LjQvNC60L3QtdC90L4g0LTQu9GPINGC0LXRgdGC0YMnKTtcbiAgICB9XG5cbiAgICBkaXNwbGF5VXNlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2Rpc3BsYXlVc2VyINCy0LjQvNC60L3QtdC90L4g0LTQu9GPINGC0LXRgdGC0YMnKTtcbiAgICB9XG4gICAgc2hvd1RvcEZvcmVjYXN0ID0gdHJ1ZVxufSkoKVxuXG4iXX0=
