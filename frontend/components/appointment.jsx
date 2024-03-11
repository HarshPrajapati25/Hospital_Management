import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import pic from "../src/assets/unnamed.png";
import { useQuery, gql, useMutation } from "@apollo/client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

const getDoctorById = gql`
  query getDoctorById($id: ID!) {
    getDoctorById(ID: $id) {
      data {
        address
        createdAt
        email
        image
        phone
        name
        speciality
      }
      message
      status
      success
    }
  }
`;

const getSlots = gql`
  query getSlots($doctorId: ID!, $scheduleId: ID!, $date: String!) {
    getSlots(doctorID: $doctorId, ScheduleID: $scheduleId, date: $date) {
      availableAppointments {
        start_time
        end_time
        is_Booked
      }
      status
      message
      success
      date
    }
  }
`;

const addAppointment = gql`
  mutation addAppointment($newAppointment: NewAppointment) {
    addAppointment(newAppointment: $newAppointment) {
      data {
        schedule
        patient
        start_time
        end_time
        doctor
        date
        createdAt
      }
      message
      status
      success
    }
  }
`;

export function DisplayDoctorByID({ doctorId }) {
  const { loading, error, data } = useQuery(getDoctorById, {
    variables: { id: doctorId },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="w-1/2 cursor-pointer m-[0.5%] py-3 px-3 border-4 border-black">
      <div className="flex">
        <img
          className="h-[100px] w-[100px] rounded-[100px]"
          src={pic}
          alt="doctor"
        ></img>
        <div className="flex items-center ps-3">
          <div>
            <h3 className="font-mono text-xl mx-1 my-1 text-nowrap font-bold">
              {data.getDoctorById.data.name}
            </h3>
            <h3 className="font-mono text-xl mx-1 my-1 font-light">
              {data.getDoctorById.data.speciality}
            </h3>
          </div>
        </div>
      </div>
      <h3 className="font-mono text-xl mx-1 my-1 font-light">
        {data.getDoctorById.data.address}
      </h3>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">
        VIEW MORE
      </button>
    </div>
  );
}

export default class DemoApp extends React.Component {
  render() {
    return (
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        dateClick={this.handleDateClick}
      />
    );
  }

  handleDateClick = (arg) => {
    alert(arg.dateStr);
  };
}

export function DisplaySlots({
  doctorId,
  scheduleId,
  date,
  onSlotStartClick,
  onSlotEndClick,
}) {
  const { loading, error, data } = useQuery(getSlots, {
    variables: { doctorId, scheduleId, date },
  });

  if (loading) return <p>Loading slots...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex ">
      {data.getSlots.availableAppointments.map((slot, index) => (
        <div
          key={index}
          className="mx-1 py-2"
          onClick={() => {
            onSlotStartClick(slot.start_time);
            onSlotEndClick(slot.end_time);
          }}
        >
          <button className="bg-blue-400 hover:bg-blue-700 text-white font-bold px-2 py-2 mx-2 rounded">
            {slot.start_time.slice(11, 16)}-{slot.end_time.slice(11, 16)}
          </button>
        </div>
      ))}
    </div>
  );
}

export function BookAppointment({
  doctor,
  schedule,
  date,
  start_time,
  end_time,
  patient,
}) {
  const [addAppointmentMutation, { loading, data, error }] =
    useMutation(addAppointment);
  console.log(data);
  const [str, setstr] = useState("");

  const handleBookAppointment = async () => {
    try {
      addAppointmentMutation({
        variables: {
          newAppointment: {
            date,
            doctor,
            patient,
            schedule,
            end_time,
            start_time,
          },
        },
      });
      console.log("Appointment booked successfully:", data);
    } catch (error) {
      console.error("Error booking appointment:", error);
    }
  };

  useEffect(() => {
    data !== undefined && setstr("Appointment🚀 Booked");
  },[data]);
  
  setTimeout(() => {
    if (str !== "") {
      setstr("");
    }
  }, 2000);

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-10"
        onClick={handleBookAppointment}
        disabled={loading} // Disable button while loading
      >
        {loading ? "Booking..." : "Book Appointment 🚀"}
      </button>
      {str}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}
