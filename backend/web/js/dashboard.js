function initProfitChart(elId, chartData) {

    var $profitChart = $(elId);

    if ($profitChart.length === 0) {
        console.error('No ' + elId + ' found');
        return false;
    }

    var formatCurrency = function (value) {
        var separator = ' ';
        value = parseFloat(value).toFixed(2);

        return value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + separator) + ' ' + chartData.currency;
    };


    var colorGreen = '#64CBA1';
    var colorRed = '#FB3C30';
    var colorYellow = '#FFCF41';
    var color = Chart.helpers.color;
    var profitChartOptions = {
        options: {
    function initProfitChart(elId, chartData) {

    var $profitChart = $(elId);

    if ($profitChart.length === 0) {
        console.error('No ' + elId + ' found');
        return false;
    }

    var formatCurrency = function (value) {
        var separator = ' ';
        value = parseFloat(value).toFixed(2);

        return value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + separator) + ' ' + chartData.currency;
    };


    var colorGreen = '#64CBA1';
    var colorRed = '#FB3C30';
    var colorYellow = '#FFCF41';
    var color = Chart.helpers.color;
    var profitChartOptions = {
        options: {
            tooltips: {
                enabled: true,
                backgroundColor: '#f9f9f9',
                borderColor: '#d3cdd2',
                titleFontColor: '#0c0b0c',
                bodyFontColor: '#0c0b0c',
                cornerRadius: 4,
                borderWidth: 1,
                bodySpacing: 7,
                xPadding: 10,
                yPadding: 10,
                callbacks: {
                    label: function (tooltipItems, data) {
                        switch (tooltipItems.datasetIndex) {
                            case 0:
                                var incomeValue = chartData.income[tooltipItems.index];
                                return chartData.incomeLabel + ': ' + formatCurrency(incomeValue);
                            case 1:
                                var expenseValue = chartData.expense[tooltipItems.index];
                                return chartData.expenseLabel + ': ' + formatCurrency(expenseValue);
                            case 2:
                                var payoutValue = chartData.payout[tooltipItems.index];
                                return chartData.payoutLabel + ': ' + formatCurrency(payoutValue);
                        }

                        return '';
                    }
                }
            },
            scales: {
                yAxes: [{
                    stacked: true,
                    ticks: {
                        beginAtZero: true,
                        callback: function (label, index, values) {
                            return formatCurrency(label);
                        }
                    }
                }],
                xAxes: [{
                    maxBarThickness: 22,
                    stacked: true,
                    ticks: {
                        autoSkip: false,
                        maxRotation: 90,
                        minRotation: 0
                    }
                }]
            }
        },
        type: 'bar',
        data: {
            labels: chartData.xAxisLabels,
            datasets: [{
                borderColor: colorGreen,
                backgroundColor: colorGreen,
                hoverBorderColor: colorGreen,
                hoverBackgroundColor: color(colorGreen).alpha(0.85).rgbString(),
                borderWidth: 1,
                data: chartData.payout.map(function (value) {
                    return value >= 0 ? value : null;
                })
            }, {
                borderColor: colorRed,
                backgroundColor: colorRed,
                hoverBorderColor: colorRed,
                hoverBackgroundColor: color(colorRed).alpha(0.85).rgbString(),
                borderWidth: 1,
                data: chartData.payout.map(function (value) {
                    return value < 0 ? value : null;
                })
            }, {
                borderColor: colorYellow,
                backgroundColor: colorYellow,
                hoverBorderColor: colorYellow,
                hoverBackgroundColor: color(colorYellow).alpha(0.75).rgbString(),
                borderWidth: 1,
                data: chartData.payout.map(function (value) {
                    return null;
                })
            }]
        }
    };

    var profitChart = new Chart($profitChart, profitChartOptions);
    $profitChart.data('chart', profitChart);

    var $profitMobileChart = $(elId + '-mobile');
    var profitMobileChartOptions = $.extend(true, {}, profitChartOptions, {
        data: {
            labels: chartData.xAxisLabelsShort
        },
        options: {
            events: ['click'],
            scales: {
                xAxes: [{
                    ticks: {
                        autoSkip: false,
                        maxRotation: 90,
                        minRotation: 0
                    }
                }],
                yAxes: [{
                    ticks: {
                        callback: function (value) {
                            var ranges = [
                                {divider: 1e6, suffix: 'M'},
                                {divider: 1e3, suffix: 'k'}
                            ];

                            function formatNumber(n) {
                                for (var i = 0; i < ranges.length; i++) {
                                    if (Math.abs(n) >= ranges[i].divider) {
                                        return (n / ranges[i].divider).toString() + ranges[i].suffix;
                                    }
                                }
                                return n;
                            }

                            return formatNumber(value);
                        }
                    }
                }]
            }
        }
    });

    if ($profitMobileChart.length === 0) {
        console.error('No ' + elId + ' found');
        return false;
    }

    var profitMobileChart = new Chart($profitMobileChart, profitMobileChartOptions);
    $profitMobileChart.data('chart', profitMobileChart);
}

function initExpenseChart(elId, percentToggleId, chartData) {

    var chartEl = document.getElementById(elId);
    var chartToggleEl = document.getElementById(percentToggleId);

    if (!chartEl) {
        console.error('No ' + elId + ' found');
        return;
    }

    if (chartToggleEl.checked) {
        chartData.expenseLabels.push(chartData.profitLabel);
        chartData.expenseAmounts.push(chartData.totalIncome - chartData.totalExpense);
    }

    var ctx = chartEl.getContext('2d');

    var formatCurrency = function (value) {
        var separator = ' ';
        value = parseFloat(value).toFixed(2);

        return value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + separator) + ' ' + chartData.currency;
    };

    var addDataToChart = function (label, data) {
        instance.data.labels.push(label);
        instance.data.datasets.forEach((dataset) => {
            dataset.data.push(data);
        });
        instance.update();
        mobileInstance.update();
    };

    var removeDataFromChart = function () {
        instance.data.labels.pop();
        instance.data.datasets.forEach((dataset) => {
            dataset.data.pop();
        });
        instance.update();
        mobileInstance.update();
    };

    Chart.pluginService.register({
        beforeDraw: function (chart) {
            if (!chart.config.options.elements.center) {
                return;
            }

            //Get options from the center object in options
            var centerConfig = chart.config.options.elements.center;
            var fontStyle = centerConfig.fontStyle || 'Arial';
            var txt = centerConfig.text;
            var color = centerConfig.color || '#000';

            if (txt === '' || txt.percentage === '' || isNaN(txt.percentage)) {
                return;
            }

            //Set font settings to draw it correctly.
            ctx.fillStyle = color;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
            var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);

            ctx.font = '16px ' + fontStyle;
            ctx.fillText(txt.title, centerX, centerY - 40);
            ctx.font = '48px ' + fontStyle;
            ctx.fillText(txt.percentage + '%', centerX, centerY);
            ctx.font = '16px ' + fontStyle;
            ctx.fillText(txt.value, centerX, centerY + 40);
        }
    });

    var instance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: chartData.expenseLabels,
            datasets: [{
                data: chartData.expenseAmounts,
                borderWidth: 1,
                hoverBorderWidth: 10,
                borderSkipped: ["top", "bottom"],
                backgroundColor: chartData.expenseColors,
                hoverBorderColor: chartData.expenseColors,
                hoverBackgroundColor: chartData.expenseColors
            }]
        },
        options: {
            cutoutPercentage: 70,
            onHover: function (event, items) {
                var centerItem = instance.config.options.elements.center;

                if (items.length !== 1) {
                    centerItem.text = {
                        title: chartData.expenseLabel,
                        percentage: chartToggleEl.checked ? chartData.expensePercentage.toFixed(1) : '',
                        value: formatCurrency(chartData.totalExpense)
                    };
                    return;
                }

                var itemIndex = items[0]._index;
                var chart = items[0]._chart;
                var dataSource = chart.data.datasets[0].data;

                var total = dataSource.reduce(function (acc, item) {
                    return acc + Math.abs(item);
                }, 0);

                var currentItem = Math.abs(dataSource[itemIndex]);
                var percentageText = (total > 0 ? currentItem / total * 100 : 0).toFixed(1);

                centerItem.text = {
                    title: chartData.expenseLabels[itemIndex],
                    percentage: percentageText,
                    value: formatCurrency(chartData.expenseAmounts[itemIndex])
                };
            },
            elements: {
                center: {
                    text: '',
                    color: '#3f4248', // Default is #000000
                    fontStyle: 'Arial', // Default is Arial
                    sidePadding: 40 // Defualt is 20 (as a percentage)
                }
            },
            tooltips: {
                enabled: false,
                mode: 'single',
                backgroundColor: '#f9f9f9',
                borderColor: '#d3cdd2',
                titleFontColor: '#0c0b0c',
                bodyFontColor: '#0c0b0c',
                cornerRadius: 4,
                borderWidth: 1,
                bodySpacing: 5,
                caretSize: 0,
                xPadding: 10,
                yPadding: 10,
                callbacks: {
                    label: function (tooltipItems, data) {
                        var value = data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index];
                        return data.labels[tooltipItems.index] + ': ' + formatCurrency(value);
                    }
                }
            },
            responsive: true,
            animation: {
                animateScale: true,
                animateRotate: true
            },
            legend: {
                display: true,
                position: 'right',
                onClick: function () {
                    return false;
                }
            }
        }
    });

    var mobileChartEl = document.getElementById(elId + '-mobile');

    if (!mobileChartEl) {
        console.error('No ' + elId + '-mobile found');
        return;
    }

    var mobileCtx = mobileChartEl.getContext('2d');

    Chart.pluginService.register({
        beforeDraw: function (chart) {
            if (!chart.config.options.elements.center) {
                return;
            }

            //Get options from the center object in options
            var centerConfig = chart.config.options.elements.center;
            var fontStyle = centerConfig.fontStyle || 'Arial';
            var txt = centerConfig.text;
            var color = centerConfig.color || '#000';

            if (txt === '' || txt.percentage === '' || isNaN(txt.percentage)) {
                return;
            }

            //Set font settings to draw it correctly.
            mobileCtx.fillStyle = color;
            mobileCtx.textAlign = 'center';
            mobileCtx.textBaseline = 'middle';
            var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
            var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);

            mobileCtx.font = '14px ' + fontStyle;
            mobileCtx.fillText(txt.title, centerX, centerY - 40);
            mobileCtx.font = '36px ' + fontStyle;
            mobileCtx.fillText(txt.percentage + '%', centerX, centerY);
            mobileCtx.font = '14px ' + fontStyle;
            mobileCtx.fillText(txt.value, centerX, centerY + 40);
        }
    });

    var mobileInstance = new Chart(mobileCtx, {
        type: 'doughnut',
        data: {
            labels: chartData.expenseLabels,
            datasets: [{
                data: chartData.expenseAmounts,
                borderWidth: 1,
                hoverBorderWidth: 10,
                borderSkipped: ["top", "bottom"],
                backgroundColor: chartData.expenseColors,
                hoverBorderColor: chartData.expenseColors,
                hoverBackgroundColor: chartData.expenseColors
            }]
        },
        options: {
            cutoutPercentage: 70,
            onHover: function (event, items) {
                var centerItem = mobileInstance.config.options.elements.center;

                if (items.length !== 1) {
                    centerItem.text = {
                        title: chartData.expenseLabel,
                        percentage: chartToggleEl.checked ? chartData.expensePercentage.toFixed(1) : '',
                        value: formatCurrency(chartData.totalExpense)
                    };
                    return;
                }

                var itemIndex = items[0]._index;
                var chart = items[0]._chart;
                var dataSource = chart.data.datasets[0].data;

                var total = dataSource.reduce(function (acc, item) {
                    return acc + Math.abs(item);
                }, 0);

                var currentItem = Math.abs(dataSource[itemIndex]);
                var percentageText = (total > 0 ? currentItem / total * 100 : 0).toFixed(1);

                centerItem.text = {
                    title: chartData.expenseLabels[itemIndex],
                    percentage: percentageText,
                    value: formatCurrency(chartData.expenseAmounts[itemIndex])
                };
            },
            elements: {
                center: {
                    text: '',
                    color: '#3f4248', // Default is #000000
                    fontStyle: 'Arial', // Default is Arial
                    sidePadding: 40 // Defualt is 20 (as a percentage)
                }
            },
            tooltips: {
                enabled: false,
                mode: 'single',
                backgroundColor: '#f9f9f9',
                borderColor: '#d3cdd2',
                titleFontColor: '#0c0b0c',
                bodyFontColor: '#0c0b0c',
                cornerRadius: 4,
                borderWidth: 1,
                bodySpacing: 5,
                caretSize: 0,
                xPadding: 10,
                yPadding: 10,
                callbacks: {
                    label: function (tooltipItems, data) {
                        var value = data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index];
                        return data.labels[tooltipItems.index] + ': ' + formatCurrency(value);
                    }
                }
            },
            responsive: true,
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    });

    var showExpensePercentage = function (show) {
        var centerItem = instance.config.options.elements.center;
        var centerMobileItem = mobileInstance.config.options.elements.center;
        centerItem.text = show ? {
            title: chartData.expenseLabel,
            percentage: chartData.expensePercentage.toFixed(1),
            value: formatCurrency(chartData.totalExpense)
        } : '';
        centerMobileItem.text = show ? {
            title: chartData.expenseLabel,
            percentage: chartData.expensePercentage.toFixed(1),
            value: formatCurrency(chartData.totalExpense)
        } : '';
    };

    if (chartToggleEl.checked) {
        showExpensePercentage(true);
    }

    chartToggleEl.onchange = function () {
        if (chartToggleEl.checked) {
            addDataToChart(chartData.profitLabel, chartData.totalIncome - chartData.totalExpense);
        } else {
            removeDataFromChart();
        }

        showExpensePercentage(chartToggleEl.checked);
    };
}

