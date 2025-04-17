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
  var initJs = false;
  if (initJs) {
    return;
  }
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
    initClickTracking();
    if (!currentBet) {
      currentBet = new Bet(userId, matchNumber);
    }
    if (window.store) {
      var state = window.store.getState();
      userId = state.auth.isAuthorized && state.auth.id || '';
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
      topForecast.classList.remove("hide");
      document.querySelector('.predict__container.score-1').classList.add('active');
      document.querySelector('.predict__tabs-txt-2').classList.add('hide');
      document.querySelector('.predict__tabs-txt-1').classList.remove('hide');
    } else if (isGoalTabActive) {
      topForecast.classList.add("hide");
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
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.predict__team-increase, .predict__team-decrease');
    if (!btn) return;
    console.log(btn);
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
  });
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiaW5pdEpzIiwiYXBpVVJMIiwidW5hdXRoTXNncyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsInlvdUFyZUluQnRucyIsIm1haW5QYWdlIiwicXVlcnlTZWxlY3RvciIsInJlc3VsdHNUYWJsZSIsInJlc3VsdHNUYWJsZU90aGVyIiwicGxhY2VCZXRCdG4iLCJsYXN0UHJlZGljdCIsInRvcEZvcmVjYXN0IiwiY3VycmVudFRhYiIsImN1cnJlbnRUYWJUYWJsZSIsIm1hdGNoTnVtYmVyIiwic2hvd1RvcEZvcmVjYXN0IiwiRklSU1RfTUFUQ0hfREFURSIsIkRhdGUiLCJjdXJyZW50RGF0ZSIsImxvY2tNYXRjaENvbnRhaW5lciIsIm1hdGNoRGF0ZSIsImNvbnRhaW5lcnMiLCJmb3JFYWNoIiwiY29udGFpbmVyIiwiY2xhc3NMaXN0IiwiYWRkIiwic2V0SW50ZXJ2YWwiLCJCZXQiLCJ1c2VySWQiLCJ0ZWFtMUdvYWxzIiwidGVhbTJHb2FscyIsImZpcnN0R29hbCIsInVzZXJpZCIsInRlYW0xIiwidGVhbTIiLCJ1bmRlZmluZWQiLCJnb2Fsc1VwZGF0ZWQiLCJmaXJzdEdvYWxVcGRhdGVkIiwiY2FjaGUiLCJwcmVkaWN0RGF0YSIsInRyYW5zbGF0ZVN0YXRlIiwiZGVidWciLCJsb2NhbGUiLCJzZXNzaW9uU3RvcmFnZSIsImdldEl0ZW0iLCJ1a0xlbmciLCJlbkxlbmciLCJpMThuRGF0YSIsImN1cnJlbnRCZXQiLCJyZXF1ZXN0IiwibGluayIsImV4dHJhT3B0aW9ucyIsImZldGNoIiwiaGVhZGVycyIsInRoZW4iLCJyZXMiLCJvayIsIkVycm9yIiwianNvbiIsImVyciIsImNvbnNvbGUiLCJlcnJvciIsInJlcG9ydEVycm9yIiwic3R5bGUiLCJkaXNwbGF5Iiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwic3RhcnRzV2l0aCIsIlByb21pc2UiLCJyZWplY3QiLCJyZXBvcnREYXRhIiwib3JpZ2luIiwiZXJyb3JUZXh0IiwidGV4dCIsIm1lc3NhZ2UiLCJ0eXBlIiwibmFtZSIsInN0YWNrIiwibWV0aG9kIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJ3YXJuIiwiZ2V0TGFzdEJldCIsImJldHMiLCJmaW5kIiwiYmV0IiwicmVmcmVzaEJldEluZm8iLCJzY29yZTEiLCJzY29yZTIiLCJnb2FsMSIsImdvYWwyIiwiZGF0YSIsImJldEF2YWlsYWJsZSIsInNvbWUiLCJsYXN0VGVhbTEiLCJsYXN0VGVhbTIiLCJzY29yZVRlYW0xIiwic2NvcmVUZWFtMiIsInJlbW92ZSIsImxhc3RCZXQiLCJ0ZXh0Q29udGVudCIsImJldENvbmZpcm1lZCIsIml0ZW0iLCJzZXRBdHRyaWJ1dGUiLCJ0cmFuc2xhdGUiLCJjb250YWlucyIsIkluaXRQYWdlIiwiY2hlY2tVc2VyQXV0aCIsInJlbmRlclVzZXJzIiwidXBkYXRlVG9wRm9yZWNhc3RzIiwieW91QXJlSW5CdG4iLCJ1bmF1dGhNZXMiLCJwbGFjZUJldCIsImxvZyIsImJ0biIsInNjb3JlSW5pdCIsImFjdGl2ZVRhYnMiLCJyZXEiLCJ0YWIiLCJhY3RpdmVJbnB1dCIsInZhbHVlIiwic2V0SXRlbSIsImxvYWRUcmFuc2xhdGlvbnMiLCJtdXRhdGlvbk9ic2VydmVyIiwiTXV0YXRpb25PYnNlcnZlciIsIm11dGF0aW9ucyIsIm9ic2VydmUiLCJnZXRFbGVtZW50QnlJZCIsImNoaWxkTGlzdCIsInN1YnRyZWUiLCJlbGVtcyIsImVsZW0iLCJrZXkiLCJnZXRBdHRyaWJ1dGUiLCJpbm5lckhUTUwiLCJyZW1vdmVBdHRyaWJ1dGUiLCJyZWZyZXNoTG9jYWxpemVkQ2xhc3MiLCJlbGVtZW50IiwibGFuZyIsImluaXQiLCJpbml0Q2xpY2tUcmFja2luZyIsInN0b3JlIiwic3RhdGUiLCJnZXRTdGF0ZSIsImF1dGgiLCJpc0F1dGhvcml6ZWQiLCJpZCIsImMiLCJpIiwiZ191c2VyX2lkIiwiY2xlYXJJbnRlcnZhbCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwicHJldmVudERlZmF1bHQiLCJ1cGRhdGVTY29yZSIsInVwZGF0ZUdvYWxzIiwidXBkYXRlRmlyc3RHb2FsIiwiZm9yZWNhc3RzQ29udGFpbmVyIiwidG9wRm9yZWNhc3RzIiwiZm9yZWNhc3QiLCJmb3JlY2FzdEl0ZW0iLCJjcmVhdGVFbGVtZW50IiwicGVyY2VudGFnZSIsInBhcnNlRmxvYXQiLCJ0b0ZpeGVkIiwicGVyY2VudGFnZVNwYW4iLCJmb3JlY2FzdFRleHQiLCJjcmVhdGVUZXh0Tm9kZSIsImFwcGVuZENoaWxkIiwidXNlcnMiLCJpc1Njb3JlVGFiQWN0aXZlIiwiaXNHb2FsVGFiQWN0aXZlIiwibGVuZ3RoIiwicG9wdWxhdGVVc2Vyc1RhYmxlIiwiY3VycmVudFVzZXJJZCIsImN1cnJlbnRVc2VyIiwidXNlciIsImRpc3BsYXlVc2VyIiwiaXNDdXJyZW50VXNlciIsInRhYmxlIiwiYWxsVXNlcnMiLCJhZGRpdGlvbmFsVXNlclJvdyIsIm1hc2tVc2VySWQiLCJ3aW5uZXIiLCJib251c0ZpcnN0R29hbCIsInlvdUJsb2NrIiwiaW5zZXJ0QmVmb3JlIiwiY2hpbGRyZW4iLCJhcHBlbmQiLCJ0b1N0cmluZyIsInNsaWNlIiwiY2FyZHMiLCJhbmdsZSIsImFuaW1hdGVDYXJkcyIsInJvdGF0ZVgiLCJNYXRoIiwic2luIiwiUEkiLCJyb3RhdGVZIiwiY29zIiwiY2FyZCIsInRyYW5zZm9ybSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInRhYnMiLCJoYW5kbGVUYWJDbGljayIsImV2ZW50IiwiY3VycmVudE1hdGNoIiwiY2xpY2tlZFRhYiIsInRhcmdldCIsImNsb3Nlc3QiLCJ0YWJQYWlyIiwicGFpciIsInVwZGF0ZUNvbnRhaW5lcnMiLCJzY29yZSIsImJ1dHRvbiIsImNoZWNrZWQiLCJ0ZWFtQ29udHJvbCIsInRlYW1OdW1iZXIiLCJtYXRjaENvbnRhaW5lciIsInBhcnNlSW50IiwiZGF0YXNldCIsImdldEdvYWxzIiwidGVhbSIsIk51bWJlciIsInNldFBvcHVwcyIsInRyaWdnZXJCdXR0b25zIiwicG9wdXBDbGFzcyIsInBvcHVwc0NvbnRhaW5lciIsInBvcHVwIiwicG9wdXBCdG4iLCJ0cmlnZ2VyQnV0dG9uIiwib3ZlcmZsb3ciLCJjbG9zZUJ1dHRvbiIsImJ0bkNsb3NlIiwiY2xvc2VQb3B1cCIsInRhcmdldEVsZW1lbnQiLCJ0YXJnZXRQb3NpdGlvbiIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInRvcCIsInBhZ2VZT2Zmc2V0Iiwic2Nyb2xsVG8iLCJiZWhhdmlvciIsInJhZGlvQ29udGFpbmVycyIsInJhZGlvSW5wdXRzIiwicmFkaW8iLCJjbGlja1N0YXRzIiwicGFyc2UiLCJjbGlja1RyYWNraW5nIiwiY2xpY2tOYW1lIiwiY3VycmVudFRhcmdldCIsImNsaWNrRHJvcCIsImlzQXV0aCIsImV4aXN0aW5nSXRlbSIsImNsaWNrZWRJdGVtIiwiY291bnRlciIsInB1c2giLCJjbGlja2FibGVFbGVtZW50cyIsImVsIiwic2VuZENsaWNrU3RhdHMiLCJzdG9yZWRTdGF0cyIsInJlc3BvbnNlIiwicmVtb3ZlSXRlbSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxDQUFDLFlBQVk7RUFBQTtFQUVULElBQUlBLE1BQU0sR0FBSSxLQUFLO0VBRW5CLElBQUlBLE1BQU0sRUFBRTtJQUNSO0VBQ0o7RUFFQSxJQUFNQyxNQUFNLEdBQUcsNENBQTRDO0lBQ3ZEQyxVQUFVLEdBQUdDLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMsYUFBYSxDQUFDO0lBQ3JEQyxZQUFZLEdBQUdGLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMsWUFBWSxDQUFDO0lBQ3RERSxRQUFRLEdBQUdILFFBQVEsQ0FBQ0ksYUFBYSxDQUFDLFdBQVcsQ0FBQztJQUM5Q0MsWUFBWSxHQUFHTCxRQUFRLENBQUNJLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQztJQUN2REUsaUJBQWlCLEdBQUdOLFFBQVEsQ0FBQ0ksYUFBYSxDQUFDLHNCQUFzQixDQUFDO0lBQ2xFRyxXQUFXLEdBQUdQLFFBQVEsQ0FBQ0ksYUFBYSxDQUFDLGNBQWMsQ0FBQztJQUNwREksV0FBVyxHQUFHUixRQUFRLENBQUNJLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQztJQUN0REssV0FBVyxHQUFHVCxRQUFRLENBQUNJLGFBQWEsQ0FBQyxjQUFjLENBQUM7RUFFeEQsSUFBSU0sVUFBVSxHQUFHLENBQUM7RUFDbEIsSUFBSUMsZUFBZSxHQUFHLENBQUM7RUFDdkIsSUFBSUMsV0FBVyxHQUFHLENBQUM7RUFDbkIsSUFBSUMsZUFBZSxHQUFHLEtBQUs7O0VBRTNCO0VBQ0EsSUFBTUMsZ0JBQWdCLEdBQUcsSUFBSUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEVBQUM7RUFDekQsSUFBTUMsV0FBVyxHQUFHLElBQUlELElBQUksRUFBRTtFQUU5QixTQUFTRSxrQkFBa0IsQ0FBQ0MsU0FBUyxFQUFFTixXQUFXLEVBQUU7SUFDaEQsSUFBSSxJQUFJRyxJQUFJLEVBQUUsR0FBR0csU0FBUyxFQUFFO01BQ3hCLElBQU1DLFdBQVUsR0FBR25CLFFBQVEsQ0FBQ0MsZ0JBQWdCLG1EQUEyQ1csV0FBVyxTQUFLO01BRXZHTyxXQUFVLENBQUNDLE9BQU8sQ0FBQyxVQUFBQyxTQUFTLEVBQUk7UUFDNUJBLFNBQVMsQ0FBQ0MsU0FBUyxDQUFDQyxHQUFHLENBQUMsT0FBTyxDQUFDO01BQ3BDLENBQUMsQ0FBQztNQUVGaEIsV0FBVyxDQUFDZSxTQUFTLENBQUNDLEdBQUcsQ0FBQyxPQUFPLENBQUM7SUFDdEM7RUFDSjtFQUVBTixrQkFBa0IsQ0FBQ0gsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7RUFFekNVLFdBQVcsQ0FBQyxZQUFNO0lBQ2QsSUFBTVIsV0FBVyxHQUFHLElBQUlELElBQUksRUFBRSxDQUFDLENBQUM7SUFDaENFLGtCQUFrQixDQUFDSCxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7RUFDM0MsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7RUFBQSxJQUVOVyxHQUFHO0lBQ0wsYUFBWUMsTUFBTSxFQUFFZCxXQUFXLEVBQTZDO01BQUEsSUFBM0NlLFVBQVUsdUVBQUcsQ0FBQztNQUFBLElBQUVDLFVBQVUsdUVBQUcsQ0FBQztNQUFBLElBQUVDLFNBQVM7TUFBQTtNQUN0RSxJQUFHSCxNQUFNLEtBQUssSUFBSSxFQUFFLElBQUksQ0FBQ0ksTUFBTSxHQUFHSixNQUFNO01BQ3hDLElBQUksQ0FBQ2QsV0FBVyxHQUFHQSxXQUFXO01BQzlCLElBQUksQ0FBQ21CLEtBQUssR0FBR0osVUFBVTtNQUN2QixJQUFJLENBQUNLLEtBQUssR0FBR0osVUFBVTtNQUN2QixJQUFHQyxTQUFTLEtBQUtJLFNBQVMsRUFBRSxJQUFJLENBQUNKLFNBQVMsR0FBR0EsU0FBUztJQUMxRDtJQUFDO01BQUE7TUFBQSxPQUVELHFCQUFZRixVQUFVLEVBQUVDLFVBQVUsRUFBRTtRQUNoQyxJQUFJRCxVQUFVLEtBQUtNLFNBQVMsRUFBRTtVQUMxQixJQUFJLENBQUNGLEtBQUssR0FBR0osVUFBVSxLQUFLLElBQUksR0FBR0EsVUFBVSxHQUFHLElBQUksQ0FBQ0ksS0FBSztRQUM5RDtRQUNBLElBQUlILFVBQVUsS0FBS0ssU0FBUyxFQUFFO1VBQzFCLElBQUksQ0FBQ0QsS0FBSyxHQUFHSixVQUFVLEtBQUssSUFBSSxHQUFHQSxVQUFVLEdBQUcsSUFBSSxDQUFDSSxLQUFLO1FBQzlEO1FBQ0EsSUFBSSxDQUFDRSxZQUFZLEdBQUcsSUFBSTtNQUM1QjtJQUFDO01BQUE7TUFBQSxPQUVELHlCQUFnQkwsU0FBUyxFQUFFO1FBQ3ZCLElBQUlBLFNBQVMsS0FBS0ksU0FBUyxFQUFFO1VBQ3pCLElBQUksQ0FBQ0osU0FBUyxHQUFHQSxTQUFTLEtBQUssSUFBSSxHQUFHQSxTQUFTLEdBQUcsSUFBSSxDQUFDQSxTQUFTO1FBQ3BFO1FBQ0EsSUFBSSxDQUFDTSxnQkFBZ0IsR0FBRyxJQUFJO01BQ2hDO0lBQUM7SUFBQTtFQUFBO0VBR0wsSUFBTUMsS0FBSyxHQUFHLENBQUMsQ0FBQztFQUNoQixJQUFJQyxXQUFXLEdBQUcsRUFBRTtFQUVwQixJQUFJQyxjQUFjLEdBQUcsSUFBSTtFQUN6QixJQUFJQyxLQUFLLEdBQUcsS0FBSztFQUVqQixJQUFJQyxNQUFNLDRCQUFHQyxjQUFjLENBQUNDLE9BQU8sQ0FBQyxRQUFRLENBQUMseUVBQUksSUFBSTtFQUNyRDtFQUNBOztFQUdBLElBQU1DLE1BQU0sR0FBRzNDLFFBQVEsQ0FBQ0ksYUFBYSxDQUFDLFNBQVMsQ0FBQztFQUNoRCxJQUFNd0MsTUFBTSxHQUFHNUMsUUFBUSxDQUFDSSxhQUFhLENBQUMsU0FBUyxDQUFDO0VBR2hELElBQUl5QyxRQUFRLEdBQUcsQ0FBQyxDQUFDO0VBRWpCLElBQUluQixNQUFNO0VBQ1Y7O0VBRUEsSUFBSW9CLFVBQVU7RUFFZCxJQUFJSCxNQUFNLEVBQUVILE1BQU0sR0FBRyxJQUFJO0VBQ3pCLElBQUlJLE1BQU0sRUFBRUosTUFBTSxHQUFHLElBQUk7RUFFekIsSUFBTU8sT0FBTyxHQUFHLFNBQVZBLE9BQU8sQ0FBSUMsSUFBSSxFQUFFQyxZQUFZO0lBQUEsT0FDL0JDLEtBQUssQ0FBQ3BELE1BQU0sR0FBR2tELElBQUk7TUFDZkcsT0FBTyxFQUFFO1FBQ0wsUUFBUSxFQUFFLGtCQUFrQjtRQUM1QixjQUFjLEVBQUU7TUFDcEI7SUFBQyxHQUNHRixZQUFZLElBQUksQ0FBQyxDQUFDLEVBQ3hCLENBQ0dHLElBQUksQ0FBQyxVQUFBQyxHQUFHLEVBQUk7TUFDVCxJQUFJLENBQUNBLEdBQUcsQ0FBQ0MsRUFBRSxFQUFFLE1BQU0sSUFBSUMsS0FBSyxDQUFDLFdBQVcsQ0FBQztNQUN6QyxPQUFPRixHQUFHLENBQUNHLElBQUksRUFBRTtJQUNyQixDQUFDLENBQUMsU0FDSSxDQUFDLFVBQUFDLEdBQUcsRUFBSTtNQUNWQyxPQUFPLENBQUNDLEtBQUssQ0FBQyxxQkFBcUIsRUFBRUYsR0FBRyxDQUFDO01BRXpDRyxXQUFXLENBQUNILEdBQUcsQ0FBQztNQUVoQnpELFFBQVEsQ0FBQ0ksYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDeUQsS0FBSyxDQUFDQyxPQUFPLEdBQUcsTUFBTTtNQUMxRCxJQUFJQyxNQUFNLENBQUNDLFFBQVEsQ0FBQ0MsSUFBSSxDQUFDQyxVQUFVLENBQUMsd0JBQXdCLENBQUMsRUFBRTtRQUMzREgsTUFBTSxDQUFDQyxRQUFRLENBQUNDLElBQUksR0FBRyw0QkFBNEI7TUFDdkQsQ0FBQyxNQUFNO1FBQ0hGLE1BQU0sQ0FBQ0MsUUFBUSxDQUFDQyxJQUFJLEdBQUcscUJBQXFCO01BQ2hEO01BRUEsT0FBT0UsT0FBTyxDQUFDQyxNQUFNLENBQUNYLEdBQUcsQ0FBQztJQUM5QixDQUFDLENBQUM7RUFBQTtFQUVWLFNBQVNHLFdBQVcsQ0FBQ0gsR0FBRyxFQUFFO0lBQ3RCLElBQU1ZLFVBQVUsR0FBRztNQUNmQyxNQUFNLEVBQUVQLE1BQU0sQ0FBQ0MsUUFBUSxDQUFDQyxJQUFJO01BQzVCbkMsTUFBTSxFQUFFSixNQUFNO01BQ2Q2QyxTQUFTLEVBQUUsQ0FBQWQsR0FBRyxhQUFIQSxHQUFHLHVCQUFIQSxHQUFHLENBQUVFLEtBQUssTUFBSUYsR0FBRyxhQUFIQSxHQUFHLHVCQUFIQSxHQUFHLENBQUVlLElBQUksTUFBSWYsR0FBRyxhQUFIQSxHQUFHLHVCQUFIQSxHQUFHLENBQUVnQixPQUFPLEtBQUksZUFBZTtNQUNyRUMsSUFBSSxFQUFFLENBQUFqQixHQUFHLGFBQUhBLEdBQUcsdUJBQUhBLEdBQUcsQ0FBRWtCLElBQUksS0FBSSxjQUFjO01BQ2pDQyxLQUFLLEVBQUUsQ0FBQW5CLEdBQUcsYUFBSEEsR0FBRyx1QkFBSEEsR0FBRyxDQUFFbUIsS0FBSyxLQUFJO0lBQ3pCLENBQUM7SUFFRDFCLEtBQUssQ0FBQywwQ0FBMEMsRUFBRTtNQUM5QzJCLE1BQU0sRUFBRSxNQUFNO01BQ2QxQixPQUFPLEVBQUU7UUFDTCxjQUFjLEVBQUU7TUFDcEIsQ0FBQztNQUNEMkIsSUFBSSxFQUFFQyxJQUFJLENBQUNDLFNBQVMsQ0FBQ1gsVUFBVTtJQUNuQyxDQUFDLENBQUMsU0FBTSxDQUFDWCxPQUFPLENBQUN1QixJQUFJLENBQUM7RUFDMUI7RUFFQSxJQUFNQyxVQUFVLEdBQUcsU0FBYkEsVUFBVSxDQUFJQyxJQUFJLEVBQUV2RSxXQUFXLEVBQUk7SUFDckMsSUFBRyxDQUFDdUUsSUFBSSxFQUFFLE9BQU8sS0FBSztJQUN0QixPQUFPQSxJQUFJLENBQUNDLElBQUksQ0FBQyxVQUFBQyxHQUFHO01BQUEsT0FBSUEsR0FBRyxDQUFDekUsV0FBVyxLQUFLQSxXQUFXO0lBQUEsRUFBQztFQUM1RCxDQUFDO0VBRUQsU0FBUzBFLGNBQWMsQ0FBQzVELE1BQU0sRUFBRTtJQUM1QixJQUFNNkQsTUFBTSxHQUFHdkYsUUFBUSxDQUFDSSxhQUFhLENBQUMsVUFBVSxDQUFDO0lBQ2pELElBQU1vRixNQUFNLEdBQUd4RixRQUFRLENBQUNJLGFBQWEsQ0FBQyxVQUFVLENBQUM7SUFDakQsSUFBTXFGLEtBQUssR0FBR3pGLFFBQVEsQ0FBQ0ksYUFBYSxDQUFDLFNBQVMsQ0FBQztJQUMvQyxJQUFNc0YsS0FBSyxHQUFHMUYsUUFBUSxDQUFDSSxhQUFhLENBQUMsU0FBUyxDQUFDOztJQUUvQzs7SUFFQTJDLE9BQU8sb0JBQWFyQixNQUFNLEdBQUk7TUFDMUJtRCxNQUFNLEVBQUU7SUFDWixDQUFDLENBQUMsQ0FBQ3pCLElBQUksQ0FBQyxVQUFBdUMsSUFBSSxFQUFJO01BQ1osSUFBR0EsSUFBSSxDQUFDUixJQUFJLEVBQUM7UUFDVCxJQUFNUyxZQUFZLEdBQUdELElBQUksQ0FBQ1IsSUFBSSxDQUFDVSxJQUFJLENBQUMsVUFBQVIsR0FBRyxFQUFHO1VBQ3RDLE9BQU9BLEdBQUcsQ0FBQ3pFLFdBQVcsS0FBS0EsV0FBVztRQUMxQyxDQUFDLENBQUM7UUFDRjtRQUNBLElBQU1rRixTQUFTLEdBQUc5RixRQUFRLENBQUNJLGFBQWEsQ0FBQywyQkFBMkIsQ0FBQztRQUNyRSxJQUFNMkYsU0FBUyxHQUFHL0YsUUFBUSxDQUFDSSxhQUFhLENBQUMsMkJBQTJCLENBQUM7UUFDckUsSUFBTTRGLFVBQVUsR0FBR2hHLFFBQVEsQ0FBQ0ksYUFBYSxDQUFDLGFBQWEsQ0FBQztRQUN4RCxJQUFNNkYsVUFBVSxHQUFHakcsUUFBUSxDQUFDSSxhQUFhLENBQUMsYUFBYSxDQUFDO1FBQ3hELElBQU15QixTQUFTLEdBQUc3QixRQUFRLENBQUNJLGFBQWEsQ0FBQyx3QkFBd0IsQ0FBQztRQUNsRSxJQUFHd0YsWUFBWSxFQUFDO1VBQ1pwRixXQUFXLENBQUNjLFNBQVMsQ0FBQzRFLE1BQU0sQ0FBQyxNQUFNLENBQUM7VUFDcEMsSUFBTUMsT0FBTyxHQUFHakIsVUFBVSxDQUFDUyxJQUFJLENBQUNSLElBQUksRUFBRXZFLFdBQVcsQ0FBQztVQUNsRG9GLFVBQVUsQ0FBQ0ksV0FBVyxHQUFHRCxPQUFPLENBQUNwRSxLQUFLLEtBQUtFLFNBQVMsR0FBRyxHQUFHLGFBQUtrRSxPQUFPLENBQUNwRSxLQUFLLENBQUU7VUFDOUVrRSxVQUFVLENBQUNHLFdBQVcsR0FBR0QsT0FBTyxDQUFDbkUsS0FBSyxLQUFLQyxTQUFTLEdBQUcsR0FBRyxhQUFLa0UsT0FBTyxDQUFDbkUsS0FBSyxDQUFFO1VBQzlFOztVQUVBLElBQUltRSxPQUFPLENBQUNFLFlBQVksRUFBRTtZQUN0QnJHLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMsbUNBQW1DLENBQUMsQ0FBQ21CLE9BQU8sQ0FBQyxVQUFBa0YsSUFBSSxFQUFHO2NBQzFFQSxJQUFJLENBQUNoRixTQUFTLENBQUM0RSxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQ25DLENBQUMsQ0FBQztZQUNGbEcsUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDbUIsT0FBTyxDQUFDLFVBQUFrRixJQUFJLEVBQUc7Y0FDeEVBLElBQUksQ0FBQ2hGLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFFBQVEsQ0FBQztZQUNoQyxDQUFDLENBQUM7VUFDTixDQUFDLE1BQU07WUFDSHZCLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMsbUNBQW1DLENBQUMsQ0FBQ21CLE9BQU8sQ0FBQyxVQUFBa0YsSUFBSSxFQUFHO2NBQzFFQSxJQUFJLENBQUNoRixTQUFTLENBQUNDLEdBQUcsQ0FBQyxRQUFRLENBQUM7WUFDaEMsQ0FBQyxDQUFDO1lBQ0Z2QixRQUFRLENBQUNDLGdCQUFnQixDQUFDLGlDQUFpQyxDQUFDLENBQUNtQixPQUFPLENBQUMsVUFBQWtGLElBQUksRUFBRztjQUN4RUEsSUFBSSxDQUFDaEYsU0FBUyxDQUFDNEUsTUFBTSxDQUFDLFFBQVEsQ0FBQztZQUNuQyxDQUFDLENBQUM7VUFDTjtVQUVBLElBQUlDLE9BQU8sQ0FBQ3ZGLFdBQVcsS0FBSyxDQUFDLEVBQUU7WUFDM0JrRixTQUFTLENBQUNTLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRSxVQUFVLENBQUM7WUFDcERSLFNBQVMsQ0FBQ1EsWUFBWSxDQUFDLGdCQUFnQixFQUFFLFFBQVEsQ0FBQztZQUNsREMsU0FBUyxFQUFFO1VBQ2Y7VUFFQSxJQUFHakIsTUFBTSxDQUFDakUsU0FBUyxDQUFDbUYsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFDO1lBQ25DekcsUUFBUSxDQUFDSSxhQUFhLENBQUMsc0JBQXNCLENBQUMsQ0FBQ2tCLFNBQVMsQ0FBQzRFLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDdkVsRyxRQUFRLENBQUNJLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDa0IsU0FBUyxDQUFDQyxHQUFHLENBQUMsTUFBTSxDQUFDO1VBQ3ZFO1VBRUEsSUFBR2tFLEtBQUssQ0FBQ25FLFNBQVMsQ0FBQ21GLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBQztZQUNsQ3pHLFFBQVEsQ0FBQ0ksYUFBYSxDQUFDLHNCQUFzQixDQUFDLENBQUNrQixTQUFTLENBQUNDLEdBQUcsQ0FBQyxNQUFNLENBQUM7WUFDcEV2QixRQUFRLENBQUNJLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDa0IsU0FBUyxDQUFDNEUsTUFBTSxDQUFDLE1BQU0sQ0FBQztVQUMxRTtVQUVBLElBQUdDLE9BQU8sQ0FBQ3RFLFNBQVMsRUFBQztZQUNqQixJQUFHc0UsT0FBTyxDQUFDdEUsU0FBUyxLQUFLLFVBQVUsRUFBQztjQUNoQ0EsU0FBUyxDQUFDMEUsWUFBWSxDQUFDLGdCQUFnQixFQUFFLFVBQVUsQ0FBQztZQUN4RDtZQUNBLElBQUdKLE9BQU8sQ0FBQ3RFLFNBQVMsS0FBSyxRQUFRLEVBQUM7Y0FDOUJBLFNBQVMsQ0FBQzBFLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRSxRQUFRLENBQUM7WUFDdEQ7WUFDQSxJQUFHSixPQUFPLENBQUN0RSxTQUFTLEtBQUssTUFBTSxFQUFDO2NBQzVCQSxTQUFTLENBQUMwRSxZQUFZLENBQUMsZ0JBQWdCLEVBQUUsTUFBTSxDQUFDO1lBQ3BEO1VBRUosQ0FBQyxNQUFJO1lBQ0QsSUFBR2QsS0FBSyxDQUFDbkUsU0FBUyxDQUFDbUYsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJZixLQUFLLENBQUNwRSxTQUFTLENBQUNtRixRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUM7Y0FDeEV6RyxRQUFRLENBQUNJLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDa0IsU0FBUyxDQUFDQyxHQUFHLENBQUMsTUFBTSxDQUFDO1lBQ2xFO1VBQ0o7UUFFSjtRQUNBLElBQUcsQ0FBQ3FFLFlBQVksRUFBQztVQUNicEYsV0FBVyxDQUFDYyxTQUFTLENBQUNDLEdBQUcsQ0FBQyxNQUFNLENBQUM7UUFDckM7TUFDSixDQUFDLE1BQUk7UUFDRGYsV0FBVyxDQUFDYyxTQUFTLENBQUNDLEdBQUcsQ0FBQyxNQUFNLENBQUM7TUFDckM7SUFDSixDQUFDLENBQUMsU0FBTSxDQUFDLFVBQUFvQyxLQUFLLEVBQUk7TUFDZEQsT0FBTyxDQUFDQyxLQUFLLENBQUMsUUFBUSxFQUFFQSxLQUFLLENBQUM7SUFDbEMsQ0FBQyxDQUFDO0VBQ047RUFDQSxJQUFNK0MsUUFBUSxHQUFHLFNBQVhBLFFBQVEsR0FBUztJQUNuQkMsYUFBYSxFQUFFO0lBQ2ZDLFdBQVcsRUFBRTtJQUNiQyxrQkFBa0IsQ0FBQ25HLFVBQVUsQ0FBQztJQUM5QjRFLGNBQWMsQ0FBQzVELE1BQU0sQ0FBQztFQUMxQixDQUFDO0VBRUQsSUFBSWlGLGFBQWEsR0FBRyxTQUFoQkEsYUFBYSxHQUFTO0lBQ3RCLElBQUlqRixNQUFNLEVBQUU7TUFDUnhCLFlBQVksQ0FBQ2tCLE9BQU8sQ0FBQyxVQUFBa0YsSUFBSTtRQUFBLE9BQUlBLElBQUksQ0FBQ2hGLFNBQVMsQ0FBQzRFLE1BQU0sQ0FBQyxNQUFNLENBQUM7TUFBQSxFQUFDO01BQzNEbkcsVUFBVSxDQUFDcUIsT0FBTyxDQUFDLFVBQUFrRixJQUFJO1FBQUEsT0FBSUEsSUFBSSxDQUFDaEYsU0FBUyxDQUFDQyxHQUFHLENBQUMsTUFBTSxDQUFDO01BQUEsRUFBQztJQUMxRCxDQUFDLE1BQU07TUFBQSwyQ0FDcUJyQixZQUFZO1FBQUE7TUFBQTtRQUFwQyxvREFBc0M7VUFBQSxJQUE3QjRHLFdBQVc7VUFDaEJBLFdBQVcsQ0FBQ3hGLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLE1BQU0sQ0FBQztRQUNyQztNQUFDO1FBQUE7TUFBQTtRQUFBO01BQUE7TUFBQSw0Q0FDdUJ4QixVQUFVO1FBQUE7TUFBQTtRQUFsQyx1REFBb0M7VUFBQSxJQUF6QmdILFNBQVM7VUFDaEJBLFNBQVMsQ0FBQ3pGLFNBQVMsQ0FBQzRFLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDdEM7TUFBQztRQUFBO01BQUE7UUFBQTtNQUFBO0lBQ0w7RUFDSixDQUFDO0VBQ0QsU0FBU2MsUUFBUSxDQUFDM0IsR0FBRyxFQUFFO0lBQ25CLElBQUksQ0FBQzNELE1BQU0sRUFBRTtNQUNUO0lBQ0o7SUFDQWdDLE9BQU8sQ0FBQ3VELEdBQUcsQ0FBQzVCLEdBQUcsQ0FBQztJQUVoQnJGLFFBQVEsQ0FBQ0ksYUFBYSxDQUFDLDRCQUE0QixDQUFDLENBQy9DSCxnQkFBZ0IsQ0FBQyxrREFBa0QsQ0FBQyxDQUNwRW1CLE9BQU8sQ0FBQyxVQUFBOEYsR0FBRyxFQUFJO01BQ1pDLFNBQVMsQ0FBQ0QsR0FBRyxDQUFDO0lBQ2xCLENBQUMsQ0FBQztJQUVOLElBQU1FLFVBQVUsR0FBR3BILFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMsV0FBVyxDQUFDO0lBQ3pEOztJQUlBLElBQUlvSCxHQUFHLEdBQUc7TUFDTnpHLFdBQVcsRUFBRXlFLEdBQUcsQ0FBQ3pFLFdBQVc7TUFDNUJrQixNQUFNLEVBQUV1RCxHQUFHLENBQUN2RDtJQUNoQixDQUFDOztJQUdEO0lBQUEsNENBQ2tCc0YsVUFBVTtNQUFBO0lBQUE7TUFBNUIsdURBQThCO1FBQUEsSUFBbkJFLEdBQUc7UUFDVixJQUFJQSxHQUFHLENBQUNoRyxTQUFTLENBQUNtRixRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7VUFDbEMsSUFBTWMsV0FBVyxHQUFHRCxHQUFHLENBQUNsSCxhQUFhLENBQUMsb0NBQW9DLENBQUM7VUFDM0U7O1VBRUEsSUFBSW1ILFdBQVcsRUFBRTtZQUNiO1lBQ0FGLEdBQUcsQ0FBQ3hGLFNBQVMsR0FBRzBGLFdBQVcsQ0FBQ0MsS0FBSztZQUNqQztVQUNKO1FBQ0o7TUFDSjtJQUFDO01BQUE7SUFBQTtNQUFBO0lBQUE7SUFJRCxJQUFJbkMsR0FBRyxDQUFDbEQsZ0JBQWdCLEVBQUU7TUFDdEI7TUFDQWtGLEdBQUcsQ0FBQ3hGLFNBQVMsR0FBR3dELEdBQUcsQ0FBQ3hELFNBQVM7SUFFakM7SUFFQSxJQUFJd0QsR0FBRyxDQUFDbkQsWUFBWSxFQUFFO01BQ2xCbUYsR0FBRyxDQUFDdEYsS0FBSyxHQUFHc0QsR0FBRyxDQUFDdEQsS0FBSztNQUNyQnNGLEdBQUcsQ0FBQ3JGLEtBQUssR0FBR3FELEdBQUcsQ0FBQ3JELEtBQUs7SUFDekI7O0lBSUE7SUFDQTs7SUFHQVMsY0FBYyxDQUFDZ0YsT0FBTyxDQUFDLFlBQVksRUFBRTFDLElBQUksQ0FBQ0MsU0FBUyxDQUFDcUMsR0FBRyxDQUFDLENBQUM7SUFFekQzRCxPQUFPLENBQUN1RCxHQUFHLENBQUN4RSxjQUFjLENBQUNDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUVqREssT0FBTyxDQUFDLE1BQU0sRUFBRTtNQUNaOEIsTUFBTSxFQUFFLE1BQU07TUFDZEMsSUFBSSxFQUFFckMsY0FBYyxDQUFDQyxPQUFPLENBQUMsWUFBWTtJQUM3QyxDQUFDLENBQUMsQ0FDR1UsSUFBSSxDQUFDLFVBQUFDLEdBQUcsRUFBSTtNQUNUO01BQ0FxRCxRQUFRLEVBQUU7SUFDZCxDQUFDLENBQUMsU0FDSSxDQUFDLFVBQUEvQyxLQUFLO01BQUEsT0FBSUQsT0FBTyxDQUFDQyxLQUFLLENBQUMsb0JBQW9CLEVBQUVBLEtBQUssQ0FBQztJQUFBLEVBQUM7RUFDbkU7RUFFQSxTQUFTK0QsZ0JBQWdCLEdBQUc7SUFDeEIsT0FBT3hFLEtBQUssV0FBSXBELE1BQU0sNkJBQW1CMEMsTUFBTSxFQUFHLENBQUNZLElBQUksQ0FBQyxVQUFBQyxHQUFHO01BQUEsT0FBSUEsR0FBRyxDQUFDRyxJQUFJLEVBQUU7SUFBQSxFQUFDLENBQ3JFSixJQUFJLENBQUMsVUFBQUksSUFBSSxFQUFJO01BQ1ZYLFFBQVEsR0FBR1csSUFBSTtNQUNmZ0QsU0FBUyxFQUFFO01BQ1gsSUFBSW1CLGdCQUFnQixHQUFHLElBQUlDLGdCQUFnQixDQUFDLFVBQVVDLFNBQVMsRUFBRTtRQUM3RHJCLFNBQVMsRUFBRTtNQUNmLENBQUMsQ0FBQztNQUNGbUIsZ0JBQWdCLENBQUNHLE9BQU8sQ0FBQzlILFFBQVEsQ0FBQytILGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1FBQ2hFQyxTQUFTLEVBQUUsSUFBSTtRQUNmQyxPQUFPLEVBQUU7TUFDYixDQUFDLENBQUM7SUFDTixDQUFDLENBQUM7RUFDVjtFQUVBLFNBQVN6QixTQUFTLEdBQUc7SUFDakIsSUFBTTBCLEtBQUssR0FBR2xJLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUM7SUFDM0QsSUFBR3FDLGNBQWMsRUFBQztNQUNkNEYsS0FBSyxDQUFDOUcsT0FBTyxDQUFDLFVBQUErRyxJQUFJLEVBQUk7UUFDbEIsSUFBTUMsR0FBRyxHQUFHRCxJQUFJLENBQUNFLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQztRQUMvQ0YsSUFBSSxDQUFDRyxTQUFTLEdBQUd6RixRQUFRLENBQUN1RixHQUFHLENBQUMsSUFBSSwwQ0FBMEMsR0FBR0EsR0FBRztRQUNsRkQsSUFBSSxDQUFDSSxlQUFlLENBQUMsZ0JBQWdCLENBQUM7TUFDMUMsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxNQUFJO01BQ0Q3RSxPQUFPLENBQUN1RCxHQUFHLENBQUMsbUJBQW1CLENBQUM7SUFDcEM7SUFDQXVCLHFCQUFxQixDQUFDckksUUFBUSxDQUFDO0VBQ25DO0VBRUEsU0FBU3FJLHFCQUFxQixDQUFDQyxPQUFPLEVBQUU7SUFDcEMsSUFBSSxDQUFDQSxPQUFPLEVBQUU7TUFDVjtJQUNKO0lBQ0Esd0JBQW1CLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQywwQkFBRTtNQUE1QixJQUFNQyxJQUFJO01BQ1hELE9BQU8sQ0FBQ25ILFNBQVMsQ0FBQzRFLE1BQU0sQ0FBQ3dDLElBQUksQ0FBQztJQUNsQztJQUNBRCxPQUFPLENBQUNuSCxTQUFTLENBQUNDLEdBQUcsQ0FBQ2lCLE1BQU0sQ0FBQztFQUNqQztFQUVBLFNBQVNtRyxJQUFJLEdBQUc7SUFDWkMsaUJBQWlCLEVBQUU7SUFDbkIsSUFBRyxDQUFDOUYsVUFBVSxFQUFDO01BQ1hBLFVBQVUsR0FBRyxJQUFJckIsR0FBRyxDQUFDQyxNQUFNLEVBQUVkLFdBQVcsQ0FBQztJQUM3QztJQUNBLElBQUltRCxNQUFNLENBQUM4RSxLQUFLLEVBQUU7TUFDZCxJQUFJQyxLQUFLLEdBQUcvRSxNQUFNLENBQUM4RSxLQUFLLENBQUNFLFFBQVEsRUFBRTtNQUNuQ3JILE1BQU0sR0FBR29ILEtBQUssQ0FBQ0UsSUFBSSxDQUFDQyxZQUFZLElBQUlILEtBQUssQ0FBQ0UsSUFBSSxDQUFDRSxFQUFFLElBQUksRUFBRTtNQUN2RDtNQUNBeEMsUUFBUSxFQUFFO0lBQ2QsQ0FBQyxNQUFNO01BQ0gsSUFBSXlDLENBQUMsR0FBRyxDQUFDO01BQ1QsSUFBSUMsQ0FBQyxHQUFHNUgsV0FBVyxDQUFDLFlBQVk7UUFDNUIsSUFBSTJILENBQUMsR0FBRyxFQUFFLEVBQUU7VUFDUixJQUFJLENBQUMsQ0FBQ3BGLE1BQU0sQ0FBQ3NGLFNBQVMsRUFBRTtZQUNwQjNILE1BQU0sR0FBR3FDLE1BQU0sQ0FBQ3NGLFNBQVM7WUFDekIzQyxRQUFRLEVBQUU7WUFDVjRDLGFBQWEsQ0FBQ0YsQ0FBQyxDQUFDO1VBQ3BCO1FBQ0osQ0FBQyxNQUFNO1VBQ0hFLGFBQWEsQ0FBQ0YsQ0FBQyxDQUFDO1FBQ3BCO01BQ0osQ0FBQyxFQUFFLEdBQUcsQ0FBQztJQUVYO0lBQ0ExQyxRQUFRLEVBQUU7SUFDVm5HLFdBQVcsQ0FBQ2dKLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFDQyxDQUFDLEVBQUs7TUFDekM5RixPQUFPLENBQUN1RCxHQUFHLENBQUMsT0FBTyxDQUFDO01BQ3BCdUMsQ0FBQyxDQUFDQyxjQUFjLEVBQUU7TUFDbEIsSUFBRzNHLFVBQVUsS0FBS2IsU0FBUyxFQUFFO1FBQ3pCYSxVQUFVLEdBQUcsSUFBSXJCLEdBQUcsQ0FBQ0MsTUFBTSxFQUFFZCxXQUFXLENBQUM7TUFDN0M7TUFDQW9HLFFBQVEsQ0FBQ2xFLFVBQVUsQ0FBQztJQUN4QixDQUFDLENBQUM7RUFDTjtFQUNBLFNBQVM0RyxXQUFXLENBQUM5SSxXQUFXLEVBQUVlLFVBQVUsRUFBRUMsVUFBVSxFQUFFO0lBQ3RELElBQUlrQixVQUFVLElBQUlBLFVBQVUsQ0FBQ2xDLFdBQVcsS0FBS0EsV0FBVyxFQUFFO01BQ3REa0MsVUFBVSxDQUFDNkcsV0FBVyxDQUFDaEksVUFBVSxFQUFFQyxVQUFVLENBQUM7SUFDbEQsQ0FBQyxNQUFNO01BQ0hrQixVQUFVLEdBQUcsSUFBSXJCLEdBQUcsQ0FBQ0MsTUFBTSxFQUFFZCxXQUFXLEVBQUVlLFVBQVUsRUFBRUMsVUFBVSxDQUFDO01BQ2pFa0IsVUFBVSxDQUFDNkcsV0FBVyxDQUFDaEksVUFBVSxFQUFFQyxVQUFVLENBQUM7SUFDbEQ7SUFDQTtFQUNKOztFQUNBLFNBQVNnSSxlQUFlLENBQUNoSixXQUFXLEVBQUVpQixTQUFTLEVBQUU7SUFDN0MsSUFBSWlCLFVBQVUsSUFBSUEsVUFBVSxDQUFDbEMsV0FBVyxLQUFLQSxXQUFXLEVBQUU7TUFDdERrQyxVQUFVLENBQUM4RyxlQUFlLENBQUMvSCxTQUFTLENBQUM7SUFDekM7O0lBRUE7RUFDSjs7RUFDQSxTQUFTZ0Ysa0JBQWtCLENBQUNqRyxXQUFXLEVBQUU7SUFDckNtQyxPQUFPLGtCQUFXbkMsV0FBVyxFQUFHLENBQUN3QyxJQUFJLENBQUMsVUFBQXVDLElBQUksRUFBSTtNQUMxQzs7TUFFQSxJQUFNa0Usa0JBQWtCLEdBQUc3SixRQUFRLENBQUNJLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQztNQUN4RXlKLGtCQUFrQixDQUFDdkIsU0FBUyxHQUFHLEVBQUU7TUFHakMzQyxJQUFJLENBQUNtRSxZQUFZLENBQUMxSSxPQUFPLENBQUMsVUFBQTJJLFFBQVEsRUFBSTtRQUFBO1FBQ2xDLElBQU1DLFlBQVksR0FBR2hLLFFBQVEsQ0FBQ2lLLGFBQWEsQ0FBQyxLQUFLLENBQUM7UUFDbERELFlBQVksQ0FBQzFJLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLHlCQUF5QixDQUFDO1FBRXJELElBQU0ySSxVQUFVLEdBQUdDLFVBQVUsQ0FBQ0osUUFBUSxDQUFDRyxVQUFVLENBQUMsQ0FBQ0UsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUM3RCxJQUFNQyxjQUFjLEdBQUdySyxRQUFRLENBQUNpSyxhQUFhLENBQUMsTUFBTSxDQUFDO1FBQ3JESSxjQUFjLENBQUNqRSxXQUFXLGFBQU04RCxVQUFVLE1BQUc7UUFHN0MsSUFBTUksWUFBWSxHQUFHdEssUUFBUSxDQUFDdUssY0FBYyxrQ0FBS1IsUUFBUSxDQUFDQSxRQUFRLG1FQUFJLEtBQUssRUFBRztRQUM5RUMsWUFBWSxDQUFDUSxXQUFXLENBQUNILGNBQWMsQ0FBQztRQUN4Q0wsWUFBWSxDQUFDUSxXQUFXLENBQUNGLFlBQVksQ0FBQztRQUV0Q1Qsa0JBQWtCLENBQUNXLFdBQVcsQ0FBQ1IsWUFBWSxDQUFDO01BQ2hELENBQUMsQ0FBQztJQUNOLENBQUMsQ0FBQyxTQUFNLENBQUMsVUFBQXJHLEtBQUssRUFBSTtNQUNkRCxPQUFPLENBQUNDLEtBQUssQ0FBQywrQkFBK0IsRUFBRUEsS0FBSyxDQUFDO0lBQ3pELENBQUMsQ0FBQztFQUNOO0VBQ0EsU0FBU2lELFdBQVcsR0FBRztJQUNuQjdELE9BQU8sa0JBQVdwQyxlQUFlLEVBQUcsQ0FDL0J5QyxJQUFJLENBQUMsVUFBQXVDLElBQUksRUFBSTtNQUVWLElBQUk4RSxLQUFLLEdBQUc5RSxJQUFJLENBQUM4RSxLQUFLOztNQUV0QjtNQUNBLElBQU1DLGdCQUFnQixHQUFHMUssUUFBUSxDQUFDSSxhQUFhLENBQUMsNkJBQTZCLENBQUM7TUFDOUUsSUFBTXVLLGVBQWUsR0FBRzNLLFFBQVEsQ0FBQ0ksYUFBYSxDQUFDLDRCQUE0QixDQUFDO01BRzVFLElBQUdxSyxLQUFLLENBQUNHLE1BQU0sSUFBSSxFQUFFLEVBQUM7UUFDbEIvSixlQUFlLEdBQUcsSUFBSTtNQUMxQjtNQUNBLElBQUc0SixLQUFLLENBQUNHLE1BQU0sR0FBRyxFQUFFLEVBQUM7UUFDakIvSixlQUFlLEdBQUcsS0FBSztNQUMzQjtNQUVBLElBQUk2SixnQkFBZ0IsSUFBSTdKLGVBQWUsRUFBRUosV0FBVyxDQUFDYSxTQUFTLENBQUM0RSxNQUFNLENBQUMsTUFBTSxDQUFDO01BQzdFLElBQUl5RSxlQUFlLEVBQUVsSyxXQUFXLENBQUNhLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLE1BQU0sQ0FBQzs7TUFHdEQ7O01BRUFzSixrQkFBa0IsQ0FBQ0osS0FBSyxFQUFFL0ksTUFBTSxFQUFFZixlQUFlLENBQUM7O01BRWxEO0lBQ0osQ0FBQyxDQUFDO0VBRVY7O0VBQ0EsU0FBU2tLLGtCQUFrQixDQUFDSixLQUFLLEVBQUVLLGFBQWEsRUFBRWxLLFdBQVcsRUFBRTtJQUMzRFAsWUFBWSxDQUFDaUksU0FBUyxHQUFHLEVBQUU7SUFDM0JoSSxpQkFBaUIsQ0FBQ2dJLFNBQVMsR0FBRyxFQUFFO0lBRWhDLElBQUksQ0FBQ21DLEtBQUssSUFBSSxDQUFDQSxLQUFLLENBQUNHLE1BQU0sRUFBRTs7SUFFN0I7SUFDQTtJQUNBO0lBQ0E7O0lBRUE7O0lBRUE7SUFDQSxJQUFNRyxXQUFXLEdBQUdOLEtBQUssQ0FBQ3JGLElBQUksQ0FBQyxVQUFBNEYsSUFBSTtNQUFBLE9BQUlBLElBQUksQ0FBQ2xKLE1BQU0sS0FBS2dKLGFBQWE7SUFBQSxFQUFDOztJQUVyRTtJQUNBTCxLQUFLLENBQUNySixPQUFPLENBQUMsVUFBQTRKLElBQUksRUFBSTtNQUNsQixJQUFJQSxJQUFJLENBQUNsSixNQUFNLEtBQUtnSixhQUFhLEVBQUU7UUFDL0JHLFdBQVcsQ0FBQ0QsSUFBSSxFQUFFLEtBQUssRUFBRTNLLFlBQVksRUFBRW9LLEtBQUssRUFBRTdKLFdBQVcsQ0FBQztNQUM5RDtJQUNKLENBQUMsQ0FBQzs7SUFFRjtJQUNBLElBQUltSyxXQUFXLEVBQUU7TUFDYkUsV0FBVyxDQUFDRixXQUFXLEVBQUUsSUFBSSxFQUFFekssaUJBQWlCLEVBQUVtSyxLQUFLLEVBQUU3SixXQUFXLENBQUM7SUFDekU7RUFDSjtFQUNBLFNBQVNxSyxXQUFXLENBQUNELElBQUksRUFBRUUsYUFBYSxFQUFFQyxLQUFLLEVBQUVDLFFBQVEsRUFBRXhLLFdBQVcsRUFBRTtJQUNwRSxJQUFJTSxTQUFTO0lBRWIsSUFBSU4sV0FBVyxLQUFLLENBQUMsRUFBRTtNQUNuQk0sU0FBUyxHQUFHSixnQkFBZ0I7SUFDaEM7SUFFQSxJQUFNdUssaUJBQWlCLEdBQUdyTCxRQUFRLENBQUNpSyxhQUFhLENBQUMsS0FBSyxDQUFDO0lBQ3ZEb0IsaUJBQWlCLENBQUMvSixTQUFTLENBQUNDLEdBQUcsQ0FBQyxZQUFZLENBQUM7SUFFN0M4SixpQkFBaUIsQ0FBQy9DLFNBQVMsc0RBQ0k0QyxhQUFhLEdBQUdGLElBQUksQ0FBQ2xKLE1BQU0sR0FBR3dKLFVBQVUsQ0FBQ04sSUFBSSxDQUFDbEosTUFBTSxDQUFDLDBFQUU5RWQsV0FBVyxJQUFJRSxTQUFTLG1CQUNqQjhKLElBQUksQ0FBQ2pKLEtBQUssS0FBS0UsU0FBUyxJQUFJK0ksSUFBSSxDQUFDakosS0FBSyxLQUFLLElBQUksR0FBR2lKLElBQUksQ0FBQ2pKLEtBQUssR0FBRyxHQUFHLHVHQUF5RmlKLElBQUksQ0FBQ2hKLEtBQUssS0FBS0MsU0FBUyxJQUFJK0ksSUFBSSxDQUFDaEosS0FBSyxLQUFLLElBQUksR0FBR2dKLElBQUksQ0FBQ2hKLEtBQUssR0FBRyxHQUFHLDRIQUM3SCx5Q0FJM0dnSixJQUFJLENBQUNPLE1BQU0sS0FBSyxJQUFJLG9KQUVtRCx5QkFHdkVQLElBQUksQ0FBQ1EsY0FBYyxLQUFLLElBQUksb0pBRTJDLFdBRTVFO0lBRUcsSUFBSU4sYUFBYSxFQUFFO01BQ2ZHLGlCQUFpQixDQUFDL0osU0FBUyxDQUFDQyxHQUFHLENBQUMsS0FBSyxDQUFDO01BQ3RDOEosaUJBQWlCLENBQUMvQyxTQUFTLDBEQUNJNEMsYUFBYSxHQUFHRixJQUFJLENBQUNsSixNQUFNLEdBQUd3SixVQUFVLENBQUNOLElBQUksQ0FBQ2xKLE1BQU0sQ0FBQyx3RkFFeEVrSixJQUFJLENBQUNqSixLQUFLLEtBQUtFLFNBQVMsSUFBSStJLElBQUksQ0FBQ2pKLEtBQUssS0FBSyxJQUFJLEdBQUdpSixJQUFJLENBQUNqSixLQUFLLEdBQUcsR0FBRyx1R0FBeUZpSixJQUFJLENBQUNoSixLQUFLLEtBQUtDLFNBQVMsSUFBSStJLElBQUksQ0FBQ2hKLEtBQUssS0FBSyxJQUFJLEdBQUdnSixJQUFJLENBQUNoSixLQUFLLEdBQUcsR0FBRyxzREFFdk9nSixJQUFJLENBQUNPLE1BQU0sS0FBSyxJQUFJLG9KQUVtRCw2QkFHdkVQLElBQUksQ0FBQ1EsY0FBYyxLQUFLLElBQUksb0pBRTJDLGVBRTVFO01BQ0csSUFBTUMsUUFBUSxHQUFHekwsUUFBUSxDQUFDaUssYUFBYSxDQUFDLEtBQUssQ0FBQztNQUM5Q3dCLFFBQVEsQ0FBQ25LLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLGdCQUFnQixDQUFDO01BQ3hDa0ssUUFBUSxDQUFDbEYsWUFBWSxDQUFDLGdCQUFnQixFQUFFLFVBQVUsQ0FBQztNQUNuRDtNQUNBOEUsaUJBQWlCLENBQUNLLFlBQVksQ0FBQ0QsUUFBUSxFQUFFSixpQkFBaUIsQ0FBQ00sUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNFO0lBRUFSLEtBQUssQ0FBQ1MsTUFBTSxDQUFDUCxpQkFBaUIsQ0FBQztFQUNuQztFQUNBLFNBQVNDLFVBQVUsQ0FBQzVKLE1BQU0sRUFBRTtJQUN4QixPQUFPLElBQUksR0FBR0EsTUFBTSxDQUFDbUssUUFBUSxFQUFFLENBQUNDLEtBQUssQ0FBQyxDQUFDLENBQUM7RUFDNUM7O0VBRUE7RUFDQSxJQUFNQyxLQUFLLEdBQUcvTCxRQUFRLENBQUNDLGdCQUFnQixDQUFDLDhCQUE4QixDQUFDLENBQUMsQ0FBQztFQUN6RSxJQUFJK0wsS0FBSyxHQUFHLENBQUM7RUFFYixTQUFTQyxZQUFZLEdBQUc7SUFDcEJELEtBQUssSUFBSSxHQUFHLENBQUMsQ0FBQztJQUNkLElBQU1FLE9BQU8sR0FBR0MsSUFBSSxDQUFDQyxHQUFHLENBQUNKLEtBQUssSUFBSUcsSUFBSSxDQUFDRSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUN4RCxJQUFNQyxPQUFPLEdBQUdILElBQUksQ0FBQ0ksR0FBRyxDQUFDUCxLQUFLLElBQUlHLElBQUksQ0FBQ0UsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7O0lBRXhETixLQUFLLENBQUMzSyxPQUFPLENBQUMsVUFBQW9MLElBQUksRUFBSTtNQUNsQixJQUFJQSxJQUFJLENBQUNsTCxTQUFTLENBQUNtRixRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUU7UUFDdEMrRixJQUFJLENBQUMzSSxLQUFLLENBQUM0SSxTQUFTLHFCQUFjLENBQUNILE9BQU8sMEJBQWdCLENBQUNKLE9BQU8sU0FBTTtNQUM1RSxDQUFDLE1BQU07UUFDSE0sSUFBSSxDQUFDM0ksS0FBSyxDQUFDNEksU0FBUyxxQkFBY0gsT0FBTywwQkFBZ0JKLE9BQU8sU0FBTTtNQUMxRTtJQUNKLENBQUMsQ0FBQztJQUVGUSxxQkFBcUIsQ0FBQ1QsWUFBWSxDQUFDO0VBQ3ZDO0VBQ0FBLFlBQVksRUFBRTs7RUFFZDtFQUNBLElBQU1VLElBQUksR0FBRzNNLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMseURBQXlELENBQUM7RUFDakcsSUFBTWtCLFVBQVUsR0FBR25CLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMscUJBQXFCLENBQUM7RUFFbkUsU0FBUzJNLGNBQWMsQ0FBQ0MsS0FBSyxFQUFFO0lBQzNCLElBQUkzTCxTQUFTO0lBQ2IsSUFBSTRMLFlBQVksR0FBRyxDQUFDO0lBRXBCLElBQU1DLFVBQVUsR0FBR0YsS0FBSyxDQUFDRyxNQUFNLENBQUNDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJSixLQUFLLENBQUNHLE1BQU0sQ0FBQ0MsT0FBTyxDQUFDLHFCQUFxQixDQUFDLElBQUlKLEtBQUssQ0FBQ0csTUFBTSxDQUFDQyxPQUFPLENBQUMsc0JBQXNCLENBQUM7SUFDN0p2SixPQUFPLENBQUN1RCxHQUFHLENBQUM4RixVQUFVLENBQUM7SUFDdkIsSUFBTUcsT0FBTyxHQUFHSCxVQUFVLENBQUNFLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJRixVQUFVLENBQUNFLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQzs7SUFFekc7O0lBRUEsSUFBR0gsWUFBWSxLQUFLLENBQUMsRUFBQztNQUNsQjVMLFNBQVMsR0FBR0osZ0JBQWdCO0lBQ2hDO0lBQ0EsSUFBR0UsV0FBVyxHQUFHRSxTQUFTLEVBQUM7TUFDdkJYLFdBQVcsQ0FBQ2UsU0FBUyxDQUFDQyxHQUFHLENBQUMsT0FBTyxDQUFDO0lBQ3RDLENBQUMsTUFBSTtNQUNEaEIsV0FBVyxDQUFDZSxTQUFTLENBQUM0RSxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ3pDO0lBR0EsSUFBSTZHLFVBQVUsQ0FBQ3pMLFNBQVMsQ0FBQ21GLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtJQUM3QyxJQUFJeUcsT0FBTyxFQUFFO01BQ1QsSUFBTUMsSUFBSSxHQUFHRCxPQUFPLENBQUNqTixnQkFBZ0IsQ0FBQyxTQUFTLENBQUM7TUFDaEQsSUFBSWtOLElBQUksQ0FBQ3ZDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDakJ1QyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM3TCxTQUFTLENBQUM0RSxNQUFNLENBQUMsUUFBUSxDQUFDO01BQ3RDO0lBQ0o7SUFFQTZHLFVBQVUsQ0FBQ3pMLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFFBQVEsQ0FBQztJQUNsQzZMLGdCQUFnQixFQUFFO0lBQ2xCO0lBQ0EsSUFBR0wsVUFBVSxDQUFDRSxPQUFPLENBQUMsc0JBQXNCLENBQUMsRUFBQztNQUMxQ3BHLGtCQUFrQixDQUFDaUcsWUFBWSxDQUFDO01BQ2hDaEssVUFBVSxHQUFHLElBQUlyQixHQUFHLENBQUNDLE1BQU0sRUFBRW9MLFlBQVksQ0FBQztNQUMxQ2xNLFdBQVcsR0FBRyxDQUFDO01BQ2ZaLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMsdUJBQXVCLENBQUMsQ0FBQ21CLE9BQU8sQ0FBQyxVQUFDaU0sS0FBSyxFQUFFakUsQ0FBQyxFQUFJO1FBQ3BFO1FBQ0EsSUFBR3BJLFdBQVcsR0FBR0UsU0FBUyxJQUFJa0ksQ0FBQyxLQUFLLENBQUMsSUFBSXhJLFdBQVcsS0FBSyxDQUFDLEVBQUM7VUFDdkR5TSxLQUFLLENBQUNqSCxXQUFXLEdBQUcsR0FBRztRQUMzQixDQUFDLE1BQ0ksSUFBR3BGLFdBQVcsR0FBR0UsU0FBUyxJQUFJa0ksQ0FBQyxLQUFLLENBQUMsSUFBSXhJLFdBQVcsS0FBSyxDQUFDLEVBQUM7VUFDNUR5TSxLQUFLLENBQUNqSCxXQUFXLEdBQUcsR0FBRztRQUMzQjtNQUVKLENBQUMsQ0FBQztNQUNGcEcsUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDbUIsT0FBTyxDQUFDLFVBQUFrTSxNQUFNLEVBQUk7UUFDdkVBLE1BQU0sQ0FBQ0MsT0FBTyxHQUFHLEtBQUs7TUFDMUIsQ0FBQyxDQUFDO0lBRU47SUFDQXRNLGtCQUFrQixDQUFDSCxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdDOztFQUVBNkwsSUFBSSxDQUFDdkwsT0FBTyxDQUFDLFVBQUFrRyxHQUFHO0lBQUEsT0FBSUEsR0FBRyxDQUFDaUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFcUQsY0FBYyxDQUFDO0VBQUEsRUFBQztFQUVsRSxTQUFTUSxnQkFBZ0IsR0FBRztJQUN4QmpNLFVBQVUsQ0FBQ0MsT0FBTyxDQUFDLFVBQUFDLFNBQVM7TUFBQSxPQUFJQSxTQUFTLENBQUNDLFNBQVMsQ0FBQzRFLE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFBQSxFQUFDO0lBQ3JFWixjQUFjLENBQUM1RCxNQUFNLENBQUM7SUFDdEIsSUFBTWdKLGdCQUFnQixHQUFHMUssUUFBUSxDQUFDSSxhQUFhLENBQUMsNkJBQTZCLENBQUM7SUFDOUUsSUFBTXVLLGVBQWUsR0FBRzNLLFFBQVEsQ0FBQ0ksYUFBYSxDQUFDLDRCQUE0QixDQUFDO0lBRzVFLElBQUlzSyxnQkFBZ0IsRUFBRTtNQUNsQmpLLFdBQVcsQ0FBQ2EsU0FBUyxDQUFDNEUsTUFBTSxDQUFDLE1BQU0sQ0FBQztNQUNwQ2xHLFFBQVEsQ0FBQ0ksYUFBYSxDQUFDLDZCQUE2QixDQUFDLENBQUNrQixTQUFTLENBQUNDLEdBQUcsQ0FBQyxRQUFRLENBQUM7TUFDN0V2QixRQUFRLENBQUNJLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDa0IsU0FBUyxDQUFDQyxHQUFHLENBQUMsTUFBTSxDQUFDO01BQ3BFdkIsUUFBUSxDQUFDSSxhQUFhLENBQUMsc0JBQXNCLENBQUMsQ0FBQ2tCLFNBQVMsQ0FBQzRFLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDM0UsQ0FBQyxNQUFNLElBQUl5RSxlQUFlLEVBQUU7TUFDeEJsSyxXQUFXLENBQUNhLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLE1BQU0sQ0FBQztNQUNqQ3ZCLFFBQVEsQ0FBQ0ksYUFBYSxDQUFDLHNCQUFzQixDQUFDLENBQUNrQixTQUFTLENBQUNDLEdBQUcsQ0FBQyxNQUFNLENBQUM7TUFDcEV2QixRQUFRLENBQUNJLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDa0IsU0FBUyxDQUFDNEUsTUFBTSxDQUFDLE1BQU0sQ0FBQztNQUN2RWxHLFFBQVEsQ0FBQ0ksYUFBYSxDQUFDLDRCQUE0QixDQUFDLENBQUNrQixTQUFTLENBQUNDLEdBQUcsQ0FBQyxRQUFRLENBQUM7SUFDaEY7RUFDSjs7RUFFQTs7RUFFQSxTQUFTNEYsU0FBUyxDQUFDRCxHQUFHLEVBQUM7SUFDbkIsSUFBTXNHLFdBQVcsR0FBR3RHLEdBQUcsQ0FBQytGLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQztJQUN6RCxJQUFNUSxVQUFVLEdBQUdELFdBQVcsQ0FBQ3BOLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQztJQUNyRSxJQUFNc04sY0FBYyxHQUFHeEcsR0FBRyxDQUFDK0YsT0FBTyxDQUFDLHFCQUFxQixDQUFDO0lBQ3pELElBQU1yTSxXQUFXLEdBQUcrTSxRQUFRLENBQUNELGNBQWMsQ0FBQ0UsT0FBTyxDQUFDaE4sV0FBVyxDQUFDO0lBRWhFLElBQU1pTixRQUFRLEdBQUcsU0FBWEEsUUFBUSxDQUFJQyxJQUFJLEVBQUs7TUFDdkIsSUFBTXJGLE9BQU8sR0FBR2lGLGNBQWMsQ0FBQ3ROLGFBQWEsd0JBQWdCME4sSUFBSSwrQkFBMkI7TUFDM0YsT0FBT3JGLE9BQU8sR0FBR3NGLE1BQU0sQ0FBQ3RGLE9BQU8sQ0FBQ3JDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ3pELENBQUM7SUFHRCxJQUFNekUsVUFBVSxHQUFHa00sUUFBUSxDQUFDLE9BQU8sQ0FBQztJQUNwQyxJQUFNak0sVUFBVSxHQUFHaU0sUUFBUSxDQUFDLE9BQU8sQ0FBQzs7SUFFcEM7O0lBRUFuRSxXQUFXLENBQUM5SSxXQUFXLEVBQUVlLFVBQVUsRUFBRUMsVUFBVSxDQUFDO0VBQ3BEOztFQUVBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7RUFHQTs7RUFFQSxTQUFTb00sU0FBUyxDQUFDQyxjQUFjLEVBQUVDLFVBQVUsRUFBRTtJQUMzQyxJQUFNQyxlQUFlLEdBQUduTyxRQUFRLENBQUNJLGFBQWEsQ0FBQyxTQUFTLENBQUM7SUFDekQsSUFBTWdPLEtBQUssR0FBR3BPLFFBQVEsQ0FBQ0ksYUFBYSx5QkFBa0I4TixVQUFVLEVBQUc7SUFDbkUsSUFBTUcsUUFBUSxHQUFHRixlQUFlLENBQUMvTixhQUFhLENBQUMsbUJBQW1CLENBQUM7SUFHbkUsSUFBSSxDQUFDNk4sY0FBYyxJQUFJLENBQUNHLEtBQUssSUFBSSxDQUFDRCxlQUFlLEVBQUU7SUFFbkRGLGNBQWMsQ0FBQzdNLE9BQU8sQ0FBQyxVQUFBa04sYUFBYSxFQUFJO01BQ3BDQSxhQUFhLENBQUMvRSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBTTtRQUMxQzRFLGVBQWUsQ0FBQzdNLFNBQVMsQ0FBQzRFLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDNUNpSSxlQUFlLENBQUM3TSxTQUFTLENBQUNDLEdBQUcsQ0FBQzJNLFVBQVUsQ0FBQztRQUN6Q2xPLFFBQVEsQ0FBQzhFLElBQUksQ0FBQ2pCLEtBQUssQ0FBQzBLLFFBQVEsR0FBRyxRQUFRO01BQzNDLENBQUMsQ0FBQztJQUNOLENBQUMsQ0FBQztJQUVGLElBQU1DLFdBQVcsR0FBR0osS0FBSyxDQUFDaE8sYUFBYSxDQUFDLHFCQUFxQixDQUFDO0lBQzlELElBQU1xTyxRQUFRLEdBQUdMLEtBQUssQ0FBQ2hPLGFBQWEsQ0FBQyxZQUFZLENBQUM7SUFFbEQrTixlQUFlLENBQUM1RSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBQ0MsQ0FBQyxFQUFLO01BQzdDLElBQUlBLENBQUMsQ0FBQ3dELE1BQU0sS0FBS21CLGVBQWUsSUFBSTNFLENBQUMsQ0FBQ3dELE1BQU0sS0FBS3dCLFdBQVcsSUFBSWhGLENBQUMsQ0FBQ3dELE1BQU0sS0FBS3lCLFFBQVEsRUFBRTtRQUNuRkMsVUFBVSxFQUFFO01BQ2hCO0lBQ0osQ0FBQyxDQUFDO0lBRUYsU0FBU0EsVUFBVSxHQUFHO01BQ2xCUCxlQUFlLENBQUM3TSxTQUFTLENBQUNDLEdBQUcsQ0FBQyxVQUFVLENBQUM7TUFDekM0TSxlQUFlLENBQUM3TSxTQUFTLENBQUM0RSxNQUFNLENBQUNnSSxVQUFVLENBQUM7TUFDNUNsTyxRQUFRLENBQUM4RSxJQUFJLENBQUNqQixLQUFLLENBQUMwSyxRQUFRLEdBQUcsRUFBRTtJQUNyQztJQUNBO0lBQ0FGLFFBQVEsQ0FBQzlFLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFDQyxDQUFDLEVBQUk7TUFDckNrRixVQUFVLEVBQUU7SUFDaEIsQ0FBQyxDQUFDO0VBRU47RUFFQVYsU0FBUyxDQUFDaE8sUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLFdBQVcsQ0FBQztFQUNwRStOLFNBQVMsQ0FBQ2hPLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMseUJBQXlCLENBQUMsRUFBRSxlQUFlLENBQUM7O0VBRWhGO0VBQ0FELFFBQVEsQ0FBQ0ksYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDbUosZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQVk7SUFDdkUsSUFBTW9GLGFBQWEsR0FBRzNPLFFBQVEsQ0FBQytILGNBQWMsQ0FBQyxTQUFTLENBQUM7SUFDeEQsSUFBTTZHLGNBQWMsR0FBR0QsYUFBYSxDQUFDRSxxQkFBcUIsRUFBRSxDQUFDQyxHQUFHLEdBQUcvSyxNQUFNLENBQUNnTCxXQUFXLEdBQUcsQ0FBQztJQUV6RmhMLE1BQU0sQ0FBQ2lMLFFBQVEsQ0FBQztNQUNaRixHQUFHLEVBQUVGLGNBQWM7TUFDbkJLLFFBQVEsRUFBRTtJQUNkLENBQUMsQ0FBQztFQUNOLENBQUMsQ0FBQztFQUVGLElBQU1DLGVBQWUsR0FBR2xQLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMsaUJBQWlCLENBQUM7RUFFcEVpUCxlQUFlLENBQUM5TixPQUFPLENBQUMsVUFBQUMsU0FBUyxFQUFJO0lBQ2pDLElBQU04TixXQUFXLEdBQUc5TixTQUFTLENBQUNwQixnQkFBZ0IsQ0FBQyxzQkFBc0IsQ0FBQztJQUV0RWtQLFdBQVcsQ0FBQy9OLE9BQU8sQ0FBQyxVQUFDZ08sS0FBSyxFQUFLO01BQzNCQSxLQUFLLENBQUM3RixnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsWUFBVztRQUN4QzRGLFdBQVcsQ0FBQy9OLE9BQU8sQ0FBQyxVQUFBa0YsSUFBSTtVQUFBLE9BQUlBLElBQUksQ0FBQ2hGLFNBQVMsQ0FBQzRFLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFBQSxFQUFDO1FBQzdELElBQUksQ0FBQzVFLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFNBQVMsQ0FBQztRQUM3Qjs7UUFFQXFJLGVBQWUsQ0FBQ2hKLFdBQVcsRUFBRSxJQUFJLENBQUNSLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQ29ILEtBQUssQ0FBQztNQUNuRSxDQUFDLENBQUM7SUFDTixDQUFDLENBQUM7RUFDTixDQUFDLENBQUM7RUFFRixJQUFJNkgsVUFBVSxHQUFHdEssSUFBSSxDQUFDdUssS0FBSyxDQUFDN00sY0FBYyxDQUFDQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxFQUFFO0VBRXZFLFNBQVM2TSxhQUFhLENBQUMxQyxLQUFLLEVBQUU7SUFDMUIsSUFBTTJDLFNBQVMsR0FBRzNDLEtBQUssQ0FBQzRDLGFBQWEsQ0FBQ3BILFlBQVksQ0FBQyxpQkFBaUIsQ0FBQztJQUNyRSxJQUFNcUgsU0FBUyxHQUFHN0MsS0FBSyxDQUFDNEMsYUFBYSxDQUFDcEgsWUFBWSxDQUFDLGlCQUFpQixDQUFDO0lBRXJFLElBQUksQ0FBQ21ILFNBQVMsRUFBRTtJQUVoQixJQUFJRSxTQUFTLEVBQUU7TUFDWCxJQUFNQyxNQUFNLEdBQUcsQ0FBQyxDQUFDak8sTUFBTTtNQUV2QixJQUFNa08sWUFBWSxHQUFHUCxVQUFVLENBQUNqSyxJQUFJLENBQ2hDLFVBQUFrQixJQUFJO1FBQUEsT0FBSUEsSUFBSSxDQUFDdUosV0FBVyxLQUFLTCxTQUFTLElBQUlsSixJQUFJLENBQUMwQyxJQUFJLEtBQUsyRyxNQUFNO01BQUEsRUFDakU7TUFFRCxJQUFJQyxZQUFZLEVBQUU7UUFDZEEsWUFBWSxDQUFDRSxPQUFPLElBQUksQ0FBQztNQUM3QixDQUFDLE1BQU07UUFDSFQsVUFBVSxDQUFDVSxJQUFJLENBQUM7VUFDWkYsV0FBVyxFQUFFTCxTQUFTO1VBQ3RCTSxPQUFPLEVBQUUsQ0FBQztVQUNWOUcsSUFBSSxFQUFFMkc7UUFDVixDQUFDLENBQUM7TUFDTjtJQUNKLENBQUMsTUFBTTtNQUNILElBQU1DLGFBQVksR0FBR1AsVUFBVSxDQUFDakssSUFBSSxDQUFDLFVBQUFrQixJQUFJO1FBQUEsT0FBSUEsSUFBSSxDQUFDdUosV0FBVyxLQUFLTCxTQUFTO01BQUEsRUFBQztNQUM1RSxJQUFJSSxhQUFZLEVBQUU7UUFDZEEsYUFBWSxDQUFDRSxPQUFPLElBQUksQ0FBQztNQUM3QixDQUFDLE1BQU07UUFDSFQsVUFBVSxDQUFDVSxJQUFJLENBQUM7VUFDWkYsV0FBVyxFQUFFTCxTQUFTO1VBQ3RCTSxPQUFPLEVBQUU7UUFDYixDQUFDLENBQUM7TUFDTjtJQUNKO0lBRUFyTixjQUFjLENBQUNnRixPQUFPLENBQUMsWUFBWSxFQUFFMUMsSUFBSSxDQUFDQyxTQUFTLENBQUNxSyxVQUFVLENBQUMsQ0FBQztJQUNoRTNMLE9BQU8sQ0FBQ3VELEdBQUcsQ0FBQ29JLFVBQVUsQ0FBQztFQUMzQjtFQUVBLFNBQVN6RyxpQkFBaUIsR0FBRztJQUN6QixJQUFNb0gsaUJBQWlCLEdBQUdoUSxRQUFRLENBQUNDLGdCQUFnQixDQUFDLG1CQUFtQixDQUFDO0lBQ3hFK1AsaUJBQWlCLENBQUM1TyxPQUFPLENBQUMsVUFBQTZPLEVBQUUsRUFBSTtNQUM1QkEsRUFBRSxDQUFDMUcsZ0JBQWdCLENBQUMsT0FBTyxFQUFFZ0csYUFBYSxDQUFDO0lBQy9DLENBQUMsQ0FBQztFQUNOO0VBRUEsU0FBU1csY0FBYyxHQUFHO0lBQ3RCLElBQU1DLFdBQVcsR0FBR3BMLElBQUksQ0FBQ3VLLEtBQUssQ0FBQzdNLGNBQWMsQ0FBQ0MsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBRXBFLElBQUksQ0FBQ3lOLFdBQVcsSUFBSUEsV0FBVyxDQUFDdkYsTUFBTSxLQUFLLENBQUMsRUFBRTs7SUFHOUM7O0lBRUExSCxLQUFLLFdBQUlwRCxNQUFNLGtCQUFlO01BQzFCK0UsTUFBTSxFQUFFLE1BQU07TUFDZDFCLE9BQU8sRUFBRTtRQUNMLGNBQWMsRUFBRTtNQUNwQixDQUFDO01BQ0QyQixJQUFJLEVBQUVDLElBQUksQ0FBQ0MsU0FBUyxDQUFDbUwsV0FBVztJQUNwQyxDQUFDLENBQUMsQ0FDRy9NLElBQUksQ0FBQyxVQUFBZ04sUUFBUSxFQUFJO01BQ2QsSUFBSUEsUUFBUSxDQUFDOU0sRUFBRSxFQUFFO1FBQ2IrTCxVQUFVLEdBQUcsRUFBRTtRQUNmNU0sY0FBYyxDQUFDNE4sVUFBVSxDQUFDLFlBQVksQ0FBQztRQUN2QztNQUNKLENBQUMsTUFBTTtRQUNIM00sT0FBTyxDQUFDQyxLQUFLLENBQUMsOEJBQThCLENBQUM7TUFDakQ7SUFDSixDQUFDLENBQUMsU0FDSSxDQUFDLFVBQUFBLEtBQUssRUFBSTtNQUNaRCxPQUFPLENBQUNDLEtBQUssQ0FBQyxvQkFBb0IsRUFBRUEsS0FBSyxDQUFDO0lBQzlDLENBQUMsQ0FBQztFQUNWO0VBRUFuQyxXQUFXLENBQUMwTyxjQUFjLEVBQUUsS0FBSyxDQUFDO0VBRWxDeEksZ0JBQWdCLEVBQUUsQ0FDYnRFLElBQUksQ0FBQ3VGLElBQUksQ0FBQztFQUdmM0ksUUFBUSxDQUFDdUosZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQUNDLENBQUMsRUFBSztJQUN0QyxJQUFNdEMsR0FBRyxHQUFHc0MsQ0FBQyxDQUFDd0QsTUFBTSxDQUFDQyxPQUFPLENBQUMsa0RBQWtELENBQUM7SUFDaEYsSUFBSSxDQUFDL0YsR0FBRyxFQUFFO0lBRVZ4RCxPQUFPLENBQUN1RCxHQUFHLENBQUNDLEdBQUcsQ0FBQztJQUVoQixJQUFNc0csV0FBVyxHQUFHdEcsR0FBRyxDQUFDK0YsT0FBTyxDQUFDLHdCQUF3QixDQUFDO0lBQ3pELElBQU1RLFVBQVUsR0FBR0QsV0FBVyxDQUFDcE4sYUFBYSxDQUFDLHVCQUF1QixDQUFDO0lBQ3JFLElBQU1zTixjQUFjLEdBQUd4RyxHQUFHLENBQUMrRixPQUFPLENBQUMscUJBQXFCLENBQUM7SUFFekQsSUFBSXpGLEtBQUssR0FBR21HLFFBQVEsQ0FBQ0YsVUFBVSxDQUFDckgsV0FBVyxDQUFDO0lBQzVDLElBQUljLEdBQUcsQ0FBQzVGLFNBQVMsQ0FBQ21GLFFBQVEsQ0FBQyx3QkFBd0IsQ0FBQyxFQUFFO01BQ2xEZSxLQUFLLElBQUksQ0FBQztJQUNkLENBQUMsTUFBTSxJQUFJQSxLQUFLLEdBQUcsQ0FBQyxFQUFFO01BQ2xCQSxLQUFLLElBQUksQ0FBQztJQUNkO0lBQ0FpRyxVQUFVLENBQUNySCxXQUFXLGFBQU1vQixLQUFLLENBQUU7SUFDbkNMLFNBQVMsQ0FBQ0QsR0FBRyxDQUFDO0VBQ2xCLENBQUMsQ0FBQztBQUlOLENBQUMsR0FBRyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uICgpIHtcblxuICAgIGxldCBpbml0SnMgPSAgZmFsc2U7XG5cbiAgICBpZiAoaW5pdEpzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBhcGlVUkwgPSAnaHR0cHM6Ly9mYXYtcHJvbS5jb20vYXBpX2Zvb3RiYWxsX3NoYWtodGFyJyxcbiAgICAgICAgdW5hdXRoTXNncyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy51bmF1dGgtbXNnJyksXG4gICAgICAgIHlvdUFyZUluQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50b29rLXBhcnQnKSxcbiAgICAgICAgbWFpblBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZhdi1wYWdlXCIpLFxuICAgICAgICByZXN1bHRzVGFibGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVzdWx0cy10YWJsZScpLFxuICAgICAgICByZXN1bHRzVGFibGVPdGhlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZXN1bHRzLXRhYmxlLW90aGVyJyksXG4gICAgICAgIHBsYWNlQmV0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmVkaWN0LWJ0blwiKSxcbiAgICAgICAgbGFzdFByZWRpY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByZWRpY3RfX2xhc3RcIiksXG4gICAgICAgIHRvcEZvcmVjYXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b3BGb3JlY2FzdFwiKVxuXG4gICAgbGV0IGN1cnJlbnRUYWIgPSAxXG4gICAgbGV0IGN1cnJlbnRUYWJUYWJsZSA9IDFcbiAgICBsZXQgbWF0Y2hOdW1iZXIgPSAxXG4gICAgbGV0IHNob3dUb3BGb3JlY2FzdCA9IGZhbHNlXG5cbiAgICAvLyBjb25zdCBGSVJTVF9NQVRDSF9EQVRFID0gbmV3IERhdGUoJzIwMjUtMDQtMjdUMTc6MzA6MDAnKSAvLyDQtNCw0YLQsCDQvNCw0YLRh9GDIC0gMzDRhdCyINGB0L/RgNCw0LLQttC90Y8g0LTQsNGC0LBcbiAgICBjb25zdCBGSVJTVF9NQVRDSF9EQVRFID0gbmV3IERhdGUoJzIwMjUtMDQtMjdUMTc6MzA6MDAnKSAvLyDQtNCw0YLQsCDQvNCw0YLRh9GDIC0gMzDRhdCyXG4gICAgY29uc3QgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpXG5cbiAgICBmdW5jdGlvbiBsb2NrTWF0Y2hDb250YWluZXIobWF0Y2hEYXRlLCBtYXRjaE51bWJlcikge1xuICAgICAgICBpZiAobmV3IERhdGUoKSA+IG1hdGNoRGF0ZSkge1xuICAgICAgICAgICAgY29uc3QgY29udGFpbmVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5wcmVkaWN0X19jb250YWluZXJbZGF0YS1tYXRjaC1udW1iZXI9XCIke21hdGNoTnVtYmVyfVwiXWApO1xuXG4gICAgICAgICAgICBjb250YWluZXJzLmZvckVhY2goY29udGFpbmVyID0+IHtcbiAgICAgICAgICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnX2xvY2snKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBwbGFjZUJldEJ0bi5jbGFzc0xpc3QuYWRkKFwiX2xvY2tcIilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxvY2tNYXRjaENvbnRhaW5lcihGSVJTVF9NQVRDSF9EQVRFLCAxKTsgLy8g0JTQu9GPINC/0LXRgNGI0L7Qs9C+INC80LDRgtGH0YNcblxuICAgIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgY29uc3QgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpOyAvLyDQntC90L7QstC40YLQuCDQv9C+0YLQvtGH0L3RgyDQtNCw0YLRg1xuICAgICAgICBsb2NrTWF0Y2hDb250YWluZXIoRklSU1RfTUFUQ0hfREFURSwgMSk7XG4gICAgfSwgNjAwMDAwKTsgLy8g0J7QvdC+0LLQu9GO0LLQsNGC0Lgg0LrQvtC20L3RliAxMCDRhdCyXG5cbiAgICBjbGFzcyBCZXQge1xuICAgICAgICBjb25zdHJ1Y3Rvcih1c2VySWQsIG1hdGNoTnVtYmVyLCB0ZWFtMUdvYWxzID0gMCwgdGVhbTJHb2FscyA9IDAsIGZpcnN0R29hbCkge1xuICAgICAgICAgICAgaWYodXNlcklkICE9PSBudWxsKSB0aGlzLnVzZXJpZCA9IHVzZXJJZDtcbiAgICAgICAgICAgIHRoaXMubWF0Y2hOdW1iZXIgPSBtYXRjaE51bWJlcjtcbiAgICAgICAgICAgIHRoaXMudGVhbTEgPSB0ZWFtMUdvYWxzO1xuICAgICAgICAgICAgdGhpcy50ZWFtMiA9IHRlYW0yR29hbHM7XG4gICAgICAgICAgICBpZihmaXJzdEdvYWwgIT09IHVuZGVmaW5lZCkgdGhpcy5maXJzdEdvYWwgPSBmaXJzdEdvYWw7XG4gICAgICAgIH1cblxuICAgICAgICB1cGRhdGVHb2Fscyh0ZWFtMUdvYWxzLCB0ZWFtMkdvYWxzKSB7XG4gICAgICAgICAgICBpZiAodGVhbTFHb2FscyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50ZWFtMSA9IHRlYW0xR29hbHMgIT09IG51bGwgPyB0ZWFtMUdvYWxzIDogdGhpcy50ZWFtMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0ZWFtMkdvYWxzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRlYW0yID0gdGVhbTJHb2FscyAhPT0gbnVsbCA/IHRlYW0yR29hbHMgOiB0aGlzLnRlYW0yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5nb2Fsc1VwZGF0ZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdXBkYXRlRmlyc3RHb2FsKGZpcnN0R29hbCkge1xuICAgICAgICAgICAgaWYgKGZpcnN0R29hbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJzdEdvYWwgPSBmaXJzdEdvYWwgIT09IG51bGwgPyBmaXJzdEdvYWwgOiB0aGlzLmZpcnN0R29hbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZmlyc3RHb2FsVXBkYXRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBjYWNoZSA9IHt9O1xuICAgIGxldCBwcmVkaWN0RGF0YSA9IFtdO1xuXG4gICAgbGV0IHRyYW5zbGF0ZVN0YXRlID0gdHJ1ZVxuICAgIGxldCBkZWJ1ZyA9IGZhbHNlXG5cbiAgICBsZXQgbG9jYWxlID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcImxvY2FsZVwiKSA/PyBcInVrXCJcbiAgICAvLyBsZXQgbG9jYWxlID0gXCJ1a1wiXG4gICAgLy8gbGV0IGxvY2FsZSA9IFwiZW5cIlxuXG5cbiAgICBjb25zdCB1a0xlbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdWtMZW5nJyk7XG4gICAgY29uc3QgZW5MZW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VuTGVuZycpO1xuXG5cbiAgICBsZXQgaTE4bkRhdGEgPSB7fTtcblxuICAgIGxldCB1c2VySWQ7XG4gICAgLy8gdXNlcklkID0gMTAwMzAwMjY4O1xuXG4gICAgbGV0IGN1cnJlbnRCZXQ7XG5cbiAgICBpZiAodWtMZW5nKSBsb2NhbGUgPSAndWsnO1xuICAgIGlmIChlbkxlbmcpIGxvY2FsZSA9ICdlbic7XG5cbiAgICBjb25zdCByZXF1ZXN0ID0gKGxpbmssIGV4dHJhT3B0aW9ucykgPT5cbiAgICAgICAgZmV0Y2goYXBpVVJMICsgbGluaywge1xuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC4uLihleHRyYU9wdGlvbnMgfHwge30pXG4gICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghcmVzLm9rKSB0aHJvdyBuZXcgRXJyb3IoJ0FQSSBlcnJvcicpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0FQSSByZXF1ZXN0IGZhaWxlZDonLCBlcnIpO1xuXG4gICAgICAgICAgICAgICAgcmVwb3J0RXJyb3IoZXJyKTtcblxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mYXYtcGFnZScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5ocmVmLnN0YXJ0c1dpdGgoXCJodHRwczovL3d3dy5mYXZiZXQuaHIvXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9wcm9tb2NpamUvcHJvbW9jaWphL3N0dWIvJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvcHJvbW9zL3Byb21vL3N0dWIvJztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gcmVwb3J0RXJyb3IoZXJyKSB7XG4gICAgICAgIGNvbnN0IHJlcG9ydERhdGEgPSB7XG4gICAgICAgICAgICBvcmlnaW46IHdpbmRvdy5sb2NhdGlvbi5ocmVmLFxuICAgICAgICAgICAgdXNlcmlkOiB1c2VySWQsXG4gICAgICAgICAgICBlcnJvclRleHQ6IGVycj8uZXJyb3IgfHwgZXJyPy50ZXh0IHx8IGVycj8ubWVzc2FnZSB8fCAnVW5rbm93biBlcnJvcicsXG4gICAgICAgICAgICB0eXBlOiBlcnI/Lm5hbWUgfHwgJ1Vua25vd25FcnJvcicsXG4gICAgICAgICAgICBzdGFjazogZXJyPy5zdGFjayB8fCAnJ1xuICAgICAgICB9O1xuXG4gICAgICAgIGZldGNoKCdodHRwczovL2Zhdi1wcm9tLmNvbS9hcGktY21zL3JlcG9ydHMvYWRkJywge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHJlcG9ydERhdGEpXG4gICAgICAgIH0pLmNhdGNoKGNvbnNvbGUud2Fybik7XG4gICAgfVxuXG4gICAgY29uc3QgZ2V0TGFzdEJldCA9IChiZXRzLCBtYXRjaE51bWJlcikgPT57XG4gICAgICAgIGlmKCFiZXRzKSByZXR1cm4gZmFsc2VcbiAgICAgICAgcmV0dXJuIGJldHMuZmluZChiZXQgPT4gYmV0Lm1hdGNoTnVtYmVyID09PSBtYXRjaE51bWJlcik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVmcmVzaEJldEluZm8odXNlcklkKSB7XG4gICAgICAgIGNvbnN0IHNjb3JlMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2NvcmUtMVwiKVxuICAgICAgICBjb25zdCBzY29yZTIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNjb3JlLTJcIilcbiAgICAgICAgY29uc3QgZ29hbDEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdvYWwtMVwiKVxuICAgICAgICBjb25zdCBnb2FsMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ29hbC0yXCIpXG5cbiAgICAgICAgLy8gY29uc29sZS5sb2cobWF0Y2hOdW1iZXIpXG5cbiAgICAgICAgcmVxdWVzdChgL2ZhdnVzZXIvJHt1c2VySWR9YCwge1xuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgICAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgaWYoZGF0YS5iZXRzKXtcbiAgICAgICAgICAgICAgICBjb25zdCBiZXRBdmFpbGFibGUgPSBkYXRhLmJldHMuc29tZShiZXQgPT57XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBiZXQubWF0Y2hOdW1iZXIgPT09IG1hdGNoTnVtYmVyXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhiZXRBdmFpbGFibGUpXG4gICAgICAgICAgICAgICAgY29uc3QgbGFzdFRlYW0xID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmVkaWN0X19sYXN0LXRlYW0udGVhbTFcIik7XG4gICAgICAgICAgICAgICAgY29uc3QgbGFzdFRlYW0yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmVkaWN0X19sYXN0LXRlYW0udGVhbTJcIik7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2NvcmVUZWFtMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2NvcmVUZWFtMVwiKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzY29yZVRlYW0yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zY29yZVRlYW0yXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpcnN0R29hbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJlZGljdF9fbGFzdC1jb3VudHJ5XCIpO1xuICAgICAgICAgICAgICAgIGlmKGJldEF2YWlsYWJsZSl7XG4gICAgICAgICAgICAgICAgICAgIGxhc3RQcmVkaWN0LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RCZXQgPSBnZXRMYXN0QmV0KGRhdGEuYmV0cywgbWF0Y2hOdW1iZXIpO1xuICAgICAgICAgICAgICAgICAgICBzY29yZVRlYW0xLnRleHRDb250ZW50ID0gbGFzdEJldC50ZWFtMSA9PT0gdW5kZWZpbmVkID8gXCItXCIgOmAke2xhc3RCZXQudGVhbTF9YDtcbiAgICAgICAgICAgICAgICAgICAgc2NvcmVUZWFtMi50ZXh0Q29udGVudCA9IGxhc3RCZXQudGVhbTIgPT09IHVuZGVmaW5lZCA/IFwiLVwiIDpgJHtsYXN0QmV0LnRlYW0yfWA7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGxhc3RCZXQpXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RCZXQuYmV0Q29uZmlybWVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByZWRpY3RfX2xhc3QtcmVzdWx0LnVuY29uZmlybWVkXCIpLmZvckVhY2goaXRlbSA9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcmVkaWN0X19sYXN0LXJlc3VsdC5jb25maXJtZWRcIikuZm9yRWFjaChpdGVtID0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByZWRpY3RfX2xhc3QtcmVzdWx0LnVuY29uZmlybWVkXCIpLmZvckVhY2goaXRlbSA9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcmVkaWN0X19sYXN0LXJlc3VsdC5jb25maXJtZWRcIikuZm9yRWFjaChpdGVtID0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAobGFzdEJldC5tYXRjaE51bWJlciA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFRlYW0xLnNldEF0dHJpYnV0ZShcImRhdGEtdHJhbnNsYXRlXCIsIFwic2hha2h0YXJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0VGVhbTIuc2V0QXR0cmlidXRlKFwiZGF0YS10cmFuc2xhdGVcIiwgXCJkeW5hbW9cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmKHNjb3JlMS5jbGFzc0xpc3QuY29udGFpbnMoXCJhY3RpdmVcIikpe1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmVkaWN0X19sYXN0LXNjb3JlXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByZWRpY3RfX2xhc3QtZ29hbFwiKS5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoZ29hbDEuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlXCIpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJlZGljdF9fbGFzdC1zY29yZVwiKS5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmVkaWN0X19sYXN0LWdvYWxcIikuY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIilcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmKGxhc3RCZXQuZmlyc3RHb2FsKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGxhc3RCZXQuZmlyc3RHb2FsID09PSBcInNoYWtodGFyXCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0R29hbC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXRyYW5zbGF0ZVwiLCBcInNoYWtodGFyXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobGFzdEJldC5maXJzdEdvYWwgPT09IFwiZHluYW1vXCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0R29hbC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXRyYW5zbGF0ZVwiLCBcImR5bmFtb1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGxhc3RCZXQuZmlyc3RHb2FsID09PSBcImRyYXdcIil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RHb2FsLnNldEF0dHJpYnV0ZShcImRhdGEtdHJhbnNsYXRlXCIsIFwiZHJhd1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGdvYWwxLmNsYXNzTGlzdC5jb250YWlucyhcImFjdGl2ZVwiKSB8fCBnb2FsMi5jbGFzc0xpc3QuY29udGFpbnMoXCJhY3RpdmVcIikpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJlZGljdF9fbGFzdFwiKS5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoIWJldEF2YWlsYWJsZSl7XG4gICAgICAgICAgICAgICAgICAgIGxhc3RQcmVkaWN0LmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgbGFzdFByZWRpY3QuY2xhc3NMaXN0LmFkZChcImhpZGVcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3I6JywgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgY29uc3QgSW5pdFBhZ2UgPSAoKSA9PiB7XG4gICAgICAgIGNoZWNrVXNlckF1dGgoKTtcbiAgICAgICAgcmVuZGVyVXNlcnMoKTtcbiAgICAgICAgdXBkYXRlVG9wRm9yZWNhc3RzKGN1cnJlbnRUYWIpXG4gICAgICAgIHJlZnJlc2hCZXRJbmZvKHVzZXJJZClcbiAgICB9XG5cbiAgICBsZXQgY2hlY2tVc2VyQXV0aCA9ICgpID0+IHtcbiAgICAgICAgaWYgKHVzZXJJZCkge1xuICAgICAgICAgICAgeW91QXJlSW5CdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKSk7XG4gICAgICAgICAgICB1bmF1dGhNc2dzLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGxldCB5b3VBcmVJbkJ0biBvZiB5b3VBcmVJbkJ0bnMpIHtcbiAgICAgICAgICAgICAgICB5b3VBcmVJbkJ0bi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHVuYXV0aE1lcyBvZiB1bmF1dGhNc2dzKSB7XG4gICAgICAgICAgICAgICAgdW5hdXRoTWVzLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBwbGFjZUJldChiZXQpIHtcbiAgICAgICAgaWYgKCF1c2VySWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhiZXQpXG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmVkaWN0X19jb250YWluZXIuYWN0aXZlXCIpXG4gICAgICAgICAgICAucXVlcnlTZWxlY3RvckFsbCgnLnByZWRpY3RfX3RlYW0taW5jcmVhc2UsIC5wcmVkaWN0X190ZWFtLWRlY3JlYXNlJylcbiAgICAgICAgICAgIC5mb3JFYWNoKGJ0biA9PiB7XG4gICAgICAgICAgICAgICAgc2NvcmVJbml0KGJ0bik7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBhY3RpdmVUYWJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5nb2FsQ29udFwiKVxuICAgICAgICAvLyBjb25zdCBhY3RpdmVJbnB1dCA9IGFjdGl2ZVRhYi5xdWVyeVNlbGVjdG9yKFwiLnByZWRpY3RfX3JhZGlvLWl0ZW0gaW5wdXRcIilcblxuXG5cbiAgICAgICAgbGV0IHJlcSA9IHtcbiAgICAgICAgICAgIG1hdGNoTnVtYmVyOiBiZXQubWF0Y2hOdW1iZXIsXG4gICAgICAgICAgICB1c2VyaWQ6IGJldC51c2VyaWQsXG4gICAgICAgIH07XG5cblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhhY3RpdmVUYWJzKVxuICAgICAgICBmb3IgKGNvbnN0IHRhYiBvZiBhY3RpdmVUYWJzKSB7XG4gICAgICAgICAgICBpZiAodGFiLmNsYXNzTGlzdC5jb250YWlucyhcImFjdGl2ZVwiKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFjdGl2ZUlucHV0ID0gdGFiLnF1ZXJ5U2VsZWN0b3IoXCIucHJlZGljdF9fcmFkaW8taXRlbS5fYWN0aXZlIGlucHV0XCIpO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRhYilcblxuICAgICAgICAgICAgICAgIGlmIChhY3RpdmVJbnB1dCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhhY3RpdmVJbnB1dClcbiAgICAgICAgICAgICAgICAgICAgcmVxLmZpcnN0R29hbCA9IGFjdGl2ZUlucHV0LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG5cbiAgICAgICAgaWYgKGJldC5maXJzdEdvYWxVcGRhdGVkKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhiZXQuZmlyc3RHb2FsKVxuICAgICAgICAgICAgcmVxLmZpcnN0R29hbCA9IGJldC5maXJzdEdvYWw7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChiZXQuZ29hbHNVcGRhdGVkKSB7XG4gICAgICAgICAgICByZXEudGVhbTEgPSBiZXQudGVhbTE7XG4gICAgICAgICAgICByZXEudGVhbTIgPSBiZXQudGVhbTI7XG4gICAgICAgIH1cblxuXG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coYWN0aXZlSW5wdXQpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhhY3RpdmVUYWIpXG5cblxuICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwiY3VycmVudEJldFwiLCBKU09OLnN0cmluZ2lmeShyZXEpKVxuXG4gICAgICAgIGNvbnNvbGUubG9nKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJjdXJyZW50QmV0XCIpKVxuXG4gICAgICAgIHJlcXVlc3QoJy9iZXQnLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGJvZHk6IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJjdXJyZW50QmV0XCIpXG4gICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdCZXQgcGxhY2VkOicsIHJlcyk7XG4gICAgICAgICAgICAgICAgSW5pdFBhZ2UoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcignRXJyb3IgcGxhY2luZyBiZXQ6JywgZXJyb3IpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2FkVHJhbnNsYXRpb25zKCkge1xuICAgICAgICByZXR1cm4gZmV0Y2goYCR7YXBpVVJMfS9uZXctdHJhbnNsYXRlcy8ke2xvY2FsZX1gKS50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgICAgICAgICAgLnRoZW4oanNvbiA9PiB7XG4gICAgICAgICAgICAgICAgaTE4bkRhdGEgPSBqc29uO1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZSgpO1xuICAgICAgICAgICAgICAgIHZhciBtdXRhdGlvbk9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKG11dGF0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBtdXRhdGlvbk9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dvYWxzLW9yLXplcm9zJyksIHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlKCkge1xuICAgICAgICBjb25zdCBlbGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRyYW5zbGF0ZV0nKVxuICAgICAgICBpZih0cmFuc2xhdGVTdGF0ZSl7XG4gICAgICAgICAgICBlbGVtcy5mb3JFYWNoKGVsZW0gPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IGVsZW0uZ2V0QXR0cmlidXRlKCdkYXRhLXRyYW5zbGF0ZScpO1xuICAgICAgICAgICAgICAgIGVsZW0uaW5uZXJIVE1MID0gaTE4bkRhdGFba2V5XSB8fCAnKi0tLS1ORUVEIFRPIEJFIFRSQU5TTEFURUQtLS0tKiAgIGtleTogICcgKyBrZXk7XG4gICAgICAgICAgICAgICAgZWxlbS5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtdHJhbnNsYXRlJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidHJhbnNsYXRpb24gd29yayFcIilcbiAgICAgICAgfVxuICAgICAgICByZWZyZXNoTG9jYWxpemVkQ2xhc3MobWFpblBhZ2UpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hMb2NhbGl6ZWRDbGFzcyhlbGVtZW50KSB7XG4gICAgICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgbGFuZyBvZiBbJ3VrJywgJ2VuJ10pIHtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShsYW5nKTtcbiAgICAgICAgfVxuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQobG9jYWxlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICBpbml0Q2xpY2tUcmFja2luZygpXG4gICAgICAgIGlmKCFjdXJyZW50QmV0KXtcbiAgICAgICAgICAgIGN1cnJlbnRCZXQgPSBuZXcgQmV0KHVzZXJJZCwgbWF0Y2hOdW1iZXIpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHdpbmRvdy5zdG9yZSkge1xuICAgICAgICAgICAgdmFyIHN0YXRlID0gd2luZG93LnN0b3JlLmdldFN0YXRlKCk7XG4gICAgICAgICAgICB1c2VySWQgPSBzdGF0ZS5hdXRoLmlzQXV0aG9yaXplZCAmJiBzdGF0ZS5hdXRoLmlkIHx8ICcnO1xuICAgICAgICAgICAgLy8gY3VycmVudEJldCA9IG5ldyBCZXQodXNlcklkLCBtYXRjaE51bWJlcilcbiAgICAgICAgICAgIEluaXRQYWdlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgYyA9IDA7XG4gICAgICAgICAgICB2YXIgaSA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoYyA8IDUwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghIXdpbmRvdy5nX3VzZXJfaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJZCA9IHdpbmRvdy5nX3VzZXJfaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBJbml0UGFnZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMjAwKTtcblxuICAgICAgICB9XG4gICAgICAgIEluaXRQYWdlKClcbiAgICAgICAgcGxhY2VCZXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjbGlja1wiKVxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgaWYoY3VycmVudEJldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudEJldCA9IG5ldyBCZXQodXNlcklkLCBtYXRjaE51bWJlcilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBsYWNlQmV0KGN1cnJlbnRCZXQpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gdXBkYXRlU2NvcmUobWF0Y2hOdW1iZXIsIHRlYW0xR29hbHMsIHRlYW0yR29hbHMpIHtcbiAgICAgICAgaWYgKGN1cnJlbnRCZXQgJiYgY3VycmVudEJldC5tYXRjaE51bWJlciA9PT0gbWF0Y2hOdW1iZXIpIHtcbiAgICAgICAgICAgIGN1cnJlbnRCZXQudXBkYXRlR29hbHModGVhbTFHb2FscywgdGVhbTJHb2Fscyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjdXJyZW50QmV0ID0gbmV3IEJldCh1c2VySWQsIG1hdGNoTnVtYmVyLCB0ZWFtMUdvYWxzLCB0ZWFtMkdvYWxzKTtcbiAgICAgICAgICAgIGN1cnJlbnRCZXQudXBkYXRlR29hbHModGVhbTFHb2FscywgdGVhbTJHb2Fscyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5sb2coY3VycmVudEJldCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHVwZGF0ZUZpcnN0R29hbChtYXRjaE51bWJlciwgZmlyc3RHb2FsKSB7XG4gICAgICAgIGlmIChjdXJyZW50QmV0ICYmIGN1cnJlbnRCZXQubWF0Y2hOdW1iZXIgPT09IG1hdGNoTnVtYmVyKSB7XG4gICAgICAgICAgICBjdXJyZW50QmV0LnVwZGF0ZUZpcnN0R29hbChmaXJzdEdvYWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coY3VycmVudEJldCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHVwZGF0ZVRvcEZvcmVjYXN0cyhtYXRjaE51bWJlcikge1xuICAgICAgICByZXF1ZXN0KGAvdXNlcnMvJHttYXRjaE51bWJlcn1gKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YS50b3BGb3JlY2FzdHMpOyAvLyDQn9C10YDQtdCy0ZbRgNC60LAg0L7RgtGA0LjQvNCw0L3QuNGFINC00LDQvdC40YVcblxuICAgICAgICAgICAgY29uc3QgZm9yZWNhc3RzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX2ZvcmVjYXN0cycpO1xuICAgICAgICAgICAgZm9yZWNhc3RzQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuXG5cbiAgICAgICAgICAgIGRhdGEudG9wRm9yZWNhc3RzLmZvckVhY2goZm9yZWNhc3QgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvcmVjYXN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIGZvcmVjYXN0SXRlbS5jbGFzc0xpc3QuYWRkKCdwcmVkaWN0X19mb3JlY2FzdHMtaXRlbScpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgcGVyY2VudGFnZSA9IHBhcnNlRmxvYXQoZm9yZWNhc3QucGVyY2VudGFnZSkudG9GaXhlZCgxKTtcbiAgICAgICAgICAgICAgICBjb25zdCBwZXJjZW50YWdlU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgICAgICBwZXJjZW50YWdlU3Bhbi50ZXh0Q29udGVudCA9IGAke3BlcmNlbnRhZ2V9JWA7XG5cblxuICAgICAgICAgICAgICAgIGNvbnN0IGZvcmVjYXN0VGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGAgJHtmb3JlY2FzdC5mb3JlY2FzdCA/PyBcIjAtMFwifWApO1xuICAgICAgICAgICAgICAgIGZvcmVjYXN0SXRlbS5hcHBlbmRDaGlsZChwZXJjZW50YWdlU3Bhbik7XG4gICAgICAgICAgICAgICAgZm9yZWNhc3RJdGVtLmFwcGVuZENoaWxkKGZvcmVjYXN0VGV4dCk7XG5cbiAgICAgICAgICAgICAgICBmb3JlY2FzdHNDb250YWluZXIuYXBwZW5kQ2hpbGQoZm9yZWNhc3RJdGVtKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyB0b3AgZm9yZWNhc3RzOicsIGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlbmRlclVzZXJzKCkge1xuICAgICAgICByZXF1ZXN0KGAvdXNlcnMvJHtjdXJyZW50VGFiVGFibGV9YClcbiAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xuXG4gICAgICAgICAgICAgICAgbGV0IHVzZXJzID0gZGF0YS51c2Vyc1xuXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codXNlcnMpXG4gICAgICAgICAgICAgICAgY29uc3QgaXNTY29yZVRhYkFjdGl2ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X190YWJzLXNjb3JlLmFjdGl2ZScpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzR29hbFRhYkFjdGl2ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X190YWJzLWdvYWwuYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICBpZih1c2Vycy5sZW5ndGggPj0gNTApe1xuICAgICAgICAgICAgICAgICAgICBzaG93VG9wRm9yZWNhc3QgPSB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKHVzZXJzLmxlbmd0aCA8IDUwKXtcbiAgICAgICAgICAgICAgICAgICAgc2hvd1RvcEZvcmVjYXN0ID0gZmFsc2VcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNTY29yZVRhYkFjdGl2ZSAmJiBzaG93VG9wRm9yZWNhc3QpIHRvcEZvcmVjYXN0LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpXG4gICAgICAgICAgICAgICAgaWYgKGlzR29hbFRhYkFjdGl2ZSkgdG9wRm9yZWNhc3QuY2xhc3NMaXN0LmFkZChcImhpZGVcIilcblxuXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codHlwZW9mIHVzZXJJZClcblxuICAgICAgICAgICAgICAgIHBvcHVsYXRlVXNlcnNUYWJsZSh1c2VycywgdXNlcklkLCBjdXJyZW50VGFiVGFibGUpXG5cbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh1c2VycylcbiAgICAgICAgICAgIH0pO1xuXG4gICAgfVxuICAgIGZ1bmN0aW9uIHBvcHVsYXRlVXNlcnNUYWJsZSh1c2VycywgY3VycmVudFVzZXJJZCwgbWF0Y2hOdW1iZXIpIHtcbiAgICAgICAgcmVzdWx0c1RhYmxlLmlubmVySFRNTCA9ICcnO1xuICAgICAgICByZXN1bHRzVGFibGVPdGhlci5pbm5lckhUTUwgPSAnJztcblxuICAgICAgICBpZiAoIXVzZXJzIHx8ICF1c2Vycy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICAvLyAvLyDQpNGW0LvRjNGC0YDRg9GU0LzQviDQutC+0YDQuNGB0YLRg9Cy0LDRh9GW0LIsINGP0LrRliDQt9GA0L7QsdC40LvQuCDRgdGC0LDQstC60YMg0L3QsCDQstC60LDQt9Cw0L3QuNC5INC80LDRgtGHXG4gICAgICAgIC8vIGNvbnN0IHVzZXJzID0gdXNlcnMuZmlsdGVyKHVzZXIgPT5cbiAgICAgICAgLy8gICAgIHVzZXIuYmV0cy5zb21lKGJldCA9PiBiZXQubWF0Y2hOdW1iZXIgPT09IG1hdGNoTnVtYmVyKVxuICAgICAgICAvLyApO1xuXG4gICAgICAgIC8vIGlmICghdXNlcnMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgLy8g0JfQvdCw0YXQvtC00LjQvNC+INC/0L7RgtC+0YfQvdC+0LPQviDQutC+0YDQuNGB0YLRg9Cy0LDRh9CwXG4gICAgICAgIGNvbnN0IGN1cnJlbnRVc2VyID0gdXNlcnMuZmluZCh1c2VyID0+IHVzZXIudXNlcmlkID09PSBjdXJyZW50VXNlcklkKTtcblxuICAgICAgICAvLyDQktC40LLQvtC00LjQvNC+INCy0YHRltGFINGW0L3RiNC40YUg0LrQvtGA0LjRgdGC0YPQstCw0YfRltCyINGDIHJlc3VsdHNUYWJsZVxuICAgICAgICB1c2Vycy5mb3JFYWNoKHVzZXIgPT4ge1xuICAgICAgICAgICAgaWYgKHVzZXIudXNlcmlkICE9PSBjdXJyZW50VXNlcklkKSB7XG4gICAgICAgICAgICAgICAgZGlzcGxheVVzZXIodXNlciwgZmFsc2UsIHJlc3VsdHNUYWJsZSwgdXNlcnMsIG1hdGNoTnVtYmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8g0JLQuNCy0L7QtNC40LzQviDQv9C+0YLQvtGH0L3QvtCz0L4g0LrQvtGA0LjRgdGC0YPQstCw0YfQsCDQsiByZXN1bHRzVGFibGVPdGhlclxuICAgICAgICBpZiAoY3VycmVudFVzZXIpIHtcbiAgICAgICAgICAgIGRpc3BsYXlVc2VyKGN1cnJlbnRVc2VyLCB0cnVlLCByZXN1bHRzVGFibGVPdGhlciwgdXNlcnMsIG1hdGNoTnVtYmVyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBkaXNwbGF5VXNlcih1c2VyLCBpc0N1cnJlbnRVc2VyLCB0YWJsZSwgYWxsVXNlcnMsIG1hdGNoTnVtYmVyKSB7XG4gICAgICAgIGxldCBtYXRjaERhdGU7XG5cbiAgICAgICAgaWYgKG1hdGNoTnVtYmVyID09PSAxKSB7XG4gICAgICAgICAgICBtYXRjaERhdGUgPSBGSVJTVF9NQVRDSF9EQVRFO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYWRkaXRpb25hbFVzZXJSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuY2xhc3NMaXN0LmFkZCgndGFibGVfX3JvdycpO1xuXG4gICAgICAgIGFkZGl0aW9uYWxVc2VyUm93LmlubmVySFRNTCA9IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlX19yb3ctaXRlbVwiPiR7aXNDdXJyZW50VXNlciA/IHVzZXIudXNlcmlkIDogbWFza1VzZXJJZCh1c2VyLnVzZXJpZCl9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZV9fcm93LWl0ZW1cIj5cbiAgICAgICAgICAgICR7Y3VycmVudERhdGUgPj0gbWF0Y2hEYXRlID9cbiAgICAgICAgICAgIGA8c3Bhbj4ke3VzZXIudGVhbTEgIT09IHVuZGVmaW5lZCAmJiB1c2VyLnRlYW0xICE9PSBudWxsID8gdXNlci50ZWFtMSA6IFwiLVwifTwvc3Bhbj48aW1nIHNyYz1cImh0dHBzOi8vZmF2LXByb20uY29tL2h0bWwvZ29hbHMtb3ItemVyb2VzL2ltZy92cy5wbmdcIiBhbHQ9XCJ2c1wiPjxzcGFuPiR7dXNlci50ZWFtMiAhPT0gdW5kZWZpbmVkICYmIHVzZXIudGVhbTIgIT09IG51bGwgPyB1c2VyLnRlYW0yIDogXCItXCJ9PC9zcGFuPmAgOlxuICAgICAgICAgICAgYDxzcGFuPioqPC9zcGFuPjxpbWcgc3JjPVwiaHR0cHM6Ly9mYXYtcHJvbS5jb20vaHRtbC9nb2Fscy1vci16ZXJvZXMvaW1nL3ZzLnBuZ1wiIGFsdD1cInZzXCI+PHNwYW4+Kio8L3NwYW4+YFxuICAgICAgICB9XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgICR7dXNlci53aW5uZXIgPT09IHRydWUgID9cbiAgICAgICAgICAgIGA8ZGl2IGNsYXNzPVwidGFibGVfX3Jvdy1pdGVtXCIgZGF0YS10cmFuc2xhdGU9XCJwcml6ZVwiPioqKioqPC9kaXY+YCA6XG4gICAgICAgICAgICBgPGRpdiBjbGFzcz1cInRhYmxlX19yb3ctaXRlbVwiIGRhdGEtdHJhbnNsYXRlPVwibm9XaW5uZXJzXCI+KioqKio8L2Rpdj5gXG4gICAgICAgIH1cblxuICAgICAgICAke3VzZXIuYm9udXNGaXJzdEdvYWwgPT09IHRydWUgID9cbiAgICAgICAgICAgIGA8ZGl2IGNsYXNzPVwidGFibGVfX3Jvdy1pdGVtXCIgZGF0YS10cmFuc2xhdGU9XCJzczUwMFwiPioqKioqPC9kaXY+YCA6XG4gICAgICAgICAgICBgPGRpdiBjbGFzcz1cInRhYmxlX19yb3ctaXRlbVwiIGRhdGEtdHJhbnNsYXRlPVwibm9XaW5uZXJzXCI+KioqKio8L2Rpdj5gXG4gICAgICAgIH1cbiAgICBgO1xuXG4gICAgICAgIGlmIChpc0N1cnJlbnRVc2VyKSB7XG4gICAgICAgICAgICBhZGRpdGlvbmFsVXNlclJvdy5jbGFzc0xpc3QuYWRkKFwieW91XCIpO1xuICAgICAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlX19yb3ctaXRlbVwiPiR7aXNDdXJyZW50VXNlciA/IHVzZXIudXNlcmlkIDogbWFza1VzZXJJZCh1c2VyLnVzZXJpZCl9PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVfX3Jvdy1pdGVtXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4+JHt1c2VyLnRlYW0xICE9PSB1bmRlZmluZWQgJiYgdXNlci50ZWFtMSAhPT0gbnVsbCA/IHVzZXIudGVhbTEgOiBcIi1cIn08L3NwYW4+PGltZyBzcmM9XCJodHRwczovL2Zhdi1wcm9tLmNvbS9odG1sL2dvYWxzLW9yLXplcm9lcy9pbWcvdnMucG5nXCIgYWx0PVwidnNcIj48c3Bhbj4ke3VzZXIudGVhbTIgIT09IHVuZGVmaW5lZCAmJiB1c2VyLnRlYW0yICE9PSBudWxsID8gdXNlci50ZWFtMiA6IFwiLVwifTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgJHt1c2VyLndpbm5lciA9PT0gdHJ1ZSAgP1xuICAgICAgICAgICAgICAgIGA8ZGl2IGNsYXNzPVwidGFibGVfX3Jvdy1pdGVtXCIgZGF0YS10cmFuc2xhdGU9XCJwcml6ZVwiPioqKioqPC9kaXY+YCA6XG4gICAgICAgICAgICAgICAgYDxkaXYgY2xhc3M9XCJ0YWJsZV9fcm93LWl0ZW1cIiBkYXRhLXRyYW5zbGF0ZT1cIm5vV2lubmVyc1wiPioqKioqPC9kaXY+YFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAke3VzZXIuYm9udXNGaXJzdEdvYWwgPT09IHRydWUgID9cbiAgICAgICAgICAgICAgICBgPGRpdiBjbGFzcz1cInRhYmxlX19yb3ctaXRlbVwiIGRhdGEtdHJhbnNsYXRlPVwic3M1MDBcIj4qKioqKjwvZGl2PmAgOlxuICAgICAgICAgICAgICAgIGA8ZGl2IGNsYXNzPVwidGFibGVfX3Jvdy1pdGVtXCIgZGF0YS10cmFuc2xhdGU9XCJub1dpbm5lcnNcIj4qKioqKjwvZGl2PmBcbiAgICAgICAgICAgIH1cbiAgICAgICAgYDtcbiAgICAgICAgICAgIGNvbnN0IHlvdUJsb2NrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB5b3VCbG9jay5jbGFzc0xpc3QuYWRkKCd0YWJsZV9fcm93LXlvdScpO1xuICAgICAgICAgICAgeW91QmxvY2suc2V0QXR0cmlidXRlKCdkYXRhLXRyYW5zbGF0ZScsICd0YWJsZVlvdScpO1xuICAgICAgICAgICAgLy8geW91QmxvY2sudGV4dENvbnRlbnQgPSBcIllvdVwiO1xuICAgICAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuaW5zZXJ0QmVmb3JlKHlvdUJsb2NrLCBhZGRpdGlvbmFsVXNlclJvdy5jaGlsZHJlblsxXSk7XG4gICAgICAgIH1cblxuICAgICAgICB0YWJsZS5hcHBlbmQoYWRkaXRpb25hbFVzZXJSb3cpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBtYXNrVXNlcklkKHVzZXJJZCkge1xuICAgICAgICByZXR1cm4gXCIqKlwiICsgdXNlcklkLnRvU3RyaW5nKCkuc2xpY2UoMik7XG4gICAgfVxuXG4gICAgLy8gM0QgYW5pbVxuICAgIGNvbnN0IGNhcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50ZWFtLCAuYW5pbUNhcmQsIC5hbmltUmlnaHRcIik7IC8vINCU0L7QsdCw0LLQu9GP0LXQvCAuYW5pbVJpZ2h0XG4gICAgbGV0IGFuZ2xlID0gMDtcblxuICAgIGZ1bmN0aW9uIGFuaW1hdGVDYXJkcygpIHtcbiAgICAgICAgYW5nbGUgKz0gMC45OyAvLyBzcGVlZFxuICAgICAgICBjb25zdCByb3RhdGVYID0gTWF0aC5zaW4oYW5nbGUgKiAoTWF0aC5QSSAvIDE4MCkpICogMTA7IC8vINCa0L7Qu9C10LHQsNC90LjQtSDQv9C+IFhcbiAgICAgICAgY29uc3Qgcm90YXRlWSA9IE1hdGguY29zKGFuZ2xlICogKE1hdGguUEkgLyAxODApKSAqIDEwOyAvLyDQmtC+0LvQtdCx0LDQvdC40LUg0L/QviBZXG5cbiAgICAgICAgY2FyZHMuZm9yRWFjaChjYXJkID0+IHtcbiAgICAgICAgICAgIGlmIChjYXJkLmNsYXNzTGlzdC5jb250YWlucyhcImFuaW1SaWdodFwiKSkge1xuICAgICAgICAgICAgICAgIGNhcmQuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZVkoJHstcm90YXRlWX1kZWcpIHJvdGF0ZVgoJHstcm90YXRlWH1kZWcpYDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2FyZC5zdHlsZS50cmFuc2Zvcm0gPSBgcm90YXRlWSgke3JvdGF0ZVl9ZGVnKSByb3RhdGVYKCR7cm90YXRlWH1kZWcpYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGVDYXJkcyk7XG4gICAgfVxuICAgIGFuaW1hdGVDYXJkcygpO1xuXG4gICAgLy8gcHJlZGljdCB0YWJzXG4gICAgY29uc3QgdGFicyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcmVkaWN0X190YWJzLWdsb2JhbCA+IGRpdiwgLnByZWRpY3RfX3RhYnMtZGF0ZXMgPiBkaXYnKTtcbiAgICBjb25zdCBjb250YWluZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByZWRpY3RfX2NvbnRhaW5lcicpO1xuXG4gICAgZnVuY3Rpb24gaGFuZGxlVGFiQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgbGV0IG1hdGNoRGF0ZTtcbiAgICAgICAgbGV0IGN1cnJlbnRNYXRjaCA9IDFcblxuICAgICAgICBjb25zdCBjbGlja2VkVGFiID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoXCIucHJlZGljdF9fdGFicy1kYXRlXCIpIHx8IGV2ZW50LnRhcmdldC5jbG9zZXN0KFwiLnByZWRpY3RfX3RhYnMtZ29hbFwiKSB8fCBldmVudC50YXJnZXQuY2xvc2VzdChcIi5wcmVkaWN0X190YWJzLXNjb3JlXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhjbGlja2VkVGFiKVxuICAgICAgICBjb25zdCB0YWJQYWlyID0gY2xpY2tlZFRhYi5jbG9zZXN0KCcucHJlZGljdF9fdGFicy1nbG9iYWwnKSB8fCBjbGlja2VkVGFiLmNsb3Nlc3QoJy5wcmVkaWN0X190YWJzLWRhdGVzJyk7XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coY2xpY2tlZFRhYilcblxuICAgICAgICBpZihjdXJyZW50TWF0Y2ggPT09IDEpe1xuICAgICAgICAgICAgbWF0Y2hEYXRlID0gRklSU1RfTUFUQ0hfREFURVxuICAgICAgICB9XG4gICAgICAgIGlmKGN1cnJlbnREYXRlID4gbWF0Y2hEYXRlKXtcbiAgICAgICAgICAgIHBsYWNlQmV0QnRuLmNsYXNzTGlzdC5hZGQoXCJfbG9ja1wiKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHBsYWNlQmV0QnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJfbG9ja1wiKVxuICAgICAgICB9XG5cblxuICAgICAgICBpZiAoY2xpY2tlZFRhYi5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSByZXR1cm47XG4gICAgICAgIGlmICh0YWJQYWlyKSB7XG4gICAgICAgICAgICBjb25zdCBwYWlyID0gdGFiUGFpci5xdWVyeVNlbGVjdG9yQWxsKCcuYWN0aXZlJyk7XG4gICAgICAgICAgICBpZiAocGFpci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgcGFpclswXS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNsaWNrZWRUYWIuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgIHVwZGF0ZUNvbnRhaW5lcnMoKTtcbiAgICAgICAgLy8gcmVmcmVzaEJldEluZm8odXNlcklkKVxuICAgICAgICBpZihjbGlja2VkVGFiLmNsb3Nlc3QoJy5wcmVkaWN0X190YWJzLXNjb3JlJykpe1xuICAgICAgICAgICAgdXBkYXRlVG9wRm9yZWNhc3RzKGN1cnJlbnRNYXRjaClcbiAgICAgICAgICAgIGN1cnJlbnRCZXQgPSBuZXcgQmV0KHVzZXJJZCwgY3VycmVudE1hdGNoKVxuICAgICAgICAgICAgbWF0Y2hOdW1iZXIgPSAxXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByZWRpY3RfX3RlYW0tbnVtYmVyXCIpLmZvckVhY2goKHNjb3JlLCBpKSA9PntcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhtYXRjaERhdGUsIG1hdGNoTnVtYmVyKVxuICAgICAgICAgICAgICAgIGlmKGN1cnJlbnREYXRlID4gbWF0Y2hEYXRlICYmIGkgPT09IDEgJiYgbWF0Y2hOdW1iZXIgPT09IDEpe1xuICAgICAgICAgICAgICAgICAgICBzY29yZS50ZXh0Q29udGVudCA9IFwiMFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYoY3VycmVudERhdGUgPiBtYXRjaERhdGUgJiYgaSA9PT0gMCAmJiBtYXRjaE51bWJlciA9PT0gMSl7XG4gICAgICAgICAgICAgICAgICAgIHNjb3JlLnRleHRDb250ZW50ID0gXCIwXCJcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFt0eXBlPVwicmFkaW9cIl06Y2hlY2tlZCcpLmZvckVhY2goYnV0dG9uID0+IHtcbiAgICAgICAgICAgICAgICBidXR0b24uY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuICAgICAgICBsb2NrTWF0Y2hDb250YWluZXIoRklSU1RfTUFUQ0hfREFURSwgMSk7IC8vINCU0LvRjyDQv9C10YDRiNC+0LPQviDQvNCw0YLRh9GDXG4gICAgfVxuXG4gICAgdGFicy5mb3JFYWNoKHRhYiA9PiB0YWIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVUYWJDbGljaykpO1xuXG4gICAgZnVuY3Rpb24gdXBkYXRlQ29udGFpbmVycygpIHtcbiAgICAgICAgY29udGFpbmVycy5mb3JFYWNoKGNvbnRhaW5lciA9PiBjb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xuICAgICAgICByZWZyZXNoQmV0SW5mbyh1c2VySWQpXG4gICAgICAgIGNvbnN0IGlzU2NvcmVUYWJBY3RpdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fdGFicy1zY29yZS5hY3RpdmUnKTtcbiAgICAgICAgY29uc3QgaXNHb2FsVGFiQWN0aXZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX3RhYnMtZ29hbC5hY3RpdmUnKTtcblxuXG4gICAgICAgIGlmIChpc1Njb3JlVGFiQWN0aXZlKSB7XG4gICAgICAgICAgICB0b3BGb3JlY2FzdC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVwiKVxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX2NvbnRhaW5lci5zY29yZS0xJykuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fdGFicy10eHQtMicpLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X190YWJzLXR4dC0xJykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzR29hbFRhYkFjdGl2ZSkge1xuICAgICAgICAgICAgdG9wRm9yZWNhc3QuY2xhc3NMaXN0LmFkZChcImhpZGVcIilcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X190YWJzLXR4dC0xJykuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX3RhYnMtdHh0LTInKS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fY29udGFpbmVyLmdvYWwtMScpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy9zY29yZVxuXG4gICAgZnVuY3Rpb24gc2NvcmVJbml0KGJ0bil7XG4gICAgICAgIGNvbnN0IHRlYW1Db250cm9sID0gYnRuLmNsb3Nlc3QoJy5wcmVkaWN0X190ZWFtLWNvbnRyb2wnKTtcbiAgICAgICAgY29uc3QgdGVhbU51bWJlciA9IHRlYW1Db250cm9sLnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X190ZWFtLW51bWJlcicpXG4gICAgICAgIGNvbnN0IG1hdGNoQ29udGFpbmVyID0gYnRuLmNsb3Nlc3QoJy5wcmVkaWN0X19jb250YWluZXInKTtcbiAgICAgICAgY29uc3QgbWF0Y2hOdW1iZXIgPSBwYXJzZUludChtYXRjaENvbnRhaW5lci5kYXRhc2V0Lm1hdGNoTnVtYmVyKTtcblxuICAgICAgICBjb25zdCBnZXRHb2FscyA9ICh0ZWFtKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gbWF0Y2hDb250YWluZXIucXVlcnlTZWxlY3RvcihgW2RhdGEtdGVhbT1cIiR7dGVhbX1cIl0gLnByZWRpY3RfX3RlYW0tbnVtYmVyYCk7XG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudCA/IE51bWJlcihlbGVtZW50LnRleHRDb250ZW50KSB8fCAwIDogMDtcbiAgICAgICAgfTtcblxuXG4gICAgICAgIGNvbnN0IHRlYW0xR29hbHMgPSBnZXRHb2FscygndGVhbTEnKSA7XG4gICAgICAgIGNvbnN0IHRlYW0yR29hbHMgPSBnZXRHb2FscygndGVhbTInKTtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0ZWFtMUdvYWxzLCB0ZWFtMkdvYWxzKVxuXG4gICAgICAgIHVwZGF0ZVNjb3JlKG1hdGNoTnVtYmVyLCB0ZWFtMUdvYWxzLCB0ZWFtMkdvYWxzKTtcbiAgICB9XG5cbiAgICAvL3RhYmxlIHRhYnNcbiAgICAvLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFibGVfX3RhYnMtZGF0ZScpLmZvckVhY2godGFiID0+IHtcbiAgICAvLyAgICAgdGFiLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgLy8gICAgICAgICBpZiAodGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XG4gICAgLy8gICAgICAgICAgICAgcmV0dXJuO1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYmxlX190YWJzLWRhdGUnKS5mb3JFYWNoKHRhYiA9PiB0YWIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xuICAgIC8vICAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAvLyAgICAgICAgIGN1cnJlbnRUYWJUYWJsZSA9IE51bWJlcihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhYmxlX190YWJzLWRhdGUuYWN0aXZlXCIpLmdldEF0dHJpYnV0ZShcImRhdGEtbWF0Y2gtbnVtYmVyXCIpKVxuICAgIC8vICAgICAgICAgcmVuZGVyVXNlcnMoKTtcbiAgICAvLyAgICAgfSk7XG4gICAgLy8gfSk7XG5cblxuICAgIC8vcG9wdXBzXG5cbiAgICBmdW5jdGlvbiBzZXRQb3B1cHModHJpZ2dlckJ1dHRvbnMsIHBvcHVwQ2xhc3MpIHtcbiAgICAgICAgY29uc3QgcG9wdXBzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwcycpO1xuICAgICAgICBjb25zdCBwb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5wb3B1cHNfX2l0ZW0uJHtwb3B1cENsYXNzfWApO1xuICAgICAgICBjb25zdCBwb3B1cEJ0biA9IHBvcHVwc0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwc19faXRlbS1idG5cIilcblxuXG4gICAgICAgIGlmICghdHJpZ2dlckJ1dHRvbnMgfHwgIXBvcHVwIHx8ICFwb3B1cHNDb250YWluZXIpIHJldHVybjtcblxuICAgICAgICB0cmlnZ2VyQnV0dG9ucy5mb3JFYWNoKHRyaWdnZXJCdXR0b24gPT4ge1xuICAgICAgICAgICAgdHJpZ2dlckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBwb3B1cHNDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnX29wYWNpdHknKTtcbiAgICAgICAgICAgICAgICBwb3B1cHNDb250YWluZXIuY2xhc3NMaXN0LmFkZChwb3B1cENsYXNzKTtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgY2xvc2VCdXR0b24gPSBwb3B1cC5xdWVyeVNlbGVjdG9yKCcucG9wdXBzX19pdGVtLWNsb3NlJyk7XG4gICAgICAgIGNvbnN0IGJ0bkNsb3NlID0gcG9wdXAucXVlcnlTZWxlY3RvcignLmJ0bi1jbG9zZScpO1xuXG4gICAgICAgIHBvcHVwc0NvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgICAgIGlmIChlLnRhcmdldCA9PT0gcG9wdXBzQ29udGFpbmVyIHx8IGUudGFyZ2V0ID09PSBjbG9zZUJ1dHRvbiB8fCBlLnRhcmdldCA9PT0gYnRuQ2xvc2UpIHtcbiAgICAgICAgICAgICAgICBjbG9zZVBvcHVwKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZ1bmN0aW9uIGNsb3NlUG9wdXAoKSB7XG4gICAgICAgICAgICBwb3B1cHNDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnX29wYWNpdHknKTtcbiAgICAgICAgICAgIHBvcHVwc0NvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKHBvcHVwQ2xhc3MpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICcnO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHBvcHVwQnRuKVxuICAgICAgICBwb3B1cEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+e1xuICAgICAgICAgICAgY2xvc2VQb3B1cCgpXG4gICAgICAgIH0pXG5cbiAgICB9XG5cbiAgICBzZXRQb3B1cHMoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdpZGVfX2xpc3QtYnRuJyksICdnaWRlUG9wdXAnKTtcbiAgICBzZXRQb3B1cHMoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByZWRpY3RfX2J0bi50b29rLXBhcnQnKSwgJ19jb25maXJtUG9wdXAnKTtcblxuICAgIC8vZ28gdG8gcHJlZGljdFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9QcmVkaWN0XCIpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCB0YXJnZXRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmVkaWN0XCIpO1xuICAgICAgICBjb25zdCB0YXJnZXRQb3NpdGlvbiA9IHRhcmdldEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgd2luZG93LnBhZ2VZT2Zmc2V0IC0gMjtcblxuICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oe1xuICAgICAgICAgICAgdG9wOiB0YXJnZXRQb3NpdGlvbixcbiAgICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJyxcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCByYWRpb0NvbnRhaW5lcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJlZGljdF9fcmFkaW8nKTtcblxuICAgIHJhZGlvQ29udGFpbmVycy5mb3JFYWNoKGNvbnRhaW5lciA9PiB7XG4gICAgICAgIGNvbnN0IHJhZGlvSW5wdXRzID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcmVkaWN0X19yYWRpby1pdGVtJyk7XG5cbiAgICAgICAgcmFkaW9JbnB1dHMuZm9yRWFjaCgocmFkaW8pID0+IHtcbiAgICAgICAgICAgIHJhZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJhZGlvSW5wdXRzLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ19hY3RpdmUnKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdfYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5xdWVyeVNlbGVjdG9yKFwiaW5wdXRcIikudmFsdWUpXG5cbiAgICAgICAgICAgICAgICB1cGRhdGVGaXJzdEdvYWwobWF0Y2hOdW1iZXIsIHRoaXMucXVlcnlTZWxlY3RvcihcImlucHV0XCIpLnZhbHVlKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgbGV0IGNsaWNrU3RhdHMgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ2NsaWNrU3RhdHMnKSkgfHwgW107XG5cbiAgICBmdW5jdGlvbiBjbGlja1RyYWNraW5nKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGNsaWNrTmFtZSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWNsaWNrLW5hbWUnKTtcbiAgICAgICAgY29uc3QgY2xpY2tEcm9wID0gZXZlbnQuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY2xpY2stZHJvcCcpO1xuXG4gICAgICAgIGlmICghY2xpY2tOYW1lKSByZXR1cm47XG5cbiAgICAgICAgaWYgKGNsaWNrRHJvcCkge1xuICAgICAgICAgICAgY29uc3QgaXNBdXRoID0gISF1c2VySWQ7XG5cbiAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nSXRlbSA9IGNsaWNrU3RhdHMuZmluZChcbiAgICAgICAgICAgICAgICBpdGVtID0+IGl0ZW0uY2xpY2tlZEl0ZW0gPT09IGNsaWNrTmFtZSAmJiBpdGVtLmF1dGggPT09IGlzQXV0aFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgaWYgKGV4aXN0aW5nSXRlbSkge1xuICAgICAgICAgICAgICAgIGV4aXN0aW5nSXRlbS5jb3VudGVyICs9IDE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNsaWNrU3RhdHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGNsaWNrZWRJdGVtOiBjbGlja05hbWUsXG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXI6IDEsXG4gICAgICAgICAgICAgICAgICAgIGF1dGg6IGlzQXV0aFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZXhpc3RpbmdJdGVtID0gY2xpY2tTdGF0cy5maW5kKGl0ZW0gPT4gaXRlbS5jbGlja2VkSXRlbSA9PT0gY2xpY2tOYW1lKTtcbiAgICAgICAgICAgIGlmIChleGlzdGluZ0l0ZW0pIHtcbiAgICAgICAgICAgICAgICBleGlzdGluZ0l0ZW0uY291bnRlciArPSAxO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjbGlja1N0YXRzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBjbGlja2VkSXRlbTogY2xpY2tOYW1lLFxuICAgICAgICAgICAgICAgICAgICBjb3VudGVyOiAxXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdjbGlja1N0YXRzJywgSlNPTi5zdHJpbmdpZnkoY2xpY2tTdGF0cykpO1xuICAgICAgICBjb25zb2xlLmxvZyhjbGlja1N0YXRzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbml0Q2xpY2tUcmFja2luZygpIHtcbiAgICAgICAgY29uc3QgY2xpY2thYmxlRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1jbGljay1uYW1lXScpO1xuICAgICAgICBjbGlja2FibGVFbGVtZW50cy5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2tUcmFja2luZyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNlbmRDbGlja1N0YXRzKCkge1xuICAgICAgICBjb25zdCBzdG9yZWRTdGF0cyA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnY2xpY2tTdGF0cycpKTtcblxuICAgICAgICBpZiAoIXN0b3JlZFN0YXRzIHx8IHN0b3JlZFN0YXRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoIHN0b3JlZFN0YXRzKSlcblxuICAgICAgICBmZXRjaChgJHthcGlVUkx9L2NsaWNrLXN0YXRgLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoc3RvcmVkU3RhdHMpXG4gICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsaWNrU3RhdHMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbSgnY2xpY2tTdGF0cycpO1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygn0JrQu9GW0LrQuCDRg9GB0L/RltGI0L3QviDQstGW0LTQv9GA0LDQstC70LXQvdC+INC5INC+0YfQuNGJ0LXQvdC+Jyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcign0J/QvtC80LjQu9C60LAg0L/RgNC4INCy0ZbQtNC/0YDQsNCy0YbRliDQutC70ZbQutGW0LInKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCfQn9C+0LzQuNC70LrQsCDQt8q80ZTQtNC90LDQvdC90Y86JywgZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2V0SW50ZXJ2YWwoc2VuZENsaWNrU3RhdHMsIDEwMDAwKTtcblxuICAgIGxvYWRUcmFuc2xhdGlvbnMoKVxuICAgICAgICAudGhlbihpbml0KVxuXG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGNvbnN0IGJ0biA9IGUudGFyZ2V0LmNsb3Nlc3QoJy5wcmVkaWN0X190ZWFtLWluY3JlYXNlLCAucHJlZGljdF9fdGVhbS1kZWNyZWFzZScpO1xuICAgICAgICBpZiAoIWJ0bikgcmV0dXJuO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKGJ0bilcblxuICAgICAgICBjb25zdCB0ZWFtQ29udHJvbCA9IGJ0bi5jbG9zZXN0KCcucHJlZGljdF9fdGVhbS1jb250cm9sJyk7XG4gICAgICAgIGNvbnN0IHRlYW1OdW1iZXIgPSB0ZWFtQ29udHJvbC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fdGVhbS1udW1iZXInKTtcbiAgICAgICAgY29uc3QgbWF0Y2hDb250YWluZXIgPSBidG4uY2xvc2VzdCgnLnByZWRpY3RfX2NvbnRhaW5lcicpO1xuXG4gICAgICAgIGxldCB2YWx1ZSA9IHBhcnNlSW50KHRlYW1OdW1iZXIudGV4dENvbnRlbnQpO1xuICAgICAgICBpZiAoYnRuLmNsYXNzTGlzdC5jb250YWlucygncHJlZGljdF9fdGVhbS1pbmNyZWFzZScpKSB7XG4gICAgICAgICAgICB2YWx1ZSArPSAxO1xuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID4gMCkge1xuICAgICAgICAgICAgdmFsdWUgLT0gMTtcbiAgICAgICAgfVxuICAgICAgICB0ZWFtTnVtYmVyLnRleHRDb250ZW50ID0gYCR7dmFsdWV9YDtcbiAgICAgICAgc2NvcmVJbml0KGJ0bik7XG4gICAgfSk7XG5cblxuXG59KSgpXG5cbiJdfQ==
