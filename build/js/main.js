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
  if (window.promoInit) {
    return;
  }
  window.promoInit = true;
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
  function init() {
    document.removeEventListener('click', handleTeamControlClick);
    placeBetBtn.removeEventListener('click', handlePlaceBetClick);
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
          clearInterval(i);
        }
      }, 200);
    }
    console.log(userId);
    InitPage();
    placeBetBtn.addEventListener('click', function (e) {
      console.log("click");
      e.preventDefault();
      if (currentBet === undefined) {
        currentBet = new Bet(userId, matchNumber);
      }
      placeBet(currentBet);
    });
    document.addEventListener('click', handleTeamControlClick);
    placeBetBtn.addEventListener('click', handlePlaceBetClick);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsid2luZG93IiwicHJvbW9Jbml0IiwiYXBpVVJMIiwidW5hdXRoTXNncyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsInlvdUFyZUluQnRucyIsIm1haW5QYWdlIiwicXVlcnlTZWxlY3RvciIsInJlc3VsdHNUYWJsZSIsInJlc3VsdHNUYWJsZU90aGVyIiwicGxhY2VCZXRCdG4iLCJsYXN0UHJlZGljdCIsInRvcEZvcmVjYXN0IiwiY3VycmVudFRhYiIsImN1cnJlbnRUYWJUYWJsZSIsIm1hdGNoTnVtYmVyIiwic2hvd1RvcEZvcmVjYXN0IiwiRklSU1RfTUFUQ0hfREFURSIsIkRhdGUiLCJjdXJyZW50RGF0ZSIsImxvY2tNYXRjaENvbnRhaW5lciIsIm1hdGNoRGF0ZSIsImNvbnRhaW5lcnMiLCJmb3JFYWNoIiwiY29udGFpbmVyIiwiY2xhc3NMaXN0IiwiYWRkIiwic2V0SW50ZXJ2YWwiLCJCZXQiLCJ1c2VySWQiLCJ0ZWFtMUdvYWxzIiwidGVhbTJHb2FscyIsImZpcnN0R29hbCIsInVzZXJpZCIsInRlYW0xIiwidGVhbTIiLCJ1bmRlZmluZWQiLCJnb2Fsc1VwZGF0ZWQiLCJmaXJzdEdvYWxVcGRhdGVkIiwiY2FjaGUiLCJwcmVkaWN0RGF0YSIsInRyYW5zbGF0ZVN0YXRlIiwiZGVidWciLCJsb2NhbGUiLCJzZXNzaW9uU3RvcmFnZSIsImdldEl0ZW0iLCJ1a0xlbmciLCJlbkxlbmciLCJpMThuRGF0YSIsImN1cnJlbnRCZXQiLCJyZXF1ZXN0IiwibGluayIsImV4dHJhT3B0aW9ucyIsImZldGNoIiwiaGVhZGVycyIsInRoZW4iLCJyZXMiLCJvayIsIkVycm9yIiwianNvbiIsImVyciIsImNvbnNvbGUiLCJlcnJvciIsInJlcG9ydEVycm9yIiwic3R5bGUiLCJkaXNwbGF5IiwibG9jYXRpb24iLCJocmVmIiwic3RhcnRzV2l0aCIsIlByb21pc2UiLCJyZWplY3QiLCJyZXBvcnREYXRhIiwib3JpZ2luIiwiZXJyb3JUZXh0IiwidGV4dCIsIm1lc3NhZ2UiLCJ0eXBlIiwibmFtZSIsInN0YWNrIiwibWV0aG9kIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJ3YXJuIiwiZ2V0TGFzdEJldCIsImJldHMiLCJmaW5kIiwiYmV0IiwicmVmcmVzaEJldEluZm8iLCJzY29yZTEiLCJzY29yZTIiLCJnb2FsMSIsImdvYWwyIiwiZGF0YSIsImJldEF2YWlsYWJsZSIsInNvbWUiLCJsYXN0VGVhbTEiLCJsYXN0VGVhbTIiLCJzY29yZVRlYW0xIiwic2NvcmVUZWFtMiIsInJlbW92ZSIsImxhc3RCZXQiLCJ0ZXh0Q29udGVudCIsImJldENvbmZpcm1lZCIsIml0ZW0iLCJzZXRBdHRyaWJ1dGUiLCJ0cmFuc2xhdGUiLCJjb250YWlucyIsIkluaXRQYWdlIiwiY2hlY2tVc2VyQXV0aCIsInJlbmRlclVzZXJzIiwidXBkYXRlVG9wRm9yZWNhc3RzIiwibG9nIiwieW91QXJlSW5CdG4iLCJ1bmF1dGhNZXMiLCJwbGFjZUJldCIsImJ0biIsInNjb3JlSW5pdCIsImFjdGl2ZVRhYnMiLCJyZXEiLCJ0YWIiLCJhY3RpdmVJbnB1dCIsInZhbHVlIiwic2V0SXRlbSIsImxvYWRUcmFuc2xhdGlvbnMiLCJtdXRhdGlvbk9ic2VydmVyIiwiTXV0YXRpb25PYnNlcnZlciIsIm11dGF0aW9ucyIsIm9ic2VydmUiLCJnZXRFbGVtZW50QnlJZCIsImNoaWxkTGlzdCIsInN1YnRyZWUiLCJlbGVtcyIsImVsZW0iLCJrZXkiLCJnZXRBdHRyaWJ1dGUiLCJpbm5lckhUTUwiLCJyZW1vdmVBdHRyaWJ1dGUiLCJyZWZyZXNoTG9jYWxpemVkQ2xhc3MiLCJlbGVtZW50IiwibGFuZyIsImluaXQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiaGFuZGxlVGVhbUNvbnRyb2xDbGljayIsImhhbmRsZVBsYWNlQmV0Q2xpY2siLCJpbml0Q2xpY2tUcmFja2luZyIsInN0b3JlIiwic3RhdGUiLCJnZXRTdGF0ZSIsImF1dGgiLCJpc0F1dGhvcml6ZWQiLCJpZCIsImMiLCJpIiwiZ191c2VyX2lkIiwiY2xlYXJJbnRlcnZhbCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwicHJldmVudERlZmF1bHQiLCJ1cGRhdGVTY29yZSIsInVwZGF0ZUdvYWxzIiwidXBkYXRlRmlyc3RHb2FsIiwiZm9yZWNhc3RzQ29udGFpbmVyIiwidG9wRm9yZWNhc3RzIiwiZm9yZWNhc3QiLCJmb3JlY2FzdEl0ZW0iLCJjcmVhdGVFbGVtZW50IiwicGVyY2VudGFnZSIsInBhcnNlRmxvYXQiLCJ0b0ZpeGVkIiwicGVyY2VudGFnZVNwYW4iLCJmb3JlY2FzdFRleHQiLCJjcmVhdGVUZXh0Tm9kZSIsImFwcGVuZENoaWxkIiwidXNlcnMiLCJpc1Njb3JlVGFiQWN0aXZlIiwiaXNHb2FsVGFiQWN0aXZlIiwibGVuZ3RoIiwicG9wdWxhdGVVc2Vyc1RhYmxlIiwiY3VycmVudFVzZXJJZCIsImN1cnJlbnRVc2VyIiwidXNlciIsImRpc3BsYXlVc2VyIiwiaXNDdXJyZW50VXNlciIsInRhYmxlIiwiYWxsVXNlcnMiLCJhZGRpdGlvbmFsVXNlclJvdyIsIm1hc2tVc2VySWQiLCJ5b3VCbG9jayIsImluc2VydEJlZm9yZSIsImNoaWxkcmVuIiwiYXBwZW5kIiwidG9TdHJpbmciLCJzbGljZSIsImNhcmRzIiwiYW5nbGUiLCJhbmltYXRlQ2FyZHMiLCJyb3RhdGVYIiwiTWF0aCIsInNpbiIsIlBJIiwicm90YXRlWSIsImNvcyIsImNhcmQiLCJ0cmFuc2Zvcm0iLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ0YWJzIiwiaGFuZGxlVGFiQ2xpY2siLCJldmVudCIsImN1cnJlbnRNYXRjaCIsImNsaWNrZWRUYWIiLCJ0YXJnZXQiLCJjbG9zZXN0IiwidGFiUGFpciIsInBhaXIiLCJ1cGRhdGVDb250YWluZXJzIiwic2NvcmUiLCJidXR0b24iLCJjaGVja2VkIiwidGVhbUNvbnRyb2wiLCJ0ZWFtTnVtYmVyIiwibWF0Y2hDb250YWluZXIiLCJwYXJzZUludCIsImRhdGFzZXQiLCJnZXRHb2FscyIsInRlYW0iLCJOdW1iZXIiLCJzZXRQb3B1cHMiLCJ0cmlnZ2VyQnV0dG9ucyIsInBvcHVwQ2xhc3MiLCJwb3B1cHNDb250YWluZXIiLCJwb3B1cCIsInBvcHVwQnRuIiwidHJpZ2dlckJ1dHRvbiIsIm92ZXJmbG93IiwiY2xvc2VCdXR0b24iLCJidG5DbG9zZSIsImNsb3NlUG9wdXAiLCJ0YXJnZXRFbGVtZW50IiwidGFyZ2V0UG9zaXRpb24iLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ0b3AiLCJwYWdlWU9mZnNldCIsInNjcm9sbFRvIiwiYmVoYXZpb3IiLCJyYWRpb0NvbnRhaW5lcnMiLCJyYWRpb0lucHV0cyIsInJhZGlvIiwiY2xpY2tTdGF0cyIsInBhcnNlIiwiY2xpY2tUcmFja2luZyIsImNsaWNrTmFtZSIsImN1cnJlbnRUYXJnZXQiLCJjbGlja0Ryb3AiLCJpc0F1dGgiLCJleGlzdGluZ0l0ZW0iLCJjbGlja2VkSXRlbSIsImNvdW50ZXIiLCJwdXNoIiwiY2xpY2thYmxlRWxlbWVudHMiLCJlbCIsInNlbmRDbGlja1N0YXRzIiwic3RvcmVkU3RhdHMiLCJyZXNwb25zZSIsInJlbW92ZUl0ZW0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsQ0FBQyxZQUFZO0VBQUE7RUFDVCxJQUFJQSxNQUFNLENBQUNDLFNBQVMsRUFBRTtJQUFDO0VBQU07RUFDN0JELE1BQU0sQ0FBQ0MsU0FBUyxHQUFHLElBQUk7RUFFdkIsSUFBTUMsTUFBTSxHQUFHLDRDQUE0QztJQUN2REMsVUFBVSxHQUFHQyxRQUFRLENBQUNDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQztJQUNyREMsWUFBWSxHQUFHRixRQUFRLENBQUNDLGdCQUFnQixDQUFDLFlBQVksQ0FBQztJQUN0REUsUUFBUSxHQUFHSCxRQUFRLENBQUNJLGFBQWEsQ0FBQyxXQUFXLENBQUM7SUFDOUNDLFlBQVksR0FBR0wsUUFBUSxDQUFDSSxhQUFhLENBQUMsZ0JBQWdCLENBQUM7SUFDdkRFLGlCQUFpQixHQUFHTixRQUFRLENBQUNJLGFBQWEsQ0FB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QztJQUN6RCxJQUFNUSxVQUFVLEdBQUdELFdBQVcsQ0FBQ3BOLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQztJQUNyRSxJQUFNc04sY0FBYyxHQUFHekcsR0FBRyxDQUFDZ0csT0FBTyxDQUFDLHFCQUFxQixDQUFDO0lBRXpELElBQUkxRixLQUFLLEdBQUdvRyxRQUFRLENBQUNGLFVBQVUsQ0FBQ3RILFdBQVcsQ0FBQztJQUM1QyxJQUFJYyxHQUFHLENBQUMzRixTQUFTLENBQUNrRixRQUFRLENBQUMsd0JBQXdCLENBQUMsRUFBRTtNQUNsRGUsS0FBSyxJQUFJLENBQUM7SUFDZCxDQUFDLE1BQU0sSUFBSUEsS0FBSyxHQUFHLENBQUMsRUFBRTtNQUNsQkEsS0FBSyxJQUFJLENBQUM7SUFDZDtJQUNBa0csVUFBVSxDQUFDdEgsV0FBVyxhQUFNb0IsS0FBSyxDQUFFO0lBQ25DTCxTQUFTLENBQUNELEdBQUcsQ0FBQztFQUNsQjs7RUFFQTtFQUNBLFNBQVM0QixtQkFBbUIsQ0FBQ2EsQ0FBQyxFQUFFO0lBQzVCaEcsT0FBTyxDQUFDbUQsR0FBRyxDQUFDLE9BQU8sQ0FBQztJQUNwQjZDLENBQUMsQ0FBQ0MsY0FBYyxFQUFFO0lBQ2xCLElBQUc3RyxVQUFVLEtBQUtiLFNBQVMsRUFBRTtNQUN6QmEsVUFBVSxHQUFHLElBQUlyQixHQUFHLENBQUNDLE1BQU0sRUFBRWQsV0FBVyxDQUFDO0lBQzdDO0lBQ0FvRyxRQUFRLENBQUNsRSxVQUFVLENBQUM7RUFDeEI7QUFFSixDQUFDLEdBQUciLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuKGZ1bmN0aW9uICgpIHtcbiAgICBpZiAod2luZG93LnByb21vSW5pdCkge3JldHVybn1cbiAgICB3aW5kb3cucHJvbW9Jbml0ID0gdHJ1ZTtcblxuICAgIGNvbnN0IGFwaVVSTCA9ICdodHRwczovL2Zhdi1wcm9tLmNvbS9hcGlfZm9vdGJhbGxfc2hha2h0YXInLFxuICAgICAgICB1bmF1dGhNc2dzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnVuYXV0aC1tc2cnKSxcbiAgICAgICAgeW91QXJlSW5CdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvb2stcGFydCcpLFxuICAgICAgICBtYWluUGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZmF2LXBhZ2VcIiksXG4gICAgICAgIHJlc3VsdHNUYWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZXN1bHRzLXRhYmxlJyksXG4gICAgICAgIHJlc3VsdHNUYWJsZU90aGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Jlc3VsdHMtdGFibGUtb3RoZXInKSxcbiAgICAgICAgcGxhY2VCZXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByZWRpY3QtYnRuXCIpLFxuICAgICAgICBsYXN0UHJlZGljdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJlZGljdF9fbGFzdFwiKSxcbiAgICAgICAgdG9wRm9yZWNhc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvcEZvcmVjYXN0XCIpXG5cbiAgICBsZXQgY3VycmVudFRhYiA9IDFcbiAgICBsZXQgY3VycmVudFRhYlRhYmxlID0gMVxuICAgIGxldCBtYXRjaE51bWJlciA9IDFcbiAgICBsZXQgc2hvd1RvcEZvcmVjYXN0ID0gZmFsc2VcblxuICAgIC8vIGNvbnN0IEZJUlNUX01BVENIX0RBVEUgPSBuZXcgRGF0ZSgnMjAyNS0wNC0yN1QxNzozMDowMCcpIC8vINC00LDRgtCwINC80LDRgtGH0YMgLSAzMNGF0LIg0YHQv9GA0LDQstC20L3RjyDQtNCw0YLQsFxuICAgIGNvbnN0IEZJUlNUX01BVENIX0RBVEUgPSBuZXcgRGF0ZSgnMjAyNS0wNC0yN1QxNzozMDowMCcpIC8vINC00LDRgtCwINC80LDRgtGH0YMgLSAzMNGF0LJcbiAgICBjb25zdCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKClcblxuICAgIGZ1bmN0aW9uIGxvY2tNYXRjaENvbnRhaW5lcihtYXRjaERhdGUsIG1hdGNoTnVtYmVyKSB7XG4gICAgICAgIGlmIChuZXcgRGF0ZSgpID4gbWF0Y2hEYXRlKSB7XG4gICAgICAgICAgICBjb25zdCBjb250YWluZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLnByZWRpY3RfX2NvbnRhaW5lcltkYXRhLW1hdGNoLW51bWJlcj1cIiR7bWF0Y2hOdW1iZXJ9XCJdYCk7XG5cbiAgICAgICAgICAgIGNvbnRhaW5lcnMuZm9yRWFjaChjb250YWluZXIgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdfbG9jaycpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHBsYWNlQmV0QnRuLmNsYXNzTGlzdC5hZGQoXCJfbG9ja1wiKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbG9ja01hdGNoQ29udGFpbmVyKEZJUlNUX01BVENIX0RBVEUsIDEpOyAvLyDQlNC70Y8g0L/QtdGA0YjQvtCz0L4g0LzQsNGC0YfRg1xuXG4gICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBjb25zdCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCk7IC8vINCe0L3QvtCy0LjRgtC4INC/0L7RgtC+0YfQvdGDINC00LDRgtGDXG4gICAgICAgIGxvY2tNYXRjaENvbnRhaW5lcihGSVJTVF9NQVRDSF9EQVRFLCAxKTtcbiAgICB9LCA2MDAwMDApOyAvLyDQntC90L7QstC70Y7QstCw0YLQuCDQutC+0LbQvdGWIDEwINGF0LJcblxuICAgIGNsYXNzIEJldCB7XG4gICAgICAgIGNvbnN0cnVjdG9yKHVzZXJJZCwgbWF0Y2hOdW1iZXIsIHRlYW0xR29hbHMgPSAwLCB0ZWFtMkdvYWxzID0gMCwgZmlyc3RHb2FsKSB7XG4gICAgICAgICAgICBpZih1c2VySWQgIT09IG51bGwpIHRoaXMudXNlcmlkID0gdXNlcklkO1xuICAgICAgICAgICAgdGhpcy5tYXRjaE51bWJlciA9IG1hdGNoTnVtYmVyO1xuICAgICAgICAgICAgdGhpcy50ZWFtMSA9IHRlYW0xR29hbHM7XG4gICAgICAgICAgICB0aGlzLnRlYW0yID0gdGVhbTJHb2FscztcbiAgICAgICAgICAgIGlmKGZpcnN0R29hbCAhPT0gdW5kZWZpbmVkKSB0aGlzLmZpcnN0R29hbCA9IGZpcnN0R29hbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHVwZGF0ZUdvYWxzKHRlYW0xR29hbHMsIHRlYW0yR29hbHMpIHtcbiAgICAgICAgICAgIGlmICh0ZWFtMUdvYWxzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRlYW0xID0gdGVhbTFHb2FscyAhPT0gbnVsbCA/IHRlYW0xR29hbHMgOiB0aGlzLnRlYW0xO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRlYW0yR29hbHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMudGVhbTIgPSB0ZWFtMkdvYWxzICE9PSBudWxsID8gdGVhbTJHb2FscyA6IHRoaXMudGVhbTI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmdvYWxzVXBkYXRlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB1cGRhdGVGaXJzdEdvYWwoZmlyc3RHb2FsKSB7XG4gICAgICAgICAgICBpZiAoZmlyc3RHb2FsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpcnN0R29hbCA9IGZpcnN0R29hbCAhPT0gbnVsbCA/IGZpcnN0R29hbCA6IHRoaXMuZmlyc3RHb2FsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5maXJzdEdvYWxVcGRhdGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGNhY2hlID0ge307XG4gICAgbGV0IHByZWRpY3REYXRhID0gW107XG5cbiAgICBsZXQgdHJhbnNsYXRlU3RhdGUgPSB0cnVlXG4gICAgbGV0IGRlYnVnID0gZmFsc2VcblxuICAgIGxldCBsb2NhbGUgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwibG9jYWxlXCIpID8/IFwidWtcIlxuICAgIC8vIGxldCBsb2NhbGUgPSBcInVrXCJcbiAgICAvLyBsZXQgbG9jYWxlID0gXCJlblwiXG5cblxuICAgIGNvbnN0IHVrTGVuZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1a0xlbmcnKTtcbiAgICBjb25zdCBlbkxlbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZW5MZW5nJyk7XG5cblxuICAgIGxldCBpMThuRGF0YSA9IHt9O1xuXG4gICAgbGV0IHVzZXJJZDtcbiAgICAvLyB1c2VySWQgPSAxMDAzMDAyNjg7XG5cbiAgICBsZXQgY3VycmVudEJldDtcblxuICAgIGlmICh1a0xlbmcpIGxvY2FsZSA9ICd1ayc7XG4gICAgaWYgKGVuTGVuZykgbG9jYWxlID0gJ2VuJztcblxuICAgIGNvbnN0IHJlcXVlc3QgPSAobGluaywgZXh0cmFPcHRpb25zKSA9PlxuICAgICAgICBmZXRjaChhcGlVUkwgKyBsaW5rLCB7XG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLi4uKGV4dHJhT3B0aW9ucyB8fCB7fSlcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFyZXMub2spIHRocm93IG5ldyBFcnJvcignQVBJIGVycm9yJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignQVBJIHJlcXVlc3QgZmFpbGVkOicsIGVycik7XG5cbiAgICAgICAgICAgICAgICByZXBvcnRFcnJvcihlcnIpO1xuXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZhdi1wYWdlJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgICAgICBpZiAod2luZG93LmxvY2F0aW9uLmhyZWYuc3RhcnRzV2l0aChcImh0dHBzOi8vd3d3LmZhdmJldC5oci9cIikpIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL3Byb21vY2lqZS9wcm9tb2NpamEvc3R1Yi8nO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9wcm9tb3MvcHJvbW8vc3R1Yi8nO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICBmdW5jdGlvbiByZXBvcnRFcnJvcihlcnIpIHtcbiAgICAgICAgY29uc3QgcmVwb3J0RGF0YSA9IHtcbiAgICAgICAgICAgIG9yaWdpbjogd2luZG93LmxvY2F0aW9uLmhyZWYsXG4gICAgICAgICAgICB1c2VyaWQ6IHVzZXJJZCxcbiAgICAgICAgICAgIGVycm9yVGV4dDogZXJyPy5lcnJvciB8fCBlcnI/LnRleHQgfHwgZXJyPy5tZXNzYWdlIHx8ICdVbmtub3duIGVycm9yJyxcbiAgICAgICAgICAgIHR5cGU6IGVycj8ubmFtZSB8fCAnVW5rbm93bkVycm9yJyxcbiAgICAgICAgICAgIHN0YWNrOiBlcnI/LnN0YWNrIHx8ICcnXG4gICAgICAgIH07XG5cbiAgICAgICAgZmV0Y2goJ2h0dHBzOi8vZmF2LXByb20uY29tL2FwaS1jbXMvcmVwb3J0cy9hZGQnLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocmVwb3J0RGF0YSlcbiAgICAgICAgfSkuY2F0Y2goY29uc29sZS53YXJuKTtcbiAgICB9XG5cbiAgICBjb25zdCBnZXRMYXN0QmV0ID0gKGJldHMsIG1hdGNoTnVtYmVyKSA9PntcbiAgICAgICAgaWYoIWJldHMpIHJldHVybiBmYWxzZVxuICAgICAgICByZXR1cm4gYmV0cy5maW5kKGJldCA9PiBiZXQubWF0Y2hOdW1iZXIgPT09IG1hdGNoTnVtYmVyKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWZyZXNoQmV0SW5mbyh1c2VySWQpIHtcbiAgICAgICAgY29uc3Qgc2NvcmUxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zY29yZS0xXCIpXG4gICAgICAgIGNvbnN0IHNjb3JlMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2NvcmUtMlwiKVxuICAgICAgICBjb25zdCBnb2FsMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ29hbC0xXCIpXG4gICAgICAgIGNvbnN0IGdvYWwyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nb2FsLTJcIilcblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhtYXRjaE51bWJlcilcblxuICAgICAgICByZXF1ZXN0KGAvZmF2dXNlci8ke3VzZXJJZH1gLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnXG4gICAgICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBpZihkYXRhLmJldHMpe1xuICAgICAgICAgICAgICAgIGNvbnN0IGJldEF2YWlsYWJsZSA9IGRhdGEuYmV0cy5zb21lKGJldCA9PntcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJldC5tYXRjaE51bWJlciA9PT0gbWF0Y2hOdW1iZXJcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGJldEF2YWlsYWJsZSlcbiAgICAgICAgICAgICAgICBjb25zdCBsYXN0VGVhbTEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByZWRpY3RfX2xhc3QtdGVhbS50ZWFtMVwiKTtcbiAgICAgICAgICAgICAgICBjb25zdCBsYXN0VGVhbTIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByZWRpY3RfX2xhc3QtdGVhbS50ZWFtMlwiKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzY29yZVRlYW0xID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zY29yZVRlYW0xXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNjb3JlVGVhbTIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNjb3JlVGVhbTJcIik7XG4gICAgICAgICAgICAgICAgY29uc3QgZmlyc3RHb2FsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmVkaWN0X19sYXN0LWNvdW50cnlcIik7XG4gICAgICAgICAgICAgICAgaWYoYmV0QXZhaWxhYmxlKXtcbiAgICAgICAgICAgICAgICAgICAgbGFzdFByZWRpY3QuY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIilcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFzdEJldCA9IGdldExhc3RCZXQoZGF0YS5iZXRzLCBtYXRjaE51bWJlcik7XG4gICAgICAgICAgICAgICAgICAgIHNjb3JlVGVhbTEudGV4dENvbnRlbnQgPSBsYXN0QmV0LnRlYW0xID09PSB1bmRlZmluZWQgPyBcIi1cIiA6YCR7bGFzdEJldC50ZWFtMX1gO1xuICAgICAgICAgICAgICAgICAgICBzY29yZVRlYW0yLnRleHRDb250ZW50ID0gbGFzdEJldC50ZWFtMiA9PT0gdW5kZWZpbmVkID8gXCItXCIgOmAke2xhc3RCZXQudGVhbTJ9YDtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cobGFzdEJldClcblxuICAgICAgICAgICAgICAgICAgICBpZiAobGFzdEJldC5iZXRDb25maXJtZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJlZGljdF9fbGFzdC1yZXN1bHQudW5jb25maXJtZWRcIikuZm9yRWFjaChpdGVtID0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByZWRpY3RfX2xhc3QtcmVzdWx0LmNvbmZpcm1lZFwiKS5mb3JFYWNoKGl0ZW0gPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJlZGljdF9fbGFzdC1yZXN1bHQudW5jb25maXJtZWRcIikuZm9yRWFjaChpdGVtID0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByZWRpY3RfX2xhc3QtcmVzdWx0LmNvbmZpcm1lZFwiKS5mb3JFYWNoKGl0ZW0gPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChsYXN0QmV0Lm1hdGNoTnVtYmVyID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0VGVhbTEuc2V0QXR0cmlidXRlKFwiZGF0YS10cmFuc2xhdGVcIiwgXCJzaGFraHRhclwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RUZWFtMi5zZXRBdHRyaWJ1dGUoXCJkYXRhLXRyYW5zbGF0ZVwiLCBcImR5bmFtb1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoc2NvcmUxLmNsYXNzTGlzdC5jb250YWlucyhcImFjdGl2ZVwiKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByZWRpY3RfX2xhc3Qtc2NvcmVcIikuY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJlZGljdF9fbGFzdC1nb2FsXCIpLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZihnb2FsMS5jbGFzc0xpc3QuY29udGFpbnMoXCJhY3RpdmVcIikpe1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmVkaWN0X19sYXN0LXNjb3JlXCIpLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByZWRpY3RfX2xhc3QtZ29hbFwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVwiKVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYobGFzdEJldC5maXJzdEdvYWwpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYobGFzdEJldC5maXJzdEdvYWwgPT09IFwic2hha2h0YXJcIil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RHb2FsLnNldEF0dHJpYnV0ZShcImRhdGEtdHJhbnNsYXRlXCIsIFwic2hha2h0YXJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihsYXN0QmV0LmZpcnN0R29hbCA9PT0gXCJkeW5hbW9cIil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RHb2FsLnNldEF0dHJpYnV0ZShcImRhdGEtdHJhbnNsYXRlXCIsIFwiZHluYW1vXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobGFzdEJldC5maXJzdEdvYWwgPT09IFwiZHJhd1wiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdEdvYWwuc2V0QXR0cmlidXRlKFwiZGF0YS10cmFuc2xhdGVcIiwgXCJkcmF3XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZ29hbDEuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlXCIpIHx8IGdvYWwyLmNsYXNzTGlzdC5jb250YWlucyhcImFjdGl2ZVwiKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmVkaWN0X19sYXN0XCIpLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZighYmV0QXZhaWxhYmxlKXtcbiAgICAgICAgICAgICAgICAgICAgbGFzdFByZWRpY3QuY2xhc3NMaXN0LmFkZChcImhpZGVcIilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBsYXN0UHJlZGljdC5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvcjonLCBlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zdCBJbml0UGFnZSA9ICgpID0+IHtcbiAgICAgICAgY2hlY2tVc2VyQXV0aCgpO1xuICAgICAgICByZW5kZXJVc2VycygpO1xuICAgICAgICB1cGRhdGVUb3BGb3JlY2FzdHMoY3VycmVudFRhYilcbiAgICAgICAgcmVmcmVzaEJldEluZm8odXNlcklkKVxuICAgIH1cblxuICAgIGxldCBjaGVja1VzZXJBdXRoID0gKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyh1c2VySWQpXG4gICAgICAgIGlmICh1c2VySWQpIHtcbiAgICAgICAgICAgIHlvdUFyZUluQnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJykpO1xuICAgICAgICAgICAgdW5hdXRoTXNncy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QuYWRkKCdoaWRlJykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChsZXQgeW91QXJlSW5CdG4gb2YgeW91QXJlSW5CdG5zKSB7XG4gICAgICAgICAgICAgICAgeW91QXJlSW5CdG4uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChjb25zdCB1bmF1dGhNZXMgb2YgdW5hdXRoTXNncykge1xuICAgICAgICAgICAgICAgIHVuYXV0aE1lcy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gcGxhY2VCZXQoYmV0KSB7XG4gICAgICAgIGlmICghdXNlcklkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coYmV0KVxuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJlZGljdF9fY29udGFpbmVyLmFjdGl2ZVwiKVxuICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcmVkaWN0X190ZWFtLWluY3JlYXNlLCAucHJlZGljdF9fdGVhbS1kZWNyZWFzZScpXG4gICAgICAgICAgICAuZm9yRWFjaChidG4gPT4ge1xuICAgICAgICAgICAgICAgIHNjb3JlSW5pdChidG4pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgYWN0aXZlVGFicyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ29hbENvbnRcIilcbiAgICAgICAgLy8gY29uc3QgYWN0aXZlSW5wdXQgPSBhY3RpdmVUYWIucXVlcnlTZWxlY3RvcihcIi5wcmVkaWN0X19yYWRpby1pdGVtIGlucHV0XCIpXG5cblxuXG4gICAgICAgIGxldCByZXEgPSB7XG4gICAgICAgICAgICBtYXRjaE51bWJlcjogYmV0Lm1hdGNoTnVtYmVyLFxuICAgICAgICAgICAgdXNlcmlkOiBiZXQudXNlcmlkLFxuICAgICAgICB9O1xuXG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coYWN0aXZlVGFicylcbiAgICAgICAgZm9yIChjb25zdCB0YWIgb2YgYWN0aXZlVGFicykge1xuICAgICAgICAgICAgaWYgKHRhYi5jbGFzc0xpc3QuY29udGFpbnMoXCJhY3RpdmVcIikpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBhY3RpdmVJbnB1dCA9IHRhYi5xdWVyeVNlbGVjdG9yKFwiLnByZWRpY3RfX3JhZGlvLWl0ZW0uX2FjdGl2ZSBpbnB1dFwiKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0YWIpXG5cbiAgICAgICAgICAgICAgICBpZiAoYWN0aXZlSW5wdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYWN0aXZlSW5wdXQpXG4gICAgICAgICAgICAgICAgICAgIHJlcS5maXJzdEdvYWwgPSBhY3RpdmVJbnB1dC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuXG4gICAgICAgIGlmIChiZXQuZmlyc3RHb2FsVXBkYXRlZCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYmV0LmZpcnN0R29hbClcbiAgICAgICAgICAgIHJlcS5maXJzdEdvYWwgPSBiZXQuZmlyc3RHb2FsO1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYmV0LmdvYWxzVXBkYXRlZCkge1xuICAgICAgICAgICAgcmVxLnRlYW0xID0gYmV0LnRlYW0xO1xuICAgICAgICAgICAgcmVxLnRlYW0yID0gYmV0LnRlYW0yO1xuICAgICAgICB9XG5cblxuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGFjdGl2ZUlucHV0KTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coYWN0aXZlVGFiKVxuXG5cbiAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcImN1cnJlbnRCZXRcIiwgSlNPTi5zdHJpbmdpZnkocmVxKSlcblxuICAgICAgICBjb25zb2xlLmxvZyhzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiY3VycmVudEJldFwiKSlcblxuICAgICAgICByZXF1ZXN0KCcvYmV0Jywge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBib2R5OiBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwiY3VycmVudEJldFwiKVxuICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnQmV0IHBsYWNlZDonLCByZXMpO1xuICAgICAgICAgICAgICAgIEluaXRQYWdlKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHBsYWNpbmcgYmV0OicsIGVycm9yKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9hZFRyYW5zbGF0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIGZldGNoKGAke2FwaVVSTH0vbmV3LXRyYW5zbGF0ZXMvJHtsb2NhbGV9YCkudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAgICAgICAgIC50aGVuKGpzb24gPT4ge1xuICAgICAgICAgICAgICAgIGkxOG5EYXRhID0ganNvbjtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGUoKTtcbiAgICAgICAgICAgICAgICB2YXIgbXV0YXRpb25PYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uIChtdXRhdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbXV0YXRpb25PYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnb2Fscy1vci16ZXJvcycpLCB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZSgpIHtcbiAgICAgICAgY29uc3QgZWxlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10cmFuc2xhdGVdJylcbiAgICAgICAgaWYodHJhbnNsYXRlU3RhdGUpe1xuICAgICAgICAgICAgZWxlbXMuZm9yRWFjaChlbGVtID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBlbGVtLmdldEF0dHJpYnV0ZSgnZGF0YS10cmFuc2xhdGUnKTtcbiAgICAgICAgICAgICAgICBlbGVtLmlubmVySFRNTCA9IGkxOG5EYXRhW2tleV0gfHwgJyotLS0tTkVFRCBUTyBCRSBUUkFOU0xBVEVELS0tLSogICBrZXk6ICAnICsga2V5O1xuICAgICAgICAgICAgICAgIGVsZW0ucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXRyYW5zbGF0ZScpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInRyYW5zbGF0aW9uIHdvcmshXCIpXG4gICAgICAgIH1cbiAgICAgICAgcmVmcmVzaExvY2FsaXplZENsYXNzKG1haW5QYWdlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWZyZXNoTG9jYWxpemVkQ2xhc3MoZWxlbWVudCkge1xuICAgICAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGxhbmcgb2YgWyd1aycsICdlbiddKSB7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUobGFuZyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGxvY2FsZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVUZWFtQ29udHJvbENsaWNrKTtcbiAgICAgICAgcGxhY2VCZXRCdG4ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVQbGFjZUJldENsaWNrKTtcbiAgICAgICAgaW5pdENsaWNrVHJhY2tpbmcoKVxuICAgICAgICBpZiAod2luZG93LnN0b3JlKSB7XG4gICAgICAgICAgICB2YXIgc3RhdGUgPSB3aW5kb3cuc3RvcmUuZ2V0U3RhdGUoKTtcbiAgICAgICAgICAgIHVzZXJJZCA9IHN0YXRlLmF1dGguaXNBdXRob3JpemVkICYmIHN0YXRlLmF1dGguaWQgfHwgJyc7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh1c2VySWQpXG4gICAgICAgICAgICBpZighY3VycmVudEJldCl7XG4gICAgICAgICAgICAgICAgY3VycmVudEJldCA9IG5ldyBCZXQodXNlcklkLCBtYXRjaE51bWJlcilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGN1cnJlbnRCZXQgPSBuZXcgQmV0KHVzZXJJZCwgbWF0Y2hOdW1iZXIpXG4gICAgICAgICAgICBJbml0UGFnZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IGMgPSAwO1xuICAgICAgICAgICAgdmFyIGkgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGMgPCA1MCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoISF3aW5kb3cuZ191c2VyX2lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VySWQgPSB3aW5kb3cuZ191c2VyX2lkO1xuICAgICAgICAgICAgICAgICAgICAgICAgSW5pdFBhZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDIwMCk7XG5cbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyh1c2VySWQpXG4gICAgICAgIEluaXRQYWdlKClcbiAgICAgICAgcGxhY2VCZXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjbGlja1wiKVxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgaWYoY3VycmVudEJldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudEJldCA9IG5ldyBCZXQodXNlcklkLCBtYXRjaE51bWJlcilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBsYWNlQmV0KGN1cnJlbnRCZXQpO1xuICAgICAgICB9KTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVUZWFtQ29udHJvbENsaWNrKTtcbiAgICAgICAgcGxhY2VCZXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVQbGFjZUJldENsaWNrKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gdXBkYXRlU2NvcmUobWF0Y2hOdW1iZXIsIHRlYW0xR29hbHMsIHRlYW0yR29hbHMpIHtcbiAgICAgICAgaWYgKGN1cnJlbnRCZXQgJiYgY3VycmVudEJldC5tYXRjaE51bWJlciA9PT0gbWF0Y2hOdW1iZXIpIHtcbiAgICAgICAgICAgIGN1cnJlbnRCZXQudXBkYXRlR29hbHModGVhbTFHb2FscywgdGVhbTJHb2Fscyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjdXJyZW50QmV0ID0gbmV3IEJldCh1c2VySWQsIG1hdGNoTnVtYmVyLCB0ZWFtMUdvYWxzLCB0ZWFtMkdvYWxzKTtcbiAgICAgICAgICAgIGN1cnJlbnRCZXQudXBkYXRlR29hbHModGVhbTFHb2FscywgdGVhbTJHb2Fscyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5sb2coY3VycmVudEJldCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHVwZGF0ZUZpcnN0R29hbChtYXRjaE51bWJlciwgZmlyc3RHb2FsKSB7XG4gICAgICAgIGlmIChjdXJyZW50QmV0ICYmIGN1cnJlbnRCZXQubWF0Y2hOdW1iZXIgPT09IG1hdGNoTnVtYmVyKSB7XG4gICAgICAgICAgICBjdXJyZW50QmV0LnVwZGF0ZUZpcnN0R29hbChmaXJzdEdvYWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coY3VycmVudEJldCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHVwZGF0ZVRvcEZvcmVjYXN0cyhtYXRjaE51bWJlcikge1xuICAgICAgICByZXF1ZXN0KGAvdXNlcnMvJHttYXRjaE51bWJlcn1gKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YS50b3BGb3JlY2FzdHMpOyAvLyDQn9C10YDQtdCy0ZbRgNC60LAg0L7RgtGA0LjQvNCw0L3QuNGFINC00LDQvdC40YVcblxuICAgICAgICAgICAgY29uc3QgZm9yZWNhc3RzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX2ZvcmVjYXN0cycpO1xuICAgICAgICAgICAgZm9yZWNhc3RzQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuXG5cbiAgICAgICAgICAgIGRhdGEudG9wRm9yZWNhc3RzLmZvckVhY2goZm9yZWNhc3QgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvcmVjYXN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIGZvcmVjYXN0SXRlbS5jbGFzc0xpc3QuYWRkKCdwcmVkaWN0X19mb3JlY2FzdHMtaXRlbScpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgcGVyY2VudGFnZSA9IHBhcnNlRmxvYXQoZm9yZWNhc3QucGVyY2VudGFnZSkudG9GaXhlZCgxKTtcbiAgICAgICAgICAgICAgICBjb25zdCBwZXJjZW50YWdlU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgICAgICBwZXJjZW50YWdlU3Bhbi50ZXh0Q29udGVudCA9IGAke3BlcmNlbnRhZ2V9JWA7XG5cblxuICAgICAgICAgICAgICAgIGNvbnN0IGZvcmVjYXN0VGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGAgJHtmb3JlY2FzdC5mb3JlY2FzdCA/PyBcIjAtMFwifWApO1xuICAgICAgICAgICAgICAgIGZvcmVjYXN0SXRlbS5hcHBlbmRDaGlsZChwZXJjZW50YWdlU3Bhbik7XG4gICAgICAgICAgICAgICAgZm9yZWNhc3RJdGVtLmFwcGVuZENoaWxkKGZvcmVjYXN0VGV4dCk7XG5cbiAgICAgICAgICAgICAgICBmb3JlY2FzdHNDb250YWluZXIuYXBwZW5kQ2hpbGQoZm9yZWNhc3RJdGVtKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyB0b3AgZm9yZWNhc3RzOicsIGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlbmRlclVzZXJzKCkge1xuICAgICAgICByZXF1ZXN0KGAvdXNlcnMvJHtjdXJyZW50VGFiVGFibGV9YClcbiAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xuXG4gICAgICAgICAgICAgICAgbGV0IHVzZXJzID0gZGF0YS51c2Vyc1xuXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codXNlcnMpXG4gICAgICAgICAgICAgICAgY29uc3QgaXNTY29yZVRhYkFjdGl2ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X190YWJzLXNjb3JlLmFjdGl2ZScpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzR29hbFRhYkFjdGl2ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X190YWJzLWdvYWwuYWN0aXZlJyk7XG5cblxuICAgICAgICAgICAgICAgIGlmKHVzZXJzLmxlbmd0aCA+PSAzKXtcbiAgICAgICAgICAgICAgICAgICAgc2hvd1RvcEZvcmVjYXN0ID0gdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZih1c2Vycy5sZW5ndGggPCAzKXtcbiAgICAgICAgICAgICAgICAgICAgc2hvd1RvcEZvcmVjYXN0ID0gZmFsc2VcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNTY29yZVRhYkFjdGl2ZSAmJiBzaG93VG9wRm9yZWNhc3QpIHRvcEZvcmVjYXN0LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpXG4gICAgICAgICAgICAgICAgaWYgKGlzR29hbFRhYkFjdGl2ZSkgdG9wRm9yZWNhc3QuY2xhc3NMaXN0LmFkZChcImhpZGVcIilcblxuXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codHlwZW9mIHVzZXJJZClcblxuICAgICAgICAgICAgICAgIHBvcHVsYXRlVXNlcnNUYWJsZSh1c2VycywgdXNlcklkLCBjdXJyZW50VGFiVGFibGUpXG5cbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh1c2VycylcbiAgICAgICAgICAgIH0pO1xuXG4gICAgfVxuICAgIGZ1bmN0aW9uIHBvcHVsYXRlVXNlcnNUYWJsZSh1c2VycywgY3VycmVudFVzZXJJZCwgbWF0Y2hOdW1iZXIpIHtcbiAgICAgICAgcmVzdWx0c1RhYmxlLmlubmVySFRNTCA9ICcnO1xuICAgICAgICByZXN1bHRzVGFibGVPdGhlci5pbm5lckhUTUwgPSAnJztcblxuICAgICAgICBpZiAoIXVzZXJzIHx8ICF1c2Vycy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICAvLyAvLyDQpNGW0LvRjNGC0YDRg9GU0LzQviDQutC+0YDQuNGB0YLRg9Cy0LDRh9GW0LIsINGP0LrRliDQt9GA0L7QsdC40LvQuCDRgdGC0LDQstC60YMg0L3QsCDQstC60LDQt9Cw0L3QuNC5INC80LDRgtGHXG4gICAgICAgIC8vIGNvbnN0IHVzZXJzID0gdXNlcnMuZmlsdGVyKHVzZXIgPT5cbiAgICAgICAgLy8gICAgIHVzZXIuYmV0cy5zb21lKGJldCA9PiBiZXQubWF0Y2hOdW1iZXIgPT09IG1hdGNoTnVtYmVyKVxuICAgICAgICAvLyApO1xuXG4gICAgICAgIC8vIGlmICghdXNlcnMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgLy8g0JfQvdCw0YXQvtC00LjQvNC+INC/0L7RgtC+0YfQvdC+0LPQviDQutC+0YDQuNGB0YLRg9Cy0LDRh9CwXG4gICAgICAgIGNvbnN0IGN1cnJlbnRVc2VyID0gdXNlcnMuZmluZCh1c2VyID0+IHVzZXIudXNlcmlkID09PSBjdXJyZW50VXNlcklkKTtcblxuICAgICAgICAvLyDQktC40LLQvtC00LjQvNC+INCy0YHRltGFINGW0L3RiNC40YUg0LrQvtGA0LjRgdGC0YPQstCw0YfRltCyINGDIHJlc3VsdHNUYWJsZVxuICAgICAgICB1c2Vycy5mb3JFYWNoKHVzZXIgPT4ge1xuICAgICAgICAgICAgaWYgKHVzZXIudXNlcmlkICE9PSBjdXJyZW50VXNlcklkKSB7XG4gICAgICAgICAgICAgICAgZGlzcGxheVVzZXIodXNlciwgZmFsc2UsIHJlc3VsdHNUYWJsZSwgdXNlcnMsIG1hdGNoTnVtYmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8g0JLQuNCy0L7QtNC40LzQviDQv9C+0YLQvtGH0L3QvtCz0L4g0LrQvtGA0LjRgdGC0YPQstCw0YfQsCDQsiByZXN1bHRzVGFibGVPdGhlclxuICAgICAgICBpZiAoY3VycmVudFVzZXIpIHtcbiAgICAgICAgICAgIGRpc3BsYXlVc2VyKGN1cnJlbnRVc2VyLCB0cnVlLCByZXN1bHRzVGFibGVPdGhlciwgdXNlcnMsIG1hdGNoTnVtYmVyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBkaXNwbGF5VXNlcih1c2VyLCBpc0N1cnJlbnRVc2VyLCB0YWJsZSwgYWxsVXNlcnMsIG1hdGNoTnVtYmVyKSB7XG4gICAgICAgIGxldCBtYXRjaERhdGU7XG5cbiAgICAgICAgaWYgKG1hdGNoTnVtYmVyID09PSAxKSB7XG4gICAgICAgICAgICBtYXRjaERhdGUgPSBGSVJTVF9NQVRDSF9EQVRFO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYWRkaXRpb25hbFVzZXJSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuY2xhc3NMaXN0LmFkZCgndGFibGVfX3JvdycpO1xuXG4gICAgICAgIGFkZGl0aW9uYWxVc2VyUm93LmlubmVySFRNTCA9IGBcbiAgICA8ZGl2IGNsYXNzPVwidGFibGVfX3Jvdy1pdGVtXCI+JHtpc0N1cnJlbnRVc2VyID8gdXNlci51c2VyaWQgOiBtYXNrVXNlcklkKHVzZXIudXNlcmlkKX08L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwidGFibGVfX3Jvdy1pdGVtXCI+XG4gICAgICAgICR7Y3VycmVudERhdGUgPj0gbWF0Y2hEYXRlID9cbiAgICAgICAgICAgIGA8c3Bhbj4ke3VzZXIudGVhbTEgIT09IHVuZGVmaW5lZCAmJiB1c2VyLnRlYW0xICE9PSBudWxsID8gdXNlci50ZWFtMSA6IFwiLVwifTwvc3Bhbj48aW1nIHNyYz1cImh0dHBzOi8vZmF2LXByb20uY29tL2h0bWwvZ29hbHMtb3ItemVyb2VzL2ltZy92cy5wbmdcIiBhbHQ9XCJ2c1wiPjxzcGFuPiR7dXNlci50ZWFtMiAhPT0gdW5kZWZpbmVkICYmIHVzZXIudGVhbTIgIT09IG51bGwgPyB1c2VyLnRlYW0yIDogXCItXCJ9PC9zcGFuPmAgOlxuICAgICAgICAgICAgYDxzcGFuPioqPC9zcGFuPjxpbWcgc3JjPVwiaHR0cHM6Ly9mYXYtcHJvbS5jb20vaHRtbC9nb2Fscy1vci16ZXJvZXMvaW1nL3ZzLnBuZ1wiIGFsdD1cInZzXCI+PHNwYW4+Kio8L3NwYW4+YFxuICAgICAgICB9XG4gICAgPC9kaXY+XG4gICAgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVfX3Jvdy1pdGVtXCIgPioqKioqPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVfX3Jvdy1pdGVtXCIgPioqKioqPC9kaXY+XG5gO1xuXG4gICAgICAgIGlmIChpc0N1cnJlbnRVc2VyKSB7XG4gICAgICAgICAgICBhZGRpdGlvbmFsVXNlclJvdy5jbGFzc0xpc3QuYWRkKFwieW91XCIpO1xuICAgICAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuaW5uZXJIVE1MID0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVfX3Jvdy1pdGVtXCI+JHtpc0N1cnJlbnRVc2VyID8gdXNlci51c2VyaWQgOiBtYXNrVXNlcklkKHVzZXIudXNlcmlkKX08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlX19yb3ctaXRlbVwiPlxuICAgICAgICAgICAgPHNwYW4+JHt1c2VyLnRlYW0xICE9PSB1bmRlZmluZWQgJiYgdXNlci50ZWFtMSAhPT0gbnVsbCA/IHVzZXIudGVhbTEgOiBcIi1cIn08L3NwYW4+PGltZyBzcmM9XCJodHRwczovL2Zhdi1wcm9tLmNvbS9odG1sL2dvYWxzLW9yLXplcm9lcy9pbWcvdnMucG5nXCIgYWx0PVwidnNcIj48c3Bhbj4ke3VzZXIudGVhbTIgIT09IHVuZGVmaW5lZCAmJiB1c2VyLnRlYW0yICE9PSBudWxsID8gdXNlci50ZWFtMiA6IFwiLVwifTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZV9fcm93LWl0ZW1cIiA+KioqKio8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlX19yb3ctaXRlbVwiID4qKioqKjwvZGl2PlxuICAgIGA7XG4gICAgICAgICAgICBjb25zdCB5b3VCbG9jayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgeW91QmxvY2suY2xhc3NMaXN0LmFkZCgndGFibGVfX3Jvdy15b3UnKTtcbiAgICAgICAgICAgIHlvdUJsb2NrLnNldEF0dHJpYnV0ZSgnZGF0YS10cmFuc2xhdGUnLCAndGFibGVZb3UnKTtcbiAgICAgICAgICAgIC8vIHlvdUJsb2NrLnRleHRDb250ZW50ID0gXCJZb3VcIjtcbiAgICAgICAgICAgIGFkZGl0aW9uYWxVc2VyUm93Lmluc2VydEJlZm9yZSh5b3VCbG9jaywgYWRkaXRpb25hbFVzZXJSb3cuY2hpbGRyZW5bMV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGFibGUuYXBwZW5kKGFkZGl0aW9uYWxVc2VyUm93KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbWFza1VzZXJJZCh1c2VySWQpIHtcbiAgICAgICAgcmV0dXJuIFwiKipcIiArIHVzZXJJZC50b1N0cmluZygpLnNsaWNlKDIpO1xuICAgIH1cblxuICAgIC8vIDNEIGFuaW1cbiAgICBjb25zdCBjYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGVhbSwgLmFuaW1DYXJkLCAuYW5pbVJpZ2h0XCIpOyAvLyDQlNC+0LHQsNCy0LvRj9C10LwgLmFuaW1SaWdodFxuICAgIGxldCBhbmdsZSA9IDA7XG5cbiAgICBmdW5jdGlvbiBhbmltYXRlQ2FyZHMoKSB7XG4gICAgICAgIGFuZ2xlICs9IDAuOTsgLy8gc3BlZWRcbiAgICAgICAgY29uc3Qgcm90YXRlWCA9IE1hdGguc2luKGFuZ2xlICogKE1hdGguUEkgLyAxODApKSAqIDEwOyAvLyDQmtC+0LvQtdCx0LDQvdC40LUg0L/QviBYXG4gICAgICAgIGNvbnN0IHJvdGF0ZVkgPSBNYXRoLmNvcyhhbmdsZSAqIChNYXRoLlBJIC8gMTgwKSkgKiAxMDsgLy8g0JrQvtC70LXQsdCw0L3QuNC1INC/0L4gWVxuXG4gICAgICAgIGNhcmRzLmZvckVhY2goY2FyZCA9PiB7XG4gICAgICAgICAgICBpZiAoY2FyZC5jbGFzc0xpc3QuY29udGFpbnMoXCJhbmltUmlnaHRcIikpIHtcbiAgICAgICAgICAgICAgICBjYXJkLnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGVZKCR7LXJvdGF0ZVl9ZGVnKSByb3RhdGVYKCR7LXJvdGF0ZVh9ZGVnKWA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNhcmQuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZVkoJHtyb3RhdGVZfWRlZykgcm90YXRlWCgke3JvdGF0ZVh9ZGVnKWA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlQ2FyZHMpO1xuICAgIH1cbiAgICBhbmltYXRlQ2FyZHMoKTtcblxuICAgIC8vIHByZWRpY3QgdGFic1xuICAgIGNvbnN0IHRhYnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJlZGljdF9fdGFicy1nbG9iYWwgPiBkaXYsIC5wcmVkaWN0X190YWJzLWRhdGVzID4gZGl2Jyk7XG4gICAgY29uc3QgY29udGFpbmVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcmVkaWN0X19jb250YWluZXInKTtcblxuICAgIGZ1bmN0aW9uIGhhbmRsZVRhYkNsaWNrKGV2ZW50KSB7XG4gICAgICAgIGxldCBtYXRjaERhdGU7XG4gICAgICAgIGxldCBjdXJyZW50TWF0Y2ggPSAxXG5cbiAgICAgICAgY29uc3QgY2xpY2tlZFRhYiA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KFwiLnByZWRpY3RfX3RhYnMtZGF0ZVwiKSB8fCBldmVudC50YXJnZXQuY2xvc2VzdChcIi5wcmVkaWN0X190YWJzLWdvYWxcIikgfHwgZXZlbnQudGFyZ2V0LmNsb3Nlc3QoXCIucHJlZGljdF9fdGFicy1zY29yZVwiKTtcbiAgICAgICAgY29uc29sZS5sb2coY2xpY2tlZFRhYilcbiAgICAgICAgY29uc3QgdGFiUGFpciA9IGNsaWNrZWRUYWIuY2xvc2VzdCgnLnByZWRpY3RfX3RhYnMtZ2xvYmFsJykgfHwgY2xpY2tlZFRhYi5jbG9zZXN0KCcucHJlZGljdF9fdGFicy1kYXRlcycpO1xuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNsaWNrZWRUYWIpXG5cbiAgICAgICAgaWYoY3VycmVudE1hdGNoID09PSAxKXtcbiAgICAgICAgICAgIG1hdGNoRGF0ZSA9IEZJUlNUX01BVENIX0RBVEVcbiAgICAgICAgfVxuICAgICAgICBpZihjdXJyZW50RGF0ZSA+IG1hdGNoRGF0ZSl7XG4gICAgICAgICAgICBwbGFjZUJldEJ0bi5jbGFzc0xpc3QuYWRkKFwiX2xvY2tcIilcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBwbGFjZUJldEJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwiX2xvY2tcIilcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYgKGNsaWNrZWRUYWIuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkgcmV0dXJuO1xuICAgICAgICBpZiAodGFiUGFpcikge1xuICAgICAgICAgICAgY29uc3QgcGFpciA9IHRhYlBhaXIucXVlcnlTZWxlY3RvckFsbCgnLmFjdGl2ZScpO1xuICAgICAgICAgICAgaWYgKHBhaXIubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHBhaXJbMF0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjbGlja2VkVGFiLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICB1cGRhdGVDb250YWluZXJzKCk7XG4gICAgICAgIC8vIHJlZnJlc2hCZXRJbmZvKHVzZXJJZClcbiAgICAgICAgaWYoY2xpY2tlZFRhYi5jbG9zZXN0KCcucHJlZGljdF9fdGFicy1zY29yZScpKXtcbiAgICAgICAgICAgIHVwZGF0ZVRvcEZvcmVjYXN0cyhjdXJyZW50TWF0Y2gpXG4gICAgICAgICAgICBjdXJyZW50QmV0ID0gbmV3IEJldCh1c2VySWQsIGN1cnJlbnRNYXRjaClcbiAgICAgICAgICAgIG1hdGNoTnVtYmVyID0gMVxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcmVkaWN0X190ZWFtLW51bWJlclwiKS5mb3JFYWNoKChzY29yZSwgaSkgPT57XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cobWF0Y2hEYXRlLCBtYXRjaE51bWJlcilcbiAgICAgICAgICAgICAgICBpZihjdXJyZW50RGF0ZSA+IG1hdGNoRGF0ZSAmJiBpID09PSAxICYmIG1hdGNoTnVtYmVyID09PSAxKXtcbiAgICAgICAgICAgICAgICAgICAgc2NvcmUudGV4dENvbnRlbnQgPSBcIjBcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKGN1cnJlbnREYXRlID4gbWF0Y2hEYXRlICYmIGkgPT09IDAgJiYgbWF0Y2hOdW1iZXIgPT09IDEpe1xuICAgICAgICAgICAgICAgICAgICBzY29yZS50ZXh0Q29udGVudCA9IFwiMFwiXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbdHlwZT1cInJhZGlvXCJdOmNoZWNrZWQnKS5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICAgICAgICAgICAgYnV0dG9uLmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cbiAgICAgICAgbG9ja01hdGNoQ29udGFpbmVyKEZJUlNUX01BVENIX0RBVEUsIDEpOyAvLyDQlNC70Y8g0L/QtdGA0YjQvtCz0L4g0LzQsNGC0YfRg1xuICAgIH1cblxuICAgIHRhYnMuZm9yRWFjaCh0YWIgPT4gdGFiLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlVGFiQ2xpY2spKTtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUNvbnRhaW5lcnMoKSB7XG4gICAgICAgIGNvbnRhaW5lcnMuZm9yRWFjaChjb250YWluZXIgPT4gY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcbiAgICAgICAgcmVmcmVzaEJldEluZm8odXNlcklkKVxuICAgICAgICBjb25zdCBpc1Njb3JlVGFiQWN0aXZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX3RhYnMtc2NvcmUuYWN0aXZlJyk7XG4gICAgICAgIGNvbnN0IGlzR29hbFRhYkFjdGl2ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X190YWJzLWdvYWwuYWN0aXZlJyk7XG5cblxuICAgICAgICBpZiAoaXNTY29yZVRhYkFjdGl2ZSkge1xuICAgICAgICAgICAgaWYgKHNob3dUb3BGb3JlY2FzdCkgdG9wRm9yZWNhc3QuY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIilcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X19jb250YWluZXIuc2NvcmUtMScpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX3RhYnMtdHh0LTInKS5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fdGFicy10eHQtMScpLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc0dvYWxUYWJBY3RpdmUpIHtcbiAgICAgICAgICAgIGlmIChzaG93VG9wRm9yZWNhc3QpIHRvcEZvcmVjYXN0LmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fdGFicy10eHQtMScpLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X190YWJzLXR4dC0yJykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX2NvbnRhaW5lci5nb2FsLTEnKS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vc2NvcmVcblxuICAgIGZ1bmN0aW9uIHNjb3JlSW5pdChidG4pe1xuICAgICAgICBjb25zdCB0ZWFtQ29udHJvbCA9IGJ0bi5jbG9zZXN0KCcucHJlZGljdF9fdGVhbS1jb250cm9sJyk7XG4gICAgICAgIGNvbnN0IHRlYW1OdW1iZXIgPSB0ZWFtQ29udHJvbC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fdGVhbS1udW1iZXInKVxuICAgICAgICBjb25zdCBtYXRjaENvbnRhaW5lciA9IGJ0bi5jbG9zZXN0KCcucHJlZGljdF9fY29udGFpbmVyJyk7XG4gICAgICAgIGNvbnN0IG1hdGNoTnVtYmVyID0gcGFyc2VJbnQobWF0Y2hDb250YWluZXIuZGF0YXNldC5tYXRjaE51bWJlcik7XG5cbiAgICAgICAgY29uc3QgZ2V0R29hbHMgPSAodGVhbSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IG1hdGNoQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXRlYW09XCIke3RlYW19XCJdIC5wcmVkaWN0X190ZWFtLW51bWJlcmApO1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQgPyBOdW1iZXIoZWxlbWVudC50ZXh0Q29udGVudCkgfHwgMCA6IDA7XG4gICAgICAgIH07XG5cblxuICAgICAgICBjb25zdCB0ZWFtMUdvYWxzID0gZ2V0R29hbHMoJ3RlYW0xJykgO1xuICAgICAgICBjb25zdCB0ZWFtMkdvYWxzID0gZ2V0R29hbHMoJ3RlYW0yJyk7XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2codGVhbTFHb2FscywgdGVhbTJHb2FscylcblxuICAgICAgICB1cGRhdGVTY29yZShtYXRjaE51bWJlciwgdGVhbTFHb2FscywgdGVhbTJHb2Fscyk7XG4gICAgfVxuXG4gICAgLy90YWJsZSB0YWJzXG4gICAgLy8gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYmxlX190YWJzLWRhdGUnKS5mb3JFYWNoKHRhYiA9PiB7XG4gICAgLy8gICAgIHRhYi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIC8vICAgICAgICAgaWYgKHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xuICAgIC8vICAgICAgICAgICAgIHJldHVybjtcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJsZV9fdGFicy1kYXRlJykuZm9yRWFjaCh0YWIgPT4gdGFiLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcbiAgICAvLyAgICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgLy8gICAgICAgICBjdXJyZW50VGFiVGFibGUgPSBOdW1iZXIoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YWJsZV9fdGFicy1kYXRlLmFjdGl2ZVwiKS5nZXRBdHRyaWJ1dGUoXCJkYXRhLW1hdGNoLW51bWJlclwiKSlcbiAgICAvLyAgICAgICAgIHJlbmRlclVzZXJzKCk7XG4gICAgLy8gICAgIH0pO1xuICAgIC8vIH0pO1xuXG5cbiAgICAvL3BvcHVwc1xuXG4gICAgZnVuY3Rpb24gc2V0UG9wdXBzKHRyaWdnZXJCdXR0b25zLCBwb3B1cENsYXNzKSB7XG4gICAgICAgIGNvbnN0IHBvcHVwc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cHMnKTtcbiAgICAgICAgY29uc3QgcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAucG9wdXBzX19pdGVtLiR7cG9wdXBDbGFzc31gKTtcbiAgICAgICAgY29uc3QgcG9wdXBCdG4gPSBwb3B1cHNDb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5wb3B1cHNfX2l0ZW0tYnRuXCIpXG5cblxuICAgICAgICBpZiAoIXRyaWdnZXJCdXR0b25zIHx8ICFwb3B1cCB8fCAhcG9wdXBzQ29udGFpbmVyKSByZXR1cm47XG5cbiAgICAgICAgdHJpZ2dlckJ1dHRvbnMuZm9yRWFjaCh0cmlnZ2VyQnV0dG9uID0+IHtcbiAgICAgICAgICAgIHRyaWdnZXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcG9wdXBzQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ19vcGFjaXR5Jyk7XG4gICAgICAgICAgICAgICAgcG9wdXBzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQocG9wdXBDbGFzcyk7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGNsb3NlQnV0dG9uID0gcG9wdXAucXVlcnlTZWxlY3RvcignLnBvcHVwc19faXRlbS1jbG9zZScpO1xuICAgICAgICBjb25zdCBidG5DbG9zZSA9IHBvcHVwLnF1ZXJ5U2VsZWN0b3IoJy5idG4tY2xvc2UnKTtcblxuICAgICAgICBwb3B1cHNDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZS50YXJnZXQgPT09IHBvcHVwc0NvbnRhaW5lciB8fCBlLnRhcmdldCA9PT0gY2xvc2VCdXR0b24gfHwgZS50YXJnZXQgPT09IGJ0bkNsb3NlKSB7XG4gICAgICAgICAgICAgICAgY2xvc2VQb3B1cCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBmdW5jdGlvbiBjbG9zZVBvcHVwKCkge1xuICAgICAgICAgICAgcG9wdXBzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ19vcGFjaXR5Jyk7XG4gICAgICAgICAgICBwb3B1cHNDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShwb3B1cENsYXNzKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnJztcbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhwb3B1cEJ0bilcbiAgICAgICAgcG9wdXBCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PntcbiAgICAgICAgICAgIGNsb3NlUG9wdXAoKVxuICAgICAgICB9KVxuXG4gICAgfVxuXG4gICAgc2V0UG9wdXBzKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5naWRlX19saXN0LWJ0bicpLCAnZ2lkZVBvcHVwJyk7XG4gICAgc2V0UG9wdXBzKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcmVkaWN0X19idG4udG9vay1wYXJ0JyksICdfY29uZmlybVBvcHVwJyk7XG5cbiAgICAvL2dvIHRvIHByZWRpY3RcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvUHJlZGljdFwiKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJlZGljdFwiKTtcbiAgICAgICAgY29uc3QgdGFyZ2V0UG9zaXRpb24gPSB0YXJnZXRFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIHdpbmRvdy5wYWdlWU9mZnNldCAtIDI7XG5cbiAgICAgICAgd2luZG93LnNjcm9sbFRvKHtcbiAgICAgICAgICAgIHRvcDogdGFyZ2V0UG9zaXRpb24sXG4gICAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCcsXG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgY29uc3QgcmFkaW9Db250YWluZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByZWRpY3RfX3JhZGlvJyk7XG5cbiAgICByYWRpb0NvbnRhaW5lcnMuZm9yRWFjaChjb250YWluZXIgPT4ge1xuICAgICAgICBjb25zdCByYWRpb0lucHV0cyA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCcucHJlZGljdF9fcmFkaW8taXRlbScpO1xuXG4gICAgICAgIHJhZGlvSW5wdXRzLmZvckVhY2goKHJhZGlvKSA9PiB7XG4gICAgICAgICAgICByYWRpby5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByYWRpb0lucHV0cy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdfYWN0aXZlJykpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnX2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucXVlcnlTZWxlY3RvcihcImlucHV0XCIpLnZhbHVlKVxuXG4gICAgICAgICAgICAgICAgdXBkYXRlRmlyc3RHb2FsKG1hdGNoTnVtYmVyLCB0aGlzLnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFwiKS52YWx1ZSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGxldCBjbGlja1N0YXRzID0gSlNPTi5wYXJzZShzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdjbGlja1N0YXRzJykpIHx8IFtdO1xuXG4gICAgZnVuY3Rpb24gY2xpY2tUcmFja2luZyhldmVudCkge1xuICAgICAgICBjb25zdCBjbGlja05hbWUgPSBldmVudC5jdXJyZW50VGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1jbGljay1uYW1lJyk7XG4gICAgICAgIGNvbnN0IGNsaWNrRHJvcCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWNsaWNrLWRyb3AnKTtcblxuICAgICAgICBpZiAoIWNsaWNrTmFtZSkgcmV0dXJuO1xuXG4gICAgICAgIGlmIChjbGlja0Ryb3ApIHtcbiAgICAgICAgICAgIGNvbnN0IGlzQXV0aCA9ICEhdXNlcklkO1xuXG4gICAgICAgICAgICBjb25zdCBleGlzdGluZ0l0ZW0gPSBjbGlja1N0YXRzLmZpbmQoXG4gICAgICAgICAgICAgICAgaXRlbSA9PiBpdGVtLmNsaWNrZWRJdGVtID09PSBjbGlja05hbWUgJiYgaXRlbS5hdXRoID09PSBpc0F1dGhcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGlmIChleGlzdGluZ0l0ZW0pIHtcbiAgICAgICAgICAgICAgICBleGlzdGluZ0l0ZW0uY291bnRlciArPSAxO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjbGlja1N0YXRzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBjbGlja2VkSXRlbTogY2xpY2tOYW1lLFxuICAgICAgICAgICAgICAgICAgICBjb3VudGVyOiAxLFxuICAgICAgICAgICAgICAgICAgICBhdXRoOiBpc0F1dGhcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nSXRlbSA9IGNsaWNrU3RhdHMuZmluZChpdGVtID0+IGl0ZW0uY2xpY2tlZEl0ZW0gPT09IGNsaWNrTmFtZSk7XG4gICAgICAgICAgICBpZiAoZXhpc3RpbmdJdGVtKSB7XG4gICAgICAgICAgICAgICAgZXhpc3RpbmdJdGVtLmNvdW50ZXIgKz0gMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2xpY2tTdGF0cy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgY2xpY2tlZEl0ZW06IGNsaWNrTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgY291bnRlcjogMVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgnY2xpY2tTdGF0cycsIEpTT04uc3RyaW5naWZ5KGNsaWNrU3RhdHMpKTtcbiAgICAgICAgY29uc29sZS5sb2coY2xpY2tTdGF0cyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5pdENsaWNrVHJhY2tpbmcoKSB7XG4gICAgICAgIGNvbnN0IGNsaWNrYWJsZUVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtY2xpY2stbmFtZV0nKTtcbiAgICAgICAgY2xpY2thYmxlRWxlbWVudHMuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrVHJhY2tpbmcpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZW5kQ2xpY2tTdGF0cygpIHtcbiAgICAgICAgY29uc3Qgc3RvcmVkU3RhdHMgPSBKU09OLnBhcnNlKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ2NsaWNrU3RhdHMnKSk7XG5cbiAgICAgICAgaWYgKCFzdG9yZWRTdGF0cyB8fCBzdG9yZWRTdGF0cy5sZW5ndGggPT09IDApIHJldHVybjtcblxuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KCBzdG9yZWRTdGF0cykpXG5cbiAgICAgICAgZmV0Y2goYCR7YXBpVVJMfS9jbGljay1zdGF0YCwge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHN0b3JlZFN0YXRzKVxuICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgICAgICBjbGlja1N0YXRzID0gW107XG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oJ2NsaWNrU3RhdHMnKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ9Ca0LvRltC60Lgg0YPRgdC/0ZbRiNC90L4g0LLRltC00L/RgNCw0LLQu9C10L3QviDQuSDQvtGH0LjRidC10L3QvicpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ9Cf0L7QvNC40LvQutCwINC/0YDQuCDQstGW0LTQv9GA0LDQstGG0ZYg0LrQu9GW0LrRltCyJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcign0J/QvtC80LjQu9C60LAg0LfKvNGU0LTQvdCw0L3QvdGPOicsIGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNldEludGVydmFsKHNlbmRDbGlja1N0YXRzLCAxMDAwMCk7XG5cbiAgICBsb2FkVHJhbnNsYXRpb25zKClcbiAgICAgICAgLnRoZW4oaW5pdClcblxuXG4gICAgLy8g0J3QvtCy0LAg0YTRg9C90LrRhtGW0Y8g0LTQu9GPINC+0LHRgNC+0LHQutC4INC60LvRltC60ZbQsiDQvdCwINC60L3QvtC/0LrQuCArLy1cbiAgICBmdW5jdGlvbiBoYW5kbGVUZWFtQ29udHJvbENsaWNrKGUpIHtcbiAgICAgICAgY29uc3QgYnRuID0gZS50YXJnZXQuY2xvc2VzdCgnLnByZWRpY3RfX3RlYW0taW5jcmVhc2UsIC5wcmVkaWN0X190ZWFtLWRlY3JlYXNlJyk7XG4gICAgICAgIGlmICghYnRuKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgdGVhbUNvbnRyb2wgPSBidG4uY2xvc2VzdCgnLnByZWRpY3RfX3RlYW0tY29udHJvbCcpO1xuICAgICAgICBjb25zdCB0ZWFtTnVtYmVyID0gdGVhbUNvbnRyb2wucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX3RlYW0tbnVtYmVyJyk7XG4gICAgICAgIGNvbnN0IG1hdGNoQ29udGFpbmVyID0gYnRuLmNsb3Nlc3QoJy5wcmVkaWN0X19jb250YWluZXInKTtcblxuICAgICAgICBsZXQgdmFsdWUgPSBwYXJzZUludCh0ZWFtTnVtYmVyLnRleHRDb250ZW50KTtcbiAgICAgICAgaWYgKGJ0bi5jbGFzc0xpc3QuY29udGFpbnMoJ3ByZWRpY3RfX3RlYW0taW5jcmVhc2UnKSkge1xuICAgICAgICAgICAgdmFsdWUgKz0gMTtcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA+IDApIHtcbiAgICAgICAgICAgIHZhbHVlIC09IDE7XG4gICAgICAgIH1cbiAgICAgICAgdGVhbU51bWJlci50ZXh0Q29udGVudCA9IGAke3ZhbHVlfWA7XG4gICAgICAgIHNjb3JlSW5pdChidG4pO1xuICAgIH1cblxuICAgIC8vINCd0L7QstCwINGE0YPQvdC60YbRltGPINC00LvRjyDQvtCx0YDQvtCx0LrQuCDQutC70ZbQutGDINC90LAg0LrQvdC+0L/QutGDINGB0YLQsNCy0LrQuFxuICAgIGZ1bmN0aW9uIGhhbmRsZVBsYWNlQmV0Q2xpY2soZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImNsaWNrXCIpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmKGN1cnJlbnRCZXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY3VycmVudEJldCA9IG5ldyBCZXQodXNlcklkLCBtYXRjaE51bWJlcik7XG4gICAgICAgIH1cbiAgICAgICAgcGxhY2VCZXQoY3VycmVudEJldCk7XG4gICAgfVxuXG59KSgpXG5cblxuXG4iXX0=
