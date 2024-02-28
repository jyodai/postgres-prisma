import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const Calculator = ({ onCalculate, initialValue = '' }) => {
    const [input, setInput] = useState(initialValue);

    const handleInput = (value) => () => setInput(input + value);

    const deleteLastChar = () => {
        setInput(input.slice(0, -1));
    };

    const calculateResult = () => {
        try {
            const result = eval(input);
            if (result !== undefined) {
                onCalculate(result);
            }
            setInput('');
        } catch (error) {
            alert('Invalid expression');
            setInput('');
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <TextField
                value={input}
                variant="outlined"
                InputProps={{
                    readOnly: true,
                }}
                fullWidth
                margin="normal"
            />
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <Button variant="contained" onClick={() => setInput('')} fullWidth>C</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" onClick={deleteLastChar} fullWidth>←</Button>
                </Grid>
                {['789/', '456*', '123-', '0.+'].map((row, rowIndex) => (
                    <Grid key={rowIndex} container item spacing={1}>
                        {rowIndex === 3 && (
                            <Grid item xs={3}>
                                <Button variant="contained" onClick={handleInput('00')} fullWidth>
                                    00
                                </Button>
                            </Grid>
                        )}
                        {row.split('').map((char) => (
                            <Grid item xs={3} key={char}>
                                <Button variant="contained" onClick={handleInput(char)} fullWidth>
                                    {char}
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                ))}
                <Grid item xs={12}>
                    <Button variant="contained" onClick={calculateResult} fullWidth>=</Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Calculator;

