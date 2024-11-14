import {
  Button,
  Checkbox,
  Flex,
  Form,
  Image,
  Input,
  Modal,
  Space,
  Table,
} from "antd";
import { useState, Fragment, useEffect } from "react";
import request from "../server";

const TeachersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form] = Form.useForm();
  const [selected, setSelected] = useState(null);
  const [isModalLoading, setIsModalLoading] = useState(false)

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      let { data } = await request.get("teachers");
      data = data.map(el => {
        el.key = el.id
        return el
      })
      setData(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const showModal = () => {
    form.resetFields();
    setSelected(null);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      setIsModalLoading(true)
      let values = await form.validateFields();
      if (selected === null) {
        await request.post("teachers", values);
      } else {
        await request.put(`teachers/${selected}`, values);
      }
      getData();
      setIsModalOpen(false);
    } catch (err) {
      console.log(err);
    } finally {
      setIsModalLoading(false)
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const editeTeacher = async (id) => {
    try {
      setIsModalOpen(true);
      setSelected(id);
      let { data } = await request.get(`teachers/${id}`);
      form.setFieldsValue(data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTeacher = async (id) => {
    Modal.confirm({
      title: "Do you want to delete this teacher?",
      onOk: async () => {
        await request.delete(`teachers/${id}`);
        getData()
      },
    });
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "avatar",
      key: "avatar",
      render: (data) => {
        return (
          <Image
            style={{
              width: "55px",
              height: "55px",
              borderRadius: "50%",
            }}
            src={data}
          ></Image>
        );
      },
    },
    {
      title: "FirstName",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "LastName",
      dataIndex: "lastName",
      key: "lastName",
    },

    {
      title: "Is Married",
      dataIndex: "isMarried",
      key: "isMarried",
      render: (data) => (data ? "Yes" : "No"),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (data) => (
        <Space size="middle">
          <Button type="primary" onClick={() => editeTeacher(data)}>
            Edit
          </Button>
          <Button type="primary" danger onClick={() => deleteTeacher(data)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  console.log(error);

  return (
    <Fragment>
      <Table
        scroll={{
          x: 1000,
        }}
        title={() => (
          <Flex justify="space-between" align="center">
            <h1>Teachers ({data.length})</h1>
            <Button type="dashed" onClick={showModal}>
              Add teacher
            </Button>
          </Flex>
        )}
        loading={loading}
        columns={columns}
        dataSource={data}
      />
      <Modal
        title="Teacher data"
        open={isModalOpen}
        onOk={handleOk}
        okText={selected === null ? "Add teacher" : "Save teacher"}
        onCancel={closeModal}
        initialValues={{
          isMarried: false,
        }}
        maskClosable={false}
        confirmLoading={isModalLoading}
      >
        <Form
          form={form}
          name="teacher"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="firstName"
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="lastName"
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Image"
            name="avatar"
            rules={[
              {
                required: true,
                message: "Please fill!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="isMarried" valuePropName="checked">
            <Checkbox>Is married</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default TeachersPage;
