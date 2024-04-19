const getUpcomingEvents = (events) => {
    const now = new Date();
    now.setSeconds(0, 0);
    
    // Filter out events that have an alarm set and are upcoming
    const upcomingEvents = events.filter((event) => {
        const alarmTime = new Date(event.extendedProps.alarmTime);
        if(isNaN(alarmTime.getTime())) { return false; }
        return alarmTime.getTime() >= now.getTime() && alarmTime.getTime() < now.getTime() + 60000;
    });

    // Sort the upcoming events by start time
    upcomingEvents.sort((a, b) => {
        const aAlertTime = new Date(a.extendedProps.alertTime);
        const bAlertTime = new Date(b.extendedProps.alertTime);
        return aAlertTime - bAlertTime;
    });

    return upcomingEvents;
}

export const checkAlarms = (events) => {
    const upcomingEvents = getUpcomingEvents(events);

    // Alert for each event currently in the upcomingEvents array
    for(let currEvent of upcomingEvents) {
        if(currEvent.extendedProps.alarm === "0") {
            alert(currEvent.title + " is starting now!");
        } else {
            alert(currEvent.title + " is starting in " + currEvent.extendedProps.alarm + " minutes!");
        }
    }
}
