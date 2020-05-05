import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Image from 'material-ui-image'
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);



const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 800,
        flexGrow: 1,
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        height: 50,
        paddingLeft: theme.spacing(4),
        backgroundColor: theme.palette.background.default,
    },
    img: {
        height: 255,
        display: 'block',
        maxWidth: 400,
        overflow: 'hidden',
        width: '100%',
    },
}));

function SwipeableTextMobileStepper(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = props.imagenes.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    return (
        <div className={classes.root}>
            <Paper square elevation={0} className={classes.header}>
                {/*}<Typography>{props.imagenes[activeStep].label}</Typography>{*/}
                <Typography>{props.imagenes[activeStep].name}</Typography>
            </Paper>
            <AutoPlaySwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                interval={3000}
                onChangeIndex={handleStepChange}
                enableMouseEvents
            >
                {props.imagenes.map((step, index) => (
                    <div key={step.name}>
                        {Math.abs(activeStep - index) <= 2 ? (
                            <Image aspectRatio={(16 / 9)} src={URL.createObjectURL(step)} alt={step.label} />
                            //<Image aspectRatio={(16 / 9)} src={step.imgPath} alt={step.label} />
                            //<Image className={classes.img} src={step.imgPath} alt={step.label} />
                            /*<img className={classes.img} src={step.imgPath} alt={step.label} />*/
                        ) : null}
                    </div>
                ))}
            </AutoPlaySwipeableViews>
            <MobileStepper
                steps={maxSteps}
                position="static"
                variant="text"
                activeStep={activeStep}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                        Siguiente
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Atras
          </Button>
                }
            />
        </div>
    );
}

export default SwipeableTextMobileStepper;
