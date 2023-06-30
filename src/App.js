import { CarProvider } from './components/CarContext';
import CarTable from './components/CarTable';
import Layout from './components/Layout';

function App() {
  return (
    <Layout>
      <CarProvider>
        <CarTable />
      </CarProvider>
    </Layout>
  );
}

export default App;
