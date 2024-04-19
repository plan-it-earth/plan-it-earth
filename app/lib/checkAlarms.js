const getUpcomingEvents = (events) => {
    console.log("Getting upcoming events");
    console.log("Events: ", events);
    const now = new Date();
    now.setSeconds(0, 0);
    console.log("Current time: ", now);
    
    // Filter out events that have an alarm set and are upcoming
    const upcomingEvents = events.filter((event) => {
        const alarmTime = new Date(event.alarmTime);
        console.log("Alarm time: ", alarmTime);
        return alarmTime.getTime() >= now.getTime() && alarmTime.getTime() < now.getTime() + 60000;
    });

    // Sort the upcoming events by start time
    upcomingEvents.sort((a, b) => {
        const aAlertTime = new Date(a.alertTime);
        const bAlertTime = new Date(b.alertTime);
        return aAlertTime - bAlertTime;
    });

    return upcomingEvents;
}

export const checkAlarms = (events) => {
    console.log("Checking alarms");
    const upcomingEvents = getUpcomingEvents(events);
    console.log("Upcoming events: ", upcomingEvents);

    // Alert for each event currently in the upcomingEvents array
    for(currEvent in upcomingEvents) {
        if(currEvent.alert === 0) {
            alert(currEvent.title + " is starting now!");
        } else {
            alert(currEvent.title + " is starting in " + currEvent.alert + " minutes!");
        }
    }
}
