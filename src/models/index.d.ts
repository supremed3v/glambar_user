import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum AppointmentStatus {
  PASSED = "PASSED",
  UPCOMING = "UPCOMING"
}



type BasketMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type BasketServiceMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ServiceAppointmentMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ServiceMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type AppointmentMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type SalonMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Basket {
  readonly id: string;
  readonly BasketServices?: (BasketService | null)[] | null;
  readonly salonID: string;
  readonly serviceID: string;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Basket, BasketMetaData>);
  static copyOf(source: Basket, mutator: (draft: MutableModel<Basket, BasketMetaData>) => MutableModel<Basket, BasketMetaData> | void): Basket;
}

export declare class BasketService {
  readonly id: string;
  readonly quantity: number;
  readonly Service?: ServiceAppointment | null;
  readonly basketID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly basketServiceServiceId?: string | null;
  constructor(init: ModelInit<BasketService, BasketServiceMetaData>);
  static copyOf(source: BasketService, mutator: (draft: MutableModel<BasketService, BasketServiceMetaData>) => MutableModel<BasketService, BasketServiceMetaData> | void): BasketService;
}

export declare class ServiceAppointment {
  readonly id: string;
  readonly quantity: number;
  readonly date: string;
  readonly Service?: Service | null;
  readonly appointmentID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly serviceAppointmentServiceId?: string | null;
  constructor(init: ModelInit<ServiceAppointment, ServiceAppointmentMetaData>);
  static copyOf(source: ServiceAppointment, mutator: (draft: MutableModel<ServiceAppointment, ServiceAppointmentMetaData>) => MutableModel<ServiceAppointment, ServiceAppointmentMetaData> | void): ServiceAppointment;
}

export declare class Service {
  readonly id: string;
  readonly name: string;
  readonly label: string;
  readonly description?: string | null;
  readonly price: number;
  readonly image?: string | null;
  readonly salonID: string;
  readonly Baskets?: (Basket | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Service, ServiceMetaData>);
  static copyOf(source: Service, mutator: (draft: MutableModel<Service, ServiceMetaData>) => MutableModel<Service, ServiceMetaData> | void): Service;
}

export declare class Appointment {
  readonly id: string;
  readonly userID: string;
  readonly Salon?: Salon | null;
  readonly total: number;
  readonly date: string;
  readonly status: AppointmentStatus | keyof typeof AppointmentStatus;
  readonly ServiceAppointments?: (ServiceAppointment | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly appointmentSalonId?: string | null;
  constructor(init: ModelInit<Appointment, AppointmentMetaData>);
  static copyOf(source: Appointment, mutator: (draft: MutableModel<Appointment, AppointmentMetaData>) => MutableModel<Appointment, AppointmentMetaData> | void): Appointment;
}

export declare class Salon {
  readonly id: string;
  readonly name: string;
  readonly image: string;
  readonly gender: string;
  readonly phone_number: number;
  readonly rating?: number | null;
  readonly lat: number;
  readonly lng: number;
  readonly Services?: (Service | null)[] | null;
  readonly address: string;
  readonly untitledfield?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Salon, SalonMetaData>);
  static copyOf(source: Salon, mutator: (draft: MutableModel<Salon, SalonMetaData>) => MutableModel<Salon, SalonMetaData> | void): Salon;
}

export declare class User {
  readonly id: string;
  readonly name: string;
  readonly address: string;
  readonly lat: number;
  readonly lng: number;
  readonly Appointments?: (Appointment | null)[] | null;
  readonly Baskets?: (Basket | null)[] | null;
  readonly sub: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}