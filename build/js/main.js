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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiYXBpVVJMIiwidW5hdXRoTXNncyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsInlvdUFyZUluQnRucyIsIm1haW5QYWdlIiwicXVlcnlTZWxlY3RvciIsInJlc3VsdHNUYWJsZSIsInJlc3VsdHNUYWJsZU90aGVyIiwicGxhY2VCZXRCdG4iLCJsYXN0UHJlZGljdCIsInRvcEZvcmVjYXN0IiwiY3VycmVudFRhYiIsImN1cnJlbnRUYWJUYWJsZSIsIm1hdGNoTnVtYmVyIiwic2hvd1RvcEZvcmVjYXN0IiwiRklSU1RfTUFUQ0hfREFURSIsIkRhdGUiLCJjdXJyZW50RGF0ZSIsImxvY2tNYXRjaENvbnRhaW5lciIsIm1hdGNoRGF0ZSIsImNvbnRhaW5lcnMiLCJmb3JFYWNoIiwiY29udGFpbmVyIiwiY2xhc3NMaXN0IiwiYWRkIiwic2V0SW50ZXJ2YWwiLCJCZXQiLCJ1c2VySWQiLCJ0ZWFtMUdvYWxzIiwidGVhbTJHb2FscyIsImZpcnN0R29hbCIsInVzZXJpZCIsInRlYW0xIiwidGVhbTIiLCJ1bmRlZmluZWQiLCJnb2Fsc1VwZGF0ZWQiLCJmaXJzdEdvYWxVcGRhdGVkIiwiY2FjaGUiLCJwcmVkaWN0RGF0YSIsInRyYW5zbGF0ZVN0YXRlIiwiZGVidWciLCJsb2NhbGUiLCJzZXNzaW9uU3RvcmFnZSIsImdldEl0ZW0iLCJ1a0xlbmciLCJlbkxlbmciLCJpMThuRGF0YSIsImN1cnJlbnRCZXQiLCJyZXF1ZXN0IiwibGluayIsImV4dHJhT3B0aW9ucyIsImZldGNoIiwiaGVhZGVycyIsInRoZW4iLCJyZXMiLCJvayIsIkVycm9yIiwianNvbiIsImVyciIsImNvbnNvbGUiLCJlcnJvciIsInJlcG9ydEVycm9yIiwic3R5bGUiLCJkaXNwbGF5Iiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwic3RhcnRzV2l0aCIsIlByb21pc2UiLCJyZWplY3QiLCJyZXBvcnREYXRhIiwib3JpZ2luIiwiZXJyb3JUZXh0IiwidGV4dCIsIm1lc3NhZ2UiLCJ0eXBlIiwibmFtZSIsInN0YWNrIiwibWV0aG9kIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJ3YXJuIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJyZWFzb24iLCJnZXRMYXN0QmV0IiwiYmV0cyIsImZpbmQiLCJiZXQiLCJyZWZyZXNoQmV0SW5mbyIsInNjb3JlMSIsInNjb3JlMiIsImdvYWwxIiwiZ29hbDIiLCJkYXRhIiwiYmV0QXZhaWxhYmxlIiwic29tZSIsImxhc3RUZWFtMSIsImxhc3RUZWFtMiIsInNjb3JlVGVhbTEiLCJzY29yZVRlYW0yIiwicmVtb3ZlIiwibGFzdEJldCIsInRleHRDb250ZW50IiwiYmV0Q29uZmlybWVkIiwiaXRlbSIsInNldEF0dHJpYnV0ZSIsInRyYW5zbGF0ZSIsImNvbnRhaW5zIiwiSW5pdFBhZ2UiLCJjaGVja1VzZXJBdXRoIiwicmVuZGVyVXNlcnMiLCJ1cGRhdGVUb3BGb3JlY2FzdHMiLCJ5b3VBcmVJbkJ0biIsInVuYXV0aE1lcyIsInBsYWNlQmV0IiwibG9nIiwiYnRuIiwic2NvcmVJbml0IiwiYWN0aXZlVGFicyIsInJlcSIsInRhYiIsImFjdGl2ZUlucHV0IiwidmFsdWUiLCJzZXRJdGVtIiwibG9hZFRyYW5zbGF0aW9ucyIsIm11dGF0aW9uT2JzZXJ2ZXIiLCJNdXRhdGlvbk9ic2VydmVyIiwibXV0YXRpb25zIiwib2JzZXJ2ZSIsImdldEVsZW1lbnRCeUlkIiwiY2hpbGRMaXN0Iiwic3VidHJlZSIsImVsZW1zIiwiZWxlbSIsImtleSIsImdldEF0dHJpYnV0ZSIsImlubmVySFRNTCIsInJlbW92ZUF0dHJpYnV0ZSIsInJlZnJlc2hMb2NhbGl6ZWRDbGFzcyIsImVsZW1lbnQiLCJsYW5nIiwiaW5pdCIsInN0b3JlIiwic3RhdGUiLCJnZXRTdGF0ZSIsImF1dGgiLCJpc0F1dGhvcml6ZWQiLCJpZCIsImMiLCJpIiwiZ191c2VyX2lkIiwiY2xlYXJJbnRlcnZhbCIsInByZXZlbnREZWZhdWx0IiwidXBkYXRlU2NvcmUiLCJ1cGRhdGVHb2FscyIsInVwZGF0ZUZpcnN0R29hbCIsImZvcmVjYXN0c0NvbnRhaW5lciIsInRvcEZvcmVjYXN0cyIsImZvcmVjYXN0IiwiZm9yZWNhc3RJdGVtIiwiY3JlYXRlRWxlbWVudCIsInBlcmNlbnRhZ2UiLCJwYXJzZUZsb2F0IiwidG9GaXhlZCIsInBlcmNlbnRhZ2VTcGFuIiwiZm9yZWNhc3RUZXh0IiwiY3JlYXRlVGV4dE5vZGUiLCJhcHBlbmRDaGlsZCIsInVzZXJzIiwiaXNTY29yZVRhYkFjdGl2ZSIsImlzR29hbFRhYkFjdGl2ZSIsImxlbmd0aCIsInBvcHVsYXRlVXNlcnNUYWJsZSIsImN1cnJlbnRVc2VySWQiLCJjdXJyZW50VXNlciIsInVzZXIiLCJkaXNwbGF5VXNlciIsImlzQ3VycmVudFVzZXIiLCJ0YWJsZSIsImFsbFVzZXJzIiwiYWRkaXRpb25hbFVzZXJSb3ciLCJtYXNrVXNlcklkIiwid2lubmVyIiwiYm9udXNGaXJzdEdvYWwiLCJ5b3VCbG9jayIsImluc2VydEJlZm9yZSIsImNoaWxkcmVuIiwiYXBwZW5kIiwidG9TdHJpbmciLCJzbGljZSIsImNhcmRzIiwiYW5nbGUiLCJhbmltYXRlQ2FyZHMiLCJyb3RhdGVYIiwiTWF0aCIsInNpbiIsIlBJIiwicm90YXRlWSIsImNvcyIsImNhcmQiLCJ0cmFuc2Zvcm0iLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ0YWJzIiwiaGFuZGxlVGFiQ2xpY2siLCJldmVudCIsImN1cnJlbnRNYXRjaCIsImNsaWNrZWRUYWIiLCJ0YXJnZXQiLCJjbG9zZXN0IiwidGFiUGFpciIsInBhaXIiLCJ1cGRhdGVDb250YWluZXJzIiwic2NvcmUiLCJidXR0b24iLCJjaGVja2VkIiwidGVhbUNvbnRyb2wiLCJ0ZWFtTnVtYmVyIiwibWF0Y2hDb250YWluZXIiLCJwYXJzZUludCIsImRhdGFzZXQiLCJnZXRHb2FscyIsInRlYW0iLCJOdW1iZXIiLCJzZXRQb3B1cHMiLCJ0cmlnZ2VyQnV0dG9ucyIsInBvcHVwQ2xhc3MiLCJwb3B1cHNDb250YWluZXIiLCJwb3B1cCIsInBvcHVwQnRuIiwidHJpZ2dlckJ1dHRvbiIsIm92ZXJmbG93IiwiY2xvc2VCdXR0b24iLCJidG5DbG9zZSIsImNsb3NlUG9wdXAiLCJ0YXJnZXRFbGVtZW50IiwidGFyZ2V0UG9zaXRpb24iLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ0b3AiLCJwYWdlWU9mZnNldCIsInNjcm9sbFRvIiwiYmVoYXZpb3IiLCJyYWRpb0NvbnRhaW5lcnMiLCJyYWRpb0lucHV0cyIsInJhZGlvIiwidG9nZ2xlIiwibG5nQnRuIiwicmVtb3ZlSXRlbSIsInJlbG9hZCIsImF1dGhCdG4iLCJ1bmNvbmZpcm1lZCIsImNvbmZpcm1lZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxDQUFDLFlBQVk7RUFBQTtFQUNULElBQU1BLE1BQU0sR0FBRyw0Q0FBNEM7SUFDdkRDLFVBQVUsR0FBR0MsUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUM7SUFDckRDLFlBQVksR0FBR0YsUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUM7SUFDdERFLFFBQVEsR0FBR0gsUUFBUSxDQUFDSSxhQUFhLENBQUMsV0FBVyxDQUFDO0lBQzlDQyxZQUFZLEdBQUdMLFFBQVEsQ0FBQ0ksYUFBYSxDQUFDLGdCQUFnQixDQUFDO0lBQ3ZERSxpQkFBaUIsR0FBR04sUUFBUSxDQUFDSSxhQUFhLENBQUMsc0JBQXNCLENBQUM7SUFDbEVHLFdBQVcsR0FBR1AsUUFBUSxDQUFDSSxhQUFhLENBQUMsY0FBYyxDQUFDO0lBQ3BESSxXQUFXLEdBQUdSLFFBQVEsQ0FBQ0ksYUFBYSxDQUFDLGdCQUFnQixDQUFDO0lBQ3RESyxXQUFXLEdBQUdULFFBQVEsQ0FBQ0ksYUFBYSxDQUFDLGNBQWMsQ0FBQztFQUV4RCxJQUFJTSxVQUFVLEdBQUcsQ0FBQztFQUNsQixJQUFJQyxlQUFlLEdBQUcsQ0FBQztFQUN2QixJQUFJQyxXQUFXLEdBQUcsQ0FBQztFQUNuQixJQUFJQyxlQUFlLEdBQUcsS0FBSztFQUUzQixJ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QUFDLENBQUM7RUFDTixDQUFDLENBQUM7RUFFRiwwQkFBQXJQLFFBQVEsQ0FBQ0ksYUFBYSxDQUFDLFlBQVksQ0FBQywyREFBcEMsdUJBQXNDOEUsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQU07SUFDbEUsSUFBTXBFLGdCQUFnQixHQUFHLElBQUlDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQztJQUN4REUsa0JBQWtCLENBQUNILGdCQUFnQixFQUFFLENBQUMsQ0FBQztJQUN2Q1AsV0FBVyxDQUFDZSxTQUFTLENBQUNDLEdBQUcsQ0FBQyxPQUFPLENBQUM7SUFDbENtQyxPQUFPLENBQUMwRCxHQUFHLENBQUMsWUFBWSxDQUFDO0VBQzdCLENBQUMsQ0FBQztFQUVGMUYsTUFBTSw2QkFBR2UsY0FBYyxDQUFDQyxPQUFPLENBQUMsUUFBUSxDQUFDLDJFQUFJLElBQUk7RUFFakRzRSxrQkFBa0IsR0FBRyw4QkFBWTtJQUM3QnRELE9BQU8sQ0FBQzBELEdBQUcsQ0FBQyx1Q0FBdUMsQ0FBQztFQUN4RCxDQUFDO0VBRURMLFdBQVcsR0FBRyx1QkFBWTtJQUN0QnJELE9BQU8sQ0FBQzBELEdBQUcsQ0FBQyxnQ0FBZ0MsQ0FBQztFQUNqRCxDQUFDO0VBRUR5RCxrQkFBa0IsR0FBRyw4QkFBWTtJQUM3Qm5ILE9BQU8sQ0FBQzBELEdBQUcsQ0FBQyx1Q0FBdUMsQ0FBQztFQUN4RCxDQUFDO0VBRUQ2RCxXQUFXLEdBQUcsdUJBQVk7SUFDdEJ2SCxPQUFPLENBQUMwRCxHQUFHLENBQUMsZ0NBQWdDLENBQUM7RUFDakQsQ0FBQztFQUNEdkcsZUFBZSxHQUFHLElBQUk7QUFDMUIsQ0FBQyxHQUFHIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGFwaVVSTCA9ICdodHRwczovL2Zhdi1wcm9tLmNvbS9hcGlfZm9vdGJhbGxfc2hha2h0YXInLFxuICAgICAgICB1bmF1dGhNc2dzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnVuYXV0aC1tc2cnKSxcbiAgICAgICAgeW91QXJlSW5CdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvb2stcGFydCcpLFxuICAgICAgICBtYWluUGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmF2LXBhZ2VcIiksXG4gICAgICAgIHJlc3VsdHNUYWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZXN1bHRzLXRhYmxlJyksXG4gICAgICAgIHJlc3VsdHNUYWJsZU90aGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Jlc3VsdHMtdGFibGUtb3RoZXInKSxcbiAgICAgICAgcGxhY2VCZXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByZWRpY3QtYnRuXCIpLFxuICAgICAgICBsYXN0UHJlZGljdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJlZGljdF9fbGFzdFwiKSxcbiAgICAgICAgdG9wRm9yZWNhc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvcEZvcmVjYXN0XCIpXG5cbiAgICBsZXQgY3VycmVudFRhYiA9IDFcbiAgICBsZXQgY3VycmVudFRhYlRhYmxlID0gMVxuICAgIGxldCBtYXRjaE51bWJlciA9IDFcbiAgICBsZXQgc2hvd1RvcEZvcmVjYXN0ID0gZmFsc2VcblxuICAgIGNvbnN0IEZJUlNUX01BVENIX0RBVEUgPSBuZXcgRGF0ZSgnMjAyNS0wNC0yN1QxNzozMDowMCcpIC8vINC00LDRgtCwINC80LDRgtGH0YMgLSAzMNGF0LJcbiAgICBjb25zdCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKClcblxuICAgIGZ1bmN0aW9uIGxvY2tNYXRjaENvbnRhaW5lcihtYXRjaERhdGUsIG1hdGNoTnVtYmVyKSB7XG4gICAgICAgIGlmIChuZXcgRGF0ZSgpID4gbWF0Y2hEYXRlKSB7XG4gICAgICAgICAgICBjb25zdCBjb250YWluZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLnByZWRpY3RfX2NvbnRhaW5lcltkYXRhLW1hdGNoLW51bWJlcj1cIiR7bWF0Y2hOdW1iZXJ9XCJdYCk7XG5cbiAgICAgICAgICAgIGNvbnRhaW5lcnMuZm9yRWFjaChjb250YWluZXIgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdfbG9jaycpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHBsYWNlQmV0QnRuLmNsYXNzTGlzdC5hZGQoXCJfbG9ja1wiKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbG9ja01hdGNoQ29udGFpbmVyKEZJUlNUX01BVENIX0RBVEUsIDEpOyAvLyDQlNC70Y8g0L/QtdGA0YjQvtCz0L4g0LzQsNGC0YfRg1xuXG4gICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBjb25zdCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCk7IC8vINCe0L3QvtCy0LjRgtC4INC/0L7RgtC+0YfQvdGDINC00LDRgtGDXG4gICAgICAgIGxvY2tNYXRjaENvbnRhaW5lcihGSVJTVF9NQVRDSF9EQVRFLCAxKTtcbiAgICB9LCA2MDAwMDApOyAvLyDQntC90L7QstC70Y7QstCw0YLQuCDQutC+0LbQvdGWIDEwINGF0LJcblxuICAgIGNsYXNzIEJldCB7XG4gICAgICAgIGNvbnN0cnVjdG9yKHVzZXJJZCwgbWF0Y2hOdW1iZXIsIHRlYW0xR29hbHMgPSAwLCB0ZWFtMkdvYWxzID0gMCwgZmlyc3RHb2FsKSB7XG4gICAgICAgICAgICBpZih1c2VySWQgIT09IG51bGwpIHRoaXMudXNlcmlkID0gdXNlcklkO1xuICAgICAgICAgICAgdGhpcy5tYXRjaE51bWJlciA9IG1hdGNoTnVtYmVyO1xuICAgICAgICAgICAgdGhpcy50ZWFtMSA9IHRlYW0xR29hbHM7XG4gICAgICAgICAgICB0aGlzLnRlYW0yID0gdGVhbTJHb2FscztcbiAgICAgICAgICAgIGlmKGZpcnN0R29hbCAhPT0gdW5kZWZpbmVkKSB0aGlzLmZpcnN0R29hbCA9IGZpcnN0R29hbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHVwZGF0ZUdvYWxzKHRlYW0xR29hbHMsIHRlYW0yR29hbHMpIHtcbiAgICAgICAgICAgIGlmICh0ZWFtMUdvYWxzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRlYW0xID0gdGVhbTFHb2FscyAhPT0gbnVsbCA/IHRlYW0xR29hbHMgOiB0aGlzLnRlYW0xO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRlYW0yR29hbHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMudGVhbTIgPSB0ZWFtMkdvYWxzICE9PSBudWxsID8gdGVhbTJHb2FscyA6IHRoaXMudGVhbTI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmdvYWxzVXBkYXRlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB1cGRhdGVGaXJzdEdvYWwoZmlyc3RHb2FsKSB7XG4gICAgICAgICAgICBpZiAoZmlyc3RHb2FsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpcnN0R29hbCA9IGZpcnN0R29hbCAhPT0gbnVsbCA/IGZpcnN0R29hbCA6IHRoaXMuZmlyc3RHb2FsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5maXJzdEdvYWxVcGRhdGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGNhY2hlID0ge307XG4gICAgbGV0IHByZWRpY3REYXRhID0gW107XG5cbiAgICBsZXQgdHJhbnNsYXRlU3RhdGUgPSB0cnVlXG4gICAgbGV0IGRlYnVnID0gZmFsc2VcblxuICAgIGxldCBsb2NhbGUgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwibG9jYWxlXCIpID8/IFwidWtcIlxuICAgIC8vIGxldCBsb2NhbGUgPSBcInVrXCJcbiAgICAvLyBsZXQgbG9jYWxlID0gXCJlblwiXG5cblxuICAgIGNvbnN0IHVrTGVuZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1a0xlbmcnKTtcbiAgICBjb25zdCBlbkxlbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZW5MZW5nJyk7XG5cblxuICAgIGxldCBpMThuRGF0YSA9IHt9O1xuXG4gICAgbGV0IHVzZXJJZDtcbiAgICAvLyB1c2VySWQgPSAxMDAzMDAyNjg7XG5cbiAgICBsZXQgY3VycmVudEJldDtcblxuICAgIGlmICh1a0xlbmcpIGxvY2FsZSA9ICd1ayc7XG4gICAgaWYgKGVuTGVuZykgbG9jYWxlID0gJ2VuJztcblxuICAgIGNvbnN0IHJlcXVlc3QgPSAobGluaywgZXh0cmFPcHRpb25zKSA9PlxuICAgICAgICBmZXRjaChhcGlVUkwgKyBsaW5rLCB7XG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLi4uKGV4dHJhT3B0aW9ucyB8fCB7fSlcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFyZXMub2spIHRocm93IG5ldyBFcnJvcignQVBJIGVycm9yJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignQVBJIHJlcXVlc3QgZmFpbGVkOicsIGVycik7XG5cbiAgICAgICAgICAgICAgICByZXBvcnRFcnJvcihlcnIpO1xuXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZhdi1wYWdlJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgICAgICBpZiAod2luZG93LmxvY2F0aW9uLmhyZWYuc3RhcnRzV2l0aChcImh0dHBzOi8vd3d3LmZhdmJldC5oci9cIikpIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL3Byb21vY2lqZS9wcm9tb2NpamEvc3R1Yi8nO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9wcm9tb3MvcHJvbW8vc3R1Yi8nO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICBmdW5jdGlvbiByZXBvcnRFcnJvcihlcnIpIHtcbiAgICAgICAgY29uc3QgcmVwb3J0RGF0YSA9IHtcbiAgICAgICAgICAgIG9yaWdpbjogd2luZG93LmxvY2F0aW9uLmhyZWYsXG4gICAgICAgICAgICB1c2VyaWQ6IHVzZXJJZCxcbiAgICAgICAgICAgIGVycm9yVGV4dDogZXJyPy5lcnJvciB8fCBlcnI/LnRleHQgfHwgZXJyPy5tZXNzYWdlIHx8ICdVbmtub3duIGVycm9yJyxcbiAgICAgICAgICAgIHR5cGU6IGVycj8ubmFtZSB8fCAnVW5rbm93bkVycm9yJyxcbiAgICAgICAgICAgIHN0YWNrOiBlcnI/LnN0YWNrIHx8ICcnXG4gICAgICAgIH07XG5cbiAgICAgICAgZmV0Y2goJ2h0dHBzOi8vZmF2LXByb20uY29tL2FwaS1jbXMvcmVwb3J0cy9hZGQnLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocmVwb3J0RGF0YSlcbiAgICAgICAgfSkuY2F0Y2goY29uc29sZS53YXJuKTtcbiAgICB9XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICByZXBvcnRFcnJvcihlLmVycm9yIHx8IGUpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndW5oYW5kbGVkcmVqZWN0aW9uJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgcmVwb3J0RXJyb3IoZS5yZWFzb24gfHwgZSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBnZXRMYXN0QmV0ID0gKGJldHMsIG1hdGNoTnVtYmVyKSA9PntcbiAgICAgICAgaWYoIWJldHMpIHJldHVybiBmYWxzZVxuICAgICAgICByZXR1cm4gYmV0cy5maW5kKGJldCA9PiBiZXQubWF0Y2hOdW1iZXIgPT09IG1hdGNoTnVtYmVyKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWZyZXNoQmV0SW5mbyh1c2VySWQpIHtcbiAgICAgICAgY29uc3Qgc2NvcmUxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zY29yZS0xXCIpXG4gICAgICAgIGNvbnN0IHNjb3JlMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2NvcmUtMlwiKVxuICAgICAgICBjb25zdCBnb2FsMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ29hbC0xXCIpXG4gICAgICAgIGNvbnN0IGdvYWwyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nb2FsLTJcIilcblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhtYXRjaE51bWJlcilcblxuICAgICAgICByZXF1ZXN0KGAvZmF2dXNlci8ke3VzZXJJZH1gLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnXG4gICAgICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBpZihkYXRhLmJldHMpe1xuICAgICAgICAgICAgICAgIGNvbnN0IGJldEF2YWlsYWJsZSA9IGRhdGEuYmV0cy5zb21lKGJldCA9PntcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJldC5tYXRjaE51bWJlciA9PT0gbWF0Y2hOdW1iZXJcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGJldEF2YWlsYWJsZSlcbiAgICAgICAgICAgICAgICBjb25zdCBsYXN0VGVhbTEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByZWRpY3RfX2xhc3QtdGVhbS50ZWFtMVwiKTtcbiAgICAgICAgICAgICAgICBjb25zdCBsYXN0VGVhbTIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByZWRpY3RfX2xhc3QtdGVhbS50ZWFtMlwiKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzY29yZVRlYW0xID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zY29yZVRlYW0xXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNjb3JlVGVhbTIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNjb3JlVGVhbTJcIik7XG4gICAgICAgICAgICAgICAgY29uc3QgZmlyc3RHb2FsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmVkaWN0X19sYXN0LWNvdW50cnlcIik7XG4gICAgICAgICAgICAgICAgaWYoYmV0QXZhaWxhYmxlKXtcbiAgICAgICAgICAgICAgICAgICAgbGFzdFByZWRpY3QuY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIilcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFzdEJldCA9IGdldExhc3RCZXQoZGF0YS5iZXRzLCBtYXRjaE51bWJlcik7XG4gICAgICAgICAgICAgICAgICAgIHNjb3JlVGVhbTEudGV4dENvbnRlbnQgPSBsYXN0QmV0LnRlYW0xID09PSB1bmRlZmluZWQgPyBcIi1cIiA6YCR7bGFzdEJldC50ZWFtMX1gO1xuICAgICAgICAgICAgICAgICAgICBzY29yZVRlYW0yLnRleHRDb250ZW50ID0gbGFzdEJldC50ZWFtMiA9PT0gdW5kZWZpbmVkID8gXCItXCIgOmAke2xhc3RCZXQudGVhbTJ9YDtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cobGFzdEJldClcblxuICAgICAgICAgICAgICAgICAgICBpZiAobGFzdEJldC5iZXRDb25maXJtZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJlZGljdF9fbGFzdC1yZXN1bHQudW5jb25maXJtZWRcIikuZm9yRWFjaChpdGVtID0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByZWRpY3RfX2xhc3QtcmVzdWx0LmNvbmZpcm1lZFwiKS5mb3JFYWNoKGl0ZW0gPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJlZGljdF9fbGFzdC1yZXN1bHQudW5jb25maXJtZWRcIikuZm9yRWFjaChpdGVtID0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByZWRpY3RfX2xhc3QtcmVzdWx0LmNvbmZpcm1lZFwiKS5mb3JFYWNoKGl0ZW0gPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChsYXN0QmV0Lm1hdGNoTnVtYmVyID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0VGVhbTEuc2V0QXR0cmlidXRlKFwiZGF0YS10cmFuc2xhdGVcIiwgXCJzaGFraHRhclwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RUZWFtMi5zZXRBdHRyaWJ1dGUoXCJkYXRhLXRyYW5zbGF0ZVwiLCBcImR5bmFtb1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoc2NvcmUxLmNsYXNzTGlzdC5jb250YWlucyhcImFjdGl2ZVwiKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByZWRpY3RfX2xhc3Qtc2NvcmVcIikuY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJlZGljdF9fbGFzdC1nb2FsXCIpLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZihnb2FsMS5jbGFzc0xpc3QuY29udGFpbnMoXCJhY3RpdmVcIikpe1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmVkaWN0X19sYXN0LXNjb3JlXCIpLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByZWRpY3RfX2xhc3QtZ29hbFwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVwiKVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYobGFzdEJldC5maXJzdEdvYWwpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYobGFzdEJldC5maXJzdEdvYWwgPT09IFwic2hha2h0YXJcIil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RHb2FsLnNldEF0dHJpYnV0ZShcImRhdGEtdHJhbnNsYXRlXCIsIFwic2hha2h0YXJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihsYXN0QmV0LmZpcnN0R29hbCA9PT0gXCJkeW5hbW9cIil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RHb2FsLnNldEF0dHJpYnV0ZShcImRhdGEtdHJhbnNsYXRlXCIsIFwiZHluYW1vXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobGFzdEJldC5maXJzdEdvYWwgPT09IFwiZHJhd1wiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdEdvYWwuc2V0QXR0cmlidXRlKFwiZGF0YS10cmFuc2xhdGVcIiwgXCJkcmF3XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZ29hbDEuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlXCIpIHx8IGdvYWwyLmNsYXNzTGlzdC5jb250YWlucyhcImFjdGl2ZVwiKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmVkaWN0X19sYXN0XCIpLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZighYmV0QXZhaWxhYmxlKXtcbiAgICAgICAgICAgICAgICAgICAgbGFzdFByZWRpY3QuY2xhc3NMaXN0LmFkZChcImhpZGVcIilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBsYXN0UHJlZGljdC5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvcjonLCBlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zdCBJbml0UGFnZSA9ICgpID0+IHtcbiAgICAgICAgY2hlY2tVc2VyQXV0aCgpO1xuICAgICAgICByZW5kZXJVc2VycygpO1xuICAgICAgICB1cGRhdGVUb3BGb3JlY2FzdHMoY3VycmVudFRhYilcbiAgICAgICAgcmVmcmVzaEJldEluZm8odXNlcklkKVxuICAgIH1cblxuICAgIGxldCBjaGVja1VzZXJBdXRoID0gKCkgPT4ge1xuICAgICAgICBpZiAodXNlcklkKSB7XG4gICAgICAgICAgICB5b3VBcmVJbkJ0bnMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpKTtcbiAgICAgICAgICAgIHVuYXV0aE1zZ3MuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LmFkZCgnaGlkZScpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobGV0IHlvdUFyZUluQnRuIG9mIHlvdUFyZUluQnRucykge1xuICAgICAgICAgICAgICAgIHlvdUFyZUluQnRuLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoY29uc3QgdW5hdXRoTWVzIG9mIHVuYXV0aE1zZ3MpIHtcbiAgICAgICAgICAgICAgICB1bmF1dGhNZXMuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHBsYWNlQmV0KGJldCkge1xuICAgICAgICBpZiAoIXVzZXJJZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKGJldClcblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByZWRpY3RfX2NvbnRhaW5lci5hY3RpdmVcIilcbiAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKCcucHJlZGljdF9fdGVhbS1pbmNyZWFzZSwgLnByZWRpY3RfX3RlYW0tZGVjcmVhc2UnKVxuICAgICAgICAgICAgLmZvckVhY2goYnRuID0+IHtcbiAgICAgICAgICAgICAgICBzY29yZUluaXQoYnRuKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGFjdGl2ZVRhYnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdvYWxDb250XCIpXG4gICAgICAgIC8vIGNvbnN0IGFjdGl2ZUlucHV0ID0gYWN0aXZlVGFiLnF1ZXJ5U2VsZWN0b3IoXCIucHJlZGljdF9fcmFkaW8taXRlbSBpbnB1dFwiKVxuXG5cblxuICAgICAgICBsZXQgcmVxID0ge1xuICAgICAgICAgICAgbWF0Y2hOdW1iZXI6IGJldC5tYXRjaE51bWJlcixcbiAgICAgICAgICAgIHVzZXJpZDogYmV0LnVzZXJpZCxcbiAgICAgICAgfTtcblxuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGFjdGl2ZVRhYnMpXG4gICAgICAgIGZvciAoY29uc3QgdGFiIG9mIGFjdGl2ZVRhYnMpIHtcbiAgICAgICAgICAgIGlmICh0YWIuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlXCIpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYWN0aXZlSW5wdXQgPSB0YWIucXVlcnlTZWxlY3RvcihcIi5wcmVkaWN0X19yYWRpby1pdGVtLl9hY3RpdmUgaW5wdXRcIik7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGFiKVxuXG4gICAgICAgICAgICAgICAgaWYgKGFjdGl2ZUlucHV0KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGFjdGl2ZUlucHV0KVxuICAgICAgICAgICAgICAgICAgICByZXEuZmlyc3RHb2FsID0gYWN0aXZlSW5wdXQudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cblxuICAgICAgICBpZiAoYmV0LmZpcnN0R29hbFVwZGF0ZWQpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGJldC5maXJzdEdvYWwpXG4gICAgICAgICAgICByZXEuZmlyc3RHb2FsID0gYmV0LmZpcnN0R29hbDtcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGJldC5nb2Fsc1VwZGF0ZWQpIHtcbiAgICAgICAgICAgIHJlcS50ZWFtMSA9IGJldC50ZWFtMTtcbiAgICAgICAgICAgIHJlcS50ZWFtMiA9IGJldC50ZWFtMjtcbiAgICAgICAgfVxuXG5cblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhhY3RpdmVJbnB1dCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGFjdGl2ZVRhYilcblxuXG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJjdXJyZW50QmV0XCIsIEpTT04uc3RyaW5naWZ5KHJlcSkpXG5cbiAgICAgICAgY29uc29sZS5sb2coc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcImN1cnJlbnRCZXRcIikpXG5cbiAgICAgICAgcmVxdWVzdCgnL2JldCcsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgYm9keTogc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcImN1cnJlbnRCZXRcIilcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ0JldCBwbGFjZWQ6JywgcmVzKTtcbiAgICAgICAgICAgICAgICBJbml0UGFnZSgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKCdFcnJvciBwbGFjaW5nIGJldDonLCBlcnJvcikpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvYWRUcmFuc2xhdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiBmZXRjaChgJHthcGlVUkx9L25ldy10cmFuc2xhdGVzLyR7bG9jYWxlfWApLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgICAgICAgICAudGhlbihqc29uID0+IHtcbiAgICAgICAgICAgICAgICBpMThuRGF0YSA9IGpzb247XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlKCk7XG4gICAgICAgICAgICAgICAgdmFyIG11dGF0aW9uT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbiAobXV0YXRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG11dGF0aW9uT2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ29hbHMtb3ItemVyb3MnKSwge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHN1YnRyZWU6IHRydWUsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGUoKSB7XG4gICAgICAgIGNvbnN0IGVsZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdHJhbnNsYXRlXScpXG4gICAgICAgIGlmKHRyYW5zbGF0ZVN0YXRlKXtcbiAgICAgICAgICAgIGVsZW1zLmZvckVhY2goZWxlbSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gZWxlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdHJhbnNsYXRlJyk7XG4gICAgICAgICAgICAgICAgZWxlbS5pbm5lckhUTUwgPSBpMThuRGF0YVtrZXldIHx8ICcqLS0tLU5FRUQgVE8gQkUgVFJBTlNMQVRFRC0tLS0qICAga2V5OiAgJyArIGtleTtcbiAgICAgICAgICAgICAgICBlbGVtLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS10cmFuc2xhdGUnKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0cmFuc2xhdGlvbiB3b3JrIVwiKVxuICAgICAgICB9XG4gICAgICAgIHJlZnJlc2hMb2NhbGl6ZWRDbGFzcyhtYWluUGFnZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVmcmVzaExvY2FsaXplZENsYXNzKGVsZW1lbnQpIHtcbiAgICAgICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBsYW5nIG9mIFsndWsnLCAnZW4nXSkge1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGxhbmcpO1xuICAgICAgICB9XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChsb2NhbGUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIGlmKCFjdXJyZW50QmV0KXtcbiAgICAgICAgICAgIGN1cnJlbnRCZXQgPSBuZXcgQmV0KHVzZXJJZCwgbWF0Y2hOdW1iZXIpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHdpbmRvdy5zdG9yZSkge1xuICAgICAgICAgICAgdmFyIHN0YXRlID0gd2luZG93LnN0b3JlLmdldFN0YXRlKCk7XG4gICAgICAgICAgICB1c2VySWQgPSBzdGF0ZS5hdXRoLmlzQXV0aG9yaXplZCAmJiBzdGF0ZS5hdXRoLmlkIHx8ICcnO1xuICAgICAgICAgICAgLy8gY3VycmVudEJldCA9IG5ldyBCZXQodXNlcklkLCBtYXRjaE51bWJlcilcbiAgICAgICAgICAgIEluaXRQYWdlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBJbml0UGFnZSgpO1xuICAgICAgICAgICAgbGV0IGMgPSAwO1xuICAgICAgICAgICAgdmFyIGkgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGMgPCA1MCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoISF3aW5kb3cuZ191c2VyX2lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VySWQgPSB3aW5kb3cuZ191c2VyX2lkO1xuICAgICAgICAgICAgICAgICAgICAgICAgSW5pdFBhZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDIwMCk7XG5cbiAgICAgICAgfVxuICAgICAgICBJbml0UGFnZSgpXG4gICAgICAgIHBsYWNlQmV0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2xpY2tcIilcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmKGN1cnJlbnRCZXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRCZXQgPSBuZXcgQmV0KHVzZXJJZCwgbWF0Y2hOdW1iZXIpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwbGFjZUJldChjdXJyZW50QmV0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHVwZGF0ZVNjb3JlKG1hdGNoTnVtYmVyLCB0ZWFtMUdvYWxzLCB0ZWFtMkdvYWxzKSB7XG4gICAgICAgIGlmIChjdXJyZW50QmV0ICYmIGN1cnJlbnRCZXQubWF0Y2hOdW1iZXIgPT09IG1hdGNoTnVtYmVyKSB7XG4gICAgICAgICAgICBjdXJyZW50QmV0LnVwZGF0ZUdvYWxzKHRlYW0xR29hbHMsIHRlYW0yR29hbHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY3VycmVudEJldCA9IG5ldyBCZXQodXNlcklkLCBtYXRjaE51bWJlciwgdGVhbTFHb2FscywgdGVhbTJHb2Fscyk7XG4gICAgICAgICAgICBjdXJyZW50QmV0LnVwZGF0ZUdvYWxzKHRlYW0xR29hbHMsIHRlYW0yR29hbHMpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGN1cnJlbnRCZXQpO1xuICAgIH1cbiAgICBmdW5jdGlvbiB1cGRhdGVGaXJzdEdvYWwobWF0Y2hOdW1iZXIsIGZpcnN0R29hbCkge1xuICAgICAgICBpZiAoY3VycmVudEJldCAmJiBjdXJyZW50QmV0Lm1hdGNoTnVtYmVyID09PSBtYXRjaE51bWJlcikge1xuICAgICAgICAgICAgY3VycmVudEJldC51cGRhdGVGaXJzdEdvYWwoZmlyc3RHb2FsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGN1cnJlbnRCZXQpO1xuICAgIH1cbiAgICBmdW5jdGlvbiB1cGRhdGVUb3BGb3JlY2FzdHMobWF0Y2hOdW1iZXIpIHtcbiAgICAgICAgcmVxdWVzdChgL3VzZXJzLyR7bWF0Y2hOdW1iZXJ9YCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGEudG9wRm9yZWNhc3RzKTsgLy8g0J/QtdGA0LXQstGW0YDQutCwINC+0YLRgNC40LzQsNC90LjRhSDQtNCw0L3QuNGFXG5cbiAgICAgICAgICAgIGNvbnN0IGZvcmVjYXN0c0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X19mb3JlY2FzdHMnKTtcbiAgICAgICAgICAgIGZvcmVjYXN0c0NvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcblxuXG4gICAgICAgICAgICBkYXRhLnRvcEZvcmVjYXN0cy5mb3JFYWNoKGZvcmVjYXN0ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3JlY2FzdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICBmb3JlY2FzdEl0ZW0uY2xhc3NMaXN0LmFkZCgncHJlZGljdF9fZm9yZWNhc3RzLWl0ZW0nKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHBlcmNlbnRhZ2UgPSBwYXJzZUZsb2F0KGZvcmVjYXN0LnBlcmNlbnRhZ2UpLnRvRml4ZWQoMSk7XG4gICAgICAgICAgICAgICAgY29uc3QgcGVyY2VudGFnZVNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICAgICAgcGVyY2VudGFnZVNwYW4udGV4dENvbnRlbnQgPSBgJHtwZXJjZW50YWdlfSVgO1xuXG5cbiAgICAgICAgICAgICAgICBjb25zdCBmb3JlY2FzdFRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShgICR7Zm9yZWNhc3QuZm9yZWNhc3QgPz8gXCIwLTBcIn1gKTtcbiAgICAgICAgICAgICAgICBmb3JlY2FzdEl0ZW0uYXBwZW5kQ2hpbGQocGVyY2VudGFnZVNwYW4pO1xuICAgICAgICAgICAgICAgIGZvcmVjYXN0SXRlbS5hcHBlbmRDaGlsZChmb3JlY2FzdFRleHQpO1xuXG4gICAgICAgICAgICAgICAgZm9yZWNhc3RzQ29udGFpbmVyLmFwcGVuZENoaWxkKGZvcmVjYXN0SXRlbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgdG9wIGZvcmVjYXN0czonLCBlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZW5kZXJVc2VycygpIHtcbiAgICAgICAgcmVxdWVzdChgL3VzZXJzLyR7Y3VycmVudFRhYlRhYmxlfWApXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcblxuICAgICAgICAgICAgICAgIGxldCB1c2VycyA9IGRhdGEudXNlcnNcblxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHVzZXJzKVxuICAgICAgICAgICAgICAgIGNvbnN0IGlzU2NvcmVUYWJBY3RpdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fdGFicy1zY29yZS5hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICBjb25zdCBpc0dvYWxUYWJBY3RpdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fdGFicy1nb2FsLmFjdGl2ZScpO1xuXG4gICAgICAgICAgICAgICAgaWYodXNlcnMubGVuZ3RoID49IDUwKXtcbiAgICAgICAgICAgICAgICAgICAgc2hvd1RvcEZvcmVjYXN0ID0gdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZih1c2Vycy5sZW5ndGggPCA1MCl7XG4gICAgICAgICAgICAgICAgICAgIHNob3dUb3BGb3JlY2FzdCA9IGZhbHNlXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGlzU2NvcmVUYWJBY3RpdmUgJiYgc2hvd1RvcEZvcmVjYXN0KSB0b3BGb3JlY2FzdC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVwiKVxuICAgICAgICAgICAgICAgIGlmIChpc0dvYWxUYWJBY3RpdmUpIHRvcEZvcmVjYXN0LmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpXG5cblxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHR5cGVvZiB1c2VySWQpXG5cbiAgICAgICAgICAgICAgICBwb3B1bGF0ZVVzZXJzVGFibGUodXNlcnMsIHVzZXJJZCwgY3VycmVudFRhYlRhYmxlKVxuXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codXNlcnMpXG4gICAgICAgICAgICB9KTtcblxuICAgIH1cbiAgICBmdW5jdGlvbiBwb3B1bGF0ZVVzZXJzVGFibGUodXNlcnMsIGN1cnJlbnRVc2VySWQsIG1hdGNoTnVtYmVyKSB7XG4gICAgICAgIHJlc3VsdHNUYWJsZS5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgcmVzdWx0c1RhYmxlT3RoZXIuaW5uZXJIVE1MID0gJyc7XG5cbiAgICAgICAgaWYgKCF1c2VycyB8fCAhdXNlcnMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgLy8gLy8g0KTRltC70YzRgtGA0YPRlNC80L4g0LrQvtGA0LjRgdGC0YPQstCw0YfRltCyLCDRj9C60ZYg0LfRgNC+0LHQuNC70Lgg0YHRgtCw0LLQutGDINC90LAg0LLQutCw0LfQsNC90LjQuSDQvNCw0YLRh1xuICAgICAgICAvLyBjb25zdCB1c2VycyA9IHVzZXJzLmZpbHRlcih1c2VyID0+XG4gICAgICAgIC8vICAgICB1c2VyLmJldHMuc29tZShiZXQgPT4gYmV0Lm1hdGNoTnVtYmVyID09PSBtYXRjaE51bWJlcilcbiAgICAgICAgLy8gKTtcblxuICAgICAgICAvLyBpZiAoIXVzZXJzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIC8vINCX0L3QsNGF0L7QtNC40LzQviDQv9C+0YLQvtGH0L3QvtCz0L4g0LrQvtGA0LjRgdGC0YPQstCw0YfQsFxuICAgICAgICBjb25zdCBjdXJyZW50VXNlciA9IHVzZXJzLmZpbmQodXNlciA9PiB1c2VyLnVzZXJpZCA9PT0gY3VycmVudFVzZXJJZCk7XG5cbiAgICAgICAgLy8g0JLQuNCy0L7QtNC40LzQviDQstGB0ZbRhSDRltC90YjQuNGFINC60L7RgNC40YHRgtGD0LLQsNGH0ZbQsiDRgyByZXN1bHRzVGFibGVcbiAgICAgICAgdXNlcnMuZm9yRWFjaCh1c2VyID0+IHtcbiAgICAgICAgICAgIGlmICh1c2VyLnVzZXJpZCAhPT0gY3VycmVudFVzZXJJZCkge1xuICAgICAgICAgICAgICAgIGRpc3BsYXlVc2VyKHVzZXIsIGZhbHNlLCByZXN1bHRzVGFibGUsIHVzZXJzLCBtYXRjaE51bWJlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vINCS0LjQstC+0LTQuNC80L4g0L/QvtGC0L7Rh9C90L7Qs9C+INC60L7RgNC40YHRgtGD0LLQsNGH0LAg0LIgcmVzdWx0c1RhYmxlT3RoZXJcbiAgICAgICAgaWYgKGN1cnJlbnRVc2VyKSB7XG4gICAgICAgICAgICBkaXNwbGF5VXNlcihjdXJyZW50VXNlciwgdHJ1ZSwgcmVzdWx0c1RhYmxlT3RoZXIsIHVzZXJzLCBtYXRjaE51bWJlcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gZGlzcGxheVVzZXIodXNlciwgaXNDdXJyZW50VXNlciwgdGFibGUsIGFsbFVzZXJzLCBtYXRjaE51bWJlcikge1xuICAgICAgICBsZXQgbWF0Y2hEYXRlO1xuXG4gICAgICAgIGlmIChtYXRjaE51bWJlciA9PT0gMSkge1xuICAgICAgICAgICAgbWF0Y2hEYXRlID0gRklSU1RfTUFUQ0hfREFURTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGFkZGl0aW9uYWxVc2VyUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGFkZGl0aW9uYWxVc2VyUm93LmNsYXNzTGlzdC5hZGQoJ3RhYmxlX19yb3cnKTtcblxuICAgICAgICBhZGRpdGlvbmFsVXNlclJvdy5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZV9fcm93LWl0ZW1cIj4ke2lzQ3VycmVudFVzZXIgPyB1c2VyLnVzZXJpZCA6IG1hc2tVc2VySWQodXNlci51c2VyaWQpfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVfX3Jvdy1pdGVtXCI+XG4gICAgICAgICAgICAke2N1cnJlbnREYXRlID49IG1hdGNoRGF0ZSA/XG4gICAgICAgICAgICBgPHNwYW4+JHt1c2VyLnRlYW0xICE9PSB1bmRlZmluZWQgJiYgdXNlci50ZWFtMSAhPT0gbnVsbCA/IHVzZXIudGVhbTEgOiBcIi1cIn08L3NwYW4+PGltZyBzcmM9XCJodHRwczovL2Zhdi1wcm9tLmNvbS9odG1sL2dvYWxzLW9yLXplcm9lcy9pbWcvdnMucG5nXCIgYWx0PVwidnNcIj48c3Bhbj4ke3VzZXIudGVhbTIgIT09IHVuZGVmaW5lZCAmJiB1c2VyLnRlYW0yICE9PSBudWxsID8gdXNlci50ZWFtMiA6IFwiLVwifTwvc3Bhbj5gIDpcbiAgICAgICAgICAgIGA8c3Bhbj4qKjwvc3Bhbj48aW1nIHNyYz1cImh0dHBzOi8vZmF2LXByb20uY29tL2h0bWwvZ29hbHMtb3ItemVyb2VzL2ltZy92cy5wbmdcIiBhbHQ9XCJ2c1wiPjxzcGFuPioqPC9zcGFuPmBcbiAgICAgICAgfVxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICAke3VzZXIud2lubmVyID09PSB0cnVlICA/XG4gICAgICAgICAgICBgPGRpdiBjbGFzcz1cInRhYmxlX19yb3ctaXRlbVwiIGRhdGEtdHJhbnNsYXRlPVwicHJpemVcIj4qKioqKjwvZGl2PmAgOlxuICAgICAgICAgICAgYDxkaXYgY2xhc3M9XCJ0YWJsZV9fcm93LWl0ZW1cIiBkYXRhLXRyYW5zbGF0ZT1cIm5vV2lubmVyc1wiPioqKioqPC9kaXY+YFxuICAgICAgICB9XG5cbiAgICAgICAgJHt1c2VyLmJvbnVzRmlyc3RHb2FsID09PSB0cnVlICA/XG4gICAgICAgICAgICBgPGRpdiBjbGFzcz1cInRhYmxlX19yb3ctaXRlbVwiIGRhdGEtdHJhbnNsYXRlPVwic3M1MDBcIj4qKioqKjwvZGl2PmAgOlxuICAgICAgICAgICAgYDxkaXYgY2xhc3M9XCJ0YWJsZV9fcm93LWl0ZW1cIiBkYXRhLXRyYW5zbGF0ZT1cIm5vV2lubmVyc1wiPioqKioqPC9kaXY+YFxuICAgICAgICB9XG4gICAgYDtcblxuICAgICAgICBpZiAoaXNDdXJyZW50VXNlcikge1xuICAgICAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuY2xhc3NMaXN0LmFkZChcInlvdVwiKTtcbiAgICAgICAgICAgIGFkZGl0aW9uYWxVc2VyUm93LmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZV9fcm93LWl0ZW1cIj4ke2lzQ3VycmVudFVzZXIgPyB1c2VyLnVzZXJpZCA6IG1hc2tVc2VySWQodXNlci51c2VyaWQpfTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlX19yb3ctaXRlbVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuPiR7dXNlci50ZWFtMSAhPT0gdW5kZWZpbmVkICYmIHVzZXIudGVhbTEgIT09IG51bGwgPyB1c2VyLnRlYW0xIDogXCItXCJ9PC9zcGFuPjxpbWcgc3JjPVwiaHR0cHM6Ly9mYXYtcHJvbS5jb20vaHRtbC9nb2Fscy1vci16ZXJvZXMvaW1nL3ZzLnBuZ1wiIGFsdD1cInZzXCI+PHNwYW4+JHt1c2VyLnRlYW0yICE9PSB1bmRlZmluZWQgJiYgdXNlci50ZWFtMiAhPT0gbnVsbCA/IHVzZXIudGVhbTIgOiBcIi1cIn08L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICR7dXNlci53aW5uZXIgPT09IHRydWUgID9cbiAgICAgICAgICAgICAgICBgPGRpdiBjbGFzcz1cInRhYmxlX19yb3ctaXRlbVwiIGRhdGEtdHJhbnNsYXRlPVwicHJpemVcIj4qKioqKjwvZGl2PmAgOlxuICAgICAgICAgICAgICAgIGA8ZGl2IGNsYXNzPVwidGFibGVfX3Jvdy1pdGVtXCIgZGF0YS10cmFuc2xhdGU9XCJub1dpbm5lcnNcIj4qKioqKjwvZGl2PmBcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJHt1c2VyLmJvbnVzRmlyc3RHb2FsID09PSB0cnVlICA/XG4gICAgICAgICAgICAgICAgYDxkaXYgY2xhc3M9XCJ0YWJsZV9fcm93LWl0ZW1cIiBkYXRhLXRyYW5zbGF0ZT1cInNzNTAwXCI+KioqKio8L2Rpdj5gIDpcbiAgICAgICAgICAgICAgICBgPGRpdiBjbGFzcz1cInRhYmxlX19yb3ctaXRlbVwiIGRhdGEtdHJhbnNsYXRlPVwibm9XaW5uZXJzXCI+KioqKio8L2Rpdj5gXG4gICAgICAgICAgICB9XG4gICAgICAgIGA7XG4gICAgICAgICAgICBjb25zdCB5b3VCbG9jayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgeW91QmxvY2suY2xhc3NMaXN0LmFkZCgndGFibGVfX3Jvdy15b3UnKTtcbiAgICAgICAgICAgIHlvdUJsb2NrLnNldEF0dHJpYnV0ZSgnZGF0YS10cmFuc2xhdGUnLCAndGFibGVZb3UnKTtcbiAgICAgICAgICAgIC8vIHlvdUJsb2NrLnRleHRDb250ZW50ID0gXCJZb3VcIjtcbiAgICAgICAgICAgIGFkZGl0aW9uYWxVc2VyUm93Lmluc2VydEJlZm9yZSh5b3VCbG9jaywgYWRkaXRpb25hbFVzZXJSb3cuY2hpbGRyZW5bMV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGFibGUuYXBwZW5kKGFkZGl0aW9uYWxVc2VyUm93KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbWFza1VzZXJJZCh1c2VySWQpIHtcbiAgICAgICAgcmV0dXJuIFwiKipcIiArIHVzZXJJZC50b1N0cmluZygpLnNsaWNlKDIpO1xuICAgIH1cblxuICAgIC8vIDNEIGFuaW1cbiAgICBjb25zdCBjYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGVhbSwgLmFuaW1DYXJkLCAuYW5pbVJpZ2h0XCIpOyAvLyDQlNC+0LHQsNCy0LvRj9C10LwgLmFuaW1SaWdodFxuICAgIGxldCBhbmdsZSA9IDA7XG5cbiAgICBmdW5jdGlvbiBhbmltYXRlQ2FyZHMoKSB7XG4gICAgICAgIGFuZ2xlICs9IDAuOTsgLy8gc3BlZWRcbiAgICAgICAgY29uc3Qgcm90YXRlWCA9IE1hdGguc2luKGFuZ2xlICogKE1hdGguUEkgLyAxODApKSAqIDEwOyAvLyDQmtC+0LvQtdCx0LDQvdC40LUg0L/QviBYXG4gICAgICAgIGNvbnN0IHJvdGF0ZVkgPSBNYXRoLmNvcyhhbmdsZSAqIChNYXRoLlBJIC8gMTgwKSkgKiAxMDsgLy8g0JrQvtC70LXQsdCw0L3QuNC1INC/0L4gWVxuXG4gICAgICAgIGNhcmRzLmZvckVhY2goY2FyZCA9PiB7XG4gICAgICAgICAgICBpZiAoY2FyZC5jbGFzc0xpc3QuY29udGFpbnMoXCJhbmltUmlnaHRcIikpIHtcbiAgICAgICAgICAgICAgICBjYXJkLnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGVZKCR7LXJvdGF0ZVl9ZGVnKSByb3RhdGVYKCR7LXJvdGF0ZVh9ZGVnKWA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNhcmQuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZVkoJHtyb3RhdGVZfWRlZykgcm90YXRlWCgke3JvdGF0ZVh9ZGVnKWA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlQ2FyZHMpO1xuICAgIH1cbiAgICBhbmltYXRlQ2FyZHMoKTtcblxuICAgIC8vIHByZWRpY3QgdGFic1xuICAgIGNvbnN0IHRhYnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJlZGljdF9fdGFicy1nbG9iYWwgPiBkaXYsIC5wcmVkaWN0X190YWJzLWRhdGVzID4gZGl2Jyk7XG4gICAgY29uc3QgY29udGFpbmVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcmVkaWN0X19jb250YWluZXInKTtcblxuICAgIGZ1bmN0aW9uIGhhbmRsZVRhYkNsaWNrKGV2ZW50KSB7XG4gICAgICAgIGxldCBtYXRjaERhdGU7XG4gICAgICAgIGxldCBjdXJyZW50TWF0Y2ggPSAxXG5cbiAgICAgICAgY29uc3QgY2xpY2tlZFRhYiA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KFwiLnByZWRpY3RfX3RhYnMtZGF0ZVwiKSB8fCBldmVudC50YXJnZXQuY2xvc2VzdChcIi5wcmVkaWN0X190YWJzLWdvYWxcIikgfHwgZXZlbnQudGFyZ2V0LmNsb3Nlc3QoXCIucHJlZGljdF9fdGFicy1zY29yZVwiKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY2xpY2tlZFRhYilcbiAgICAgICAgY29uc3QgdGFiUGFpciA9IGNsaWNrZWRUYWIuY2xvc2VzdCgnLnByZWRpY3RfX3RhYnMtZ2xvYmFsJykgfHwgY2xpY2tlZFRhYi5jbG9zZXN0KCcucHJlZGljdF9fdGFicy1kYXRlcycpO1xuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNsaWNrZWRUYWIpXG5cbiAgICAgICAgaWYoY3VycmVudE1hdGNoID09PSAxKXtcbiAgICAgICAgICAgIG1hdGNoRGF0ZSA9IEZJUlNUX01BVENIX0RBVEVcbiAgICAgICAgfVxuICAgICAgICBpZihjdXJyZW50RGF0ZSA+IG1hdGNoRGF0ZSl7XG4gICAgICAgICAgICBwbGFjZUJldEJ0bi5jbGFzc0xpc3QuYWRkKFwiX2xvY2tcIilcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBwbGFjZUJldEJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwiX2xvY2tcIilcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYgKGNsaWNrZWRUYWIuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkgcmV0dXJuO1xuICAgICAgICBpZiAodGFiUGFpcikge1xuICAgICAgICAgICAgY29uc3QgcGFpciA9IHRhYlBhaXIucXVlcnlTZWxlY3RvckFsbCgnLmFjdGl2ZScpO1xuICAgICAgICAgICAgaWYgKHBhaXIubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHBhaXJbMF0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjbGlja2VkVGFiLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICB1cGRhdGVDb250YWluZXJzKCk7XG4gICAgICAgIC8vIHJlZnJlc2hCZXRJbmZvKHVzZXJJZClcbiAgICAgICAgaWYoY2xpY2tlZFRhYi5jbG9zZXN0KCcucHJlZGljdF9fdGFicy1zY29yZScpKXtcbiAgICAgICAgICAgIHVwZGF0ZVRvcEZvcmVjYXN0cyhjdXJyZW50TWF0Y2gpXG4gICAgICAgICAgICBjdXJyZW50QmV0ID0gbmV3IEJldCh1c2VySWQsIGN1cnJlbnRNYXRjaClcbiAgICAgICAgICAgIG1hdGNoTnVtYmVyID0gMVxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcmVkaWN0X190ZWFtLW51bWJlclwiKS5mb3JFYWNoKChzY29yZSwgaSkgPT57XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cobWF0Y2hEYXRlLCBtYXRjaE51bWJlcilcbiAgICAgICAgICAgICAgICBpZihjdXJyZW50RGF0ZSA+IG1hdGNoRGF0ZSAmJiBpID09PSAxICYmIG1hdGNoTnVtYmVyID09PSAxKXtcbiAgICAgICAgICAgICAgICAgICAgc2NvcmUudGV4dENvbnRlbnQgPSBcIjBcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKGN1cnJlbnREYXRlID4gbWF0Y2hEYXRlICYmIGkgPT09IDAgJiYgbWF0Y2hOdW1iZXIgPT09IDEpe1xuICAgICAgICAgICAgICAgICAgICBzY29yZS50ZXh0Q29udGVudCA9IFwiMFwiXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbdHlwZT1cInJhZGlvXCJdOmNoZWNrZWQnKS5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICAgICAgICAgICAgYnV0dG9uLmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cbiAgICAgICAgbG9ja01hdGNoQ29udGFpbmVyKEZJUlNUX01BVENIX0RBVEUsIDEpOyAvLyDQlNC70Y8g0L/QtdGA0YjQvtCz0L4g0LzQsNGC0YfRg1xuICAgIH1cblxuICAgIHRhYnMuZm9yRWFjaCh0YWIgPT4gdGFiLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlVGFiQ2xpY2spKTtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUNvbnRhaW5lcnMoKSB7XG4gICAgICAgIGNvbnRhaW5lcnMuZm9yRWFjaChjb250YWluZXIgPT4gY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcbiAgICAgICAgcmVmcmVzaEJldEluZm8odXNlcklkKVxuICAgICAgICBjb25zdCBpc1Njb3JlVGFiQWN0aXZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX3RhYnMtc2NvcmUuYWN0aXZlJyk7XG4gICAgICAgIGNvbnN0IGlzR29hbFRhYkFjdGl2ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X190YWJzLWdvYWwuYWN0aXZlJyk7XG4gICAgICAgIGlmIChpc1Njb3JlVGFiQWN0aXZlKSB7XG4gICAgICAgICAgICBpZihzaG93VG9wRm9yZWNhc3QpIHRvcEZvcmVjYXN0LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fY29udGFpbmVyLnNjb3JlLTEnKS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X190YWJzLXR4dC0yJykuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX3RhYnMtdHh0LTEnKS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNHb2FsVGFiQWN0aXZlKSB7XG4gICAgICAgICAgICBpZihzaG93VG9wRm9yZWNhc3QpIHRvcEZvcmVjYXN0LmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fdGFicy10eHQtMScpLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X190YWJzLXR4dC0yJykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX2NvbnRhaW5lci5nb2FsLTEnKS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vc2NvcmVcblxuICAgIGZ1bmN0aW9uIHNjb3JlSW5pdChidG4pe1xuICAgICAgICBjb25zdCB0ZWFtQ29udHJvbCA9IGJ0bi5jbG9zZXN0KCcucHJlZGljdF9fdGVhbS1jb250cm9sJyk7XG4gICAgICAgIGNvbnN0IHRlYW1OdW1iZXIgPSB0ZWFtQ29udHJvbC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fdGVhbS1udW1iZXInKVxuICAgICAgICBjb25zdCBtYXRjaENvbnRhaW5lciA9IGJ0bi5jbG9zZXN0KCcucHJlZGljdF9fY29udGFpbmVyJyk7XG4gICAgICAgIGNvbnN0IG1hdGNoTnVtYmVyID0gcGFyc2VJbnQobWF0Y2hDb250YWluZXIuZGF0YXNldC5tYXRjaE51bWJlcik7XG5cbiAgICAgICAgY29uc3QgZ2V0R29hbHMgPSAodGVhbSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IG1hdGNoQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXRlYW09XCIke3RlYW19XCJdIC5wcmVkaWN0X190ZWFtLW51bWJlcmApO1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQgPyBOdW1iZXIoZWxlbWVudC50ZXh0Q29udGVudCkgfHwgMCA6IDA7XG4gICAgICAgIH07XG5cblxuICAgICAgICBjb25zdCB0ZWFtMUdvYWxzID0gZ2V0R29hbHMoJ3RlYW0xJykgO1xuICAgICAgICBjb25zdCB0ZWFtMkdvYWxzID0gZ2V0R29hbHMoJ3RlYW0yJyk7XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2codGVhbTFHb2FscywgdGVhbTJHb2FscylcblxuICAgICAgICB1cGRhdGVTY29yZShtYXRjaE51bWJlciwgdGVhbTFHb2FscywgdGVhbTJHb2Fscyk7XG4gICAgfVxuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByZWRpY3RfX3RlYW0taW5jcmVhc2UsIC5wcmVkaWN0X190ZWFtLWRlY3JlYXNlJykuZm9yRWFjaChidG4gPT4ge1xuICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICAgICAgY29uc3QgdGVhbUNvbnRyb2wgPSBidG4uY2xvc2VzdCgnLnByZWRpY3RfX3RlYW0tY29udHJvbCcpO1xuICAgICAgICAgICAgY29uc3QgdGVhbU51bWJlciA9IHRlYW1Db250cm9sLnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X190ZWFtLW51bWJlcicpXG4gICAgICAgICAgICBjb25zdCBtYXRjaENvbnRhaW5lciA9IGJ0bi5jbG9zZXN0KCcucHJlZGljdF9fY29udGFpbmVyJyk7XG5cbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHBhcnNlSW50KHRlYW1OdW1iZXIudGV4dENvbnRlbnQpO1xuICAgICAgICAgICAgaWYgKGJ0bi5jbGFzc0xpc3QuY29udGFpbnMoJ3ByZWRpY3RfX3RlYW0taW5jcmVhc2UnKSkge1xuICAgICAgICAgICAgICAgIHZhbHVlICs9IDE7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID4gMCkge1xuICAgICAgICAgICAgICAgIHZhbHVlIC09IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0ZWFtTnVtYmVyLnRleHRDb250ZW50ID0gYCR7dmFsdWV9YDtcbiAgICAgICAgICAgIHNjb3JlSW5pdChidG4pXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhiZXQpXG4gICAgICAgIH0pXG4gICAgfSk7XG5cbiAgICAvL3RhYmxlIHRhYnNcbiAgICAvLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFibGVfX3RhYnMtZGF0ZScpLmZvckVhY2godGFiID0+IHtcbiAgICAvLyAgICAgdGFiLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgLy8gICAgICAgICBpZiAodGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XG4gICAgLy8gICAgICAgICAgICAgcmV0dXJuO1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYmxlX190YWJzLWRhdGUnKS5mb3JFYWNoKHRhYiA9PiB0YWIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xuICAgIC8vICAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAvLyAgICAgICAgIGN1cnJlbnRUYWJUYWJsZSA9IE51bWJlcihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhYmxlX190YWJzLWRhdGUuYWN0aXZlXCIpLmdldEF0dHJpYnV0ZShcImRhdGEtbWF0Y2gtbnVtYmVyXCIpKVxuICAgIC8vICAgICAgICAgcmVuZGVyVXNlcnMoKTtcbiAgICAvLyAgICAgfSk7XG4gICAgLy8gfSk7XG5cblxuICAgIC8vcG9wdXBzXG5cbiAgICBmdW5jdGlvbiBzZXRQb3B1cHModHJpZ2dlckJ1dHRvbnMsIHBvcHVwQ2xhc3MpIHtcbiAgICAgICAgY29uc3QgcG9wdXBzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwcycpO1xuICAgICAgICBjb25zdCBwb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5wb3B1cHNfX2l0ZW0uJHtwb3B1cENsYXNzfWApO1xuICAgICAgICBjb25zdCBwb3B1cEJ0biA9IHBvcHVwc0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwc19faXRlbS1idG5cIilcblxuXG4gICAgICAgIGlmICghdHJpZ2dlckJ1dHRvbnMgfHwgIXBvcHVwIHx8ICFwb3B1cHNDb250YWluZXIpIHJldHVybjtcblxuICAgICAgICB0cmlnZ2VyQnV0dG9ucy5mb3JFYWNoKHRyaWdnZXJCdXR0b24gPT4ge1xuICAgICAgICAgICAgdHJpZ2dlckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBwb3B1cHNDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnX29wYWNpdHknKTtcbiAgICAgICAgICAgICAgICBwb3B1cHNDb250YWluZXIuY2xhc3NMaXN0LmFkZChwb3B1cENsYXNzKTtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgY2xvc2VCdXR0b24gPSBwb3B1cC5xdWVyeVNlbGVjdG9yKCcucG9wdXBzX19pdGVtLWNsb3NlJyk7XG4gICAgICAgIGNvbnN0IGJ0bkNsb3NlID0gcG9wdXAucXVlcnlTZWxlY3RvcignLmJ0bi1jbG9zZScpO1xuXG4gICAgICAgIHBvcHVwc0NvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgICAgIGlmIChlLnRhcmdldCA9PT0gcG9wdXBzQ29udGFpbmVyIHx8IGUudGFyZ2V0ID09PSBjbG9zZUJ1dHRvbiB8fCBlLnRhcmdldCA9PT0gYnRuQ2xvc2UpIHtcbiAgICAgICAgICAgICAgICBjbG9zZVBvcHVwKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZ1bmN0aW9uIGNsb3NlUG9wdXAoKSB7XG4gICAgICAgICAgICBwb3B1cHNDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnX29wYWNpdHknKTtcbiAgICAgICAgICAgIHBvcHVwc0NvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKHBvcHVwQ2xhc3MpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICcnO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHBvcHVwQnRuKVxuICAgICAgICBwb3B1cEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+e1xuICAgICAgICAgICAgY2xvc2VQb3B1cCgpXG4gICAgICAgIH0pXG5cbiAgICB9XG5cbiAgICBzZXRQb3B1cHMoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdpZGVfX2xpc3QtYnRuJyksICdnaWRlUG9wdXAnKTtcbiAgICBzZXRQb3B1cHMoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByZWRpY3RfX2J0bi50b29rLXBhcnQnKSwgJ19jb25maXJtUG9wdXAnKTtcblxuICAgIC8vZ28gdG8gcHJlZGljdFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9QcmVkaWN0XCIpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCB0YXJnZXRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmVkaWN0XCIpO1xuICAgICAgICBjb25zdCB0YXJnZXRQb3NpdGlvbiA9IHRhcmdldEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgd2luZG93LnBhZ2VZT2Zmc2V0IC0gMjtcblxuICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oe1xuICAgICAgICAgICAgdG9wOiB0YXJnZXRQb3NpdGlvbixcbiAgICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJyxcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCByYWRpb0NvbnRhaW5lcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJlZGljdF9fcmFkaW8nKTtcblxuICAgIHJhZGlvQ29udGFpbmVycy5mb3JFYWNoKGNvbnRhaW5lciA9PiB7XG4gICAgICAgIGNvbnN0IHJhZGlvSW5wdXRzID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcmVkaWN0X19yYWRpby1pdGVtJyk7XG5cbiAgICAgICAgcmFkaW9JbnB1dHMuZm9yRWFjaCgocmFkaW8pID0+IHtcbiAgICAgICAgICAgIHJhZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJhZGlvSW5wdXRzLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ19hY3RpdmUnKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdfYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5xdWVyeVNlbGVjdG9yKFwiaW5wdXRcIikudmFsdWUpXG5cbiAgICAgICAgICAgICAgICB1cGRhdGVGaXJzdEdvYWwobWF0Y2hOdW1iZXIsIHRoaXMucXVlcnlTZWxlY3RvcihcImlucHV0XCIpLnZhbHVlKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGxvYWRUcmFuc2xhdGlvbnMoKVxuICAgICAgICAudGhlbihpbml0KVxuXG4gICAgLy8gVEVTVFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXJrLWJ0bicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoJ2RhcmsnKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGxuZ0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubG5nLWJ0blwiKVxuXG4gICAgbG5nQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGlmIChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwibG9jYWxlXCIpKSB7XG4gICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKFwibG9jYWxlXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcImxvY2FsZVwiLCBcImVuXCIpO1xuICAgICAgICB9XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGF1dGhCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmF1dGgtYnRuXCIpXG5cbiAgICBhdXRoQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PntcbiAgICAgICAgaWYodXNlcklkKXtcbiAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oXCJ1c2VySWRcIilcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwidXNlcklkXCIsIFwiMTg5MDg0NjVcIilcbiAgICAgICAgfVxuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKClcbiAgICB9KTtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG4tbGFzdFByZWQnKS5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByZWRpY3RfX2xhc3QnKS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZScpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgc2V0UG9wdXBzKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG4tdGhlbmtzJyksICdfY29uZmlybVBvcHVwJyk7XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYnRuLXByZWRpY3QnKS5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy51bmNvbmZpcm1lZCcpLmZvckVhY2godW5jb25maXJtZWQgPT4ge1xuICAgICAgICAgICAgICAgIHVuY29uZmlybWVkLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb25maXJtZWQnKS5mb3JFYWNoKGNvbmZpcm1lZCA9PiB7XG4gICAgICAgICAgICAgICAgY29uZmlybWVkLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1lbnUtYnRuXCIpPy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tZW51LXRlc3RcIik/LmNsYXNzTGlzdC50b2dnbGUoXCJoaWRlXCIpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLWFmdGVyXCIpPy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBjb25zdCBGSVJTVF9NQVRDSF9EQVRFID0gbmV3IERhdGUoJzIwMjItMDMtMjBUMjE6MTU6MDAnKVxuICAgICAgICBsb2NrTWF0Y2hDb250YWluZXIoRklSU1RfTUFUQ0hfREFURSwgMSk7XG4gICAgICAgIHBsYWNlQmV0QnRuLmNsYXNzTGlzdC5hZGQoXCJfbG9ja1wiKVxuICAgICAgICBjb25zb2xlLmxvZyhcImxvY2sgdGFibGVcIilcbiAgICB9KTtcblxuICAgIHVzZXJJZCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJ1c2VySWRcIikgPz8gbnVsbFxuICAgIFxuICAgIHVwZGF0ZVRvcEZvcmVjYXN0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3VwZGF0ZVRvcEZvcmVjYXN0cyDQstC40LzQutC90LXQvdC+INC00LvRjyDRgtC10YHRgtGDJyk7XG4gICAgfVxuXG4gICAgcmVuZGVyVXNlcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdyZW5kZXJVc2VycyDQstC40LzQutC90LXQvdC+INC00LvRjyDRgtC10YHRgtGDJyk7XG4gICAgfVxuXG4gICAgcG9wdWxhdGVVc2Vyc1RhYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZygncG9wdWxhdGVVc2Vyc1RhYmxlINCy0LjQvNC60L3QtdC90L4g0LTQu9GPINGC0LXRgdGC0YMnKTtcbiAgICB9XG5cbiAgICBkaXNwbGF5VXNlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2Rpc3BsYXlVc2VyINCy0LjQvNC60L3QtdC90L4g0LTQu9GPINGC0LXRgdGC0YMnKTtcbiAgICB9XG4gICAgc2hvd1RvcEZvcmVjYXN0ID0gdHJ1ZVxufSkoKVxuXG4iXX0=
