document.addEventListener("DOMContentLoaded", () => {
    const songs = document.querySelectorAll('.song'); // Select all song divs
    const audios = document.querySelectorAll('audio'); // Select all audio elements
    
    // Play a muted audio to bypass autoplay restrictions (this happens as soon as the page loads)
    audios.forEach(audio => {
        audio.muted = true; // Mute the audio to bypass autoplay restrictions
        audio.play(); // Start playing (muted)
    });

    songs.forEach(song => {
        const audio = song.querySelector('audio'); // Select the audio element within the song div
        
        // When the audio starts playing, pause others
        audio.addEventListener('play', () => {
            audios.forEach(otherAudio => {
                if (otherAudio !== audio) {
                    otherAudio.pause();
                }
            });
        });

        // When hovering over the song div, unpause the audio if it's paused
        song.addEventListener('mouseover', () => {
            if (audio.paused) {
                audio.muted = false; // Unmute before playing
                audio.play(); // Play audio if it's paused
            }
        });

        // When mouse leaves the song div, pause the audio if it's playing
        song.addEventListener('mouseleave', () => {
            if (!audio.paused) {
                audio.pause(); // Pause audio if it's playing
                audio.currentTime = 0;
            }
        });
    });
});
