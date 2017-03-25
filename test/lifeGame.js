// 'use strict'
require('chai').should();
import {Cell, World} from '../src/lifeGame';

describe('#生命的游戏-细胞', function () {
    it('创建一个细胞', function () {
      let cell = new Cell();
      cell.should.to.be.an.instanceof(Cell);
    });

    it('细胞默认是存活的', function () {
      let cell = new Cell();
      cell.isAlive().should.to.be.true;
    });

 });

describe('#生命的游戏-世界', function () {
		let world = null;
		beforeEach(function(done) {
    	world = new World();
    	done();
  	});

    it('创建一个世界', function () {
      world.should.to.be.an.instanceof(World);
    });

    it('在世界中初始化一群细胞', function () {
      world.init(4, 8);
      world.getCellNumbers().should.to.equal(32);
    });

    it('让指定细胞杀死', function () {
      world.init(4, 8);
      let x = 0, y = 0;
      world.setAliveAt(x, y, false);
      world.getCell(x, y).isAlive().should.to.be.false;
    });

    it('杀死不在世界范围内的细胞', function () {
      world.init(4, 8);
      let x = 4, y = 0;
      try {
      	world.setAliveAt(x, y, false);
      } catch (e) {
      	console.log(e.message);
      	e.should.to.exist;
      	return;
      }
    });

    it('让指定细胞存活', function () {
      world.init(4, 8);
      let x = 1, y = 1;
      world.setAliveAt(x, y, true);
      world.getCell(x, y).isAlive().should.to.be.true;
    });

    it('让不在世界范围内的细胞存活', function () {
      world.init(4, 8);
      let x = 1, y = 8;
      try {
        world.setAliveAt(x, y, true);
      } catch (e) {
        console.log(e.message);
        e.should.to.exist;
        return;
      }
      
    });

    it('在细胞(1, 1)周围有8个细胞', function () {
      world.init(4, 8);
      let x = 1, y = 1;
      let neighborCells = world.getNeighborCellsOf(x, y);
      neighborCells.length.should.to.equal(8);
    });

    it('在细胞(0, 0)周围有8个细胞', function () {
      world.init(4, 8);
      let x = 0, y = 0;
      let neighborCells = world.getNeighborCellsOf(x, y);
      neighborCells.length.should.to.equal(8);
    });

    it('在细胞(0, 0)周围有2个存活的细胞', function () {
      world.init(4, 8);
      let x = 0, y = 0;
      world.setAliveAt(0, 1, false);
      let neighborCells = world.getNeighborCellsOf(x, y);
      let aliveNeighborCount = world.getAliveNeighborCount(neighborCells);
      aliveNeighborCount.should.to.equal(2);
    });

    it('在细胞(0, 0)周围有1个存活的细胞', function () {
      world.init(4, 8);
      let x = 0, y = 0;
      world.setAliveAt(0, 1, false);
      world.setAliveAt(1, 0, false);
      let neighborCells = world.getNeighborCellsOf(x, y);
      let aliveNeighborCount = world.getAliveNeighborCount(neighborCells);
      aliveNeighborCount.should.to.equal(1);
    });

    it('在细胞(0, 0)周围有1个存活的细胞，1秒后该细胞死亡', function () {
      world.init(4, 8);
      let x = 0, y = 0;
      world.setAliveAt(0, 1, false);
      world.setAliveAt(1, 0, false);
      world.metabolism();
      world.getCell(x, y).isAlive().should.to.be.false;
    });

    it('在细胞(2, 3)存活，周围有2个存活的细胞，1秒后该细胞存活', function () {
      world.init(4, 8);
      let x = 2, y = 3;
      world.setAliveAt(1, 3, false);
      world.setAliveAt(1, 4, false);
      world.setAliveAt(2, 2, false);
      world.setAliveAt(2, 4, false);
      world.setAliveAt(3, 2, false);
      world.setAliveAt(3, 3, false);
      world.metabolism();
      world.getCell(x, y).isAlive().should.to.be.true;
    });

    it('在细胞(2, 3)死亡，周围有2个存活的细胞，1秒后该细胞死亡', function () {
      world.init(4, 8);
      let x = 2, y = 3;
      world.setAliveAt(x, y, false);
      world.setAliveAt(1, 3, false);
      world.setAliveAt(1, 4, false);
      world.setAliveAt(2, 2, false);
      world.setAliveAt(2, 4, false);
      world.setAliveAt(3, 2, false);
      world.setAliveAt(3, 3, false);
      world.metabolism();
      world.getCell(x, y).isAlive().should.to.be.false;
    });

    it('在细胞(2, 3)存活，周围有3个存活的细胞，1秒后该细胞存活', function () {
      world.init(4, 8);
      let x = 2, y = 3;
      world.setAliveAt(x, y, true);
      world.setAliveAt(1, 4, false);
      world.setAliveAt(2, 2, false);
      world.setAliveAt(2, 4, false);
      world.setAliveAt(3, 2, false);
      world.setAliveAt(3, 3, false);
      world.metabolism();
      world.getCell(x, y).isAlive().should.to.be.true;
    });

    it('在细胞(2, 3)存活，周围有5个存活的细胞，1秒后该细胞死亡', function () {
      world.init(4, 8);
      let x = 0, y = 1;
      world.metabolism();
      world.getCell(x, y).isAlive().should.to.be.false;
    });

    it('在细胞(0, 0)死亡，周围有3个存活的细胞，1秒后该细胞存活', function () {
      world.init(4, 8);
      let x = 0, y = 0;
      world.setAliveAt(x, y, false);
      world.getCell(x, y).isAlive().should.to.be.false;
      world.metabolism();
      world.getCell(x, y).isAlive().should.to.be.true;
    });
 });