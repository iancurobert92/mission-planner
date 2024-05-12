import { NgFor } from '@angular/common';
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
import { CanvasUtils } from '@player/util';
import { Coordinate, Point } from '@shared/data-access';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [MatButton, MatIcon, NgFor],
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
  private robotPosition: Point = { x: 0, y: 0 };
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
    this.clearMissionsMap();
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
    window.requestAnimationFrame(
      this.moveTo.bind(this, targetPoint, onComplete)
    );
  }

  private moveTo(targetPos: Coordinate, onComplete: () => void) {
    if (!this.isMoving) return;

    const posDiff = CanvasUtils.calculatePosDiff(this.robotPosition, targetPos);
    const distance = CanvasUtils.calculateDistance(posDiff);
    this.robotPosition = CanvasUtils.calculateNewPos(
      this.robotPosition,
      posDiff,
      distance,
      this.ROBOT_SPEED
    );
    this.clearMissionsMap();
    this.drawRobot();
    this.drawBullets();

    if (
      Math.abs(this.robotPosition.x - targetPos.x) < this.ROBOT_SPEED &&
      Math.abs(this.robotPosition.y - targetPos.y) < this.ROBOT_SPEED
    ) {
      onComplete();
      return;
    }

    requestAnimationFrame(this.moveTo.bind(this, targetPos, onComplete));
  }

  private clearMissionsMap() {
    this.ctx?.clearRect(
      0,
      0,
      this.MISSIONS_MAP_WIDTH,
      this.MISSIONS_MAP_HEIGHT
    );
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
      if (this.ctx)
        CanvasUtils.drawBullet(
          this.ctx,
          coord,
          this.BULLET_RADIUS,
          this.BULLET_COLOR
        );
    });
  }
}
