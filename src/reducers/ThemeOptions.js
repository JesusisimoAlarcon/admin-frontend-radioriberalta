import axios from 'axios'
import sideBar6 from '../assets/utils/images/sidebar/city1.jpg';
import * as moment from 'moment';
export const SET_ENABLE_BACKGROUND_IMAGE = 'THEME_OPTIONS/SET_ENABLE_BACKGROUND_IMAGE';

export const SET_ENABLE_MOBILE_MENU = 'THEME_OPTIONS/SET_ENABLE_MOBILE_MENU';
export const SET_ENABLE_MOBILE_MENU_SMALL = 'THEME_OPTIONS/SET_ENABLE_MOBILE_MENU_SMALL';

export const SET_ENABLE_FIXED_HEADER = 'THEME_OPTIONS/SET_ENABLE_FIXED_HEADER';
export const SET_ENABLE_HEADER_SHADOW = 'THEME_OPTIONS/SET_ENABLE_HEADER_SHADOW';
export const SET_ENABLE_SIDEBAR_SHADOW = 'THEME_OPTIONS/SET_ENABLE_SIDEBAR_SHADOW';
export const SET_ENABLE_FIXED_SIDEBAR = 'THEME_OPTIONS/SET_ENABLE_FIXED_SIDEBAR';
export const SET_ENABLE_CLOSED_SIDEBAR = 'THEME_OPTIONS/SET_ENABLE_CLOSED_SIDEBAR';
export const SET_ENABLE_FIXED_FOOTER = 'THEME_OPTIONS/SET_ENABLE_FIXED_FOOTER';

export const SET_ENABLE_PAGETITLE_ICON = 'THEME_OPTIONS/SET_ENABLE_PAGETITLE_ICON';
export const SET_ENABLE_PAGETITLE_SUBHEADING = 'THEME_OPTIONS/SET_ENABLE_PAGETITLE_SUBHEADING';
export const SET_ENABLE_PAGE_TABS_ALT = 'THEME_OPTIONS/SET_ENABLE_PAGE_TABS_ALT';

export const SET_BACKGROUND_IMAGE = 'THEME_OPTIONS/SET_BACKGROUND_IMAGE';
export const SET_BACKGROUND_COLOR = 'THEME_OPTIONS/SET_BACKGROUND_COLOR';
export const SET_COLOR_SCHEME = 'THEME_OPTIONS/SET_COLOR_SCHEME';
export const SET_BACKGROUND_IMAGE_OPACITY = 'THEME_OPTIONS/SET_BACKGROUND_IMAGE_OPACITY';

export const SET_HEADER_BACKGROUND_COLOR = 'THEME_OPTIONS/SET_HEADER_BACKGROUND_COLOR';


export const setEnableBackgroundImage = enableBackgroundImage => ({
    type: SET_ENABLE_BACKGROUND_IMAGE,
    enableBackgroundImage
});

export const setEnableFixedHeader = enableFixedHeader => ({
    type: SET_ENABLE_FIXED_HEADER,
    enableFixedHeader
});

export const setEnableHeaderShadow = enableHeaderShadow => ({
    type: SET_ENABLE_HEADER_SHADOW,
    enableHeaderShadow
});

export const setEnableSidebarShadow = enableSidebarShadow => ({
    type: SET_ENABLE_SIDEBAR_SHADOW,
    enableSidebarShadow
});

export const setEnablePageTitleIcon = enablePageTitleIcon => ({
    type: SET_ENABLE_PAGETITLE_ICON,
    enablePageTitleIcon
});

export const setEnablePageTitleSubheading = enablePageTitleSubheading => ({
    type: SET_ENABLE_PAGETITLE_SUBHEADING,
    enablePageTitleSubheading
});

export const setEnablePageTabsAlt = enablePageTabsAlt => ({
    type: SET_ENABLE_PAGE_TABS_ALT,
    enablePageTabsAlt
});

export const setEnableFixedSidebar = enableFixedSidebar => ({
    type: SET_ENABLE_FIXED_SIDEBAR,
    enableFixedSidebar
});

export const setEnableClosedSidebar = enableClosedSidebar => ({
    type: SET_ENABLE_CLOSED_SIDEBAR,
    enableClosedSidebar
});

export const setEnableMobileMenu = enableMobileMenu => ({
    type: SET_ENABLE_MOBILE_MENU,
    enableMobileMenu
});

export const setEnableMobileMenuSmall = enableMobileMenuSmall => ({
    type: SET_ENABLE_MOBILE_MENU_SMALL,
    enableMobileMenuSmall
});

export const setEnableFixedFooter = enableFixedFooter => ({
    type: SET_ENABLE_FIXED_FOOTER,
    enableFixedFooter
});

export const setBackgroundColor = backgroundColor => ({
    type: SET_BACKGROUND_COLOR,
    backgroundColor
});

export const setHeaderBackgroundColor = headerBackgroundColor => ({
    type: SET_HEADER_BACKGROUND_COLOR,
    headerBackgroundColor
});

export const setColorScheme = colorScheme => ({
    type: SET_COLOR_SCHEME,
    colorScheme
});

export const setBackgroundImageOpacity = backgroundImageOpacity => ({
    type: SET_BACKGROUND_IMAGE_OPACITY,
    backgroundImageOpacity
});

