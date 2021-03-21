(function innit() {

    const refreshBtn = document.querySelector('.quote__button')
    refreshBtn.addEventListener('click', getQuote)

    const city = document.querySelector('.main__city')
    const hour = document.querySelector('.main__hour')


    function getQuote() {
        let random = Math.floor(Math.random() * 44)
        const quoteTxt = document.querySelector('.quote__text')
        const quoteAut = document.querySelector('.quote__author')

        const config = {
            headers: {
                Accept: 'application/json'
            },
        }

        fetch('http://quotes.stormconsultancy.co.uk/quotes.json', config).then((res) => res.json().then((data) => {
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
        fetch('http://ip-api.com/json/', config).then((res) => res.json().then((data) =>  city.textContent = `in ${data.city}`))
    }

    getLocation()

    function setTime(){
        const date  = new Date
        let hours = date.getHours()
        let minutes = date.getMinutes()
        hour.textContent = `${hours}:${minutes < 10 ? `0${minutes}` : minutes}`
    }

    setInterval(setTime, 1000)

})()
