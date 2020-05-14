import React, { Fragment } from 'react';
import { Backdrop, Paper } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import PageTitle from '../../../../Layout/AppMain/PageTitle';
const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default function Extras() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    return (
        <Fragment>
            <PageTitle
                heading="Configuraciones extras"
                subheading="Configuraciones extras de la pagina."
                icon="pe-7s-user text-primary"
            />
            <Paper className='p-3 mb-3 text-center'>
                {'PAGINA EN CONTRUCCION'}
                <Button onClick={
                    () => this.props.history.push('/admin/registrar-noticia2/2', { test: 124 })
                }>VER</Button>

                <Button variant="outlined" color="primary" onClick={handleToggle}>
                    {`Show backdrop`}
                </Button>
                <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Paper>
        </Fragment>
    );
}