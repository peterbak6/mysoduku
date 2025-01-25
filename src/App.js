import './App.css';
import React, { useEffect } from 'react';
import { getSudoku } from 'sudoku-gen';
import SudokuBoard from './SudokuBoard';

function App() {

  const [sudoku, setSudoku] = React.useState(null);

  useEffect(() => {
    setSudoku(getSudoku());
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {sudoku && <SudokuBoard initialDigits={sudoku.puzzle} solution={sudoku.solution} />}
      </header>
    </div>
  );
}

export default App;
