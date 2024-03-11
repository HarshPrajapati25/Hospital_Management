const { gql } = require("apollo-server");

const doctorsTypeDef = gql`
  type Doctor {
    id: ID
    name: String!
    email: String!
    phone: String!
    address: String!
    speciality: String!
    createdAt: String!
    image: String
  }
  input NewDoctor {
    name: String!
    email: String!
    phone: String!
    address: String!
    speciality: String!
    image: String
  }
  input EditDoctor {
    email: String
    phone: String
    address: String
    image: String
  }
  type timeinput {
    id:Int
    start_time: String
    end_time: String
    is_Booked: Boolean
  }
  type getSlots {
    doctorID: ID
    date: String
    ScheduleID: ID
    availableAppointments: [timeinput]
    status: Int
    success: Boolean
    message: String
  }
  type DataResponse {
    success: Boolean
    data: [Doctor]
    message: String
    status: Int
  }
  type DataResponseByID {
    success: Boolean
    data: Doctor #|| [Doctor]
    message: String
    status: Int
  }
  type changeInDoctor {
    success: Boolean
    status: Int
    message: String
  }

  type Query {
    getAllDoctors(name:String!): DataResponse
    getDoctorById(ID: ID!): DataResponseByID!
    getSlots(doctorID: ID!, date: String!, ScheduleID: ID!): getSlots
  } 

  type Mutation {
    addDoctor(newDoctor: NewDoctor): DataResponseByID!
    delDoctor(ID: ID!): changeInDoctor
    updDoctor(ID: ID!, editDoctor: EditDoctor): changeInDoctor!
  }
`;

module.exports = doctorsTypeDef;
