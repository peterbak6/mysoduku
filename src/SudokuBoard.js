import React, { useState } from "react";

// Helper function to create a blank grid (9x9) with an initial set of digits
const createGrid = (initialDigits) => {
    const grid = [];
    for (let i = 0; i < 9; i++) {
        grid.push([]);
        for (let j = 0; j < 9; j++) {
            grid[i].push({
                value: initialDigits[i * 9 + j] === "-" ? "" : initialDigits[i * 9 + j],
                initial: initialDigits[i * 9 + j] !== "-", // Mark initial cells
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
            setSelectedDigit(null);
            setSelectedCell(null);
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
            setSelectedDigit(null);
            setSelectedCell(null);
        }
    };

    // Handle selecting a digit from 1-9
    const handleDigitSelect = (digit) => {
        setSelectedDigit(digit);
    };

    return (
        <div className={"board"}>
            <div className={"board"}>
                <div style={{ display: "flex" }}>
                    {Array.from({ length: 9 }, (_, i) => (
                        <button
                            className={"selection"}
                            key={i}
                            onClick={() => handleDigitSelect(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
                <button onClick={handleDelete} className={"remove"}>
                    Remove
                </button>
            </div>

            <div className="board-container">
                <div className="grid">
                    {grid.map((row, rowIndex) =>
                        row.map((cell, colIndex) => {
                            // Determine whether to add borders based on the 3x3 grid
                            const isTopBorder = rowIndex % 3 === 0 && rowIndex !== 0;
                            const isBottomBorder = (rowIndex + 1) % 3 === 0 && rowIndex !== 8;
                            const isLeftBorder = colIndex % 3 === 0 && colIndex !== 0;
                            const isRightBorder = (colIndex + 1) % 3 === 0 && colIndex !== 8;

                            return (
                                <div
                                    className="cell"
                                    key={`${rowIndex}-${colIndex}`}
                                    onClick={() => handleCellClick(rowIndex, colIndex)}
                                    style={{
                                        color: cell.initial ? "#000" : "#00f",
                                        backgroundColor: cell.initial ? "#888" : "#fff",
                                        cursor: cell.initial ? "not-allowed" : "pointer",
                                        borderTop: isTopBorder ? "2px solid black" : "",
                                        borderBottom: isBottomBorder ? "2px solid black" : "",
                                        borderLeft: isLeftBorder ? "2px solid black" : "",
                                        borderRight: isRightBorder ? "2px solid black" : "",
                                    }}
                                >
                                    {cell.value !== "" ? cell.value : ""}
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default SudokuBoard;