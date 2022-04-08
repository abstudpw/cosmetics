import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {useDispatch} from "react-redux";

interface RemoveProps {
    id?: number,
}

export default function Remove(props: RemoveProps) {

    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (toRemove: boolean) => {
        if (toRemove) {
            dispatch({type: 'remove', id: props.id})
        }
        setOpen(false);
    };

    return (
        <div>
            <Button onClick={handleClickOpen}>
                Usuń produkt
            </Button>
            <Dialog
                open={open}
                onClose={() => handleClose(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Usuwanie"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Czy na pewno chcesz usunąć produkt od id = {props.id}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose(false)} autoFocus>
                        Nie, zamknij okienko
                    </Button>
                    <Button onClick={() => handleClose(true)}>Tak, usuń</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}