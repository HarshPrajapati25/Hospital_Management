const Schedule = require("../../models/schedules");
var moment = require("moment"); // require
const scheduleResolvers = {
  Query: {
    async getAllSchedules(_, { page = 1, limit = 5 }) {
      if (
        page < 1 ||
        limit < 1 ||
        !Number.isInteger(page) ||
        !Number.isInteger(limit)
      ) {
        return {
          data: null,
          status: 400,
          success: false,
          message: "Invalid page or limit parameter.",
        };
      }

      try {
        const schedule = await Schedule.find()
          .skip((page - 1) * limit)
          .limit(limit);
        const totalCount = await Schedule.countDocuments();
        const totalPages = Math.ceil(totalCount / limit);
        return {
          data: schedule,
          message: "Schedules are fetched successfully.",
          status: 200,
          success: true,
          paginator: {
            itemCount: totalCount,
            pageCount: totalPages,
            currentPage: page,
            perPage: limit,
          },
        };
      } catch (error) {
        console.log(error);
        return {
          data: null,
          status: 500,
          success: false,
          message: `Error in fetching schedules: ${error}`,
        };
      }
    },
    async getScheduleById(_, { ID }) {
      try {
        const schedule = await Schedule.findById(ID);
        return {
          data: schedule,
          message: "Schedule is found",
          status: 200,
          success: true,
        };
      } catch (error) {
        console.log(error);
        return {
          success: false,
          status: 500,
          message: `No Schedule Found with the given ID ${error}`,
          data: null,
        };
      }
    },
  },
  Mutation: {
    async addSchedule(
      _,
      {
        newSchedule: {
          schedule_name,
          interval,
          duration,
          status,
          book_from,
          book_to,
        },
      }
    ) {
      try {
        const newSchedule = await Schedule.create({
          schedule_name,
          interval, //min
          duration, //min
          status,
          book_from, //day
          book_to, //day
        });
        newSchedule.save();
        return {
          success: true,
          message: "Schedule arranged successfully!!",
          status: 200,
          data: newSchedule,
        };
      } catch (error) {
        console.log(error);
        return {
          status: 500,
          success: false,
          message: `Error in creating Schedule ${error}`,
          data: null,
        };
      }
    },
    async updSchedule(_, { ID, editSchedule: EditSchedule }) {
      try {
        await Schedule.updateOne(ID, { $set: { ...EditSchedule } });
        return {
          status: 200,
          success: true,
          message: "Schedule updated successfully!!",
        };
      } catch (error) {
        console.log(error);
        return {
          status: 500,
          success: false,
          message: `Failed to update the schedule:${error}`,
        };
      }
    },
    async delSchedule(_, { ID }) {
      try {
        let result = (await Schedule.findByIdAndDelete({ _id: ID }))
          .deletedCount;
        return {
          status: 200,
          success: true,
          message: "Successfully deleted the schedule.",
        };
      } catch (error) {
        return {
          status: 500,
          success: false,
          message: `Failed to delete the schedule: ${error}`,
        };
      }
    },
  },
};

module.exports = scheduleResolvers;
