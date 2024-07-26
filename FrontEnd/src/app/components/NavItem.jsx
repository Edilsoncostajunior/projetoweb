import Link from "next/link";
import '@fortawesome/fontawesome-free/css/all.min.css';

function Navbar(params) {
    return (
        <Link legacyBehavior href={params.destino}>
            <a className="flex items-center">
                <i className={`fa fa-${params.icon} mr-5`} style={{ minWidth: '1.25rem', textAlign: 'center' }}></i>
                <span>{params.titulo}</span>
            </a>
        </Link>
    );
}

export default Navbar;
