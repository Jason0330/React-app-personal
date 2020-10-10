import React from 'react'
import './CountDown.scss'

export class CountDown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            day: 0,
            hour: 0,
            minute: '00',
            second: '00'
        }
    }

    componentDidMount() {
        if (this.props.endTime) {
            let startTime = this.props.startTime === undefined ? new Date() : this.props.startTime;
            let endTime = this.props.endTime;
            this.countFun(startTime,endTime);
        }
    }

    //组件卸载时，取消倒计时
    componentWillUnmount() {
        clearInterval(this.timer);
    }

    countFun = (startTime,endTime) => {
        let newDate = new Date(startTime)
        let newDate2 = new Date(endTime)

        let sys_second = (newDate2.getTime() - newDate.getTime());
        this.timer = setInterval(() => {
            //防止倒计时出现负数
            if (sys_second > 1000) {
                sys_second -= 1000;
                let day = Math.floor((sys_second / 1000 / 3600) / 24);
                let hour = Math.floor((sys_second / 1000 / 3600) % 24);
                let minute = Math.floor((sys_second / 1000 / 60) % 60);
                let second = Math.floor(sys_second / 1000 % 60);
                this.setState({
                    day: day,
                    hour: hour < 10 ? "0" + hour : hour,
                    minute: minute < 10 ? "0" + minute : minute,
                    second: second < 10 ? "0" + second : second
                })
            } else {
                clearInterval(this.timer);
                //倒计时结束时，触发父组件的方法
                if (this.props.timeOver) {
                    this.props.timeOver()
                }

            }
        }, 1000);
    }

    render() {
        return (
            <div className="countDown">
                <span style={{marginRight:4}}>距结束</span>
                {this.props.type === 'day' ? <div> {this.state.day} 天 {this.state.hour} 小时</div> : ""}
                {this.props.type === 'hour' ? <div> {this.state.hour} 小时</div> :""}
                <span>{this.state.minute} 分 {this.state.second} 秒</span>
            </div>
        )
    }
}
