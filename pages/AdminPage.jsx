import { useState } from "react";
import StudentModal from "../components/StudentModal.jsx";
import SubjectModal from "../components/SubjectModal.jsx";
import EnrollModal from "../components/EnrollModal.jsx";
import ViewSubjectsModal from "../components/ViewSubjectsModal.jsx";
import { useSelector, useDispatch } from "react-redux";

const AdminPage = () => {
  const students = useSelector((state) => state.students);
  const subjects = useSelector((state) => state.subjects);

  return (
    <>
      <div className="info-card">
        <div
          className="adminpage-card"
          style={{ backgroundColor: "lightpink" }}
        >
          <p>Number of Students:</p>
          <br />
          <br />
          <p style={{ fontSize: "2.3rem" }}>{students.length}</p>
        </div>

        <div
          className="adminpage-card"
          style={{ backgroundColor: "lightblue" }}
        >
          <div>Number of Subjects:</div>
          <br />
          <br />
          <p style={{ fontSize: "2.3rem" }}>{subjects.length}</p>
        </div>
      </div>

      <div className="adminpage-table">
        <ul>
          <h2>New Students</h2>
          {students
            .slice(-3)
            .reverse()
            .map((student) => (
              <li key={student.id}>
                <p className="info-table">
                  {student.id}- {student.firstName}
                </p>
                <br />
              </li>
            ))}
        </ul>

        <ul>
          <h2>Newly Added Subjects</h2>
          {subjects
            .slice(-3)
            .reverse()
            .map((subject) => (
              <li key={subject.id}>
                <div className="info-table">
                  <p>
                    {subject.id}- {subject.name}{" "}
                  </p>
                  <p className="second-line">
                    {subject.day} - {subject.start} - {subject.end}
                  </p>
                </div>
                <br />
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default AdminPage;
