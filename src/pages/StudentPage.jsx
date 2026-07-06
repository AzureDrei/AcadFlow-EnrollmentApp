import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import applogo from "../image/AcadFlow-Icon.png";

const StudentPage = () => {
  const students = useSelector((state) => state.students);
  const subjects = useSelector((state) => state.subjects);
  const [findStudent, setFindStudent] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const dispatch = useDispatch();

  const findStudentInfo = () => {
    const studentInfo = students.find(
      (student) => String(student.id) === findStudent,
    );
    setSelectedStudentId(studentInfo ? studentInfo.id : null);
  };

  const student = students.find((student) => student.id === selectedStudentId);

  const renderSearchBar = () => {
    return (
      <>
        <img src={applogo} alt="Application Logo" width="150" />
        <br></br>
        <input
          className="input-style"
          type="text"
          placeholder="Please Enter StudentID"
          value={findStudent}
          onChange={(event) => setFindStudent(event.target.value)}
        />

        <button onClick={findStudentInfo}>Search</button>
      </>
    );
  };

  if (!student) {
    return (
      <>
        <div className="layout">
          {renderSearchBar()}
          <ul>
            <li className="bottom-item-student">
              <Link to="/">Back to Home</Link>
            </li>
          </ul>
        </div>
      </>
    );
  }

  const enrolledSubjects = subjects.filter((subject) =>
    student.subjects.includes(subject.id),
  );

  return (
    <>
      <div className="layout">
        {renderSearchBar()}

        <h2>Student Info</h2>
        <ul>
          <li>ID: {student.id}</li>
          <li>First Name: {student.firstName}</li>
          <li>Last Name: {student.lastName}</li>
          <li>Course: {student.course}</li>
        </ul>
        <br />
        <h2>Current Subjects</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-blue-200">
                <th className="px-3 py-2 text-left">ID</th>
                <th className="px-3 py-2 text-left">Subject</th>
                <th className="px-3 py-2 text-left">Day</th>
                <th className="px-3 py-2 text-left">Start</th>
                <th className="px-3 py-2 text-left">End</th>
              </tr>
            </thead>

            <tbody>
              {enrolledSubjects.map((enrolledsubject) => {
                return (
                  <tr key={enrolledsubject.id}>
                    <td className="px-3 py-2">{enrolledsubject.id}</td>
                    <td className="px-3 py-2">{enrolledsubject.name}</td>
                    <td className="px-3 py-2">{enrolledsubject.day}</td>
                    <td className="px-3 py-2">{enrolledsubject.start}</td>
                    <td className="px-3 py-2">{enrolledsubject.end}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <ul>
          <li className="bottom-item-student">
            <Link to="/">Back to Home</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default StudentPage;
