import {Notification} from './models/notification.model';

export const NOTIFICATIONS: Notification[] = [
    {
        event:     {name: 'Taller de Improvisación ', 
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
        },
        type: 'modificado',
        date: new Date("May 15, 2018 15:12:03")
    },
    {
        event:     {name: 'Torneo de baloncesto 3x3', 
        photo: 'http://blog.schoolspecialty.com/wp-content/uploads/2016/03/main-26.jpg',
        date: new Date("May 2, 2018 11:00:00"),
        campus: 'Leganés',
        classroom: 'Polideportivo Alfredo di Stéfano y Plaza Pública',
        organizer: 'Polideportivo',
        contact: 'polideportivo@gmail.com',
        description: 'Torneo de baloncesto en el que los equipos compiten 3 contra 3 en una canasta, y en el que como mínimo disputarán dos partidos. 6 euros de inscripción.',
        categories:  ['Deporte'],
        inscriptions: 0,
        credits: 0  
        },
        type: 'cancelado',
        date: new Date("April 18, 2018 9:43:12")
    }
];