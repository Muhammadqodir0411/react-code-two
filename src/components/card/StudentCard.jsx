import PropTypes from "prop-types";

const StudentCard = ({
  order,
  firstName,
  lastName,
  group,
  age,
  id,
  editStudent,
  deleteStudent,
}) => {
  return (
    <tr>
      <td>{order}</td>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{group}</td>
      <td>{age}</td>
      <td className="text-center  ">
      <button className="btn btn-primary me-3" 
        onClick={() => editStudent(id)}>
          Edit
        </button>

        <button
          className="btn btn-danger"
          onClick={() => deleteStudent(id)}
        >
          Delete
        </button>
        
      </td>
    </tr>
  );
};

StudentCard.propTypes = {
  order: PropTypes.number,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  group: PropTypes.string,
  age: PropTypes.number,
  id: PropTypes.string,
  editStudent: PropTypes.func,
  deleteStudent: PropTypes.func,
};

export default StudentCard;
