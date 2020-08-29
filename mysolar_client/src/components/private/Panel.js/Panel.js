import React, { useState, useEffect, Fragment } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import AddPanel from './AddPanel';
import axios from 'axios';
import MyAlert from '../MyAlert';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import EditPanel from './EditPanel';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    container: {
        padding: "1rem"
    },
    toprow: {
        padding: "1rem",
        width: "100%"
    },
    submit: {
        margin: "1rem",
        backgroundColor: 'rgb(2,0,36)',
        background: 'linear-gradient(90deg, rgba(29,140,248,1) 0%, rgba(63,50,244,1) 100%);'
    },
});

const Panel = (props) => {
    const classes = useStyles();

    const [openForm, setOpenForm] = useState(false);
    const [peakVoltage, setPeakVoltage] = useState('');
    const [peakCurrent, setPeakCurrent] = useState('');
    const [city, setCity] = useState('');

    const [formSuccess, setFormSuccess] = useState(false);
    const [formError, setFromError] = useState(false);

    const [openEdit, setOpenEdit] = useState(false);
    const [editPanel, setEditPanel] = useState({});

    const [panels, setPanels] = useState([]);

    const handleSuccessClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setFormSuccess(false);
    };


    const handleErrorClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setFromError(false);
    };

    const closeForm = () => {
        setOpenForm(false);
    }


    const addPanelRequest = async (e) => {
        e.preventDefault();
        let response = await axios.put('/panel', {
            'peakVoltage': peakVoltage,
            'peakCurrent': peakCurrent,
            'city': city,
            'user': {
                "id": props.user.id,
                "email": props.user.email
            }
        }, {
            headers: {
                'apiKey': props.user.apiKey
            }
        }).catch((e) => console.log(e));

        if (response && response.status === 200) {
            let newPanels = [...panels]
            newPanels.push(response.data);
            setPanels(newPanels);
            setFormSuccess(true);
        } else {
            setFromError(true);
        }
    }

    const getPanelsById = async (userId) => {
        let response = await axios.get(`/${userId}/panel`, {
            headers: {
                'apiKey': props.user.apiKey
            }
        }).catch(e => console.log(e));

        if (response && response.status === 200) {
            setPanels(response.data);
        }
    }

    const deletePanel = async (panel) => {
        let response = await axios.delete(`/panel/${panel.id}`, {
            headers: {
                'apiKey': props.user.apiKey
            }
        }).catch(e => console.log(e));

        if (response && response.status === 200) {
            let newPanels = panels.filter((p) => p.id !== panel.id);
            setPanels(newPanels)
        }
    }

    const updatePanel = async (panel) => {

        let response = await axios.post(`/panel/${panel.id}`, {
            'peakVoltage': panel.peakVoltage,
            'peakCurrent': panel.peakCurrent,
            'city': panel.city,
            'user': {
                "id": props.user.id,
                "email": props.user.email
            }
        }, {
            headers: {
                'apiKey': props.user.apiKey
            }
        }).catch((e) => console.log(e));

        if (response && response.status === 200) {
            getPanelsById(props.user.id);
            setFormSuccess(true);
        } else {
            setFromError(true);
        }

    }

    const handleDelete = (panel) => {
        deletePanel(panel);
        props.notify(`Panel with id: ${panel.id} has been deleted`, "success");
    }

    const openEditForm = (panel) => {
        setOpenEdit(true);
        setEditPanel(panel);
    }

    useEffect(() => {
        getPanelsById(props.user.id);
    }, [])

    return (
        <div className={classes.container}>
            {console.log(props)}
            <div className={classes.toprow}>
                <Button type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={() => setOpenForm(true)}
                >Add Panel</Button>
                <AddPanel open={openForm} close={closeForm} addPanelRequest={addPanelRequest} setCity={setCity} setPeakCurrent={setPeakCurrent} setPeakVoltage={setPeakVoltage} />

            </div>

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Your solar panels (#Id)</TableCell>
                            <TableCell align="right">Location</TableCell>
                            <TableCell align="right">Peak current</TableCell>
                            <TableCell align="right">Peak Voltage</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {panels && Array.isArray(panels) && panels.length !== 0 ? panels.map((p) => (
                            <Fragment>
                                <TableRow key={p.id}>

                                    <TableCell>{p.id}</TableCell>
                                    <TableCell align="right">{p.city}</TableCell>
                                    <TableCell align="right">{p.peakCurrent} A</TableCell>
                                    <TableCell align="right">{p.peakVoltage} V</TableCell>
                                    <TableCell align="right">
                                        <IconButton aria-label="delete" size="small" onClick={() => handleDelete(p)}>
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton aria-label="edit" size="small" onClick={() => openEditForm(p)}>
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                                <EditPanel open={openEdit} close={() => setOpenEdit(false)} updatePanel={updatePanel} panel={editPanel} setEditPanel={setEditPanel} />
                            </Fragment>
                        )) : null}

                    </TableBody>
                </Table>
            </TableContainer>
            {/* <button onClick={() => console.log(panels)}>Test</button> */}
            <MyAlert message="Panel added successfully!" type="success" open={formSuccess} handleClose={handleSuccessClose} />
            <MyAlert message="Invalid Panel" type="error" open={formError} handleClose={handleErrorClose} />

        </div >
    )
}

export default Panel
