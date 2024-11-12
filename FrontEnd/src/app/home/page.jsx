'use client'
import React, { useState } from "react";
import Nav from "../components/Nav";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import SearchBar from '../components/SearchBar';
import AddButton from '../components/AddButton';
import TabelaGestantes from "../components/PatientTable";

const Home = () => {


  return (
    <div className="app">
      <Nav />
      <Main>
        <Header title="Gestantes cadastradas" subtitle="Lista de Gestantes" icon="users" addButtonRoute="/addpatient" SearchBar={SearchBar} AddButton={AddButton}  />
        <TabelaGestantes apiUrl={"http://localhost:5000/patient/patients"} />
      </Main>
    </div>
  );
};

export default Home;
