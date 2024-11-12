import { Col, Container, Row } from "react-bootstrap";
import StudentForm from "../components/form/StudentForm";
import StudentHeader from "../components/header/StudentHeader";
import StudentTabel from "../components/table/StudentTabel";
import { useState } from "react";
import { v4 } from "uuid";

const StudentPage = () => {
  const [students, setStudents] = useState(
    JSON.parse(localStorage.getItem("students")) || []
  );
  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    group: "",
    age: "",
  });
  const [validated, setValidated] = useState(false);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [group, setGroup] = useState("all");

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity()) {
      let newStudent = { ...student, age: +student.age, id: v4() };
      let newStudents;
      if (selected === null) {
        newStudents = [...students, newStudent];
      } else {
        newStudents = students.map((student) => {
          if (student.id === selected) {
            return newStudent;
          } else {
            return student;
          }
        });
      }
      setStudents(newStudents);
      resetStudent();
      setSelected(null);
      localStorage.setItem("students", JSON.stringify(newStudents));
    } else {
      setValidated(true);
    }
  };

  const resetStudent = () => {
    setStudent({
      firstName: "",
      lastName: "",
      group: "",
      age: "",
    });
  };

  const handleStudent = (e) => {
    setStudent({ ...student, [e.target.id]: e.target.value });
  };

  const editStudent = (id) => {
    let student = students.find((student) => student.id === id);
    setSelected(id);
    setStudent(student);
  };

  const deleteStudent = (id) => {
    let newStudents = students.filter((student) => student.id !== id);
    setStudents(newStudents);
    localStorage.setItem("students", JSON.stringify(newStudents));
  };

  return (
    <Container className="pt-3">
      <Row>
        <Col md="4">
          <StudentForm
            resetStudent={resetStudent}
            student={student}
            validated={validated}
            handleStudent={handleStudent}
            handleSubmit={handleSubmit}
            selected={selected}
          />
        </Col>
        <Col md="8">
          <StudentHeader
            setSearch={setSearch}
            search={search}
            group={group}
            setGroup={setGroup}
          />
          <StudentTabel
            group={group}
            search={search}
            students={students}
            editStudent={editStudent}
            deleteStudent={deleteStudent}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default StudentPage;
