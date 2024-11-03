export const formatISOToCustom = (isoString:string)=>{
    const date = new Date(isoString);
    const months = ['jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const hours = String(date.getUTCHours()).padStart(2,'0');
    const minutes = String(date.getUTCMinutes()).padStart(2,'0');
    const second = String(date.getUTCSeconds()).padStart(2,'0');

    const day = date.getUTCDate();
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    return `${hours}:${minutes}:${second} ${day} ${month}, ${year}`;
};