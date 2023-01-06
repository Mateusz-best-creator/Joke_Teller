const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable button
function toggleButton() {
    button.disabled = !button.disabled;
}

function tellMe(joke) {
    console.log('tell me', joke);
    // VoiceRSS in voice.js file, I get that function from VoiceRss/SDK documentation
    VoiceRSS.speech({
        key: 'a08fb8fbe0384644b12a33cd685d536f',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes from Jokes API
async function getJokes () {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // Disable the button
        toggleButton();
        // Text-toSpeech
        tellMe(joke);
    } catch (err) {
        console.log("Error!!!", err);
    }
}

// Event Listeners
button.addEventListener('click', getJokes);
// ended => Playback has stopped because the end of the media was reached.
audioElement.addEventListener('ended', toggleButton)