import { Layout, ConfigProvider, theme } from "antd";
import UsersPage from "./pages/UserPage";
import "./App.css";

const { Header, Content } = Layout;

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#C6A75E",
          colorInfo: "#C6A75E",
          colorSuccess: "#A67C00",

          colorBgLayout: "#111111",
          colorBgContainer: "#1c1c1c",
          colorBorder: "#2a2a2a",

          borderRadius: 10,
          fontFamily: `"Inter", sans-serif`,
        },

        components: {
          Layout: {
            headerBg: "#000000",
          },

          Table: {
            headerBg: "#141414",
            headerColor: "#C6A75E",
            rowHoverBg: "#222222",
            borderColor: "#2a2a2a",
          },

          Drawer: {
            colorBgElevated: "#1c1c1c",
          },

          Button: {
            colorPrimaryHover: "#b8954f",
            colorPrimaryActive: "#a67c00",
          },
        },
      }}
    >
      <Layout style={{ minHeight: "100vh" }}>
        <Header
          className="header"
        >
          Dynamic Entity Manager
        </Header>

        <Content
          className="content"
        >
        </Content>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
