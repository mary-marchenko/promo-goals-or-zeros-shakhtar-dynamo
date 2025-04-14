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
  var _sessionStorage$getIt, _document$querySelect3;
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
  var FIRST_MATCH_DATE = new Date('2026-03-20T21:15:00'); // дата матчу - 30хв
  var currentDate = new Date();
  function lockMatchContainer(matchDate, matchNumber) {
    if (new Date() > matchDate) {
      var _containers = document.querySelectorAll(".predict__container[data-match-number=\"".concat(matchNumber, "\"]"));
      var tab = document.querySelector(".predict__tabs-date.active[data-match-number=\"".concat(matchNumber, "\"]"));
      _containers.forEach(function (container) {
        container.classList.add('_lock');
      });
      if (tab) {
        placeBetBtn.classList.add("_lock");
      }
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
  // function renderUsers() {
  //     request(`/users/${currentTabTable}`)
  //         .then(data => {
  //
  //             let users = data.users
  //
  //             // console.log(users)
  //             const isScoreTabActive = document.querySelector('.predict__tabs-score.active');
  //             const isGoalTabActive = document.querySelector('.predict__tabs-goal.active');
  //
  //             if(users.length >= 50){
  //                 showTopForecast = true
  //             }
  //             if(users.length < 50){
  //                 showTopForecast = false
  //             }
  //
  //             if (isScoreTabActive && showTopForecast) topForecast.classList.remove("hide")
  //             if (isGoalTabActive) topForecast.classList.add("hide")
  //
  //
  //             // console.log(typeof userId)
  //
  //             populateUsersTable(users, userId, currentTabTable)
  //
  //             // console.log(users)
  //         });
  //
  // }
  // function populateUsersTable(users, currentUserId, matchNumber) {
  //     resultsTable.innerHTML = '';
  //     resultsTableOther.innerHTML = '';
  //
  //     if (!users || !users.length) return;
  //
  //     // // Фільтруємо користувачів, які зробили ставку на вказаний матч
  //     // const users = users.filter(user =>
  //     //     user.bets.some(bet => bet.matchNumber === matchNumber)
  //     // );
  //
  //     // if (!users.length) return;
  //
  //     // Знаходимо поточного користувача
  //     const currentUser = users.find(user => user.userid === currentUserId);
  //
  //     // Виводимо всіх інших користувачів у resultsTable
  //     users.forEach(user => {
  //         if (user.userid !== currentUserId) {
  //             displayUser(user, false, resultsTable, users, matchNumber);
  //         }
  //     });
  //
  //     // Виводимо поточного користувача в resultsTableOther
  //     if (currentUser) {
  //         displayUser(currentUser, true, resultsTableOther, users, matchNumber);
  //     }
  // }
  // function displayUser(user, isCurrentUser, table, allUsers, matchNumber) {
  //     let matchDate;
  //
  //     if (matchNumber === 1) {
  //         matchDate = FIRST_MATCH_DATE;
  //     }
  //
  //     const additionalUserRow = document.createElement('div');
  //     additionalUserRow.classList.add('table__row');
  //
  //     additionalUserRow.innerHTML = `
  //     <div class="table__row-item">${isCurrentUser ? user.userid : maskUserId(user.userid)}</div>
  //     <div class="table__row-item">
  //         ${currentDate >= matchDate ?
  //         `<span>${user.team1 !== undefined && user.team1 !== null ? user.team1 : "-"}</span><img src="https://fav-prom.com/html/goals-or-zeroes/img/vs.png" alt="vs"><span>${user.team2 !== undefined && user.team2 !== null ? user.team2 : "-"}</span>` :
  //         `<span>**</span><img src="https://fav-prom.com/html/goals-or-zeroes/img/vs.png" alt="vs"><span>**</span>`
  //     }
  //     </div>
  //
  //     ${user.winner === true  ?
  //         `<div class="table__row-item" data-translate="prize">*****</div>` :
  //         `<div class="table__row-item" data-translate="noWinners">*****</div>`
  //     }
  //
  //     ${user.bonusFirstGoal === true  ?
  //         `<div class="table__row-item" data-translate="ss500">*****</div>` :
  //         `<div class="table__row-item" data-translate="noWinners">*****</div>`
  //     }
  // `;
  //
  //     if (isCurrentUser) {
  //         additionalUserRow.classList.add("you");
  //         additionalUserRow.innerHTML = `
  //         <div class="table__row-item">${isCurrentUser ? user.userid : maskUserId(user.userid)}</div>
  //         <div class="table__row-item">
  //             <span>${user.team1 !== undefined && user.team1 !== null ? user.team1 : "-"}</span><img src="https://fav-prom.com/html/goals-or-zeroes/img/vs.png" alt="vs"><span>${user.team2 !== undefined && user.team2 !== null ? user.team2 : "-"}</span>
  //         </div>
  //         ${user.winner === true  ?
  //             `<div class="table__row-item" data-translate="prize">*****</div>` :
  //             `<div class="table__row-item" data-translate="noWinners">*****</div>`
  //         }
  //
  //         ${user.bonusFirstGoal === true  ?
  //             `<div class="table__row-item" data-translate="ss500">*****</div>` :
  //             `<div class="table__row-item" data-translate="noWinners">*****</div>`
  //         }
  //     `;
  //         const youBlock = document.createElement('div');
  //         youBlock.classList.add('table__row-you');
  //         youBlock.setAttribute('data-translate', 'tableYou');
  //         // youBlock.textContent = "You";
  //         additionalUserRow.insertBefore(youBlock, additionalUserRow.children[1]);
  //     }
  //
  //     table.append(additionalUserRow);
  // }
  // function maskUserId(userId) {
  //     return "**" + userId.toString().slice(2);
  // }

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
    } else if (isGoalTabActive) {
      if (showTopForecast) topForecast.classList.add("hide");
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
  document.querySelectorAll('.table__tabs-date').forEach(function (tab) {
    tab.addEventListener('click', function () {
      if (this.classList.contains('active')) {
        return;
      }
      document.querySelectorAll('.table__tabs-date').forEach(function (tab) {
        return tab.classList.remove('active');
      });
      this.classList.add('active');
      currentTabTable = Number(document.querySelector(".table__tabs-date.active").getAttribute("data-match-number"));
      renderUsers();
    });
  });

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
    var _document$querySelect4, _document$querySelect5;
    (_document$querySelect4 = document.querySelector(".goal-1")) === null || _document$querySelect4 === void 0 ? void 0 : _document$querySelect4.classList.toggle("_lock");
    (_document$querySelect5 = document.querySelector(".score-1")) === null || _document$querySelect5 === void 0 ? void 0 : _document$querySelect5.classList.toggle("_lock");
    console.log("lock table");
  });
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiYXBpVVJMIiwidW5hdXRoTXNncyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsInlvdUFyZUluQnRucyIsIm1haW5QYWdlIiwicXVlcnlTZWxlY3RvciIsInJlc3VsdHNUYWJsZSIsInJlc3VsdHNUYWJsZU90aGVyIiwicGxhY2VCZXRCdG4iLCJsYXN0UHJlZGljdCIsInRvcEZvcmVjYXN0IiwiY3VycmVudFRhYiIsImN1cnJlbnRUYWJUYWJsZSIsIm1hdGNoTnVtYmVyIiwic2hvd1RvcEZvcmVjYXN0IiwiRklSU1RfTUFUQ0hfREFURSIsIkRhdGUiLCJjdXJyZW50RGF0ZSIsImxvY2tNYXRjaENvbnRhaW5lciIsIm1hdGNoRGF0ZSIsImNvbnRhaW5lcnMiLCJ0YWIiLCJmb3JFYWNoIiwiY29udGFpbmVyIiwiY2xhc3NMaXN0IiwiYWRkIiwic2V0SW50ZXJ2YWwiLCJCZXQiLCJ1c2VySWQiLCJ0ZWFtMUdvYWxzIiwidGVhbTJHb2FscyIsImZpcnN0R29hbCIsInVzZXJpZCIsInRlYW0xIiwidGVhbTIiLCJ1bmRlZmluZWQiLCJnb2Fsc1VwZGF0ZWQiLCJmaXJzdEdvYWxVcGRhdGVkIiwiY2FjaGUiLCJwcmVkaWN0RGF0YSIsInRyYW5zbGF0ZVN0YXRlIiwiZGVidWciLCJsb2NhbGUiLCJzZXNzaW9uU3RvcmFnZSIsImdldEl0ZW0iLCJ1a0xlbmciLCJlbkxlbmciLCJpMThuRGF0YSIsImN1cnJlbnRCZXQiLCJyZXF1ZXN0IiwibGluayIsImV4dHJhT3B0aW9ucyIsImZldGNoIiwiaGVhZGVycyIsInRoZW4iLCJyZXMiLCJvayIsIkVycm9yIiwianNvbiIsImVyciIsImNvbnNvbGUiLCJlcnJvciIsInJlcG9ydEVycm9yIiwic3R5bGUiLCJkaXNwbGF5Iiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwic3RhcnRzV2l0aCIsIlByb21pc2UiLCJyZWplY3QiLCJyZXBvcnREYXRhIiwib3JpZ2luIiwiZXJyb3JUZXh0IiwidGV4dCIsIm1lc3NhZ2UiLCJ0eXBlIiwibmFtZSIsInN0YWNrIiwibWV0aG9kIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJ3YXJuIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJyZWFzb24iLCJnZXRMYXN0QmV0IiwiYmV0cyIsImZpbmQiLCJiZXQiLCJyZWZyZXNoQmV0SW5mbyIsInNjb3JlMSIsInNjb3JlMiIsImdvYWwxIiwiZ29hbDIiLCJkYXRhIiwiYmV0QXZhaWxhYmxlIiwic29tZSIsImxhc3RUZWFtMSIsImxhc3RUZWFtMiIsInNjb3JlVGVhbTEiLCJzY29yZVRlYW0yIiwicmVtb3ZlIiwibGFzdEJldCIsInRleHRDb250ZW50IiwiYmV0Q29uZmlybWVkIiwiaXRlbSIsInNldEF0dHJpYnV0ZSIsInRyYW5zbGF0ZSIsImNvbnRhaW5zIiwiSW5pdFBhZ2UiLCJjaGVja1VzZXJBdXRoIiwicmVuZGVyVXNlcnMiLCJ1cGRhdGVUb3BGb3JlY2FzdHMiLCJ5b3VBcmVJbkJ0biIsInVuYXV0aE1lcyIsInBsYWNlQmV0IiwibG9nIiwiYnRuIiwic2NvcmVJbml0IiwiYWN0aXZlVGFicyIsInJlcSIsImFjdGl2ZUlucHV0IiwidmFsdWUiLCJzZXRJdGVtIiwibG9hZFRyYW5zbGF0aW9ucyIsIm11dGF0aW9uT2JzZXJ2ZXIiLCJNdXRhdGlvbk9ic2VydmVyIiwibXV0YXRpb25zIiwib2JzZXJ2ZSIsImdldEVsZW1lbnRCeUlkIiwiY2hpbGRMaXN0Iiwic3VidHJlZSIsImVsZW1zIiwiZWxlbSIsImtleSIsImdldEF0dHJpYnV0ZSIsImlubmVySFRNTCIsInJlbW92ZUF0dHJpYnV0ZSIsInJlZnJlc2hMb2NhbGl6ZWRDbGFzcyIsImVsZW1lbnQiLCJsYW5nIiwiaW5pdCIsInN0b3JlIiwic3RhdGUiLCJnZXRTdGF0ZSIsImF1dGgiLCJpc0F1dGhvcml6ZWQiLCJpZCIsImMiLCJpIiwiZ191c2VyX2lkIiwiY2xlYXJJbnRlcnZhbCIsInByZXZlbnREZWZhdWx0IiwidXBkYXRlU2NvcmUiLCJ1cGRhdGVHb2FscyIsInVwZGF0ZUZpcnN0R29hbCIsImZvcmVjYXN0c0NvbnRhaW5lciIsInRvcEZvcmVjYXN0cyIsImZvcmVjYXN0IiwiZm9yZWNhc3RJdGVtIiwiY3JlYXRlRWxlbWVudCIsInBlcmNlbnRhZ2UiLCJwYXJzZUZsb2F0IiwidG9GaXhlZCIsInBlcmNlbnRhZ2VTcGFuIiwiZm9yZWNhc3RUZXh0IiwiY3JlYXRlVGV4dE5vZGUiLCJhcHBlbmRDaGlsZCIsImNhcmRzIiwiYW5nbGUiLCJhbmltYXRlQ2FyZHMiLCJyb3RhdGVYIiwiTWF0aCIsInNpbiIsIlBJIiwicm90YXRlWSIsImNvcyIsImNhcmQiLCJ0cmFuc2Zvcm0iLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ0YWJzIiwiaGFuZGxlVGFiQ2xpY2siLCJldmVudCIsImN1cnJlbnRNYXRjaCIsImNsaWNrZWRUYWIiLCJ0YXJnZXQiLCJjbG9zZXN0IiwidGFiUGFpciIsInBhaXIiLCJsZW5ndGgiLCJ1cGRhdGVDb250YWluZXJzIiwic2NvcmUiLCJidXR0b24iLCJjaGVja2VkIiwiaXNTY29yZVRhYkFjdGl2ZSIsImlzR29hbFRhYkFjdGl2ZSIsInRlYW1Db250cm9sIiwidGVhbU51bWJlciIsIm1hdGNoQ29udGFpbmVyIiwicGFyc2VJbnQiLCJkYXRhc2V0IiwiZ2V0R29hbHMiLCJ0ZWFtIiwiTnVtYmVyIiwic2V0UG9wdXBzIiwidHJpZ2dlckJ1dHRvbnMiLCJwb3B1cENsYXNzIiwicG9wdXBzQ29udGFpbmVyIiwicG9wdXAiLCJwb3B1cEJ0biIsInRyaWdnZXJCdXR0b24iLCJvdmVyZmxvdyIsImNsb3NlQnV0dG9uIiwiYnRuQ2xvc2UiLCJjbG9zZVBvcHVwIiwidGFyZ2V0RWxlbWVudCIsInRhcmdldFBvc2l0aW9uIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwidG9wIiwicGFnZVlPZmZzZXQiLCJzY3JvbGxUbyIsImJlaGF2aW9yIiwicmFkaW9Db250YWluZXJzIiwicmFkaW9JbnB1dHMiLCJyYWRpbyIsInRvZ2dsZSIsImxuZ0J0biIsInJlbW92ZUl0ZW0iLCJyZWxvYWQiLCJhdXRoQnRuIiwidW5jb25maXJtZWQiLCJjb25maXJtZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQ0FBQyxZQUFZO0VBQUE7RUFDVCxJQUFNQSxNQUFNLEdBQUcsNENBQTRDO0lBQ3ZEQyxVQUFVLEdBQUdDLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMsYUFBYSxDQUFDO0lBQ3JEQyxZQUFZLEdBQUdGLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMsWUFBWSxDQUFDO0lBQ3RERSxRQUFRLEdBQUdILFFBQVEsQ0FBQ0ksYUFBYSxDQUFDLFdBQVcsQ0FBQztJQUM5Q0MsWUFBWSxHQUFHTCxRQUFRLENBQUNJLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQztJQUN2REUsaUJBQWlCLEdBQUdOLFFBQVEsQ0FBQ0ksYUFBYSxDQUFDLHNCQUFzQixDQUFDO0lBQ2xFRyxXQUFXLEdBQUdQLFFBQVEsQ0FBQ0ksYUFBYSxDQUFDLGNBQWMsQ0FBQztJQUNwREksV0FBVyxHQUFHUixRQUFRLENBQUNJLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQztJQUN0REssV0FBVyxHQUFHVCxRQUFRLENBQUNJLGFBQWEsQ0FBQyxjQUFjLENBQUM7RUFFeEQsSUFBSU0sVUFBVSxHQUFHLENBQUM7RUFDbEIsSUFBSUMsZUFBZSxHQUFHLENBQUM7RUFDdkIsSUFBSUMsV0FBVyxHQUFHLENBQUM7RUFDbkIsSUFBSUMsZUFBZSxHQUFHLEtBQUs7RUFFM0IsSUFBTUMsZ0JBQWdCLEdBQUcsSUFBSUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEVBQUM7RUFDekQsSUFBTUMsV0FBVyxHQUFHLElBQUlELElBQUksRUFBRTtFQUU5QixTQUFTRSxrQkFBa0IsQ0FBQ0MsU0FBUyxFQUFFTixXQUFXLEVBQUU7SUFDaEQsSUFBSSxJQUFJRyxJQUFJLEVBQUUsR0FBR0csU0FBUyxFQUFFO01BQ3hCLElBQU1DLFdBQVUsR0FBR25CLFFBQVEsQ0FBQ0MsZ0JBQWdCLG1EQUEyQ1csV0FBVyxTQUFLO01B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O01BQzFDLENBQUMsQ0FBQztNQUVGbE8sUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsQ0FBQ29CLE9BQU8sQ0FBQyxVQUFBbU4sU0FBUyxFQUFJO1FBQ3pEQSxTQUFTLENBQUNqTixTQUFTLENBQUMyTSxNQUFNLENBQUMsUUFBUSxDQUFDO01BQ3hDLENBQUMsQ0FBQztJQUNOLENBQUMsQ0FBQztFQUNOLENBQUMsQ0FBQztFQUVGbE8sUUFBUSxDQUFDbUYsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsWUFBTTtJQUFBO0lBQ2hELHlCQUFBbkYsUUFBUSxDQUFDSSxhQUFhLENBQUMsV0FBVyxDQUFDLDBEQUFuQyxzQkFBcUMrRSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBTTtNQUFBO01BQ2pFLDBCQUFBbkYsUUFBUSxDQUFDSSxhQUFhLENBQUMsWUFBWSxDQUFDLDJEQUFwQyx1QkFBc0NtQixTQUFTLENBQUMyTSxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2xFLENBQUMsQ0FBQztFQUNOLENBQUMsQ0FBQztFQUVGLDBCQUFBbE8sUUFBUSxDQUFDSSxhQUFhLENBQUMsWUFBWSxDQUFDLDJEQUFwQyx1QkFBc0MrRSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBTTtJQUFBO0lBQ2xFLDBCQUFBbkYsUUFBUSxDQUFDSSxhQUFhLENBQUMsU0FBUyxDQUFDLDJEQUFqQyx1QkFBbUNtQixTQUFTLENBQUMyTSxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQzVELDBCQUFBbE8sUUFBUSxDQUFDSSxhQUFhLENBQUMsVUFBVSxDQUFDLDJEQUFsQyx1QkFBb0NtQixTQUFTLENBQUMyTSxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQzdEdkssT0FBTyxDQUFDMEQsR0FBRyxDQUFDLFlBQVksQ0FBQztFQUM3QixDQUFDLENBQUM7QUFFTixDQUFDLEdBQUciLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgYXBpVVJMID0gJ2h0dHBzOi8vZmF2LXByb20uY29tL2FwaV9mb290YmFsbF9zaGFraHRhcicsXG4gICAgICAgIHVuYXV0aE1zZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudW5hdXRoLW1zZycpLFxuICAgICAgICB5b3VBcmVJbkJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudG9vay1wYXJ0JyksXG4gICAgICAgIG1haW5QYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mYXYtcGFnZVwiKSxcbiAgICAgICAgcmVzdWx0c1RhYmxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Jlc3VsdHMtdGFibGUnKSxcbiAgICAgICAgcmVzdWx0c1RhYmxlT3RoZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcmVzdWx0cy10YWJsZS1vdGhlcicpLFxuICAgICAgICBwbGFjZUJldEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJlZGljdC1idG5cIiksXG4gICAgICAgIGxhc3RQcmVkaWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmVkaWN0X19sYXN0XCIpLFxuICAgICAgICB0b3BGb3JlY2FzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9wRm9yZWNhc3RcIilcblxuICAgIGxldCBjdXJyZW50VGFiID0gMVxuICAgIGxldCBjdXJyZW50VGFiVGFibGUgPSAxXG4gICAgbGV0IG1hdGNoTnVtYmVyID0gMVxuICAgIGxldCBzaG93VG9wRm9yZWNhc3QgPSBmYWxzZVxuXG4gICAgY29uc3QgRklSU1RfTUFUQ0hfREFURSA9IG5ldyBEYXRlKCcyMDI2LTAzLTIwVDIxOjE1OjAwJykgLy8g0LTQsNGC0LAg0LzQsNGC0YfRgyAtIDMw0YXQslxuICAgIGNvbnN0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKVxuXG4gICAgZnVuY3Rpb24gbG9ja01hdGNoQ29udGFpbmVyKG1hdGNoRGF0ZSwgbWF0Y2hOdW1iZXIpIHtcbiAgICAgICAgaWYgKG5ldyBEYXRlKCkgPiBtYXRjaERhdGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAucHJlZGljdF9fY29udGFpbmVyW2RhdGEtbWF0Y2gtbnVtYmVyPVwiJHttYXRjaE51bWJlcn1cIl1gKTtcbiAgICAgICAgICAgIGNvbnN0IHRhYiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5wcmVkaWN0X190YWJzLWRhdGUuYWN0aXZlW2RhdGEtbWF0Y2gtbnVtYmVyPVwiJHttYXRjaE51bWJlcn1cIl1gKTtcblxuICAgICAgICAgICAgY29udGFpbmVycy5mb3JFYWNoKGNvbnRhaW5lciA9PiB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ19sb2NrJyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYodGFiKXtcbiAgICAgICAgICAgICAgICBwbGFjZUJldEJ0bi5jbGFzc0xpc3QuYWRkKFwiX2xvY2tcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxvY2tNYXRjaENvbnRhaW5lcihGSVJTVF9NQVRDSF9EQVRFLCAxKTsgLy8g0JTQu9GPINC/0LXRgNGI0L7Qs9C+INC80LDRgtGH0YNcblxuICAgIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgY29uc3QgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpOyAvLyDQntC90L7QstC40YLQuCDQv9C+0YLQvtGH0L3RgyDQtNCw0YLRg1xuICAgICAgICBsb2NrTWF0Y2hDb250YWluZXIoRklSU1RfTUFUQ0hfREFURSwgMSk7XG4gICAgfSwgNjAwMDAwKTsgLy8g0J7QvdC+0LLQu9GO0LLQsNGC0Lgg0LrQvtC20L3RliAxMCDRhdCyXG5cbiAgICBjbGFzcyBCZXQge1xuICAgICAgICBjb25zdHJ1Y3Rvcih1c2VySWQsIG1hdGNoTnVtYmVyLCB0ZWFtMUdvYWxzID0gMCwgdGVhbTJHb2FscyA9IDAsIGZpcnN0R29hbCkge1xuICAgICAgICAgICAgaWYodXNlcklkICE9PSBudWxsKSB0aGlzLnVzZXJpZCA9IHVzZXJJZDtcbiAgICAgICAgICAgIHRoaXMubWF0Y2hOdW1iZXIgPSBtYXRjaE51bWJlcjtcbiAgICAgICAgICAgIHRoaXMudGVhbTEgPSB0ZWFtMUdvYWxzO1xuICAgICAgICAgICAgdGhpcy50ZWFtMiA9IHRlYW0yR29hbHM7XG4gICAgICAgICAgICBpZihmaXJzdEdvYWwgIT09IHVuZGVmaW5lZCkgdGhpcy5maXJzdEdvYWwgPSBmaXJzdEdvYWw7XG4gICAgICAgIH1cblxuICAgICAgICB1cGRhdGVHb2Fscyh0ZWFtMUdvYWxzLCB0ZWFtMkdvYWxzKSB7XG4gICAgICAgICAgICBpZiAodGVhbTFHb2FscyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50ZWFtMSA9IHRlYW0xR29hbHMgIT09IG51bGwgPyB0ZWFtMUdvYWxzIDogdGhpcy50ZWFtMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0ZWFtMkdvYWxzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRlYW0yID0gdGVhbTJHb2FscyAhPT0gbnVsbCA/IHRlYW0yR29hbHMgOiB0aGlzLnRlYW0yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5nb2Fsc1VwZGF0ZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdXBkYXRlRmlyc3RHb2FsKGZpcnN0R29hbCkge1xuICAgICAgICAgICAgaWYgKGZpcnN0R29hbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJzdEdvYWwgPSBmaXJzdEdvYWwgIT09IG51bGwgPyBmaXJzdEdvYWwgOiB0aGlzLmZpcnN0R29hbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZmlyc3RHb2FsVXBkYXRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBjYWNoZSA9IHt9O1xuICAgIGxldCBwcmVkaWN0RGF0YSA9IFtdO1xuXG4gICAgbGV0IHRyYW5zbGF0ZVN0YXRlID0gdHJ1ZVxuICAgIGxldCBkZWJ1ZyA9IGZhbHNlXG5cbiAgICBsZXQgbG9jYWxlID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcImxvY2FsZVwiKSA/PyBcInVrXCJcbiAgICAvLyBsZXQgbG9jYWxlID0gXCJ1a1wiXG4gICAgLy8gbGV0IGxvY2FsZSA9IFwiZW5cIlxuXG5cbiAgICBjb25zdCB1a0xlbmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdWtMZW5nJyk7XG4gICAgY29uc3QgZW5MZW5nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VuTGVuZycpO1xuXG5cbiAgICBsZXQgaTE4bkRhdGEgPSB7fTtcblxuICAgIGxldCB1c2VySWQ7XG4gICAgLy8gdXNlcklkID0gMTAwMzAwMjY4O1xuXG4gICAgbGV0IGN1cnJlbnRCZXQ7XG5cbiAgICBpZiAodWtMZW5nKSBsb2NhbGUgPSAndWsnO1xuICAgIGlmIChlbkxlbmcpIGxvY2FsZSA9ICdlbic7XG5cbiAgICBjb25zdCByZXF1ZXN0ID0gKGxpbmssIGV4dHJhT3B0aW9ucykgPT5cbiAgICAgICAgZmV0Y2goYXBpVVJMICsgbGluaywge1xuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC4uLihleHRyYU9wdGlvbnMgfHwge30pXG4gICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghcmVzLm9rKSB0aHJvdyBuZXcgRXJyb3IoJ0FQSSBlcnJvcicpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0FQSSByZXF1ZXN0IGZhaWxlZDonLCBlcnIpO1xuXG4gICAgICAgICAgICAgICAgcmVwb3J0RXJyb3IoZXJyKTtcblxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mYXYtcGFnZScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5ocmVmLnN0YXJ0c1dpdGgoXCJodHRwczovL3d3dy5mYXZiZXQuaHIvXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9wcm9tb2NpamUvcHJvbW9jaWphL3N0dWIvJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvcHJvbW9zL3Byb21vL3N0dWIvJztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gcmVwb3J0RXJyb3IoZXJyKSB7XG4gICAgICAgIGNvbnN0IHJlcG9ydERhdGEgPSB7XG4gICAgICAgICAgICBvcmlnaW46IHdpbmRvdy5sb2NhdGlvbi5ocmVmLFxuICAgICAgICAgICAgdXNlcmlkOiB1c2VySWQsXG4gICAgICAgICAgICBlcnJvclRleHQ6IGVycj8uZXJyb3IgfHwgZXJyPy50ZXh0IHx8IGVycj8ubWVzc2FnZSB8fCAnVW5rbm93biBlcnJvcicsXG4gICAgICAgICAgICB0eXBlOiBlcnI/Lm5hbWUgfHwgJ1Vua25vd25FcnJvcicsXG4gICAgICAgICAgICBzdGFjazogZXJyPy5zdGFjayB8fCAnJ1xuICAgICAgICB9O1xuXG4gICAgICAgIGZldGNoKCdodHRwczovL2Zhdi1wcm9tLmNvbS9hcGktY21zL3JlcG9ydHMvYWRkJywge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHJlcG9ydERhdGEpXG4gICAgICAgIH0pLmNhdGNoKGNvbnNvbGUud2Fybik7XG4gICAgfVxuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgcmVwb3J0RXJyb3IoZS5lcnJvciB8fCBlKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3VuaGFuZGxlZHJlamVjdGlvbicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHJlcG9ydEVycm9yKGUucmVhc29uIHx8IGUpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgZ2V0TGFzdEJldCA9IChiZXRzLCBtYXRjaE51bWJlcikgPT57XG4gICAgICAgIGlmKCFiZXRzKSByZXR1cm4gZmFsc2VcbiAgICAgICAgcmV0dXJuIGJldHMuZmluZChiZXQgPT4gYmV0Lm1hdGNoTnVtYmVyID09PSBtYXRjaE51bWJlcik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVmcmVzaEJldEluZm8odXNlcklkKSB7XG4gICAgICAgIGNvbnN0IHNjb3JlMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2NvcmUtMVwiKVxuICAgICAgICBjb25zdCBzY29yZTIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNjb3JlLTJcIilcbiAgICAgICAgY29uc3QgZ29hbDEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdvYWwtMVwiKVxuICAgICAgICBjb25zdCBnb2FsMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ29hbC0yXCIpXG5cbiAgICAgICAgLy8gY29uc29sZS5sb2cobWF0Y2hOdW1iZXIpXG5cbiAgICAgICAgcmVxdWVzdChgL2ZhdnVzZXIvJHt1c2VySWR9YCwge1xuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgICAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgaWYoZGF0YS5iZXRzKXtcbiAgICAgICAgICAgICAgICBjb25zdCBiZXRBdmFpbGFibGUgPSBkYXRhLmJldHMuc29tZShiZXQgPT57XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBiZXQubWF0Y2hOdW1iZXIgPT09IG1hdGNoTnVtYmVyXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhiZXRBdmFpbGFibGUpXG4gICAgICAgICAgICAgICAgY29uc3QgbGFzdFRlYW0xID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmVkaWN0X19sYXN0LXRlYW0udGVhbTFcIik7XG4gICAgICAgICAgICAgICAgY29uc3QgbGFzdFRlYW0yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmVkaWN0X19sYXN0LXRlYW0udGVhbTJcIik7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2NvcmVUZWFtMSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2NvcmVUZWFtMVwiKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzY29yZVRlYW0yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zY29yZVRlYW0yXCIpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpcnN0R29hbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJlZGljdF9fbGFzdC1jb3VudHJ5XCIpO1xuICAgICAgICAgICAgICAgIGlmKGJldEF2YWlsYWJsZSl7XG4gICAgICAgICAgICAgICAgICAgIGxhc3RQcmVkaWN0LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RCZXQgPSBnZXRMYXN0QmV0KGRhdGEuYmV0cywgbWF0Y2hOdW1iZXIpO1xuICAgICAgICAgICAgICAgICAgICBzY29yZVRlYW0xLnRleHRDb250ZW50ID0gbGFzdEJldC50ZWFtMSA9PT0gdW5kZWZpbmVkID8gXCItXCIgOmAke2xhc3RCZXQudGVhbTF9YDtcbiAgICAgICAgICAgICAgICAgICAgc2NvcmVUZWFtMi50ZXh0Q29udGVudCA9IGxhc3RCZXQudGVhbTIgPT09IHVuZGVmaW5lZCA/IFwiLVwiIDpgJHtsYXN0QmV0LnRlYW0yfWA7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGxhc3RCZXQpXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RCZXQuYmV0Q29uZmlybWVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByZWRpY3RfX2xhc3QtcmVzdWx0LnVuY29uZmlybWVkXCIpLmZvckVhY2goaXRlbSA9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcmVkaWN0X19sYXN0LXJlc3VsdC5jb25maXJtZWRcIikuZm9yRWFjaChpdGVtID0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByZWRpY3RfX2xhc3QtcmVzdWx0LnVuY29uZmlybWVkXCIpLmZvckVhY2goaXRlbSA9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcmVkaWN0X19sYXN0LXJlc3VsdC5jb25maXJtZWRcIikuZm9yRWFjaChpdGVtID0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAobGFzdEJldC5tYXRjaE51bWJlciA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFRlYW0xLnNldEF0dHJpYnV0ZShcImRhdGEtdHJhbnNsYXRlXCIsIFwic2hha2h0YXJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0VGVhbTIuc2V0QXR0cmlidXRlKFwiZGF0YS10cmFuc2xhdGVcIiwgXCJkeW5hbW9cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmKHNjb3JlMS5jbGFzc0xpc3QuY29udGFpbnMoXCJhY3RpdmVcIikpe1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmVkaWN0X19sYXN0LXNjb3JlXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByZWRpY3RfX2xhc3QtZ29hbFwiKS5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoZ29hbDEuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlXCIpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJlZGljdF9fbGFzdC1zY29yZVwiKS5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmVkaWN0X19sYXN0LWdvYWxcIikuY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIilcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmKGxhc3RCZXQuZmlyc3RHb2FsKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGxhc3RCZXQuZmlyc3RHb2FsID09PSBcInNoYWtodGFyXCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0R29hbC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXRyYW5zbGF0ZVwiLCBcInNoYWtodGFyXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobGFzdEJldC5maXJzdEdvYWwgPT09IFwiZHluYW1vXCIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0R29hbC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXRyYW5zbGF0ZVwiLCBcImR5bmFtb1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGxhc3RCZXQuZmlyc3RHb2FsID09PSBcImRyYXdcIil7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RHb2FsLnNldEF0dHJpYnV0ZShcImRhdGEtdHJhbnNsYXRlXCIsIFwiZHJhd1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGdvYWwxLmNsYXNzTGlzdC5jb250YWlucyhcImFjdGl2ZVwiKSB8fCBnb2FsMi5jbGFzc0xpc3QuY29udGFpbnMoXCJhY3RpdmVcIikpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJlZGljdF9fbGFzdFwiKS5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoIWJldEF2YWlsYWJsZSl7XG4gICAgICAgICAgICAgICAgICAgIGxhc3RQcmVkaWN0LmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgbGFzdFByZWRpY3QuY2xhc3NMaXN0LmFkZChcImhpZGVcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3I6JywgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgY29uc3QgSW5pdFBhZ2UgPSAoKSA9PiB7XG4gICAgICAgIGNoZWNrVXNlckF1dGgoKTtcbiAgICAgICAgcmVuZGVyVXNlcnMoKTtcbiAgICAgICAgdXBkYXRlVG9wRm9yZWNhc3RzKGN1cnJlbnRUYWIpXG4gICAgICAgIHJlZnJlc2hCZXRJbmZvKHVzZXJJZClcbiAgICB9XG5cbiAgICBsZXQgY2hlY2tVc2VyQXV0aCA9ICgpID0+IHtcbiAgICAgICAgaWYgKHVzZXJJZCkge1xuICAgICAgICAgICAgeW91QXJlSW5CdG5zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKSk7XG4gICAgICAgICAgICB1bmF1dGhNc2dzLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGxldCB5b3VBcmVJbkJ0biBvZiB5b3VBcmVJbkJ0bnMpIHtcbiAgICAgICAgICAgICAgICB5b3VBcmVJbkJ0bi5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHVuYXV0aE1lcyBvZiB1bmF1dGhNc2dzKSB7XG4gICAgICAgICAgICAgICAgdW5hdXRoTWVzLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBwbGFjZUJldChiZXQpIHtcbiAgICAgICAgaWYgKCF1c2VySWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhiZXQpXG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmVkaWN0X19jb250YWluZXIuYWN0aXZlXCIpXG4gICAgICAgICAgICAucXVlcnlTZWxlY3RvckFsbCgnLnByZWRpY3RfX3RlYW0taW5jcmVhc2UsIC5wcmVkaWN0X190ZWFtLWRlY3JlYXNlJylcbiAgICAgICAgICAgIC5mb3JFYWNoKGJ0biA9PiB7XG4gICAgICAgICAgICAgICAgc2NvcmVJbml0KGJ0bik7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBhY3RpdmVUYWJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5nb2FsQ29udFwiKVxuICAgICAgICAvLyBjb25zdCBhY3RpdmVJbnB1dCA9IGFjdGl2ZVRhYi5xdWVyeVNlbGVjdG9yKFwiLnByZWRpY3RfX3JhZGlvLWl0ZW0gaW5wdXRcIilcblxuXG5cbiAgICAgICAgbGV0IHJlcSA9IHtcbiAgICAgICAgICAgIG1hdGNoTnVtYmVyOiBiZXQubWF0Y2hOdW1iZXIsXG4gICAgICAgICAgICB1c2VyaWQ6IGJldC51c2VyaWQsXG4gICAgICAgIH07XG5cblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhhY3RpdmVUYWJzKVxuICAgICAgICBmb3IgKGNvbnN0IHRhYiBvZiBhY3RpdmVUYWJzKSB7XG4gICAgICAgICAgICBpZiAodGFiLmNsYXNzTGlzdC5jb250YWlucyhcImFjdGl2ZVwiKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFjdGl2ZUlucHV0ID0gdGFiLnF1ZXJ5U2VsZWN0b3IoXCIucHJlZGljdF9fcmFkaW8taXRlbS5fYWN0aXZlIGlucHV0XCIpO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRhYilcblxuICAgICAgICAgICAgICAgIGlmIChhY3RpdmVJbnB1dCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhhY3RpdmVJbnB1dClcbiAgICAgICAgICAgICAgICAgICAgcmVxLmZpcnN0R29hbCA9IGFjdGl2ZUlucHV0LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG5cbiAgICAgICAgaWYgKGJldC5maXJzdEdvYWxVcGRhdGVkKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhiZXQuZmlyc3RHb2FsKVxuICAgICAgICAgICAgcmVxLmZpcnN0R29hbCA9IGJldC5maXJzdEdvYWw7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChiZXQuZ29hbHNVcGRhdGVkKSB7XG4gICAgICAgICAgICByZXEudGVhbTEgPSBiZXQudGVhbTE7XG4gICAgICAgICAgICByZXEudGVhbTIgPSBiZXQudGVhbTI7XG4gICAgICAgIH1cblxuXG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coYWN0aXZlSW5wdXQpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhhY3RpdmVUYWIpXG5cblxuICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwiY3VycmVudEJldFwiLCBKU09OLnN0cmluZ2lmeShyZXEpKVxuXG4gICAgICAgIGNvbnNvbGUubG9nKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJjdXJyZW50QmV0XCIpKVxuXG4gICAgICAgIHJlcXVlc3QoJy9iZXQnLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGJvZHk6IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJjdXJyZW50QmV0XCIpXG4gICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdCZXQgcGxhY2VkOicsIHJlcyk7XG4gICAgICAgICAgICAgICAgSW5pdFBhZ2UoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcignRXJyb3IgcGxhY2luZyBiZXQ6JywgZXJyb3IpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2FkVHJhbnNsYXRpb25zKCkge1xuICAgICAgICByZXR1cm4gZmV0Y2goYCR7YXBpVVJMfS9uZXctdHJhbnNsYXRlcy8ke2xvY2FsZX1gKS50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgICAgICAgICAgLnRoZW4oanNvbiA9PiB7XG4gICAgICAgICAgICAgICAgaTE4bkRhdGEgPSBqc29uO1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZSgpO1xuICAgICAgICAgICAgICAgIHZhciBtdXRhdGlvbk9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKG11dGF0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBtdXRhdGlvbk9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dvYWxzLW9yLXplcm9zJyksIHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlKCkge1xuICAgICAgICBjb25zdCBlbGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRyYW5zbGF0ZV0nKVxuICAgICAgICBpZih0cmFuc2xhdGVTdGF0ZSl7XG4gICAgICAgICAgICBlbGVtcy5mb3JFYWNoKGVsZW0gPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IGVsZW0uZ2V0QXR0cmlidXRlKCdkYXRhLXRyYW5zbGF0ZScpO1xuICAgICAgICAgICAgICAgIGVsZW0uaW5uZXJIVE1MID0gaTE4bkRhdGFba2V5XSB8fCAnKi0tLS1ORUVEIFRPIEJFIFRSQU5TTEFURUQtLS0tKiAgIGtleTogICcgKyBrZXk7XG4gICAgICAgICAgICAgICAgZWxlbS5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtdHJhbnNsYXRlJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidHJhbnNsYXRpb24gd29yayFcIilcbiAgICAgICAgfVxuICAgICAgICByZWZyZXNoTG9jYWxpemVkQ2xhc3MobWFpblBhZ2UpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hMb2NhbGl6ZWRDbGFzcyhlbGVtZW50KSB7XG4gICAgICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgbGFuZyBvZiBbJ3VrJywgJ2VuJ10pIHtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShsYW5nKTtcbiAgICAgICAgfVxuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQobG9jYWxlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICBpZighY3VycmVudEJldCl7XG4gICAgICAgICAgICBjdXJyZW50QmV0ID0gbmV3IEJldCh1c2VySWQsIG1hdGNoTnVtYmVyKVxuICAgICAgICB9XG4gICAgICAgIGlmICh3aW5kb3cuc3RvcmUpIHtcbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IHdpbmRvdy5zdG9yZS5nZXRTdGF0ZSgpO1xuICAgICAgICAgICAgdXNlcklkID0gc3RhdGUuYXV0aC5pc0F1dGhvcml6ZWQgJiYgc3RhdGUuYXV0aC5pZCB8fCAnJztcbiAgICAgICAgICAgIC8vIGN1cnJlbnRCZXQgPSBuZXcgQmV0KHVzZXJJZCwgbWF0Y2hOdW1iZXIpXG4gICAgICAgICAgICBJbml0UGFnZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgSW5pdFBhZ2UoKTtcbiAgICAgICAgICAgIGxldCBjID0gMDtcbiAgICAgICAgICAgIHZhciBpID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChjIDwgNTApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEhd2luZG93LmdfdXNlcl9pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcklkID0gd2luZG93LmdfdXNlcl9pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIEluaXRQYWdlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAyMDApO1xuXG4gICAgICAgIH1cbiAgICAgICAgSW5pdFBhZ2UoKVxuICAgICAgICBwbGFjZUJldEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNsaWNrXCIpXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpZihjdXJyZW50QmV0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50QmV0ID0gbmV3IEJldCh1c2VySWQsIG1hdGNoTnVtYmVyKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGxhY2VCZXQoY3VycmVudEJldCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiB1cGRhdGVTY29yZShtYXRjaE51bWJlciwgdGVhbTFHb2FscywgdGVhbTJHb2Fscykge1xuICAgICAgICBpZiAoY3VycmVudEJldCAmJiBjdXJyZW50QmV0Lm1hdGNoTnVtYmVyID09PSBtYXRjaE51bWJlcikge1xuICAgICAgICAgICAgY3VycmVudEJldC51cGRhdGVHb2Fscyh0ZWFtMUdvYWxzLCB0ZWFtMkdvYWxzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGN1cnJlbnRCZXQgPSBuZXcgQmV0KHVzZXJJZCwgbWF0Y2hOdW1iZXIsIHRlYW0xR29hbHMsIHRlYW0yR29hbHMpO1xuICAgICAgICAgICAgY3VycmVudEJldC51cGRhdGVHb2Fscyh0ZWFtMUdvYWxzLCB0ZWFtMkdvYWxzKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhjdXJyZW50QmV0KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gdXBkYXRlRmlyc3RHb2FsKG1hdGNoTnVtYmVyLCBmaXJzdEdvYWwpIHtcbiAgICAgICAgaWYgKGN1cnJlbnRCZXQgJiYgY3VycmVudEJldC5tYXRjaE51bWJlciA9PT0gbWF0Y2hOdW1iZXIpIHtcbiAgICAgICAgICAgIGN1cnJlbnRCZXQudXBkYXRlRmlyc3RHb2FsKGZpcnN0R29hbCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhjdXJyZW50QmV0KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gdXBkYXRlVG9wRm9yZWNhc3RzKG1hdGNoTnVtYmVyKSB7XG4gICAgICAgIHJlcXVlc3QoYC91c2Vycy8ke21hdGNoTnVtYmVyfWApLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhLnRvcEZvcmVjYXN0cyk7IC8vINCf0LXRgNC10LLRltGA0LrQsCDQvtGC0YDQuNC80LDQvdC40YUg0LTQsNC90LjRhVxuXG4gICAgICAgICAgICBjb25zdCBmb3JlY2FzdHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fZm9yZWNhc3RzJyk7XG4gICAgICAgICAgICBmb3JlY2FzdHNDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG5cblxuICAgICAgICAgICAgZGF0YS50b3BGb3JlY2FzdHMuZm9yRWFjaChmb3JlY2FzdCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZm9yZWNhc3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgZm9yZWNhc3RJdGVtLmNsYXNzTGlzdC5hZGQoJ3ByZWRpY3RfX2ZvcmVjYXN0cy1pdGVtJyk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBwZXJjZW50YWdlID0gcGFyc2VGbG9hdChmb3JlY2FzdC5wZXJjZW50YWdlKS50b0ZpeGVkKDEpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHBlcmNlbnRhZ2VTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgICAgIHBlcmNlbnRhZ2VTcGFuLnRleHRDb250ZW50ID0gYCR7cGVyY2VudGFnZX0lYDtcblxuXG4gICAgICAgICAgICAgICAgY29uc3QgZm9yZWNhc3RUZXh0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoYCAke2ZvcmVjYXN0LmZvcmVjYXN0ID8/IFwiMC0wXCJ9YCk7XG4gICAgICAgICAgICAgICAgZm9yZWNhc3RJdGVtLmFwcGVuZENoaWxkKHBlcmNlbnRhZ2VTcGFuKTtcbiAgICAgICAgICAgICAgICBmb3JlY2FzdEl0ZW0uYXBwZW5kQ2hpbGQoZm9yZWNhc3RUZXh0KTtcblxuICAgICAgICAgICAgICAgIGZvcmVjYXN0c0NvbnRhaW5lci5hcHBlbmRDaGlsZChmb3JlY2FzdEl0ZW0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIHRvcCBmb3JlY2FzdHM6JywgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLy8gZnVuY3Rpb24gcmVuZGVyVXNlcnMoKSB7XG4gICAgLy8gICAgIHJlcXVlc3QoYC91c2Vycy8ke2N1cnJlbnRUYWJUYWJsZX1gKVxuICAgIC8vICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgLy9cbiAgICAvLyAgICAgICAgICAgICBsZXQgdXNlcnMgPSBkYXRhLnVzZXJzXG4gICAgLy9cbiAgICAvLyAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh1c2VycylcbiAgICAvLyAgICAgICAgICAgICBjb25zdCBpc1Njb3JlVGFiQWN0aXZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX3RhYnMtc2NvcmUuYWN0aXZlJyk7XG4gICAgLy8gICAgICAgICAgICAgY29uc3QgaXNHb2FsVGFiQWN0aXZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX3RhYnMtZ29hbC5hY3RpdmUnKTtcbiAgICAvL1xuICAgIC8vICAgICAgICAgICAgIGlmKHVzZXJzLmxlbmd0aCA+PSA1MCl7XG4gICAgLy8gICAgICAgICAgICAgICAgIHNob3dUb3BGb3JlY2FzdCA9IHRydWVcbiAgICAvLyAgICAgICAgICAgICB9XG4gICAgLy8gICAgICAgICAgICAgaWYodXNlcnMubGVuZ3RoIDwgNTApe1xuICAgIC8vICAgICAgICAgICAgICAgICBzaG93VG9wRm9yZWNhc3QgPSBmYWxzZVxuICAgIC8vICAgICAgICAgICAgIH1cbiAgICAvL1xuICAgIC8vICAgICAgICAgICAgIGlmIChpc1Njb3JlVGFiQWN0aXZlICYmIHNob3dUb3BGb3JlY2FzdCkgdG9wRm9yZWNhc3QuY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIilcbiAgICAvLyAgICAgICAgICAgICBpZiAoaXNHb2FsVGFiQWN0aXZlKSB0b3BGb3JlY2FzdC5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKVxuICAgIC8vXG4gICAgLy9cbiAgICAvLyAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0eXBlb2YgdXNlcklkKVxuICAgIC8vXG4gICAgLy8gICAgICAgICAgICAgcG9wdWxhdGVVc2Vyc1RhYmxlKHVzZXJzLCB1c2VySWQsIGN1cnJlbnRUYWJUYWJsZSlcbiAgICAvL1xuICAgIC8vICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHVzZXJzKVxuICAgIC8vICAgICAgICAgfSk7XG4gICAgLy9cbiAgICAvLyB9XG4gICAgLy8gZnVuY3Rpb24gcG9wdWxhdGVVc2Vyc1RhYmxlKHVzZXJzLCBjdXJyZW50VXNlcklkLCBtYXRjaE51bWJlcikge1xuICAgIC8vICAgICByZXN1bHRzVGFibGUuaW5uZXJIVE1MID0gJyc7XG4gICAgLy8gICAgIHJlc3VsdHNUYWJsZU90aGVyLmlubmVySFRNTCA9ICcnO1xuICAgIC8vXG4gICAgLy8gICAgIGlmICghdXNlcnMgfHwgIXVzZXJzLmxlbmd0aCkgcmV0dXJuO1xuICAgIC8vXG4gICAgLy8gICAgIC8vIC8vINCk0ZbQu9GM0YLRgNGD0ZTQvNC+INC60L7RgNC40YHRgtGD0LLQsNGH0ZbQsiwg0Y/QutGWINC30YDQvtCx0LjQu9C4INGB0YLQsNCy0LrRgyDQvdCwINCy0LrQsNC30LDQvdC40Lkg0LzQsNGC0YdcbiAgICAvLyAgICAgLy8gY29uc3QgdXNlcnMgPSB1c2Vycy5maWx0ZXIodXNlciA9PlxuICAgIC8vICAgICAvLyAgICAgdXNlci5iZXRzLnNvbWUoYmV0ID0+IGJldC5tYXRjaE51bWJlciA9PT0gbWF0Y2hOdW1iZXIpXG4gICAgLy8gICAgIC8vICk7XG4gICAgLy9cbiAgICAvLyAgICAgLy8gaWYgKCF1c2Vycy5sZW5ndGgpIHJldHVybjtcbiAgICAvL1xuICAgIC8vICAgICAvLyDQl9C90LDRhdC+0LTQuNC80L4g0L/QvtGC0L7Rh9C90L7Qs9C+INC60L7RgNC40YHRgtGD0LLQsNGH0LBcbiAgICAvLyAgICAgY29uc3QgY3VycmVudFVzZXIgPSB1c2Vycy5maW5kKHVzZXIgPT4gdXNlci51c2VyaWQgPT09IGN1cnJlbnRVc2VySWQpO1xuICAgIC8vXG4gICAgLy8gICAgIC8vINCS0LjQstC+0LTQuNC80L4g0LLRgdGW0YUg0ZbQvdGI0LjRhSDQutC+0YDQuNGB0YLRg9Cy0LDRh9GW0LIg0YMgcmVzdWx0c1RhYmxlXG4gICAgLy8gICAgIHVzZXJzLmZvckVhY2godXNlciA9PiB7XG4gICAgLy8gICAgICAgICBpZiAodXNlci51c2VyaWQgIT09IGN1cnJlbnRVc2VySWQpIHtcbiAgICAvLyAgICAgICAgICAgICBkaXNwbGF5VXNlcih1c2VyLCBmYWxzZSwgcmVzdWx0c1RhYmxlLCB1c2VycywgbWF0Y2hOdW1iZXIpO1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9KTtcbiAgICAvL1xuICAgIC8vICAgICAvLyDQktC40LLQvtC00LjQvNC+INC/0L7RgtC+0YfQvdC+0LPQviDQutC+0YDQuNGB0YLRg9Cy0LDRh9CwINCyIHJlc3VsdHNUYWJsZU90aGVyXG4gICAgLy8gICAgIGlmIChjdXJyZW50VXNlcikge1xuICAgIC8vICAgICAgICAgZGlzcGxheVVzZXIoY3VycmVudFVzZXIsIHRydWUsIHJlc3VsdHNUYWJsZU90aGVyLCB1c2VycywgbWF0Y2hOdW1iZXIpO1xuICAgIC8vICAgICB9XG4gICAgLy8gfVxuICAgIC8vIGZ1bmN0aW9uIGRpc3BsYXlVc2VyKHVzZXIsIGlzQ3VycmVudFVzZXIsIHRhYmxlLCBhbGxVc2VycywgbWF0Y2hOdW1iZXIpIHtcbiAgICAvLyAgICAgbGV0IG1hdGNoRGF0ZTtcbiAgICAvL1xuICAgIC8vICAgICBpZiAobWF0Y2hOdW1iZXIgPT09IDEpIHtcbiAgICAvLyAgICAgICAgIG1hdGNoRGF0ZSA9IEZJUlNUX01BVENIX0RBVEU7XG4gICAgLy8gICAgIH1cbiAgICAvL1xuICAgIC8vICAgICBjb25zdCBhZGRpdGlvbmFsVXNlclJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIC8vICAgICBhZGRpdGlvbmFsVXNlclJvdy5jbGFzc0xpc3QuYWRkKCd0YWJsZV9fcm93Jyk7XG4gICAgLy9cbiAgICAvLyAgICAgYWRkaXRpb25hbFVzZXJSb3cuaW5uZXJIVE1MID0gYFxuICAgIC8vICAgICA8ZGl2IGNsYXNzPVwidGFibGVfX3Jvdy1pdGVtXCI+JHtpc0N1cnJlbnRVc2VyID8gdXNlci51c2VyaWQgOiBtYXNrVXNlcklkKHVzZXIudXNlcmlkKX08L2Rpdj5cbiAgICAvLyAgICAgPGRpdiBjbGFzcz1cInRhYmxlX19yb3ctaXRlbVwiPlxuICAgIC8vICAgICAgICAgJHtjdXJyZW50RGF0ZSA+PSBtYXRjaERhdGUgP1xuICAgIC8vICAgICAgICAgYDxzcGFuPiR7dXNlci50ZWFtMSAhPT0gdW5kZWZpbmVkICYmIHVzZXIudGVhbTEgIT09IG51bGwgPyB1c2VyLnRlYW0xIDogXCItXCJ9PC9zcGFuPjxpbWcgc3JjPVwiaHR0cHM6Ly9mYXYtcHJvbS5jb20vaHRtbC9nb2Fscy1vci16ZXJvZXMvaW1nL3ZzLnBuZ1wiIGFsdD1cInZzXCI+PHNwYW4+JHt1c2VyLnRlYW0yICE9PSB1bmRlZmluZWQgJiYgdXNlci50ZWFtMiAhPT0gbnVsbCA/IHVzZXIudGVhbTIgOiBcIi1cIn08L3NwYW4+YCA6XG4gICAgLy8gICAgICAgICBgPHNwYW4+Kio8L3NwYW4+PGltZyBzcmM9XCJodHRwczovL2Zhdi1wcm9tLmNvbS9odG1sL2dvYWxzLW9yLXplcm9lcy9pbWcvdnMucG5nXCIgYWx0PVwidnNcIj48c3Bhbj4qKjwvc3Bhbj5gXG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgPC9kaXY+XG4gICAgLy9cbiAgICAvLyAgICAgJHt1c2VyLndpbm5lciA9PT0gdHJ1ZSAgP1xuICAgIC8vICAgICAgICAgYDxkaXYgY2xhc3M9XCJ0YWJsZV9fcm93LWl0ZW1cIiBkYXRhLXRyYW5zbGF0ZT1cInByaXplXCI+KioqKio8L2Rpdj5gIDpcbiAgICAvLyAgICAgICAgIGA8ZGl2IGNsYXNzPVwidGFibGVfX3Jvdy1pdGVtXCIgZGF0YS10cmFuc2xhdGU9XCJub1dpbm5lcnNcIj4qKioqKjwvZGl2PmBcbiAgICAvLyAgICAgfVxuICAgIC8vXG4gICAgLy8gICAgICR7dXNlci5ib251c0ZpcnN0R29hbCA9PT0gdHJ1ZSAgP1xuICAgIC8vICAgICAgICAgYDxkaXYgY2xhc3M9XCJ0YWJsZV9fcm93LWl0ZW1cIiBkYXRhLXRyYW5zbGF0ZT1cInNzNTAwXCI+KioqKio8L2Rpdj5gIDpcbiAgICAvLyAgICAgICAgIGA8ZGl2IGNsYXNzPVwidGFibGVfX3Jvdy1pdGVtXCIgZGF0YS10cmFuc2xhdGU9XCJub1dpbm5lcnNcIj4qKioqKjwvZGl2PmBcbiAgICAvLyAgICAgfVxuICAgIC8vIGA7XG4gICAgLy9cbiAgICAvLyAgICAgaWYgKGlzQ3VycmVudFVzZXIpIHtcbiAgICAvLyAgICAgICAgIGFkZGl0aW9uYWxVc2VyUm93LmNsYXNzTGlzdC5hZGQoXCJ5b3VcIik7XG4gICAgLy8gICAgICAgICBhZGRpdGlvbmFsVXNlclJvdy5pbm5lckhUTUwgPSBgXG4gICAgLy8gICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVfX3Jvdy1pdGVtXCI+JHtpc0N1cnJlbnRVc2VyID8gdXNlci51c2VyaWQgOiBtYXNrVXNlcklkKHVzZXIudXNlcmlkKX08L2Rpdj5cbiAgICAvLyAgICAgICAgIDxkaXYgY2xhc3M9XCJ0YWJsZV9fcm93LWl0ZW1cIj5cbiAgICAvLyAgICAgICAgICAgICA8c3Bhbj4ke3VzZXIudGVhbTEgIT09IHVuZGVmaW5lZCAmJiB1c2VyLnRlYW0xICE9PSBudWxsID8gdXNlci50ZWFtMSA6IFwiLVwifTwvc3Bhbj48aW1nIHNyYz1cImh0dHBzOi8vZmF2LXByb20uY29tL2h0bWwvZ29hbHMtb3ItemVyb2VzL2ltZy92cy5wbmdcIiBhbHQ9XCJ2c1wiPjxzcGFuPiR7dXNlci50ZWFtMiAhPT0gdW5kZWZpbmVkICYmIHVzZXIudGVhbTIgIT09IG51bGwgPyB1c2VyLnRlYW0yIDogXCItXCJ9PC9zcGFuPlxuICAgIC8vICAgICAgICAgPC9kaXY+XG4gICAgLy8gICAgICAgICAke3VzZXIud2lubmVyID09PSB0cnVlICA/XG4gICAgLy8gICAgICAgICAgICAgYDxkaXYgY2xhc3M9XCJ0YWJsZV9fcm93LWl0ZW1cIiBkYXRhLXRyYW5zbGF0ZT1cInByaXplXCI+KioqKio8L2Rpdj5gIDpcbiAgICAvLyAgICAgICAgICAgICBgPGRpdiBjbGFzcz1cInRhYmxlX19yb3ctaXRlbVwiIGRhdGEtdHJhbnNsYXRlPVwibm9XaW5uZXJzXCI+KioqKio8L2Rpdj5gXG4gICAgLy8gICAgICAgICB9XG4gICAgLy9cbiAgICAvLyAgICAgICAgICR7dXNlci5ib251c0ZpcnN0R29hbCA9PT0gdHJ1ZSAgP1xuICAgIC8vICAgICAgICAgICAgIGA8ZGl2IGNsYXNzPVwidGFibGVfX3Jvdy1pdGVtXCIgZGF0YS10cmFuc2xhdGU9XCJzczUwMFwiPioqKioqPC9kaXY+YCA6XG4gICAgLy8gICAgICAgICAgICAgYDxkaXYgY2xhc3M9XCJ0YWJsZV9fcm93LWl0ZW1cIiBkYXRhLXRyYW5zbGF0ZT1cIm5vV2lubmVyc1wiPioqKioqPC9kaXY+YFxuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICBgO1xuICAgIC8vICAgICAgICAgY29uc3QgeW91QmxvY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAvLyAgICAgICAgIHlvdUJsb2NrLmNsYXNzTGlzdC5hZGQoJ3RhYmxlX19yb3cteW91Jyk7XG4gICAgLy8gICAgICAgICB5b3VCbG9jay5zZXRBdHRyaWJ1dGUoJ2RhdGEtdHJhbnNsYXRlJywgJ3RhYmxlWW91Jyk7XG4gICAgLy8gICAgICAgICAvLyB5b3VCbG9jay50ZXh0Q29udGVudCA9IFwiWW91XCI7XG4gICAgLy8gICAgICAgICBhZGRpdGlvbmFsVXNlclJvdy5pbnNlcnRCZWZvcmUoeW91QmxvY2ssIGFkZGl0aW9uYWxVc2VyUm93LmNoaWxkcmVuWzFdKTtcbiAgICAvLyAgICAgfVxuICAgIC8vXG4gICAgLy8gICAgIHRhYmxlLmFwcGVuZChhZGRpdGlvbmFsVXNlclJvdyk7XG4gICAgLy8gfVxuICAgIC8vIGZ1bmN0aW9uIG1hc2tVc2VySWQodXNlcklkKSB7XG4gICAgLy8gICAgIHJldHVybiBcIioqXCIgKyB1c2VySWQudG9TdHJpbmcoKS5zbGljZSgyKTtcbiAgICAvLyB9XG5cbiAgICAvLyAzRCBhbmltXG4gICAgY29uc3QgY2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRlYW0sIC5hbmltQ2FyZCwgLmFuaW1SaWdodFwiKTsgLy8g0JTQvtCx0LDQstC70Y/QtdC8IC5hbmltUmlnaHRcbiAgICBsZXQgYW5nbGUgPSAwO1xuXG4gICAgZnVuY3Rpb24gYW5pbWF0ZUNhcmRzKCkge1xuICAgICAgICBhbmdsZSArPSAwLjk7IC8vIHNwZWVkXG4gICAgICAgIGNvbnN0IHJvdGF0ZVggPSBNYXRoLnNpbihhbmdsZSAqIChNYXRoLlBJIC8gMTgwKSkgKiAxMDsgLy8g0JrQvtC70LXQsdCw0L3QuNC1INC/0L4gWFxuICAgICAgICBjb25zdCByb3RhdGVZID0gTWF0aC5jb3MoYW5nbGUgKiAoTWF0aC5QSSAvIDE4MCkpICogMTA7IC8vINCa0L7Qu9C10LHQsNC90LjQtSDQv9C+IFlcblxuICAgICAgICBjYXJkcy5mb3JFYWNoKGNhcmQgPT4ge1xuICAgICAgICAgICAgaWYgKGNhcmQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYW5pbVJpZ2h0XCIpKSB7XG4gICAgICAgICAgICAgICAgY2FyZC5zdHlsZS50cmFuc2Zvcm0gPSBgcm90YXRlWSgkey1yb3RhdGVZfWRlZykgcm90YXRlWCgkey1yb3RhdGVYfWRlZylgO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYXJkLnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGVZKCR7cm90YXRlWX1kZWcpIHJvdGF0ZVgoJHtyb3RhdGVYfWRlZylgO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZUNhcmRzKTtcbiAgICB9XG4gICAgYW5pbWF0ZUNhcmRzKCk7XG5cbiAgICAvLyBwcmVkaWN0IHRhYnNcbiAgICBjb25zdCB0YWJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByZWRpY3RfX3RhYnMtZ2xvYmFsID4gZGl2LCAucHJlZGljdF9fdGFicy1kYXRlcyA+IGRpdicpO1xuICAgIGNvbnN0IGNvbnRhaW5lcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJlZGljdF9fY29udGFpbmVyJyk7XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVUYWJDbGljayhldmVudCkge1xuICAgICAgICBsZXQgbWF0Y2hEYXRlO1xuICAgICAgICBsZXQgY3VycmVudE1hdGNoID0gMVxuXG4gICAgICAgIGNvbnN0IGNsaWNrZWRUYWIgPSBldmVudC50YXJnZXQuY2xvc2VzdChcIi5wcmVkaWN0X190YWJzLWRhdGVcIikgfHwgZXZlbnQudGFyZ2V0LmNsb3Nlc3QoXCIucHJlZGljdF9fdGFicy1nb2FsXCIpIHx8IGV2ZW50LnRhcmdldC5jbG9zZXN0KFwiLnByZWRpY3RfX3RhYnMtc2NvcmVcIik7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNsaWNrZWRUYWIpXG4gICAgICAgIGNvbnN0IHRhYlBhaXIgPSBjbGlja2VkVGFiLmNsb3Nlc3QoJy5wcmVkaWN0X190YWJzLWdsb2JhbCcpIHx8IGNsaWNrZWRUYWIuY2xvc2VzdCgnLnByZWRpY3RfX3RhYnMtZGF0ZXMnKTtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhjbGlja2VkVGFiKVxuXG4gICAgICAgIGlmKGN1cnJlbnRNYXRjaCA9PT0gMSl7XG4gICAgICAgICAgICBtYXRjaERhdGUgPSBGSVJTVF9NQVRDSF9EQVRFXG4gICAgICAgIH1cbiAgICAgICAgaWYoY3VycmVudERhdGUgPiBtYXRjaERhdGUpe1xuICAgICAgICAgICAgcGxhY2VCZXRCdG4uY2xhc3NMaXN0LmFkZChcIl9sb2NrXCIpXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcGxhY2VCZXRCdG4uY2xhc3NMaXN0LnJlbW92ZShcIl9sb2NrXCIpXG4gICAgICAgIH1cblxuXG4gICAgICAgIGlmIChjbGlja2VkVGFiLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHJldHVybjtcbiAgICAgICAgaWYgKHRhYlBhaXIpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhaXIgPSB0YWJQYWlyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5hY3RpdmUnKTtcbiAgICAgICAgICAgIGlmIChwYWlyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBwYWlyWzBdLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY2xpY2tlZFRhYi5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgdXBkYXRlQ29udGFpbmVycygpO1xuICAgICAgICAvLyByZWZyZXNoQmV0SW5mbyh1c2VySWQpXG4gICAgICAgIGlmKGNsaWNrZWRUYWIuY2xvc2VzdCgnLnByZWRpY3RfX3RhYnMtc2NvcmUnKSl7XG4gICAgICAgICAgICB1cGRhdGVUb3BGb3JlY2FzdHMoY3VycmVudE1hdGNoKVxuICAgICAgICAgICAgY3VycmVudEJldCA9IG5ldyBCZXQodXNlcklkLCBjdXJyZW50TWF0Y2gpXG4gICAgICAgICAgICBtYXRjaE51bWJlciA9IDFcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJlZGljdF9fdGVhbS1udW1iZXJcIikuZm9yRWFjaCgoc2NvcmUsIGkpID0+e1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG1hdGNoRGF0ZSwgbWF0Y2hOdW1iZXIpXG4gICAgICAgICAgICAgICAgaWYoY3VycmVudERhdGUgPiBtYXRjaERhdGUgJiYgaSA9PT0gMSAmJiBtYXRjaE51bWJlciA9PT0gMSl7XG4gICAgICAgICAgICAgICAgICAgIHNjb3JlLnRleHRDb250ZW50ID0gXCIwXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZihjdXJyZW50RGF0ZSA+IG1hdGNoRGF0ZSAmJiBpID09PSAwICYmIG1hdGNoTnVtYmVyID09PSAxKXtcbiAgICAgICAgICAgICAgICAgICAgc2NvcmUudGV4dENvbnRlbnQgPSBcIjBcIlxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W3R5cGU9XCJyYWRpb1wiXTpjaGVja2VkJykuZm9yRWFjaChidXR0b24gPT4ge1xuICAgICAgICAgICAgICAgIGJ1dHRvbi5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG4gICAgICAgIGxvY2tNYXRjaENvbnRhaW5lcihGSVJTVF9NQVRDSF9EQVRFLCAxKTsgLy8g0JTQu9GPINC/0LXRgNGI0L7Qs9C+INC80LDRgtGH0YNcbiAgICB9XG5cbiAgICB0YWJzLmZvckVhY2godGFiID0+IHRhYi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZVRhYkNsaWNrKSk7XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVDb250YWluZXJzKCkge1xuICAgICAgICBjb250YWluZXJzLmZvckVhY2goY29udGFpbmVyID0+IGNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XG4gICAgICAgIHJlZnJlc2hCZXRJbmZvKHVzZXJJZClcbiAgICAgICAgY29uc3QgaXNTY29yZVRhYkFjdGl2ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X190YWJzLXNjb3JlLmFjdGl2ZScpO1xuICAgICAgICBjb25zdCBpc0dvYWxUYWJBY3RpdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fdGFicy1nb2FsLmFjdGl2ZScpO1xuICAgICAgICBpZiAoaXNTY29yZVRhYkFjdGl2ZSkge1xuICAgICAgICAgICAgaWYoc2hvd1RvcEZvcmVjYXN0KSB0b3BGb3JlY2FzdC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVwiKVxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX2NvbnRhaW5lci5zY29yZS0xJykuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNHb2FsVGFiQWN0aXZlKSB7XG4gICAgICAgICAgICBpZihzaG93VG9wRm9yZWNhc3QpIHRvcEZvcmVjYXN0LmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlZGljdF9fY29udGFpbmVyLmdvYWwtMScpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy9zY29yZVxuXG4gICAgZnVuY3Rpb24gc2NvcmVJbml0KGJ0bil7XG4gICAgICAgIGNvbnN0IHRlYW1Db250cm9sID0gYnRuLmNsb3Nlc3QoJy5wcmVkaWN0X190ZWFtLWNvbnRyb2wnKTtcbiAgICAgICAgY29uc3QgdGVhbU51bWJlciA9IHRlYW1Db250cm9sLnF1ZXJ5U2VsZWN0b3IoJy5wcmVkaWN0X190ZWFtLW51bWJlcicpXG4gICAgICAgIGNvbnN0IG1hdGNoQ29udGFpbmVyID0gYnRuLmNsb3Nlc3QoJy5wcmVkaWN0X19jb250YWluZXInKTtcbiAgICAgICAgY29uc3QgbWF0Y2hOdW1iZXIgPSBwYXJzZUludChtYXRjaENvbnRhaW5lci5kYXRhc2V0Lm1hdGNoTnVtYmVyKTtcblxuICAgICAgICBjb25zdCBnZXRHb2FscyA9ICh0ZWFtKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gbWF0Y2hDb250YWluZXIucXVlcnlTZWxlY3RvcihgW2RhdGEtdGVhbT1cIiR7dGVhbX1cIl0gLnByZWRpY3RfX3RlYW0tbnVtYmVyYCk7XG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudCA/IE51bWJlcihlbGVtZW50LnRleHRDb250ZW50KSB8fCAwIDogMDtcbiAgICAgICAgfTtcblxuXG4gICAgICAgIGNvbnN0IHRlYW0xR29hbHMgPSBnZXRHb2FscygndGVhbTEnKSA7XG4gICAgICAgIGNvbnN0IHRlYW0yR29hbHMgPSBnZXRHb2FscygndGVhbTInKTtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0ZWFtMUdvYWxzLCB0ZWFtMkdvYWxzKVxuXG4gICAgICAgIHVwZGF0ZVNjb3JlKG1hdGNoTnVtYmVyLCB0ZWFtMUdvYWxzLCB0ZWFtMkdvYWxzKTtcbiAgICB9XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJlZGljdF9fdGVhbS1pbmNyZWFzZSwgLnByZWRpY3RfX3RlYW0tZGVjcmVhc2UnKS5mb3JFYWNoKGJ0biA9PiB7XG4gICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57XG4gICAgICAgICAgICBjb25zdCB0ZWFtQ29udHJvbCA9IGJ0bi5jbG9zZXN0KCcucHJlZGljdF9fdGVhbS1jb250cm9sJyk7XG4gICAgICAgICAgICBjb25zdCB0ZWFtTnVtYmVyID0gdGVhbUNvbnRyb2wucXVlcnlTZWxlY3RvcignLnByZWRpY3RfX3RlYW0tbnVtYmVyJylcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoQ29udGFpbmVyID0gYnRuLmNsb3Nlc3QoJy5wcmVkaWN0X19jb250YWluZXInKTtcblxuICAgICAgICAgICAgbGV0IHZhbHVlID0gcGFyc2VJbnQodGVhbU51bWJlci50ZXh0Q29udGVudCk7XG4gICAgICAgICAgICBpZiAoYnRuLmNsYXNzTGlzdC5jb250YWlucygncHJlZGljdF9fdGVhbS1pbmNyZWFzZScpKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgKz0gMTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPiAwKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgLT0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRlYW1OdW1iZXIudGV4dENvbnRlbnQgPSBgJHt2YWx1ZX1gO1xuICAgICAgICAgICAgc2NvcmVJbml0KGJ0bilcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGJldClcbiAgICAgICAgfSlcbiAgICB9KTtcblxuICAgIC8vdGFibGUgdGFic1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJsZV9fdGFicy1kYXRlJykuZm9yRWFjaCh0YWIgPT4ge1xuICAgICAgICB0YWIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFibGVfX3RhYnMtZGF0ZScpLmZvckVhY2godGFiID0+IHRhYi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgY3VycmVudFRhYlRhYmxlID0gTnVtYmVyKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFibGVfX3RhYnMtZGF0ZS5hY3RpdmVcIikuZ2V0QXR0cmlidXRlKFwiZGF0YS1tYXRjaC1udW1iZXJcIikpXG4gICAgICAgICAgICByZW5kZXJVc2VycygpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuXG4gICAgLy9wb3B1cHNcblxuICAgIGZ1bmN0aW9uIHNldFBvcHVwcyh0cmlnZ2VyQnV0dG9ucywgcG9wdXBDbGFzcykge1xuICAgICAgICBjb25zdCBwb3B1cHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXBzJyk7XG4gICAgICAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnBvcHVwc19faXRlbS4ke3BvcHVwQ2xhc3N9YCk7XG4gICAgICAgIGNvbnN0IHBvcHVwQnRuID0gcG9wdXBzQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBzX19pdGVtLWJ0blwiKVxuXG5cbiAgICAgICAgaWYgKCF0cmlnZ2VyQnV0dG9ucyB8fCAhcG9wdXAgfHwgIXBvcHVwc0NvbnRhaW5lcikgcmV0dXJuO1xuXG4gICAgICAgIHRyaWdnZXJCdXR0b25zLmZvckVhY2godHJpZ2dlckJ1dHRvbiA9PiB7XG4gICAgICAgICAgICB0cmlnZ2VyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHBvcHVwc0NvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdfb3BhY2l0eScpO1xuICAgICAgICAgICAgICAgIHBvcHVwc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKHBvcHVwQ2xhc3MpO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBjbG9zZUJ1dHRvbiA9IHBvcHVwLnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cHNfX2l0ZW0tY2xvc2UnKTtcbiAgICAgICAgY29uc3QgYnRuQ2xvc2UgPSBwb3B1cC5xdWVyeVNlbGVjdG9yKCcuYnRuLWNsb3NlJyk7XG5cbiAgICAgICAgcG9wdXBzQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGUudGFyZ2V0ID09PSBwb3B1cHNDb250YWluZXIgfHwgZS50YXJnZXQgPT09IGNsb3NlQnV0dG9uIHx8IGUudGFyZ2V0ID09PSBidG5DbG9zZSkge1xuICAgICAgICAgICAgICAgIGNsb3NlUG9wdXAoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZnVuY3Rpb24gY2xvc2VQb3B1cCgpIHtcbiAgICAgICAgICAgIHBvcHVwc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdfb3BhY2l0eScpO1xuICAgICAgICAgICAgcG9wdXBzQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUocG9wdXBDbGFzcyk7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJyc7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5sb2cocG9wdXBCdG4pXG4gICAgICAgIHBvcHVwQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT57XG4gICAgICAgICAgICBjbG9zZVBvcHVwKClcbiAgICAgICAgfSlcblxuICAgIH1cblxuICAgIHNldFBvcHVwcyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ2lkZV9fbGlzdC1idG4nKSwgJ2dpZGVQb3B1cCcpO1xuICAgIHNldFBvcHVwcyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJlZGljdF9fYnRuLnRvb2stcGFydCcpLCAnX2NvbmZpcm1Qb3B1cCcpO1xuXG4gICAgLy9nbyB0byBwcmVkaWN0XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b1ByZWRpY3RcIikuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IHRhcmdldEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByZWRpY3RcIik7XG4gICAgICAgIGNvbnN0IHRhcmdldFBvc2l0aW9uID0gdGFyZ2V0RWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyB3aW5kb3cucGFnZVlPZmZzZXQgLSAyO1xuXG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7XG4gICAgICAgICAgICB0b3A6IHRhcmdldFBvc2l0aW9uLFxuICAgICAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnLFxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHJhZGlvQ29udGFpbmVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcmVkaWN0X19yYWRpbycpO1xuXG4gICAgcmFkaW9Db250YWluZXJzLmZvckVhY2goY29udGFpbmVyID0+IHtcbiAgICAgICAgY29uc3QgcmFkaW9JbnB1dHMgPSBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnLnByZWRpY3RfX3JhZGlvLWl0ZW0nKTtcblxuICAgICAgICByYWRpb0lucHV0cy5mb3JFYWNoKChyYWRpbykgPT4ge1xuICAgICAgICAgICAgcmFkaW8uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmFkaW9JbnB1dHMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnX2FjdGl2ZScpKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ19hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFwiKS52YWx1ZSlcblxuICAgICAgICAgICAgICAgIHVwZGF0ZUZpcnN0R29hbChtYXRjaE51bWJlciwgdGhpcy5xdWVyeVNlbGVjdG9yKFwiaW5wdXRcIikudmFsdWUpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgbG9hZFRyYW5zbGF0aW9ucygpXG4gICAgICAgIC50aGVuKGluaXQpXG5cbiAgICAvLyBURVNUXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRhcmstYnRuJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgnZGFyaycpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgbG5nQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5sbmctYnRuXCIpXG5cbiAgICBsbmdCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJsb2NhbGVcIikpIHtcbiAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oXCJsb2NhbGVcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwibG9jYWxlXCIsIFwiZW5cIik7XG4gICAgICAgIH1cbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgYXV0aEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYXV0aC1idG5cIilcblxuICAgIGF1dGhCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+e1xuICAgICAgICBpZih1c2VySWQpe1xuICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShcInVzZXJJZFwiKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJ1c2VySWRcIiwgXCIxODkwODQ2NVwiKVxuICAgICAgICB9XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKVxuICAgIH0pO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJ0bi1sYXN0UHJlZCcpLmZvckVhY2goYnV0dG9uID0+IHtcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJlZGljdF9fbGFzdCcpLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKCdoaWRlJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBzZXRQb3B1cHMoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJ0bi10aGVua3MnKSwgJ19jb25maXJtUG9wdXAnKTtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5idG4tcHJlZGljdCcpLmZvckVhY2goYnV0dG9uID0+IHtcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnVuY29uZmlybWVkJykuZm9yRWFjaCh1bmNvbmZpcm1lZCA9PiB7XG4gICAgICAgICAgICAgICAgdW5jb25maXJtZWQuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbmZpcm1lZCcpLmZvckVhY2goY29uZmlybWVkID0+IHtcbiAgICAgICAgICAgICAgICBjb25maXJtZWQuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWVudS1idG5cIik/LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1lbnUtdGVzdFwiKT8uY2xhc3NMaXN0LnRvZ2dsZShcImhpZGVcIik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG4tYWZ0ZXJcIik/LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ29hbC0xXCIpPy5jbGFzc0xpc3QudG9nZ2xlKFwiX2xvY2tcIilcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zY29yZS0xXCIpPy5jbGFzc0xpc3QudG9nZ2xlKFwiX2xvY2tcIilcbiAgICAgICAgY29uc29sZS5sb2coXCJsb2NrIHRhYmxlXCIpXG4gICAgfSk7XG5cbn0pKClcblxuIl19
