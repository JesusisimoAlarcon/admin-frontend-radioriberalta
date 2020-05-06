export const NoticiasTestNav = [   
    {
        icon: 'pe-7s-medal',
        label: 'NOTICIAS',
        content: [
            {
                label: 'Agregar nueva noticia',
                to: '#/admin/registrar-noticia'
            },
            {
                label: 'Ver mis noticias agregadas',
                to: '#/admin/listar-noticias'
            },
            {
                label: 'Quitar noticias',
                to: '#/admin/quitar-noticia'
            }
        ]
    },
    {
        icon: 'pe-7s-target',
        label: 'PROGRAMACION',
        content: [
            {
                label: 'Registrar programa',
                to: '/admin/programa',
            },
            {
                label: 'Registrar conductor',
                to: '/admin/conductor',
            },
            {
                label: 'Crear programacion',
                to: '/admin/programacion',
            }
        ]
    },
    {
        icon: 'pe-7s-radio',
        label: 'CONFIGURACION',
        to: '#/nosotros/exterior'
    }
];
