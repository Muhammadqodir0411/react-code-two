import { Form, InputGroup } from "react-bootstrap";
import { groups } from "../../data/groups";
import PropTypes from "prop-types";

const StudentHeader = ({ search, setSearch, group, setGroup }) => {
  return (
    <div>
      <InputGroup className="mt-4">
        <Form.Control
          placeholder="Searching Student..."
          value={search}
          onChange={(e) => setSearch(e.target.value.trim().toLowerCase())}
        />
        <InputGroup.Text>
          <Form.Select value={group} onChange={(e) => setGroup(e.target.value)}>
            <option value="all">All groups</option>
            {groups.map((group) => {
              return (
                <option key={group} value={group}>
                  {group}
                </option>
              );
            })}
          </Form.Select>
        </InputGroup.Text>
      </InputGroup>
    </div>
  );
};

StudentHeader.propTypes = {
  search: PropTypes.string,
  setSearch: PropTypes.func,
  group: PropTypes.string,
  setGroup: PropTypes.func,
};

export default StudentHeader;
