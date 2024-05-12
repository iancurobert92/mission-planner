import { Point } from '@shared/data-access';

export class CanvasUtils {
  static drawBullet(
    ctx: CanvasRenderingContext2D,
    coord: Point,
    radius: number,
    color: string
  ) {
    ctx.beginPath();
    ctx.arc(coord.x, coord.y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
  }

  static calculateDistance(posDiff: Point) {
    return Math.sqrt(Math.pow(posDiff.x, 2) + Math.pow(posDiff.y, 2));
  }

  static calculateNewPos(
    currentPos: Point,
    posDiff: Point,
    distance: number,
    speed: number
  ): Point {
    return {
      x: currentPos.x + (posDiff.x / distance) * speed,
      y: currentPos.y + (posDiff.y / distance) * speed,
    };
  }

  static calculatePosDiff(p1: Point, p2: Point) {
    return {
      x: p2.x - p1.x,
      y: p2.y - p1.y,
    };
  }
}
