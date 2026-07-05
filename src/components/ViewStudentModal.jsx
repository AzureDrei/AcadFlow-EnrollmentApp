import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { dropStudent } from "../slices/studentsSlice.js";

const ViewStudentModal = ({ studentId, onClose }) => {
  const subjects = useSelector((state) => state.subjects);
  const students = useSelector((state) => state.students);
  const dispatch = useDispatch();

  const student = students.find((student) => student.id === studentId);

  const enrolledSubjects = subjects.filter((subject) =>
    student.subjects.includes(subject.id),
  );

  const dropSubject = (subjectId) => {
    dispatch(
      dropStudent({
        studentId: studentId,
        subjectId: subjectId,
      }),
    );
  };

  return (
    <>
      <div className="modal">
        <div className="modal-content">
          <h2>Student Info:</h2>
          <ul>
            <li>ID: {student.id}</li>
            <li>First Name: {student.firstName}</li>
            <li>Last Name: {student.lastName}</li>
            <li>Course: {student.course}</li>
          </ul>
          <hr className="my-6" />
          <h2>Current Subjects</h2>
          <ul>
            {enrolledSubjects.map((enrolledsubject) => {
              return (
                <li key={enrolledsubject.id} className="subjects">
                  <li>
                    {enrolledsubject.id} - {enrolledsubject.name}{" "}
                  </li>
                  {enrolledsubject.day} • {enrolledsubject.start} -{" "}
                  {enrolledsubject.end}
                  <button
                    className="button-enroll"
                    onClick={() => dropSubject(enrolledsubject.id)}
                  >
                    Drop Subject
                  </button>
                </li>
              );
            })}
          </ul>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </>
  );
};

export default ViewStudentModal;
