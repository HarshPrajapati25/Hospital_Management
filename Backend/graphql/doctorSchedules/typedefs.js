const { gql } = require("apollo-server");

const doctorScheduleTypeDefs = gql`
  type DoctorSchedule {
    id: ID
    doctor: ID!
    schedule: ID!
  }
  input DoctorScheduleInput {
    doctor: ID!
    schedule: ID!
  }
  type DoctorScheduleResponseByID {
    data: DoctorSchedule
    status: Int
    success: Boolean
    message: String
  }
  type DoctorScheduleResponse {
    data: [DoctorSchedule]
    status: Int
    success: Boolean
    message: String
  }
  type Query {
    getDoctorSchedule: DoctorScheduleResponse
    getDoctorScheduleByID(ID: ID!): DoctorScheduleResponseByID
  }
  type Mutation {
    addDoctorSchedule(
        doctorSchedule: DoctorScheduleInput
    ): DoctorScheduleResponseByID
  }
`;
module.exports = doctorScheduleTypeDefs;