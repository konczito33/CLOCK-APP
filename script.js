(function innit() {

    const refreshBtn = document.querySelector('.quote__button')
    refreshBtn.addEventListener('click', getQuote)

    const city = document.querySelector('.main__city')
    const hour = document.querySelector('.main__hour')
    const bg = document.querySelector('.bg')
    const sun = document.querySelector('.sun')
    const moon = document.querySelector('.moon')
    const greeting = document.querySelector('.evening-morning')


    function getQuote() {
        let random = Math.floor(Math.random() * 44)
        const quoteTxt = document.querySelector('.quote__text')
        const quoteAut = document.querySelector('.quote__author')

        const config = {
            headers: {
                Accept: 'application/json'
            },
        }

        fetch('https://quotes.stormconsultancy.co.uk/quotes.json', config).then((res) => res.json().then((data) => {
            quoteTxt.textContent = data[random].quote, quoteAut.textContent = data[random].author
        }))
    }

    getQuote()

    function getLocation() {
        const config = {
            headers: {
                Accept: 'application/json'
            },
        }
        fetch('https://ip-api.com/json/', config).then((res) => res.json().then((data) => {
            city.textContent = `in ${data.city}, ${data.countryCode}`, moreInfo(data)
        }))
    }

    getLocation()

    function setTime() {
        const date = new Date
        let hours = date.getHours()
        let minutes = date.getMinutes()

        hour.textContent = `${hours}:${minutes < 10 ? `0${minutes}` : minutes}`
    }

    function changeBg() {
        const date = new Date
        let hours = date.getHours()

        if (hours > 22 || hours < 6) {
            bg.style.backgroundImage = 'url(assets/dark-img.jpeg)'
            moon.style.fontSize = '25px'
            sun.style.fontSize = '0px'
            greeting.textContent = 'evening'


        } else {
            bg.style.backgroundImage = 'url(assets/light-img.jpeg)'
            moon.style.fontSize = '0px'
            sun.style.fontSize = '25px'
            greeting.textContent = 'morning'
        }
    }

    setInterval(setTime, 1000)

    changeBg()
    setInterval(changeBg, 10000)


    const moreBtn = document.querySelector('.more-btn')

    moreBtn.addEventListener('click', () => {
        const container = document.querySelector('.container')
        const infoContainer = document.querySelector('.more-info-container ')
        container.classList.toggle('small')
        infoContainer.classList.toggle('active')
        if (container.classList.contains('small')) {
            moreBtn.textContent = 'less'
        } else {
            moreBtn.textContent = 'more'
        }
    })

    function moreInfo(data) {
        const timezone = document.getElementById('timezone')
        const dayOfWeek = document.getElementById('dayOfWeek')
        const dayOfYear = document.getElementById('dayOfYear')
        const weekNum = document.getElementById('weekNum')
        const date = new Date
        const days = ['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        const dayOfYearNum = date =>
            Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

        Date.prototype.getWeekNumber = function () {
            let d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
            let dayNum = d.getUTCDay() || 7;
            d.setUTCDate(d.getUTCDate() + 4 - dayNum);
            let yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
            return Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
        };

        timezone.textContent = data.timezone
        dayOfWeek.textContent = days[date.getDay()]
        dayOfYear.textContent = dayOfYearNum(date)
        weekNum.textContent = date.getWeekNumber()
    }


})()
