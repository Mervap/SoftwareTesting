import React, {ChangeEvent, Component} from 'react';

import '../styles/GameControl.css';
import {BiPlus, BiMinus} from 'react-icons/bi'
import {BsPlay, BsPause} from 'react-icons/bs'

interface FieldWithButtonsProps {
  className: string
  labelText: string
  baseNum: number
  diff: number
  minValue: number
  maxValue: number
  disabled: boolean

  onValueChange(value: string): void
}

class FieldWithButtons extends Component<FieldWithButtonsProps> {

  state = {
    value: String(this.props.baseNum)
  }

  private onColumnsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    this.setState({value: value})
    this.props.onValueChange(value)
  }

  private applyDiff(increase: boolean): void {
    const realDiff = increase ? this.props.diff : -this.props.diff
    const newValue = Number(this.state.value) + realDiff
    let val: string;
    if (newValue < this.props.minValue) {
      val = String(this.props.minValue);
    } else if (this.props.maxValue < newValue) {
      val = String(this.props.maxValue);
    } else {
      val = String(newValue);
    }
    this.setState({value: val})
    this.props.onValueChange(val)
  }

  render() {
    return (
      <div className={"updatableField " + this.props.className}>
        <div className="updatableFieldName">
          <label htmlFor={this.props.className}>{this.props.labelText}</label>
        </div>
        <button disabled={this.props.disabled}
                className="updateButton"
                onClick={() => this.applyDiff(false)}>
          <BiMinus/>
        </button>
        <div className="updatableFieldValue">
          <input
            id={this.props.className}
            type="text"
            disabled={this.props.disabled}
            value={this.state.value}
            onChange={this.onColumnsChange}
          />
        </div>
        <button disabled={this.props.disabled}
                className="updateButton"
                onClick={() => this.applyDiff(true)}>
          <BiPlus/>
        </button>
      </div>
    )
  }
}

interface GameControlProps {
  delay: number
  isRun: boolean
  cntForBirth: number
  minForAlive: number
  maxForAlive: number

  onGameControlChange(speed: number, cntForBirth: number, minForAlive: number, maxForAlive: number, isRun: boolean): void
}

class GameControl extends Component<GameControlProps> {

  state = {
    delay: String(this.props.delay),
    isRun: this.props.isRun,
    cntForBirth: String(this.props.cntForBirth),
    minForAlive: String(this.props.minForAlive),
    maxForAlive: String(this.props.maxForAlive)
  }

  private onGameControlChange = (speed: string, cntForBirth: string, minForAlive: string, maxForAlive: string, isRun: boolean) => {
    this.setState({
      delay: speed,
      cntForBirth: cntForBirth,
      minForAlive: minForAlive,
      maxForAlive: maxForAlive,
      isRun: isRun
    })
    this.props.onGameControlChange(Number(speed), Number(cntForBirth), Number(minForAlive), Number(maxForAlive), isRun)
  }

  private onRunChange = () => {
    this.setState({isRun: !this.state.isRun})
    this.onGameControlChange(this.state.delay, this.state.cntForBirth, this.state.minForAlive,
      this.state.maxForAlive, !this.state.isRun)
  }

  render() {
    return (
      <div className="gameControl">
        <FieldWithButtons
          className={"delayControl"}
          labelText={"Step delay"}
          baseNum={Number(this.state.delay)}
          diff={100}
          minValue={1}
          maxValue={60000} // 1 minute
          disabled={false}
          onValueChange={(value) => {
            this.onGameControlChange(value, this.state.cntForBirth, this.state.minForAlive,
              this.state.maxForAlive, this.state.isRun)
          }}
        />
        <FieldWithButtons
          className={"minAliveControl"}
          labelText={"Min for alive"}
          baseNum={Number(this.state.minForAlive)}
          diff={1}
          minValue={0}
          maxValue={Math.min(8, Number(this.state.maxForAlive))}
          disabled={this.state.isRun}
          onValueChange={(value) => {
            this.onGameControlChange(this.state.delay, this.state.cntForBirth, value,
              this.state.maxForAlive, this.state.isRun)
          }}
        />
        <FieldWithButtons
          className={"maxAliveControl"}
          labelText={"Max for alive"}
          baseNum={Number(this.state.maxForAlive)}
          diff={1}
          minValue={Math.max(1, Number(this.state.minForAlive))}
          maxValue={9}
          disabled={this.state.isRun}
          onValueChange={(value) => {
            this.onGameControlChange(this.state.delay, this.state.cntForBirth, this.state.minForAlive,
              value, this.state.isRun)
          }}
        />
        <FieldWithButtons
          className={"cntBirthControl"}
          labelText={"Count for birth"}
          baseNum={Number(this.state.cntForBirth)}
          diff={1}
          minValue={1}
          maxValue={8}
          disabled={this.state.isRun}
          onValueChange={(value) => {
            this.onGameControlChange(this.state.delay, value, this.state.minForAlive,
              this.state.maxForAlive, this.state.isRun)
          }}
        />
        <button className="runPauseButton"
                onClick={() => this.onRunChange()}>
          {this.state.isRun ? <BsPause/> : <BsPlay/>}
        </button>
      </div>
    );
  }
}

export default GameControl;