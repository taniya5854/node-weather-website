console.log("Javascript applied!!!")


//fetch is function that is used to fetch data from the browser in client side can,t be used in node


const weatherForm = document.querySelector('form')
const searchAddress = document.getElementById('search-add')
const messageOne= document.getElementById('para1Data')
const messageTwo= document.getElementById('para2Data')


weatherForm.addEventListener('submit',(e)=>
{
    e.preventDefault()   //this is function that is used to prevent default reloading of page
    const location = searchAddress.value;

    messageOne.textContent = 'Loading.....'
    messageTwo.textContent=''



    fetch('http://localhost:3000/weather?address='+ location).then((response) =>
    {
    response.json().then((data) =>
        {
        if(data.error)
        {
            console.log(data.error)
            messageOne.textContent = data.error;
        }
        else{

            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
            }
    })
})

})
