import React, { useState, useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from '@material-ui/core'
import Axios from 'axios'


const EditPanel = (props) => {

    const { panel, updatePanel, setEditPanel } = props;



    const handleSucces = (e) => {
        updatePanel(panel);
        props.close();
    }

    const handlePeakVoltage = (e) => {
        let cPanel = panel;
        cPanel.peakVoltage = e.target.value;
        setEditPanel(cPanel)
    }

    const handlePeakCurrent = (e) => {
        let cPanel = panel;
        cPanel.peakCurrent = e.target.value;
        setEditPanel(cPanel)
    }

    const handleCity = e => {
        let cPanel = panel;
        cPanel.city = e.target.value;
        setEditPanel(cPanel);
    }

    useEffect(() => {
        console.log(panel)
        // setNewPanel(panel)
    }, [])


    return (
        <Dialog open={props.open} onClose={props.close} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit panel with id: {panel.id}</DialogTitle>
            <DialogContent>
                <DialogContentText>Add the specifications for the solar panel</DialogContentText>
                <TextField autoFocus
                    margin="dense"
                    id="peakVoltage"
                    label="Peak voltage"
                    fullWidth
                    defaultValue={panel.peakVoltage}
                    onChange={(e) => handlePeakVoltage(e)} />
                <TextField autoFocus
                    margin="dense"
                    id="peakCurrent"
                    label="Peak current"
                    fullWidth
                    defaultValue={panel.peakCurrent}
                    onChange={(e) => handlePeakCurrent(e)} />
                <TextField autoFocus
                    margin="dense"
                    id="city"
                    label="City"
                    fullWidth
                    defaultValue={panel.city}
                    onChange={(e) => handleCity(e)} />
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={props.close}>Cancel</Button>
                <Button color="primary" onClick={(e) => handleSucces(e)}>Save</Button>
            </DialogActions>
            {console.log(panel)}
        </Dialog>
    )
}

export default EditPanel
