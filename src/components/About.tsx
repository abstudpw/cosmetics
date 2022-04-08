import * as React from "react";

export default function About() {

    return (
        <div >
            <p>Aplikacja została stworzona w ramach projektu z przedmiotu "Architektury i technologie systemów internetowych" za pomocą:</p>
            <ol>
                <li>Języka programowania Javascript i Typescript.</li>
                <li>Biblioteki gł&oacute;wnej React &ndash; z racji większego doświadczenia zawodowego z biblioteką.</li>
                <li>Biblioteki Redux do zarządzania stanem aplikacji.</li>
                <li>Biblioteka layoutu to Material UI &ndash; najpopularniejsza biblioteka dla Reacta.</li>
                <li>Biblioteka github pages &ndash; umożliwia deploy aplikacji pod adresem udostępnionym przez github.com</li>
            </ol>
        </div>
    );
}