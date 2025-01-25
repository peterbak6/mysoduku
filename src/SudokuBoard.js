import React, { useState } from "react";

// Helper function to create a blank grid (9x9) with an initial set of digits
const createGrid = (initialDigits) => {
    const grid = [];
    for (let i = 0; i < 9; i++) {
        grid.push([]);
        for (let j = 0; j < 9; j++) {
            grid[i].push({
                value: initialDigits[i * 9 + j] === 0 ? "" : initialDigits[i * 9 + j],
                initial: initialDigits[i * 9 + j] !== 0, // Mark initial cells
            });
        }
    }
    return grid;
};

const SudokuBoard = ({ initialDigits, solution }) => {
    const [grid, setGrid] = useState(createGrid(initialDigits));
    const [selectedDigit, setSelectedDigit] = useState(null);
    const [selectedCell, setSelectedCell] = useState(null);

    // Handle cell click to select the cell or place a number
    const handleCellClick = (row, col) => {
        if (grid[row][col].initial) return; // Don't allow editing initial cells
        if (selectedDigit !== null) {
            const newGrid = [...grid];
            newGrid[row][col].value = selectedDigit;
            setGrid(newGrid);
        } else {
            setSelectedCell({ row, col });
        }
    };

    // Handle deleting a number from a cell
    const handleDelete = () => {
        if (selectedCell && !grid[selectedCell.row][selectedCell.col].initial) {
            const newGrid = [...grid];
            newGrid[selectedCell.row][selectedCell.col].value = "";
            setGrid(newGrid);
        }
    };

    // Handle selecting a digit from 1-9
    const handleDigitSelect = (digit) => {
        setSelectedDigit(digit);
    };

    return (
        <div>
            <div style={{ display: "flex", flexDirection: "column", marginBottom: "20px" }}>
                <div style={{ display: "flex" }}>
                    {Array.from({ length: 9 }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => handleDigitSelect(i + 1)}
                            style={{
                                width: "40px",
                                height: "40px",
                                margin: "5px",
                                fontSize: "16px",
                            }}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
                <button onClick={handleDelete} style={{ marginTop: "10px" }}>
                    Delete
                </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(9, 40px)", gap: "5px" }}>
                {grid.map((row, rowIndex) =>
                    row.map((cell, colIndex) => (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            onClick={() => handleCellClick(rowIndex, colIndex)}
                            style={{
                                width: "40px",
                                height: "40px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                border: "1px solid black",
                                backgroundColor: cell.initial ? "#e0e0e0" : "#fff",
                                cursor: cell.initial ? "not-allowed" : "pointer",
                            }}
                        >
                            {cell.value !== "" ? cell.value : ""}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default SudokuBoard;