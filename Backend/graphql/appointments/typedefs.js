const { gql } = require("apollo-server");

const appointmentTypeDefs = gql`
 
  type Appointment {
    doctor: ID!
    schedule: ID
    patient: ID!
    date: String!
    start_time: String! # ISOString
    end_time: String! # ISOString
    createdAt: String!
  }
  input NewAppointment {
    doctor: ID!
    schedule: ID
    patient: ID!
    date: String
    start_time: String # ISOString
    end_time: String
  }
  type AppointmentByPatient{
    doctor:String!
    schedule:String
    start_time:String
    end_time:String
  }
  type DataResponceAppointmentById {
    data: Appointment
    success: Boolean
    status: Int
    message: String
  }
  type DataResponceAppointment {
    data: [Appointment]
    success: Boolean
    status: Int
    message: String
  }
  type changeInAppointment {
    success: Boolean
    status: Int
    message: String
  }
  type DataResponceAppointmentByPatient{
    data:[AppointmentByPatient]
    success:Boolean
    status:Int
    message:String
  }
  type Query {
    getAppointments: DataResponceAppointment
    getAppointmentById(ID: ID): DataResponceAppointmentById
    getAppointmentByPatientId(ID: ID): DataResponceAppointmentByPatient
  }
  type Mutation {
    addAppointment(newAppointment: NewAppointment): DataResponceAppointmentById
    delAppointment(ID: ID!): changeInAppointment
  }
`;

module.exports = appointmentTypeDefs;
