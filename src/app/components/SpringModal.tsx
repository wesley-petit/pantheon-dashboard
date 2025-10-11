// Official Spring Modal : https://mui.com/material-ui/react-modal/
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useSpring, animated } from '@react-spring/web';

interface FadeProps {
    children: React.ReactElement<any>;
    in?: boolean;
    onClick?: any;
    onEnter?: (node: HTMLElement, isAppearing: boolean) => void;
    onExited?: (node: HTMLElement, isAppearing: boolean) => void;
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(props, ref) {
    const {
        children,
        in: open,
        onClick,
        onEnter,
        onExited,
        ...other
    } = props;
    const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },
        onStart: () => {
            if (open && onEnter) {
                onEnter(null as any, true);
            }
        },
        onRest: () => {
            if (!open && onExited) {
                onExited(null as any, true);
            }
        },
    });

    return (
        <animated.div ref={ref} style={style} {...other}>
            {React.cloneElement(children, { onClick })}
        </animated.div>
    );
});

interface SpringModalProps {
    open: boolean;
    onClose: () => void;
    children?: React.ReactNode;
    className?: string;
}

export default function SpringModal(props: SpringModalProps) {
    return (
        <Modal
            aria-labelledby="spring-modal-title"
            aria-describedby="spring-modal-description"
            open={props.open}
            onClose={props.onClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    TransitionComponent: Fade,
                },
            }}
        >
            <Fade in={props.open}>
                <Box
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                    className={props.className}
                >
                    {props.children}
                </Box>
            </Fade>
        </Modal>
    );
}