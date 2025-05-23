import { Reservation } from "src/interfaces/reservation";
import { model } from "../model/model";

const BASE_URL = '/api'

export async function loadAllReservations() {
   const response = await fetch(`${BASE_URL}/reservations`);
   const reservations: Reservation[] = await response.json();
   model.reservations = reservations;
}

export async function loadReservation(id: number) {
   const response = await fetch(`${BASE_URL}/reservations/${id}`);
   const reservation: Reservation = await response.json();
   return reservation;
}

export async function loadReservationsFromShift(shiftId: number) {
   const response = await fetch(`${BASE_URL}/reservations`);
   const reservations: Reservation[] = await response.json();
   return reservations.filter(reservation => reservation.shift === shiftId);
}