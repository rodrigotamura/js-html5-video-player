const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

function togglePlay() {
    /**
     * Plays and pauses the video
     */
    if(video.paused) {
        video.play();
    }else{
        video.pause();
    }

    // or you can do the follow:
    /**
     * const method = video.paused ? 'play' : 'pause';
     * video[method]();
     */
}

function updateButton() {
    /**
     * Switches button when played / paused
     */
    const icon = this.paused ? '▶' : '▌▌';
    toggle.textContent = icon;
}

function skip() {
    /**
     * Skip button, depends on data-skip parameter
     */
    video.currentTime += parseFloat(this.dataset.skip);

}

function handleRangeUpdate() {
    /**
     * when user changes range sliders (volume and playback rate)
     */
    console.log(this.name, this.value);
    video[this.name] = this.value;
}

function handleProgress() {
    /**
     * It will handle progress bar
     * .progress__filled has flex-basis property
     * that it will show the progress bar moving
     */

     const percent = (video.currentTime / video.duration) * 100;
     progressBar.style.flexBasis = `${percent}%`;

}

function setProgress(e) {
    /**
     * It will set the correct playback time
     * over the progressbar filled
     */
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton); // when video plays
video.addEventListener('pause', updateButton); // when video pauses
video.addEventListener('timeupdate', handleProgress); // when video is updating time code
video.addEventListener('canplay', handleProgress); // when video is ready to play

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => {
    range.addEventListener('change', handleRangeUpdate);
    range.addEventListener('mousemove', handleRangeUpdate);
});

let mousedown = false;
progress.addEventListener('click', setProgress); // when click on some part of the progress bar
progress.addEventListener('mousemove', 
                            (e) => mousedown && setProgress(e)); // when we mouse over the progress bar
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);