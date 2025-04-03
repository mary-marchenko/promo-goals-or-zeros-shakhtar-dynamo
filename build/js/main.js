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
  var _sessionStorage$getIt, _sessionStorage$getIt2, _document$querySelect3;
  var apiURL = 'https://fav-prom.com/api_goals_or_zeroes1',
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
  var FIRST_MATCH_DATE = new Date('2025-04-26T21:15:00'); // дата матчу - 30хв
  // const SECOND_MATCH_DATE = new Date('2025-03-23T21:15:00')
  var currentDate = new Date();
  function lockMatchContainer(matchDate, matchNumber) {
    if (new Date() > matchDate) {
      var _containers = document.querySelectorAll(".predict__container[data-match-number=\"".concat(matchNumber, "\"]"));
      _containers.forEach(function (container) {
        container.classList.add('_lock');
      });
    }
  }
  lockMatchContainer(FIRST_MATCH_DATE, 1); // Для першого матчу
  // lockMatchContainer(SECOND_MATCH_DATE, 2); // Для другого матчу

  setInterval(function () {
    var currentDate = new Date(); // Оновити поточну дату
    lockMatchContainer(FIRST_MATCH_DATE, 1);
    // lockMatchContainer(SECOND_MATCH_DATE, 2);
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

  var ukLeng = document.querySelector('#ukLeng');
  var enLeng = document.querySelector('#enLeng');
  var i18nData = {};
  var userId;
  userId = (_sessionStorage$getIt2 = sessionStorage.getItem("userId")) !== null && _sessionStorage$getIt2 !== void 0 ? _sessionStorage$getIt2 : null;
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
      return res.json();
    });
  };
  var getLastBet = function getLastBet(bets, matchNumber) {
    if (!bets) return false;
    return bets.find(function (bet) {
      return bet.matchNumber === matchNumber;
    });
  };
  function refreshBetInfo(userId) {
    var score1 = document.querySelector(".score-1");
    // const score2 = document.querySelector(".score-2")
    var goal1 = document.querySelector(".goal-1");
    // const goal2 = document.querySelector(".goal-2")
    var matchNumber = 1;

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
        // const lastTeam2 = document.querySelector(".predict__last-team.team2");
        var scoreTeam1 = document.querySelector(".scoreTeam1");
        // const scoreTeam2 = document.querySelector(".scoreTeam2");
        var firstGoal = document.querySelector(".predict__last-country");
        if (betAvailable) {
          lastPredict.classList.remove("hide");
          var lastBet = getLastBet(data.bets, matchNumber);
          scoreTeam1.textContent = lastBet.team1 === undefined ? "-" : "".concat(lastBet.team1);
          // scoreTeam2.textContent = lastBet.team2 === undefined ? "-" :`${lastBet.team2}`;
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
          // if (lastBet.matchNumber === 2) {
          //     lastTeam2.setAttribute("data-translate", "ukraine");
          //     lastTeam1.setAttribute("data-translate", "belgium");
          //     translate();
          // }

          if (score1.classList.contains("active")) {
            document.querySelector(".predict__last-score").classList.remove("hide");
            document.querySelector(".predict__last-goal").classList.add("hide");
          }
          if (goal1.classList.contains("active")) {
            document.querySelector(".predict__last-score").classList.add("hide");
            document.querySelector(".predict__last-goal").classList.remove("hide");
          }
          if (lastBet.firstGoal) {
            if (lastBet.firstGoal === "sh") {
              firstGoal.setAttribute("data-translate", "shakhtar");
            }
            if (lastBet.firstGoal === "dy") {
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
    }

    // console.log(activeInput);
    // console.log(activeTab)

    request('/bet', {
      method: 'POST',
      body: JSON.stringify(req)
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
      e.preventDefault();
      // console.log(currentBet)
      if (currentBet) {
        placeBet(currentBet);
      }
      if (currentBet === undefined) {
        currentBet = new Bet(userId, matchNumber);
        placeBet(currentBet);
        // console.log(currentBet)
      }
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
      var isScoreTabActive = document.querySelector('.predict__tabs-score');
      var isGoalTabActive = document.querySelector('.predict__tabs-goal');
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
    additionalUserRow.innerHTML = "\n        <div class=\"table__row-item\">".concat(isCurrentUser ? user.userid : maskUserId(user.userid), "</div>\n        <div class=\"table__row-item\">\n            ").concat(currentDate >= matchDate ? "<span>".concat(user.team1 !== undefined && user.team1 !== null ? user.team1 : "-", "</span><img src=\"https://fav-prom.com/html/goals-or-zeroes/img/vs.png\" alt=\"vs\"><span>").concat(user.team2 !== undefined && user.team2 !== null ? user.team2 : "-", "</span>") : "<span>**</span><img src=\"https://fav-prom.com/html/goals-or-zeroes/img/vs.png\" alt=\"vs\"><span>**</span>", "\n        </div>\n        \n        ").concat(user.winner === true ? "<div class=\"table__row-item\" data-translate=\"prize\">*****</div>" : "<div class=\"table__row-item\" data-translate=\"noWinners\">*****</div>", "\n        \n        ").concat(user.bonusFirstGoal === true ? "<div class=\"table__row-item\" data-translate=\"ss500\">*****</div>" : "<div class=\"table__row-item\" data-translate=\"noWinners\">*****</div>", "\n    ");
    if (isCurrentUser) {
      additionalUserRow.classList.add("you");
      additionalUserRow.innerHTML = "\n            <div class=\"table__row-item\">".concat(isCurrentUser ? user.userid : maskUserId(user.userid), "</div>\n            <div class=\"table__row-item\">\n                <span>").concat(user.team1 !== undefined && user.team1 !== null ? user.team1 : "-", "</span><img src=\"https://fav-prom.com/html/goals-or-zeroes/img/vs.png\" alt=\"vs\"><span>").concat(user.team2 !== undefined && user.team2 !== null ? user.team2 : "-", "</span>\n            </div>\n            ").concat(user.winner === true ? "<div class=\"table__row-item\" data-translate=\"prize\">*****</div>" : "<div class=\"table__row-item\" data-translate=\"noWinners\">*****</div>", "\n        \n            ").concat(user.bonusFirstGoal === true ? "<div class=\"table__row-item\" data-translate=\"ss500\">*****</div>" : "<div class=\"table__row-item\" data-translate=\"noWinners\">*****</div>", "\n        ");
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
  var tabs = document.querySelectorAll('.predict__tabs-global > div');
  var containers = document.querySelectorAll('.predict__container');
  function handleTabClick(event) {
    var matchDate;
    var clickedTab = event.target.closest(".predict__tabs-goal") || event.target.closest(".predict__tabs-score");
    // console.log(clickedTab)
    var tabPair = clickedTab.closest('.predict__tabs-global');
    var currentMatch = 1;

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
    refreshBetInfo(userId);
    updateTopForecasts(currentMatch);
    currentBet = new Bet(userId, currentMatch);
    document.querySelectorAll(".predict__team-number").forEach(function (score, i) {
      // console.log(matchDate, matchNumber)
      if (currentDate > matchDate && i === 1) {
        score.textContent = "0";
      } else if (currentDate > matchDate && i === 0) {
        score.textContent = "0";
      }
      // else{
      //     score.textContent = "0"
      // }
    });

    document.querySelectorAll('input[type="radio"]:checked').forEach(function (button) {
      button.checked = false;
    });
    lockMatchContainer(FIRST_MATCH_DATE, 1); // Для першого матчу
  }

  tabs.forEach(function (tab) {
    return tab.addEventListener('click', handleTabClick);
  });
  function updateContainers() {
    containers.forEach(function (container) {
      return container.classList.remove('active');
    });
    var isScoreTabActive = document.querySelector('.predict__tabs-score.active');
    var isGoalTabActive = document.querySelector('.predict__tabs-goal.active');
    // const isDate1Active = document.querySelector('.predict__tabs-date.date1.active');

    if (isScoreTabActive) {
      if (showTopForecast) topForecast.classList.remove("hide");
      document.querySelector('.predict__container.score-1').classList.add('active');
      document.querySelector('.predict__tabs-txt-2').classList.add('hide');
      document.querySelector('.predict__tabs-txt').classList.remove('hide');
      document.querySelector('.topForecast').classList.remove('hide');
      document.querySelector('.predict__last-goal').classList.add('hide');
      document.querySelector('.predict__last-score').classList.remove('hide');
    } else if (isGoalTabActive) {
      if (showTopForecast) topForecast.classList.add("hide");
      document.querySelector('.predict__container.goal-1').classList.add('active');
      document.querySelector('.predict__tabs-txt-2').classList.remove('hide');
      document.querySelector('.predict__tabs-txt').classList.add('hide');
      document.querySelector('.topForecast').classList.add('hide');
      document.querySelector('.predict__last-goal').classList.remove('hide');
      document.querySelector('.predict__last-score').classList.add('hide');
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
  init();

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
    var _document$querySelect4, _document$querySelect5;
    (_document$querySelect4 = document.querySelector(".goal-1")) === null || _document$querySelect4 === void 0 ? void 0 : _document$querySelect4.classList.toggle("_lock");
    (_document$querySelect5 = document.querySelector(".score-1")) === null || _document$querySelect5 === void 0 ? void 0 : _document$querySelect5.classList.toggle("_lock");
    console.log("lock table");
  });
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiYXBpVVJMIiwidW5hdXRoTXNncyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsInlvdUFyZUluQnRucyIsIm1haW5QYWdlIiwicXVlcnlTZWxlY3RvciIsInJlc3VsdHNUYWJsZSIsInJlc3VsdHNUYWJsZU90aGVyIiwicGxhY2VCZXRCdG4iLCJsYXN0UHJlZGljdCIsInRvcEZvcmVjYXN0IiwiY3VycmVudFRhYiIsImN1cnJlbnRUYWJUYWJsZSIsIm1hdGNoTnVtYmVyIiwic2hvd1RvcEZvcmVjYXN0IiwiRklSU1RfTUFUQ0hfREFURSIsIkRhdGUiLCJjdXJyZW50RGF0ZSIsImxvY2tNYXRjaENvbnRhaW5lciIsIm1hdGNoRGF0ZSIsImNvbnRhaW5lcnMiLCJmb3JFYWNoIiwiY29udGFpbmVyIiwiY2xhc3NMaXN0IiwiYWRkIiwic2V0SW50ZXJ2YWwiLCJCZXQiLCJ1c2VySWQiLCJ0ZWFtMUdvYWxzIiwidGVhbTJHb2FscyIsImZpcnN0R29hbCIsInVzZXJpZCIsInRlYW0xIiwidGVhbTIiLCJ1bmRlZmluZWQiLCJnb2Fsc1VwZGF0ZWQiLCJmaXJzdEdvYWxVcGRhdGVkIiwiY2FjaGUiLCJwcmVkaWN0RGF0YSIsInRyYW5zbGF0ZVN0YXRlIiwiZGVidWciLCJsb2NhbGUiLCJzZXNzaW9uU3RvcmFnZSIsImdldEl0ZW0iLCJ1a0xlbmciLCJlbkxlbmciLCJpMThuRGF0YSIsImN1cnJlbnRCZXQiLCJyZXF1ZXN0IiwibGluayIsImV4dHJhT3B0aW9ucyIsImZldGNoIiwiaGVhZGVycyIsInRoZW4iLCJyZXMiLCJqc29uIiwiZ2V0TGFzdEJldCIsImJldHMiLCJmaW5kIiwiYmV0IiwicmVmcmVzaEJldEluZm8iLCJzY29yZTEiLCJnb2FsMSIsIm1ldGhvZCIsImRhdGEiLCJiZXRBdmFpbGFibGUiLCJzb21lIiwibGFzdFRlYW0xIiwic2NvcmVUZWFtMSIsInJlbW92ZSIsImxhc3RCZXQiLCJ0ZXh0Q29udGVudCIsImJldENvbmZpcm1lZCIsIml0ZW0iLCJzZXRBdHRyaWJ1dGUiLCJsYXN0VGVhbTIiLCJ0cmFuc2xhdGUiLCJjb250YWlucyIsImdvYWwyIiwiZXJyb3IiLCJjb25zb2xlIiwiSW5pdFBhZ2UiLCJjaGVja1VzZXJBdXRoIiwicmVuZGVyVXNlcnMiLCJ1cGRhdGVUb3BGb3JlY2FzdHMiLCJ5b3VBcmVJbkJ0biIsInVuYXV0aE1lcyIsInBsYWNlQmV0IiwiYnRuIiwic2NvcmVJbml0IiwiYWN0aXZlVGFicyIsInJlcSIsInRhYiIsImFjdGl2ZUlucHV0IiwidmFsdWUiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImxvYWRUcmFuc2xhdGlvbnMiLCJtdXRhdGlvbk9ic2VydmVyIiwiTXV0YXRpb25PYnNlcnZlciIsIm11dGF0aW9ucyIsIm9ic2VydmUiLCJnZXRFbGVtZW50QnlJZCIsImNoaWxkTGlzdCIsInN1YnRyZWUiLCJlbGVtcyIsImVsZW0iLCJrZXkiLCJnZXRBdHRyaWJ1dGUiLCJpbm5lckhUTUwiLCJyZW1vdmVBdHRyaWJ1dGUiLCJsb2ciLCJyZWZyZXNoTG9jYWxpemVkQ2xhc3MiLCJlbGVtZW50IiwibGFuZyIsImluaXQiLCJ3aW5kb3ciLCJzdG9yZSIsInN0YXRlIiwiZ2V0U3RhdGUiLCJhdXRoIiwiaXNBdXRob3JpemVkIiwiaWQiLCJjIiwiaSIsImdfdXNlcl9pZCIsImNsZWFySW50ZXJ2YWwiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInByZXZlbnREZWZhdWx0IiwidXBkYXRlU2NvcmUiLCJ1cGRhdGVHb2FscyIsInVwZGF0ZUZpcnN0R29hbCIsImZvcmVjYXN0c0NvbnRhaW5lciIsInRvcEZvcmVjYXN0cyIsImZvcmVjYXN0IiwiZm9yZWNhc3RJdGVtIiwiY3JlYXRlRWxlbWVudCIsInBlcmNlbnRhZ2UiLCJwYXJzZUZsb2F0IiwidG9GaXhlZCIsInBlcmNlbnRhZ2VTcGFuIiwiZm9yZWNhc3RUZXh0IiwiY3JlYXRlVGV4dE5vZGUiLCJhcHBlbmRDaGlsZCIsInVzZXJzIiwiaXNTY29yZVRhYkFjdGl2ZSIsImlzR29hbFRhYkFjdGl2ZSIsImxlbmd0aCIsInBvcHVsYXRlVXNlcnNUYWJsZSIsImN1cnJlbnRVc2VySWQiLCJjdXJyZW50VXNlciIsInVzZXIiLCJkaXNwbGF5VXNlciIsImlzQ3VycmVudFVzZXIiLCJ0YWJsZSIsImFsbFVzZXJzIiwiYWRkaXRpb25hbFVzZXJSb3ciLCJtYXNrVXNlcklkIiwid2lubmVyIiwiYm9udXNGaXJzdEdvYWwiLCJ5b3VCbG9jayIsImluc2VydEJlZm9yZSIsImNoaWxkcmVuIiwiYXBwZW5kIiwidG9TdHJpbmciLCJzbGljZSIsImNhcmRzIiwiYW5nbGUiLCJhbmltYXRlQ2FyZHMiLCJyb3RhdGVYIiwiTWF0aCIsInNpbiIsIlBJIiwicm90YXRlWSIsImNvcyIsImNhcmQiLCJzdHlsZSIsInRyYW5zZm9ybSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInRhYnMiLCJoYW5kbGVUYWJDbGljayIsImV2ZW50IiwiY2xpY2tlZFRhYiIsInRhcmdldCIsImNsb3Nlc3QiLCJ0YWJQYWlyIiwiY3VycmVudE1hdGNoIiwicGFpciIsInVwZGF0ZUNvbnRhaW5lcnMiLCJzY29yZSIsImJ1dHRvbiIsImNoZWNrZWQiLCJ0ZWFtQ29udHJvbCIsInRlYW1OdW1iZXIiLCJtYXRjaENvbnRhaW5lciIsInBhcnNlSW50IiwiZGF0YXNldCIsImdldEdvYWxzIiwidGVhbSIsIk51bWJlciIsInNldFBvcHVwcyIsInRyaWdnZXJCdXR0b25zIiwicG9wdXBDbGFzcyIsInBvcHVwc0NvbnRhaW5lciIsInBvcHVwIiwicG9wdXBCdG4iLCJ0cmlnZ2VyQnV0dG9uIiwib3ZlcmZsb3ciLCJjbG9zZUJ1dHRvbiIsImJ0bkNsb3NlIiwiY2xvc2VQb3B1cCIsInRhcmdldEVsZW1lbnQiLCJ0YXJnZXRQb3NpdGlvbiIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInRvcCIsInBhZ2VZT2Zmc2V0Iiwic2Nyb2xsVG8iLCJiZWhhdmlvciIsInJhZGlvQ29udGFpbmVycyIsInJhZGlvSW5wdXRzIiwicmFkaW8iLCJ0b2dnbGUiLCJsbmdCdG4iLCJyZW1vdmVJdGVtIiwic2V0SXRlbSIsImxvY2F0aW9uIiwicmVsb2FkIiwiYXV0aEJ0biIsInVuY29uZmlybWVkIiwiY29uZmlybWVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLENBQUMsWUFBWTtFQUFBO0VBQ1QsSUFBTUEsTUFBTSxHQUFHLDJDQUEyQztJQUN0REMsVUFBVSxHQUFHQyxRQUFRLENBQUNDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQztJQUNyREMsWUFBWSxHQUFHRixRQUFRLENBQUNDLGdCQUFnQixDQUFDLFlBQVksQ0FBQztJQUN0REUsUUFBUSxHQUFHSCxRQUFRLENBQUNJLGFBQWEsQ0FBQyxXQUFXLENBQUM7SUFDOUNDLFlBQVksR0FBR0wsUUFBUSxDQUFDSSxhQUFhLENBQUMsZ0JBQWdCLENBQUM7SUFDdkRFLGlCQUFpQixHQUFHTixRQUFRLENBQUNJLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQztJQUNsRUcsV0FBVyxHQUFHUCxRQUFRLENBQUNJLGFBQWEsQ0FBQyxjQUFjLENBQUM7SUFDcERJLFdBQVcsR0FBR1IsUUFBUSxDQUFDSSxhQUFhLENBQUMsZ0JBQWdCLENBQUM7SUFDdERLLFdBQVcsR0FBR1QsUUFBUSxDQUFDSSxhQUFhLENBQUMsY0FBYyxDQUFDO0VBRXhELElBQUlNLFVBQVUsR0FBRyxDQUFDO0VBQ2xCLElBQUlDLGVBQWUsR0FBRyxDQUFDO0VBQ3ZCLElBQUlDLFdBQVcsR0FBRyxDQUFDO0VBQ25CLElBQUlDLGVBQWUsR0FBRyxLQUFLO0VBRTNCLElBQU1DLGdCQUFnQixHQUFHLElBQUlDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxFQUFDO0VBQ3pEO0VBQ0EsSUFBTUMsV0FBVyxHQUFHLElBQUlELElBQUksRUFBRTtFQUU5QixTQUFTRSxrQkFBa0IsQ0FBQ0MsU0FBUyxFQUFFTixXQUFXLEVBQUU7SUFDaEQsSUFBSSxJQUFJRyxJQUFJLEVBQUUsR0FBR0csU0FBUyxFQUFFO01BQ3hCLElBQU1D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LDBCQUFBOU4sUUFBUSxDQUFDSSxhQUFhLENBQUMsWUFBWSxDQUFDLDJEQUFwQyx1QkFBc0MySCxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBTTtJQUFBO0lBQ2xFLDBCQUFBL0gsUUFBUSxDQUFDSSxhQUFhLENBQUMsU0FBUyxDQUFDLDJEQUFqQyx1QkFBbUNrQixTQUFTLENBQUN3TSxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQzVELDBCQUFBOU4sUUFBUSxDQUFDSSxhQUFhLENBQUMsVUFBVSxDQUFDLDJEQUFsQyx1QkFBb0NrQixTQUFTLENBQUN3TSxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQzdEL0ksT0FBTyxDQUFDZ0MsR0FBRyxDQUFDLFlBQVksQ0FBQztFQUM3QixDQUFDLENBQUM7QUFDTixDQUFDLEdBQUciLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgYXBpVVJMID0gJ2h0dHBzOi8vZmF2LXByb20uY29tL2FwaV9nb2Fsc19vcl96ZXJvZXMxJyxcbiAgICAgICAgdW5hdXRoTXNncyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy51bmF1dGgtbXNnJyksXG4gICAgICAgIHlvdUFyZUluQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50b29rLXBhcnQnKSxcbiAgICAgICAgbWFpblBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZhdi1wYWdlXCIpLFxuICAgICAgICByZXN1bHRzVGFibGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVzdWx0cy10YWJsZScpLFxuICAgICAgICByZXN1bHRzVGFibGVPdGhlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyZXN1bHRzLXRhYmxlLW90aGVyJyksXG4gICAgICAgIHBsYWNlQmV0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmVkaWN0LWJ0blwiKSxcbiAgICAgICAgbGFzdFByZWRpY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByZWRpY3RfX2xhc3RcIiksXG4gICAgICAgIHRvcEZvcmVjYXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b3BGb3JlY2FzdFwiKVxuXG4gICAgbGV0IGN1cnJlbnRUYWIgPSAxXG4gICAgbGV0IGN1cnJlbnRUYWJUYWJsZSA9IDFcbiAgICBsZXQgbWF0Y2hOdW1iZXIgPSAxXG4gICAgbGV0IHNob3dUb3BGb3JlY2FzdCA9IGZhbHNlXG5cbiAgICBjb25zdCBGSVJTVF9NQVRDSF9EQVRFID0gbmV3IERhdGUoJzIwMjUtMDQtMjZUMjE6MTU6MDAnKSAvLyDQtNCw0YLQsCDQvNCw0YLRh9GDIC0gMzDRhdCyXG4gICAgLy8gY29uc3QgU0VDT05EX01BVENIX0RBVEUgPSBuZXcgRGF0ZSgnMjAyNS0wMy0yM1QyMToxNTowMCcpXG4gICAgY29uc3QgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpXG5cbiAgICBmdW5jdGlvbiBsb2NrTWF0Y2hDb250YWluZXIobWF0Y2hEYXRlLCBtYXRjaE51bWJlcikge1xuICAgICAgICBpZiAobmV3IERhdGUoKSA+IG1hdGNoRGF0ZSkge1xuICAgICAgICAgICAgY29uc3QgY29udGFpbmVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5wcmVkaWN0X19jb250YWluZXJbZGF0YS1tYXRjaC1udW1iZXI9XCIke21hdGNoTnVtYmVyfVwiXWApO1xuXG4gICAgICAgICAgICBjb250YWluZXJzLmZvckVhY2goY29udGFpbmVyID0+IHtcbiAgICAgICAgICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgnX2xvY2snKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbG9ja01hdGNoQ29udGFpbmVyKEZJUlNUX01BVENIX0RBVEUsIDEpOyAvLyDQlNC70Y8g0L/QtdGA0YjQvtCz0L4g0LzQsNGC0YfRg1xuICAgIC8vIGxvY2tNYXRjaENvbnRhaW5lcihTRUNPTkRfTUFUQ0hfREFURSwgMik7IC8vINCU0LvRjyDQtNGA0YPQs9C+0LPQviDQvNCw0YLRh9GDXG5cbiAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKTsgLy8g0J7QvdC+0LLQuNGC0Lgg0L/QvtGC0L7Rh9C90YMg0LTQsNGC0YNcbiAgICAgICAgbG9ja01hdGNoQ29udGFpbmVyKEZJUlNUX01BVENIX0RBVEUsIDEpO1xuICAgICAgICAvLyBsb2NrTWF0Y2hDb250YWluZXIoU0VDT05EX01BVENIX0RBVEUsIDIpO1xuICAgIH0sIDYwMDAwMCk7IC8vINCe0L3QvtCy0LvRjtCy0LDRgtC4INC60L7QttC90ZYgMTAg0YXQslxuXG4gICAgY2xhc3MgQmV0IHtcbiAgICAgICAgY29uc3RydWN0b3IodXNlcklkLCBtYXRjaE51bWJlciwgdGVhbTFHb2FscyA9IDAsIHRlYW0yR29hbHMgPSAwLCBmaXJzdEdvYWwpIHtcbiAgICAgICAgICAgIGlmKHVzZXJJZCAhPT0gbnVsbCkgdGhpcy51c2VyaWQgPSB1c2VySWQ7XG4gICAgICAgICAgICB0aGlzLm1hdGNoTnVtYmVyID0gbWF0Y2hOdW1iZXI7XG4gICAgICAgICAgICB0aGlzLnRlYW0xID0gdGVhbTFHb2FscztcbiAgICAgICAgICAgIHRoaXMudGVhbTIgPSB0ZWFtMkdvYWxzO1xuICAgICAgICAgICAgaWYoZmlyc3RHb2FsICE9PSB1bmRlZmluZWQpIHRoaXMuZmlyc3RHb2FsID0gZmlyc3RHb2FsO1xuICAgICAgICB9XG5cbiAgICAgICAgdXBkYXRlR29hbHModGVhbTFHb2FscywgdGVhbTJHb2Fscykge1xuICAgICAgICAgICAgaWYgKHRlYW0xR29hbHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMudGVhbTEgPSB0ZWFtMUdvYWxzICE9PSBudWxsID8gdGVhbTFHb2FscyA6IHRoaXMudGVhbTE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGVhbTJHb2FscyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50ZWFtMiA9IHRlYW0yR29hbHMgIT09IG51bGwgPyB0ZWFtMkdvYWxzIDogdGhpcy50ZWFtMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZ29hbHNVcGRhdGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHVwZGF0ZUZpcnN0R29hbChmaXJzdEdvYWwpIHtcbiAgICAgICAgICAgIGlmIChmaXJzdEdvYWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmlyc3RHb2FsID0gZmlyc3RHb2FsICE9PSBudWxsID8gZmlyc3RHb2FsIDogdGhpcy5maXJzdEdvYWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmZpcnN0R29hbFVwZGF0ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY2FjaGUgPSB7fTtcbiAgICBsZXQgcHJlZGljdERhdGEgPSBbXTtcblxuICAgIGxldCB0cmFuc2xhdGVTdGF0ZSA9IHRydWVcbiAgICBsZXQgZGVidWcgPSBmYWxzZVxuXG4gICAgbGV0IGxvY2FsZSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJsb2NhbGVcIikgPz8gXCJ1a1wiXG4gICAgLy8gbGV0IGxvY2FsZSA9IFwidWtcIlxuXG4gICAgY29uc3QgdWtMZW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3VrTGVuZycpO1xuICAgIGNvbnN0IGVuTGVuZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlbkxlbmcnKTtcblxuXG4gICAgbGV0IGkxOG5EYXRhID0ge307XG5cbiAgICBsZXQgdXNlcklkO1xuICAgIHVzZXJJZCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJ1c2VySWRcIikgPz8gbnVsbFxuICAgIC8vIHVzZXJJZCA9IDEwMDMwMDI2ODtcblxuICAgIGxldCBjdXJyZW50QmV0O1xuXG4gICAgaWYgKHVrTGVuZykgbG9jYWxlID0gJ3VrJztcbiAgICBpZiAoZW5MZW5nKSBsb2NhbGUgPSAnZW4nO1xuXG4gICAgY29uc3QgcmVxdWVzdCA9IGZ1bmN0aW9uIChsaW5rLCBleHRyYU9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIGZldGNoKGFwaVVSTCArIGxpbmssIHtcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAuLi4oZXh0cmFPcHRpb25zIHx8IHt9KVxuICAgICAgICB9KS50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgIH1cblxuICAgIGNvbnN0IGdldExhc3RCZXQgPSAoYmV0cywgbWF0Y2hOdW1iZXIpID0+e1xuICAgICAgICBpZighYmV0cykgcmV0dXJuIGZhbHNlXG4gICAgICAgIHJldHVybiBiZXRzLmZpbmQoYmV0ID0+IGJldC5tYXRjaE51bWJlciA9PT0gbWF0Y2hOdW1iZXIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hCZXRJbmZvKHVzZXJJZCkge1xuICAgICAgICBjb25zdCBzY29yZTEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNjb3JlLTFcIilcbiAgICAgICAgLy8gY29uc3Qgc2NvcmUyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zY29yZS0yXCIpXG4gICAgICAgIGNvbnN0IGdvYWwxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nb2FsLTFcIilcbiAgICAgICAgLy8gY29uc3QgZ29hbDIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdvYWwtMlwiKVxuICAgICAgICBjb25zdCBtYXRjaE51bWJlciA9IDFcblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhtYXRjaE51bWJlcilcblxuICAgICAgICByZXF1ZXN0KGAvZmF2dXNlci8ke3VzZXJJZH1gLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnXG4gICAgICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBpZihkYXRhLmJldHMpe1xuICAgICAgICAgICAgICAgIGNvbnN0IGJldEF2YWlsYWJsZSA9IGRhdGEuYmV0cy5zb21lKGJldCA9PntcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJldC5tYXRjaE51bWJlciA9PT0gbWF0Y2hOdW1iZXJcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGJldEF2YWlsYWJsZSlcbiAgICAgICAgICAgICAgICBjb25zdCBsYXN0VGVhbTEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByZWRpY3RfX2xhc3QtdGVhbS50ZWFtMVwiKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zdCBsYXN0VGVhbTIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByZWRpY3RfX2xhc3QtdGVhbS50ZWFtMlwiKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzY29yZVRlYW0xID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zY29yZVRlYW0xXCIpO1xuICAgICAgICAgICAgICAgIC8vIGNvbnN0IHNjb3JlVGVhbTIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNjb3JlVGVhbTJcIik7XG4gICAgICAgICAgICAgICAgY29uc3QgZmlyc3RHb2FsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmVkaWN0X19sYXN0LWNvdW50cnlcIik7XG4gICAgICAgICAgICAgICAgaWYoYmV0QXZhaWxhYmxlKXtcbiAgICAgICAgICAgICAgICAgICAgbGFzdFByZWRpY3QuY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIilcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFzdEJldCA9IGdldExhc3RCZXQoZGF0YS5iZXRzLCBtYXRjaE51bWJlcik7XG4gICAgICAgICAgICAgICAgICAgIHNjb3JlVGVhbTEudGV4dENvbnRlbnQgPSBsYXN0QmV0LnRlYW0xID09PSB1bmRlZmluZWQgPyBcIi1cIiA6YCR7bGFzdEJldC50ZWFtMX1gO1xuICAgICAgICAgICAgICAgICAgICAvLyBzY29yZVRlYW0yLnRleHRDb250ZW50ID0gbGFzdEJldC50ZWFtMiA9PT0gdW5kZWZpbmVkID8gXCItXCIgOmAke2xhc3RCZXQudGVhbTJ9YDtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cobGFzdEJldClcblxuICAgICAgICAgICAgICAgICAgICBpZiAobGFzdEJldC5iZXRDb25maXJtZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJlZGljdF9fbGFzdC1yZXN1bHQudW5jb25maXJtZWRcIikuZm9yRWFjaChpdGVtID0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByZWRpY3RfX2xhc3QtcmVzdWx0LmNvbmZpcm1lZFwiKS5mb3JFYWNoKGl0ZW0gPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJlZGljdF9fbGFzdC1yZXN1bHQudW5jb25maXJtZWRcIikuZm9yRWFjaChpdGVtID0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByZWRpY3RfX2xhc3QtcmVzdWx0LmNvbmZpcm1lZFwiKS5mb3JFYWNoKGl0ZW0gPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChsYXN0QmV0Lm1hdGNoTnVtYmVyID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0VGVhbTEuc2V0QXR0cmlidXRlKFwiZGF0YS10cmFuc2xhdGVcIiwgXCJzaGFraHRhclwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RUZWFtMi5zZXRBdHRyaWJ1dGUoXCJkYXRhLXRyYW5zbGF0ZVwiLCBcImR5bmFtb1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIChsYXN0QmV0Lm1hdGNoTnVtYmVyID09PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBsYXN0VGVhbTIuc2V0QXR0cmlidXRlKFwiZGF0YS10cmFuc2xhdGVcIiwgXCJ1a3JhaW5lXCIpO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgbGFzdFRlYW0xLnNldEF0dHJpYnV0ZShcImRhdGEtdHJhbnNsYXRlXCIsIFwiYmVsZ2l1bVwiKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHRyYW5zbGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICAvLyB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoc2NvcmUxLmNsYXNzTGlzdC5jb250YWlucyhcImFjdGl2ZVwiKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByZWRpY3RfX2xhc3Qtc2NvcmVcIikuY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJlZGljdF9fbGFzdC1nb2FsXCIpLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZihnb2FsMS5jbGFzc0xpc3QuY29udGFpbnMoXCJhY3RpdmVcIikpe1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmVkaWN0X19sYXN0LXNjb3JlXCIpLmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByZWRpY3RfX2xhc3QtZ29hbFwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVwiKVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYobGFzdEJldC5maXJzdEdvYWwpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYobGFzdEJldC5maXJzdEdvYWwgPT09IFwic2hcIil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RHb2FsLnNldEF0dHJpYnV0ZShcImRhdGEtdHJhbnNsYXRlXCIsIFwic2hha2h0YXJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihsYXN0QmV0LmZpcnN0R29hbCA9PT0gXCJkeVwiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdEdvYWwuc2V0QXR0cmlidXRlKFwiZGF0YS10cmFuc2xhdGVcIiwgXCJkeW5hbW9cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihsYXN0QmV0LmZpcnN0R29hbCA9PT0gXCJkcmF3XCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0R29hbC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXRyYW5zbGF0ZVwiLCBcImRyYXdcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihnb2FsMS5jbGFzc0xpc3QuY29udGFpbnMoXCJhY3RpdmVcIikgfHwgZ29hbDIuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlXCIpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByZWRpY3RfX2xhc3RcIikuY2xhc3NMaXN0LmFkZChcImhpZGVcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKCFiZXRBdmFpbGFibGUpe1xuICAgICAgICAgICAgICAgICAgICBsYXN0UHJlZGljdC5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGxhc3RQcmVkaWN0LmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yOicsIGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGNvbnN0IEluaXRQYWdlID0gKCkgPT4ge1xuICAgICAgICBjaGVja1VzZXJBdXRoKCk7XG4gICAgICAgIHJlbmRlclVzZXJzKCk7XG4gICAgICAgIHVwZGF0ZVRvcEZvcmVjYXN0cyhjdXJyZW50VGFiKVxuICAgICAgICByZWZyZXNoQmV0SW5mbyh1c2VySWQpXG4gICAgfVxuXG4gICAgbGV0IGNoZWNrVXNlckF1dGggPSAoKSA9PiB7XG4gICAgICAgIGlmICh1c2VySWQpIHtcbiAgICAgICAgICAgIHlvdUFyZUluQnRucy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJykpO1xuICAgICAgICAgICAgdW5hdXRoTXNncy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QuYWRkKCdoaWRlJykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChsZXQgeW91QXJlSW5CdG4gb2YgeW91QXJlSW5CdG5zKSB7XG4gICAgICAgICAgICAgICAgeW91QXJlSW5CdG4uY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChjb25zdCB1bmF1dGhNZXMgb2YgdW5hdXRoTXNncykge1xuICAgICAgICAgICAgICAgIHVuYXV0aE1lcy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gcGxhY2VCZXQoYmV0KSB7XG4gICAgICAgIGlmICghdXNlcklkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByZWRpY3RfX2NvbnRhaW5lci5hY3RpdmVcIilcbiAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKCcucHJlZGljdF9fdGVhbS1pbmNyZWFzZSwgLnByZWRpY3RfX3RlYW0tZGVjcmVhc2UnKVxuICAgICAgICAgICAgLmZvckVhY2goYnRuID0+IHtcbiAgICAgICAgICAgICAgICBzY29yZUluaXQoYnRuKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGFjdGl2ZVRhYnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdvYWxDb250XCIpXG4gICAgICAgIC8vIGNvbnN0IGFjdGl2ZUlucHV0ID0gYWN0aXZlVGFiLnF1ZXJ5U2VsZWN0b3IoXCIucHJlZGljdF9fcmFkaW8taXRlbSBpbnB1dFwiKVxuXG5cblxuICAgICAgICBsZXQgcmVxID0ge1xuICAgICAgICAgICAgbWF0Y2hOdW1iZXI6IGJldC5tYXRjaE51bWJlcixcbiAgICAgICAgICAgIHVzZXJpZDogYmV0LnVzZXJpZCxcbiAgICAgICAgfTtcblxuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGFjdGl2ZVRhYnMpXG4gICAgICAgIGZvciAoY29uc3QgdGFiIG9mIGFjdGl2ZVRhYnMpIHtcbiAgICAgICAgICAgIGlmICh0YWIuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlXCIpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYWN0aXZlSW5wdXQgPSB0YWIucXVlcnlTZWxlY3RvcihcIi5wcmVkaWN0X19yYWRpby1pdGVtLl9hY3RpdmUgaW5wdXRcIik7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGFiKVxuXG4gICAgICAgICAgICAgICAgaWYgKGFjdGl2ZUlucHV0KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGFjdGl2ZUlucHV0KVxuICAgICAgICAgICAgICAgICAgICByZXEuZmlyc3RHb2FsID0gYWN0aXZlSW5wdXQudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cblxuICAgICAgICBpZiAoYmV0LmZpcnN0R29hbFVwZGF0ZWQpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGJldC5maXJzdEdvYWwpXG4gICAgICAgICAgICByZXEuZmlyc3RHb2FsID0gYmV0LmZpcnN0R29hbDtcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGJldC5nb2Fsc1VwZGF0ZWQpIHtcbiAgICAgICAgICAgIHJlcS50ZWFtMSA9IGJldC50ZWFtMTtcbiAgICAgICAgfVxuXG5cblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhhY3RpdmVJbnB1dCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGFjdGl2ZVRhYilcblxuICAgICAgICByZXF1ZXN0KCcvYmV0Jywge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShyZXEpXG4gICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdCZXQgcGxhY2VkOicsIHJlcyk7XG4gICAgICAgICAgICAgICAgSW5pdFBhZ2UoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcignRXJyb3IgcGxhY2luZyBiZXQ6JywgZXJyb3IpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2FkVHJhbnNsYXRpb25zKCkge1xuICAgICAgICByZXR1cm4gZmV0Y2goYCR7YXBpVVJMfS9uZXctdHJhbnNsYXRlcy8ke2xvY2FsZX1gKS50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgICAgICAgICAgLnRoZW4oanNvbiA9PiB7XG4gICAgICAgICAgICAgICAgaTE4bkRhdGEgPSBqc29uO1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZSgpO1xuICAgICAgICAgICAgICAgIHZhciBtdXRhdGlvbk9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKG11dGF0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBtdXRhdGlvbk9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dvYWxzLW9yLXplcm9zJyksIHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlKCkge1xuICAgICAgICBjb25zdCBlbGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRyYW5zbGF0ZV0nKVxuICAgICAgICBpZih0cmFuc2xhdGVTdGF0ZSl7XG4gICAgICAgICAgICBlbGVtcy5mb3JFYWNoKGVsZW0gPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IGVsZW0uZ2V0QXR0cmlidXRlKCdkYXRhLXRyYW5zbGF0ZScpO1xuICAgICAgICAgICAgICAgIGVsZW0uaW5uZXJIVE1MID0gaTE4bkRhdGFba2V5XSB8fCAnKi0tLS1ORUVEIFRPIEJFIFRSQU5TTEFURUQtLS0tKiAgIGtleTogICcgKyBrZXk7XG4gICAgICAgICAgICAgICAgZWxlbS5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtdHJhbnNsYXRlJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidHJhbnNsYXRpb24gd29yayFcIilcbiAgICAgICAgfVxuICAgICAgICByZWZyZXNoTG9jYWxpemVkQ2xhc3MobWFpblBhZ2UpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hMb2NhbGl6ZWRDbGFzcyhlbGVtZW50KSB7XG4gICAgICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgbGFuZyBvZiBbJ3VrJywgJ2VuJ10pIHtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShsYW5nKTtcbiAgICAgICAgfVxuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQobG9jYWxlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICBpZiAod2luZG93LnN0b3JlKSB7XG4gICAgICAgICAgICB2YXIgc3RhdGUgPSB3aW5kb3cuc3RvcmUuZ2V0U3RhdGUoKTtcbiAgICAgICAgICAgIHVzZXJJZCA9IHN0YXRlLmF1dGguaXNBdXRob3JpemVkICYmIHN0YXRlLmF1dGguaWQgfHwgJyc7XG4gICAgICAgICAgICAvLyBjdXJyZW50QmV0ID0gbmV3IEJldCh1c2VySWQsIG1hdGNoTnVtYmVyKVxuICAgICAgICAgICAgSW5pdFBhZ2UoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIEluaXRQYWdlKCk7XG4gICAgICAgICAgICBsZXQgYyA9IDA7XG4gICAgICAgICAgICB2YXIgaSA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoYyA8IDUwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghIXdpbmRvdy5nX3VzZXJfaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJZCA9IHdpbmRvdy5nX3VzZXJfaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBJbml0UGFnZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMjAwKTtcblxuICAgICAgICB9XG4gICAgICAgIEluaXRQYWdlKClcblxuICAgICAgICBwbGFjZUJldEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhjdXJyZW50QmV0KVxuICAgICAgICAgICAgaWYoY3VycmVudEJldCl7XG4gICAgICAgICAgICAgICAgcGxhY2VCZXQoY3VycmVudEJldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihjdXJyZW50QmV0ID09PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgICAgIGN1cnJlbnRCZXQgPSBuZXcgQmV0KHVzZXJJZCwgbWF0Y2hOdW1iZXIpXG4gICAgICAgICAgICAgICAgcGxhY2VCZXQoY3VycmVudEJldCk7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coY3VycmVudEJldClcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gdXBkYXRlU2NvcmUobWF0Y2hOdW1iZXIsIHRlYW0xR29hbHMsIHRlYW0yR29hbHMpIHtcbiAgICAgICAgaWYgKGN1cnJlbnRCZXQgJiYgY3VycmVudEJldC5tYXRjaE51bWJlciA9PT0gbWF0Y2hOdW1iZXIpIHtcbiAgICAgICAgICAgIGN1cnJlbnRCZXQudXBkYXRlR29hbHModGVhbTFHb2FscywgdGVhbTJHb2Fscyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjdXJyZW50QmV0ID0gbmV3IEJldCh1c2VySWQsIG1hdGNoTnVtYmVyLCB0ZWFtMUdvYWxzLCB0ZWFtMkdvYWxzKTtcbiAgICAgICAgICAgIGN1cnJlbnRCZXQudXBkYXRlR29hbHModGVhbTFHb2FscywgdGVhbTJHb2Fscyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5sb2coY3VycmVudEJldCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHVwZGF0ZUZpcnN0R29hbChtYXRjaE51bWJlciwgZmlyc3RHb2FsKSB7XG4gICAgICAgIGlmIChjdXJyZW50QmV0ICYmIGN1cnJlbnRCZXQubWF0Y2hOdW1iZXIgPT09IG1hdGNoTnVtYmVyKSB7XG4gICAgICAgICAgICBjdXJyZW50QmV0LnVwZGF0ZUZpcnN0R29hbChmaXJzdEdvYWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coY3VycmVudEJldCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHVwZGF0ZVRvcEZvcmVjYXN0cyhtYXRjaE51bWJlcikge1xuICAgICAgICByZXF1ZXN0KGAvdXNlcnMvJHttYXRjaE51bWJlcn1gKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YS50b3BGb3JlY2FzdHMpOyAvLyDQn9C10YDQtdCy0ZbRgNC60LAg0L7RgtGA0LjQvNCw0L3QuNGFINC00LDQvdC40YVcblxuICAgICAgICAgICAgY29uc3QgZm9yZWNhc3RzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX2ZvcmVjYXN0cycpO1xuICAgICAgICAgICAgZm9yZWNhc3RzQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuXG5cbiAgICAgICAgICAgIGRhdGEudG9wRm9yZWNhc3RzLmZvckVhY2goZm9yZWNhc3QgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvcmVjYXN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIGZvcmVjYXN0SXRlbS5jbGFzc0xpc3QuYWRkKCdwcmVkaWN0X19mb3JlY2FzdHMtaXRlbScpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgcGVyY2VudGFnZSA9IHBhcnNlRmxvYXQoZm9yZWNhc3QucGVyY2VudGFnZSkudG9GaXhlZCgxKTtcbiAgICAgICAgICAgICAgICBjb25zdCBwZXJjZW50YWdlU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgICAgICBwZXJjZW50YWdlU3Bhbi50ZXh0Q29udGVudCA9IGAke3BlcmNlbnRhZ2V9JWA7XG5cblxuICAgICAgICAgICAgICAgIGNvbnN0IGZvcmVjYXN0VGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGAgJHtmb3JlY2FzdC5mb3JlY2FzdCA/PyBcIjAtMFwifWApO1xuICAgICAgICAgICAgICAgIGZvcmVjYXN0SXRlbS5hcHBlbmRDaGlsZChwZXJjZW50YWdlU3Bhbik7XG4gICAgICAgICAgICAgICAgZm9yZWNhc3RJdGVtLmFwcGVuZENoaWxkKGZvcmVjYXN0VGV4dCk7XG5cbiAgICAgICAgICAgICAgICBmb3JlY2FzdHNDb250YWluZXIuYXBwZW5kQ2hpbGQoZm9yZWNhc3RJdGVtKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyB0b3AgZm9yZWNhc3RzOicsIGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlbmRlclVzZXJzKCkge1xuICAgICAgICByZXF1ZXN0KGAvdXNlcnMvJHtjdXJyZW50VGFiVGFibGV9YClcbiAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xuXG4gICAgICAgICAgICAgICAgbGV0IHVzZXJzID0gZGF0YS51c2Vyc1xuXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codXNlcnMpXG4gICAgICAgICAgICAgICAgY29uc3QgaXNTY29yZVRhYkFjdGl2ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X190YWJzLXNjb3JlJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgaXNHb2FsVGFiQWN0aXZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX3RhYnMtZ29hbCcpO1xuXG4gICAgICAgICAgICAgICAgaWYodXNlcnMubGVuZ3RoID49IDUwKXtcbiAgICAgICAgICAgICAgICAgICAgc2hvd1RvcEZvcmVjYXN0ID0gdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZih1c2Vycy5sZW5ndGggPCA1MCl7XG4gICAgICAgICAgICAgICAgICAgIHNob3dUb3BGb3JlY2FzdCA9IGZhbHNlXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGlzU2NvcmVUYWJBY3RpdmUgJiYgc2hvd1RvcEZvcmVjYXN0KSB0b3BGb3JlY2FzdC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVwiKVxuICAgICAgICAgICAgICAgIGlmIChpc0dvYWxUYWJBY3RpdmUpIHRvcEZvcmVjYXN0LmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpXG5cblxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHR5cGVvZiB1c2VySWQpXG5cbiAgICAgICAgICAgICAgICBwb3B1bGF0ZVVzZXJzVGFibGUodXNlcnMsIHVzZXJJZCwgY3VycmVudFRhYlRhYmxlKVxuXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codXNlcnMpXG4gICAgICAgICAgICB9KTtcblxuICAgIH1cbiAgICBmdW5jdGlvbiBwb3B1bGF0ZVVzZXJzVGFibGUodXNlcnMsIGN1cnJlbnRVc2VySWQsIG1hdGNoTnVtYmVyKSB7XG4gICAgICAgIHJlc3VsdHNUYWJsZS5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgcmVzdWx0c1RhYmxlT3RoZXIuaW5uZXJIVE1MID0gJyc7XG5cbiAgICAgICAgaWYgKCF1c2VycyB8fCAhdXNlcnMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgLy8gLy8g0KTRltC70YzRgtGA0YPRlNC80L4g0LrQvtGA0LjRgdGC0YPQstCw0YfRltCyLCDRj9C60ZYg0LfRgNC+0LHQuNC70Lgg0YHRgtCw0LLQutGDINC90LAg0LLQutCw0LfQsNC90LjQuSDQvNCw0YLRh1xuICAgICAgICAvLyBjb25zdCB1c2VycyA9IHVzZXJzLmZpbHRlcih1c2VyID0+XG4gICAgICAgIC8vICAgICB1c2VyLmJldHMuc29tZShiZXQgPT4gYmV0Lm1hdGNoTnVtYmVyID09PSBtYXRjaE51bWJlcilcbiAgICAgICAgLy8gKTtcblxuICAgICAgICAvLyBpZiAoIXVzZXJzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIC8vINCX0L3QsNGF0L7QtNC40LzQviDQv9C+0YLQvtGH0L3QvtCz0L4g0LrQvtGA0LjRgdGC0YPQstCw0YfQsFxuICAgICAgICBjb25zdCBjdXJyZW50VXNlciA9IHVzZXJzLmZpbmQodXNlciA9PiB1c2VyLnVzZXJpZCA9PT0gY3VycmVudFVzZXJJZCk7XG5cbiAgICAgICAgLy8g0JLQuNCy0L7QtNC40LzQviDQstGB0ZbRhSDRltC90YjQuNGFINC60L7RgNC40YHRgtGD0LLQsNGH0ZbQsiDRgyByZXN1bHRzVGFibGVcbiAgICAgICAgdXNlcnMuZm9yRWFjaCh1c2VyID0+IHtcbiAgICAgICAgICAgIGlmICh1c2VyLnVzZXJpZCAhPT0gY3VycmVudFVzZXJJZCkge1xuICAgICAgICAgICAgICAgIGRpc3BsYXlVc2VyKHVzZXIsIGZhbHNlLCByZXN1bHRzVGFibGUsIHVzZXJzLCBtYXRjaE51bWJlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vINCS0LjQstC+0LTQuNC80L4g0L/QvtGC0L7Rh9C90L7Qs9C+INC60L7RgNC40YHRgtGD0LLQsNGH0LAg0LIgcmVzdWx0c1RhYmxlT3RoZXJcbiAgICAgICAgaWYgKGN1cnJlbnRVc2VyKSB7XG4gICAgICAgICAgICBkaXNwbGF5VXNlcihjdXJyZW50VXNlciwgdHJ1ZSwgcmVzdWx0c1RhYmxlT3RoZXIsIHVzZXJzLCBtYXRjaE51bWJlcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gZGlzcGxheVVzZXIodXNlciwgaXNDdXJyZW50VXNlciwgdGFibGUsIGFsbFVzZXJzLCBtYXRjaE51bWJlcikge1xuICAgICAgICBsZXQgbWF0Y2hEYXRlO1xuXG4gICAgICAgIGlmIChtYXRjaE51bWJlciA9PT0gMSkge1xuICAgICAgICAgICAgbWF0Y2hEYXRlID0gRklSU1RfTUFUQ0hfREFURTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGFkZGl0aW9uYWxVc2VyUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGFkZGl0aW9uYWxVc2VyUm93LmNsYXNzTGlzdC5hZGQoJ3RhYmxlX19yb3cnKTtcblxuICAgICAgICBhZGRpdGlvbmFsVXNlclJvdy5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZV9fcm93LWl0ZW1cIj4ke2lzQ3VycmVudFVzZXIgPyB1c2VyLnVzZXJpZCA6IG1hc2tVc2VySWQodXNlci51c2VyaWQpfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVfX3Jvdy1pdGVtXCI+XG4gICAgICAgICAgICAke2N1cnJlbnREYXRlID49IG1hdGNoRGF0ZSA/XG4gICAgICAgICAgICBgPHNwYW4+JHt1c2VyLnRlYW0xICE9PSB1bmRlZmluZWQgJiYgdXNlci50ZWFtMSAhPT0gbnVsbCA/IHVzZXIudGVhbTEgOiBcIi1cIn08L3NwYW4+PGltZyBzcmM9XCJodHRwczovL2Zhdi1wcm9tLmNvbS9odG1sL2dvYWxzLW9yLXplcm9lcy9pbWcvdnMucG5nXCIgYWx0PVwidnNcIj48c3Bhbj4ke3VzZXIudGVhbTIgIT09IHVuZGVmaW5lZCAmJiB1c2VyLnRlYW0yICE9PSBudWxsID8gdXNlci50ZWFtMiA6IFwiLVwifTwvc3Bhbj5gIDpcbiAgICAgICAgICAgIGA8c3Bhbj4qKjwvc3Bhbj48aW1nIHNyYz1cImh0dHBzOi8vZmF2LXByb20uY29tL2h0bWwvZ29hbHMtb3ItemVyb2VzL2ltZy92cy5wbmdcIiBhbHQ9XCJ2c1wiPjxzcGFuPioqPC9zcGFuPmBcbiAgICAgICAgfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgXG4gICAgICAgICR7dXNlci53aW5uZXIgPT09IHRydWUgID9cbiAgICAgICAgYDxkaXYgY2xhc3M9XCJ0YWJsZV9fcm93LWl0ZW1cIiBkYXRhLXRyYW5zbGF0ZT1cInByaXplXCI+KioqKio8L2Rpdj5gIDpcbiAgICAgICAgYDxkaXYgY2xhc3M9XCJ0YWJsZV9fcm93LWl0ZW1cIiBkYXRhLXRyYW5zbGF0ZT1cIm5vV2lubmVyc1wiPioqKioqPC9kaXY+YFxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAke3VzZXIuYm9udXNGaXJzdEdvYWwgPT09IHRydWUgID9cbiAgICAgICAgICAgIGA8ZGl2IGNsYXNzPVwidGFibGVfX3Jvdy1pdGVtXCIgZGF0YS10cmFuc2xhdGU9XCJzczUwMFwiPioqKioqPC9kaXY+YCA6XG4gICAgICAgICAgICBgPGRpdiBjbGFzcz1cInRhYmxlX19yb3ctaXRlbVwiIGRhdGEtdHJhbnNsYXRlPVwibm9XaW5uZXJzXCI+KioqKio8L2Rpdj5gXG4gICAgICAgIH1cbiAgICBgO1xuXG4gICAgICAgIGlmIChpc0N1cnJlbnRVc2VyKSB7XG4gICAgICAgICAgICBhZGRpdGlvbmFsVXNlclJvdy5jbGFzc0xpc3QuYWRkKFwieW91XCIpO1xuICAgICAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlX19yb3ctaXRlbVwiPiR7aXNDdXJyZW50VXNlciA/IHVzZXIudXNlcmlkIDogbWFza1VzZXJJZCh1c2VyLnVzZXJpZCl9PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVfX3Jvdy1pdGVtXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4+JHt1c2VyLnRlYW0xICE9PSB1bmRlZmluZWQgJiYgdXNlci50ZWFtMSAhPT0gbnVsbCA/IHVzZXIudGVhbTEgOiBcIi1cIn08L3NwYW4+PGltZyBzcmM9XCJodHRwczovL2Zhdi1wcm9tLmNvbS9odG1sL2dvYWxzLW9yLXplcm9lcy9pbWcvdnMucG5nXCIgYWx0PVwidnNcIj48c3Bhbj4ke3VzZXIudGVhbTIgIT09IHVuZGVmaW5lZCAmJiB1c2VyLnRlYW0yICE9PSBudWxsID8gdXNlci50ZWFtMiA6IFwiLVwifTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgJHt1c2VyLndpbm5lciA9PT0gdHJ1ZSAgP1xuICAgICAgICAgICAgICAgIGA8ZGl2IGNsYXNzPVwidGFibGVfX3Jvdy1pdGVtXCIgZGF0YS10cmFuc2xhdGU9XCJwcml6ZVwiPioqKioqPC9kaXY+YCA6XG4gICAgICAgICAgICAgICAgYDxkaXYgY2xhc3M9XCJ0YWJsZV9fcm93LWl0ZW1cIiBkYXRhLXRyYW5zbGF0ZT1cIm5vV2lubmVyc1wiPioqKioqPC9kaXY+YFxuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgICR7dXNlci5ib251c0ZpcnN0R29hbCA9PT0gdHJ1ZSAgP1xuICAgICAgICAgICAgICAgICAgICBgPGRpdiBjbGFzcz1cInRhYmxlX19yb3ctaXRlbVwiIGRhdGEtdHJhbnNsYXRlPVwic3M1MDBcIj4qKioqKjwvZGl2PmAgOlxuICAgICAgICAgICAgICAgICAgICBgPGRpdiBjbGFzcz1cInRhYmxlX19yb3ctaXRlbVwiIGRhdGEtdHJhbnNsYXRlPVwibm9XaW5uZXJzXCI+KioqKio8L2Rpdj5gXG4gICAgICAgICAgICB9XG4gICAgICAgIGA7XG4gICAgICAgICAgICBjb25zdCB5b3VCbG9jayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgeW91QmxvY2suY2xhc3NMaXN0LmFkZCgndGFibGVfX3Jvdy15b3UnKTtcbiAgICAgICAgICAgIHlvdUJsb2NrLnNldEF0dHJpYnV0ZSgnZGF0YS10cmFuc2xhdGUnLCAndGFibGVZb3UnKTtcbiAgICAgICAgICAgIC8vIHlvdUJsb2NrLnRleHRDb250ZW50ID0gXCJZb3VcIjtcbiAgICAgICAgICAgIGFkZGl0aW9uYWxVc2VyUm93Lmluc2VydEJlZm9yZSh5b3VCbG9jaywgYWRkaXRpb25hbFVzZXJSb3cuY2hpbGRyZW5bMV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGFibGUuYXBwZW5kKGFkZGl0aW9uYWxVc2VyUm93KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbWFza1VzZXJJZCh1c2VySWQpIHtcbiAgICAgICAgcmV0dXJuIFwiKipcIiArIHVzZXJJZC50b1N0cmluZygpLnNsaWNlKDIpO1xuICAgIH1cblxuICAgIC8vIDNEIGFuaW1cbiAgICBjb25zdCBjYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGVhbSwgLmFuaW1DYXJkLCAuYW5pbVJpZ2h0XCIpOyAvLyDQlNC+0LHQsNCy0LvRj9C10LwgLmFuaW1SaWdodFxuICAgIGxldCBhbmdsZSA9IDA7XG5cbiAgICBmdW5jdGlvbiBhbmltYXRlQ2FyZHMoKSB7XG4gICAgICAgIGFuZ2xlICs9IDAuOTsgLy8gc3BlZWRcbiAgICAgICAgY29uc3Qgcm90YXRlWCA9IE1hdGguc2luKGFuZ2xlICogKE1hdGguUEkgLyAxODApKSAqIDEwOyAvLyDQmtC+0LvQtdCx0LDQvdC40LUg0L/QviBYXG4gICAgICAgIGNvbnN0IHJvdGF0ZVkgPSBNYXRoLmNvcyhhbmdsZSAqIChNYXRoLlBJIC8gMTgwKSkgKiAxMDsgLy8g0JrQvtC70LXQsdCw0L3QuNC1INC/0L4gWVxuXG4gICAgICAgIGNhcmRzLmZvckVhY2goY2FyZCA9PiB7XG4gICAgICAgICAgICBpZiAoY2FyZC5jbGFzc0xpc3QuY29udGFpbnMoXCJhbmltUmlnaHRcIikpIHtcbiAgICAgICAgICAgICAgICBjYXJkLnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGVZKCR7LXJvdGF0ZVl9ZGVnKSByb3RhdGVYKCR7LXJvdGF0ZVh9ZGVnKWA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNhcmQuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZVkoJHtyb3RhdGVZfWRlZykgcm90YXRlWCgke3JvdGF0ZVh9ZGVnKWA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlQ2FyZHMpO1xuICAgIH1cbiAgICBhbmltYXRlQ2FyZHMoKTtcblxuICAgIC8vIHByZWRpY3QgdGFic1xuICAgIGNvbnN0IHRhYnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJlZGljdF9fdGFicy1nbG9iYWwgPiBkaXYnKTtcbiAgICBjb25zdCBjb250YWluZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByZWRpY3RfX2NvbnRhaW5lcicpO1xuXG4gICAgZnVuY3Rpb24gaGFuZGxlVGFiQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgbGV0IG1hdGNoRGF0ZTtcblxuICAgICAgICBjb25zdCBjbGlja2VkVGFiID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoXCIucHJlZGljdF9fdGFicy1nb2FsXCIpIHx8IGV2ZW50LnRhcmdldC5jbG9zZXN0KFwiLnByZWRpY3RfX3RhYnMtc2NvcmVcIik7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNsaWNrZWRUYWIpXG4gICAgICAgIGNvbnN0IHRhYlBhaXIgPSBjbGlja2VkVGFiLmNsb3Nlc3QoJy5wcmVkaWN0X190YWJzLWdsb2JhbCcpO1xuXG4gICAgICAgIGxldCBjdXJyZW50TWF0Y2ggPSAxXG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coY2xpY2tlZFRhYilcblxuICAgICAgICBpZihjdXJyZW50TWF0Y2ggPT09IDEpe1xuICAgICAgICAgICAgbWF0Y2hEYXRlID0gRklSU1RfTUFUQ0hfREFURVxuICAgICAgICB9XG5cbiAgICAgICAgaWYoY3VycmVudERhdGUgPiBtYXRjaERhdGUpe1xuICAgICAgICAgICAgcGxhY2VCZXRCdG4uY2xhc3NMaXN0LmFkZChcIl9sb2NrXCIpXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcGxhY2VCZXRCdG4uY2xhc3NMaXN0LnJlbW92ZShcIl9sb2NrXCIpXG4gICAgICAgIH1cblxuXG4gICAgICAgIGlmIChjbGlja2VkVGFiLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHJldHVybjtcbiAgICAgICAgaWYgKHRhYlBhaXIpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhaXIgPSB0YWJQYWlyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5hY3RpdmUnKTtcbiAgICAgICAgICAgIGlmIChwYWlyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBwYWlyWzBdLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY2xpY2tlZFRhYi5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgdXBkYXRlQ29udGFpbmVycygpO1xuICAgICAgICByZWZyZXNoQmV0SW5mbyh1c2VySWQpXG5cbiAgICAgICAgdXBkYXRlVG9wRm9yZWNhc3RzKGN1cnJlbnRNYXRjaClcbiAgICAgICAgY3VycmVudEJldCA9IG5ldyBCZXQodXNlcklkLCBjdXJyZW50TWF0Y2gpXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJlZGljdF9fdGVhbS1udW1iZXJcIikuZm9yRWFjaCgoc2NvcmUsIGkpID0+e1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cobWF0Y2hEYXRlLCBtYXRjaE51bWJlcilcbiAgICAgICAgICAgIGlmKGN1cnJlbnREYXRlID4gbWF0Y2hEYXRlICYmIGkgPT09IDEpe1xuICAgICAgICAgICAgICAgIHNjb3JlLnRleHRDb250ZW50ID0gXCIwXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoY3VycmVudERhdGUgPiBtYXRjaERhdGUgJiYgaSA9PT0gMCl7XG4gICAgICAgICAgICAgICAgc2NvcmUudGV4dENvbnRlbnQgPSBcIjBcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gZWxzZXtcbiAgICAgICAgICAgIC8vICAgICBzY29yZS50ZXh0Q29udGVudCA9IFwiMFwiXG4gICAgICAgICAgICAvLyB9XG5cbiAgICAgICAgfSlcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbdHlwZT1cInJhZGlvXCJdOmNoZWNrZWQnKS5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICAgICAgICBidXR0b24uY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgICAgbG9ja01hdGNoQ29udGFpbmVyKEZJUlNUX01BVENIX0RBVEUsIDEpOyAvLyDQlNC70Y8g0L/QtdGA0YjQvtCz0L4g0LzQsNGC0YfRg1xuICAgIH1cblxuICAgIHRhYnMuZm9yRWFjaCh0YWIgPT4gdGFiLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlVGFiQ2xpY2spKTtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUNvbnRhaW5lcnMoKSB7XG4gICAgICAgIGNvbnRhaW5lcnMuZm9yRWFjaChjb250YWluZXIgPT4gY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcblxuICAgICAgICBjb25zdCBpc1Njb3JlVGFiQWN0aXZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX3RhYnMtc2NvcmUuYWN0aXZlJyk7XG4gICAgICAgIGNvbnN0IGlzR29hbFRhYkFjdGl2ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X190YWJzLWdvYWwuYWN0aXZlJyk7XG4gICAgICAgIC8vIGNvbnN0IGlzRGF0ZTFBY3RpdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fdGFicy1kYXRlLmRhdGUxLmFjdGl2ZScpO1xuXG4gICAgICAgIGlmIChpc1Njb3JlVGFiQWN0aXZlKSB7XG4gICAgICAgICAgICBpZihzaG93VG9wRm9yZWNhc3QpIHRvcEZvcmVjYXN0LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fY29udGFpbmVyLnNjb3JlLTEnKS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X190YWJzLXR4dC0yJykuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX3RhYnMtdHh0JykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvcEZvcmVjYXN0JykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX2xhc3QtZ29hbCcpLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X19sYXN0LXNjb3JlJykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICB9IGVsc2UgaWYgKGlzR29hbFRhYkFjdGl2ZSkge1xuICAgICAgICAgICAgaWYoc2hvd1RvcEZvcmVjYXN0KSB0b3BGb3JlY2FzdC5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKVxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX2NvbnRhaW5lci5nb2FsLTEnKS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X190YWJzLXR4dC0yJykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX3RhYnMtdHh0JykuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvcEZvcmVjYXN0JykuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX2xhc3QtZ29hbCcpLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X19sYXN0LXNjb3JlJykuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy9zY29yZVxuXG4gICAgZnVuY3Rpb24gc2NvcmVJbml0KGJ0bil7XG4gICAgICAgIGNvbnN0IHRlYW1Db250cm9sID0gYnRuLmNsb3Nlc3QoJy5wcmVkaWN0X190ZWFtLWNvbnRyb2wnKTtcbiAgICAgICAgY29uc3QgdGVhbU51bWJlciA9IHRlYW1Db250cm9sLnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X190ZWFtLW51bWJlcicpXG4gICAgICAgIGNvbnN0IG1hdGNoQ29udGFpbmVyID0gYnRuLmNsb3Nlc3QoJy5wcmVkaWN0X19jb250YWluZXInKTtcbiAgICAgICAgY29uc3QgbWF0Y2hOdW1iZXIgPSBwYXJzZUludChtYXRjaENvbnRhaW5lci5kYXRhc2V0Lm1hdGNoTnVtYmVyKTtcblxuICAgICAgICBjb25zdCBnZXRHb2FscyA9ICh0ZWFtKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gbWF0Y2hDb250YWluZXIucXVlcnlTZWxlY3RvcihgW2RhdGEtdGVhbT1cIiR7dGVhbX1cIl0gLnByZWRpY3RfX3RlYW0tbnVtYmVyYCk7XG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudCA/IE51bWJlcihlbGVtZW50LnRleHRDb250ZW50KSB8fCAwIDogMDtcbiAgICAgICAgfTtcblxuXG4gICAgICAgIGNvbnN0IHRlYW0xR29hbHMgPSBnZXRHb2FscygndGVhbTEnKSA7XG4gICAgICAgIGNvbnN0IHRlYW0yR29hbHMgPSBnZXRHb2FscygndGVhbTInKTtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0ZWFtMUdvYWxzLCB0ZWFtMkdvYWxzKVxuXG4gICAgICAgIHVwZGF0ZVNjb3JlKG1hdGNoTnVtYmVyLCB0ZWFtMUdvYWxzLCB0ZWFtMkdvYWxzKTtcbiAgICB9XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJlZGljdF9fdGVhbS1pbmNyZWFzZSwgLnByZWRpY3RfX3RlYW0tZGVjcmVhc2UnKS5mb3JFYWNoKGJ0biA9PiB7XG4gICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgICAgICBjb25zdCB0ZWFtQ29udHJvbCA9IGJ0bi5jbG9zZXN0KCcucHJlZGljdF9fdGVhbS1jb250cm9sJyk7XG4gICAgICAgICAgICBjb25zdCB0ZWFtTnVtYmVyID0gdGVhbUNvbnRyb2wucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX3RlYW0tbnVtYmVyJylcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoQ29udGFpbmVyID0gYnRuLmNsb3Nlc3QoJy5wcmVkaWN0X19jb250YWluZXInKTtcblxuICAgICAgICAgICAgbGV0IHZhbHVlID0gcGFyc2VJbnQodGVhbU51bWJlci50ZXh0Q29udGVudCk7XG4gICAgICAgICAgICBpZiAoYnRuLmNsYXNzTGlzdC5jb250YWlucygncHJlZGljdF9fdGVhbS1pbmNyZWFzZScpKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgKz0gMTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPiAwKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgLT0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRlYW1OdW1iZXIudGV4dENvbnRlbnQgPSBgJHt2YWx1ZX1gO1xuICAgICAgICAgICAgc2NvcmVJbml0KGJ0bilcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGJldClcbiAgICAgICAgfSlcbiAgICB9KTtcblxuICAgIC8vdGFibGUgdGFic1xuICAgIC8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJsZV9fdGFicy1kYXRlJykuZm9yRWFjaCh0YWIgPT4ge1xuICAgIC8vICAgICB0YWIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAvLyAgICAgICAgIGlmICh0aGlzLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcbiAgICAvLyAgICAgICAgICAgICByZXR1cm47XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFibGVfX3RhYnMtZGF0ZScpLmZvckVhY2godGFiID0+IHRhYi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XG4gICAgLy8gICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIC8vICAgICAgICAgY3VycmVudFRhYlRhYmxlID0gTnVtYmVyKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFibGVfX3RhYnMtZGF0ZS5hY3RpdmVcIikuZ2V0QXR0cmlidXRlKFwiZGF0YS1tYXRjaC1udW1iZXJcIikpXG4gICAgLy8gICAgICAgICByZW5kZXJVc2VycygpO1xuICAgIC8vICAgICB9KTtcbiAgICAvLyB9KTtcbiAgICBcblxuICAgIC8vcG9wdXBzXG5cbiAgICBmdW5jdGlvbiBzZXRQb3B1cHModHJpZ2dlckJ1dHRvbnMsIHBvcHVwQ2xhc3MpIHtcbiAgICAgICAgY29uc3QgcG9wdXBzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwcycpO1xuICAgICAgICBjb25zdCBwb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5wb3B1cHNfX2l0ZW0uJHtwb3B1cENsYXNzfWApO1xuICAgICAgICBjb25zdCBwb3B1cEJ0biA9IHBvcHVwc0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwc19faXRlbS1idG5cIilcblxuXG4gICAgICAgIGlmICghdHJpZ2dlckJ1dHRvbnMgfHwgIXBvcHVwIHx8ICFwb3B1cHNDb250YWluZXIpIHJldHVybjtcblxuICAgICAgICB0cmlnZ2VyQnV0dG9ucy5mb3JFYWNoKHRyaWdnZXJCdXR0b24gPT4ge1xuICAgICAgICAgICAgdHJpZ2dlckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBwb3B1cHNDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnX29wYWNpdHknKTtcbiAgICAgICAgICAgICAgICBwb3B1cHNDb250YWluZXIuY2xhc3NMaXN0LmFkZChwb3B1cENsYXNzKTtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgY2xvc2VCdXR0b24gPSBwb3B1cC5xdWVyeVNlbGVjdG9yKCcucG9wdXBzX19pdGVtLWNsb3NlJyk7XG4gICAgICAgIGNvbnN0IGJ0bkNsb3NlID0gcG9wdXAucXVlcnlTZWxlY3RvcignLmJ0bi1jbG9zZScpO1xuXG4gICAgICAgIHBvcHVwc0NvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgICAgIGlmIChlLnRhcmdldCA9PT0gcG9wdXBzQ29udGFpbmVyIHx8IGUudGFyZ2V0ID09PSBjbG9zZUJ1dHRvbiB8fCBlLnRhcmdldCA9PT0gYnRuQ2xvc2UpIHtcbiAgICAgICAgICAgICAgICBjbG9zZVBvcHVwKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZ1bmN0aW9uIGNsb3NlUG9wdXAoKSB7XG4gICAgICAgICAgICBwb3B1cHNDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnX29wYWNpdHknKTtcbiAgICAgICAgICAgIHBvcHVwc0NvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKHBvcHVwQ2xhc3MpO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICcnO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHBvcHVwQnRuKVxuICAgICAgICBwb3B1cEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+e1xuICAgICAgICAgICAgY2xvc2VQb3B1cCgpXG4gICAgICAgIH0pXG5cbiAgICB9XG5cbiAgICBzZXRQb3B1cHMoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdpZGVfX2xpc3QtYnRuJyksICdnaWRlUG9wdXAnKTtcbiAgICBzZXRQb3B1cHMoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByZWRpY3RfX2J0bi50b29rLXBhcnQnKSwgJ19jb25maXJtUG9wdXAnKTtcblxuICAgIC8vZ28gdG8gcHJlZGljdFxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9QcmVkaWN0XCIpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCB0YXJnZXRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmVkaWN0XCIpO1xuICAgICAgICBjb25zdCB0YXJnZXRQb3NpdGlvbiA9IHRhcmdldEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgd2luZG93LnBhZ2VZT2Zmc2V0IC0gMjtcblxuICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oe1xuICAgICAgICAgICAgdG9wOiB0YXJnZXRQb3NpdGlvbixcbiAgICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJyxcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCByYWRpb0NvbnRhaW5lcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJlZGljdF9fcmFkaW8nKTtcblxuICAgIHJhZGlvQ29udGFpbmVycy5mb3JFYWNoKGNvbnRhaW5lciA9PiB7XG4gICAgICAgIGNvbnN0IHJhZGlvSW5wdXRzID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcmVkaWN0X19yYWRpby1pdGVtJyk7XG5cbiAgICAgICAgcmFkaW9JbnB1dHMuZm9yRWFjaCgocmFkaW8pID0+IHtcbiAgICAgICAgICAgIHJhZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJhZGlvSW5wdXRzLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ19hY3RpdmUnKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdfYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5xdWVyeVNlbGVjdG9yKFwiaW5wdXRcIikudmFsdWUpXG5cbiAgICAgICAgICAgICAgICB1cGRhdGVGaXJzdEdvYWwobWF0Y2hOdW1iZXIsIHRoaXMucXVlcnlTZWxlY3RvcihcImlucHV0XCIpLnZhbHVlKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGxvYWRUcmFuc2xhdGlvbnMoKVxuICAgICAgICAudGhlbihpbml0KVxuXG4gICAgaW5pdCgpXG5cbiAgICAvLyBURVNUXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhcmstYnRuJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgnZGFyaycpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgbG5nQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5sbmctYnRuXCIpXG5cbiAgICBsbmdCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJsb2NhbGVcIikpIHtcbiAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oXCJsb2NhbGVcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwibG9jYWxlXCIsIFwiZW5cIik7XG4gICAgICAgIH1cbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgYXV0aEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYXV0aC1idG5cIilcblxuICAgIGF1dGhCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICBpZih1c2VySWQpe1xuICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShcInVzZXJJZFwiKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJ1c2VySWRcIiwgXCIxODkwODQ2NVwiKVxuICAgICAgICB9XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKVxuICAgIH0pO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJ0bi1sYXN0UHJlZCcpLmZvckVhY2goYnV0dG9uID0+IHtcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJlZGljdF9fbGFzdCcpLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdoaWRlJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBzZXRQb3B1cHMoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJ0bi10aGVua3MnKSwgJ19jb25maXJtUG9wdXAnKTtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG4tcHJlZGljdCcpLmZvckVhY2goYnV0dG9uID0+IHtcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnVuY29uZmlybWVkJykuZm9yRWFjaCh1bmNvbmZpcm1lZCA9PiB7XG4gICAgICAgICAgICAgICAgdW5jb25maXJtZWQuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbmZpcm1lZCcpLmZvckVhY2goY29uZmlybWVkID0+IHtcbiAgICAgICAgICAgICAgICBjb25maXJtZWQuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWVudS1idG5cIik/LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1lbnUtdGVzdFwiKT8uY2xhc3NMaXN0LnRvZ2dsZShcImhpZGVcIik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG4tYWZ0ZXJcIik/LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ29hbC0xXCIpPy5jbGFzc0xpc3QudG9nZ2xlKFwiX2xvY2tcIilcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zY29yZS0xXCIpPy5jbGFzc0xpc3QudG9nZ2xlKFwiX2xvY2tcIilcbiAgICAgICAgY29uc29sZS5sb2coXCJsb2NrIHRhYmxlXCIpXG4gICAgfSk7XG59KSgpIl19
