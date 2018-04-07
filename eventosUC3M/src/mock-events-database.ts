import {Event} from './models/event.model';

export const EVENTS: Event[] = [
    {name: 'Conferencia sobre Ciberseguridad', 
    photo: 'http://cdn5.icemd.com/app/uploads/2016/09/Programa-Superior-Ciberseguridad-Compliance-ficha.jpg',
    date: new Date("May 4, 2018 10:30:00"),
    campus: 'Colmenarejo',
    classroom: '1.1.A04',
    credits: 3,
    organizer: 'Lorena Juan García',
    contact: 'lorenajg@gmail.com',
    description: 'Organizado por esta Escuela Politécnica Superior con la colaboración de ISACA (Information Systems Audit and Control Association) se va a celebrar un ciclo de conferencias sobre seguridad cuyo calendario y temas figuran esta página Web.',
    categories:  ['Ciberseguridad', 'Informática'],
    inscriptions: 0,
    webpage:'www.uc3m.com'
    },
    {name: 'Clase abierta de Historia de la música ', 
    photo: 'http://www.historyrocket.com/images/Caribbean-Music-History.jpg',
    date: new Date("May 12, 2018 17:00:00"),
    campus: 'Getafe',
    classroom: 'Salón de Grados',
    organizer: 'Ángel Recas',
    contact: 'angelrecas@gmail.com',
    description: 'En el marco de la asignatura de Humanidades “Historia de la música”. Ángel Recas interpreta al piano el Viacrucis de Franz Listz.',
    categories:  ['Historia', 'Música'],
    inscriptions: 0,
    webpage:'www.uc3m.com'
    },
    {name: 'Torneo de baloncesto 3x3', 
    photo: 'http://blog.schoolspecialty.com/wp-content/uploads/2016/03/main-26.jpg',
    date: new Date("May 2, 2018 11:00:00"),
    campus: 'Leganés',
    classroom: 'Polideportivo Alfredo di Stéfano y Plaza Pública',
    organizer: 'Polideportivo',
    contact: 'polideportivo@gmail.com',
    description: 'Torneo de baloncesto en el que los equipos compiten 3 contra 3 en una canasta, y en el que como mínimo disputarán dos partidos. 6 euros de inscripción.',
    categories:  ['Deporte'],
    inscriptions: 0  
    },
    {name: 'Taller de Improvisación ', 
    photo: 'https://lh3.googleusercontent.com/-UbCwqREaXs0/WWZHO-XI1pI/AAAAAAAAEKc/ONVd6q0qOpUlJpPAhOZaC7lddhVz91HlwCHMYCw/improvisation_thumb3?imgmax=800',
    date: new Date("May 23, 2018 18:00:00"),
    campus: 'Getafe',
    classroom: 'Aula de las Artes',
    organizer: 'Servicio de Aula de las Artes',
    contact: 'artes@gmail.com',
    credits: 3,
    description: 'Taller de movimiento y expresión corporal a través de la improvisación: 6 €, además podrá participarse en la muestra del trabajo realizado en el Ciclo Imprevisto.',
    categories:  ['Teatro'],
    inscriptions: 0   
    } 

];