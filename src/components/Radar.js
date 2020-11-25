import React from 'react'
import Chart from 'chart.js'

export default class Radar extends React.Component {

    constructor(props) {
        super()
        this.state = {
            radarChart: Chart
        }
    }

    componentDidMount() {
        this.create()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.state.radarChart.data.datasets.forEach((dataset) => {
                dataset.data.push(...Object.values(this.props.data))
            })
            this.state.radarChart.update()
        }
    }

    create = () => {
        let ctx = document.querySelector('canvas')

        this.setState({
            radarChart: new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: ['HP', 'Attack', 'Defense','Special Attack', 'Special Defense', 'Speed'],
                    datasets: [{
                        label: '',
                        backgroundColor: "rgba(81,229,128,0.2)",
                        data: this.state.data
                    }]
                },
                options: {
                    aspectRatio: 1.3
                }
            })
        })

    }

    render() {
        return (
            <canvas></canvas>
        )
    }
}