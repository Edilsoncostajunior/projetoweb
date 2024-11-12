'use client'
import React, { useState } from "react";
import Nav from "../../components/Nav";
import Header from "../../components/Header";
import Main from "../../components/Main";

import Patient from "../../components/PatientData";

const Home = ({params}) => {


  return (
    <div className="app">
      <Nav />
      <Main>
        <Header title="Pagina do paciente" icon="users" />
        <Patient params={params} apiUrl={"http://localhost:5000/patient/patients"} />
      </Main>
    </div>
  );
};

export default Home;
