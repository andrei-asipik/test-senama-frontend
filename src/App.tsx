import { Content, Footer, Header } from 'antd/es/layout/layout';
import './App.css';
import { Layout } from 'antd';
import CarsTable from './components/CarsTable/CarsTable';

function App() {
  return (
    <>
      <Layout>
        <Header>Header</Header>
        <Content>
          <CarsTable />
        </Content>
        <Footer>2024</Footer>
      </Layout>
    </>
  );
}

export default App;
