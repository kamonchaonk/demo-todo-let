import React from "react";
import { observer } from "mobx-react-lite";
import { Form, Input, Card, Layout, Button } from "antd";
import useUserStore from "../store/userStore";
import { useHistory } from "react-router";

const useLogin = (props) => {
  const {} = props;
  const userStore = useUserStore();
  let history = useHistory();
  // useEffect(() => {
  //   if (userStore.isLogin) history.pushState("/todos");
  // }, [userStore.isLogin]);

  const onFinish = (values) => {
    userStore.login(values.username, values.password).then((res) => {
      console.log(`res`, res);
      if (res) {
        history.push("/todos");
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return { onFinish, onFinishFailed };
};

let LoginView = ({ onFinish, onFinishFailed, ...props }) => {
  return (
    <Layout
      style={{
        justifyContent: "center",
        alignItems: "center",
        background: "#fff",
      }}
    >
      <Card
        bordered={false}
        bodyStyle={{
          marginTop: "25%",
          padding: "50px",
          width: "400px",
          maxWidth: "100%",
          overflow: "hidden",
          boxShadow: "0 0 10px #0002",
        }}
      >
        <Form
          name="normal_login"
          //   className="login-form"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Enter username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Layout>
  );
};

let Login = observer(({ ...others }) => {
  const login = useLogin({});
  return <LoginView {...login} {...others} />;
});

export default Login;
