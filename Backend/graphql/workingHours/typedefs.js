const { gql } = require("apollo-server");

const workingHourTypedefs = gql`
  type WorkingHour {
    doctor: ID!
    day: Int! #Day of the week, Monday is 1 and Sunday is 7.
    from: String! #HH:MM formate
    to: String! #HH:MM formate
    schedule_id: ID
  }
  input NewworkingHour {
    doctor: ID!
    day: Int!
    from: String!
    to: String!
    schedule_id: ID
  }
  input EditWorkingHour {
    schedule_id: ID
    from: String
    to: String
  }
  type DataResponseWorkingHours {
    data: [WorkingHour]
    success: Boolean
    message: String
    status: Int
  }
  type DataResponseWorkingHoursByID {
    data: WorkingHour
    success: Boolean
    message: String
    status: Int
  }
  type ChangeInWorkingHours {
    success: Boolean
    message: String
    status: Int
  }

  type Query {
    getAllWorkingHours: DataResponseWorkingHours
    getWorkingHoursById(ID: ID!): DataResponseWorkingHoursByID
  }
  type Mutation {
    addNewWorkingHours(
      newWorkingHours: NewworkingHour
    ): DataResponseWorkingHoursByID
    updWorkingHours(
      ID: ID!
      editWorkingHour: EditWorkingHour
    ): ChangeInWorkingHours
    delWokingHours(ID: ID!): ChangeInWorkingHours
  }
`;
module.exports = workingHourTypedefs;
