import React, { useState } from 'react';

const Calculator = ({ onCalculate, initialValue = '' }) => {
    const [input, setInput] = useState(initialValue);

    const handleInput = (value) => () => setInput(input + value);

    const deleteLastChar = () => {
        setInput(input.slice(0, -1));
    };

    const calculateResult = () => {
        try {
            const result = eval(input);
            onCalculate(result);
            setInput('');
        } catch (error) {
            alert('Invalid expression');
            setInput('');
        }
    };

    return (
        <div className="calculator">
            <input type="text" value={input} readOnly className="calculator-input" />
            <div className="calculator-buttons">
                <div className="calculator-row">
                    {'789/'.split('').map((char) => (
                        <button key={char} onClick={handleInput(char)}>{char}</button>
                    ))}
                </div>
                <div className="calculator-row">
                    {'456*'.split('').map((char) => (
                        <button key={char} onClick={handleInput(char)}>{char}</button>
                    ))}
                </div>
                <div className="calculator-row">
                    {'123-'.split('').map((char) => (
                        <button key={char} onClick={handleInput(char)}>{char}</button>
                    ))}
                </div>
                <div className="calculator-row">
                    {'0.'.split('').map((char) => (
                        <button key={char} onClick={handleInput(char)}>{char}</button>
                    ))}
                    <button onClick={handleInput('+')}>+</button>
                    <button onClick={calculateResult}>=</button>
                </div>
                <div className="calculator-row">
                    <button onClick={() => setInput('')} className="clear-button">C</button>
                    <button onClick={deleteLastChar} className="backspace-button">←</button>
                </div>
            </div>
        </div>
    );
};

export default Calculator;


