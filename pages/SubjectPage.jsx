import { useState } from "react";
import SubjectModal from "../components/SubjectModal.jsx";
import ViewSubjectsModal from "../components/ViewSubjectsModal.jsx";
import { useSelector, useDispatch } from "react-redux";
import { deleteSubjects } from "../slices/subjectsSlice.js";

const SubjectPage = () => {
  const [viewSubjects, setViewSubjects] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const subjects = useSelector((state) => state.subjects);
  const students = useSelector((state) => state.students);
  const dispatch = useDispatch();

  const isEnrolled = (subjectId) => {
    students.some((student) => student.subjects.includes(subjectId));
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-200">
              <th className="px-3 py-2 text-left">ID</th>
              <th className="px-3 py-2 text-left">Subject</th>
              <th className="px-3 py-2 text-left">Day</th>
              <th className="px-3 py-2 text-left">Start</th>
              <th className="px-3 py-2 text-left">End</th>
              <th className="px-3 py-2 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {subjects.map((subject) => (
              <tr key={subject.id}>
                <td className="px-3 py-2">{subject.id}</td>
                <td className="px-3 py-2">{subject.name}</td>
                <td className="px-3 py-2">{subject.day}</td>
                <td className="px-3 py-2">{subject.start}</td>
                <td className="px-3 py-2">{subject.end}</td>
                <td className="px-3 py-2 space-x-2">
                  <button
                    onClick={() => {
                      setViewSubjects(subject.id);
                      setShowModal(true);
                    }}
                  >
                    View
                  </button>

                  <button
                    onClick={() => {
                      if (isEnrolled(subject.id)) {
                        alert(
                          "Please Drop all students before Deleting the subject",
                        );
                      } else {
                        dispatch(deleteSubjects(subject.id));
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

      <SubjectModal />
      {showModal && (
        <ViewSubjectsModal
          subjectId={viewSubjects}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};
export default SubjectPage;
