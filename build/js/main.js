"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
(function () {
  var _sessionStorage$getIt, _sessionStorage$getIt2, _document$querySelect3;
  var apiURL = 'https://fav-prom.com/api_football_shakhtar',
    // const apiURL = 'https://fav-prom.com/api_goals_or_zeros',
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
  var currentDate = new Date("2024-04-26T21:15:00");
  function lockMatchContainer(matchDate, matchNumber) {
    if (currentDate > matchDate) {
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
  var translateState = false;
  var debug = true;
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
  var request = function request(link) {
    return fetch(apiURL + link, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(function (res) {
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
        var lastTeam2 = document.querySelector(".predict__last-team.team2");
        var scoreTeam1 = document.querySelector(".scoreTeam1");
        var scoreTeam2 = document.querySelector(".scoreTeam2");
        var firstGoal = document.querySelector(".predict__last-country");
        if (betAvailable) {
          lastPredict.classList.remove("hide");
          var lastBet = getLastBet(data.bets, matchNumber);
          scoreTeam1.textContent = lastBet.team1 === undefined ? "-" : "".concat(lastBet.team1);
          scoreTeam2.textContent = lastBet.team2 === undefined ? "-" : "".concat(lastBet.team2);
          console.log(lastBet);
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
            if (goal1.classList.contains("active")) {
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

    if (!debug) {
      request('/bet', {
        method: 'POST',
        body: JSON.stringify(req)
      }).then(function (res) {
        console.log('Bet placed:', res);
        InitPage();
      })["catch"](function (error) {
        return console.error('Error placing bet:', error);
      });
    } else {
      console.log('debug is enable, your bet:', req);
      InitPage();
    }
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
    console.log(currentBet);
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
        console.log(currentBet);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiYXBpVVJMIiwidW5hdXRoTXNncyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsInlvdUFyZUluQnRucyIsIm1haW5QYWdlIiwicXVlcnlTZWxlY3RvciIsInJlc3VsdHNUYWJsZSIsInJlc3VsdHNUYWJsZU90aGVyIiwicGxhY2VCZXRCdG4iLCJsYXN0UHJlZGljdCIsInRvcEZvcmVjYXN0IiwiY3VycmVudFRhYiIsImN1cnJlbnRUYWJUYWJsZSIsIm1hdGNoTnVtYmVyIiwic2hvd1RvcEZvcmVjYXN0IiwiRklSU1RfTUFUQ0hfREFURSIsIkRhdGUiLCJjdXJyZW50RGF0ZSIsImxvY2tNYXRjaENvbnRhaW5lciIsIm1hdGNoRGF0ZSIsImNvbnRhaW5lcnMiLCJmb3JFYWNoIiwiY29udGFpbmVyIiwiY2xhc3NMaXN0IiwiYWRkIiwic2V0SW50ZXJ2YWwiLCJCZXQiLCJ1c2VySWQiLCJ0ZWFtMUdvYWxzIiwidGVhbTJHb2FscyIsImZpcnN0R29hbCIsInVzZXJpZCIsInRlYW0xIiwidGVhbTIiLCJ1bmRlZmluZWQiLCJnb2Fsc1VwZGF0ZWQiLCJmaXJzdEdvYWxVcGRhdGVkIiwiY2FjaGUiLCJwcmVkaWN0RGF0YSIsInRyYW5zbGF0ZVN0YXRlIiwiZGVidWciLCJsb2NhbGUiLCJzZXNzaW9uU3RvcmFnZSIsImdldEl0ZW0iLCJ1a0xlbmciLCJlbkxlbmciLCJpMThuRGF0YSIsImN1cnJlbnRCZXQiLCJyZXF1ZXN0IiwibGluayIsImZldGNoIiwiaGVhZGVycyIsInRoZW4iLCJyZXMiLCJqc29uIiwiZ2V0TGFzdEJldCIsImJldHMiLCJmaW5kIiwiYmV0IiwicmVmcmVzaEJldEluZm8iLCJzY29yZTEiLCJnb2FsMSIsIm1ldGhvZCIsImRhdGEiLCJiZXRBdmFpbGFibGUiLCJzb21lIiwibGFzdFRlYW0xIiwibGFzdFRlYW0yIiwic2NvcmVUZWFtMSIsInNjb3JlVGVhbTIiLCJyZW1vdmUiLCJsYXN0QmV0IiwidGV4dENvbnRlbnQiLCJjb25zb2xlIiwibG9nIiwiYmV0Q29uZmlybWVkIiwiaXRlbSIsInNldEF0dHJpYnV0ZSIsInRyYW5zbGF0ZSIsImNvbnRhaW5zIiwiZXJyb3IiLCJJbml0UGFnZSIsImNoZWNrVXNlckF1dGgiLCJyZW5kZXJVc2VycyIsInVwZGF0ZVRvcEZvcmVjYXN0cyIsInlvdUFyZUluQnRuIiwidW5hdXRoTWVzIiwicGxhY2VCZXQiLCJidG4iLCJzY29yZUluaXQiLCJhY3RpdmVUYWJzIiwicmVxIiwidGFiIiwiYWN0aXZlSW5wdXQiLCJ2YWx1ZSIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwibG9hZFRyYW5zbGF0aW9ucyIsIm11dGF0aW9uT2JzZXJ2ZXIiLCJNdXRhdGlvbk9ic2VydmVyIiwibXV0YXRpb25zIiwib2JzZXJ2ZSIsImdldEVsZW1lbnRCeUlkIiwiY2hpbGRMaXN0Iiwic3VidHJlZSIsImVsZW1zIiwiZWxlbSIsImtleSIsImdldEF0dHJpYnV0ZSIsImlubmVySFRNTCIsInJlbW92ZUF0dHJpYnV0ZSIsInJlZnJlc2hMb2NhbGl6ZWRDbGFzcyIsImVsZW1lbnQiLCJsYW5nIiwiaW5pdCIsIndpbmRvdyIsInN0b3JlIiwic3RhdGUiLCJnZXRTdGF0ZSIsImF1dGgiLCJpc0F1dGhvcml6ZWQiLCJpZCIsImMiLCJpIiwiZ191c2VyX2lkIiwiY2xlYXJJbnRlcnZhbCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwicHJldmVudERlZmF1bHQiLCJ1cGRhdGVTY29yZSIsInVwZGF0ZUdvYWxzIiwidXBkYXRlRmlyc3RHb2FsIiwiZm9yZWNhc3RzQ29udGFpbmVyIiwidG9wRm9yZWNhc3RzIiwiZm9yZWNhc3QiLCJmb3JlY2FzdEl0ZW0iLCJjcmVhdGVFbGVtZW50IiwicGVyY2VudGFnZSIsInBhcnNlRmxvYXQiLCJ0b0ZpeGVkIiwicGVyY2VudGFnZVNwYW4iLCJmb3JlY2FzdFRleHQiLCJjcmVhdGVUZXh0Tm9kZSIsImFwcGVuZENoaWxkIiwidXNlcnMiLCJpc1Njb3JlVGFiQWN0aXZlIiwiaXNHb2FsVGFiQWN0aXZlIiwibGVuZ3RoIiwicG9wdWxhdGVVc2Vyc1RhYmxlIiwiY3VycmVudFVzZXJJZCIsImN1cnJlbnRVc2VyIiwidXNlciIsImRpc3BsYXlVc2VyIiwiaXNDdXJyZW50VXNlciIsInRhYmxlIiwiYWxsVXNlcnMiLCJhZGRpdGlvbmFsVXNlclJvdyIsIm1hc2tVc2VySWQiLCJ3aW5uZXIiLCJib251c0ZpcnN0R29hbCIsInlvdUJsb2NrIiwiaW5zZXJ0QmVmb3JlIiwiY2hpbGRyZW4iLCJhcHBlbmQiLCJ0b1N0cmluZyIsInNsaWNlIiwiY2FyZHMiLCJhbmdsZSIsImFuaW1hdGVDYXJkcyIsInJvdGF0ZVgiLCJNYXRoIiwic2luIiwiUEkiLCJyb3RhdGVZIiwiY29zIiwiY2FyZCIsInN0eWxlIiwidHJhbnNmb3JtIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwidGFicyIsImhhbmRsZVRhYkNsaWNrIiwiZXZlbnQiLCJjbGlja2VkVGFiIiwidGFyZ2V0IiwiY2xvc2VzdCIsInRhYlBhaXIiLCJjdXJyZW50TWF0Y2giLCJwYWlyIiwidXBkYXRlQ29udGFpbmVycyIsInNjb3JlIiwiYnV0dG9uIiwiY2hlY2tlZCIsInRlYW1Db250cm9sIiwidGVhbU51bWJlciIsIm1hdGNoQ29udGFpbmVyIiwicGFyc2VJbnQiLCJkYXRhc2V0IiwiZ2V0R29hbHMiLCJ0ZWFtIiwiTnVtYmVyIiwic2V0UG9wdXBzIiwidHJpZ2dlckJ1dHRvbnMiLCJwb3B1cENsYXNzIiwicG9wdXBzQ29udGFpbmVyIiwicG9wdXAiLCJwb3B1cEJ0biIsInRyaWdnZXJCdXR0b24iLCJvdmVyZmxvdyIsImNsb3NlQnV0dG9uIiwiYnRuQ2xvc2UiLCJjbG9zZVBvcHVwIiwidGFyZ2V0RWxlbWVudCIsInRhcmdldFBvc2l0aW9uIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwidG9wIiwicGFnZVlPZmZzZXQiLCJzY3JvbGxUbyIsImJlaGF2aW9yIiwicmFkaW9Db250YWluZXJzIiwicmFkaW9JbnB1dHMiLCJyYWRpbyIsInRvZ2dsZSIsImxuZ0J0biIsInJlbW92ZUl0ZW0iLCJzZXRJdGVtIiwibG9jYXRpb24iLCJyZWxvYWQiLCJhdXRoQnRuIiwidW5jb25maXJtZWQiLCJjb25maXJtZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsQ0FBQyxZQUFZO0VBQUE7RUFDVCxJQUFNQSxNQUFNLEdBQUcsNENBQTRDO0lBQzNEO0lBQ0lDLFVBQVUsR0FBR0MsUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUM7SUFDckRDLFlBQVksR0FBR0YsUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUM7SUFDdERFLFFBQVEsR0FBR0gsUUFBUSxDQUFDSSxhQUFhLENBQUMsV0FBVyxDQUFDO0lBQzlDQyxZQUFZLEdBQUdMLFFBQVEsQ0FBQ0ksYUFBYSxDQUFDLGdCQUFnQixDQUFDO0lBQ3ZERSxpQkFBaUIsR0FBR04sUUFBUSxDQUFDSSxhQUFhLENBQUMsc0JBQXNCLENBQUM7SUFDbEVHLFdBQVcsR0FBR1AsUUFBUSxDQUFDSSxhQUFhLENBQUMsY0FBYyxDQUFDO0lBQ3BESSxXQUFXLEdBQUdSLFFBQVEsQ0FBQ0ksYUFBYSxDQUFDLGdCQUFnQixDQUFDO0lBQ3RESyxXQUFXLEdBQUdULFFBQVEsQ0FBQ0ksYUFBYSxDQUFDLGNBQWMsQ0FBQztFQUV4RCxJQUFJTSxVQUFVLEdBQUcsQ0FBQztFQUNsQixJQUFJQyxlQUFlLEdBQUcsQ0FBQztFQUN2QixJQUFJQyxXQUFXLEdBQUcsQ0FBQztFQUNuQixJQUFJQyxlQUFlLEdBQUcsS0FBSztFQUUzQixJQUFNQyxnQkFBZ0IsR0FBRyxJQUFJQyxJQUFJLENBQUMscUJBQXFCLENBQUMsRUFBQztFQUN6RDtFQUNBLElBQU1DLFdBQVcsR0FBRyxJQUFJRCxJQUFJLENBQUMscUJBQXFCLENBQUM7RUFFbkQsU0FBU0Usa0JBQWtCLENBQUNDLFNBQVMsRUFBRU4sV0FBVyxFQUFFO0lBQ2hELElBQUlJLFdBQVcsR0FBR0UsU0FBUyxFQUFFO01BQ3pCLElBQU1DLFdBQVUs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LFNBQVMsRUFBSTtRQUN6REEsU0FBUyxDQUFDL00sU0FBUyxDQUFDdU0sTUFBTSxDQUFDLFFBQVEsQ0FBQztNQUN4QyxDQUFDLENBQUM7SUFDTixDQUFDLENBQUM7RUFDTixDQUFDLENBQUM7RUFFRjdOLFFBQVEsQ0FBQzhILGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLFlBQU07SUFBQTtJQUNoRCx5QkFBQTlILFFBQVEsQ0FBQ0ksYUFBYSxDQUFDLFdBQVcsQ0FBQywwREFBbkMsc0JBQXFDMEgsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQU07TUFBQTtNQUNqRSwwQkFBQTlILFFBQVEsQ0FBQ0ksYUFBYSxDQUFDLFlBQVksQ0FBQywyREFBcEMsdUJBQXNDa0IsU0FBUyxDQUFDdU0sTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNsRSxDQUFDLENBQUM7RUFDTixDQUFDLENBQUM7RUFFRiwwQkFBQTdOLFFBQVEsQ0FBQ0ksYUFBYSxDQUFDLFlBQVksQ0FBQywyREFBcEMsdUJBQXNDMEgsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQU07SUFBQTtJQUNsRSwwQkFBQTlILFFBQVEsQ0FBQ0ksYUFBYSxDQUFDLFNBQVMsQ0FBQywyREFBakMsdUJBQW1Da0IsU0FBUyxDQUFDdU0sTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUM1RCwwQkFBQTdOLFFBQVEsQ0FBQ0ksYUFBYSxDQUFDLFVBQVUsQ0FBQywyREFBbEMsdUJBQW9Da0IsU0FBUyxDQUFDdU0sTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUM3RHJKLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLFlBQVksQ0FBQztFQUM3QixDQUFDLENBQUM7QUFDTixDQUFDLEdBQUciLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgYXBpVVJMID0gJ2h0dHBzOi8vZmF2LXByb20uY29tL2FwaV9mb290YmFsbF9zaGFraHRhcicsXG4gICAgLy8gY29uc3QgYXBpVVJMID0gJ2h0dHBzOi8vZmF2LXByb20uY29tL2FwaV9nb2Fsc19vcl96ZXJvcycsXG4gICAgICAgIHVuYXV0aE1zZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudW5hdXRoLW1zZycpLFxuICAgICAgICB5b3VBcmVJbkJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9vay1wYXJ0JyksXG4gICAgICAgIG1haW5QYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mYXYtcGFnZVwiKSxcbiAgICAgICAgcmVzdWx0c1RhYmxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Jlc3VsdHMtdGFibGUnKSxcbiAgICAgICAgcmVzdWx0c1RhYmxlT3RoZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVzdWx0cy10YWJsZS1vdGhlcicpLFxuICAgICAgICBwbGFjZUJldEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJlZGljdC1idG5cIiksXG4gICAgICAgIGxhc3RQcmVkaWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmVkaWN0X19sYXN0XCIpLFxuICAgICAgICB0b3BGb3JlY2FzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9wRm9yZWNhc3RcIilcblxuICAgIGxldCBjdXJyZW50VGFiID0gMVxuICAgIGxldCBjdXJyZW50VGFiVGFibGUgPSAxXG4gICAgbGV0IG1hdGNoTnVtYmVyID0gMVxuICAgIGxldCBzaG93VG9wRm9yZWNhc3QgPSBmYWxzZVxuXG4gICAgY29uc3QgRklSU1RfTUFUQ0hfREFURSA9IG5ldyBEYXRlKCcyMDI1LTA0LTI2VDIxOjE1OjAwJykgLy8g0LTQsNGC0LAg0LzQsNGC0YfRgyAtIDMw0YXQslxuICAgIC8vIGNvbnN0IFNFQ09ORF9NQVRDSF9EQVRFID0gbmV3IERhdGUoJzIwMjUtMDMtMjNUMjE6MTU6MDAnKVxuICAgIGNvbnN0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoXCIyMDI0LTA0LTI2VDIxOjE1OjAwXCIpXG5cbiAgICBmdW5jdGlvbiBsb2NrTWF0Y2hDb250YWluZXIobWF0Y2hEYXRlLCBtYXRjaE51bWJlcikge1xuICAgICAgICBpZiAoY3VycmVudERhdGUgPiBtYXRjaERhdGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAucHJlZGljdF9fY29udGFpbmVyW2RhdGEtbWF0Y2gtbnVtYmVyPVwiJHttYXRjaE51bWJlcn1cIl1gKTtcblxuICAgICAgICAgICAgY29udGFpbmVycy5mb3JFYWNoKGNvbnRhaW5lciA9PiB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ19sb2NrJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxvY2tNYXRjaENvbnRhaW5lcihGSVJTVF9NQVRDSF9EQVRFLCAxKTsgLy8g0JTQu9GPINC/0LXRgNGI0L7Qs9C+INC80LDRgtGH0YNcbiAgICAvLyBsb2NrTWF0Y2hDb250YWluZXIoU0VDT05EX01BVENIX0RBVEUsIDIpOyAvLyDQlNC70Y8g0LTRgNGD0LPQvtCz0L4g0LzQsNGC0YfRg1xuXG4gICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBjb25zdCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCk7IC8vINCe0L3QvtCy0LjRgtC4INC/0L7RgtC+0YfQvdGDINC00LDRgtGDXG4gICAgICAgIGxvY2tNYXRjaENvbnRhaW5lcihGSVJTVF9NQVRDSF9EQVRFLCAxKTtcbiAgICAgICAgLy8gbG9ja01hdGNoQ29udGFpbmVyKFNFQ09ORF9NQVRDSF9EQVRFLCAyKTtcbiAgICB9LCA2MDAwMDApOyAvLyDQntC90L7QstC70Y7QstCw0YLQuCDQutC+0LbQvdGWIDEwINGF0LJcblxuICAgIGNsYXNzIEJldCB7XG4gICAgICAgIGNvbnN0cnVjdG9yKHVzZXJJZCwgbWF0Y2hOdW1iZXIsIHRlYW0xR29hbHMgPSAwLCB0ZWFtMkdvYWxzID0gMCwgZmlyc3RHb2FsKSB7XG4gICAgICAgICAgICBpZih1c2VySWQgIT09IG51bGwpIHRoaXMudXNlcmlkID0gdXNlcklkO1xuICAgICAgICAgICAgdGhpcy5tYXRjaE51bWJlciA9IG1hdGNoTnVtYmVyO1xuICAgICAgICAgICAgdGhpcy50ZWFtMSA9IHRlYW0xR29hbHM7XG4gICAgICAgICAgICB0aGlzLnRlYW0yID0gdGVhbTJHb2FscztcbiAgICAgICAgICAgIGlmKGZpcnN0R29hbCAhPT0gdW5kZWZpbmVkKSB0aGlzLmZpcnN0R29hbCA9IGZpcnN0R29hbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHVwZGF0ZUdvYWxzKHRlYW0xR29hbHMsIHRlYW0yR29hbHMpIHtcbiAgICAgICAgICAgIGlmICh0ZWFtMUdvYWxzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRlYW0xID0gdGVhbTFHb2FscyAhPT0gbnVsbCA/IHRlYW0xR29hbHMgOiB0aGlzLnRlYW0xO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRlYW0yR29hbHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMudGVhbTIgPSB0ZWFtMkdvYWxzICE9PSBudWxsID8gdGVhbTJHb2FscyA6IHRoaXMudGVhbTI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmdvYWxzVXBkYXRlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB1cGRhdGVGaXJzdEdvYWwoZmlyc3RHb2FsKSB7XG4gICAgICAgICAgICBpZiAoZmlyc3RHb2FsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpcnN0R29hbCA9IGZpcnN0R29hbCAhPT0gbnVsbCA/IGZpcnN0R29hbCA6IHRoaXMuZmlyc3RHb2FsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5maXJzdEdvYWxVcGRhdGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGNhY2hlID0ge307XG4gICAgbGV0IHByZWRpY3REYXRhID0gW107XG5cbiAgICBsZXQgdHJhbnNsYXRlU3RhdGUgPSBmYWxzZVxuICAgIGxldCBkZWJ1ZyA9IHRydWVcblxuICAgIGxldCBsb2NhbGUgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwibG9jYWxlXCIpID8/IFwidWtcIlxuICAgIC8vIGxldCBsb2NhbGUgPSBcInVrXCJcblxuICAgIGNvbnN0IHVrTGVuZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1a0xlbmcnKTtcbiAgICBjb25zdCBlbkxlbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZW5MZW5nJyk7XG5cblxuICAgIGxldCBpMThuRGF0YSA9IHt9O1xuXG4gICAgbGV0IHVzZXJJZDtcbiAgICB1c2VySWQgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwidXNlcklkXCIpID8/IG51bGxcbiAgICAvLyB1c2VySWQgPSAxMDAzMDAyNjg7XG5cbiAgICBsZXQgY3VycmVudEJldDtcblxuICAgIGlmICh1a0xlbmcpIGxvY2FsZSA9ICd1ayc7XG4gICAgaWYgKGVuTGVuZykgbG9jYWxlID0gJ2VuJztcblxuICAgIGNvbnN0IHJlcXVlc3QgPSBmdW5jdGlvbiAobGluaykge1xuICAgICAgICByZXR1cm4gZmV0Y2ggKGFwaVVSTCArIGxpbmssIHtcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgfVxuXG4gICAgY29uc3QgZ2V0TGFzdEJldCA9IChiZXRzLCBtYXRjaE51bWJlcikgPT57XG4gICAgICAgIGlmKCFiZXRzKSByZXR1cm4gZmFsc2VcbiAgICAgICAgcmV0dXJuIGJldHMuZmluZChiZXQgPT4gYmV0Lm1hdGNoTnVtYmVyID09PSBtYXRjaE51bWJlcik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVmcmVzaEJldEluZm8odXNlcklkKSB7XG4gICAgICAgIGNvbnN0IHNjb3JlMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2NvcmUtMVwiKVxuICAgICAgICAvLyBjb25zdCBzY29yZTIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNjb3JlLTJcIilcbiAgICAgICAgY29uc3QgZ29hbDEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdvYWwtMVwiKVxuICAgICAgICAvLyBjb25zdCBnb2FsMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ29hbC0yXCIpXG4gICAgICAgIGNvbnN0IG1hdGNoTnVtYmVyID0gMVxuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKG1hdGNoTnVtYmVyKVxuXG4gICAgICAgIHJlcXVlc3QoYC9mYXZ1c2VyLyR7dXNlcklkfWAsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCdcbiAgICAgICAgfSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIGlmKGRhdGEuYmV0cyl7XG4gICAgICAgICAgICAgICAgY29uc3QgYmV0QXZhaWxhYmxlID0gZGF0YS5iZXRzLnNvbWUoYmV0ID0+e1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmV0Lm1hdGNoTnVtYmVyID09PSBtYXRjaE51bWJlclxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYmV0QXZhaWxhYmxlKVxuICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RUZWFtMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJlZGljdF9fbGFzdC10ZWFtLnRlYW0xXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RUZWFtMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJlZGljdF9fbGFzdC10ZWFtLnRlYW0yXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNjb3JlVGVhbTEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNjb3JlVGVhbTFcIik7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2NvcmVUZWFtMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2NvcmVUZWFtMlwiKTtcbiAgICAgICAgICAgICAgICBjb25zdCBmaXJzdEdvYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByZWRpY3RfX2xhc3QtY291bnRyeVwiKTtcbiAgICAgICAgICAgICAgICBpZihiZXRBdmFpbGFibGUpe1xuICAgICAgICAgICAgICAgICAgICBsYXN0UHJlZGljdC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVwiKVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBsYXN0QmV0ID0gZ2V0TGFzdEJldChkYXRhLmJldHMsIG1hdGNoTnVtYmVyKTtcbiAgICAgICAgICAgICAgICAgICAgc2NvcmVUZWFtMS50ZXh0Q29udGVudCA9IGxhc3RCZXQudGVhbTEgPT09IHVuZGVmaW5lZCA/IFwiLVwiIDpgJHtsYXN0QmV0LnRlYW0xfWA7XG4gICAgICAgICAgICAgICAgICAgIHNjb3JlVGVhbTIudGV4dENvbnRlbnQgPSBsYXN0QmV0LnRlYW0yID09PSB1bmRlZmluZWQgPyBcIi1cIiA6YCR7bGFzdEJldC50ZWFtMn1gO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhsYXN0QmV0KVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChsYXN0QmV0LmJldENvbmZpcm1lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcmVkaWN0X19sYXN0LXJlc3VsdC51bmNvbmZpcm1lZFwiKS5mb3JFYWNoKGl0ZW0gPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJlZGljdF9fbGFzdC1yZXN1bHQuY29uZmlybWVkXCIpLmZvckVhY2goaXRlbSA9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcmVkaWN0X19sYXN0LXJlc3VsdC51bmNvbmZpcm1lZFwiKS5mb3JFYWNoKGl0ZW0gPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJlZGljdF9fbGFzdC1yZXN1bHQuY29uZmlybWVkXCIpLmZvckVhY2goaXRlbSA9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RCZXQubWF0Y2hOdW1iZXIgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RUZWFtMS5zZXRBdHRyaWJ1dGUoXCJkYXRhLXRyYW5zbGF0ZVwiLCBcInNoYWtodGFyXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFRlYW0yLnNldEF0dHJpYnV0ZShcImRhdGEtdHJhbnNsYXRlXCIsIFwiZHluYW1vXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgKGxhc3RCZXQubWF0Y2hOdW1iZXIgPT09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGxhc3RUZWFtMi5zZXRBdHRyaWJ1dGUoXCJkYXRhLXRyYW5zbGF0ZVwiLCBcInVrcmFpbmVcIik7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBsYXN0VGVhbTEuc2V0QXR0cmlidXRlKFwiZGF0YS10cmFuc2xhdGVcIiwgXCJiZWxnaXVtXCIpO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgdHJhbnNsYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIH1cblxuICAgICAgICAgICAgICAgICAgICBpZihzY29yZTEuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlXCIpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJlZGljdF9fbGFzdC1zY29yZVwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmVkaWN0X19sYXN0LWdvYWxcIikuY2xhc3NMaXN0LmFkZChcImhpZGVcIilcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmKGdvYWwxLmNsYXNzTGlzdC5jb250YWlucyhcImFjdGl2ZVwiKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByZWRpY3RfX2xhc3Qtc2NvcmVcIikuY2xhc3NMaXN0LmFkZChcImhpZGVcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJlZGljdF9fbGFzdC1nb2FsXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZihsYXN0QmV0LmZpcnN0R29hbCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihsYXN0QmV0LmZpcnN0R29hbCA9PT0gXCJzaGFraHRhclwiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdEdvYWwuc2V0QXR0cmlidXRlKFwiZGF0YS10cmFuc2xhdGVcIiwgXCJzaGFraHRhclwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGxhc3RCZXQuZmlyc3RHb2FsID09PSBcImR5bmFtb1wiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdEdvYWwuc2V0QXR0cmlidXRlKFwiZGF0YS10cmFuc2xhdGVcIiwgXCJkeW5hbW9cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihsYXN0QmV0LmZpcnN0R29hbCA9PT0gXCJkcmF3XCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0R29hbC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXRyYW5zbGF0ZVwiLCBcImRyYXdcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihnb2FsMS5jbGFzc0xpc3QuY29udGFpbnMoXCJhY3RpdmVcIikpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJlZGljdF9fbGFzdFwiKS5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoIWJldEF2YWlsYWJsZSl7XG4gICAgICAgICAgICAgICAgICAgIGxhc3RQcmVkaWN0LmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgbGFzdFByZWRpY3QuY2xhc3NMaXN0LmFkZChcImhpZGVcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3I6JywgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgY29uc3QgSW5pdFBhZ2UgPSAoKSA9PiB7XG4gICAgICAgIGNoZWNrVXNlckF1dGgoKTtcbiAgICAgICAgcmVuZGVyVXNlcnMoKTtcbiAgICAgICAgdXBkYXRlVG9wRm9yZWNhc3RzKGN1cnJlbnRUYWIpXG4gICAgICAgIHJlZnJlc2hCZXRJbmZvKHVzZXJJZClcbiAgICB9XG5cbiAgICBsZXQgY2hlY2tVc2VyQXV0aCA9ICgpID0+IHtcbiAgICAgICAgaWYgKHVzZXJJZCkge1xuICAgICAgICAgICAgeW91QXJlSW5CdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKSk7XG4gICAgICAgICAgICB1bmF1dGhNc2dzLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGxldCB5b3VBcmVJbkJ0biBvZiB5b3VBcmVJbkJ0bnMpIHtcbiAgICAgICAgICAgICAgICB5b3VBcmVJbkJ0bi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHVuYXV0aE1lcyBvZiB1bmF1dGhNc2dzKSB7XG4gICAgICAgICAgICAgICAgdW5hdXRoTWVzLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBwbGFjZUJldChiZXQpIHtcbiAgICAgICAgaWYgKCF1c2VySWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJlZGljdF9fY29udGFpbmVyLmFjdGl2ZVwiKVxuICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcmVkaWN0X190ZWFtLWluY3JlYXNlLCAucHJlZGljdF9fdGVhbS1kZWNyZWFzZScpXG4gICAgICAgICAgICAuZm9yRWFjaChidG4gPT4ge1xuICAgICAgICAgICAgICAgIHNjb3JlSW5pdChidG4pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgYWN0aXZlVGFicyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ29hbENvbnRcIilcbiAgICAgICAgLy8gY29uc3QgYWN0aXZlSW5wdXQgPSBhY3RpdmVUYWIucXVlcnlTZWxlY3RvcihcIi5wcmVkaWN0X19yYWRpby1pdGVtIGlucHV0XCIpXG5cblxuXG4gICAgICAgIGxldCByZXEgPSB7XG4gICAgICAgICAgICBtYXRjaE51bWJlcjogYmV0Lm1hdGNoTnVtYmVyLFxuICAgICAgICAgICAgdXNlcmlkOiBiZXQudXNlcmlkLFxuICAgICAgICB9O1xuXG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coYWN0aXZlVGFicylcbiAgICAgICAgZm9yIChjb25zdCB0YWIgb2YgYWN0aXZlVGFicykge1xuICAgICAgICAgICAgaWYgKHRhYi5jbGFzc0xpc3QuY29udGFpbnMoXCJhY3RpdmVcIikpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBhY3RpdmVJbnB1dCA9IHRhYi5xdWVyeVNlbGVjdG9yKFwiLnByZWRpY3RfX3JhZGlvLWl0ZW0uX2FjdGl2ZSBpbnB1dFwiKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0YWIpXG5cbiAgICAgICAgICAgICAgICBpZiAoYWN0aXZlSW5wdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYWN0aXZlSW5wdXQpXG4gICAgICAgICAgICAgICAgICAgIHJlcS5maXJzdEdvYWwgPSBhY3RpdmVJbnB1dC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuXG4gICAgICAgIGlmIChiZXQuZmlyc3RHb2FsVXBkYXRlZCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYmV0LmZpcnN0R29hbClcbiAgICAgICAgICAgIHJlcS5maXJzdEdvYWwgPSBiZXQuZmlyc3RHb2FsO1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYmV0LmdvYWxzVXBkYXRlZCkge1xuICAgICAgICAgICAgcmVxLnRlYW0xID0gYmV0LnRlYW0xO1xuICAgICAgICB9XG5cblxuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGFjdGl2ZUlucHV0KTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coYWN0aXZlVGFiKVxuXG4gICAgICAgIGlmKCFkZWJ1Zyl7XG4gICAgICAgICAgICByZXF1ZXN0KCcvYmV0Jywge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHJlcSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0JldCBwbGFjZWQ6JywgcmVzKTtcbiAgICAgICAgICAgICAgICAgICAgSW5pdFBhZ2UoKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKCdFcnJvciBwbGFjaW5nIGJldDonLCBlcnJvcikpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkZWJ1ZyBpcyBlbmFibGUsIHlvdXIgYmV0OicsIHJlcSk7XG4gICAgICAgICAgICBJbml0UGFnZSgpXG4gICAgICAgIH1cblxuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9hZFRyYW5zbGF0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIGZldGNoKGAke2FwaVVSTH0vbmV3LXRyYW5zbGF0ZXMvJHtsb2NhbGV9YCkudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAgICAgICAgIC50aGVuKGpzb24gPT4ge1xuICAgICAgICAgICAgICAgIGkxOG5EYXRhID0ganNvbjtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGUoKTtcbiAgICAgICAgICAgICAgICB2YXIgbXV0YXRpb25PYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uIChtdXRhdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbXV0YXRpb25PYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnb2Fscy1vci16ZXJvcycpLCB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZSgpIHtcbiAgICAgICAgY29uc3QgZWxlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10cmFuc2xhdGVdJylcbiAgICAgICAgaWYodHJhbnNsYXRlU3RhdGUpe1xuICAgICAgICAgICAgZWxlbXMuZm9yRWFjaChlbGVtID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBlbGVtLmdldEF0dHJpYnV0ZSgnZGF0YS10cmFuc2xhdGUnKTtcbiAgICAgICAgICAgICAgICBlbGVtLmlubmVySFRNTCA9IGkxOG5EYXRhW2tleV0gfHwgJyotLS0tTkVFRCBUTyBCRSBUUkFOU0xBVEVELS0tLSogICBrZXk6ICAnICsga2V5O1xuICAgICAgICAgICAgICAgIGVsZW0ucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXRyYW5zbGF0ZScpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInRyYW5zbGF0aW9uIHdvcmshXCIpXG4gICAgICAgIH1cbiAgICAgICAgcmVmcmVzaExvY2FsaXplZENsYXNzKG1haW5QYWdlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWZyZXNoTG9jYWxpemVkQ2xhc3MoZWxlbWVudCkge1xuICAgICAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGxhbmcgb2YgWyd1aycsICdlbiddKSB7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUobGFuZyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGxvY2FsZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5zdG9yZSkge1xuICAgICAgICAgICAgdmFyIHN0YXRlID0gd2luZG93LnN0b3JlLmdldFN0YXRlKCk7XG4gICAgICAgICAgICB1c2VySWQgPSBzdGF0ZS5hdXRoLmlzQXV0aG9yaXplZCAmJiBzdGF0ZS5hdXRoLmlkIHx8ICcnO1xuICAgICAgICAgICAgLy8gY3VycmVudEJldCA9IG5ldyBCZXQodXNlcklkLCBtYXRjaE51bWJlcilcbiAgICAgICAgICAgIEluaXRQYWdlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBJbml0UGFnZSgpO1xuICAgICAgICAgICAgbGV0IGMgPSAwO1xuICAgICAgICAgICAgdmFyIGkgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGMgPCA1MCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoISF3aW5kb3cuZ191c2VyX2lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VySWQgPSB3aW5kb3cuZ191c2VyX2lkO1xuICAgICAgICAgICAgICAgICAgICAgICAgSW5pdFBhZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDIwMCk7XG5cbiAgICAgICAgfVxuICAgICAgICBJbml0UGFnZSgpXG5cbiAgICAgICAgcGxhY2VCZXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coY3VycmVudEJldClcbiAgICAgICAgICAgIGlmKGN1cnJlbnRCZXQpe1xuICAgICAgICAgICAgICAgIHBsYWNlQmV0KGN1cnJlbnRCZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoY3VycmVudEJldCA9PT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgICBjdXJyZW50QmV0ID0gbmV3IEJldCh1c2VySWQsIG1hdGNoTnVtYmVyKVxuICAgICAgICAgICAgICAgIHBsYWNlQmV0KGN1cnJlbnRCZXQpO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGN1cnJlbnRCZXQpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHVwZGF0ZVNjb3JlKG1hdGNoTnVtYmVyLCB0ZWFtMUdvYWxzLCB0ZWFtMkdvYWxzKSB7XG4gICAgICAgIGlmIChjdXJyZW50QmV0ICYmIGN1cnJlbnRCZXQubWF0Y2hOdW1iZXIgPT09IG1hdGNoTnVtYmVyKSB7XG4gICAgICAgICAgICBjdXJyZW50QmV0LnVwZGF0ZUdvYWxzKHRlYW0xR29hbHMsIHRlYW0yR29hbHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY3VycmVudEJldCA9IG5ldyBCZXQodXNlcklkLCBtYXRjaE51bWJlciwgdGVhbTFHb2FscywgdGVhbTJHb2Fscyk7XG4gICAgICAgICAgICBjdXJyZW50QmV0LnVwZGF0ZUdvYWxzKHRlYW0xR29hbHMsIHRlYW0yR29hbHMpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKGN1cnJlbnRCZXQpO1xuICAgIH1cbiAgICBmdW5jdGlvbiB1cGRhdGVGaXJzdEdvYWwobWF0Y2hOdW1iZXIsIGZpcnN0R29hbCkge1xuICAgICAgICBpZiAoY3VycmVudEJldCAmJiBjdXJyZW50QmV0Lm1hdGNoTnVtYmVyID09PSBtYXRjaE51bWJlcikge1xuICAgICAgICAgICAgY3VycmVudEJldC51cGRhdGVGaXJzdEdvYWwoZmlyc3RHb2FsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGN1cnJlbnRCZXQpO1xuICAgIH1cbiAgICBmdW5jdGlvbiB1cGRhdGVUb3BGb3JlY2FzdHMobWF0Y2hOdW1iZXIpIHtcbiAgICAgICAgcmVxdWVzdChgL3VzZXJzLyR7bWF0Y2hOdW1iZXJ9YCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGEudG9wRm9yZWNhc3RzKTsgLy8g0J/QtdGA0LXQstGW0YDQutCwINC+0YLRgNC40LzQsNC90LjRhSDQtNCw0L3QuNGFXG5cbiAgICAgICAgICAgIGNvbnN0IGZvcmVjYXN0c0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X19mb3JlY2FzdHMnKTtcbiAgICAgICAgICAgIGZvcmVjYXN0c0NvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcblxuXG4gICAgICAgICAgICBkYXRhLnRvcEZvcmVjYXN0cy5mb3JFYWNoKGZvcmVjYXN0ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBmb3JlY2FzdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICBmb3JlY2FzdEl0ZW0uY2xhc3NMaXN0LmFkZCgncHJlZGljdF9fZm9yZWNhc3RzLWl0ZW0nKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHBlcmNlbnRhZ2UgPSBwYXJzZUZsb2F0KGZvcmVjYXN0LnBlcmNlbnRhZ2UpLnRvRml4ZWQoMSk7XG4gICAgICAgICAgICAgICAgY29uc3QgcGVyY2VudGFnZVNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICAgICAgcGVyY2VudGFnZVNwYW4udGV4dENvbnRlbnQgPSBgJHtwZXJjZW50YWdlfSVgO1xuXG5cbiAgICAgICAgICAgICAgICBjb25zdCBmb3JlY2FzdFRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShgICR7Zm9yZWNhc3QuZm9yZWNhc3QgPz8gXCIwLTBcIn1gKTtcbiAgICAgICAgICAgICAgICBmb3JlY2FzdEl0ZW0uYXBwZW5kQ2hpbGQocGVyY2VudGFnZVNwYW4pO1xuICAgICAgICAgICAgICAgIGZvcmVjYXN0SXRlbS5hcHBlbmRDaGlsZChmb3JlY2FzdFRleHQpO1xuXG4gICAgICAgICAgICAgICAgZm9yZWNhc3RzQ29udGFpbmVyLmFwcGVuZENoaWxkKGZvcmVjYXN0SXRlbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgdG9wIGZvcmVjYXN0czonLCBlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZW5kZXJVc2VycygpIHtcbiAgICAgICAgcmVxdWVzdChgL3VzZXJzLyR7Y3VycmVudFRhYlRhYmxlfWApXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcblxuICAgICAgICAgICAgICAgIGxldCB1c2VycyA9IGRhdGEudXNlcnNcblxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHVzZXJzKVxuICAgICAgICAgICAgICAgIGNvbnN0IGlzU2NvcmVUYWJBY3RpdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fdGFicy1zY29yZScpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzR29hbFRhYkFjdGl2ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X190YWJzLWdvYWwnKTtcblxuICAgICAgICAgICAgICAgIGlmKHVzZXJzLmxlbmd0aCA+PSA1MCl7XG4gICAgICAgICAgICAgICAgICAgIHNob3dUb3BGb3JlY2FzdCA9IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYodXNlcnMubGVuZ3RoIDwgNTApe1xuICAgICAgICAgICAgICAgICAgICBzaG93VG9wRm9yZWNhc3QgPSBmYWxzZVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChpc1Njb3JlVGFiQWN0aXZlICYmIHNob3dUb3BGb3JlY2FzdCkgdG9wRm9yZWNhc3QuY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIilcbiAgICAgICAgICAgICAgICBpZiAoaXNHb2FsVGFiQWN0aXZlKSB0b3BGb3JlY2FzdC5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKVxuXG5cbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0eXBlb2YgdXNlcklkKVxuXG4gICAgICAgICAgICAgICAgcG9wdWxhdGVVc2Vyc1RhYmxlKHVzZXJzLCB1c2VySWQsIGN1cnJlbnRUYWJUYWJsZSlcblxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHVzZXJzKVxuICAgICAgICAgICAgfSk7XG5cbiAgICB9XG4gICAgZnVuY3Rpb24gcG9wdWxhdGVVc2Vyc1RhYmxlKHVzZXJzLCBjdXJyZW50VXNlcklkLCBtYXRjaE51bWJlcikge1xuICAgICAgICByZXN1bHRzVGFibGUuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIHJlc3VsdHNUYWJsZU90aGVyLmlubmVySFRNTCA9ICcnO1xuXG4gICAgICAgIGlmICghdXNlcnMgfHwgIXVzZXJzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIC8vIC8vINCk0ZbQu9GM0YLRgNGD0ZTQvNC+INC60L7RgNC40YHRgtGD0LLQsNGH0ZbQsiwg0Y/QutGWINC30YDQvtCx0LjQu9C4INGB0YLQsNCy0LrRgyDQvdCwINCy0LrQsNC30LDQvdC40Lkg0LzQsNGC0YdcbiAgICAgICAgLy8gY29uc3QgdXNlcnMgPSB1c2Vycy5maWx0ZXIodXNlciA9PlxuICAgICAgICAvLyAgICAgdXNlci5iZXRzLnNvbWUoYmV0ID0+IGJldC5tYXRjaE51bWJlciA9PT0gbWF0Y2hOdW1iZXIpXG4gICAgICAgIC8vICk7XG5cbiAgICAgICAgLy8gaWYgKCF1c2Vycy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICAvLyDQl9C90LDRhdC+0LTQuNC80L4g0L/QvtGC0L7Rh9C90L7Qs9C+INC60L7RgNC40YHRgtGD0LLQsNGH0LBcbiAgICAgICAgY29uc3QgY3VycmVudFVzZXIgPSB1c2Vycy5maW5kKHVzZXIgPT4gdXNlci51c2VyaWQgPT09IGN1cnJlbnRVc2VySWQpO1xuXG4gICAgICAgIC8vINCS0LjQstC+0LTQuNC80L4g0LLRgdGW0YUg0ZbQvdGI0LjRhSDQutC+0YDQuNGB0YLRg9Cy0LDRh9GW0LIg0YMgcmVzdWx0c1RhYmxlXG4gICAgICAgIHVzZXJzLmZvckVhY2godXNlciA9PiB7XG4gICAgICAgICAgICBpZiAodXNlci51c2VyaWQgIT09IGN1cnJlbnRVc2VySWQpIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5VXNlcih1c2VyLCBmYWxzZSwgcmVzdWx0c1RhYmxlLCB1c2VycywgbWF0Y2hOdW1iZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyDQktC40LLQvtC00LjQvNC+INC/0L7RgtC+0YfQvdC+0LPQviDQutC+0YDQuNGB0YLRg9Cy0LDRh9CwINCyIHJlc3VsdHNUYWJsZU90aGVyXG4gICAgICAgIGlmIChjdXJyZW50VXNlcikge1xuICAgICAgICAgICAgZGlzcGxheVVzZXIoY3VycmVudFVzZXIsIHRydWUsIHJlc3VsdHNUYWJsZU90aGVyLCB1c2VycywgbWF0Y2hOdW1iZXIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGRpc3BsYXlVc2VyKHVzZXIsIGlzQ3VycmVudFVzZXIsIHRhYmxlLCBhbGxVc2VycywgbWF0Y2hOdW1iZXIpIHtcbiAgICAgICAgbGV0IG1hdGNoRGF0ZTtcblxuICAgICAgICBpZiAobWF0Y2hOdW1iZXIgPT09IDEpIHtcbiAgICAgICAgICAgIG1hdGNoRGF0ZSA9IEZJUlNUX01BVENIX0RBVEU7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBhZGRpdGlvbmFsVXNlclJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBhZGRpdGlvbmFsVXNlclJvdy5jbGFzc0xpc3QuYWRkKCd0YWJsZV9fcm93Jyk7XG5cbiAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuaW5uZXJIVE1MID0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVfX3Jvdy1pdGVtXCI+JHtpc0N1cnJlbnRVc2VyID8gdXNlci51c2VyaWQgOiBtYXNrVXNlcklkKHVzZXIudXNlcmlkKX08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlX19yb3ctaXRlbVwiPlxuICAgICAgICAgICAgJHtjdXJyZW50RGF0ZSA+PSBtYXRjaERhdGUgP1xuICAgICAgICAgICAgYDxzcGFuPiR7dXNlci50ZWFtMSAhPT0gdW5kZWZpbmVkICYmIHVzZXIudGVhbTEgIT09IG51bGwgPyB1c2VyLnRlYW0xIDogXCItXCJ9PC9zcGFuPjxpbWcgc3JjPVwiaHR0cHM6Ly9mYXYtcHJvbS5jb20vaHRtbC9nb2Fscy1vci16ZXJvZXMvaW1nL3ZzLnBuZ1wiIGFsdD1cInZzXCI+PHNwYW4+JHt1c2VyLnRlYW0yICE9PSB1bmRlZmluZWQgJiYgdXNlci50ZWFtMiAhPT0gbnVsbCA/IHVzZXIudGVhbTIgOiBcIi1cIn08L3NwYW4+YCA6XG4gICAgICAgICAgICBgPHNwYW4+Kio8L3NwYW4+PGltZyBzcmM9XCJodHRwczovL2Zhdi1wcm9tLmNvbS9odG1sL2dvYWxzLW9yLXplcm9lcy9pbWcvdnMucG5nXCIgYWx0PVwidnNcIj48c3Bhbj4qKjwvc3Bhbj5gXG4gICAgICAgIH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIFxuICAgICAgICAke3VzZXIud2lubmVyID09PSB0cnVlICA/XG4gICAgICAgIGA8ZGl2IGNsYXNzPVwidGFibGVfX3Jvdy1pdGVtXCIgZGF0YS10cmFuc2xhdGU9XCJwcml6ZVwiPioqKioqPC9kaXY+YCA6XG4gICAgICAgIGA8ZGl2IGNsYXNzPVwidGFibGVfX3Jvdy1pdGVtXCIgZGF0YS10cmFuc2xhdGU9XCJub1dpbm5lcnNcIj4qKioqKjwvZGl2PmBcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgJHt1c2VyLmJvbnVzRmlyc3RHb2FsID09PSB0cnVlICA/XG4gICAgICAgICAgICBgPGRpdiBjbGFzcz1cInRhYmxlX19yb3ctaXRlbVwiIGRhdGEtdHJhbnNsYXRlPVwic3M1MDBcIj4qKioqKjwvZGl2PmAgOlxuICAgICAgICAgICAgYDxkaXYgY2xhc3M9XCJ0YWJsZV9fcm93LWl0ZW1cIiBkYXRhLXRyYW5zbGF0ZT1cIm5vV2lubmVyc1wiPioqKioqPC9kaXY+YFxuICAgICAgICB9XG4gICAgYDtcblxuICAgICAgICBpZiAoaXNDdXJyZW50VXNlcikge1xuICAgICAgICAgICAgYWRkaXRpb25hbFVzZXJSb3cuY2xhc3NMaXN0LmFkZChcInlvdVwiKTtcbiAgICAgICAgICAgIGFkZGl0aW9uYWxVc2VyUm93LmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZV9fcm93LWl0ZW1cIj4ke2lzQ3VycmVudFVzZXIgPyB1c2VyLnVzZXJpZCA6IG1hc2tVc2VySWQodXNlci51c2VyaWQpfTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhYmxlX19yb3ctaXRlbVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuPiR7dXNlci50ZWFtMSAhPT0gdW5kZWZpbmVkICYmIHVzZXIudGVhbTEgIT09IG51bGwgPyB1c2VyLnRlYW0xIDogXCItXCJ9PC9zcGFuPjxpbWcgc3JjPVwiaHR0cHM6Ly9mYXYtcHJvbS5jb20vaHRtbC9nb2Fscy1vci16ZXJvZXMvaW1nL3ZzLnBuZ1wiIGFsdD1cInZzXCI+PHNwYW4+JHt1c2VyLnRlYW0yICE9PSB1bmRlZmluZWQgJiYgdXNlci50ZWFtMiAhPT0gbnVsbCA/IHVzZXIudGVhbTIgOiBcIi1cIn08L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICR7dXNlci53aW5uZXIgPT09IHRydWUgID9cbiAgICAgICAgICAgICAgICBgPGRpdiBjbGFzcz1cInRhYmxlX19yb3ctaXRlbVwiIGRhdGEtdHJhbnNsYXRlPVwicHJpemVcIj4qKioqKjwvZGl2PmAgOlxuICAgICAgICAgICAgICAgIGA8ZGl2IGNsYXNzPVwidGFibGVfX3Jvdy1pdGVtXCIgZGF0YS10cmFuc2xhdGU9XCJub1dpbm5lcnNcIj4qKioqKjwvZGl2PmBcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAke3VzZXIuYm9udXNGaXJzdEdvYWwgPT09IHRydWUgID9cbiAgICAgICAgICAgICAgICAgICAgYDxkaXYgY2xhc3M9XCJ0YWJsZV9fcm93LWl0ZW1cIiBkYXRhLXRyYW5zbGF0ZT1cInNzNTAwXCI+KioqKio8L2Rpdj5gIDpcbiAgICAgICAgICAgICAgICAgICAgYDxkaXYgY2xhc3M9XCJ0YWJsZV9fcm93LWl0ZW1cIiBkYXRhLXRyYW5zbGF0ZT1cIm5vV2lubmVyc1wiPioqKioqPC9kaXY+YFxuICAgICAgICAgICAgfVxuICAgICAgICBgO1xuICAgICAgICAgICAgY29uc3QgeW91QmxvY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHlvdUJsb2NrLmNsYXNzTGlzdC5hZGQoJ3RhYmxlX19yb3cteW91Jyk7XG4gICAgICAgICAgICB5b3VCbG9jay5zZXRBdHRyaWJ1dGUoJ2RhdGEtdHJhbnNsYXRlJywgJ3RhYmxlWW91Jyk7XG4gICAgICAgICAgICAvLyB5b3VCbG9jay50ZXh0Q29udGVudCA9IFwiWW91XCI7XG4gICAgICAgICAgICBhZGRpdGlvbmFsVXNlclJvdy5pbnNlcnRCZWZvcmUoeW91QmxvY2ssIGFkZGl0aW9uYWxVc2VyUm93LmNoaWxkcmVuWzFdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRhYmxlLmFwcGVuZChhZGRpdGlvbmFsVXNlclJvdyk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG1hc2tVc2VySWQodXNlcklkKSB7XG4gICAgICAgIHJldHVybiBcIioqXCIgKyB1c2VySWQudG9TdHJpbmcoKS5zbGljZSgyKTtcbiAgICB9XG5cbiAgICAvLyAzRCBhbmltXG4gICAgY29uc3QgY2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRlYW0sIC5hbmltQ2FyZCwgLmFuaW1SaWdodFwiKTsgLy8g0JTQvtCx0LDQstC70Y/QtdC8IC5hbmltUmlnaHRcbiAgICBsZXQgYW5nbGUgPSAwO1xuXG4gICAgZnVuY3Rpb24gYW5pbWF0ZUNhcmRzKCkge1xuICAgICAgICBhbmdsZSArPSAwLjk7IC8vIHNwZWVkXG4gICAgICAgIGNvbnN0IHJvdGF0ZVggPSBNYXRoLnNpbihhbmdsZSAqIChNYXRoLlBJIC8gMTgwKSkgKiAxMDsgLy8g0JrQvtC70LXQsdCw0L3QuNC1INC/0L4gWFxuICAgICAgICBjb25zdCByb3RhdGVZID0gTWF0aC5jb3MoYW5nbGUgKiAoTWF0aC5QSSAvIDE4MCkpICogMTA7IC8vINCa0L7Qu9C10LHQsNC90LjQtSDQv9C+IFlcblxuICAgICAgICBjYXJkcy5mb3JFYWNoKGNhcmQgPT4ge1xuICAgICAgICAgICAgaWYgKGNhcmQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYW5pbVJpZ2h0XCIpKSB7XG4gICAgICAgICAgICAgICAgY2FyZC5zdHlsZS50cmFuc2Zvcm0gPSBgcm90YXRlWSgkey1yb3RhdGVZfWRlZykgcm90YXRlWCgkey1yb3RhdGVYfWRlZylgO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYXJkLnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGVZKCR7cm90YXRlWX1kZWcpIHJvdGF0ZVgoJHtyb3RhdGVYfWRlZylgO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZUNhcmRzKTtcbiAgICB9XG4gICAgYW5pbWF0ZUNhcmRzKCk7XG5cbiAgICAvLyBwcmVkaWN0IHRhYnNcbiAgICBjb25zdCB0YWJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByZWRpY3RfX3RhYnMtZ2xvYmFsID4gZGl2Jyk7XG4gICAgY29uc3QgY29udGFpbmVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcmVkaWN0X19jb250YWluZXInKTtcblxuICAgIGZ1bmN0aW9uIGhhbmRsZVRhYkNsaWNrKGV2ZW50KSB7XG4gICAgICAgIGxldCBtYXRjaERhdGU7XG5cbiAgICAgICAgY29uc3QgY2xpY2tlZFRhYiA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KFwiLnByZWRpY3RfX3RhYnMtZ29hbFwiKSB8fCBldmVudC50YXJnZXQuY2xvc2VzdChcIi5wcmVkaWN0X190YWJzLXNjb3JlXCIpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjbGlja2VkVGFiKVxuICAgICAgICBjb25zdCB0YWJQYWlyID0gY2xpY2tlZFRhYi5jbG9zZXN0KCcucHJlZGljdF9fdGFicy1nbG9iYWwnKTtcblxuICAgICAgICBsZXQgY3VycmVudE1hdGNoID0gMVxuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNsaWNrZWRUYWIpXG5cbiAgICAgICAgaWYoY3VycmVudE1hdGNoID09PSAxKXtcbiAgICAgICAgICAgIG1hdGNoRGF0ZSA9IEZJUlNUX01BVENIX0RBVEVcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGN1cnJlbnREYXRlID4gbWF0Y2hEYXRlKXtcbiAgICAgICAgICAgIHBsYWNlQmV0QnRuLmNsYXNzTGlzdC5hZGQoXCJfbG9ja1wiKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHBsYWNlQmV0QnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJfbG9ja1wiKVxuICAgICAgICB9XG5cblxuICAgICAgICBpZiAoY2xpY2tlZFRhYi5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSByZXR1cm47XG4gICAgICAgIGlmICh0YWJQYWlyKSB7XG4gICAgICAgICAgICBjb25zdCBwYWlyID0gdGFiUGFpci5xdWVyeVNlbGVjdG9yQWxsKCcuYWN0aXZlJyk7XG4gICAgICAgICAgICBpZiAocGFpci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgcGFpclswXS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNsaWNrZWRUYWIuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgIHVwZGF0ZUNvbnRhaW5lcnMoKTtcbiAgICAgICAgcmVmcmVzaEJldEluZm8odXNlcklkKVxuXG4gICAgICAgIHVwZGF0ZVRvcEZvcmVjYXN0cyhjdXJyZW50TWF0Y2gpXG4gICAgICAgIGN1cnJlbnRCZXQgPSBuZXcgQmV0KHVzZXJJZCwgY3VycmVudE1hdGNoKVxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByZWRpY3RfX3RlYW0tbnVtYmVyXCIpLmZvckVhY2goKHNjb3JlLCBpKSA9PntcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG1hdGNoRGF0ZSwgbWF0Y2hOdW1iZXIpXG4gICAgICAgICAgICBpZihjdXJyZW50RGF0ZSA+IG1hdGNoRGF0ZSAmJiBpID09PSAxKXtcbiAgICAgICAgICAgICAgICBzY29yZS50ZXh0Q29udGVudCA9IFwiMFwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGN1cnJlbnREYXRlID4gbWF0Y2hEYXRlICYmIGkgPT09IDApe1xuICAgICAgICAgICAgICAgIHNjb3JlLnRleHRDb250ZW50ID0gXCIwXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGVsc2V7XG4gICAgICAgICAgICAvLyAgICAgc2NvcmUudGV4dENvbnRlbnQgPSBcIjBcIlxuICAgICAgICAgICAgLy8gfVxuXG4gICAgICAgIH0pXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W3R5cGU9XCJyYWRpb1wiXTpjaGVja2VkJykuZm9yRWFjaChidXR0b24gPT4ge1xuICAgICAgICAgICAgYnV0dG9uLmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIGxvY2tNYXRjaENvbnRhaW5lcihGSVJTVF9NQVRDSF9EQVRFLCAxKTsgLy8g0JTQu9GPINC/0LXRgNGI0L7Qs9C+INC80LDRgtGH0YNcbiAgICB9XG5cbiAgICB0YWJzLmZvckVhY2godGFiID0+IHRhYi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZVRhYkNsaWNrKSk7XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVDb250YWluZXJzKCkge1xuICAgICAgICBjb250YWluZXJzLmZvckVhY2goY29udGFpbmVyID0+IGNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XG5cbiAgICAgICAgY29uc3QgaXNTY29yZVRhYkFjdGl2ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X190YWJzLXNjb3JlLmFjdGl2ZScpO1xuICAgICAgICBjb25zdCBpc0dvYWxUYWJBY3RpdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fdGFicy1nb2FsLmFjdGl2ZScpO1xuICAgICAgICAvLyBjb25zdCBpc0RhdGUxQWN0aXZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX3RhYnMtZGF0ZS5kYXRlMS5hY3RpdmUnKTtcblxuICAgICAgICBpZiAoaXNTY29yZVRhYkFjdGl2ZSkge1xuICAgICAgICAgICAgaWYoc2hvd1RvcEZvcmVjYXN0KSB0b3BGb3JlY2FzdC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVwiKVxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX2NvbnRhaW5lci5zY29yZS0xJykuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fdGFicy10eHQtMicpLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X190YWJzLXR4dCcpLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b3BGb3JlY2FzdCcpLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X19sYXN0LWdvYWwnKS5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fbGFzdC1zY29yZScpLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc0dvYWxUYWJBY3RpdmUpIHtcbiAgICAgICAgICAgIGlmKHNob3dUb3BGb3JlY2FzdCkgdG9wRm9yZWNhc3QuY2xhc3NMaXN0LmFkZChcImhpZGVcIilcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X19jb250YWluZXIuZ29hbC0xJykuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fdGFicy10eHQtMicpLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X190YWJzLXR4dCcpLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b3BGb3JlY2FzdCcpLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X19sYXN0LWdvYWwnKS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fbGFzdC1zY29yZScpLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vc2NvcmVcblxuICAgIGZ1bmN0aW9uIHNjb3JlSW5pdChidG4pe1xuICAgICAgICBjb25zdCB0ZWFtQ29udHJvbCA9IGJ0bi5jbG9zZXN0KCcucHJlZGljdF9fdGVhbS1jb250cm9sJyk7XG4gICAgICAgIGNvbnN0IHRlYW1OdW1iZXIgPSB0ZWFtQ29udHJvbC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fdGVhbS1udW1iZXInKVxuICAgICAgICBjb25zdCBtYXRjaENvbnRhaW5lciA9IGJ0bi5jbG9zZXN0KCcucHJlZGljdF9fY29udGFpbmVyJyk7XG4gICAgICAgIGNvbnN0IG1hdGNoTnVtYmVyID0gcGFyc2VJbnQobWF0Y2hDb250YWluZXIuZGF0YXNldC5tYXRjaE51bWJlcik7XG5cbiAgICAgICAgY29uc3QgZ2V0R29hbHMgPSAodGVhbSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IG1hdGNoQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXRlYW09XCIke3RlYW19XCJdIC5wcmVkaWN0X190ZWFtLW51bWJlcmApO1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQgPyBOdW1iZXIoZWxlbWVudC50ZXh0Q29udGVudCkgfHwgMCA6IDA7XG4gICAgICAgIH07XG5cblxuICAgICAgICBjb25zdCB0ZWFtMUdvYWxzID0gZ2V0R29hbHMoJ3RlYW0xJykgO1xuICAgICAgICBjb25zdCB0ZWFtMkdvYWxzID0gZ2V0R29hbHMoJ3RlYW0yJyk7XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2codGVhbTFHb2FscywgdGVhbTJHb2FscylcblxuICAgICAgICB1cGRhdGVTY29yZShtYXRjaE51bWJlciwgdGVhbTFHb2FscywgdGVhbTJHb2Fscyk7XG4gICAgfVxuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByZWRpY3RfX3RlYW0taW5jcmVhc2UsIC5wcmVkaWN0X190ZWFtLWRlY3JlYXNlJykuZm9yRWFjaChidG4gPT4ge1xuICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICAgICAgY29uc3QgdGVhbUNvbnRyb2wgPSBidG4uY2xvc2VzdCgnLnByZWRpY3RfX3RlYW0tY29udHJvbCcpO1xuICAgICAgICAgICAgY29uc3QgdGVhbU51bWJlciA9IHRlYW1Db250cm9sLnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X190ZWFtLW51bWJlcicpXG4gICAgICAgICAgICBjb25zdCBtYXRjaENvbnRhaW5lciA9IGJ0bi5jbG9zZXN0KCcucHJlZGljdF9fY29udGFpbmVyJyk7XG5cbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHBhcnNlSW50KHRlYW1OdW1iZXIudGV4dENvbnRlbnQpO1xuICAgICAgICAgICAgaWYgKGJ0bi5jbGFzc0xpc3QuY29udGFpbnMoJ3ByZWRpY3RfX3RlYW0taW5jcmVhc2UnKSkge1xuICAgICAgICAgICAgICAgIHZhbHVlICs9IDE7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID4gMCkge1xuICAgICAgICAgICAgICAgIHZhbHVlIC09IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0ZWFtTnVtYmVyLnRleHRDb250ZW50ID0gYCR7dmFsdWV9YDtcbiAgICAgICAgICAgIHNjb3JlSW5pdChidG4pXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhiZXQpXG4gICAgICAgIH0pXG4gICAgfSk7XG5cbiAgICAvL3RhYmxlIHRhYnNcbiAgICAvLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFibGVfX3RhYnMtZGF0ZScpLmZvckVhY2godGFiID0+IHtcbiAgICAvLyAgICAgdGFiLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgLy8gICAgICAgICBpZiAodGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XG4gICAgLy8gICAgICAgICAgICAgcmV0dXJuO1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYmxlX190YWJzLWRhdGUnKS5mb3JFYWNoKHRhYiA9PiB0YWIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xuICAgIC8vICAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAvLyAgICAgICAgIGN1cnJlbnRUYWJUYWJsZSA9IE51bWJlcihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhYmxlX190YWJzLWRhdGUuYWN0aXZlXCIpLmdldEF0dHJpYnV0ZShcImRhdGEtbWF0Y2gtbnVtYmVyXCIpKVxuICAgIC8vICAgICAgICAgcmVuZGVyVXNlcnMoKTtcbiAgICAvLyAgICAgfSk7XG4gICAgLy8gfSk7XG4gICAgXG5cbiAgICAvL3BvcHVwc1xuXG4gICAgZnVuY3Rpb24gc2V0UG9wdXBzKHRyaWdnZXJCdXR0b25zLCBwb3B1cENsYXNzKSB7XG4gICAgICAgIGNvbnN0IHBvcHVwc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cHMnKTtcbiAgICAgICAgY29uc3QgcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAucG9wdXBzX19pdGVtLiR7cG9wdXBDbGFzc31gKTtcbiAgICAgICAgY29uc3QgcG9wdXBCdG4gPSBwb3B1cHNDb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5wb3B1cHNfX2l0ZW0tYnRuXCIpXG5cblxuICAgICAgICBpZiAoIXRyaWdnZXJCdXR0b25zIHx8ICFwb3B1cCB8fCAhcG9wdXBzQ29udGFpbmVyKSByZXR1cm47XG5cbiAgICAgICAgdHJpZ2dlckJ1dHRvbnMuZm9yRWFjaCh0cmlnZ2VyQnV0dG9uID0+IHtcbiAgICAgICAgICAgIHRyaWdnZXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcG9wdXBzQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ19vcGFjaXR5Jyk7XG4gICAgICAgICAgICAgICAgcG9wdXBzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQocG9wdXBDbGFzcyk7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGNsb3NlQnV0dG9uID0gcG9wdXAucXVlcnlTZWxlY3RvcignLnBvcHVwc19faXRlbS1jbG9zZScpO1xuICAgICAgICBjb25zdCBidG5DbG9zZSA9IHBvcHVwLnF1ZXJ5U2VsZWN0b3IoJy5idG4tY2xvc2UnKTtcblxuICAgICAgICBwb3B1cHNDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZS50YXJnZXQgPT09IHBvcHVwc0NvbnRhaW5lciB8fCBlLnRhcmdldCA9PT0gY2xvc2VCdXR0b24gfHwgZS50YXJnZXQgPT09IGJ0bkNsb3NlKSB7XG4gICAgICAgICAgICAgICAgY2xvc2VQb3B1cCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBmdW5jdGlvbiBjbG9zZVBvcHVwKCkge1xuICAgICAgICAgICAgcG9wdXBzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ19vcGFjaXR5Jyk7XG4gICAgICAgICAgICBwb3B1cHNDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShwb3B1cENsYXNzKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnJztcbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhwb3B1cEJ0bilcbiAgICAgICAgcG9wdXBCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PntcbiAgICAgICAgICAgIGNsb3NlUG9wdXAoKVxuICAgICAgICB9KVxuXG4gICAgfVxuXG4gICAgc2V0UG9wdXBzKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5naWRlX19saXN0LWJ0bicpLCAnZ2lkZVBvcHVwJyk7XG4gICAgc2V0UG9wdXBzKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcmVkaWN0X19idG4udG9vay1wYXJ0JyksICdfY29uZmlybVBvcHVwJyk7XG5cbiAgICAvL2dvIHRvIHByZWRpY3RcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvUHJlZGljdFwiKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJlZGljdFwiKTtcbiAgICAgICAgY29uc3QgdGFyZ2V0UG9zaXRpb24gPSB0YXJnZXRFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIHdpbmRvdy5wYWdlWU9mZnNldCAtIDI7XG5cbiAgICAgICAgd2luZG93LnNjcm9sbFRvKHtcbiAgICAgICAgICAgIHRvcDogdGFyZ2V0UG9zaXRpb24sXG4gICAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCcsXG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgY29uc3QgcmFkaW9Db250YWluZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByZWRpY3RfX3JhZGlvJyk7XG5cbiAgICByYWRpb0NvbnRhaW5lcnMuZm9yRWFjaChjb250YWluZXIgPT4ge1xuICAgICAgICBjb25zdCByYWRpb0lucHV0cyA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCcucHJlZGljdF9fcmFkaW8taXRlbScpO1xuXG4gICAgICAgIHJhZGlvSW5wdXRzLmZvckVhY2goKHJhZGlvKSA9PiB7XG4gICAgICAgICAgICByYWRpby5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByYWRpb0lucHV0cy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdfYWN0aXZlJykpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnX2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucXVlcnlTZWxlY3RvcihcImlucHV0XCIpLnZhbHVlKVxuXG4gICAgICAgICAgICAgICAgdXBkYXRlRmlyc3RHb2FsKG1hdGNoTnVtYmVyLCB0aGlzLnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFwiKS52YWx1ZSlcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjdXJyZW50QmV0KVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIGxvYWRUcmFuc2xhdGlvbnMoKVxuICAgICAgICAudGhlbihpbml0KVxuXG4gICAgaW5pdCgpXG5cbiAgICAvLyBURVNUXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhcmstYnRuJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgnZGFyaycpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgbG5nQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5sbmctYnRuXCIpXG5cbiAgICBsbmdCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJsb2NhbGVcIikpIHtcbiAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oXCJsb2NhbGVcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwibG9jYWxlXCIsIFwiZW5cIik7XG4gICAgICAgIH1cbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgYXV0aEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYXV0aC1idG5cIilcblxuICAgIGF1dGhCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICBpZih1c2VySWQpe1xuICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShcInVzZXJJZFwiKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJ1c2VySWRcIiwgXCIxODkwODQ2NVwiKVxuICAgICAgICB9XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKVxuICAgIH0pO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJ0bi1sYXN0UHJlZCcpLmZvckVhY2goYnV0dG9uID0+IHtcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJlZGljdF9fbGFzdCcpLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdoaWRlJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBzZXRQb3B1cHMoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJ0bi10aGVua3MnKSwgJ19jb25maXJtUG9wdXAnKTtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG4tcHJlZGljdCcpLmZvckVhY2goYnV0dG9uID0+IHtcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnVuY29uZmlybWVkJykuZm9yRWFjaCh1bmNvbmZpcm1lZCA9PiB7XG4gICAgICAgICAgICAgICAgdW5jb25maXJtZWQuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbmZpcm1lZCcpLmZvckVhY2goY29uZmlybWVkID0+IHtcbiAgICAgICAgICAgICAgICBjb25maXJtZWQuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWVudS1idG5cIik/LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1lbnUtdGVzdFwiKT8uY2xhc3NMaXN0LnRvZ2dsZShcImhpZGVcIik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG4tYWZ0ZXJcIik/LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ29hbC0xXCIpPy5jbGFzc0xpc3QudG9nZ2xlKFwiX2xvY2tcIilcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zY29yZS0xXCIpPy5jbGFzc0xpc3QudG9nZ2xlKFwiX2xvY2tcIilcbiAgICAgICAgY29uc29sZS5sb2coXCJsb2NrIHRhYmxlXCIpXG4gICAgfSk7XG59KSgpIl19
