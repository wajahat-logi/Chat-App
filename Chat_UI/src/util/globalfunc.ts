 const MakeDateFormat = () => {
    const pc = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    
    const parts = pc.formatToParts(new Date());
    const [year, month, day, hour, minute, second] = parts.map(part => part.value);
    return `${year}/${month}/${day} ${hour}:${minute}:${second}`;
}


export { MakeDateFormat }