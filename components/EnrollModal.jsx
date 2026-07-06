import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { enrollSubject, dropStudent } from "../slices/studentsSlice.js";

const EnrollModal = () => {
  const students = useSelector((state) => state.students);
  const subjects = useSelector((state) => state.subjects);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [findStudent, setFindStudent] = useState("");
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
        <input
          className="input-style"
          type="text"
          placeholder="Enter StudentID"
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
        {renderSearchBar()}

        <p>Please input Student ID.</p>
      </>
    );
  }

  const enrolledSubjects = subjects.filter((subject) =>
    student.subjects.includes(subject.id),
  );

  const handleSubject = (subjectId) => {
    dispatch(
      enrollSubject({
        studentId: selectedStudentId,
        subjectId: subjectId,
      }),
    );
  };

  const dropSubject = (subjectId) => {
    dispatch(
      dropStudent({
        studentId: selectedStudentId,
        subjectId: subjectId,
      }),
    );
  };

  const convertToMinutes = (time) => {
    const [hours, minutes] = time.split(":");

    const convertHours = Number(hours) * 60;
    return convertHours + Number(minutes);
  };

  //conflict logic
  const conflictSched = (subject) => {
    const subjectSubjStart = convertToMinutes(subject.start);
    const subjectSubjEnd = convertToMinutes(subject.end);

    return enrolledSubjects.some((enrolledSubject) => {
      const enrolledSubjStart = convertToMinutes(enrolledSubject.start);
      const enrolledSubjEnd = convertToMinutes(enrolledSubject.end);

      return (
        subject.day === enrolledSubject.day &&
        subjectSubjStart < enrolledSubjEnd &&
        subjectSubjEnd > enrolledSubjStart
      );
    });
  };

  return (
    <>
      {renderSearchBar()}
      <div className="overflow-x-auto">
        <table className="min-w-full ">
          <thead>
            <tr className="bg-blue-200">
              <th className="py-2 text-left">ID</th>
              <th className="py-2 text-left">First Name</th>
              <th className="py-2 text-left">Last Name</th>
              <th className="py-2 text-left">Course</th>
              <th className="py-2 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>{student.id}</td>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.course}</td>
              <td>
                <button
                  onClick={() => {
                    setSelectedStudentId(student.id);
                    setShowModal(true);
                  }}
                >
                  Enroll
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {showModal && (
        <div>
          <hr className="my-6" />
          <h2>Student Info</h2>
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
          <hr className="my-6" />
          <h2>Available Subjects</h2>
          <ul>
            {subjects.map((subject) => {
              const hasConflict = conflictSched(subject);

              return (
                <li key={subject.id} className="subjects">
                  <li>
                    {subject.id} - {subject.name}{" "}
                  </li>{" "}
                  {subject.day} • {subject.start} - {subject.end}
                  <button
                    className="button-enroll"
                    disabled={conflictSched(subject)}
                    onClick={() => handleSubject(subject.id)}
                  >
                    Enroll
                  </button>
                </li>
              );
            })}
          </ul>
          <button onClick={() => setShowModal(false)}>Close</button>
        </div>
      )}
    </>
  );
};

export default EnrollModal;
