const Appointment = require("../../models/appointments");
const Patient = require("../../models/patients");
const Doctor = require("../../models/doctors");
const Schedule = require("../../models/schedules");
const WorkingHours = require("../../models/workingHours");
const moment = require("moment");

const appointmentResolvers = {
  Query: {
    async getAppointments(_, _args) {
      try {
        //get all appointments
        const appointments = await Appointment.find();
        return {
          success: true,
          data: appointments,
          status: 200,
          message: "Successfully Appointments fetched ",
        };
      } catch (error) {
        console.log(error);
        return {
          success: false,
          data: null,
          status: 500,
          message: `Error in Fetching Appointments:${error}`,
        };
      }
    },
    async getAppointmentById(_, { ID }) {
      try {
        //get appintments By ID
        const appointment = await Appointment.findOne({ _id: ID });
        if (!appointment) throw "error in fetch Appointment";
        return {
          data: appointment,
          status: 200,
          success: true,
          message: "Appointment Found",
        };
      } catch (error) {
        console.log(error);
        return {
          success: false,
          status: 500,
          message: `Error In Getting The Appointment : ${error}`,
        };
      }
    },
    async getAppointmentByPatientId(_, { ID }) {
      try {
        const tempArr = [];
        const patient = await Appointment.find({ patient: ID });
        if (!patient) {
          throw "Error in fetching Appointment by Patient";
        }
        console.log(patient);
        for (let i = 0; i < patient.length; i++) {
          let doctor = await Doctor.findOne({ _id: patient[i].doctor });
          let schedule = await Schedule.findOne({ _id: patient[i].schedule });
          let start_time = patient[i].start_time;
          let end_time = patient[i].end_time;
          tempArr.push({
            doctor: doctor.name,
            schedule: schedule.schedule_name,
            start_time,
            end_time,
          });
        }
        console.log(tempArr);

        // patient.map((patient) => {
        //   const schedule = patient.schedule;
        //   const doctor = patient.doctor;
        //   const starttime = patient.start_time;
        //   const endtime = patient.end_time;
        //   tempArr.push(patient);
        // });

        // const doctorIds = patient.map((doc) => doc.doctor);
        // if (!doctorIds) throw "No Doctor found";
        // console.log(doctorIds);
        // const doctorName = await Doctor.findById({_id: doctorIds });
        // console.log(doctorName);

        // const scheduleIds = patient.map((schedule) => schedule.schedule);
        // if (!doctorIds) throw "No schedule found";
        // console.log(scheduleIds);

        // const doctorName = await Doctor.findById({ doctorIds });
        // if (!doctorName) {
        //   throw "Doctor not found";
        // }
        // console.log(doctorName);

        return {
          data: tempArr,
          status: 200,
          success: true,
          message: "Appointment Found",
        };
      } catch (error) {
        console.log(error);
        return {
          success: false,
          status: 500,
          message: `Error in getting the appointment: ${error}`,
        };
      }
    },
  },
  Mutation: {
    //Create a appointment
    async addAppointment(
      _,
      {
        newAppointment: {
          patient,
          doctor,
          schedule,
          date,
          start_time,
          end_time,
        },
      }
    ) {
      try {
        //check for the doctor
        const foundDoctor = await Doctor.findById(doctor);
        if (!foundDoctor) throw new Error("Doctor does not exist");

        //check for the schedule
        const foundSchedule = await Schedule.findById(schedule);
        if (!foundSchedule) throw new Error("Schedule does not exist");

        //check for the patient
        const foundPatient = await Patient.findById(patient);
        if (!foundPatient) throw new Error("Patient is not registered.");

        //get date from frontend
        const newdate = moment.utc(date).format("YYYY-MM-DD");
        if (!newdate) throw new Error("Invalid Date format! Use DD/MM");

        //convert date into day
        const DATE = new Date(newdate);
        const newday = DATE.getDay();

        //check for doctor available
        const availableDate = await WorkingHours.find({
          doctor: foundDoctor._id,
          day: newday,
        });
        if (!availableDate) throw new Error("Doctor is not available");

        const startTime = moment(start_time, "HH:mm");
        const endTime = moment(end_time, "HH:mm");
        const totalDuration = endTime.diff(startTime, "minutes");

        if (foundSchedule.duration !== totalDuration) {
          return {
            success: false,
            data: null,
            message: "Invalid time duration for this schedule",
            status: 500,
          };
        }

        const existingAppointment = await Appointment.findOne({
          doctor: foundDoctor._id,
          start_time,
          date,
        });
        if (existingAppointment) throw new Error("Slot is unavailable");

        const newAppointment = await Appointment.create({
          doctor: foundDoctor._id,
          patient: foundPatient._id,
          schedule: foundSchedule._id,
          date: newdate,
          start_time: startTime.format("HH:mm"),
          end_time: endTime.format("HH:mm"),
        });

        return {
          data: newAppointment,
          success: true,
          status: 200,
          message: "Appointment created successfully",
        };
      } catch (error) {
        return {
          data: null,
          success: false,
          status: 500,
          message: `Error in creating appointment: ${error.message}`,
        };
      }
    },
    async delAppointment(_, { ID }) {
      try {
        const foundAppointment = (await Appointment.deleteOne({ _id: ID }))
          .deletedCount;
        if (!foundAppointment) throw new Error("No such appointment exists!");
        return {
          success: true,
          message: "Appointment successfully deleted",
          status: 200,
        };
      } catch (error) {
        return {
          success: false,
          message: `Failed to delete the appointment:${error.message}`,
          status: 500,
        };
      }
    },
  },
};

module.exports = appointmentResolvers;
