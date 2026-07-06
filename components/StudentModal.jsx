import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Modal.css";

const StudentModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [course, setCourse] = useState("");
  const dispatch = useDispatch();

  const addStudentName = () => {
    dispatch({
      type: "students/addStudent",
      payload: { firstName, lastName, course },
    });
    setFirstName("");
    setLastName("");
    setCourse("");
  };

  return (
    <>
      <button onClick={() => setShowModal(true)}>Add Student</button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addStudentName();
              }}
            >
              <h2>Add Student</h2>
              <input
                type="text"
                placeholder="Student First Name"
                value={firstName}
                onChange={(e) => {
                  const value = e.target.value;

                  if (/^[A-Za-z\s]*$/.test(value)) {
                    setFirstName(value);
                  }
                }}
                required
              />

              <input
                type="text"
                placeholder="Student Last Name"
                value={lastName}
                onChange={(e) => {
                  const value = e.target.value;

                  if (/^[A-Za-z\s]*$/.test(value)) {
                    setLastName(value);
                  }
                }}
                required
              />

              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                required
              >
                <option value="">Select Course</option>
                <option value="BSCS">BS Computer Science</option>
                <option value="BSIT">BS Information Technology</option>
                <option value="BSIS">BS Information Systems</option>
                <option value="BSN">BS Nursing</option>
              </select>
              <br />
              <button type="submit">Save</button>

              <button type="button" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentModal;
