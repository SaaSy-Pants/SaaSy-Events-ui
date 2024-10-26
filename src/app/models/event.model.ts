export interface Event {
  EID: string;
  OID: string; // Organizer ID
  Name: string;
  EventCategory: string;
  EventDesc: string;
  Location: string;
  EventDate: string;
  EventTimeStart: string;
  EventTimeEnd: string;
  TicketsAvb: number;
  Price: number;
}
