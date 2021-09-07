import { createInjectable } from '@angular/compiler/src/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'color-game';
  selectedColor: number = 0
  error: string = ''
  msize: number = 6
  size: any[] = []
  moves: number = 0;
  isWin: boolean = false;
  colors: any[] = [
    { color: 'transparent', code: 0, hidden: true },
    { color: 'blue', code: 1, hidden: false },
    { color: 'yellow', code: 2, hidden: false },
    { color: 'orange', code: 3, hidden: false }
  ]

  constructor() {
    this.size = [];
    this.createTable()
  }

  restartGame() {
    this.selectedColor = 0
    this.isWin = false
    this.size = []
    this.createTable();
  }

  createTable() {
    for (var i: number = 0; i < this.msize; i++) {
      this.size[i] = [];
      for (var j: number = 0; j < this.msize; j++) {
        this.fillMatrix(i, j)
      }
    }
  }

  fillMatrix(i, j) {
    let color = this.colors[this.randomInteger(1, 3)]
    this.size[i][j] = { color: color.color, j: j };
  }

  randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  selectCell(i, j) {
    if (this.selectedColor != 0) {
      this.changeCellColor(i, j);
    } else {
      this.error = 'please select any color';
    }
  }

  changeCellColor(i, j) {
    if (!this.isWin) {
      this.error = ''
      this.moves++;
      let previousColor = this.size[i][j].color
      this.size[i][j].color = this.getColor();
      this.checkAdjacentCells(i, j, previousColor);
      this.selectedColor = 0
      this.checkForWin()
    }
  }

  checkForWin() {
    let winArray: any = []
    this.size.map(item => {
      item.map(it => winArray.push(it.color))
    })
    winArray = new Set(winArray);
    if (winArray.size == 1) {
      this.isWin = true
    }
  }

  getColor() {
    return this.colors.filter(color => color.code === this.selectedColor)[0].color
  }

  checkAdjacentCells(i, j, prevColor) {
    this.checkAdjacentCell(i - 1, j, prevColor);
    this.checkAdjacentCell(i + 1, j, prevColor);
    this.checkAdjacentCell(i, j + 1, prevColor);
    this.checkAdjacentCell(i, j - 1, prevColor);
  }

  checkAdjacentCell(i, j, color) {
    if (i >= 0 && j >= 0 && j < this.msize && i < this.msize && this.size[i][j].color == color) {
      this.size[i][j].color = this.getColor();
      this.checkAdjacentCells(i, j, color);
    }
  }

  selectColor(color) {
    if (!this.isWin) {
      this.selectedColor = color
    }
  }
}
