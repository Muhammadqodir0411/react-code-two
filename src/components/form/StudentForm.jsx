import { Button, Form } from "react-bootstrap";
import { groups } from "../../data/groups";
import PropTypes from "prop-types";

const StudentForm = ({
  validated,
  handleSubmit,
  student: { firstName, lastName, age, group },
  handleStudent,
  selected,
  resetStudent,
}) => {
  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group controlId="firstName">
        <Form.Label>First name</Form.Label>
        <Form.Control
          onChange={handleStudent}
          value={firstName}
          required
          type="text"
          className="pt-2"
        />
        <Form.Control.Feedback type="invalid">
          Please fill
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="lastName">
        <Form.Label className="pt-2">Last name</Form.Label>
        <Form.Control
          onChange={handleStudent}
          value={lastName}
          required
          type="text"
        />
        <Form.Control.Feedback type="invalid">
          Please fill
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="group">
        <Form.Label className="pt-2">Groups</Form.Label>
        <Form.Select onChange={handleStudent} value={group}>
          <option value="all">All groups</option>
          {groups.map((group) => {
            return (
              <option key={group} value={group}>
                {group}
              </option>
            );
          })}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          Please fill
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="age">
        <Form.Label className="pt-2">Age</Form.Label>
        <Form.Control
          onChange={handleStudent}
          value={age}
          required
          type="number"
        />
        <Form.Control.Feedback type="invalid">
          Please fill
        </Form.Control.Feedback>
      </Form.Group>
      <Button className="mt-3 w-100" type="submit">
        {selected === null ? "Add student" : "Save student"}
      </Button>

      <Button
        className="mt-3 w-100 btn btn-info text-white"
        onClick={() => resetStudent()}
      >
        Reset
      </Button>
    </Form>
  );
};

StudentForm.propTypes = {
  validated: PropTypes.bool,
  handleSubmit: PropTypes.func,
  student: PropTypes.object,
  handleStudent: PropTypes.func,
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  resetStudent: PropTypes.func,
};

export default StudentForm;
