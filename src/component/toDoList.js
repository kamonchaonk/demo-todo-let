import React, { useEffect, useState, useMemo } from "react";
import { observer } from "mobx-react-lite";
import useToDoStore from "../store/toDoListStore";
import Moment from "moment";
import {
  Input,
  Modal,
  Card,
  Layout,
  Button,
  Tooltip,
  Empty,
  List,
  Tag,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  FieldTimeOutlined,
} from "@ant-design/icons";

const useToDoList = (props) => {
  const {} = props;
  const toDoListStore = useToDoStore();

  const [visible, setVisible] = useState(false);
  const [visibleForm, setVisibleForm] = useState(false);
  const [list, setList] = useState([]);

  const [titleForm, setTitleForm] = useState("");
  const [desForm, setDesForm] = useState("");
  const [headName, setHeadName] = useState("");
  const { confirm } = Modal;
  useEffect(() => {
    getList();
  }, []);

  let listTodo = useMemo(() => {
    return toDoListStore.todoList;
  }, [toDoListStore.todoList]);

  const getList = async () => {
    await toDoListStore.getToDoList();
    setList(toDoListStore.todoList);
  };

  const handleCreateTodo = () => {
    confirm({
      title: `Confirm this Create?`,
      icon: <ExclamationCircleOutlined />,

      onOk() {
        toDoListStore.createTodo(titleForm, desForm).then(() => {
          console.log(`list`);
          setTitleForm("");
          setDesForm("");
          getList();
          setVisibleForm(false);
        });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handleDetail = (e) => {
    // e.stopPropagation();
    console.log(`e`, e);
  };

  const handleUpdate = (value) => {
    console.log(`value`, value);
    confirm({
      title: `Confirm this Update ?`,
      icon: <ExclamationCircleOutlined />,

      onOk() {
        toDoListStore
          .updateToDoListById(value._id, titleForm, desForm)
          .then(() => {
            getList();
            setVisibleForm(false);
            setTitleForm("");
            setDesForm("");
          });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handleDelete = (value) => {
    console.log(`value`, value);

    confirm({
      title: `Want delete ${value.title}  ?`,
      icon: <ExclamationCircleOutlined />,

      onOk() {
        toDoListStore.deleteToDoListById(value._id).then(() => {
          getList();
        });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  console.log(`toDoListStore.todoList`, list);
  return {
    list,
    handleDetail,
    handleCreateTodo,
    handleUpdate,
    visible,
    handleCancel,
    handleDelete,
    visibleForm,
    setVisibleForm,
    titleForm,
    setTitleForm,
    desForm,
    setDesForm,
    headName,
    setHeadName,
  };
};

let ToDoListView = ({
  handleCreateTodo,
  handleDetail,
  handleUpdate,
  list,
  visible,
  // handleCancel,
  handleDelete,
  onFinish,
  visibleForm,
  onFinishFailed,
  setVisibleForm,
  titleForm,
  setTitleForm,
  desForm,
  setDesForm,
  headName,
  setHeadName,
  ...props
}) => {
  return (
    <>
      <Layout
        style={{
          justifyContent: "center",
          alignItems: "center",
          background: "#fff",
        }}
      >
        <Tooltip title="Create">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{ marginTop: "50px" }}
            onClick={() => {
              setHeadName("NEW TODO");
              setVisibleForm(true);
            }}
          >
            Create Todo
          </Button>
        </Tooltip>

        {list.length ? (
          <Card
            bordered={false}
            bodyStyle={{
              marginTop: "10%",
              padding: "25px",
              width: "800px",
              maxWidth: "100%",
              overflow: "hidden",
              boxShadow: "0 0 10px #0002",
            }}
          >
            <List
              itemLayout="horizontal"
              dataSource={list}
              renderItem={(item, index) => (
                <List.Item key={index}>
                  <List.Item.Meta
                    title={<h2>{item.title}</h2>}
                    description={
                      <>
                        {item.description}
                        <br />
                        <Tag icon={<FieldTimeOutlined />} color="warning">
                          {/* {item.updatedAt} */}
                          {Moment(item.updatedAt).format("DD-MM-YYYY")}
                        </Tag>
                      </>
                    }
                    key={item._id}
                  />

                  <Button
                    onClick={() => {
                      setHeadName("EDIT TODO");
                      setVisibleForm(true);
                      // handleUpdate(item);
                      setTitleForm(item.title);
                      setDesForm(item.description);
                    }}
                    style={{ marginRight: "10px" }}
                  >
                    <EditOutlined />
                    Update
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => {
                      handleDelete(item);
                    }}
                    // key={item._id}
                  >
                    <DeleteOutlined />
                    Delete
                  </Button>

                  <Modal
                    title={headName}
                    centered
                    visible={visibleForm}
                    onOk={() =>
                      headName === "NEW TODO"
                        ? handleCreateTodo()
                        : handleUpdate(item)
                    }
                    onCancel={() => setVisibleForm(false)}
                    width={1000}
                    // key={item._id}
                  >
                    TITLE
                    <Input
                      placeholder="Enter Title"
                      name="title"
                      value={titleForm}
                      onChange={(e) => {
                        setTitleForm(e.target.value);
                      }}
                    />
                    <br />
                    <br />
                    DESCRIPTION
                    <Input
                      placeholder="Enter Description"
                      name="description"
                      value={desForm}
                      onChange={(e) => {
                        setDesForm(e.target.value);
                      }}
                    />
                  </Modal>
                </List.Item>
              )}
            />
          </Card>
        ) : (
          <Card
            bordered={false}
            bodyStyle={{
              marginTop: "10%",
              padding: "50px",
              width: "800px",
              maxWidth: "100%",
              overflow: "hidden",
              boxShadow: "0 0 10px #0002",
            }}
          >
            <Empty> "Empty press 'Create' for add new todo" </Empty>
          </Card>
        )}
      </Layout>
    </>
  );
};

let ToDoList = observer(({ ...others }) => {
  const toDoList = useToDoList({});
  return <ToDoListView {...toDoList} {...others} />;
});

export default ToDoList;
