import './App.css';
import PatientList from './components/PatientList';
import { QueryClient, QueryClientProvider } from 'react-query';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1 className="text-3xl font-semibold mt-8 mb-4">
          Patient list:
        </h1>
        <div>
          <PatientList/>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
