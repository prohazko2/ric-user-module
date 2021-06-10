/*
  https://github.com/jquense/react-big-calendar/blob/master/examples/demos/dnd.js
*/

import React from 'react';

import { Calendar, Views, momentLocalizer, dateFnsLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

const DragAndDropCalendar = withDragAndDrop(Calendar);

import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';

import { i18n, store, autobind, user, nanoid } from 'util';

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: user.dateLocales
});

function Event(x) {
  const { event } = x;
  return (
    <span>
      <button
        onClick={() => {
          if (event._ref) {
            event._ref.removeEvent(event);
          }
        }}
      >
        x
      </button>
      <strong>{event.title}</strong>
      {event.desc && ':  ' + event.desc}
    </span>
  );
}

@autobind
export default class Events extends React.Component {
  state = {
    /*
     component start acting weird with empty events array
     TODO: figure out why
    */
    events: [
      {
        id: 1,
        title: '__now',
        start: new Date(),
        end: new Date()
      }
    ]
  };

  handleDragStart = (event) => {
    this.setState({ draggedEvent: event });
  };

  dragFromOutsideItem = () => {
    return this.state.draggedEvent;
  };

  onDropFromOutside = ({ start, end, allDay }) => {
    const { draggedEvent } = this.state;

    const event = {
      id: draggedEvent.id,
      title: draggedEvent.title,
      start,
      end,
      allDay: allDay
    };

    this.setState({ draggedEvent: null });
    this.moveEvent({ event, start, end });
  };

  moveEvent = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
    const { events } = this.state;

    let allDay = event.allDay;

    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true;
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false;
    }

    const nextEvents = events.map((existingEvent) => {
      return existingEvent.id == event.id
        ? { ...existingEvent, start, end, allDay }
        : existingEvent;
    });

    console.log('moveEvent', nextEvents);

    this.setState({
      events: nextEvents
    });

    // alert(`${event.title} was dropped onto ${updatedEvent.start}`)
  };

  resizeEvent = ({ event, start, end }) => {
    const { events } = this.state;

    const nextEvents = events.map((existingEvent) => {
      return existingEvent.id == event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });

    console.log('resizeEvent', nextEvents);

    this.setState({
      events: nextEvents
    });

    //alert(`${event.title} was resized to ${start}-${end}`)
  };

  removeEvent(event) {
    const nextEvents = this.state.events.filter((x) => x !== event);

    this.setState({
      events: nextEvents
    });
  }

  newEvent(event) {
    let idList = this.state.events.map((a) => a.id);
    let newId = Math.max(...idList) + 1;

    if (!isFinite(newId)) {
      newId = 1;
    }

    let hour = {
      _ref: this,
      id: newId,
      title: `${i18n.event} ${newId}`,
      allDay: event.slots.length == 1,
      start: event.start,
      end: event.end
    };

    this.setState({
      events: this.state.events.concat([hour])
    });
  }

  render() {
    return (
      <DragAndDropCalendar
        selectable
        resizable
        localizer={localizer}
        culture={user.locale}
        events={this.state.events}
        onEventDrop={this.moveEvent}
        onEventResize={this.resizeEvent}
        onSelectSlot={this.newEvent}
        defaultView={Views.WEEK}
        onDropFromOutside={this.onDropFromOutside}
        handleDragStart={this.handleDragStart}
        components={{
          event: Event
        }}
        messages={{
          today: i18n.today,
          day: i18n.day,
          week: i18n.week,
          month: i18n.month,
          agenda: i18n.summary,
          previous: '<',
          next: '>'
        }}
      />
    );
  }
}