function initRoiChart(elId, chartData) {

    var $chart = $(elId);

    function init($this) {
        var salesChart = new Chart($this, {
            type: 'line',
            options: {
                scales: {
                    yAxes: [{
                        display: true,
                        ticks: {
                            beginAtZero: true,
                            suggestedMin: 0,
                            suggestedMax: 20
                        }
                    }]
                },
                tooltips: {
                    enabled: true,
                    mode: 'single',
                    backgroundColor: '#f9f9f9',
                    borderColor: '#d3cdd2',
                    titleFontColor: '#0c0b0c',
                    bodyFontColor: '#0c0b0c',
                    cornerRadius: 4,
                    borderWidth: 1,
                    bodySpacing: 5,
                    xPadding: 10,
                    yPadding: 10,
                    callbacks: {
                        label: function (tooltipItems, data) {
                            var value = data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index];
                            return data.datasets[tooltipItems.datasetIndex].label + ': ' + parseFloat(value).toFixed(2) + ' %';
                        }
                    }
                }
            },
            data: {
                labels: chartData.labels,
                datasets: [{
                    label: 'ROI',
                    data: chartData.percentages,
                    pointRadius: 8,
                    pointHoverRadius: 12,
                    showLine: true,
                    backgroundColor: '#4191C4',
                    borderColor: '#4191C4',
                    fill: '#4191C4'
                }]
            }
        });

        // Save to jQuery object

        $this.data('chart', salesChart);

    };


    // Events

    if ($chart.length) {
        init($chart);
    }
}