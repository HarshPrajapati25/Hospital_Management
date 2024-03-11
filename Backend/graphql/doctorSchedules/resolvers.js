const Schedule = require("../../models/schedules");
const Doctor = require("../../models/doctors");
const DoctorSchedule = require("../../models/doctorSchedule");

const doctorScheduleResolvers = {
  Query: {
    async getDoctorSchedule() {
      try {
        const allSchedule = await DoctorSchedule.find();
        return {
          data: allSchedule,
          status: 200,
          success: true,
          message: "Get All Schedules Successfully",
        };
      } catch (error) {
        console.log(error);
        return {
          data: null,
          status: 500,
          success: false,
          message: `Error in getting schedules: ${error}`, 
        };
      }
    },
    // Uncomment the resolver below when implementing getDoctorScheduleByID
    getDoctorScheduleByID: async (_, { ID }) => {
      try {
        const schedule = await DoctorSchedule.findById(ID);
        return {
          data: schedule,
          status: 200,
          success: true,
          message: "Get Schedule by ID Successfully",
        };
      } catch (error) {
        console.log(error);
        return {
          data: null,
          status: 500,
          success: false,
          message: `Error in getting schedule by ID: ${error}`,
        };
      }
    },
  },
  Mutation: {
    async addDoctorSchedule(_, { doctorSchedule: { doctor, schedule } }) {
      try {
        const foundDoctor = await Doctor.findById(doctor);
        if (!foundDoctor) throw new Error("Doctor does not exist");

        const foundSchedule = await Schedule.findById(schedule);
        if (!foundSchedule) throw new Error("Schedule does not exist");

        const doctorSchedule = new DoctorSchedule({
          doctor: foundDoctor._id,
          schedule: foundSchedule._id,
        });
        await doctorSchedule.save();
        return {
          data: doctorSchedule,
          status: 200,
          success: true,
          message: "Adding the Doctor Schedule was successful",
        };
      } catch (error) {
        console.log(error);
        return {
          data: null,
          status: 500,
          success: false,
          message: `Error adding Doctor Schedule: ${error}`,
        };
      }
    },
  },
};

module.exports = doctorScheduleResolvers;
