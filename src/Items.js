import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: '1rem',
    },
    crd: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    header: {
        marginLeft: '1rem',
    },
    form: {
        height: '56px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginLeft: '0.8rem',
        marginRight: '0.8rem',
        marginTop: '0.5rem',
    },
}));

function Items({ name, id, removeItem, updateItem, all }) {
    const classes = useStyles();
    const [isEdit, setisEdit] = useState(false);
    const [updatedName, setupdatedName] = useState(name);
    const [isError, setisError] = useState(false);

    useEffect(() => {
        let timer = setTimeout(() => {
            setisError(false);
        }, 2000);
        return () => {
            clearTimeout(timer);
        };
    }, [isError]);

    const handleRemove = (id) => {
        removeItem(id);
    };

    const handleEdit = () => {
        setisEdit(true);
    };

    const handleChange = (e) => {
        setupdatedName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let found = [];

        all.forEach((curItem) => {
            if (
                curItem.name.toLowerCase().trim() ===
                updatedName.toLowerCase().trim()
            ) {
                found.push(curItem);
            }
        });

        if (updatedName && found.length === 0) {
            updateItem(id, updatedName);
            setisEdit(false);
        } else {
            setisError(true);
        }
    };

    return (
        <div className={classes.root}>
            <Card className={classes.crd}>
                {isEdit && (
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <TextField
                            error={isError}
                            id='outlined-basic'
                            label={
                                isError
                                    ? 'Invalid Input or Selected item already exists'
                                    : ''
                            }
                            variant='outlined'
                            value={updatedName}
                            onChange={handleChange}
                            fullWidth
                        />
                        <Button
                            disabled={isError}
                            variant='contained'
                            type='submit'
                            color='primary'>
                            Update
                        </Button>
                        <Button
                            disabled={isError}
                            variant='contained'
                            color='secondary'
                            onClick={() => setisEdit(false)}>
                            Cancel
                        </Button>
                    </form>
                )}

                {!isEdit && (
                    <>
                        <Typography
                            className={classes.header}
                            align='left'
                            variant='h6'
                            color='primary'
                            gutterBottom>
                            {name}
                        </Typography>
                        <CardActions>
                            {/* Edit Button */}
                            <IconButton aria-label='edit' onClick={handleEdit}>
                                <EditIcon />
                            </IconButton>
                            {/* Remove Button */}
                            <IconButton
                                aria-label='delete'
                                onClick={() => handleRemove(id)}>
                                <DeleteIcon />
                            </IconButton>
                        </CardActions>
                    </>
                )}
            </Card>
        </div>
    );
}

export default Items;
