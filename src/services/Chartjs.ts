import { Chart } from 'chart.js';
import { Database, QueryReturnData } from './Database';
import { HelperService } from './HelperService';
import { Rollbar } from './Rollbar';
import { SimpleTxtLogger } from 'simple-txt-logger';

export class Chartjs {

    private txtLogger: SimpleTxtLogger
    private rollbarLogger: Rollbar;

    private chart: Chart | undefined;
    private db: Database;
    private chartSwap: boolean;

    constructor(txtLogger: SimpleTxtLogger, rollbarLogger: Rollbar) {
        this.txtLogger = txtLogger;
        this.rollbarLogger = rollbarLogger;

        this.db = new Database(this.txtLogger, this.rollbarLogger);
        this.chartSwap = false;

        this.txtLogger.writeToLogFile('Configured Chartjs.');
    }


    public async renderChart(ctx: HTMLCanvasElement, swap?: boolean, req?:string): Promise<void> {
        if (swap) this.chartSwap = !this.chartSwap;

        this.destroyChart();

        if (this.chartSwap) {
            const tickersArray: string[] = [];
            const tickersData: Array<number[]> = [];

            (await this.db.getWeeklyTopData()).forEach(async (obj: QueryReturnData, i:number) => {

                const buffer: number[] = [];
                (await this.db.getWeeklySingleTickerData(obj['Ticker_Symbol'])).forEach((e:QueryReturnData) => buffer.push(e['Tally']));

                tickersData.push(buffer);
                tickersArray.push(obj['Ticker_Symbol']);

                if (i == 4) {
                    this.txtLogger.writeToLogFile('Rendering Line Chart.');
                    this.createLineChart(ctx, tickersArray, tickersData);
                }
            });

        } else this.barChartSelection(ctx, req);
    }

    public async barChartSelection(ctx: HTMLCanvasElement, chartTypeReq?: string): Promise<void> {
        const dataArray: number[] = [];
        const tickersArray: string[] = [];

        if (chartTypeReq && chartTypeReq.includes('week')) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (await this.db.getWeeklyTopData()).forEach((obj: any) => { // Does not recognise SUM property without type 'any'.
                dataArray.push(obj['SUM(Tally)']);
                tickersArray.push(obj['Ticker_Symbol']);
            });

            this.txtLogger.writeToLogFile('Rendering Weekly Bar Chart.');
            this.createBarChart(ctx, tickersArray, dataArray);

        } else {
            (await this.db.getDailyTopData(HelperService.dayOfWeek(chartTypeReq))).forEach((obj: QueryReturnData) => {
                dataArray.push(obj['Tally']);
                tickersArray.push(obj['Ticker_Symbol']);
            });

            this.txtLogger.writeToLogFile('Rendering Daily Bar Chart.');
            this.createBarChart(ctx, tickersArray, dataArray);
        }
    }

    private createBarChart(ctx: HTMLCanvasElement, tickersArray: string[], dataArray: number[]): void {
        this.chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: tickersArray,
                datasets: [{
                    label: 'Top Stock Mentions',
                    data: dataArray,
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.4)',
                        'rgba(75, 192, 192, 0.4)',
                        'rgba(255, 206, 86, 0.4)',
                        'rgba(200, 120, 80, 0.4)',
                        'rgba(110, 150, 220, 0.4)',
                        'rgba(255, 99, 132, 0.4)',
                        'rgba(50, 240, 50, 0.4)',
                        'rgba(10, 100, 255, 0.4)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(200, 120, 80, 1)',
                        'rgba(110, 150, 220, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(50, 240, 50, 1)',
                        'rgba(10, 100, 255, 1)'
                    ],
                    borderWidth: 1.5,
                    barThickness: 40
                }]
            },
            options: {
                scales: {
                    x: {
                        ticks: {
                            color: 'rgba(240, 240, 255, 1)',
                            font: {  size: 12  }
                        },
                        title: {
                            display: true,
                            text: 'Symbol',
                            color: 'rgba(120, 190, 240, 1)',
                            font: {
                                size: 15,
                                family: 'Courier New'
                            }
                        }
                    },
                    y: {
                        ticks: {
                            color: 'rgba(240, 240, 255, 1)',
                            font: {  size: 12  }
                        },
                        title: {
                            display: true,
                            text: 'Number of Mentions',
                            color: 'rgba(120, 190, 240, 1)',
                            font: {
                                size: 15,
                                family: 'Courier New'
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: 'rgba(120, 190, 240, 1)',
                            boxWidth: 0,
                            font: {
                                size: 20,
                                weight: '520',
                                family: 'Courier New'
                            }
                        }
                    }
                }
            }
        });
    }

    private createLineChart(ctx: HTMLCanvasElement, tickersArray: string[], tickersData: Array<number[]>): void {
        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              datasets: [{
                    data: tickersData[0] || [10, 20, 40, 80, 160],
                    label: tickersArray[0],
                    borderColor: 'rgba(54, 162, 235, 0.8)',
                    backgroundColor: 'rgba(54, 162, 235, 0.4)'
                },
                {
                    data: tickersData[1] || [25, 50, 100, 200, 400],
                    label: tickersArray[1],
                    borderColor: 'rgba(75, 192, 192, 0.8)',
                    backgroundColor: 'rgba(75, 192, 192, 0.4)'
                },
                {
                    data: tickersData[2] || [15, 30, 60, 125, 250],
                    label: tickersArray[2],
                    borderColor: 'rgba(255, 206, 86, 0.8',
                    backgroundColor: 'rgba(255, 206, 86, 0.4)'
                },
                {
                    data: tickersData[3] || [40, 80, 160, 320, 480],
                    label: tickersArray[3],
                    borderColor: 'rgba(200, 120, 80, 0.8)',
                    backgroundColor: 'rgba(200, 120, 80, 0.4)'
                },
                {
                    data: tickersData[4] || [30, 75, 125, 250, 500],
                    label: tickersArray[4],
                    borderColor: 'rgba(110, 150, 220, 0.8)',
                    backgroundColor: 'rgba(110, 150, 220, 0.4)'
                }]
            },
            options: {
                scales: {
                    x: {
                        ticks: {
                            color: 'rgba(240, 240, 255, 1)',
                            font: {  size: 12  }
                        },
                    },
                    y: {
                        ticks: {
                            color: 'rgba(240, 240, 255, 1)',
                            font: {  size: 12  }
                        },
                        title: {
                            display: true,
                            text: 'Number of Mentions',
                            color: 'rgba(120, 190, 240, 1)',
                            font: {
                                size: 15,
                                family: 'Courier New'
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: 'rgba(120, 190, 240, 1)',
                            font: {
                                size: 14,
                                weight: '360'
                            }
                        }
                    }
                }
            }
        });
    }

    private destroyChart(): void {
        if (this.chart) this.chart.destroy();
    }

    public printChart(): string | undefined | void {
        // this.chart?.render(); is this needed?
        return this.chart?.toBase64Image('image/jpeg', 1);
    }
}