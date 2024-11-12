'use client'
import Sidebar from '../components/Nav';
import Header from '../components/Header';
import ConsultaTable from '../components/ConsultaTable';
import SearchBar from '../components/SearchBar';
import AddButton from '../components/AddButton';
import Main from '../components/Main';

export default function ConsultaPage() {
  return (

    <div  className="app">
        <Sidebar />
        <Main>
        <Header title="Consultas" subtitle="Lista de todas as consultas" icon="book-medical" SearchBar={SearchBar}  />
        <ConsultaTable apiUrl={"http://localhost:5000/consulta/consultas"} />
        </Main>
    </div>

  );
}
