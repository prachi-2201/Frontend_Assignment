import React, { useState } from 'react';

function App() {
  const [citizen, setCitizen] = useState(false);
  const [over21, setOver21] = useState(false);

  // Step 2: Function to update checkbox value based on event.target.checked
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (name === 'citizen') {
      setCitizen(checked);
    } else if (name === 'over21') {
      setOver21(checked);
    }
  };

  return (
    <div>
      {/* Step 3: Add checkbox input element to JSX code with onChange function */}
      <label>
        Are you a citizen?
        <input
          type="checkbox"
          name="citizen"
          checked={citizen}
          onChange={handleCheckboxChange}
        />
      </label>
      <br />
      <label>
        Are you over 21?
        <input
          type="checkbox"
          name="over21"
          checked={over21}
          onChange={handleCheckboxChange}
        />
      </label>
      <br />
      {/* Dynamic display of selected options */}
      <div>
        <strong>Selected Options:</strong>
        <p>Citizen: {citizen ? 'Yes' : 'No'}</p>
        <p>Over 21: {over21 ? 'Yes' : 'No'}</p>
      </div>
    </div>
  );
}

export default App;
