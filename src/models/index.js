// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const AppointmentStatus = {
  "PASSED": "PASSED",
  "UPCOMING": "UPCOMING"
};

const { Basket, BasketService, ServiceAppointment, Service, Appointment, Salon, User } = initSchema(schema);

export {
  Basket,
  BasketService,
  ServiceAppointment,
  Service,
  Appointment,
  Salon,
  User,
  AppointmentStatus
};