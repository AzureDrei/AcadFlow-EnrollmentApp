import { useSelector, useDispatch } from "react-redux";
import { deleteStudent } from "../slices/studentsSlice.js";
import StudentModal from "../components/StudentModal.jsx";
import ViewStudentModal from "../components/ViewStudentModal.jsx";
import { useState } from "react";

const StudentPageAdmin = () => {
  const [viewStudents, setviewStudents] = useState("");
  const [showModal, setShowModal] = useState(false);
  const subjects = useSelector((state) => state.subjects);
  const students = useSelector((state) => state.students);

  const dispatch = useDispatch();

  const student = students.find((student) => student.id === viewStudents);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-200">
              <th className="px-3 py-2 text-left">ID</th>
              <th className="px-3 py-2 text-left">First Name</th>
              <th className="px-3 py-2 text-left">Last Name</th>
              <th className="px-3 py-2 text-left">Course</th>
              <th className="px-3 py-2 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td className="px-3 py-2">{student.id}</td>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.course}</td>
                <td className="px-3 py-2 space-x-2">
                  <button
                    button
                    onClick={() => {
                      setviewStudents(student.id);
                      setShowModal(true);
                    }}
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      if (student.subjects.length > 0) {
                        alert("Please drop all of the students subjects before deleting");
                      } else {
                        dispatch(deleteStudent(student.id));
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <StudentModal />
      {showModal && (
        <ViewStudentModal
          studentId={viewStudents}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default StudentPageAdmin;
