import { format } from 'date-fns';

interface Event {
  start: Date;
  end: Date;
  title: string;
}

const events: Event[] = [
  {
    start: new Date(2023, 4, 17, 9, 0),
    end: new Date(2023, 4, 17, 10, 0),
    title: 'Event 01',
  },
  {
    start: new Date(2023, 4, 17, 10, 0),
    end: new Date(2023, 4, 17, 13, 30),
    title: 'Event 02',
  },
  {
    start: new Date(2023, 4, 17, 12, 0),
    end: new Date(2023, 4, 17, 13, 0),
    title: 'Event 03',
  },
  {
    start: new Date(2023, 4, 17, 11, 0),
    end: new Date(2023, 4, 17, 13, 20),
    title: 'Event 04',
  },
];

const Calendar = () => {
  const renderTimeSlots = () => {
    const timeSlots = [];

    for (let hour = 6; hour <= 22; hour++) {
      timeSlots.push(
        <div
          key={hour}
          className="flex items-center border-t border-gray-200 py-4 ml-16 h-14"
        >
          <div className="relative w-16 pr-2">
            <div className="absolute -top-10 -left-16 text-xs text-right w-11">{`${hour}:00`}</div>
          </div>
          <div className="flex-grow bg-gray-100 h-2"></div>
        </div>,
      );
    }

    return timeSlots;
  };

  const renderEvents = () => {
    const sortedEvents = [...events].sort((a, b) => {
      if (a.end > b.start && a.start <= b.start) {
        return -1; // O evento 'a' deve vir antes do evento 'b'
      } else if (b.end > a.start && b.start < a.start) {
        return 1; // O evento 'b' deve vir antes do evento 'a'
      } else {
        return a.start.getTime() - b.start.getTime(); // Ordena pelo horário de início
      }
    });

    return sortedEvents.map((event, index) => {
      console.log(event.title);

      const startHour = event.start.getHours();
      const startMinute = event.start.getMinutes();
      const topOffset = (startHour - 6) * 56 + startMinute; // 56 pixels per hour
      const endHour = event.end.getHours();
      const endMinute = event.end.getMinutes();
      const eventHeight = (endHour - startHour) * 56 + endMinute - startMinute; // 56 pixels per hour

      let leftOffset = 0;
      let overlappingCount = 1;
      if (index > 0) {
        const overlappingEvents = sortedEvents.slice(0, index);
        overlappingCount = overlappingEvents.filter(
          (e) =>
            (event.start >= e.start && event.end < e.end) ||
            (event.start > e.start && event.start < e.end),
        ).length;
        console.log(overlappingCount);

        leftOffset = overlappingCount * 16;
      }

      return (
        <div
          key={index}
          className="absolute rounded px-2 py-1 overflow-hidden bg-blue-500 border border-white text-white text-xs cursor-pointer"
          style={{
            top: `${topOffset}px`,
            height: `${eventHeight}px`,
            left: `calc(4rem + ${leftOffset}%)`,
            width: `calc(100% - ${leftOffset}% - ${64 + 16}px)`,
          }}
        >
          <p className="truncate font-bold">{event.title}</p>
          <p className="truncate">
            {`${format(event.start, 'HH:mm')}
             até
            ${format(event.end, 'HH:mm')}`}
          </p>
        </div>
      );
    });
  };

  return (
    <div>
      <div className="bg-blue-500 text-white text-center py-2">
        {new Date().toLocaleDateString()}
      </div>
      <div className="relative mt-4">
        {renderTimeSlots()}
        {renderEvents()}
      </div>
    </div>
  );
};

export default Calendar;
