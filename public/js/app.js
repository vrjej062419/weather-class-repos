console.log('Client-side JavaScript file is loaded!')

const inputData = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


const weatherForm = document.querySelector('form')

weatherForm.addEventListener('submit', (e) =>  {
    e.preventDefault()
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address='+ inputData.value).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error
                messageTwo.textContent = ''
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})
