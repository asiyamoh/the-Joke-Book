
console.log('client.js sourced');

$( document ).ready( onReady );

function onReady() {
    console.log('DOM ready');

    getJokes()

    $('#addJokeButton').on('click', addJoke);
}

function addJoke(){
    // console.log('inside the addJoke');
    let whoseJoke = $('#whoseJokeIn').val();
    let jokeQuestion = $('#questionIn').val();
    let punchLine = $('#punchlineIn').val();
    // console.log("hey addJoke",whoseJoke,jokeQuestion,punchLine);

    let jokes = {
        whoseJoke,
        jokeQuestion,
        punchLine
    };

    $.ajax({
        method:'POST',
        url:'/joke',
        data:jokes
    }).then((response) => {
        console.log('Hey POST');
        getJokes()
    }).catch((error) => {
        alert("Error with the POST", error);
    })
    
}

function getJokes(){
    //as the page loads it displays the jokes
    $.ajax({
        method:'GET',
        url:'/joke'
    }).then((response) => {
        console.log('inside the getJoke', response);
        render(response);
    }).catch((error) => {
        alert('Error with GET request /joke', error);
    })
}

function render(jokes){
    console.log("insde the render");
    $('#outputDiv').empty();
    
    for(let joke of jokes){
        // console.log("inside the for loop");
        $('#outputDiv').append(`
        <p>By: ${joke.whoseJoke} 
            Question: ${joke.jokeQuestion} 
            punch line: ${joke. punchLine} </p>
        `)
    }
}