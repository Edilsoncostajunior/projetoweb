'use client'
import React, { useState } from "react";
import Nav from "../components/Nav";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import SearchBar from '../components/SearchBar';
import AddButton from '../components/AddButton';
import TabelaGestantes from "../components/TabelaGestantes";
import Gestante from "../core/Gestante";

const Home = () => {
  const [gestantes, setGestantes] = useState([
    new Gestante(1, 'Maria', 25, 'maria@email.com', '2022-01-01', 0, '2022-07-01', 20, ['diabetes'], ['penicilina']),
    new Gestante(2, 'Joana', 30, 'joana@email.com', '2021-12-15', 1, '2022-06-15', 22, ['hipertensão'], ['aspirina']),
    new Gestante(3, 'Ana', 28, 'ana@email.com', '2022-02-10', 2, '2022-08-10', 18, ['asma'], ['ibuprofeno']),
    new Gestante(4, 'Luisa', 32, 'luisa@email.com', '2021-11-20', 0, '2022-05-20', 24, ['obesidade'], ['codeína']),
    new Gestante(5, 'Sofia', 26, 'sofia@email.com', '2022-03-05', 1, '2022-09-05', 20, ['anemia'], ['cefalexina']),
    new Gestante(3, 'Ana', 28, 'ana@email.com', '2022-02-10', 2, '2022-08-10', 18, ['asma'], ['ibuprofeno']),
    new Gestante(4, 'Luisa', 32, 'luisa@email.com', '2021-11-20', 0, '2022-05-20', 24, ['obesidade'], ['codeína']),
    new Gestante(5, 'Sofia', 26, 'sofia@email.com', '2022-03-05', 1, '2022-09-05', 20, ['anemia'], ['cefalexina']),
    new Gestante(3, 'Ana', 28, 'ana@email.com', '2022-02-10', 2, '2022-08-10', 18, ['asma'], ['ibuprofeno']),
    new Gestante(4, 'Luisa', 32, 'luisa@email.com', '2021-11-20', 0, '2022-05-20', 24, ['obesidade'], ['codeína']),
    new Gestante(5, 'Sofia', 26, 'sofia@email.com', '2022-03-05', 1, '2022-09-05', 20, ['anemia'], ['cefalexina']),
    new Gestante(3, 'Ana', 28, 'ana@email.com', '2022-02-10', 2, '2022-08-10', 18, ['asma'], ['ibuprofeno']),
    new Gestante(4, 'Luisa', 32, 'luisa@email.com', '2021-11-20', 0, '2022-05-20', 24, ['obesidade'], ['codeína']),
    new Gestante(5, 'Sofia', 26, 'sofia@email.com', '2022-03-05', 1, '2022-09-05', 20, ['anemia'], ['cefalexina']),
    new Gestante(3, 'Ana', 28, 'ana@email.com', '2022-02-10', 2, '2022-08-10', 18, ['asma'], ['ibuprofeno']),
    new Gestante(4, 'Luisa', 32, 'luisa@email.com', '2021-11-20', 0, '2022-05-20', 24, ['obesidade'], ['codeína']),
    new Gestante(5, 'Sofia', 26, 'sofia@email.com', '2022-03-05', 1, '2022-09-05', 20, ['anemia'], ['cefalexina']),
    new Gestante(3, 'Ana', 28, 'ana@email.com', '2022-02-10', 2, '2022-08-10', 18, ['asma'], ['ibuprofeno']),
    new Gestante(4, 'Luisa', 32, 'luisa@email.com', '2021-11-20', 0, '2022-05-20', 24, ['obesidade'], ['codeína']),
    new Gestante(5, 'Sofia', 26, 'sofia@email.com', '2022-03-05', 1, '2022-09-05', 20, ['anemia'], ['cefalexina']),
    new Gestante(3, 'Ana', 28, 'ana@email.com', '2022-02-10', 2, '2022-08-10', 18, ['asma'], ['ibuprofeno']),
    new Gestante(4, 'Luisa', 32, 'luisa@email.com', '2021-11-20', 0, '2022-05-20', 24, ['obesidade'], ['codeína']),
    new Gestante(5, 'Sofia', 26, 'sofia@email.com', '2022-03-05', 1, '2022-09-05', 20, ['anemia'], ['cefalexina']),
    new Gestante(3, 'Ana', 28, 'ana@email.com', '2022-02-10', 2, '2022-08-10', 18, ['asma'], ['ibuprofeno']),
    new Gestante(4, 'Luisa', 32, 'luisa@email.com', '2021-11-20', 0, '2022-05-20', 24, ['obesidade'], ['codeína']),
    new Gestante(5, 'Sofia', 26, 'sofia@email.com', '2022-03-05', 1, '2022-09-05', 20, ['anemia'], ['cefalexina']),
  ]);

  const tabelaGestantes = new TabelaGestantes({ gestantes });

  return (
    <div className="app">
      <Nav />
      <Main>
        <Header title="Gestantes cadastradas" subtitle="Lista de Gestantes" icon="users" SearchBar={SearchBar} AddButton={AddButton} />
        <div dangerouslySetInnerHTML={{ __html: tabelaGestantes.render() }} />
      </Main>
      <Footer />
    </div>
  );
};

export default Home;
