const { gql } = require("apollo-server");

const scheduleTypedefs = gql`
  type Schedule {
    id: ID
    schedule_name: String
    interval: Int
    duration: Int
    status: Boolean
    book_from: Int
    book_to: Int
  }

  input NewSchedule {
    schedule_name: String!
    interval: Int! #min
    duration: Int! #min
    status: Boolean!
    book_from: Int! #day
    book_to: Int! #day
  }
  input EditSchedule {
    schedule_name: String
    interval: Int #min
    duration: Int #min
    status: Boolean
    book_from: Int #day
    book_to: Int #day
  }
  type changeInSchedule {
    status: Int
    message: String
    success: Boolean
  }
  type DataResponseSchedule {
    data: [Schedule]
    status: Int
    message: String
    success: Boolean
    paginator: Paginator
  }
  type Paginator {
    itemCount: Int!
    pageCount: Int!
    currentPage: Int!
    perPage: Int!
  }
  type DataResponseScheduleById {
    data: Schedule
    status: Int
    message: String
    success: Boolean
  }

  type Query {
    getAllSchedules(page: Int = 1, limit: Int = 5): DataResponseSchedule
    getScheduleById(ID: ID!): DataResponseScheduleById
  }

  type Mutation {
    addSchedule(newSchedule: NewSchedule): DataResponseScheduleById
    updSchedule(Id: ID!, editSchedule: EditSchedule): changeInSchedule
    delSchedule(ID: ID!): changeInSchedule
  }
`;

module.exports = scheduleTypedefs;
