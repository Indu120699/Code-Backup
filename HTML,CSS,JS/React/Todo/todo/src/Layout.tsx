import React, { useState } from "react";
import { Layout, Menu, theme } from "antd";
import Forms from "./Table";
import { UserOutlined } from "@ant-design/icons";
const { Header, Content, Footer, Sider } = Layout;

const Apps: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [isTableVisible, setIsTableVisible] = useState(false);

  const handleMenuClick = () => {
    setIsTableVisible(true);
  };

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "Todo List",
              onClick: handleMenuClick,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            textAlign: "center",
            backgroundColor: "salmon",
            color: "black",
            background: colorBgContainer,
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          TODO LIST
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            {isTableVisible && <Forms />}{" "}
            {/* Render the TableComponent only if isTableVisible is true */}
          </div>
        </Content>
        <Footer style={{ textAlign: "center", backgroundColor: "salmon" }}>
          ToDo List of ©2023 Created by Joyit
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Apps;
