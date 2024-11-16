import { Content, Footer, Header } from 'antd/es/layout/layout';
import './App.css';
import { Layout } from 'antd';
import CarTable from './components/Table/Table';

function App() {
  return (
    <>
      <Layout>
        <Header>Header</Header>
        <Content>
          <CarTable></CarTable>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </>
  );
}

export default App;
