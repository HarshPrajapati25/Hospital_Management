const Patient = require("../../models/patients");

const patientResolver = {
  Query: {
    //get all patient data
    async getAllPatient() {
      try {
        const patient = await Patient.find();
        return {
          status: 200,
          success: true,
          message: "Successfully patients are fetched",
          data: patient,
        };
      } catch (error) {
        console.log(error);
        return {
          status: 500,
          success: false,
          message: `Error in creating Patient ${error}`,
          data: null,
        };
      }
    },
    //get patient data by ID
    async getPatientById(_, { ID }) {
      try {
        const patient = await Patient.findById({ _id: ID });
        if (!patient) {
          throw new Error("NO PATIENT FOUND!!");
        }
        return {
          status: 200,
          message: "Patient fetched successsfully",
          success: true,
          data: patient,
        };
      } catch (error) {
        console.log(error);
        return {
          status: 500,
          success: false,
          message: `Error in creating Patient ${error}`,
          data: null,
        };
      }
    },
  },
  Mutation: {
    //add new patient
    // Add new patient
    async addPatient(
      _,
      { newPatient: { name, email, age, gender, phone_num, address } }
    ) {
      try {
        const newPatient = new Patient({
          name,
          email,
          age,
          gender,
          phone_num,
          address,
        });
        const savedPatient = await newPatient.save();
        return {
          status: 200,
          success: true,
          message: "Patient added successfully",
          data: savedPatient,
        };
      } catch (error) {
        console.log("Error in adding a new patient", error);
        return {
          status: 500,
          success: false,
          message: `Error in adding a new patient: ${error}`,
          data: null,
        };
      }
    },
    //delete patient
    async delPatient(_, { ID }) {
      try {
        const delpatient = (await Patient.deleteOne({ _id: ID })).deletedCount;
        return {
          message: "Successfully Patient deleted",
          status: 200,
          success: true,
        };
      } catch (error) {
        console.log("Error in deleting a Patient ", error);
        return {
          message: `Error in deleting a patient: ${error}`,
          status: 500,
          success: false,
        };
      }
    },
    //update patient data by Id
    async updPatient(_, { ID, editPatinet: EditPatinet }) {
      try {
        const updpatient = await Patient.updateOne(
          { _id: ID },
          { $set: { ...EditPatinet } }
        ).then(() => console.log(`updated Patient`));
        return {
          message: "Successfully Patient Updated",
          status: 200,
          success: true,
        };
      } catch (error) {
        console.log("Error in Updating a Patient ", error);
        return {
          message: `Error in Updating a patient: ${error}`,
          status: 500,
          success: false,
        };
      }
    },
  },
};

module.exports = patientResolver;
