const { gql } = require("apollo-server");

const patientsTypeDef = gql`
  type Patient {
    name: String!
    email: String
    age: Int!
    phone_num: String
    gender: String
    address: String
  }
  input NewPatient {
    name: String!
    email: String
    age: Int!
    phone_num: String
    gender: String
    address: String
  }
  input EditPatinet {
    email: String
    age: Int
    phone_num: String
    address: String
  }
  type DataResponsePatient {
    success: Boolean
    status: Int
    message: String
    data: [Patient]
  }
  type DataResponsePatientByID{
    success:Boolean
    status:Int
    message:String
    data:Patient
  }
  type changeInPatient{
    success:Boolean
    status:Int
    message:String
  }

  type Query {
    getAllPatient: DataResponsePatient
    getPatientById(ID: ID!): DataResponsePatientByID!
  }
  type Mutation {
    addPatient(newPatient: NewPatient): DataResponsePatientByID!
    delPatient(ID: ID!): changeInPatient!
    updPatient(ID: ID!, editPatinet: EditPatinet): changeInPatient!
  }
`;

module.exports = patientsTypeDef;
