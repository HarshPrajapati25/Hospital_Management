import React, { useState } from "react";
import "./index.css";
import pic from "../src/assets/unnamed.png";
import {
  BookAppointment,
  DisplayDoctorByID,
  DisplaySlots,
} from "../components/appointment";
import { useQuery, gql } from "@apollo/client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

// Define the GraphQL query for fetching all doctors
const GetAllDoctors = gql`
  query getAllDoctors($name: String!) {
    getAllDoctors(name: $name) {
      data {
        createdAt
        address
        email
        id
        image
        phone
        name
        speciality
      }
      success
      status
      message
    }
  }
`;

// DisplayDoctors Component
export function DisplayDoctors({ onDoctorClick, selectedDoctorId }) {
  const { loading, error, data } = useQuery(GetAllDoctors, {
    variables: { name: "" },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.getAllDoctors.data.map((doctor) => (
    <div
      key={doctor.id}
      className={`border-4 border-black flex flex-col items-center mx-2 my-2 ${
        selectedDoctorId === doctor.id ? "bg-gray-200" : ""
      }`}
      onClick={() => onDoctorClick(doctor.id)}
    >
      <img
        className="h-[200px] w-[200px] rounded-[200px] mx-2 my-2"
        src={pic}
        alt={doctor.name}
      />
      <h3 className="font-mono text-xl font-bold">{doctor.name}</h3>
      <h3 className="font-mono text-xl font-light">{doctor.speciality}</h3>
    </div>
  ));
}

export default function App() {
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [formattedDate, setFormattedDate] = useState(null); // State to store formatted date
  const [value, setValue] = useState("Leave a comment");
  const [selectedDate, setSelectedDate] = useState(null); // State to store selected date
  const [startSlot, setStartSlot] = useState(null);
  const [endSlot, setEndSlot] = useState(null);
  const handleDoctorClick = (doctorId) => {
    setSelectedDoctorId(doctorId);
  };

  const handleDateClick = (arg) => {
    const clickedDate = arg.dateStr;
    setSelectedDate(clickedDate);
    setFormattedDate(clickedDate); // You can format the date here or wherever needed
  };

  const handleSlotStartClick = (slot) => {
    const clickedSlot = slot;
    const key = clickedSlot.toString().slice(11, 16);
    setStartSlot(key);
    // console.log(key);
  };
  console.log(typeof(startSlot));
  const handleSlotEndClick = (slot) => {
    const clickedSlot = slot;
    const key = clickedSlot.toString().slice(11, 16);
    setEndSlot(key);
    // console.log(key);
  };
 
  return (
    <div>
      <h2 className="font-mono text-3xl text-center mx-10 mt-5 font-bold">
        Search Doctor, Make An Appointment🚀
      </h2>
      <br />
      <div className="flex">
        <div className="w-1/2 grid grid-cols-2 gap-2 cursor-pointer m-[0.5%] px-5 py-5 border-4 border-black">
          <DisplayDoctors
            onDoctorClick={handleDoctorClick}
            selectedDoctorId={selectedDoctorId}
            allDoctorsQuery={GetAllDoctors}
          />
        </div>
        <div className="w-1/2 px-5 py-5 m-[0.5%] border-4 border-black">
          <div className="flex">
            <DisplayDoctorByID doctorId={selectedDoctorId} />
            <FullCalendar
              className="w-1/2 px-5 py-5 m-[0.5%]"
              plugins={[dayGridPlugin, interactionPlugin]}
              dateClick={handleDateClick}
            />
          </div>
          <div className="font-mono text-3xl">
            <DisplaySlots
              doctorId={selectedDoctorId}
              scheduleId="65ca04a17392bc25992c5c3f"
              date={formattedDate}
              onSlotStartClick={handleSlotStartClick}
              onSlotEndClick={handleSlotEndClick}
            />
          </div>
          <div className="px-5 py-5 border-4 border-black">
            <img
              className="h-[50px] w-[50px] rounded-[50px]"
              src={pic}
              alt="doctor"
            ></img>

            <hr className="my-5 border-1 border-black" />
            <textarea
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="h-20"
            ></textarea>
            <hr className="my-5 border-1 border-black" />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Post
            </button>
          </div>
          <BookAppointment
            schedule="65ca04a17392bc25992c5c3f"
            date={formattedDate}
            doctor={selectedDoctorId}
            patient="65cc49ffce17ab4922fdec9d"
            start_time={startSlot}
            end_time={endSlot}
          />
        </div>
      </div>
    </div>
  );
}
