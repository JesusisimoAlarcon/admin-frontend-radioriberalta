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
            }
        ]
    },
    {
        icon: 'pe-7s-target',
        label: 'PROGRAMACION',
        content: [
            {
                label: 'Registrar programa',
                to: '#/admin/programa',
            },
            {
                label: 'Registrar conductor',
                to: '#/admin/conductor',
            },
            {
                label: 'Crear programacion',
                to: '#/admin/programacion',
            }
        ]
    },
    {
        icon: 'pe-7s-target',
        label: 'CONFIGURACION',
        content: [
            {
                label: 'Usuarios',
                to: '#/admin/usuarios',
            },
            {
                label: 'Noticia',
                to: '#/admin/confignoticia',
            },
            {
                label: 'Secciones',
                to: '#/admin/secciones',
            },
            {
                label: 'Extras',
                to: '#/admin/extras',
            }
        ]
    },
    {
        icon: 'pe-7s-target',
        label: 'PERFIL',
        content: [
            {
                label: 'Actualizar datos',
                to: '#/admin/perfil',
            }
        ]
    }
];
