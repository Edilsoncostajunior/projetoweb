"use client"
import style from './Nav.module.css'
import React from 'react'
import NavItem from './NavItem'

export default props =>
    <aside className={`menu-area ${style.menu_area}`}>
        <nav className={style.menu}>
            <NavItem destino="/home" titulo="home" icon="home" />
            <NavItem destino="/consultas" titulo="consultas" icon="book-medical" />
        </nav>
        <nav className={`${style.menu} ${style.bottomMenu}`}>
            <NavItem destino="/login" titulo="Log out" icon="right-to-bracket" />
        </nav>
    </aside>
