const Doctor = require("../../models/doctors");
const Schedule = require("../../models/schedules");
const WorkingHours = require("../../models/workingHours");
const Appointment = require("../../models/appointments");
const moment = require("moment");
 
const doctorResolver = {
  Query: {
    async getAllDoctors(_, { name }) {
      try {
        const doctor = await Doctor.find();
        const searchDoctor = doctor?.filter((doc) => {
          return (
            doc.name.toLowerCase().includes(name.toLowerCase().trim()) ||
            doc.speciality.toLowerCase().includes(name.toLowerCase().trim())
          );
        });
        console.log(searchDoctor);
        if (!searchDoctor) {
          throw new Error("NO DOCTOR FOUND!!");
        }
        if (searchDoctor.length > 0) {
          return {
            data: searchDoctor,
            message: "Doctor fetched successfully",
            success: true,
            status: 200,
          };
        } else {
          return {
            success: false,
            status: 500,
            message: "Doctor not found.",
            data: null,
          };
        }
      } catch (error) {
        console.log("Error in getting Doctors", error);
        return {
          success: false,
          status: 500,
          message: "Doctors not found.",
          data: null,
        };
      }
    },

    async getDoctorById(_, { ID }) {
      try {
        const doctor = await Doctor.findById(ID);
        if (!doctor) {
          throw new Error("NO DOCTOR FOUND!!");
        }
        return {
          data: doctor,
          message: "Doctor fetched successfully",
          success: true,
          status: 200,
        };
      } catch (error) {
        console.log("Error in getting the doctor by ID", error);
        return {
          success: false,
          status: 500,
          message: "Doctor not found.",
          data: null,
        };
      }
    },

    async getSlots(_, { doctorID, date, ScheduleID }) {
      try {
        let selectedDate = new Date(date);
        let day = selectedDate.getDay();
        let DATE = moment(date).format("YYYY-MM-DD");

        const workingHours = await WorkingHours.findOne({ day: day });
        if (!workingHours) {
          return {
            success: false,
            status: 500,
            message: "No such workingHours available for this Day!",
            data: null,
          };
        }

        const doctor = await Doctor.findById(doctorID);
        if (!doctor) {
          return {
            success: false,
            status: 500,
            message: "No such doctor available for this Day!",
            data: null,
          };
        }
        const slots = [];
        const startTime = moment(workingHours.from, "HH:mm");
        const endTime = moment(workingHours.to, "HH:mm");
        const totalDuration = endTime.diff(startTime, "minutes");

        const schedule = await Schedule.findById(ScheduleID);
        if (!schedule) {
          return {
            success: false,
            status: 500,
            message: "Slots not found.",
            data: null,
          };
        }
        console.log(doctor._id);
        console.log(date);

        const duration = schedule.duration;
        const interval = schedule.interval;
        const numSlots = Math.ceil(totalDuration / duration);
        let existingAppointment = await Appointment.find({
          doctor: doctor._id,
          date: date,
        });
        console.log(existingAppointment);

        let slotInterval = startTime;
        for (let i = 0; i < numSlots; i++) {
          const slotStartTime = moment(slotInterval);
          const slotEndTime = moment(slotStartTime).add(duration, "minutes");
          slotInterval = moment(slotEndTime).add(interval, "minutes");
          if (slotEndTime <= endTime) {
            const slot = {
              id: i,
              start_time: slotStartTime.format(), //.format("HH:mm"),
              end_time: slotEndTime.format(), //.clone(),//.format("HH:mm"),
              is_Booked: false,
            };
            slots.push(slot);
          }
        }
        slots.map((slot) => {
          console.log(slot.start_time.slice(11, 16));
          for (
            let index = 0;
            existingAppointment && index < existingAppointment.length;
            index++
          ) {
            if (
              slot.start_time.slice(11, 16) ==
              existingAppointment[index].start_time
            ) {
              slot.is_Booked = true;
              break; // Exit the loop once a match is found
            }
          }
        });
        // slots.map((slot) => {
        //   if (slot.start_time.slice(11, 16) === existingAppointment.start_time) {
        //     slot.is_Booked = true;
        //   } else {
        //     console.log(slot.start_time);
        //     console.log(existingAppointment.start_time);
        //   }
        // });
        return {
          doctorID: doctor._id,
          ScheduleID: ScheduleID,
          availableAppointments: slots,
          date: DATE,
          message: "Slots are generated",
          status: 200,
          success: true,
        };
      } catch (error) {
        console.log(`Error in getDoctorAvailability ${error}`);
        return {
          success: false,
          status: 500,
          message: "Slots not found.",
          data: null,
        };
      }
    },
  },

  Mutation: {
    async addDoctor(
      _,
      { newDoctor: { name, email, phone, address, speciality, image } }
    ) {
      try {
        const addDoctor = new Doctor({
          name,
          email,
          phone,
          address,
          speciality,
          image,
        });
        const res = await addDoctor.save();
        return {
          success: true,
          status: 200,
          data: res,
          message: "Successfully Doctor added!!",
        };
      } catch (error) {
        return {
          success: false,
          status: 500,
          data: null,
          message: `Error in creating Doctor ${error}`,
        };
      }
    },

    async delDoctor(_, { ID }) {
      try {
        const wasDeleted = (await Doctor.deleteOne({ _id: ID })).deletedCount;
        return {
          success: true,
          status: 200,
          message: "Successfully Doctor Deleted!!",
        };
      } catch (error) {
        return {
          success: false,
          status: 500,
          data: null,
          message: `Error in deleting Doctor ${error}`,
        };
      }
    },

    async updDoctor(_, { ID, editDoctor: EditDoctor }) {
      try {
        await Doctor.updateOne({ _id: ID }, { $set: { ...EditDoctor } });
        return {
          success: true,
          status: 200,
          message: "Successfully Doctor Updated!!!!",
        };
      } catch (error) {
        return {
          success: false,
          status: 500,
          data: null,
          message: `Error in updating Doctor ${error}`,
        };
      }
    },
  },
};

module.exports = doctorResolver;
