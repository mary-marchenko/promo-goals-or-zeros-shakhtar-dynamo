
(function () {
    // if (window.promoInit) {
    //     window.promoInit = false
    //     return;
    // }
    // window.promoInit = true;

    window.counterClick = 1

    const apiURL = 'https://fav-prom.com/api_football_shakhtar',
        unauthMsgs = document.querySelectorAll('.unauth-msg'),
        youAreInBtns = document.querySelectorAll('.took-part'),
        mainPage = document.querySelector(".fav-page"),
        resultsTable = document.querySelector('#results-table'),
        resultsTableOther = document.querySelector('#results-table-other'),
        placeBetBtn = document.querySelector(".predict-btn"),
        lastPredict = document.querySelector(".predict__last"),
        topForecast = document.querySelector(".topForecast")

    let currentTab = 1
    let currentTabTable = 1
    let matchNumber = 1
    let showTopForecast = false

    // const FIRST_MATCH_DATE = new Date('2025-04-27T17:30:00') // дата матчу - 30хв справжня дата
    const FIRST_MATCH_DATE = new Date('2025-04-27T17:30:00') // дата матчу - 30хв
    const currentDate = new Date()

    function lockMatchContainer(matchDate, matchNumber) {
        if (new Date() > matchDate) {
            const containers = document.querySelectorAll(`.predict__container[data-match-number="${matchNumber}"]`);

            containers.forEach(container => {
                container.classList.add('_lock');
            });

            placeBetBtn.classList.add("_lock")
        }
    }

    lockMatchContainer(FIRST_MATCH_DATE, 1); // Для першого матчу

    setInterval(() => {
        const currentDate = new Date(); // Оновити поточну дату
        lockMatchContainer(FIRST_MATCH_DATE, 1);
    }, 600000); // Оновлювати кожні 10 хв

    class Bet {
        constructor(userId, matchNumber, team1Goals = 0, team2Goals = 0, firstGoal) {
            if(userId !== null) this.userid = userId;
            this.matchNumber = matchNumber;
            this.team1 = team1Goals;
            this.team2 = team2Goals;
            if(firstGoal !== undefined) this.firstGoal = firstGoal;
        }

        updateGoals(team1Goals, team2Goals) {
            if (team1Goals !== undefined) {
                this.team1 = team1Goals !== null ? team1Goals : this.team1;
            }
            if (team2Goals !== undefined) {
                this.team2 = team2Goals !== null ? team2Goals : this.team2;
            }
            this.goalsUpdated = true;
        }

        updateFirstGoal(firstGoal) {
            if (firstGoal !== undefined) {
                this.firstGoal = firstGoal !== null ? firstGoal : this.firstGoal;
            }
            this.firstGoalUpdated = true;
        }
    }

    const cache = {};
    let predictData = [];

    let translateState = true
    let debug = false

    let locale = "en"



    const ukLeng = document.querySelector('#ukLeng');
    const enLeng = document.querySelector('#enLeng');


    let i18nData = {};

    let userId;
    // userId = 100300268;

    let currentBet;

    if (ukLeng) locale = 'uk';
    if (enLeng) locale = 'en';

    const request = (link, extraOptions) =>
        fetch(apiURL + link, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            ...(extraOptions || {})
        })
            .then(res => {
                if (!res.ok) throw new Error('API error');
                return res.json();
            })
            .catch(err => {
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

    function reportError(err) {
        const reportData = {
            origin: window.location.href,
            userid: userId,
            errorText: err?.error || err?.text || err?.message || 'Unknown error',
            type: err?.name || 'UnknownError',
            stack: err?.stack || ''
        };

        fetch('https://fav-prom.com/api-cms/reports/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reportData)
        }).catch(console.warn);
    }

    const getLastBet = (bets, matchNumber) =>{
        if(!bets) return false
        return bets.find(bet => bet.matchNumber === matchNumber);
    }

    function refreshBetInfo(userId) {
        const score1 = document.querySelector(".score-1")
        const score2 = document.querySelector(".score-2")
        const goal1 = document.querySelector(".goal-1")
        const goal2 = document.querySelector(".goal-2")

        // console.log(matchNumber)

        request(`/favuser/${userId}`, {
            method: 'GET'
        }).then(data => {
            if(data.bets){
                const betAvailable = data.bets.some(bet =>{
                    return bet.matchNumber === matchNumber
                })
                // console.log(betAvailable)
                const lastTeam1 = document.querySelector(".predict__last-team.team1");
                const lastTeam2 = document.querySelector(".predict__last-team.team2");
                const scoreTeam1 = document.querySelector(".scoreTeam1");
                const scoreTeam2 = document.querySelector(".scoreTeam2");
                const firstGoal = document.querySelector(".predict__last-country");
                if(betAvailable){
                    lastPredict.classList.remove("hide")
                    const lastBet = getLastBet(data.bets, matchNumber);
                    scoreTeam1.textContent = lastBet.team1 === undefined ? "-" :`${lastBet.team1}`;
                    scoreTeam2.textContent = lastBet.team2 === undefined ? "-" :`${lastBet.team2}`;
                    // console.log(lastBet)

                    if (lastBet.betConfirmed) {
                        document.querySelectorAll(".predict__last-result.unconfirmed").forEach(item =>{
                            item.classList.remove("active");
                        })
                        document.querySelectorAll(".predict__last-result.confirmed").forEach(item =>{
                            item.classList.add("active");
                        })
                    } else {
                        document.querySelectorAll(".predict__last-result.unconfirmed").forEach(item =>{
                            item.classList.add("active");
                        })
                        document.querySelectorAll(".predict__last-result.confirmed").forEach(item =>{
                            item.classList.remove("active");
                        })
                    }

                    if (lastBet.matchNumber === 1) {
                        lastTeam1.setAttribute("data-translate", "shakhtar");
                        lastTeam2.setAttribute("data-translate", "dynamo");
                        translate();
                    }

                    if(score1.classList.contains("active")){
                        document.querySelector(".predict__last-score").classList.remove("hide")
                        document.querySelector(".predict__last-goal").classList.add("hide")
                    }

                    if(goal1.classList.contains("active")){
                        document.querySelector(".predict__last-score").classList.add("hide")
                        document.querySelector(".predict__last-goal").classList.remove("hide")
                    }

                    if(lastBet.firstGoal){
                        if(lastBet.firstGoal === "shakhtar"){
                            firstGoal.setAttribute("data-translate", "shakhtar");
                        }
                        if(lastBet.firstGoal === "dynamo"){
                            firstGoal.setAttribute("data-translate", "dynamo");
                        }
                        if(lastBet.firstGoal === "draw"){
                            firstGoal.setAttribute("data-translate", "draw");
                        }

                    }else{
                        if(goal1.classList.contains("active") || goal2.classList.contains("active")){
                            document.querySelector(".predict__last").classList.add("hide")
                        }
                    }

                }
                if(!betAvailable){
                    lastPredict.classList.add("hide")
                }
            }else{
                lastPredict.classList.add("hide")
            }
        }).catch(error => {
            console.error('Error:', error);
        });
    }
    const InitPage = () => {
        checkUserAuth();
        renderUsers();
        updateTopForecasts(currentTab)
        refreshBetInfo(userId)
    }

    let checkUserAuth = () => {
        if (userId) {
            youAreInBtns.forEach(item => item.classList.remove('hide'));
            unauthMsgs.forEach(item => item.classList.add('hide'));
        } else {
            for (let youAreInBtn of youAreInBtns) {
                youAreInBtn.classList.add('hide');
            }
            for (const unauthMes of unauthMsgs) {
                unauthMes.classList.remove('hide');
            }
        }
    }
    function placeBet(bet) {
        if (!userId) {
            return;
        }
        document.querySelector(".predict__container.active")
            .querySelectorAll('.predict__team-increase, .predict__team-decrease')
            .forEach(btn => {
                scoreInit(btn);
            });

        const activeTabs = document.querySelectorAll(".goalCont")
        // const activeInput = activeTab.querySelector(".predict__radio-item input")



        let req = {
            matchNumber: bet.matchNumber,
            userid: bet.userid,
        };


        // console.log(activeTabs)
        for (const tab of activeTabs) {
            if (tab.classList.contains("active")) {
                const activeInput = tab.querySelector(".predict__radio-item._active input");
                // console.log(tab)

                if (activeInput) {
                    // console.log(activeInput)
                    req.firstGoal = activeInput.value;
                    break;
                }
            }
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


        sessionStorage.setItem("currentBet", JSON.stringify(req))


        request('/bet', {
            method: 'POST',
            body: sessionStorage.getItem("currentBet")
        })
            .then(res => {
                // console.log('Bet placed:', res);
                InitPage();
            })
            .catch(error => console.error('Error placing bet:', error));
    }

    function loadTranslations() {
        return fetch(`${apiURL}/new-translates/${locale}`).then(res => res.json())
            .then(json => {
                i18nData = json;
                translate();
                var mutationObserver = new MutationObserver(function (mutations) {
                    translate();
                });
                mutationObserver.observe(document.getElementById('goals-or-zeros'), {
                    childList: true,
                    subtree: true,
                });
            });
    }

    function translate() {
        const elems = document.querySelectorAll('[data-translate]')
        if(translateState){
            elems.forEach(elem => {
                const key = elem.getAttribute('data-translate');
                elem.innerHTML = i18nData[key] || '*----NEED TO BE TRANSLATED----*   key:  ' + key;
                elem.removeAttribute('data-translate');
            })
        }else{
            console.log("translation works!")
        }
        refreshLocalizedClass(mainPage);
    }

    function refreshLocalizedClass(element) {
        if (!element) {
            return;
        }
        for (const lang of ['uk', 'en']) {
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
        InitPage()
        initClickTracking()
        if (window.store) {
            var state = window.store.getState();
            userId = state.auth.isAuthorized && state.auth.id || '';
            if(!currentBet){
                currentBet = new Bet(userId, matchNumber)
            }
        } else {
            let c = 0;
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
        document.querySelectorAll('.scoreCounter').forEach((teamEl, index) => {
            if (!teamEl.querySelector('.predict__team-control')) {
                const teamNumber = index + 1;
                const controlHTML = `
            <div class="predict__team-control" data-team="team${teamNumber}">
                <div class="predict__team-decrease team${teamNumber}-minus" role="button"></div>
                <div class="predict__team-number">0</div>
                <div class="predict__team-increase team${teamNumber}-plus" role="button"></div>
            </div>
        `;

                teamEl.insertAdjacentHTML('beforeend', controlHTML);
            }
        });

        document.querySelectorAll('.predict__team-increase, .predict__team-decrease').forEach(btn => {
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
        request(`/users/${matchNumber}`).then(data => {

            const forecastsContainer = document.querySelector('.predict__forecasts');
            forecastsContainer.innerHTML = '';


            data.topForecasts.forEach(forecast => {
                const forecastItem = document.createElement('div');
                forecastItem.classList.add('predict__forecasts-item');

                const percentage = parseFloat(forecast.percentage).toFixed(1);
                const percentageSpan = document.createElement('span');
                percentageSpan.textContent = `${percentage}%`;


                const forecastText = document.createTextNode(` ${forecast.forecast ?? "0-0"}`);
                forecastItem.appendChild(percentageSpan);
                forecastItem.appendChild(forecastText);

                forecastsContainer.appendChild(forecastItem);
            });
        }).catch(error => {
            console.error('Error fetching top forecasts:', error);
        });
    }
    function renderUsers() {
        request(`/users/${currentTabTable}`)
            .then(data => {

                let users = data.users

                const isScoreTabActive = document.querySelector('.predict__tabs-score.active');
                const isGoalTabActive = document.querySelector('.predict__tabs-goal.active');


                if(users.length >= 50){
                    showTopForecast = true
                }
                if(users.length < 50){
                    showTopForecast = false
                }

                if (isScoreTabActive && showTopForecast) topForecast.classList.remove("hide")
                if (isGoalTabActive) topForecast.classList.add("hide")



                populateUsersTable(users, userId, currentTabTable)

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
        const currentUser = users.find(user => user.userid === currentUserId);

        // Виводимо всіх інших користувачів у resultsTable
        users.forEach(user => {
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
        let matchDate;

        if (matchNumber === 1) {
            matchDate = FIRST_MATCH_DATE;
        }

        const additionalUserRow = document.createElement('div');
        additionalUserRow.classList.add('table__row');

        additionalUserRow.innerHTML = `
    <div class="table__row-item">${isCurrentUser ? user.userid : maskUserId(user.userid)}</div>
    <div class="table__row-item">
        ${currentDate >= matchDate ?
            `<span>${user.team1 !== undefined && user.team1 !== null ? user.team1 : "-"}</span><img src="https://fav-prom.com/html/goals-or-zeroes/img/vs.png" alt="vs"><span>${user.team2 !== undefined && user.team2 !== null ? user.team2 : "-"}</span>` :
            `<span>**</span><img src="https://fav-prom.com/html/goals-or-zeroes/img/vs.png" alt="vs"><span>**</span>`
        }
    </div>
    
            <div class="table__row-item" >*****</div>
            <div class="table__row-item" >*****</div>
`;

        if (isCurrentUser) {
            additionalUserRow.classList.add("you");
            additionalUserRow.innerHTML = `
        <div class="table__row-item">${isCurrentUser ? user.userid : maskUserId(user.userid)}</div>
        <div class="table__row-item">
            <span>${user.team1 !== undefined && user.team1 !== null ? user.team1 : "-"}</span><img src="https://fav-prom.com/html/goals-or-zeroes/img/vs.png" alt="vs"><span>${user.team2 !== undefined && user.team2 !== null ? user.team2 : "-"}</span>
        </div>
        <div class="table__row-item" >*****</div>
        <div class="table__row-item" >*****</div>
    `;
            const youBlock = document.createElement('div');
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
    const cards = document.querySelectorAll(".team, .animCard, .animRight"); // Добавляем .animRight
    let angle = 0;

    function animateCards() {
        angle += 0.9; // speed
        const rotateX = Math.sin(angle * (Math.PI / 180)) * 10; // Колебание по X
        const rotateY = Math.cos(angle * (Math.PI / 180)) * 10; // Колебание по Y

        cards.forEach(card => {
            if (card.classList.contains("animRight")) {
                card.style.transform = `rotateY(${-rotateY}deg) rotateX(${-rotateX}deg)`;
            } else {
                card.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
            }
        });

        requestAnimationFrame(animateCards);
    }
    animateCards();

    // predict tabs
    const tabs = document.querySelectorAll('.predict__tabs-global > div, .predict__tabs-dates > div');
    const containers = document.querySelectorAll('.predict__container');

    function handleTabClick(event) {
        let matchDate;
        let currentMatch = 1

        const clickedTab = event.target.closest(".predict__tabs-date") || event.target.closest(".predict__tabs-goal") || event.target.closest(".predict__tabs-score");
        const tabPair = clickedTab.closest('.predict__tabs-global') || clickedTab.closest('.predict__tabs-dates');


        if(currentMatch === 1){
            matchDate = FIRST_MATCH_DATE
        }
        if(currentDate > matchDate){
            placeBetBtn.classList.add("_lock")
        }else{
            placeBetBtn.classList.remove("_lock")
        }


        if (clickedTab.classList.contains('active')) return;
        if (tabPair) {
            const pair = tabPair.querySelectorAll('.active');
            if (pair.length > 0) {
                pair[0].classList.remove('active');
            }
        }

        clickedTab.classList.add('active');
        updateContainers();
        // refreshBetInfo(userId)
        if(clickedTab.closest('.predict__tabs-score')){
            updateTopForecasts(currentMatch)
            currentBet = new Bet(userId, currentMatch)
            matchNumber = 1
            document.querySelectorAll(".predict__team-number").forEach((score, i) =>{
                // console.log(matchDate, matchNumber)
                if(currentDate > matchDate && i === 1 && matchNumber === 1){
                    score.textContent = "0"
                }
                else if(currentDate > matchDate && i === 0 && matchNumber === 1){
                    score.textContent = "0"
                }

            })
            document.querySelectorAll('input[type="radio"]:checked').forEach(button => {
                button.checked = false;
            });

        }
        lockMatchContainer(FIRST_MATCH_DATE, 1); // Для першого матчу
    }

    tabs.forEach(tab => tab.addEventListener('click', handleTabClick));

    function updateContainers() {
        containers.forEach(container => container.classList.remove('active'));
        refreshBetInfo(userId)
        const isScoreTabActive = document.querySelector('.predict__tabs-score.active');
        const isGoalTabActive = document.querySelector('.predict__tabs-goal.active');


        if (isScoreTabActive) {
            if (showTopForecast) topForecast.classList.remove("hide")
            document.querySelector('.predict__container.score-1').classList.add('active');
            document.querySelector('.predict__tabs-txt-2').classList.add('hide');
            document.querySelector('.predict__tabs-txt-1').classList.remove('hide');
        } else if (isGoalTabActive) {
            if (showTopForecast) topForecast.classList.add("hide")
            document.querySelector('.predict__tabs-txt-1').classList.add('hide');
            document.querySelector('.predict__tabs-txt-2').classList.remove('hide');
            document.querySelector('.predict__container.goal-1').classList.add('active');
        }
    }

    //score

    function scoreInit(btn){
        const teamControl = btn.closest('.predict__team-control');
        const teamNumber = teamControl.querySelector('.predict__team-number')
        const matchContainer = btn.closest('.predict__container');
        const matchNumber = parseInt(matchContainer.dataset.matchNumber);

        const getGoals = (team) => {
            const element = matchContainer.querySelector(`[data-team="${team}"] .predict__team-number`);
            return element ? Number(element.textContent) || 0 : 0;
        };


        const team1Goals = getGoals('team1') ;
        const team2Goals = getGoals('team2');

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
        const popupsContainer = document.querySelector('.popups');
        const popup = document.querySelector(`.popups__item.${popupClass}`);
        const popupBtn = popupsContainer.querySelector(".popups__item-btn")


        if (!triggerButtons || !popup || !popupsContainer) return;

        triggerButtons.forEach(triggerButton => {
            triggerButton.addEventListener('click', () => {
                popupsContainer.classList.remove('_opacity');
                popupsContainer.classList.add(popupClass);
                document.body.style.overflow = 'hidden';
            });
        });

        const closeButton = popup.querySelector('.popups__item-close');
        const btnClose = popup.querySelector('.btn-close');

        popupsContainer.addEventListener("click", (e) => {
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
        popupBtn.addEventListener("click", (e) =>{
            closePopup()
        })

    }

    setPopups(document.querySelectorAll('.gide__list-btn'), 'gidePopup');
    setPopups(document.querySelectorAll('.predict__btn.took-part'), '_confirmPopup');

    //go to predict
    document.querySelector(".toPredict").addEventListener('click', function () {
        const targetElement = document.getElementById("predict");
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 2;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth',
        });
    });

    const radioContainers = document.querySelectorAll('.predict__radio');

    radioContainers.forEach(container => {
        const radioInputs = container.querySelectorAll('.predict__radio-item');

        radioInputs.forEach((radio) => {
            radio.addEventListener('change', function() {
                radioInputs.forEach(item => item.classList.remove('_active'));
                this.classList.add('_active');

                updateFirstGoal(matchNumber, this.querySelector("input").value)
            });
        });
    });

    let clickStats = JSON.parse(sessionStorage.getItem('clickStats')) || [];

    function clickTracking(event) {
        const clickName = event.currentTarget.getAttribute('data-click-name');
        const clickDrop = event.currentTarget.getAttribute('data-click-drop');

        if (!clickName) return;

        if (clickDrop) {
            const isAuth = !!userId;

            const existingItem = clickStats.find(
                item => item.clickedItem === clickName && item.auth === isAuth
            );

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
            const existingItem = clickStats.find(item => item.clickedItem === clickName);
            if (existingItem) {
                existingItem.counter += 1;
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
        const clickableElements = document.querySelectorAll('[data-click-name]');
        clickableElements.forEach(el => {
            el.addEventListener('click', clickTracking);
        });
    }

    function removeClickTracking() {
        const clickableElements = document.querySelectorAll('[data-click-name]');
        clickableElements.forEach(el => {
            el.removeEventListener('click', clickTracking);
        });
    }

    function sendClickStats() {
        const storedStats = JSON.parse(sessionStorage.getItem('clickStats'));

        if (!storedStats || storedStats.length === 0) return;


        // console.log(JSON.stringify( storedStats))

        fetch(`${apiURL}/click-stat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(storedStats)
        })
            .then(response => {
                if (response.ok) {
                    clickStats = [];
                    sessionStorage.removeItem('clickStats');
                    // console.log('Кліки успішно відправлено й очищено');
                } else {
                    console.error('Помилка при відправці кліків');
                }
            })
            .catch(error => {
                console.error('Помилка зʼєднання:', error);
            });
    }

    setInterval(sendClickStats, 10000);

    loadTranslations()
        .then(init)


    // Нова функція для обробки кліків на кнопки +/-
    function handleTeamControlClick(e) {
        const btn = e.target.closest('.predict__team-increase, .predict__team-decrease');
        if (!btn) return;
        if(window.counterClick > 1){
            return
        }else{
            const teamControl = btn.closest('.predict__team-control');
            const teamNumber = teamControl.querySelector('.predict__team-number');
            const matchContainer = btn.closest('.predict__container');

            let value = parseInt(teamNumber.textContent);
            if (btn.classList.contains('predict__team-increase')) {
                value += 1;
            } else if (value > 0) {
                value -= 1;
            }
            teamNumber.textContent = `${value}`;
            scoreInit(btn);
            window.counterClick += 1
            btn.style.pointerEvents = 'none'
            setTimeout(() =>{
                window.counterClick = 1
                btn.style.pointerEvents = 'initial'
            }, 200)
        }



    }



})()



