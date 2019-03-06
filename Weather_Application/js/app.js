
// getting data from Weather api using ajax. doing in class

class ajaxWheather {

    constructor(){

    this.apiKey="fd01dcb806143456e6faabaeb8a9f78e";

    };

    async getWheather(city){

        const url=`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${this.apiKey}&units=metric`;
        const wheatherData=await fetch(url);
        const wheather=await wheatherData.json();
        return wheather;

    };
};


// displaying data class and method for display



class Display{
    constructor(){

        this.results=document.querySelector('.results');
        this.cityName=document.getElementById('cityName');
        this.cityCountry=document.getElementById('cityCountry');
        this.cityIcon=document.getElementById('cityIcon');
        this.cityTemp=document.getElementById('cityTemp');
        this.cityHumidity=document.getElementById('cityHumidity');

    }

    showWheather(response){
        console.log(response);
        const {name,sys:{country},main:{temp,humidity}}=response;
        const {icon}=response.weather[0];

        this.results.classList.add('showItem');
        this.cityName.textContent=name;
        this.cityCountry.textContent=country;
        this.cityTemp.textContent=temp;
        this.cityHumidity.textContent=humidity;
        this.cityIcon.scr=`http://openweathermap.org/img/w/${icon}.png`;
        
    };
};



// imeediate invoke function

(function (){

    // elements selections

    const form=document.getElementById('wheatherForm');
    const cityInput=document.getElementById('cityInput');
    const feedback=document.querySelector('.feedback');


    // class call / instance of class

    const ajax=new ajaxWheather();
    const display=new Display();


    // form event listener

    form.addEventListener('submit', event => {

        // preventing default behaviour of form

        event.preventDefault();

        const city=cityInput.value;

        // check if form input is empty

        if (city==='') {

            showFeedback('Please enter the right city!');

            // if users inputted some city value then!
            
        } else {

            ajax.getWheather(city).then(response => {

                if (response.message==="city not found") {

                    showFeedback('city with this name not found!');
                    
                } else {

                    display.showWheather(response);}
                    
            });

            
        };

    });


    // function for showing result on feedback bar


    function showFeedback(value) {
        
        feedback.classList.add('showItem');
        feedback.innerHTML=`<p> ${value} </p>`;

        setTimeout(() => {
            feedback.classList.remove('showItem');
        }, 2000);
    };


}) ();