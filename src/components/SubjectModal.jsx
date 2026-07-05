import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const SubjectModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [day, setDay] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const dispatch = useDispatch();

  const addSubjectName = () => {
    dispatch({
      type: "subjects/addSubjects",
      payload: { name, day, start, end },
    });
    setName("");
    setDay("");
    setStart("");
    setEnd("");
  };

  return (
    <>
      <button onClick={() => setShowModal(true)}>Add Subject</button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addSubjectName();
              }}
            >
              <h2>Add Subject</h2>

              <input
                type="text"
                placeholder="Subject Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <br />

              <p>Day:</p>
              <select
                value={day}
                onChange={(e) => setDay(e.target.value)}
                required
              >
                <option value="">Select Day</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
              </select>
              <br />
              <br />
              <p>Time:</p>
              <select
                value={start}
                onChange={(e) => setStart(e.target.value)}
                required
              >
                <option value="">Select Start Time</option>
                <option value="8:00">8:00AM</option>
                <option value="9:00">9:00AM</option>
                <option value="10:00">10:00AM</option>
                <option value="11:00">11:00AM</option>
                <option value="12:00">12:00AM</option>
                <option value="1:00">1:00PM</option>
                <option value="2:00">2:00PM</option>
                <option value="3:00">3:00PM</option>
                <option value="4:00">4:00PM</option>
                <option value="5:00">5:00PM</option>
              </select>

              <select
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                required
              >
                <option value="">Select End Time</option>
                <option value="8:00">8:00AM</option>
                <option value="9:00">9:00AM</option>
                <option value="10:00">10:00AM</option>
                <option value="11:00">11:00AM</option>
                <option value="12:00">12:00AM</option>
                <option value="1:00">1:00PM</option>
                <option value="2:00">2:00PM</option>
                <option value="3:00">3:00PM</option>
                <option value="4:00">4:00PM</option>
                <option value="5:00">5:00PM</option>
              </select>
              <br />
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

export default SubjectModal;
