import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { dropStudent } from "../slices/studentsSlice.js";

const ViewSubjectsModal = ({ subjectId, onClose }) => {
  const subjects = useSelector((state) => state.subjects);
  const students = useSelector((state) => state.students);
  const dispatch = useDispatch();

  const enrolledStudents = students.filter((student) =>
    student.subjects.includes(subjectId),
  );

  const subjectDetails = subjects.find((subject) => subject.id === subjectId);

  const handleStudent = (studentId) => {
    dispatch(
      dropStudent({
        studentId,
        subjectId,
      }),
    );
  };

  return (
    <>
      <div className="modal">
        <div className="modal-content">
          <h2>Subject:</h2>
          <h2>
            {subjectDetails.id} - {subjectDetails.name}
          </h2>
          <p>
            {subjectDetails.day} • {subjectDetails.start} - {subjectDetails.end}
          </p>

          <hr className="my-6" />
          <ul>
            <h2>Enrolled Students:</h2>
            {enrolledStudents.map((student) => (
              <li key={student.id} className="subjects">
                {student.id} - {student.firstName} {student.lastName} -{" "}
                {student.course}
                <button
                  className="button-enroll"
                  onClick={() => handleStudent(student.id)}
                >
                  Drop Student
                </button>
              </li>
            ))}
          </ul>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </>
  );
};

export default ViewSubjectsModal;
