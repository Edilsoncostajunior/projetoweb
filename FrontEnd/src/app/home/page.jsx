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
  

  return (
    <div className="app">
      <Nav />
      <Main>
        <Header title="Gestantes cadastradas" subtitle="Lista de Gestantes" icon="users" SearchBar={SearchBar} AddButton={AddButton} />
        <TabelaGestantes > </TabelaGestantes>

      </Main>
      <Footer />
    </div>
  );
};

export default Home;
