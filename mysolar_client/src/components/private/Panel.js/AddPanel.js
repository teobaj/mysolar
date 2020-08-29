import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from '@material-ui/core'

const AddPanel = (props) => {

    const handleSucces = (e) => {
        props.addPanelRequest(e);
        props.close();
    }

    return (
        <Dialog open={props.open} onClose={props.close} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add New Panel</DialogTitle>
            <DialogContent>
                <DialogContentText>Add the specifications for the solar panel</DialogContentText>
                <TextField autoFocus
                    margin="dense"
                    id="peakVoltage"
                    label="Peak voltage"
                    fullWidth
                    onChange={(e) => props.setPeakVoltage(e.target.value)} />
                <TextField autoFocus
                    margin="dense"
                    id="peakCurrent"
                    label="Peak current"
                    fullWidth
                    onChange={(e) => props.setPeakCurrent(e.target.value)} />
                <TextField autoFocus
                    margin="dense"
                    id="city"
                    label="City"
                    fullWidth
                    onChange={(e) => props.setCity(e.target.value)} />
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={props.close}>Cancel</Button>
                <Button color="primary" onClick={(e) => handleSucces(e)}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddPanel
