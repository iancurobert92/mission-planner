import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { PlayerService } from '@player/data-access';
import { Coordinate } from '@shared/data-access';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [MatButton, MatIcon],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
})
export class PlayerComponent implements OnInit, AfterViewInit {
  @ViewChild('missionMap') missionMap?: ElementRef<HTMLCanvasElement>;
  readonly MISSIONS_MAP_WIDTH: number = 800;
  readonly MISSIONS_MAP_HEIGHT: number = 400;
  readonly ROBOT_ASSET_SRC: string = 'assets/robot.svg';
  readonly ROBOT_SIZE: number = 40;
  readonly ROBOT_SPEED: number = 5;
  readonly BULLET_COLOR: string = 'blue';
  readonly BULLET_RADIUS: number = 10;

  targetPoints: Coordinate[] = [];
  isMoving: boolean = false;
  isDone: boolean = false;
  isCurrentTargetReached = true;

  private ctx?: CanvasRenderingContext2D | null;
  private robotImage = new Image();
  private robotPosition: Coordinate = { name: '', x: 0, y: 0 };
  private currentTargetPointIndex: number = 0;
  private destroyRef = inject(DestroyRef);

  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.playerService
      .getTargetPoints()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => (this.targetPoints = value));
  }

  ngAfterViewInit(): void {
    this.initMissionsMap();
  }

  start() {
    this.isMoving = true;

    if (this.isCurrentTargetReached) {
      this.goToNextTarget(this.onCurrentTargetReached.bind(this));
    } else {
      this.goToCurrentTarget(this.onCurrentTargetReached.bind(this));
    }

    this.isCurrentTargetReached = false;
  }

  stop() {
    this.isMoving = false;
  }

  reset() {
    this.isDone = false;
    this.isCurrentTargetReached = true;
    this.currentTargetPointIndex = 0;
    this.stop();
    this.initMissionsMap();
  }

  private initMissionsMap() {
    this.ctx = this.missionMap?.nativeElement.getContext('2d');
    this.ctx?.clearRect(
      0,
      0,
      this.MISSIONS_MAP_WIDTH,
      this.MISSIONS_MAP_HEIGHT
    );
    this.addRobot();
    this.drawBullets();
  }

  private onCurrentTargetReached() {
    this.isCurrentTargetReached = true;
    this.isDone = this.currentTargetPointIndex === this.targetPoints.length - 1;
    if (!this.isDone) {
      this.start();
    }
  }

  private goToCurrentTarget(onComplete: () => void) {
    this.goToTarget(
      this.targetPoints[this.currentTargetPointIndex],
      onComplete
    );
  }

  private goToNextTarget(onComplete: () => void) {
    this.goToTarget(
      this.targetPoints[++this.currentTargetPointIndex],
      onComplete
    );
  }

  private goToTarget(targetPoint: Coordinate, onComplete: () => void) {
    window.requestAnimationFrame(this.move.bind(this, targetPoint, onComplete));
  }

  private move(targetPos: Coordinate, onComplete: () => void) {
    if (!this.isMoving) return;

    var diffX = targetPos.x - this.robotPosition.x;
    var diffY = targetPos.y - this.robotPosition.y;
    var distance = Math.sqrt(diffX * diffX + diffY * diffY);
    var newX = this.robotPosition.x + (diffX / distance) * this.ROBOT_SPEED;
    var newY = this.robotPosition.y + (diffY / distance) * this.ROBOT_SPEED;
    this.robotPosition.x = newX;
    this.robotPosition.y = newY;

    this.ctx?.clearRect(
      0,
      0,
      this.MISSIONS_MAP_WIDTH,
      this.MISSIONS_MAP_HEIGHT
    );
    this.drawRobot();
    this.drawBullets();

    if (
      Math.abs(newX - targetPos.x) < this.ROBOT_SPEED &&
      Math.abs(newY - targetPos.y) < this.ROBOT_SPEED
    ) {
      onComplete();
      return;
    }

    requestAnimationFrame(this.move.bind(this, targetPos, onComplete));
  }

  private addRobot() {
    this.robotImage.width = this.robotImage.height = this.ROBOT_SIZE;
    this.robotImage.onload = this.drawRobot.bind(this);
    this.robotImage.src = this.ROBOT_ASSET_SRC;
    const firstTargetPoint = [...this.targetPoints].shift();
    if (firstTargetPoint) {
      this.robotPosition = { ...firstTargetPoint };
    }
  }

  private drawRobot() {
    this.ctx?.drawImage(
      this.robotImage,
      this.robotPosition.x,
      this.robotPosition.y,
      this.robotImage.width,
      this.robotImage.height
    );
  }

  private drawBullets() {
    this.targetPoints.forEach((coord) => {
      if (this.ctx) {
        this.ctx.beginPath();
        this.ctx.arc(coord.x, coord.y, this.BULLET_RADIUS, 0, Math.PI * 2);
        this.ctx.fillStyle = this.BULLET_COLOR;
        this.ctx.fill();
        this.ctx.closePath();
      }
    });
  }
}
