'use client'
import React, { Component, MouseEvent } from 'react';

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

    if (this.divRef) {
      const divRect = this.divRef.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const divX = divRect.left;
      const divY = divRect.top;

      this.setState({
        isDragging: true,
        initialMouseX: mouseX,
        initialMouseY: mouseY,
        initialDivX: divX,
        initialDivY: divY,
      });

      document.addEventListener('mousemove', this.handleMouseMove as any);
      document.addEventListener('mouseup', this.handleMouseUp as any);
    }
  };

  handleMouseMove = (e: MouseEvent) => {
    if (!this.state.isDragging) return;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const deltaX = mouseX - this.state.initialMouseX;
    const deltaY = mouseY - this.state.initialMouseY;

    this.setState((prevState) => ({
      initialDivX: prevState.initialDivX + deltaX,
      initialDivY: prevState.initialDivY + deltaY,
      initialMouseX: mouseX,
      initialMouseY: mouseY,
    }));
  };

  handleMouseUp = () => {
    this.setState({ isDragging: false });
    document.removeEventListener('mousemove', this.handleMouseMove as any);
    document.removeEventListener('mouseup', this.handleMouseUp as any);
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
          zIndex:`5`,
          position:`absolute`,
          width:`100px`,
          height:`100px`,
          cursor:`grab`
        }}
        onMouseDown={this.handleMouseDown}
      >
       <img src="/pikachuBot.gif" alt="" />
      </div>
    );
  }
}

export default Bot;
