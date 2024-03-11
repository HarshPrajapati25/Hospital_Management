import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})



// return (
//   <div>
//     {data.getAllDoctors.data.map(({ name, speciality, id }, index) => (
//       <div
//         key={index}
//         className="border-4 border-black flex flex-col items-center mx-2 my-2 cursor-pointer"
//         onClick={() => handleDoctorClick(id)}
//       >
//         <img
//           className="h-[200px] w-[200px] rounded-[200px] mx-2 my-2"
//           src={pic}
//           alt={name}
//         />
//         <h3 className="font-mono text-xl font-bold">{name}</h3>
//         <h3 className="font-mono text-xl font-light">{speciality}</h3>
//       </div>
//     ))}
//     {selectedDoctorId && (
//       <DisplayDoctorByID doctorId={selectedDoctorId} />
//     )}
//   </div>
// );