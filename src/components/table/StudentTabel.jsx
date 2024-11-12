import { Table } from "react-bootstrap";
import PropTypes from "prop-types";
import StudentCard from "../card/StudentCard";

const StudentTabel = ({ students, editStudent, deleteStudent, search, group }) => {
  let results = students.filter((student) => 
    student.firstName.toLowerCase().includes(search) ||
    student.lastName.toLowerCase().includes(search)
  );

  if (group !== 'all') {
    results = results.filter((student) => student.group === group)
  }

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Group</th>
            <th>Age</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {results.length !== 0 ? (
            results.map((student, i) => {
              return (
                <StudentCard
                  {...student}
                  key={student.id}
                  order={i + 1}
                  editStudent={editStudent}
                  deleteStudent={deleteStudent}
                />
              );
            })
          ) : (
            <tr>
              <td className="text-center" colSpan={6}>
                No students
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

StudentTabel.propTypes = {
  students: PropTypes.array,
  editStudent: PropTypes.func,
  deleteStudent: PropTypes.func,
  search: PropTypes.string,
  group: PropTypes.string,

};

export default StudentTabel;