export const setBackgroundImage = backgroundImage => ({
    type: SET_BACKGROUND_IMAGE,
    backgroundImage
});

const initialState = {
    secciones: [],
    programacion: [],
    programaactual: {},
    backgroundColor: 'bg-white sidebar-text-dark',
    //backgroundColor: 'swatch-holder bg-light',
    headerBackgroundColor: 'bg-danger active active header-text-light',
    enableMobileMenuSmall: true,//habilita el menu movil para que sea visible
    enableBackgroundImage: false,//imagen de fondo para el menu principal
    //para tener abierto el silebar izquierdo => false abierto, true cerrado
    enableClosedSidebar: true,//deshabilita que el menu se encuentra abierto al iniciar la app
    enableFixedHeader: true,//habilita para que el menu de cabecera sea fijo
    enableHeaderShadow: true,
    enableSidebarShadow: true,
    enableFixedFooter: true,
    enableFixedSidebar: true,//habilita para el menu sea fijo
    colorScheme: 'black',
    backgroundImage: sideBar6,
    backgroundImageOpacity: 'opacity-06',
    enablePageTitleIcon: true,
    enablePageTitleSubheading: true,
    enablePageTabsAlt: false,
    diasTabs: [
        'Domingo',
        'Lunes',
        'Martes',
        'Miercoles',
        'Jueves',
        'Viernes',
        'Sabado'
    ],
    hoy: new Date().getDay(),
    hoydia: '',
    //API_REST: 'https://www.radioriberalta.com.bo:4500/api/'
    //API_REST: 'https://192.168.1.6:4500/api/'
    API_REST: 'https://api.radioriberalta.com.bo/api/'
}


export default function reducer(state = initialState, action) {

    state.hoydia = state.diasTabs[state.hoy];
    axios.get(state.API_REST + 'seccion/navs').then(response => {
        return response.data;
    }).then(response => {
        state.secciones = response
    })


    axios.get(state.API_REST + 'programacion/detalle').then(response => {
        return response.data;
    }).then(response => {



        response.filter((p) => {
            return (p.diasemana === state.hoydia && p.estado === 1)
        }).map(programa => {

            const horainicio = new Date(moment(programa.horainicio, 'HH:mm:ss'))
            const horafin = new Date(moment(programa.horafin, 'HH:mm:ss'))

            const horaactual = new Date().getTime();
            //console.log('hora actual: ' + horaactual + ' horaprogramada: ' + horainicio.getTime() + ' horaprogramada: ' + horafin.getTime())

            if (horaactual >= horainicio && horaactual < horafin) {
                //console.log("si")
                state.programaactual = programa;
                programa.live = 1;
            }

            //console.log(horainicio)
            //programa.live = 1;
            return programa;
        })
        state.programacion = response
    })

    switch (action.type) {
        case SET_ENABLE_BACKGROUND_IMAGE:
            return {
                ...state,
                enableBackgroundImage: action.enableBackgroundImage
            };

        case SET_ENABLE_FIXED_HEADER:
            return {
                ...state,
                enableFixedHeader: action.enableFixedHeader
            };

        case SET_ENABLE_HEADER_SHADOW:
            return {
                ...state,
                enableHeaderShadow: action.enableHeaderShadow
            };

        case SET_ENABLE_SIDEBAR_SHADOW:
            return {
                ...state,
                enableSidebarShadow: action.enableSidebarShadow
            };

        case SET_ENABLE_PAGETITLE_ICON:
            return {
                ...state,
                enablePageTitleIcon: action.enablePageTitleIcon
            };

        case SET_ENABLE_PAGETITLE_SUBHEADING:
            return {
                ...state,
                enablePageTitleSubheading: action.enablePageTitleSubheading
            };

        case SET_ENABLE_PAGE_TABS_ALT:
            return {
                ...state,
                enablePageTabsAlt: action.enablePageTabsAlt
            };

        case SET_ENABLE_FIXED_SIDEBAR:
            return {
                ...state,
                enableFixedSidebar: action.enableFixedSidebar
            };

        case SET_ENABLE_MOBILE_MENU:
            return {
                ...state,
                enableMobileMenu: action.enableMobileMenu
            };

        case SET_ENABLE_MOBILE_MENU_SMALL:
            return {
                ...state,
                enableMobileMenuSmall: action.enableMobileMenuSmall
            };

        case SET_ENABLE_CLOSED_SIDEBAR:
            return {
                ...state,
                enableClosedSidebar: action.enableClosedSidebar
            };

        case SET_ENABLE_FIXED_FOOTER:
            return {
                ...state,
                enableFixedFooter: action.enableFixedFooter
            };

        case SET_BACKGROUND_COLOR:
            return {
                ...state,
                backgroundColor: action.backgroundColor
            };

        case SET_HEADER_BACKGROUND_COLOR:
            return {
                ...state,
                headerBackgroundColor: action.headerBackgroundColor
            };

        case SET_COLOR_SCHEME:
            return {
                ...state,
                colorScheme: action.colorScheme
            };

        case SET_BACKGROUND_IMAGE:
            return {
                ...state,
                backgroundImage: action.backgroundImage
            };

        case SET_BACKGROUND_IMAGE_OPACITY:
            return {
                ...state,
                backgroundImageOpacity: action.backgroundImageOpacity
            };
        default:
            break;
    }
    return state;
}