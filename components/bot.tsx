'use client'
import React, { Component, MouseEvent, TouchEvent } from 'react';

interface State {
  isDragging: boolean;
  initialMouseX: number;
  initialMouseY: number;
  initialDivX: number;
  initialDivY: number;
}

class Bot extends Component<{}, State> {
  divRef: HTMLDivElement | null = null;

  state: State = {
    isDragging: false,
    initialMouseX: 0,
    initialMouseY: 0,
    initialDivX: 0,
    initialDivY: 0,
  };

  handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    this.initiateDrag(e.clientX, e.clientY);
  };

  handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    const touch = e.touches[0];
    this.initiateDrag(touch.clientX, touch.clientY);
  };

  initiateDrag = (clientX: number, clientY: number) => {
    if (this.divRef) {
      const divRect = this.divRef.getBoundingClientRect();
      const divX = divRect.left;
      const divY = divRect.top;

      this.setState({
        isDragging: true,
        initialMouseX: clientX,
        initialMouseY: clientY,
        initialDivX: divX,
        initialDivY: divY,
      });

      document.addEventListener('mousemove', this.handleMouseMove as any);
      document.addEventListener('mouseup', this.handleMouseUp as any);

      document.addEventListener('touchmove', this.handleTouchMove as any, {
        passive: false,
      });
      document.addEventListener('touchend', this.handleTouchEnd as any);
    }
  };

  handleMouseMove = (e: MouseEvent) => {
    this.handleDrag(e.clientX, e.clientY);
  };

  handleTouchMove = (e: TouchEvent) => {
    const touch = e.touches[0];
    this.handleDrag(touch.clientX, touch.clientY);
  };

  handleDrag = (clientX: number, clientY: number) => {
    if (!this.state.isDragging) return;

    const deltaX = clientX - this.state.initialMouseX;
    const deltaY = clientY - this.state.initialMouseY;

    this.setState((prevState) => ({
      initialDivX: prevState.initialDivX + deltaX,
      initialDivY: prevState.initialDivY + deltaY,
      initialMouseX: clientX,
      initialMouseY: clientY,
    }));
  };

  handleMouseUp = () => {
    this.endDrag();
  };

  handleTouchEnd = () => {
    this.endDrag();
  };

  endDrag = () => {
    this.setState({ isDragging: false });
    document.removeEventListener('mousemove', this.handleMouseMove as any);
    document.removeEventListener('mouseup', this.handleMouseUp as any);

    document.removeEventListener('touchmove', this.handleTouchMove as any);
    document.removeEventListener('touchend', this.handleTouchEnd as any);
  };

  render() {
    const { initialDivX, initialDivY } = this.state;

    return (
      <div
        ref={(div) => (this.divRef = div)}
        className="BotMain"
        style={{
          left: `${initialDivX}px`,
          top: `${initialDivY}px`,
          zIndex: `5`,
          position: `absolute`,
          width: `100px`,
          height: `100px`,
          cursor: `grab`,
        }}
        onMouseDown={this.handleMouseDown}
        onTouchStart={this.handleTouchStart}
      >
        <img src="/pikachuBot.gif" alt="" />
      </div>
    );
  }
}

export default Bot;
