export function TimerValue (seconds) {
    const dt = new Date(seconds * 1000)
    const mins = dt.getMinutes()
    const secs = dt.getSeconds()

    const ftMins = (mins < 10) ? '0' + mins : mins;
    const ftSecs = (secs < 10) ? '0' + secs : secs;

    return `${ftMins}:${ftSecs}`
}