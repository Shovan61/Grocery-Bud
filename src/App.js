import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Alert, AlertTitle } from '@material-ui/lab';
import Items from './Items';
import { v4 as uuid } from 'uuid';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
    },
    crd: {
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: '2rem',
        boxShadow: '1px 2px 14px -1px #000000',
    },
    form: {
        height: '56px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '2rem',
        marginTop: '1rem',
    },
    inputField: {
        width: '70%',
        alignSelf: 'center',
        marginRight: '15px',
    },
    btn: {
        height: '100%',
    },
    header: {
        textAlign: 'center',
        fontWeight: '500',
        letterSpacing: '2px',
        color: '#555',
        textShadow: '1px 1px 5px rgba(145, 150, 150, 1)',
    },
    itemList: {
        width: '90%',
        // boxShadow: '2px 2px 7px 0px rgba(0, 0, 0, 0.75)',
        alignSelf: 'center',
        marginBottom: '1.5rem',
    },
});

function App() {
    const classes = useStyles();
    const [groceries, setgroceries] = useState([]);
    const [groceryName, setgroceryName] = useState('');
    const [isError, setisError] = useState(false);
    const [isAlert, setisAlert] = useState(false);

    // useEffect for set grocery back to empty string
    useEffect(() => {
        setgroceryName('');
    }, [groceries, isError]);

    // useEffect for make isError back to false
    useEffect(() => {
        let timer = setTimeout(() => {
            setisError(false);
        }, 3000);

        return () => {
            clearTimeout(timer);
        };
    }, [isError]);

    // UseEffect for alert
    useEffect(() => {
        let timer = setTimeout(() => {
            setisAlert(false);
        }, 2000);

        return () => {
            clearTimeout(timer);
        };
    }, [isAlert]);

    // change text
    const handleChange = (e) => {
        setgroceryName(e.target.value);
    };

    // Submit grocery item
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!groceryName) {
            setisAlert(true);
        } else {
            let found = [];

            if (groceries.length === 0) {
                setgroceries([...groceries, { name: groceryName, id: uuid() }]);
                setgroceryName('');
            } else {
                groceries.forEach((curItem) => {
                    if (
                        curItem.name.toLowerCase().trim() ===
                        groceryName.toLowerCase().trim()
                    ) {
                        found.push(curItem);
                    }
                });
            }

            if (found.length === 0) {
                setgroceries([...groceries, { name: groceryName, id: uuid() }]);
            } else {
                setisError(true);
            }
        }
    };

    // Remove Item
    const removeItem = (id) => {
        setgroceries(groceries.filter((curItem) => curItem.id !== id));
    };

    // Update Item
    const updateItem = (id, newName) => {
        setgroceries(
            groceries.map((curItem) => {
                return curItem.id === id
                    ? { ...curItem, name: newName }
                    : curItem;
            })
        );
    };

    return (
        <div className={classes.root}>
            <Card className={classes.crd}>
                <h1 className={classes.header}>Grocery Bud</h1>
                {isAlert && (
                    <Alert severity='error'>
                        <AlertTitle>Invalid Submition</AlertTitle>
                        Input Required <strong>check it out!</strong>
                    </Alert>
                )}

                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                        disabled={isError || isAlert}
                        error={isError}
                        id='outlined-basic'
                        label={isError ? 'Item exists' : 'e.g. eggs'}
                        variant='outlined'
                        fullWidth
                        value={groceryName}
                        onChange={handleChange}
                        // helperText={isError ? 'Item exists' : ''}
                        className={classes.inputField}
                    />
                    <Button
                        disabled={isError || isAlert}
                        className={classes.btn}
                        variant='contained'
                        type='submit'
                        color='primary'>
                        Submit
                    </Button>
                </form>

                {/* Items List*/}
                <div className={classes.itemList}>
                    {groceries.map((cur) => (
                        <Items
                            removeItem={removeItem}
                            updateItem={updateItem}
                            key={cur.id}
                            id={cur.id}
                            name={cur.name}
                            all={groceries}
                        />
                    ))}
                </div>
            </Card>
        </div>
    );
}

export default App;
