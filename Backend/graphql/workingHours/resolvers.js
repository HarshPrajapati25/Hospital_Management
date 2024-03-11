const WorkingHours = require("../../models/workingHours");
const Doctor = require("../../models/doctors");

const workingHoursResolvers = {
  Query: {
    async getAllWorkingHours() {
      try {
        const workingHoursData = await WorkingHours.find();
        return {
          status: 200,
          success: true,
          data: workingHoursData,
          message: "Working Hours fetched successfully.",
        };
      } catch (error) {
        console.log(error);
        return {
          status: 500,
          success: false,
          data: null,
          message: `Error in getting all working hours - ${error}`,
        };
      }
    },
    async getWorkingHoursById(_, { ID }) {
      try {
        const doc = await WorkingHours.findById(ID);
        console.log(doc);
        return {
          success: true,
          status: 200,
          data: doc,
          message: "Data Found!",
        };
      } catch (error) {
        return {
          success: false,
          status: 500,
          data: null,
          message: `Error in data found: ${error}`,
        };
      }
    },
  },
  Mutation: {
    async addNewWorkingHours(_, { newWorkingHours }) {
      try {
        const { doctor, day, from, to, schedule_id } = newWorkingHours;
        // Find the doctor by ID
        const doc = await Doctor.findById(doctor);
        if (!doc) {
          throw new Error(`Doctor with id ${doctor} not found`);
        }
        // Create new working hour
        const newWorkingHour = await WorkingHours.create({
          doctor: doc._id,
          day,
          from,
          to,
          schedule_id,
        });

        return {
          success: true,
          status: 200,
          message: "New Working Hour Generated",
          data: newWorkingHour,
        };
      } catch (error) {
        console.error("Error adding new working hours:", error);
        return {
          success: false,
          status: 500,
          message: `Error adding new working hours:${error}`,
          data: null,
        };
      }
    },
    async updWorkingHours(_, { ID, editWorkingHour: EditWorkingHour }) {
      try {
        await WorkingHours.updateOne(
          { _id: ID },
          { $set: { ...EditWorkingHour } }
        );
        return { status: 200, message: "workingHour Updated", success: true };
      } catch (error) {
        console.log(error);
        return {
          status: 500,
          message: "Failed to Update workingHour",
          success: false,
        };
      }
    },
    async delWokingHours(_, { ID }) {
      try {
        const workingHours = await WorkingHours.findById({ _id: ID });
        return {
          status: 200,
          success: true,
          message: "Working Hours Deleted Successfully.",
        };
      } catch (error) {
        console.log(error);
        return {
          status: 500,
          success: false,
          message: `Failed to delete working hours: ${error}`,
        };
      }
    },
  },
};

module.exports = workingHoursResolvers;
