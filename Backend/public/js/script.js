// Fetch data from GraphQL API
async function fetchData() {
  const response = await fetch("/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: "{ getDoctor { name specialist location } }",
    }),
  });
  const { data } = await response.json();
  return data.getDoctor;
}

// Display data on the webpage
async function displayData() {
  const doctorList = document.getElementById("doctorList");
  const doctors = await fetchData();

  doctors.forEach((doctor) => {
    const doctorItem = document.createElement("div");
    doctorItem.innerHTML = `
            <p>Name: ${doctor.name}</p>
            <p>Specialist: ${doctor.specialist}</p>
            <p>Location: ${doctor.location}</p>
          `;
    doctorList.appendChild(doctorItem);
  });
}

displayData();
