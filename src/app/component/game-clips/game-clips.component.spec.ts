// dummy content

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameClipsComponent, Games } from './game-clips.component';
import { ClipService } from 'src/app/services/clip.service';

describe('GameClipsComponent', () => {
  let component: GameClipsComponent;
  let fixture: ComponentFixture<GameClipsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameClipsComponent],
      providers: [
        {
          provide: ClipService,
        },
      ],
    }).compileComponents();
  });

  it('should create the game clips component', () => {});
});
