var fs = require('fs');
var fileName = process.argv[2];

fs.readFile(fileName, 'utf8', (err: any, data: any) => {
  if (err) throw err;
  console.log('OK: ' + fileName);

  const rawData = data.split('\n').map((e: any) => e.split(' -> '));

  const a = rawData.map((messyCoordString: string) => {
    const coordArr = getLine(messyCoordString);
    set.add(coordArr);
  })

  let board: number[][] = [...Array(1000)].map(x => Array(1000).fill(0));
  let overlaps = 0;

  for (const line of set) {

    const [x1, y1, x2, y2] = line;
    let overlapped = false;

    if (x1 === x2) {   // Vertical line 

      if (y2 > y1) {
        for (let i = y1; i <= y2; i++) {
          if (board[x1][i] === 1) {
            board[x1][i] = 2;
            overlaps++;
          }
          else if (board[x1][i] === 0) {
            board[x1][i] = 1;
          }
        }
      }
      if (y1 > y2) {
        for (let i = y2; i <= y1; i++) {
          if (board[x1][i] === 1) {
            board[x1][i] = 2;
            overlaps++;
          }
          else if (board[x1][i] === 0) {
            board[x1][i] = 1;
          }
        }
      }
    }
    else if (y1 === y2) {   // Horizontal line
      if (x2 > x1) {
        for (let i = x1; i <= x2; i++) {
          if (board[i][y1] === 1) {
            board[i][y1] = 2;
            overlaps++;
          }
          else if (board[i][y1] === 0) {
            board[i][y1] = 1;
          }
        }
      }
      if (x1 > x2) {
        for (let i = x2; i <= x1; i++) {
          if (board[i][y1] === 1) {
            board[i][y1] = 2;
            overlaps++;
          }
          else if (board[i][y1] === 0) {
            board[i][y1] = 1;
          }

        }
      }
    }
    else {    // Diagonal line

      if (x2 > x1) {

        if (y2 > y1) {    // Move from top left to bottom right
          for (let i = 0; i <= y2-y1; i++) {
            if (board[x1+i][y1+i] === 1) {
              board[x1+i][y1+i] = 2;
              overlaps++;
            }
            else if (board[x1+i][y1+i] === 0) {
              board[x1+i][y1+i] = 1;
            }
          }
        }
        if (y1 > y2) {    // Move from bottom left to top right
          for (let i = 0; i <= y1-y2; i++) {
            if (board[x1+i][y1-i] === 1) {
              board[x1+i][y1-i] = 2;
              overlaps++;
            }
            else if (board[x1+i][y1-i] === 0) {
              board[x1+i][y1-i] = 1;
            }
          }
        }

      }
      if (x1 > x2) {

        if (y2 > y1) {      // Move from top right to bottom left
          for (let i = 0; i <= y2-y1; i++) {
            
            if (board[x1-i][y1+i] === 1) {
              board[x1-i][y1+i] = 2;
              overlaps++;
            }
            else if (board[x1-i][y1+i] === 0) {
              board[x1-i][y1+i] = 1;
            }
          }
        }
        if (y1 > y2) {      // Move from bottom right to top left
          for (let i = 0; i <= y1-y2; i++) {
            if (board[x1-i][y1-i] === 1) {
              board[x1-i][y1-i] = 2;
              overlaps++;
            }
            else if (board[x1-i][y1-i] === 0) {
              board[x1-i][y1-i] = 1;
            }
          }
        }
      }
    }

  }
  console.log(overlaps);
});



const getLine = (coordStr: string) => {
  const [a, b] = coordStr;    // a = first half, b = second half
  const x1 = parseInt(a.substring(0, a.indexOf(','))),
    y1 = parseInt(a.substring(a.indexOf(',') + 1)),
    x2 = parseInt(b.substring(0, b.indexOf(','))),
    y2 = parseInt(b.substring(b.indexOf(',') + 1));

  return [x1, y1, x2, y2];
}

const set: Set<number[]> = new Set();
