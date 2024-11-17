'use client'
import Sidebar from '../components/Nav';
import Header from '../components/Header';
import AddPatientForm from '../components/AddPatientForm';
import Main from '../components/Main';
export default function AddPatient() {
  return (
    <div className="app">
        <Sidebar />
        <Main>
            <Header title="Adicionar consulta"  icon="users" />
            <AddPatientForm />
        </Main>
    </div>
  );
}
