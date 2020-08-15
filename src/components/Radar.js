import React from 'react'
import Chart from 'chart.js'

export default class Radar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            labels: ['HP', 'Attack', 'Special Attack',
                'Defense', 'Special Defense', 'Speed'],
            dataset: []
        }
    }

    componentDidMount() {
        this.create()
    }

    create = () => {
        let ctx = document.querySelector('canvas')

        let radarChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: this.state.labels,
                datasets: [{
                    label: '',
                    backgroundColor: "rgba(81,229,128,0.2)",
                    data: [80, 25, 33, 80, 100, 10]
                }]
            },
            options: {
                aspectRatio: 1.3
            }
        })

        return radarChart
    }

    render() {
        return (
            <canvas></canvas>
        )
    }
}