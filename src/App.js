import { CarProvider } from './components/CarContext';
import CarTable from './components/CarTable';
import Layout from './components/Layout';

function App() {
  return (
    <CarProvider>
      <Layout>
        <CarTable />
      </Layout>
    </CarProvider>
  );
}

export default App;
